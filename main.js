var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
var SVGSTRING;
var location_areas;

window.addEventListener("load", beginApp);
function beginApp() {
    document.getElementById('select_Region').addEventListener("change", function () {
        document.getElementById("loading").visibility = "visible";
        var location = new XMLHttpRequest();
        var url = '/' + document.getElementById('select_Region').value + '.svg';
        console.log(url)
        location.onreadystatechange = function() {
            if (location.readyState == 4 && location.status == 200) {
                SVGSTRING = location.response;
                loadSVG();
            }
        };
        location.open("GET", url, true);
        location.send();
    }, false);

    function loadSVG() {
        var parser = new DOMParser();
        var SVGObject = parser.parseFromString(SVGSTRING, "image/svg+xml");
        console.log(SVGObject)
        var pathList = SVGObject.getElementsByTagName("path");
        var pathArray = Array.from(pathList);
        var shapesArray = [];
        pathArray.forEach(function (path) {
            shapesArray.push(svgToZing.mkshape(path));
        });
        var circleList = SVGObject.getElementsByTagName("circle");
        var circleArray = Array.from(circleList);
        circleArray.forEach(function (circle) {
            shapesArray.push(svgToZing.mkshape(circle))
        });
        pokescript.createDropDown(SVGObject.getElementsByTagName("svg")[0].getAttribute("regionID"),[SVGObject,shapesArray]);
    }

}