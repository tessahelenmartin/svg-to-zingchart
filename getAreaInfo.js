/**
 * Created by tmartin on 7/12/16.
 */
module.exports = function () {
    var thing = [];
    var location = new XMLHttpRequest();
    var url = 'http://pokeapi.co/api/v2/region/kalos/';
    location.onreadystatechange = function() {
        if (location.readyState == 4 && location.status == 200) {
            find(JSON.parse(location.response))
        }
        console.log(thing)
    };
    location.open("GET", url, true);
    location.send();



    function find(valueIn) {
        valueIn.locations.forEach(function (object) {
            console.log("HERE")
            var location_area = new XMLHttpRequest();
            var url = object.url;
            location_area.onreadystatechange = function() {
                if (location_area.readyState == 4 && location_area.status == 200) {
                    thing.push(JSON.parse(location_area.response))
                }
            };
            location_area.open("GET", url, true);
            location_area.send();
        })
    }
}