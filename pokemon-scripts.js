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
var locationName;
module.exports = {
    pokeLocationFunction: function (value, cbfxn) {
        var location = new XMLHttpRequest();
        var url = 'http://pokeapi.co/api/v2/location-area/'+value;
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                methodIndex = [];
                min = null;
                max = null;
                for (var i = 0; i < document.getElementById("selectMethod").elements.length; i++){
                    if (document.getElementById("selectMethod").elements[i].checked) {
                        methodIndex.push(document.getElementById("selectMethod").elements[i].value)
                    }
                }
                pokemonOnRoute(JSON.parse(location.response),handlePokemon);
            }
        };
        location.open("GET", url, true);
        location.send();
    },
    createDropDown:selectRegion,
    pokemonOut:[levelsINDEX, pokeJSON]
};

function pokemonOnRoute(location_area_in, callback_in) {
    var tempArray = [];
    location_area_in.name.split("-").forEach(function (val) {
         tempArray.push(val.charAt(0).toUpperCase() + val.slice(1));
    });
    locationName = tempArray.join(" ");
    pokemonSERIES = [];
    levelsINDEX = [];
    var colorArray = colorOptions.slice();
    var possiblePokemon = location_area_in.pokemon_encounters;
    for (var i = 0; i < possiblePokemon.length; i++)
    {
        if (i == possiblePokemon.length-1)
        {
            callback_in(possiblePokemon[i],colorArray, true);
        }
        else
        {
            callback_in(possiblePokemon[i],colorArray, false);
        }
    }
}

function handlePokemon(pokemon,colorArray, boolval) {
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
                        currentColor[0] -= 20;
                        currentColor[1] -= 20;
                        currentColor[2] -= 20;
                    }
                    else if (thisEncounter.method.name == "good-rod")
                    {
                        currentColor[0] -= 40;
                        currentColor[1] -= 40;
                        currentColor[2] -= 40;
                    }
                    else if (thisEncounter.method.name == "super-rod")
                    {
                        currentColor[0] -= 60;
                        currentColor[1] -= 60;
                        currentColor[2] -= 60;
                    }
                    else if (thisEncounter.method.name == "surf")
                    {
                        currentColor[0] -= 100;
                        currentColor[1] -= 100;
                        currentColor[2] -= 100;
                    }
                    thisPokemonEncounters.push([pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1),parseInt(thisEncounter.chance), parseInt(thisEncounter.min_level),  parseInt(thisEncounter.max_level), thisEncounter.method.name,  "rgb(" + currentColor.join(",")+")"]);
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

    for (var p = 0; p < pokemonSERIES.length; p++){
        for (var k = 0; k < pokemonSERIES[p].length;k++) {
            var text = pokemonSERIES[p][k][0] + " " + pokemonSERIES[p][k][4];
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
        if (p == pokemonSERIES.length-1)
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
        }
    }
}








function selectRegion(region) {
    var gameSelect = document.getElementById("Select-Region");
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
        if (vers.name == document.getElementById("Select-Region").value)
        {
            pokeVersion = vers;

        }
    });
}


var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204]];

