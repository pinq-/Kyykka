var team_info = null;
var max_amount;
var haku_nimi;
var select_year = 2017;
$( document ).ready(function() {
  $( ".Team" ).click(function() {
    haku_nimi = prompt("Hae joukkue", $("#Nimi").text());
    get_team(function(info){
     team_info = info;
    });
    count_wins();
  });
  $("#Years").change(function(){
    $("#Years option:selected").each(function(){
      select_year = $(this).text();
    });
    // console.log(haku_nimi);
      if (haku_nimi != ""){
        if (select_year < 2018){
          max_amount = 19;

        }else{
          max_amount = 20;

        }
        // hae_teidot(haku_nimi,year);
      }
  }).trigger("change");
});

function get_team(callback){
  console.log(haku_nimi.replace(/'/g, "&apos;"));
  $.getJSON("http://pinq.kapsi.fi/github/Kyykka/workspace/index.php", {cmd : "team",name: haku_nimi.replace(/'/g, "&apos;"), year : select_year})
  .done(function(data){
    // console.log(data);
    $("#Nimi").text(data.pelit.team.replace(/&apos;/g, "'"));
    // count_wins();
  }).fail(function(){
    $("#Nimi").text("Tietokanta ei ole käytössä")
  });
};

function count_wins(){

  console.log(team_info);
}
