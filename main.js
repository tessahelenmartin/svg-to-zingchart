var pokescript = require('./pokemon-scripts');
var SVGSTRING;
window.addEventListener('load',function () {
    pokescript.setUp(6);
    beginApp('Kalos')
})
function beginApp(region_in) {
    if (document.getElementById('subtext_region').text != "")
    {
        var location = new XMLHttpRequest();
        var url = '/region_maps/' + region_in.toLowerCase() + '.svg';
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                SVGSTRING = location.response;
                loadSVG()
            }
        };
        location.open("GET", url, true);
        location.send();

    }
    function loadSVG() {
        var parser = new DOMParser();
        var SVGObject = parser.parseFromString(SVGSTRING, "image/svg+xml");
        pokescript.createDropDown(SVGObject.getElementsByTagName("svg")[0].getAttribute("regionID"), SVGObject);
    }
}

var region_array = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova','Kalos'];

var map_iterator = 5;  // the index of the current item to show

document.getElementById("back_region").onclick = function () {
    map_iterator+=5;
    map_iterator%=6;
    document.getElementById('subtext_region').innerHTML = "Region: "+region_array[map_iterator];
    pokescript.setUp(map_iterator+1);
    beginApp(region_array[map_iterator])
};
document.getElementById("next_region").onclick = function () {
    map_iterator+=5;
    map_iterator%=6;
    document.getElementById('subtext_region').innerHTML = "Region: "+region_array[map_iterator];
    pokescript.setUp(map_iterator+1);
    beginApp(region_array[map_iterator])
};

document.querySelector(".backToMap").onclick = function () {
    document.querySelector(".p1").style.display  = "flex";
    document.querySelector(".p2").style.display  = "none";
}

// setInterval(function() {            // setInterval makes it run repeatedly
//     document
//         .getElementById('HEADER_subtext')
//         .innerHTML = title[i++];    // get the item and increment
//     if (i == title.length) i = 0;   // reset to first element if you've reached the end
// }, 1000);
