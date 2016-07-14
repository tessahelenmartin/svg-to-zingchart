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
    createDropDown:selectRegion
};

function pokemonOnRoute(location_area_in) {
    var possiblePokemon = location_area_in.pokemon_encounters;
    var pokediv = document.getElementById("pokediv");
    pokediv.innerHTML = "";
    possiblePokemon.forEach(function (poke){
        var currentTable = pokediv.appendChild(document.createElement("TABLE"));
        poke.version_details.some(function (currentVersion) {
            if (currentVersion.version.name == pokeVersion.name)
            {
                var cell = currentTable.insertRow(-1).insertCell(-1);
                var message = "";
                message = poke.pokemon.name.charAt(0).toUpperCase() + poke.pokemon.name.slice(1) + " ";
                var location = new XMLHttpRequest();
                var url = poke.pokemon.url;
                location.onreadystatechange = function() {
                    if (location.readyState == 4 && location.status == 200) {
                        var STRING = "(";
                        JSON.parse(location.response).types.forEach(function (each) {
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
                        });
                    }
                };
                location.open("GET", url, true);
                location.send()
            }
        })
    })
}

function selectRegion(region) {
    var gameSelect = document.getElementById("Select-Region")
    for (var i = 0; i < gameSelect.options.length; i++)
    {
        gameSelect.options[i] = null;
    }
    var location = new XMLHttpRequest();
    var array = [];
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
