/**
 * Created by tmartin on 7/12/16.
 */
module.exports = function () {
    console.log("here")
    var location = new XMLHttpRequest();
    var url = 'http://pokeapi.co/api/v2/region/hoenn';
    location.onreadystatechange = function() {
        if (location.readyState == 4 && location.status == 200) {
            find(JSON.parse(location.response))
        }
    };
    location.open("GET", url, true);
    location.send();

    function find(valueIn) {
        var thing = []
        valueIn.locations.forEach(function (object) {
            var location_area = new XMLHttpRequest();
            var url = object.url;
            location_area.onreadystatechange = function() {
                if (location_area.readyState == 4 && location_area.status == 200) {
                    thing.push(JSON.parse(location_area.response))
                    console.log(JSON.stringify(thing))
                }
            };
            location_area.open("GET", url, true);
            location_area.send();
        })
    }
}