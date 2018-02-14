//Previes Teams
var glob_aloitusheitot;
var glob_heitotyli;
var glob_heitotali;
var PlayerGlobalTrows;
$( document ).ready(function() {
    $( "#TeamPlayer" ).dialog({
      autoOpen: false,
      width: 900,
      height: 700,
      show:{effect: "slide",duration: 200},
      hide:{effect: "slide",duration: 200}
    });
});
function hae_tiedot(nimi){
  var max_amount;
  var Trow_Names =["Hauki", "Virkamies","1", "2", "3", "4", "5","6",">6"];
  var select_year = $("#Years option:selected").text();
  if (nimi != ""){
    if (select_year < 2018){
      max_amount = 19;

    }else{
      max_amount = 20;

    }
  }
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "player",name: nimi, year : select_year})
  .done(function(data){
    if (data.pelaaja.nimi == "not found"){
      $("#Nimi").text("Pelaaja ei löydy");
    }
    else{
      $('#PlayerInfo th').tooltip({  delay:0, fade:250,position:{my:"center top-40",at:"center top"}});
      var PlayerPoints = PlayerCountPoints(data.heitot,max_amount);
      var PlayerPointsDis = pisteiden_taulukointi(data.heitot,PlayerPoints[0]);
      UpdatePlayerinfo(data.pelaaja.nimi,data.pelaaja.numero,PlayerPoints,PlayerPointsDis);
      Update_barchar(PlayerPoints[4][3],PlayerPointsDis,PlayerPoints[5]);
      Update_pies(PlayerPoints,Trow_Names,max_amount);
    }
  });
}

function UpdatePlayerinfo(Pname,Pnumber,PlayerPoints,PPointsDis){

  $("#PlayerName").text(Pname + " #" +Pnumber);

  $("#era_maara").text(PPointsDis[4].length);
  $("#max_era").text(Math.max.apply(null,PPointsDis[5][0]));
  $("#min_era").text(Math.min.apply(null,PPointsDis[5][0]));
  $("#average_era").text(Math.round(100*(PPointsDis[5][0].reduce(add,0)/PPointsDis[5][0].length))/100);
  $("#heitot_maara").text(PlayerPoints[0].length);
  $("#pisteet_maara").text(PlayerPoints[4][2]);
  $("#pisteetper_maara").text(PlayerPoints[4][3]);
  $("#pisteetper_eka").text(PPointsDis[7][0][0]+" ("+PPointsDis[7][0][1]+")");
  $("#pisteetper_tok").text(PPointsDis[7][1][0]+" ("+PPointsDis[7][1][1]+")");
  $("#pisteetper_kol").text(PPointsDis[7][2][0]+" ("+PPointsDis[7][2][1]+")");
  $("#pisteetper_nel").text(PPointsDis[7][3][0]+" ("+PPointsDis[7][3][1]+")");
  $("#PlayerBestTrow").text(PlayerPoints[0].max()/2);
  $("#hauki_prosentti").text(PlayerPoints[4][0]+"%");
  $("#nolla_prosentti").text(PlayerPoints[4][4]+"%");
  $("#nolla_putki").text(PPointsDis[6]);
  $("#Joulukuuset").text(PlayerPoints[4][1]);

  if ($(".PlayerInfo div:eq(1)").html() == null){
    $('#PlayerInfo').DataTable({
      paging: false,
      searching: false,
      "info": false,
      "bSort" : false
    });
    $(".PlayerInfo div:eq(1)").html("<b>Pelaajatiedot</b>");
    $(".PlayerInfo div:eq(1)").css({"padding": "0px", "font-size":"1em","min-width": "542px"});
    $(".PlayerInfo div:last").css("min-width", "530px");
  }
}

function Update_pies(PlayerPoints,Trow_Names,max_amount){

  if (glob_heitotyli != null){
    glob_heitotyli.destroy();
  }
  if (glob_heitotali != null){
    glob_heitotali.destroy();
  }
  if (glob_aloitusheitot != null){
    glob_aloitusheitot.destroy();
  }
  // glob_pisteet = pisteet[2];
  var bgColors = [
    '#e03d07',
    '#e06508',
    '#e1dd0a',
    '#c3f203',
    '#9ef402',
    '#78f702',
    '#51fa01',
    '#65d101',
    '#00cc00'
  ];

  prosentti_label = {label: function(tooltipItem, data) {
    var dataset = data.datasets[tooltipItem.datasetIndex];
    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
      return previousValue + currentValue;
    });
    var currentValue = dataset.data[tooltipItem.index];
    var precentage = Math.floor(((currentValue/total) * 100)+0.5);
    return Trow_Names[tooltipItem.index] +": "+ precentage + "%";
  }}

  // console.log(paikat);
  $("#maara_1").text('Heittoja: '+ PlayerPoints[1].reduce(add, 0));
  var ctx = document.getElementById("heitotyli").getContext('2d');
  glob_heitotyli = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: Trow_Names,
          datasets: [{
              data: PlayerPoints[1],
              backgroundColor: bgColors,
          }]
      },
      options: {
          responsive: true,
          title: {
             display: true,
             text: 'Yli '+ max_amount
         },
         legend: {
             display: false
         },
         tooltips: {
             callbacks: prosentti_label
         }
      }
  });
  if (PlayerPoints[2].length != 0){
    $("#maara_2").text('Heittoja: '+ PlayerPoints[2].reduce(add, 0));
    var ctx2 = document.getElementById("heitotali").getContext('2d');
    glob_heitotali = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: Trow_Names,
            datasets: [{
                data: PlayerPoints[2],
                backgroundColor: bgColors,
            }
            ]
        },
        options: {
            responsive: true,
            title: {
               display: true,
               text: 'Alle '+ max_amount
           },
           legend: {
               display:false,
           },
           tooltips: {
               callbacks: prosentti_label
           }
        }
    });
  }else{$("#maara_2").text('')};
  if (PlayerPoints[3].length != 0){
      $("#maara_3").text('Heittoja: '+ PlayerPoints[3].reduce(add, 0));
      var ctx3 = document.getElementById("aloitusheitot").getContext('2d');
      glob_aloitusheitot = new Chart(ctx3, {
          type: 'pie',
          data: {
              labels: Trow_Names,
              datasets: [{
                  data: PlayerPoints[3],
                  backgroundColor: bgColors,
              }
              ]
          },
          options: {
              responsive: true,
              title: {
                 display: true,
                 text: 'Aloitusheitot'
             },
             legend: {
                 display:false,
             },
             tooltips: {
                 callbacks: prosentti_label
             }
          }
      });
  }else{$("#maara_3").text('')};
  if (PlayerGlobalTrows == null){
    $("#js-legend").append(glob_heitotyli.generateLegend());
  }
}
function Update_barchar(AvrageHeitto,PlayerPointsDis,Gamelist){
  // console.log(AvrageHeitto,PlayerPointsDis,Gamelist);
  if (PlayerGlobalTrows != null){
    PlayerGlobalTrows.destroy();
  }
  $.each(PlayerPointsDis[4], function(i,val){
    PlayerPointsDis[4][i] = PlayerPointsDis[5][0][i]+ " (" + PlayerPointsDis[4][i] + ")";
  });
  var ctx4 = document.getElementById("PlayerPoints").getContext('2d');
  AvrageHeitto = Array.apply(null, Array(PlayerPointsDis[0].length)).map(Number.prototype.valueOf,AvrageHeitto);
  var AvrageList = [];
  PlayerGlobalTrows= new Chart(ctx4, {
      type: 'bar',
      data: {
          labels: PlayerPointsDis[4],
          datasets: [{
            type: 'line',
            label: 'Pelaajan keskiarvo',
            borderColor: 'rgb(50, 50, 0)',
            borderWidth: 1,
            fill: false,
            radius: 0,
            data: AvrageHeitto
          },{
            type: 'line',
            label: 'kyykat/heitto',
            borderColor: 'rgb(255, 51, 51)',
            borderWidth: 4,
            fill: false,
            data: PlayerPointsDis[5][1]
          },{
              type: 'bar',
              label: 'Ensimmäinen',
              backgroundColor: 'rgb(0, 92, 230)',
              stack: 'vuoro 0',
              data: PlayerPointsDis[0]
          }, {
              type: 'bar',
              label: 'Toinen',
              backgroundColor: 'rgb(102, 163, 255)',
              stack: 'vuoro 0',
              data: PlayerPointsDis[1]
          }, {
              type: 'bar',
              label: 'Kolmas',
              backgroundColor: 'rgb(230, 138, 0)',
              stack: 'Vuoro 1',
              data: PlayerPointsDis[2]
          }, {
              type: 'bar',
              label: 'Neljas',
              backgroundColor: 'rgb(255, 194, 102)',
              stack: 'Vuoro 1',
              data: PlayerPointsDis[3]
          }]

      },
      options: {
                  title:{
                      display:true,
                      text:"Heitot"
                  },
                  tooltips: {
                      mode: 'index',
                      callbacks: {
                        title: function(tooltipItem) {
                              return Gamelist[tooltipItem[0].index];
                            }
                      },
                      filter: function(item, data) {
                       var data = data.datasets[item.datasetIndex].data[item.index];
                       return !isNaN(data) && data !== null;
                     }
                  },
                  responsive: true,
                  scales: {
                      xAxes: [{
                          stacked: true,
                      }]
                  }
      }
  });
}


function PlayerCountPoints(TrowList,max_amount){
  // console.log(TrowList,max_amount);
    var alle = [];
    var yli = [];
    var aloitus = [];
    var points = [];
    var Game = [0,0,0];
    tieto = [0,0,0,0,0]; //1.hauuet% ;2. joulukuuset;3.points yht ;4. pistettä/heitto
    var PlayerGamelist = [];
    var heittoja = 0;
    $.each(TrowList, function(index,val) {
        if(val.kyykat != '?'){
          heittoja ++;
          if(Game[1] != val.ottelu_numero || Game[2] != val.era){
            PlayerGamelist.push(val.vieras_joukkue);
            Game[0] ++;
            Game[1] = val.ottelu_numero;
            Game[2] = val.era;
          }
          if(val.jaljella == max_amount*2){
              // console.log(val.kyykat);
              aloitus.push(val.kyykat);
          }
          if(val.jaljella >= max_amount){
              yli.push(val.kyykat);
          }
          else if(val.jaljella < max_amount){
              alle.push(val.kyykat);
          }
          if(val.kyykat === 'h'){
              points.push(0);
              tieto[0] ++;
          }
          else{
              points.push(val.kyykat*2);
              if (Number(val.kyykat) == 6){
                  tieto[1] ++;
              }
              tieto[2] += Number(val.kyykat)*2;
              // tieto[3] += Number(val.kyykat);
          }
          if(val.kyykat === 'h' || Number(val.kyykat) == 0){
            tieto[4] ++;
          }
      }
    });
    var count_yli = heittojen_maara(yli);
    var count_alle = heittojen_maara(alle);
    var count_aloitus = heittojen_maara(aloitus);
    tieto[0] = Math.round(1000*(tieto[0]/points.length))/10;
    tieto[3] = Math.round(100*((tieto[2]/2)/points.length))/100;
    tieto[4] = Math.round(1000*(tieto[4]/points.length))/10;
    // console.log([points,count_yli,count_alle,count_aloitus,tieto]);
    return [points, count_yli, count_alle, count_aloitus, tieto, PlayerGamelist];


}
function heittojen_maara(lista){
    if (lista.length === 0){
        return [];
    }
    tulos_lista = [0,0,0,0,0,0,0,0,0];
    $.each(lista, function(index){
        if (lista[index] === 'h'){
            tulos_lista[0] += 1;
        }
        else if(Number(lista[index]) < 7){
            tulos_lista[Number(lista[index])+1] += 1;
        }
        else {
            tulos_lista[7] += 1;
        }
    });
    return tulos_lista;
}

function pisteiden_taulukointi(lista,piste_lista){

  var label = [];
  var eraScore = [[],[]];
  var paikat = [[],[],[],[]];
  var nollat = [0,0];
  var Game = [0,0,0];
  var EraPoints = 0;
  var positon = 0;
  var order = 0;
  var Trows = [[],[],[],[]];

  $.each(piste_lista, function(i,val){
    if( val == 0){
      nollat[0] += 1;
      if (nollat[0] > nollat[1]){
        nollat[1] = nollat[0];
      }
    }else{
      nollat[0] = 0;
    }
  });
    // console.log(lista.length/4)
  $.each(lista, function(i,val){
    if(Game[1] != val.ottelu_numero || Game[2] != val.era){
      if(Game[0] != 0){
        eraScore[0].push(EraPoints);
        eraScore[1].push(EraPoints/order);
        EraPoints = 0;
        while (order < 4){
          Trows[order].push(null);
          order ++;
        }
      }
      order = 0;
      label.push(val.heitto_paikka);
      Game[0] ++;
      Game[1] = val.ottelu_numero;
      Game[2] = val.era;
    }
    if(val.kyykat == 'h'){
      paikat[Number(val.heitto_paikka)-1].push(0);
      Trows[order].push(0);

    }else if(val.kyykat != '?'){
      paikat[Number(val.heitto_paikka)-1].push(Number(val.kyykat));
      Trows[order].push(Number(val.kyykat));
    }else{
      Trows[order].push(null);
    }
    if(isNaN(val.kyykat) == false){
      EraPoints += Number(val.kyykat);
      // console.log(val.kyykat);
    }
    // console.log(i,val)
    positon = val.heitto_paikka;
    order ++;
  });
  eraScore[0].push(EraPoints);
  eraScore[1].push(EraPoints/order);
    // console.log([aloitus, toka, kolmas, neljas, label ,keskiarvo ]);
    $.each(paikat,function(i,val){
      if(val.length != 0){
        paikat[i] = [Math.round(100*(val.reduce(add,0)/val.length))/100,val.length];
      }else{
        paikat[i] = ["",0];
      }
    });
    // console.log(Game[0], label, eraScore, paikat);
    return     [Trows[0], Trows[1], Trows[2], Trows[3], label ,eraScore, nollat[1], paikat, Game[0], ];
    // return     [game[0], label,eraScore ];
}

function add(a, b) {
    return Number(a) + Number(b);
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
