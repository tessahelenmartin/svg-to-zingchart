var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
var area = require('./getAreaInfo');
var SVGSTRING;




module.exports = function (val_in_1,val_in_2) {
    return mainCallback(val_in_1, val_in_2);
};


document.getElementById('select_Region').addEventListener("change", function () {
    document.getElementById("loading").visibility = "visible";
    var location = new XMLHttpRequest();
    var url = '/' + document.getElementById('select_Region').value + '.svg';
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