var teams_list = null;
$( document ).ready(function() {
  get_teams(function(kala){
   teams_list = kala;
  });
  $("#teamas").change(function(){
    var team = "";
    $("#teamas option:selected").each(function(){
      team = $(this).text();
    });
    if (team != ""){
      // console.log(team);
      update_team(team);
    }
  }).trigger("change");
});
//testi vesti
function get_teams(callback){
  $.getJSON("http://pinq.kapsi.fi/github/workspace/index.php", {cmd : "list_teams"})
  .done(function(data){
    make_list(data);
    callback(data);
  }).fail(function(){
    $("#team_name").text("Tietokanta ei ole käytössä")
  });
};

function make_list(data_list){
  $("#teamas").append("<option> </option>");
  $.each(data_list, function(i,val){
    $("#teamas").append("<option>"+i+"</option>");
  });
};

function update_team(name){
  // console.log teams_list[name]);
  $("#team_text").text(name);
  name = name_chek(name);
  update_names(name);
  update_games(name);
  var results = calculate_wins(name);
  update_horzbar(results[0].length,results[1].length,results[2].length);
};
function update_names(team_name){
  $("#players")
  .find('option')
  .remove()
  .end();
  $("#players").append("<option> </option>");
  $.each(teams_list[team_name], function(i,val){
    if( i == "players"){
      $.each(val, function(i,val){
        // console.log(val.name + " #"+val.number);
            $("#players").append("<option>" + val.name + " #" + val.number + "</option>");
      });
    }
  });
};
function update_games(team_name){
  $("#game")
  .find('option')
  .remove()
  .end();
  $("#game").append("<option> <option>");
  $.each(teams_list[team_name], function(i,val){
    if( i == "matches"){
      $.each(val, function(i,val){
        // console.log(val.home.name +" " + val.away.name);
            $("#game").append("<option>" + val.home.name + " - " + val.away.name + "</option>");
      });
    }
  });
};

function name_chek(mystring){
  return mystring.replace(/'/g, "&apos;")
}

function calculate_wins(team_name){
  var wins = [];
  var loses = [];
  var even = [];
  $.each(teams_list[team_name], function(i,val){
    if( i == "matches"){
      $.each(val, function(i,val){
            var home = Number(val.home.results.first) + Number(val.home.results.second);
            var away = Number(val.away.results.first) + Number(val.away.results.second);

            if (val.home.name == team_name && home < away){
              wins.push(val.id);
              // console.log(val.id);

            }
            else if(val.away.name == team_name && home > away){
              wins.push(val.id);

            }
            else if (home == away){
              even.push(val.id);
            }
            else{
              loses.push(val.id);
            }
      });
    }
  });
  // console.log(" voitot: " + wins.length + " häviöt: " + loses.length + " tasapelit: " + even.length);
  return [wins,loses,even];
};

function update_horzbar(win,loses,even){
  // console.log(typeof(win),typeof(loses),even);
    if (side_bar != null){
      side_bar.destroy();
    }

   var element2 = document.getElementById("results").getContext("2d");
   var side_bar = new Chart(element2,{
          type: "horizontalBar",
          data: {
            labels:["Pelit"],
            datasets:[{
                label:"Voitot",
                backgroundColor: "rgb(0,200,0,0.6)",
                data:[win]
            },{
                label:"Häviöt",
                 backgroundColor: "rgba(200,0,0,0.6)",
                data:[loses]
            },{
                label:"Tasapelit",
                data:[even]
            }]
          },
          options: {
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: false,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    elements: {
                      rectangle: {
                          borderWidth: 2,
                      }
                  },
                  legend: {
                      position: 'right',
                  }
                }
   });
}
