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
module.exports = {
    pokeLocationFunction: function (value, cbfxn) {
        var location = new XMLHttpRequest();
        var url = 'http://pokeapi.co/api/v2/location-area/'+value;
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                min = null;
                max = null;
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
    pokemonSERIES = [];
    levelsINDEX = [];
    var possiblePokemon = location_area_in.pokemon_encounters;
    for (var i = 0; i < possiblePokemon.length; i++)
    {
        if (i == possiblePokemon.length-1)
        {
            callback_in(possiblePokemon[i], true);
        }
        else
        {
            callback_in(possiblePokemon[i], false);
        }
    }
}

function handlePokemon(pokemon, boolval) {
    var thisPokemonEncounters = [];
    for (var versionNUM = 0; versionNUM < pokemon.version_details.length; versionNUM++) {
        if (pokemon.version_details[versionNUM].version.name == pokeVersion.name) {
            for (var encounter = 0; encounter < pokemon.version_details[versionNUM].encounter_details.length; encounter++) {
                var thisEncounter = pokemon.version_details[versionNUM].encounter_details[encounter];
                if(/*thisEncounter.method.name == "walk"*/ true){
                    if ((min == null) || thisEncounter.min_level < min) {
                        min = thisEncounter.min_level;
                    }
                    if ((max == null) || thisEncounter.max_level > max) {
                        max = thisEncounter.max_level;
                    }
                    thisPokemonEncounters.push([pokemon.pokemon.name,parseInt(thisEncounter.chance), parseInt(thisEncounter.min_level),  parseInt(thisEncounter.max_level), thisEncounter.method.name.charAt(0).toUpperCase() + thisEncounter.method.name.slice(1)]);
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
        levelsTEMP.push(0);
    }
    console.log(pokemonSERIES)
    var count = 0;
    for (var p = 0; p < pokemonSERIES.length; p++){
        for (var k = 0; k < pokemonSERIES[p].length;k++) {
            count++;
            var methodCatch = levelsTEMP.slice();
            for (i = pokemonSERIES[p][k][2]; i <= pokemonSERIES[p][k][3]; i++) {
                methodCatch[i - min] = pokemonSERIES[p][k][1];
            }
            var text = pokemonSERIES[p][k][0] + " " + pokemonSERIES[p][k][4];
            pokeJSON.push({
                text: text,
                values: methodCatch,
                legendItem: {
                    order: count
                },
                backgroundColor: "#"+intToRGB(hashCode(pokemonSERIES[p][k][0])+hashCode(pokemonSERIES[p][k][0]))
            })
        }
        if (p == pokemonSERIES.length-1)
        {
            zingchart.exec('CHARTDIV', 'setseriesdata', {
                data : pokeJSON
            });
            zingchart.exec('CHARTDIV', 'modify', {
                data : {
                    "scale-x": {
                        "values": levelsINDEX
                    },
                    "scale-y": {}
                }
            });
            console.log(
                zingchart.exec('CHARTDIV', 'getdata')
            );
        }
    }
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}






function selectRegion(region) {
    var gameSelect = document.getElementById("Select-Region")
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
            console.log(vers.name)
        }
    });
}
