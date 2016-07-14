/**
 * Created by tmartin on 7/12/16.
 */
var versions = require('./versions');
var pokeVersion;
var pokeVersionArray = [];
module.exports = {
    pokeLocationFunction: function (value) {
        var location = new XMLHttpRequest();
        var url = 'http://pokeapi.co/api/v2/location-area/'+value;
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                pokemonOnRoute(JSON.parse(location.response));
            }
        };
        location.open("GET", url, true);
        location.send();
    },
    createDropDown:selectRegion,
    outputSeries:function(value){
        outputPokeJSON(value)
    }
};

function pokemonOnRoute(location_area_in, callback_in) {
    var possiblePokemon = location_area_in.pokemon_encounters;
    var pokediv = document.getElementById("pokediv");
    pokediv.innerHTML = "";
    var min = null;
    var max = null;
    var pokeSeries = [];
    possiblePokemon.forEach(function (poke){
        var thisPokemonEncounters = [];
        var currentTable = pokediv.appendChild(document.createElement("TABLE"));
        poke.version_details.some(function (currentVersion) {
            console.log(currentVersion.version.name);
            if (currentVersion.version.name == pokeVersion.name)
            {
                var cell = currentTable.insertRow(-1).insertCell(-1);
                var pokeName = poke.pokemon.name.charAt(0).toUpperCase() + poke.pokemon.name.slice(1);
                var location = new XMLHttpRequest();
                var url = poke.pokemon.url;
                location.onreadystatechange = function() {
                    if (location.readyState == 4 && location.status == 200) {
                        var methodArray = [[pokeName]]

                        /*JSON.parse(location.response).types.forEach(function (each) {
                            STRING += each.type.name + ", ";
                        });
                         STRING = STRING.substr(0,STRING.length-2) + ")";
                         message += STRING;
                         message +=" can be encountered using the following methods:";
                         cell.innerHTML = message;
                         cell.appendChild(document.createElement("br"));
                         currentVersion.encounter_details.forEach(function (encounter) {
                         cell.innerHTML += encounter.method.name.charAt(0).toUpperCase() + encounter.method.name.slice(1)+ " with a encounter chance of " + encounter.chance + "% between levels " + encounter.min_level + " and " + encounter.max_level;
                         cell.appendChild(document.createElement("br"))
                         return true;
                         });*/
                        currentVersion.encounter_details.forEach(function (encounter) {
                            if ((min == null) || encounter.min_level < min)
                            {
                                min = encounter.min_level;
                            }
                            if ((max == null) || encounter.max_level > max)
                            {
                                max = encounter.max_level;
                            }
                            methodArray.push([encounter.chance, encounter.min_level, encounter.max_level, encounter.method.name.charAt(0).toUpperCase() + encounter.method.name.slice(1)]);
                            return true;
                        })
                        thisPokemonEncounters.push(methodArray);

                    }
                };
                location.open("GET", url, true);
                location.send()
            }
        });
        pokeSeries.push(thisPokemonEncounters);
    });
    callback_in(pokeSeries);
}

function outputPokeJSON(min,max, poke_in) {
    var levelsINDEX = [];
    var levelsTEMP = [];
    for (var i = min; i <= max; i++){
        levelsINDEX.push(i);
        levelsTEMP.push(0);
    }
    poke_in.forEach(function (encounter) {
        encounter.forEach(function (method_in){
            if (method_in[0].typeOf != "string"){
                var methodCatch = levelsTEMP;
                for (var i = method_in[1]; i <= method_in[2]; i++){
                    methodCatch[(levelsData[0]) + i - 1]=method_in[0];
                }
                pokeSeries.push({
                    text: poke[0] + " " + method_in[3],
                    values:methodCatch,
                    legendItem: {
                        order: pokeSeries.length
                    },
                    backgroundColor: "#3e99cf",
                })
            }
        })
    })
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
