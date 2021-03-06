var max_amount;
var haku_nimi = "";
var select_year = 2017;
var TeamGlobalTrows;
$( document ).ready(function() {
  $('#TeamrResultinfo th').tooltip({  delay:0, fade:250,position:{my:"center top-70",at:"center top"}});
  $('#Team_PlayerList th').tooltip({  delay:0, fade:250,position:{my:"center top-50",at:"center top"}});
  $('#TeamsScoret th').tooltip({  delay:0, fade:250,position:{my:"center top-50",at:"center top"}});
  $("#game_results").on("click","#main", function(){
    // $(this).next('.erat').slideToggle(1000);
    $(this).next('.erat').slideToggle(1000);
  });
  $( "#dialog" ).dialog({
    show: {effect: "slide",duration: 200},
    hide: {effect: "slide",duration: 200},
    autoOpen: false,
    width: 500,
    open: function(event, ui) {
       $("#joukkue_haku").val(""),
       $(this).off('submit').on('submit', function () {
         $( this ).dialog( "close" );
         haku_nimi = $("#joukkue_haku").val();
         if (haku_nimi != ""){
           // console.log("ykkönen");
           get_team(haku_nimi);
         };
       return false;
      });
      $('#TeamsScoret').unbind('click').on( 'click', 'tr', function () {
          haku_nimi =$(this).closest('tr').children('td:first').text();
          // console.log("kakkonen");
          get_team(haku_nimi);
          $( "#dialog").dialog( "close" );
        });
     },
    buttons: {
       "Hae":function(){
         $( this ).dialog( "close" );
         haku_nimi = $("#joukkue_haku").val();
         if (haku_nimi != ""){
           // console.log("kolmas");
           get_team(haku_nimi);
         };
       },
       "Peruuta":function(){
         $( this ).dialog( "close" );
        }
    }
  });
$( ".Team" ).click(function() {
  $( "#dialog" ).dialog( "open" );
});
  $("#Years").change(function(){
    $("#Years option:selected").each(function(){
      select_year = $(this).text();
    });
      if (haku_nimi != ""){
        if (select_year < 2018){
          max_amount = 19;

        }else{
          max_amount = 20;

        }
        // console.log("neljäs");
        get_team(haku_nimi);
        GetTeamsScores();
      }
  }).trigger("change");
  $('#Team_PlayerList tbody').on( 'click', 'tr', function () {
      var name = $(this).closest('tr').children('td:first').text().replace(/#+|[0-9]/g,'').trim();
      hae_tiedot(name);
      $( '#TeamPlayer' ).dialog( 'open' );
    });

  $('#game_results').on( 'click', '#main', function () {
      var SearchGame = $(this).attr('href');
      GetGameResults(SearchGame,select_year);
      $( '#GameFullPage' ).dialog( 'open' );
    });
  $('#game_results' ).on( "mouseenter mouseleave", '#main', function( event ) {
    $( this ).toggleClass( "hover" );
  });
  $('#Teams1, #Teams2').on( 'click', function () {
      haku_nimi = $(this).text();
      $( '#GameFullPage' ).dialog( 'close' );
      // console.log("viides");
      get_team(haku_nimi);
    });


    GetTeamsScores();
});

function get_team(Teamname){
  // console.log("haku",Teamname);
  // console.log(haku_nimi,select_year)
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "team",name: Teamname, year : select_year},function(data){
    if (data.pelit.team != "not found"){
      var TeamGames = count_wins(data.pelit.games,data.pelit.team);
      var PalyersData = count_drows(data.pelaajat);
      fill_table(PalyersData, TeamGames, data.pelit.team, data.pelit.TeamHistory);
      Team_MakePlayerList(data.pelaajat);
      make_gamelist(data.pelit.games,TeamGames[0].length);
    }else{
      $("#Nimi").text(data.pelit.team);
    }
  });
};

function GetTeamsScores(){
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "Teams", year : select_year},function(data){
    FillTeamsresults(data);
  });
};

function count_wins(TeamGames,TeamName){
  // console.log()
  var games = [[],[],[],[],[],[],[]];
  var wins = [];
  var loses = [];
  var even = [];
  $.each(TeamGames,function(i,val){
    if(val.home.results.first != null){
      games[6].push(val.id);
      var home = Number(val.home.results.first) + Number(val.home.results.second);
      var away = Number(val.away.results.first) + Number(val.away.results.second);

      if (val.home.name == TeamName && home < away){
        wins.push(val.id);
        games[5].push(2);

      }
      else if(val.away.name == TeamName  && home > away){
        wins.push(val.id);
        games[5].push(2);

      }
      else if (home == away){
        even.push(val.id);
        games[5].push(1);
      }
      else{
        loses.push(val.id);
        games[5].push(0);
      }
      if (val.home.name == TeamName){
        games[0].push(val.home.results.first);
        games[1].push(val.home.results.second);
        games[2].push((Number(val.home.results.first) + Number(val.home.results.second))/2);
        games[3].push(Number(val.home.results.first) + Number(val.home.results.second));
        games[4].push(val.away.name);

      }else{
        games[0].push(val.away.results.first);
        games[1].push(val.away.results.second);
        games[2].push((Number(val.away.results.first) + Number(val.away.results.second))/2);
        games[3].push(Number(val.away.results.first) + Number(val.away.results.second));
        games[4].push(val.home.name);
      }

    }
  });
  make_barchart(games);
  return games;
}

function count_drows(ListPlayers){

  // var names = [];
  var best = 0;
  var hauki = 0;
  var amount = 0;
  var zeros = 0;
  var points= 0;
  var players = [];
  // console.log(ListPlayers);
  $.each(ListPlayers, function(i,val){
      trows =[];
      // names.push(i);
      // console.log(i,val.heitot);
      $.each(val.heitot,function(i,val2){
        if (val2.kyykat != '?'){
          trows.push(val2.kyykat);
          amount ++;
          if (Number(val2.kyykat) > best){
            best = val2.kyykat;
          }
          if (val2.kyykat == "h"){
            hauki ++;
          }else{
            points += Number(val2.kyykat);
          }
          if (val2.kyykat == "h" || val2.kyykat == "0"){
            zeros ++;
          }
        }
      });
  });
  // console.log(amount,hauki,zeros,points);
  hauki = Math.round(10000*(hauki/amount))/100;
  zeros = Math.round(10000*(zeros/amount))/100;
  points = Math.round(100*(points/amount))/100;
  players[0] = best;
  players[1] = hauki;
  players[2] = zeros;
  players[3] = points;
  return players;
}

function make_barchart(TeamGames){
  if (TeamGlobalTrows != null){
    TeamGlobalTrows.destroy();
  }
  var ensimmainen = [];
  var toinen = [];
  $.each(TeamGames[5],function(i,val){
    if (val == 2){
      ensimmainen.push('rgb(144,255,59)');
      toinen.push('rgb(203,255,162)');
    }
    else if (val == 1) {
      ensimmainen.push('rgb(112,112,112)');
      toinen.push('rgb(186,186,186)');

    }else{
      ensimmainen.push('rgb(255, 51, 57)');
      toinen.push('rgb(255, 118, 123)');
    }
  })
  var ctx4 = document.getElementById("TeamPoints").getContext('2d');
  var keskiarvo = Math.round(100*(TeamGames[2].reduce(add, 0)/TeamGames[2].length))/100;
  keskiarvo = Array.apply(null, Array(TeamGames[2].length+1)).map(Number.prototype.valueOf,keskiarvo)
  TeamGlobalTrows = new Chart(ctx4, {
      type: 'bar',
      data: {
          labels: TeamGames[3],
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
            label: 'ka. erä',
            borderColor: 'rgb(48, 63, 92)',
            borderWidth: 4,
            fill: false,
            data: TeamGames[2]
          },{
              type: 'bar',
              label: 'Ensimmäinen',
              backgroundColor: ensimmainen,
              stack: 'vuoro 0',
              data: TeamGames[0]
          }, {
              type: 'bar',
              label: 'Toinen',
              backgroundColor: toinen,
              stack: 'vuoro 0',
              data: TeamGames[1]
          }]

      },
      options: {
                  title:{
                      display:true,
                      text:"Erät"
                  },
                  tooltips: {
                      mode: 'index',
                      callbacks: {
                        title: function(tooltipItem) {
                              return TeamGames[4][tooltipItem[0].index];
                            }
                      }
                  },
                  responsive: true,
                  scales: {
                      xAxes: [{
                          stacked: true,
                      }]
                  },
                  onClick: graphClickEvent
      }
  });
  function graphClickEvent(event, array){
    if(array[0]){
      GetGameResults(TeamGames[6][Number(array[0]._index)],select_year);
      $( '#GameFullPage' ).dialog( 'open' );
    }
  }
}
function fill_table(TeamPlayers,TeamGames,TeamName,TeamHistoy){

    var TeamErat = Array.prototype.concat.apply(TeamGames[0],TeamGames[1]);

    $("#Nimi").text(TeamName);
    $("#peli_maarat").text(TeamGames[3].length);

    $("#paras_peli").text(TeamGames[3].min());
    $("#huonoin_peli").text(TeamGames[3].max());
    $("#ka_peli").text(Math.round(100*(TeamGames[3].reduce(add, 0)/TeamGames[3].length))/100);

    $("#paras_era").text(TeamErat.min());
    $("#huonoin_era").text(TeamErat.max());
    $("#ka_era").text(Math.round(100*(TeamErat.reduce(add, 0)/TeamErat.length))/100);

    $("#paras_heitto").text(TeamPlayers[0]);
    $("#hauki_pro").text(TeamPlayers[1]);
    $("#nolla_pro").text(TeamPlayers[2]);
    $("#ka_heitto").text(TeamPlayers[3]);
    $("#TeamHistoria").text(TeamHistoy);
    if($(".TeamResults").css( "display" ) == "none"){
      $('#TeamrResultinfo').DataTable({
        paging: false,
        searching: false,
        "info": false,
        "bSort" : false
       });
     }
    $(".TeamResults").css("display","inline");
    $(".TeamResults div:eq(1)").html("<b>Joukkue tiedot</b>");
    $(".TeamResults div:eq(1)").css({"padding": "0px", "font-size":"1.4em","min-width": "542px"});
    $(".TeamResults div:last").css("min-width", "530px");


  // console.log(erat.reduce(add, 0));
}

function make_gamelist(games,AmountGames){
  // console.log(games,AmountGames);
  var options = ["havio","tasapeli","voitto"];
  var jarjestys = [];
  $("#game_results").html('');
  // $("#game_results").css("height",AmountGames*4+"em");
  $.each(games,function(i,val){
      var home = Number(val.home.results.first) + Number(val.home.results.second);
      var away = Number(val.away.results.first) + Number(val.away.results.second);

      if(val.home.results.first == null){
        $("#game_results").append('<div id="main" href ="'+val.id+'"><div>'+val.home.name+'</div><div class="center"> - </div><div class="center"> - </div><div class="NoResult" href ="'+val.id+'">'+val.away.name+'</div></div>');
      }else{
        if (home > away){
          jarjestys = [options[0],options[2]];
        }
        else if(home < away){
          jarjestys = [options[2],options[0]];
        }
        else{
          jarjestys = [options[1],options[1]];
        }
        if (Number(val.home.results.first) > Number(val.away.results.first)){
          jarjestys[3] = options[0];
          jarjestys[4] = options[2];
        }else if (Number(val.home.results.first) < Number(val.away.results.first)){
          jarjestys[3] = options[2];
          jarjestys[4] = options[0];
        }else{
          jarjestys[3] = options[1];
          jarjestys[4] = options[1];
        }

        if (Number(val.home.results.second) > Number(val.away.results.second)){
          jarjestys[5] = options[0];
          jarjestys[6] = options[2];
        }else if (Number(val.home.results.second) < Number(val.away.results.second)){
          jarjestys[5] = options[2];
          jarjestys[6] = options[0];
        }else{
          jarjestys[5] = options[1];
          jarjestys[6] = options[1];
        }
        $("#game_results").append('<div id="main" href ="'+val.id+'"><div class="'+jarjestys[0]+'">'+val.home.name+'</div><div class="center">'+home+'</div><div class="center">'+away+'</div><div class='+jarjestys[1]+'>'+val.away.name+'</div></div>');
      }
    });
}

function Team_MakePlayerList(PlayerList){
  // $("#Team_PlayerList tbody").html('');
  if($(".Team_PlayerList").css( "display" ) == "none"){
    $('#Team_PlayerList').DataTable({
      "jQueryUI": true,
      paging: false,
      searching: false,
      "info": false,
      columns: [
        { data: 'Nimi' },
        { data: 'Eriä' },
        { data: 'pisteet' },
        { data: 'ka-heitto' },
        { data: 'ka-era' },
        { data: 'nolla' },
        { data: 'ka-heittopaikka' },
        { data: 'parasheitto' },
        { data: 'PelaajaHistoria' }
      ]
    });
    $(".Team_PlayerList").css("display","inline");
    $(".Team_PlayerList div:eq(1)").html("<b>Pelaaja tiedot</b>");
    $(".Team_PlayerList div:eq(1)").css({"padding": "0px", "font-size":"1em","min-width": "385px"});
    $(".Team_PlayerList div:last").css("min-width", "385px");
  }else{
    $('#Team_PlayerList').dataTable().fnClearTable();
  }
  var PlayerResults;
  $.each(PlayerList, function(i,val){
    PlayerResults = Team_CountPlayerValues(val.heitot);
      var data =[{
        "Nimi": i,
        "Eriä" : PlayerResults[0],
        "pisteet":PlayerResults[4],
        "ka-heitto": PlayerResults[1],
        "ka-era": PlayerResults[6],
        "nolla": PlayerResults[3],
        "ka-heittopaikka": PlayerResults[2],
        "parasheitto": PlayerResults[5],
        "PelaajaHistoria": val.historia
      }];
    $('#Team_PlayerList').dataTable().fnAddData(data);
  });
}

function Team_CountPlayerValues(List){
  // console.log(List);
  var PlayerResults = [[0,0,0],[],[],[],[],0,[]];
  var TrowAmount = 0,
      RoundScore = 0;

  $.each(List, function(i,val){
    if(PlayerResults[0][1] != val.ottelu_numero || PlayerResults[0][2] != val.era){
      if(PlayerResults[0][0] > 0){
        PlayerResults[6].push(RoundScore);
        RoundScore = 0;
      }
      PlayerResults[0][0] ++;
      PlayerResults[0][1] = val.ottelu_numero;
      PlayerResults[0][2] = val.era;
    }
    if(val.kyykat != '?'){ // Heittojen määrä
      TrowAmount ++;
      PlayerResults[2].push(Number(val.heitto_paikka));
    }
    // console.log(isNaN(val.kyykat),val.kyykat);
    if(isNaN(val.kyykat) == false){ //Ulos heitetetyt kyykat
      PlayerResults[1].push(Number(val.kyykat));
      RoundScore += Number(val.kyykat);
      // console.log(val.kyykat);
    }
    if(val.kyykat == 'h' || val.kyykat == '0'){ //Nolla prosentti
      PlayerResults[3].push(Number(val.kyykat));
      // console.log(val.kyykat);
    }
    if (Number(val.kyykat) > PlayerResults[5]){ //Paras heitto
      PlayerResults[5] = Number(val.kyykat);
    }
  });
  // console.log(PlayerResults[6]);
  PlayerResults[6].push(RoundScore);
  PlayerResults[4] =PlayerResults[1].reduce(add, 0)*2;
  PlayerResults[1] =Math.round(100*(PlayerResults[1].reduce(add, 0)/TrowAmount))/100;
  PlayerResults[2] =Math.round(100*(PlayerResults[2].reduce(add, 0)/TrowAmount))/100;
  PlayerResults[3] =Math.round(1000*(PlayerResults[3].length/TrowAmount))/10;
  PlayerResults[6] =Math.round(100*(PlayerResults[6].reduce(add, 0)/PlayerResults[6].length))/100;
  PlayerResults[0] = PlayerResults[0][0];
  // console.log(PlayerResults[6]);
  // console.log(PlayerResults);

  return PlayerResults;
}

function FillTeamsresults(List){
  // console.log(List);
  if ($("#TeamsScoret div:eq(1)").html() == null){
    // console.log("tyhjä")
    $('#TeamsScoret').DataTable({
      "jQueryUI": true,
      paging: false,
      searching: false,
      "info": false,
      "bSort" : false,
      columns: [
        { data: 'Nimi' },
        { data: 'Otteluja' },
        { data: 'Voitot' },
        { data: 'Tasapelit' },
        { data: 'Häviöt' },
        { data: 'Ottelu_Pisteet' },
        { data: 'Pisteet' },
        { data: 'Peli_keskiarvo' }
      ]
    });
  }else{
    $('#TeamsScoret').dataTable().fnClearTable();
  }
  var val = 1;
  var points, games, playoff;
  $.each(List, function(i,val){
    points = Number(val[0].wins)*2 + Number(val[0].Even);
    games = Number(val[0].wins) + Number(val[0].Even) + Number(val[0].Lost);
    // console.log(val[0].wins,val.wins);
      var data =[{
        "Nimi": i,
        "Otteluja": games,
        "Voitot" : val[0].wins,
        "Tasapelit":val[0].Even,
        "Häviöt": val[0].Lost,
        "Ottelu_Pisteet": points,
        "Pisteet": val[0].Score,
        "Peli_keskiarvo": Math.round(10*(Number(val[0].Avrage)))/10
      }];
    $('#TeamsScoret').dataTable().fnAddData(data);
  });
  playoff = Math.round(Object.keys(List).length/2);
  playoff += (playoff +1) % 2 ^ 1;
  // console.log(playoff);
  $("#TeamsScoret tr:nth-child(-n+" + playoff + ")").css("background","rgb(235,255,235)");
}
