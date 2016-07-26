/**
 * Created by tmartin on 7/12/16.
 */
var versions = require('./versions');
var pokeVersion;
var pokeVersionArray = [];
var min = null;
var max = null;
var pokemonSERIES = [];
var pokeJSON = [];
var levelsINDEX = [];
var methodIndex = [];
var locationName = "";
var responseArray = [];
var flag = 1;
module.exports = {
    beginRoute: function (inVal) {
        methodIndex = [];
        pokemonSERIES = [];
        levelsINDEX = [];
        pokeJSON = [];
        locationName = "";
        responseArray = [];
        min = null;
        max = null;
        for (var i = 0; i < document.getElementById("selectMethod").elements.length; i++){
            if (document.getElementById("selectMethod").elements[i].checked) {
                methodIndex.push(document.getElementById("selectMethod").elements[i].value)
                console.log(document.getElementById("selectMethod").elements[i].value)
            }
        }
        pokeLocationFunction(inVal,pokeLocationFunction)
    },
    createDropDown:selectRegion,
    pokemonOut:[levelsINDEX, pokeJSON],
    selectPokemon:infoAboutSelectedPokemon
};

function pokeLocationFunction (array_in, cbfxn) {
    var location = new XMLHttpRequest();
    var url = 'http://pokeapi.co/api/v2/location-area/'+array_in[array_in.length-1];
    location.onreadystatechange = function() {
        if (location.readyState == 4 && location.status == 200) {
            array_in.pop()
            var tempLocation = JSON.parse(location.response);
            var tempArray = [];
            console.log(JSON.parse(location.response).name);
            tempLocation.name.split("-").forEach(function (val) {
                tempArray.push(val.charAt(0).toUpperCase() + val.slice(1));
            });
            var name = tempArray.join(" ");
            if (locationName == "")
            {
                locationName = name;
            }
            else
            {
                for (var r = 0; r < Math.min(name.length, locationName.length); r++) {
                    if (name.charAt(r) !== locationName.charAt(r)) {
                        locationName = locationName.slice(0,r);
                        break;
                    }
                }
                if (name.length !== locationName.length) {
                    locationName.slice(0,Math.min(name.length, locationName.length));
                }
            }
            responseArray.push([name,tempLocation]);
            if (array_in.length == 0){
                pokemonOnRoute(handlePokemon);
            }
            else
            {
                cbfxn(array_in,cbfxn);
            }
        }
    };
    location.open("GET", url, true);
    location.send();
}
function pokemonOnRoute(callback_in) {
    var possiblePokemon = [];
    for (var y = 0; y < responseArray.length; y++){
        console.log(responseArray[y][1].pokemon_encounters);
        for (var k = 0; k < responseArray[y][1].pokemon_encounters.length; k++)
        {
            possiblePokemon.push([responseArray[y][0],responseArray[y][1].pokemon_encounters[k]]);
        }
    }

    pokemonSERIES = [];
    levelsINDEX = [];
    var colorArray = colorOptions.slice();
    console.log(possiblePokemon)
    for (var i = 0; i < possiblePokemon.length; i++)
    {
        if (i == possiblePokemon.length-1)
        {
            callback_in(possiblePokemon[i][1], possiblePokemon[i][0], colorArray, true);
        }
        else
        {
            callback_in(possiblePokemon[i][1], possiblePokemon[i][0], colorArray, false);
        }
    }
}

function handlePokemon(pokemon, areaName, colorArray, boolval) {
    var thisPokemonEncounters = [];
    for (var versionNUM = 0; versionNUM < pokemon.version_details.length; versionNUM++) {
        if (pokemon.version_details[versionNUM].version.name == pokeVersion.name) {
            var rand = Math.floor(Math.random() * (colorArray.length-1));
            var color = colorArray[rand];
            console.log(colorArray[rand]);
            console.log(rand);
            colorArray.splice(rand,1);
            console.log(colorArray[rand]);
            for (var encounter = 0; encounter < pokemon.version_details[versionNUM].encounter_details.length; encounter++) {
                var thisEncounter = pokemon.version_details[versionNUM].encounter_details[encounter];
                if(methodIndex.includes(thisEncounter.method.name)){
                    if ((min == null) || thisEncounter.min_level < min) {
                        min = thisEncounter.min_level;
                    }
                    if ((max == null) || thisEncounter.max_level > max) {
                        max = thisEncounter.max_level;
                    }
                    var currentColor = color.slice();
                    if (thisEncounter.method.name == "old-rod")
                    {
                        currentColor[0] -= 15;
                        currentColor[1] -= 15;
                        currentColor[2] -= 15;
                    }
                    else if (thisEncounter.method.name == "good-rod")
                    {
                        currentColor[0] -= 30;
                        currentColor[1] -= 30;
                        currentColor[2] -= 30;
                    }
                    else if (thisEncounter.method.name == "super-rod")
                    {
                        currentColor[0] -= 45;
                        currentColor[1] -= 45;
                        currentColor[2] -= 45;
                    }
                    else if (thisEncounter.method.name == "surf")
                    {
                        currentColor[0] -= 60;
                        currentColor[1] -= 60;
                        currentColor[2] -= 60;
                    }


                    console.log(areaName.slice(locationName.length) == "Area");
                    if (areaName == locationName || areaName.slice(locationName.length) == "Area")
                    {
                        thisPokemonEncounters.push([pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1),parseInt(thisEncounter.chance), parseInt(thisEncounter.min_level),  parseInt(thisEncounter.max_level), thisEncounter.method.name,  "rgb(" + currentColor.join(",")+")"]);
                    }
                    else
                    {
                        thisPokemonEncounters.push([pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1),parseInt(thisEncounter.chance), parseInt(thisEncounter.min_level),  parseInt(thisEncounter.max_level), thisEncounter.method.name + ", " + areaName.slice(locationName.length),  "rgb(" + currentColor.join(",")+")"]);
                    }
                                    }
                if (encounter == pokemon.version_details[versionNUM].encounter_details.length - 1) {
                    pokemonSERIES.push(thisPokemonEncounters);
                    if (boolval)
                    {
                        outputPokeJSON()
                    }
                }
            }
        }
    }
}


function outputPokeJSON() {
    pokeJSON = [];
    var levelsTEMP = [];
    for (var i = min; i <= max; i++){
        levelsINDEX.push(i);
        levelsTEMP.push(null);
    }
    var JSONStorage = [];
    var count = 0;

    for (var p = pokemonSERIES.length - 1; p >= 0; p--){
        for (var k = 0; k < pokemonSERIES[p].length;k++) {
            var text = pokemonSERIES[p][k][0] + "<br> (" + pokemonSERIES[p][k][4] + ")";
            var index = -1;
            for (var r = 0; r < JSONStorage.length; r++)
            {
                if (text == JSONStorage[r][0])
                {
                    index = r;
                    break;
                }
            }

            if (index != -1)
            {
                for(i = pokemonSERIES[p][k][2]; i <= pokemonSERIES[p][k][3]; i++) {
                    if (JSONStorage[r][1][i - min] != null)
                    {
                        JSONStorage[r][1][i - min] += pokemonSERIES[p][k][1];
                    }
                    else
                    {
                        JSONStorage[r][1][i - min] = pokemonSERIES[p][k][1];
                    }
                }
            }
            else
            {
                var methodCatch = levelsTEMP.slice();
                for (i = pokemonSERIES[p][k][2]; i <= pokemonSERIES[p][k][3]; i++) {
                    methodCatch[i - min] = pokemonSERIES[p][k][1];
                }
                count++;
                JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][k][5]]);
            }
        }
        if (p == 0)
        {
            JSONStorage.forEach(function (storedEncounter) {
                pokeJSON.push({
                    text: storedEncounter[0],
                    values: storedEncounter[1],
                    legendItem: {
                        order: storedEncounter[2]
                    },
                    backgroundColor: storedEncounter[3]
                })
            });

            zingchart.exec('CHARTDIV', 'setseriesdata', {
                data : pokeJSON
            });
            if (!locationName.endsWith("Area")){locationName += " Area"}
            zingchart.exec('CHARTDIV', 'modify', {
                data : {
                    "title": {
                        "text": "Likelyhood of Encountering Pokemon in " + locationName
                    },
                    "scale-x": {
                        "values": levelsINDEX
                    },
                    "scale-y": {}
                }
            });
            document.getElementById("loading").style.visibility = "hidden";
        }
    }
}

function infoAboutSelectedPokemon(string_in) {
    var pokemon_name = string_in.charAt(0).toLowerCase() + string_in.slice(1);
    var pokemon_XML = new XMLHttpRequest();
    document.getElementById("pokemon_header_types").innerHTML = "";
    var url = 'http://pokeapi.co/api/v2/pokemon/'+pokemon_name;
    pokemon_XML.onreadystatechange = function() {
        if (pokemon_XML.readyState == 4 && pokemon_XML.status == 200) {
            var pokeJSON = JSON.parse(pokemon_XML.response);
            document.getElementById("pokemon_header_title").innerHTML = string_in;
            var pokeURL = pokeJSON.sprites.front_default;
            var array_types = [];
            for (var i = 0; i < pokeJSON.types.length; i++)
            {
                array_types.push(pokeJSON.types[i].type.name.charAt(0).toUpperCase() + pokeJSON.types[i].type.name.slice(1));
                document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" +pokeJSON.types[i].type.name + " ><p>"+pokeJSON.types[i].type.name.charAt(0).toUpperCase() + pokeJSON.types[i].type.name.slice(1)+"</p></div>";
            }
            var stats_name_obj = [];
            var stats_value_obj = [];
            for (i = 0; i < 6; i++)
            {
                console.log(pokeJSON.stats[i].stat.name)
                if (pokeJSON.stats[i].stat.name.startsWith("special-"))
                {
                    stats_name_obj.push("s. "+pokeJSON.stats[i].stat.name.slice(8));
                }
                else
                {
                    stats_name_obj.push(pokeJSON.stats[i].stat.name);
                }
                stats_value_obj.push(pokeJSON.stats[i].base_stat);
                if (i == 5) {
                    render_Radar(string_in,pokeURL, stats_name_obj, stats_value_obj);
                    typeEffectivity(array_types)
                }
            }

        }
    };
    pokemon_XML.open("GET", url, true);
    pokemon_XML.send();
}


function render_Radar(name,pokeURL, stats_name, stats_value){
    max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
    console.log(max_Val)
    var myConfig = {
        "globals": {
            "font-family": 'Exo 2, sans-serif',
            "shadow":false
        },
        x:"-25%",
        "title" : {
            visible:false,
            // "font-color": "#fff",
            // "font-family": 'Exo 2, sans-serif',
            // "text" : "Base Stats for " + name.charAt(0).toUpperCase() + name.slice(1),
            // "background-color":"transparent",
            // "font-size":"15",
            //
            // textAlign:"center"
        },
        type: "radar",
        backgroundColor: "transparent",
        scale:{
            sizeFactor: 1
        },
        plot: {
            aspect:"rose",
            "animation": {
                "effect":"ANIMATION_EXPAND_TOP",
                "sequence":"ANIMATION_BY_PLOT_AND_NODE",
                "speed":10
            },
            "stacked": true //To create a stacked radar chart.
        },
        "scale-k":{
            "aspect":"circle",
            "visible":false
        },

        "legend": {
            "layout":"6x1",
            "toggle-action": "none",
            "border-width": 0,
            "border-color": "none",
            backgroundColor: "#116381",
            "border-radius":"5vmin",
            x: "70%",
            y: "0%",
            height:"90%",
            "item": {
                "font-color": "#fff",
                "font-family": 'Exo 2, sans-serif',
                "font-size": "15px",
                "font-weight": "600",
            },

        },
        "scale-v":{
            "values": "0:"+ max_Val +":25",
            "guide": {
                "line-width":1,
                "line-style":"FFF",
                "line-color":"#FFF"
            },
            "item": {
                "color":"#FFF"
            },
            "line-color":"#FFF",
            alpha:0.6
        },
        "series" : [
            {
                "values" : [stats_value[0],null,null,null,null,null],
                "data-band" : [stats_name[0],null,null,null,null,null],
                "target" : "_blank",
                "background-color":"#8b1a1a",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#8b1a1a",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[0]
            },
            {
                "values" : [null,stats_value[1],null,null,null,null],
                "data-band" : [null,stats_name[1],null,null,null,null],
                "target" : "_blank",
                "background-color":"#ff7f00",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#ff7f00",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[1]
            },
            {
                "values" : [null,null,stats_value[2],null,null,null],
                "data-band" : [null,null,stats_name[2],null,null,null],
                "target" : "_blank",
                "background-color":"#daa520",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#daa520",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[2]
            },
            {
                "values" : [null,null,null,stats_value[3],null,null],
                "data-band" : [null,null,null,stats_name[3],null,null],
                "target" : "_blank",
                "background-color":"OliveDrab",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"OliveDrab",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[3]
            },
            {
                "values" : [null,null,null,null,stats_value[4],null],
                "data-band" : [null,null,null,null,stats_name[4],null],
                "target" : "_blank",
                "background-color":"#27408b",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#27408b",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[4]
            },
            {
                "values" : [null,null,null,null,null,stats_value[5]],
                "data-band" : [null,null,null,null,null,stats_name[5]],
                "target" : "_blank",
                "background-color":"#551a8b",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#551a8b",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[5]
            },
        ],
    };

    zingchart.render({
        id : 'radar',
        data : myConfig,
    });
    document.getElementById("pokemon_image").src = pokeURL;
    document.getElementById("radar").style.visibility = "visible";
    document.getElementById("loading").style.visibility = "hidden";
}

function typeEffectivity(types_in) {
    var poke = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
    var this_pokemon_index_array = [];
    types_in.forEach(function (type) {
        this_pokemon_index_array.push(poke.indexOf(type));
        console.log(type)
    })
    var string_type_name = types_in.toString().replace(","," ");
    var effectivity = [
        [1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1],
        [1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1],
        [1,   2, 0.5,   1, 0.5,   1,   1,   1,   2,   1,   1,   1,   2,   1, 0.5,   1,   1,   1],
        [1,   1,   2, 0.5, 0.5,   1,   1,   1,   0,   2,   1,   1,   1,   1, 0.5,   1,   1,   1],
        [1, 0.5,   2,   1, 0.5,   1,   1, 0.5,   2, 0.5,   1, 0.5,   2,   1, 0.5,   1, 0.5,   1],
        [1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   2,   2,   1,   1,   1,   1,   2,   1, 0.5,   1],
        [2,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5],
        [1,   1,   1,   1,   2,   1,   1, 0.5, 0.5,   1,   1,   1, 0.5, 0.5,   1,   1, 0.5,   2],
        [1,   2,   1,   2, 0.5,   1,   1,   2,   1,   0,   1, 0.5,   2,   1,   1,   1,   2,   1],
        [1,   1,   1, 0.5,   2,   1,   2,   1,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1],
        [1,   1,   1,   1,   1,   1,   2,   2,   1,   1, 0.5,   1,   1,   1,   1,   0, 0.5,   1],
        [1, 0.5,   1,   1,   2,   1, 0.5, 0.5,   1, 0.5,   2,   1,   1, 0.5,   1,   2, 0.5, 0.5],
        [1,   2,   1,   1,   1,   2, 0.5,   1, 0.5,   2,   1,   2,   1,   1,   1,   1, 0.5,   1],
        [0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1],
        [1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0],
        [1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1, 0.5],
        [1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2],
        [1, 0.5,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   1,   2,   2, 0.5,   1],
    ];
    function calculateEffectivity(attack_index_array, defense_index_array)
    {
        var effectivity_value = effectivity[defense_index_array[0]][attack_index_array[0]];
        if (defense_index_array.length == 2) {
            effectivity_value = effectivity_value*effectivity[defense_index_array[1]][attack_index_array[0]];
        }
        if (effectivity_value == 0)
        {
            effectivity_value = 1
        }
        return effectivity_value;
    }
    val_array = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([0],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([1],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([2],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([3],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([4],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([5],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([6],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([7],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([8],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([9],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([10],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([11],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([12],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([13],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([14],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([15],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([16],this_pokemon_index_array)],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([17],this_pokemon_index_array)],
        [calculateEffectivity(this_pokemon_index_array,[0]),
        calculateEffectivity(this_pokemon_index_array,[1]),
        calculateEffectivity(this_pokemon_index_array,[2]),
        calculateEffectivity(this_pokemon_index_array,[3]),
        calculateEffectivity(this_pokemon_index_array,[4]),
        calculateEffectivity(this_pokemon_index_array,[5]),
        calculateEffectivity(this_pokemon_index_array,[6]),
        calculateEffectivity(this_pokemon_index_array,[7]),
        calculateEffectivity(this_pokemon_index_array,[8]),
        calculateEffectivity(this_pokemon_index_array,[9]),
        calculateEffectivity(this_pokemon_index_array,[10]),
        calculateEffectivity(this_pokemon_index_array,[11]),
        calculateEffectivity(this_pokemon_index_array,[12]),
        calculateEffectivity(this_pokemon_index_array,[13]),
        calculateEffectivity(this_pokemon_index_array,[14]),
        calculateEffectivity(this_pokemon_index_array,[15]),
        calculateEffectivity(this_pokemon_index_array,[16]),
        calculateEffectivity(this_pokemon_index_array,[17]),
        calculateEffectivity(this_pokemon_index_array,this_pokemon_index_array)]
    ]
    console.log(val_array)
    var myConfig = {
        "type": "chord",
        "background-color": "transparent",
        "title": {
            // "text": "Pokemon Type Effectivity Chart for "+string_type_name,
            // "background-color": "transparent",
            // textAlign:"center",
            // "font-color": "#fff",
            // "font-family": 'Exo 2, sans-serif',
            visible:false
        },
        x:"-25%",
        "legend": {
            "layout":"10x2",
            "toggle-action": "none",
            "border-width": 0,
            "border-color": "none",
            backgroundColor: "#116381",
            "border-radius":"5vmin",
            x: "70%",
            y: "0%",
            height:"90%",
            "item": {
                "font-color": "#fff",
                "font-family": 'Exo 2, sans-serif',
                "font-size": "15px",
                "font-weight": "600",
            },
        },
        "plotarea": {
            "margin": "0 0 0 0"
        },
        "options": {
            "band-space": 0,
            "radius":  "100%",
            "shadow": 0,
            "border": "none",
            "color-type":"palette",
            "style":{
                "chord":{
                    "border-color":"none"
                },
                "tick":{
                    visible: false
                },
                "item":{
                    visible: false
                },
                "label": {
                    visible: false
                }
            },
            "palette":["#A8A878",
                "#F08030",
                "#6890F0",
                "#F8D030",
                "#78C850",
                "#98D8D8",
                "#C03028",
                "#A040A0",
                "#E0C068",
                "#A890F0",
                "#F85888",
                "#A8B820",
                "#B8A038",
                "#705898",
                "#7038F8",
                "#705848",
                "#B8B8D0",
                "#EE99AC",
                "#FFF"]
        },
        "series":[{
            text:"Normal",
            "values": val_array[0],
            "style": {
                "band": {
                    "background-color": "#C6C6A7",
                    "alpha": 1
                },
            },
        },{
            text:"Fire",
            "values": val_array[1],
            "style": {
                "band": {
                    "background-color": "#9C531F",
                    "alpha": 1
                },
            },
        },{
            text:"Water",
            "values": val_array[2],
            "style": {
                "band": {
                    "background-color": "#445E9C",
                    "alpha": 1
                },
            },
        },{
            text:"Electric",
            "values":val_array[3],
            "style": {
                "band": {
                    "background-color": "#A1871F",
                    "alpha": 1
                },
            },
        },{
            text:"Grass",
            "values":val_array[4],
            "style": {
                "band": {
                    "background-color": "#4E8234",
                    "alpha": 1
                },
            },
        },{
            text:"Ice",
            "values":val_array[5],
            "style": {
                "band": {
                    "background-color": "#638D8D",
                    "alpha": 1
                },
            },
        },{
            text:"Fighting",
            "values":val_array[6],
            "style": {
                "band": {
                    "background-color": "#7D1F1A",
                    "alpha": 1
                },
            },
        },{
            text:"Poison",
            "values":val_array[7],
            "style": {
                "band": {
                    "background-color": "#682A68",
                    "alpha": 1
                },
            },
        },{
            text:"Ground",
            "values":val_array[8],
            "style": {
                "band": {
                    "background-color": "#927D44",
                    "alpha": 1
                },
            },
        },{
            text:"Flying",
            "values": val_array[9],
            "style": {
                "band": {
                    "background-color": "#6D5E9C",
                    "alpha": 1
                },
            },
        },{
            text:"Psychic",
            "values": val_array[10],
            "style": {
                "band": {
                    "background-color": "#A13959",
                    "alpha": 1
                },
            },
        },{
            text:"Bug",
            "values": val_array[11],
            "style": {
                "band": {
                    "background-color": "#6D7815",
                    "alpha": 1
                },
            },
        },{
            text:"Rock",
            "values": val_array[12],
            "style": {
                "band": {
                    "background-color": "#786824",
                    "alpha": 1
                },
            },
        },{
            text:"Ghost",
            "values": val_array[13],
            "style": {
                "band": {
                    "background-color": "#493963",
                    "alpha": 1
                },
            },
        },{
            text:"Dragon",
            "values": val_array[14],
            "style": {
                "band": {
                    "background-color": "#4924A1",
                    "alpha": 1
                },
            },
        },{
            text:"Dark",
            "values": val_array[15],
            "style": {
                "band": {
                    "background-color": "#49392F",
                    "alpha": 1
                },
            },
        },{
            text:"Steel",
            "values": val_array[16],
            "style": {
                "band": {
                    "background-color": "#787887",
                    "alpha": 1
                },
            },
        },{
            text:"Fairy",
            "values": val_array[17],
            "style": {
                "band": {
                    "background-color": "#9B6470",
                    "alpha": 1
                },
            },
        },{
            text:string_type_name,
            "values": val_array[18],
            "style": {
                "band": {
                    "background-color": "#FFF",
                    "alpha": 1
                },
            },
        }]
    };

    zingchart.render({
        id : 'chord',
        data : myConfig,
    });
}







function selectRegion(region) {
    var gameSelect = document.getElementById("select_Version");
    for (var i = 0; i < gameSelect.options.length; i++)
    {
        gameSelect.options[i] = null;
    }
    var location = new XMLHttpRequest();
    var url = 'http://pokeapi.co/api/v2/region/'+region;
    location.onreadystatechange = function() {
        if (location.readyState == 4 && location.status == 200) {
            JSON.parse(location.response).version_groups.forEach(function (group) {
                versions().some(function (version_in) {
                    if (version_in.name == group.name){
                        version_in.versions.forEach(function (temp) {
                            pokeVersionArray.push(temp);
                            var newoptions = document.createElement("option");
                            newoptions.text = temp.name;
                            gameSelect.options.add(newoptions);
                        });
                        return true;
                    }
                });
            });
            versionSelect();
            gameSelect.onchange = versionSelect;
        }
    };
    location.open("GET", url, true);
    location.send();
}

function versionSelect() {
    pokeVersionArray.some(function (vers) {
        if (vers.name == document.getElementById("select_Version").value)
        {
            pokeVersion = vers;

        }
    });
    if (flag)
    {
        document.getElementById("select_Version").disabled = false;
        Array.prototype.slice.call(document.getElementsByClassName("checkboxElt")).forEach(function (currentElt) {
            currentElt.disabled = false;
            flag = 0;
        })
    }
}


var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134]];

