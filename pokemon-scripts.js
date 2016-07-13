/**
 * Created by tmartin on 7/12/16.
 */
module.exports = {

    pokeLocationFunction: function (value) {
        console.log(value);
        var location = new XMLHttpRequest();
        var url = 'http://pokeapi.co/api/v2/location-area/'+value;
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                pokemonOnRoute(JSON.parse(location.response));
            }
        };
        location.open("GET", url, true);
        location.send();
        console.log(location.responseText)
    }

};

function pokemonOnRoute(location_area_in) {
    var possiblePokemon = location_area_in.pokemon_encounters;
    possiblePokemon.forEach(function (poke){
    console.log(poke.pokemon.name);
    })
}