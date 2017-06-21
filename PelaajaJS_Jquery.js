bgColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(243, 230, 47, 1)',
    'rgba(246, 106, 0, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(110, 194, 44, 1)',
    'rgba(207, 91, 166, 1)',
    'rgba(255, 159, 64, 1)'
];
Heitto_nimet =["Hauki", "Virkamies", "2", "3", "4", "5","6","6<"];

prosentti_label = {label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var precentage = Math.floor(((currentValue/total) * 100)+0.5);
            return Heitto_nimet[tooltipItem.index] +": "+ precentage + "%";
}}
Pelaaja = {name:"Testi Marko", number:69 , team:"HUI"};
heitot = [{heitto_jarjestys:15, heitto_paikka:4, era:1, kyykat:2, jaljella:27, ottelu_numero:738} ,
    {heitto_jarjestys:16, heitto_paikka:4, era:1, kyykat:1  , jaljella:25, ottelu_numero:738} ,
    {heitto_jarjestys:31, heitto_paikka:4, era:1, kyykat:4  , jaljella:10, ottelu_numero:738} ,
    {heitto_jarjestys:32, heitto_paikka:4, era:1, kyykat:2  , jaljella:60 , ottelu_numero:738} ,
    {heitto_jarjestys:15, heitto_paikka:4, era:2, kyykat:3  , jaljella:26, ottelu_numero:738} ,
    {heitto_jarjestys:16, heitto_paikka:4, era:2, kyykat:1  , jaljella:23, ottelu_numero:738} ,
    {heitto_jarjestys:31, heitto_paikka:4, era:2, kyykat:'h', jaljella:14, ottelu_numero:738} ,
    {heitto_jarjestys:32, heitto_paikka:4, era:2, kyykat:'h', jaljella:14, ottelu_numero:738} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:4  , jaljella:38, ottelu_numero:720} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:2  , jaljella:34, ottelu_numero:720} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:3  , jaljella:24, ottelu_numero:720} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:21, ottelu_numero:720} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:2, kyykat:3  , jaljella:38, ottelu_numero:720} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:2, kyykat:'h', jaljella:35, ottelu_numero:720} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:2, kyykat:'h', jaljella:28, ottelu_numero:720} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:2, kyykat:3  , jaljella:28, ottelu_numero:720} ,
    {heitto_jarjestys:7 , heitto_paikka:2, era:2, kyykat:4  , jaljella:34, ottelu_numero:691} ,
    {heitto_jarjestys:8 , heitto_paikka:2, era:2, kyykat:2  , jaljella:30, ottelu_numero:691} ,
    {heitto_jarjestys:23, heitto_paikka:2, era:2, kyykat:2  , jaljella:16, ottelu_numero:691} ,
    {heitto_jarjestys:24, heitto_paikka:2, era:2, kyykat:0  , jaljella:14, ottelu_numero:691} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:1, kyykat:1  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:1, kyykat:3  , jaljella:37, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:1, kyykat:2  , jaljella:20, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:1, kyykat:3  , jaljella:18, ottelu_numero:767} ,
    {heitto_jarjestys:1 , heitto_paikka:1, era:2, kyykat:4  , jaljella:38, ottelu_numero:767} ,
    {heitto_jarjestys:2 , heitto_paikka:1, era:2, kyykat:3  , jaljella:34, ottelu_numero:767} ,
    {heitto_jarjestys:17, heitto_paikka:1, era:2, kyykat:4  , jaljella:25, ottelu_numero:767} ,
    {heitto_jarjestys:18, heitto_paikka:1, era:2, kyykat:1  , jaljella:21, ottelu_numero:767}];
$( document ).ready(function() {
    pisteet = [];
    pisteet = laske_pisteet(heitot);
    piste_jaottelu = pisteiden_taulukointi(heitot,pisteet[0]);
    $("#Nimi").text(Pelaaja.name +" #"+Pelaaja.number);
    $("#Joukkue").text(Pelaaja.team);
    $("#paras_heitto").text(pisteet[0].max());
    $("#era_maara").text(piste_jaottelu[4].length);
    $("#heitot_maara").text(pisteet[0].length);
    $("#pisteet_maara").text(pisteet[4][2]);
    $("#pisteetper_maara").text(pisteet[4][3]);
    $("#hauki_prosentti").text(pisteet[4][0]+"%");
    $("#Joulukuuset").text(pisteet[4][1]);
    var ctx = document.getElementById("heitotyli").getContext('2d');
    var heitotyli = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Heitto_nimet,
            datasets: [{
                data: pisteet[1],
                backgroundColor: bgColors,
            }]
        },
        options: {
            responsive: true,
            title: {
               display: true,
               text: 'Yli 19'
           },
           legend: {
               display: false
           },
           tooltips: {
               callbacks: prosentti_label
           }
        }
    });
    if(pisteet[2].length !== 0){
        $("#piiraat").append('<div class = "inline_pie_second"><canvas id="heitotali" height="150"></canvas></div>');
        var ctx2 = document.getElementById("heitotali").getContext('2d');
        var heitotali = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: Heitto_nimet,
                datasets: [{
                    data: pisteet[2],
                    backgroundColor: bgColors,
                }
                ]
            },
            options: {
                responsive: true,
                title: {
                   display: true,
                   text: 'Alle 19'
               },
               legend: {
                   display:false,
               },
               tooltips: {
                   callbacks: prosentti_label
               }
            }
        });
    }
    if (pisteet[3].length !== 0){
        $("#piiraat").append('<div class = "inline_pie_second"><canvas id="aloitusheitot" height="150"></canvas></div>');
        // console.log($ctx4)
        var ctx3 = document.getElementById("aloitusheitot").getContext('2d');
        var aloitusheitot = new Chart(ctx3, {
            type: 'pie',
            data: {
                labels: Heitto_nimet,
                datasets: [{
                    data: pisteet[3],
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
    }
    var ctx4 = document.getElementById("pisteet").getContext('2d');
    var aloitusheitot = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: piste_jaottelu[4],
            datasets: [{
                type: 'line',
                label: 'pisteet/heitto',
                borderColor: 'rgb(255, 51, 51)',
                borderWidth: 4,
                fill: false,
                data: piste_jaottelu[5]
            },{
                type: 'bar',
                label: 'Ensimmäinen',
                backgroundColor: 'rgb(0, 92, 230)',
                stack: 'vuoro 0',
                data: piste_jaottelu[0]
            }, {
                type: 'bar',
                label: 'Toinen',
                backgroundColor: 'rgb(102, 163, 255)',
                stack: 'vuoro 0',
                data: piste_jaottelu[1]
            }, {
                type: 'bar',
                label: 'Kolmas',
                backgroundColor: 'rgb(230, 138, 0)',
                stack: 'Vuoro 1',
                data: piste_jaottelu[2]
            }, {
                type: 'bar',
                label: 'Neljas',
                backgroundColor: 'rgb(255, 194, 102)',
                stack: 'Vuoro 1',
                data: piste_jaottelu[3]
            }]

        },
        options: {
                    title:{
                        display:true,
                        text:"Heitot"
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
        }
    });

    $("#js-legend").append(heitotyli.generateLegend());
    // document.getElementById('js-legend').innerHTML = myChart.generateLegend();
});

function laske_pisteet(objekti){
    alle = [];
    yli = [];
    aloitus = [];
    pisteet = [];
    tieto = [0,0,0,0];
    var heittoja = 0;
    $.each(objekti, function(index) {
        heittoja ++;
        if(objekti[index].heitto_paikka == 1 && objekti[index].heitto_jarjestys == 1){
            aloitus.push(objekti[index].kyykat);
        }
        if(objekti[index].jaljella > 19){
            yli.push(objekti[index].kyykat);
        }
        else if(objekti[index].jaljella < 19){
            alle.push(objekti[index].kyykat);
        }
        if(objekti[index].kyykat === 'h'){
            pisteet.push(0);
            tieto[0] ++;
        }
        else{
            pisteet.push(objekti[index].kyykat*2);
            if (objekti[index].kyykat == 6){
                tieto[1] ++;
            }
            tieto[2] += objekti[index].kyykat*2;
        }
    });

    var count_yli = heittojen_maara(yli);
    var count_alle = heittojen_maara(alle);
    var count_aloitus = heittojen_maara(aloitus);
    tieto[0] = Math.round(100*(tieto[0]/pisteet.length));
    tieto[3] = Math.round(100*(tieto[2]/pisteet.length))/100;
    return [pisteet,count_yli,count_alle,count_aloitus,tieto];


}
function heittojen_maara(lista){
    if (lista.length === 0){
        return [];
    }
    tulos_lista = [0,0,0,0,0,0,0,0];
    $.each(lista, function(index){
        if (lista[index] === 'h'){
            tulos_lista[0] += 1;
        }
        else if(lista[index] < 7){
            tulos_lista[lista[index]+1] += 1;
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
    keskiarvo = [];

    for(var i = 0, len = lista.length; i < len; i ++){

        if($.inArray(lista[i].heitto_jarjestys,aloitukset) > -1){
            aloitus.push(piste_lista[i]);
            toka.push(piste_lista[i+1]);
            kolmas.push(piste_lista[i+2]);
            neljas.push(piste_lista[i+3]);
            label.push(lista[i].heitto_paikka);
            keskiar = (piste_lista[i]+piste_lista[i+1]+piste_lista[i+2]+piste_lista[i+3])/4;
            keskiarvo.push(keskiar);
            i += 3;
        }
	}
    return     [aloitus, toka, kolmas, neljas, label ,keskiarvo ];
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
