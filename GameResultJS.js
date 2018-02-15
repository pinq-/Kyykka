var glob_GameHomeTrows;
var glob_GameAwayTrows;
$( document ).ready(function() {
  $( "#GameFullPage" ).dialog({
    autoOpen: false,
    width: 1200,
    height: 700,
    show:{effect: "slide",duration: 200},
    hide:{effect: "slide",duration: 200}
  });
  // GetGameResults(1142,2018);
});
function GetGameResults(GameID,select_year){
  var max_amount;
  if (GameID != ""){
    if (select_year < 2018){
      max_amount = 19;

    }else{
      max_amount = 20;

    }
  }
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "game", year : select_year, gameid : GameID})
  .done(function(data){
    if (data.Trows.length == 0){
      $("#Teams").text("Peliä ei löydy");
      GameFillTablesEmpty(data.Results.game);
      GameMakeGamelist(data.Results.PreGames);
      $(".TeamGameResults").hide();
    }
    else{
      GameFillTables(data.Results.game);
      Gameresults = GameCountInfo(data.Trows,max_amount);
      GameMakeGamelist(data.Results.PreGames);
      // console.log(data.Trows);
      GameFillInfo(Gameresults);
      FillResults(data.Results.game, Gameresults[3]);
      GameMakePie(Gameresults[4],data.Results.game.home.name,data.Results.game.away.name);
      $(".TeamGameResults").show();
    }
  });
}

function GameFillTables(TheGame){
  // console.log(TheGame);
  var home = Number(TheGame.home.results.first) + Number(TheGame.home.results.second);
  var away = Number(TheGame.away.results.first) + Number(TheGame.away.results.second);
  $("#Teams").text(TheGame.home.name+" vs. "+ TheGame.away.name);
  $("#HomeResult").text(home);
  $("#AwayResult").text(away);
  $("#HomeAvrage").text("("+Math.round(10*TheGame.home.average)/10+")");
  $("#AwayAvrage").text("("+Math.round(10*TheGame.away.average)/10+")");
  $("#GameDate").text(TheGame.date.replace(/-/g, ".").substr(0,16));
  if (home > away ){
    $("#HomeResult").attr('class', "GameResultLine havio");
    $("#AwayResult").attr('class', "GameResultLine voitto");
  }else if (home < away) {
    $("#HomeResult").attr('class', "GameResultLine voitto");
    $("#AwayResult").attr('class', "GameResultLine havio");
  }else{
    $("#HomeResult").attr('class', "GameResultLine tasapeli");
    $("#AwayResult").attr('class', "GameResultLine tasapeli");
  }
}
function GameFillTablesEmpty(TheGame){
  // console.log(TheGame);
  $("#Teams").text(TheGame.home.name+" vs. "+ TheGame.away.name);
  $("#HomeResult").text(" - ");
  $("#AwayResult").text(" - ");
  $("#HomeAvrage").text("("+Math.round(10*TheGame.home.average)/10+")");
  $("#AwayAvrage").text("("+Math.round(10*TheGame.away.average)/10+")");
  $("#GameDate").text(TheGame.date.replace(/-/g, ".").substr(0,16));
  $("#HomeResult").attr('class', "GameResultLine");
  $("#AwayResult").attr('class', "GameResultLine");
}

function GameMakeGamelist(games){
    $("#GamePreGames").html("");
  if (games.length != 0){
    var options = ["havio","tasapeli","voitto"];
    var jarjestys = [];
    var AmountGames = 0;
    // $("#game_results").html('');
    $.each(games,function(i,val){
      $.each(val, function(k, game){
        // console.log(k,game);
        if (game.HomeRes > game.AwayRes){
          jarjestys = [options[0],options[2]];
        }
        else if(game.HomeRes < game.AwayRes){
          jarjestys = [options[2],options[0]];
        }
        else{
          jarjestys = [options[1],options[1]];
        }

        $("#GamePreGames").append(
          '<div id = "main" class = "GameMain"><div class = "GameDate"><b>' + i +'</b></div><div class = "'+jarjestys[0]+'">' + game.Home +'</div><div class= "center">'
          + game.HomeRes+'</div><div class= "center">'+game.AwayRes+'</div> <div class = "'+jarjestys[1]+'">'
          + game.Away +'</div></div>');


        });
      });
      $("#GamePreGames").show();
  }
}

function GameFillInfo(results){
  // console.log(results);
  if ($(".GameInfo div:eq(1)").html() == null){
    $('#GameInfo').DataTable({
      paging: false,
      searching: false,
      "info": false,
      "bSort" : false
    });
    $(".GameInfo div:eq(1)").html("<b>Pelitiedot</b>");
    $(".GameInfo div:eq(1)").css({"padding": "0px", "font-size":"1em"});
    // $(".GameInfo div:last").css("min-width", "530px");

  }
  $("#GameAvrageTrow").text(results[0]);
  $("#GameAvrageRound").text(results[1]);
  $("#GameBestTrowa").text(results[2]);
}

function GameCountInfo(Trows,maxPoints){
  // console.log(Trows);
  var tables = ['HomeFirst', 'HomeSecond', 'AwayFirst', 'AwaySecond'];
  var results = [];
  var heitot = [];
  var erat = [];
  var paras = 0;
  var HeittoJarjestys = [0,0,0];
  var TrowsPoints = [[], [], []];
  var RoundLeft = [];
  var TeamTrows = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
  var OrderTeam = [0, 0];
  $.each(Trows,function(i,val){
    var TeamName = i;
    $.each(val,function(k,era){
      // console.log(k,era);
      OrderTeam[1] = Math.floor(OrderTeam[0]/2);
      if (k == "koti"){
        return true;
      }
      // console.log(k,era);
      eraPoints = []
      TrowsPoints = [[], [], []];
      names = [];
      HeittoJarjestys[0] = [0];
      HeittoJarjestys[1] = [0];

      PalyerTrows = [];
      PlayerPoints = [[],[],[],[]];
      Order = [0,0];
      var LastLeft;
      $.each(era,function(a,trow){
        if(!PalyerTrows[Number(trow.TrowPosition)-1]){
          PalyerTrows[Number(trow.TrowPosition)-1] = [];
        }
        PalyerTrows[Number(trow.TrowPosition)-1].push(trow.kyykat+' ('+trow.Left+')');
        // console.log(Order[0],Order[1]);
        if (!Number(trow.kyykat) == false){
          eraPoints.push(Number(trow.kyykat));
          heitot.push(Number(trow.kyykat))
          PlayerPoints[Order[0]].push(Number(trow.kyykat));
          if(paras < Number(trow.kyykat)){
            paras = Number(trow.kyykat);
          }
          LastLeft = trow.Left - trow.kyykat;
        }else if(trow.kyykat == 'h' || trow.kyykat == '0'){
          // console.log("nolla");
          heitot.push(0);
          PlayerPoints[Order[0]].push(0);
        }
        if (Order[1] == 0){
          Order[1] = 1;
        }else{
          Order[0] = (Order[0]+1) -4*Math.floor((Order[0]+1)/4);
          Order[1] = 0;
          if(names.length < 4){
            nimi = trow.name.split(' ');
            nimi[0] = nimi[0].replace(/[a-z]/g, '');
            names.push(nimi.join(' '));
          }
        }

        if(trow.kyykat == 'h'){
          TeamTrows[OrderTeam[1]][0]++;

        }else if (Number(trow.kyykat) < 7){
          TeamTrows[OrderTeam[1]][Number(trow.kyykat) + 1]++;

        }else{
          TeamTrows[OrderTeam[1]][7]++;
        }
      });
      var RoundSocre = eraPoints.reduce(add,0);
      for (i = 0; i < 4; i++){
        PlayerPoints[i] = PlayerPoints[i].reduce(add,0);
      }
      // console.log(TrowsTest);
      GameMakeTableResult(PalyerTrows,PlayerPoints,RoundSocre,names,tables[erat.length],TeamName);
      erat.push(RoundSocre);
      RoundLeft.push(LastLeft);
      OrderTeam[0]++;
    });
  });
  // console.log(heitot);
  results[0] = Math.round(100*(heitot.reduce(add,0)/heitot.length))/100;
  results[1] = Math.round(100*(erat.reduce(add,0)/erat.length))/100;
  results[2] = paras;
  results[3] = RoundLeft;
  results[4] = TeamTrows;
  $(".GameFullPage").show();
  // console.log(TeamTrows);
  return results;
}

function GameMakeTableResult(Trows,PlayerPoints,RoundPoints,names,Table,Team){
  // console.log(Trows,PlayerPoints,RoundPoints,Team);
  var places = ["FiristTrow", "SecondTrow", "ThirdTrow", "FourthTrow"];
  if($("." + Table +" div:eq(1)").html() == null){
    $('#' + Table).DataTable({
      "jQueryUI": true,
      paging: false,
      searching: false,
      "info": false,
      "bSort" : false,
      columns: [
        { data: 'Name',
        defaultContent: "",
        "width": "25%"},
        { data: 'FiristTrow',
        defaultContent: "",
        "width": "13%" },
        { data: 'SecondTrow',
        defaultContent: "",
        "width": "13%" },
        { data: 'ThirdTrow',
        defaultContent: "",
        "width": "13%" },
        { data: 'FourthTrow',
        defaultContent: "",
        "width": "13%" },
        { data: 'TotalTrow',
        defaultContent: "",
        "width": "1%"  },
        { data: 'AvrageTrow',
        defaultContent: "",
        "width": "1%"  },
      ]
    });
  }else{
    $('#' + Table).dataTable().fnClearTable();
  }
  $("." + Table+ " div:eq(1)").html('<b>'+Team+'</b>');
  var PlayerResults;
  $.each(Trows, function(i,val){
    // console.log(i,val);
      var data ={
        "Name": names[i],
      };
      $.each(val, function(k,arvo){
        data[places[k]] = val[k];
      });
      data["TotalTrow"] = PlayerPoints[i];
      data["AvrageTrow"] = PlayerPoints[i]/val.length;
      data = [data];
    $('#' + Table).dataTable().fnAddData(data);
  });
}

function FillResults(GameResults,LeftPoints){
  // console.log(LeftPoints);
  var tables = ['First', 'Second'];
  for (i = 0; i < 2; i++){
    var Colors = [];
    var home =GameResults.home.results[tables[i].toLowerCase()];
    var away = GameResults.away.results[tables[i].toLowerCase()];
    // console.log(TheGame.home.results[tables[i].toLowerCase()]);
    if ( home < away){
      Colors = ['voitto','havio'];
    }else if(home > away){
      Colors = ['havio', 'voitto'];
    }else{
      Colors =['tasapeli', 'tasapeli'];
    }
    $(".Home" + tables[i]+ " div:eq(9)").html("");
    $(".Away" + tables[i]+ " div:eq(9)").html("");
    $(".Home" + tables[i]+ " div:eq(9)").html("<div class='"+Colors[0]+" GamePoints'>"+home+"</div><div class='GameRealPoints' title ='Kentälle jääneet max pisteet'>"+LeftPoints[i]*2+"</div>");
    $(".Away" + tables[i]+ " div:eq(9)").html("<div class='"+Colors[1]+" GamePoints'>"+away+"</div><div class='GameRealPoints' title ='Kentälle jääneet max pisteet'>"+LeftPoints[i+2]*2+"</div>");

  }

}

function GameMakePie(Trows,Home,Away){
  var Trow_Names =["Hauki", "Virkamies","1", "2", "3", "4", "5","6",">6"];
  if (glob_GameHomeTrows != null){
    glob_GameHomeTrows.destroy();
  }
  if (glob_GameAwayTrows != null){
    glob_GameAwayTrows.destroy();
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

  var ctxHome = document.getElementById("GameHomeTrows").getContext('2d');
  glob_GameHomeTrows = new Chart(ctxHome, {
      type: 'pie',
      data: {
          labels: Trow_Names,
          datasets: [{
              data: Trows[0],
              backgroundColor: bgColors,
          }]
      },
      options: {
          responsive: true,
          title: {
             display: true,
             text: Home
         },
         legend: {
             display: false
         },
         tooltips: {
             callbacks: prosentti_label
         }
      }
  });
  var ctxAway = document.getElementById("GameAwayTrows").getContext('2d');
  glob_GameAwayTrows = new Chart(ctxAway, {
      type: 'pie',
      data: {
          labels: Trow_Names,
          datasets: [{
              data: Trows[1],
              backgroundColor: bgColors,
          }]
      },
      options: {
          responsive: true,
          title: {
             display: true,
             text: Away
         },
         legend: {
             display: false
         },
         tooltips: {
             callbacks: prosentti_label
         }
      }
  });
}
