
var max_amount;
var glob_aloitusheitot;
var glob_pisteet;
var glob_piste_jaottelu;
var glob_heitot;
var glob_heitotyli;
var glob_heitotali;
var peli_lista = [];
$( document ).ready(function() {
    var year = 2017;
    max_amount = 19;
    var haku_nimi = "";
    $( ".Player" ).click(function() {
    	haku_nimi = prompt("Hae pelaajaa", $("#Nimi").text());
      hae_teidot(haku_nimi,year);
    });
    $("#Years").change(function(){
      $("#Years option:selected").each(function(){
        year = $(this).text();
      });
      // console.log(haku_nimi);
        if (haku_nimi != ""){
          if (year < 2018){
            max_amount = 19;

          }else{
            max_amount = 20;

          }
          hae_teidot(haku_nimi,year);
        }
    }).trigger("change");
});
function paivita_tiedot(data){

  $("#Nimi").text(data.name);
  $("#Numero").text("#"+data.number);
  $("#Joukkue").text(data.team.replace(/&apos;/g, "'"));

}

function update_table(){

  if (glob_heitotyli != null){
    glob_heitotyli.destroy();
  }
  if (glob_heitotali != null){
    glob_heitotali.destroy();
  }
  if (glob_aloitusheitot != null){
    glob_aloitusheitot.destroy();
  }
  if (glob_heitot != null){
    glob_heitot.destroy();
  }
  // glob_pisteet = pisteet[2];
  Heitto_nimet =["Hauki", "Virkamies","1", "2", "3", "4", "5","6",">6"];
  bgColors = [
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
    return Heitto_nimet[tooltipItem.index] +": "+ precentage + "%";
  }}

  $("#paras_heitto").text(glob_pisteet[0].max()/2);
  $("#era_maara").text(glob_piste_jaottelu[4].length);
  $("#heitot_maara").text(glob_pisteet[0].length);
  $("#pisteet_maara").text(glob_pisteet[4][2]);
  $("#pisteetper_maara").text(glob_pisteet[4][3]);
  $("#pisteetper_eka").text(paikat[0][0]+"["+paikat[0][1]+"]");
  $("#pisteetper_tok").text(paikat[1][0]+"["+paikat[1][1]+"]");
  $("#pisteetper_kol").text(paikat[2][0]+"["+paikat[2][1]+"]");
  $("#pisteetper_nel").text(paikat[3][0]+"["+paikat[3][1]+"]");
  $("#hauki_prosentti").text(glob_pisteet[4][0]+"%");
  $("#nolla_prosentti").text(glob_pisteet[4][4]+"%");
  $("#nolla_putki").text(glob_piste_jaottelu[6]);
  $("#Joulukuuset").text(glob_pisteet[4][1]);
  $("#max_era").text(Math.max.apply(null,keskiarvo_pisteet)*4);
  $("#min_era").text(Math.min.apply(null,keskiarvo_pisteet)*4);
  // console.log(paikat);
  $("#maara_1").text('Heittoja: '+ glob_pisteet[1].reduce(add, 0));
  var ctx = document.getElementById("heitotyli").getContext('2d');
  glob_heitotyli = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: Heitto_nimet,
          datasets: [{
              data: glob_pisteet[1],
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
  if (glob_pisteet[2].length != 0){
    $("#maara_2").text('Heittoja: '+ glob_pisteet[2].reduce(add, 0));
    var ctx2 = document.getElementById("heitotali").getContext('2d');
    glob_heitotali = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: Heitto_nimet,
            datasets: [{
                data: glob_pisteet[2],
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
  if (glob_pisteet[3].length != 0){
      $("#maara_3").text('Heittoja: '+ glob_pisteet[3].reduce(add, 0));
      var ctx3 = document.getElementById("aloitusheitot").getContext('2d');
      glob_aloitusheitot = new Chart(ctx3, {
          type: 'pie',
          data: {
              labels: Heitto_nimet,
              datasets: [{
                  data: glob_pisteet[3],
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
  if (glob_heitot == null){
    $("#js-legend").append(glob_heitotyli.generateLegend());
  }
  var ctx4 = document.getElementById("pisteet").getContext('2d');
  var keskiarvo = Array.apply(null, Array(glob_piste_jaottelu[0].length)).map(Number.prototype.valueOf,glob_pisteet[4][3]);
  glob_heitot = new Chart(ctx4, {
      type: 'bar',
      data: {
          labels: glob_piste_jaottelu[4],
          datasets: [{
            type: 'line',
            label: 'keskiarvo',
            borderColor: 'rgb(50, 50, 0)',
            borderWidth: 1,
            fill: false,
            radius: 0,
            data: keskiarvo
          },{
            type: 'line',
            label: 'kyykat/heitto',
            borderColor: 'rgb(255, 51, 51)',
            borderWidth: 4,
            fill: false,
            data: glob_piste_jaottelu[5]
          },{
              type: 'bar',
              label: 'Ensimmäinen',
              backgroundColor: 'rgb(0, 92, 230)',
              stack: 'vuoro 0',
              data: glob_piste_jaottelu[0]
          }, {
              type: 'bar',
              label: 'Toinen',
              backgroundColor: 'rgb(102, 163, 255)',
              stack: 'vuoro 0',
              data: glob_piste_jaottelu[1]
          }, {
              type: 'bar',
              label: 'Kolmas',
              backgroundColor: 'rgb(230, 138, 0)',
              stack: 'Vuoro 1',
              data: glob_piste_jaottelu[2]
          }, {
              type: 'bar',
              label: 'Neljas',
              backgroundColor: 'rgb(255, 194, 102)',
              stack: 'Vuoro 1',
              data: glob_piste_jaottelu[3]
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
                              return peli_lista[tooltipItem[0].index];
                            }
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

function hae_teidot(nimi,select_year){
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "player",name: nimi, year : select_year})
  .done(function(data){
        if (data.pelaaja.nimi == "not found"){
          $("#Nimi").text("Pelaaja ei löydy");
        }
        else{
          Pelaaja = {name:data.pelaaja.nimi, number:data.pelaaja.numero , team:data.pelaaja.joukkue};
          paivita_tiedot(Pelaaja);
          glob_pisteet = laske_pisteet(data.heitot);
          glob_piste_jaottelu = pisteiden_taulukointi(data.heitot,glob_pisteet[0]);
          update_table();
        }
  });
}

function laske_pisteet(objekti){
    alle = [];
    yli = [];
    aloitus = [];
    pisteet = [];
    tieto = [0,0,0,0,0]; //1.hauuet% ;2. joulukuuset;3.pisteet yht ;4. pistettä/heitto
    var heittoja = 0;
    $.each(objekti, function(index) {
        heittoja ++;
        if(index%4 == 0){
          peli_lista.push(objekti[index].vieras_joukkue.replace(/&apos;/g, "'"));
        }
        if(objekti[index].jaljella == max_amount*2){
            // console.log(objekti[index].kyykat);
            aloitus.push(objekti[index].kyykat);
        }
        if(objekti[index].jaljella >= max_amount){
            yli.push(objekti[index].kyykat);
        }
        else if(objekti[index].jaljella < max_amount){
            alle.push(objekti[index].kyykat);
        }
        if(objekti[index].kyykat === 'h'){
            pisteet.push(0);
            tieto[0] ++;
        }
        else{
            pisteet.push(objekti[index].kyykat*2);
            if (Number(objekti[index].kyykat) == 6){
                tieto[1] ++;
            }
            tieto[2] += Number(objekti[index].kyykat)*2;
            // tieto[3] += Number(objekti[index].kyykat);
        }
        if(objekti[index].kyykat === 'h' || Number(objekti[index].kyykat) == 0){
          tieto[4] ++;
        }
    });
    var count_yli = heittojen_maara(yli);
    var count_alle = heittojen_maara(alle);
    var count_aloitus = heittojen_maara(aloitus);
    tieto[0] = Math.round(1000*(tieto[0]/pisteet.length))/10;
    tieto[3] = Math.round(100*((tieto[2]/2)/pisteet.length))/100;
    tieto[4] = Math.round(1000*(tieto[4]/pisteet.length))/10;
    // console.log([pisteet,count_yli,count_alle,count_aloitus,tieto]);
    return [pisteet,count_yli,count_alle,count_aloitus,tieto];


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
    aloitukset = [1,3,5,7,9,11,13,15];
    aloitus =[];
    toka = [];
    kolmas = [];
    neljas = [];
    label = [];
    keskiarvo_pisteet = [];
    paikat = [[],[],[],[]];
    nollat = [0,0];
    erat = [0,0];
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
    for(var i = 0, len = lista.length; i < len; i ++){

      // console.log("pituus",toka,typeof(lista[i].heitto_jarjestys),piste_lista[i],i)
      if($.inArray(Number(lista[i].heitto_jarjestys),aloitukset) > -1){
          // console.log(lista[i].heitto_jarjestys,"sisällä")
          aloitus.push(piste_lista[i]/2);
          toka.push(piste_lista[i+1]/2);
          kolmas.push(piste_lista[i+2]/2);
          neljas.push(piste_lista[i+3]/2);
          label.push(lista[i].heitto_paikka);
          paikat[Number(lista[i].heitto_paikka)-1].push(piste_lista[i]/2,piste_lista[i+1]/2,piste_lista[i+2]/2,piste_lista[i+3]/2);
          keskiar = (piste_lista[i]+piste_lista[i+1]+piste_lista[i+2]+piste_lista[i+3])/8;
          keskiarvo_pisteet.push(keskiar);
          i += 3;
      }
	  }
    // console.log([aloitus, toka, kolmas, neljas, label ,keskiarvo ]);
    $.each(paikat,function(i,val){
      if(val.length != 0){
        paikat[i] = [Math.round(100*(val.reduce(add,0)/val.length))/100,val.length];
      }else{
        paikat[i] = ["-",0];
      }
    });
    return     [aloitus, toka, kolmas, neljas, label ,keskiarvo_pisteet, nollat[1]];
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function add(a, b) {
    return a + b;
}
