var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');

document.getElementById("sample-svg").onload = function () {
    var SVGObject = document.getElementById("sample-svg").contentDocument;
    var pathList = SVGObject.getElementsByTagName("path");
    var pathArray = Array.from(pathList);
    var shapesArray = [];
    pathArray.forEach(function (path) {
        shapesArray.push(svgToZing(path));
    });
    var circleList = SVGObject.getElementsByTagName("circle");
    var circleArray = Array.from(circleList);
    circleArray.forEach(function (circle) {
        shapesArray.push(svgToZing(circle))
    });
    zingchart.render({
        id: "sample",
        width: "100%",
        height: "100%",
        data: {
            "shapes":shapesArray,
            backgroundColor: "transparent",
        }
    });
    zingchart.shape_click = function(p) {
        console.log(SVGObject.getElementById(p.shapeid).getAttribute("areaid"))
        JSON.parse(SVGObject.getElementById(p.shapeid).getAttribute("areaid")).forEach(function (val) {
            pokescript.pokeLocationFunction(val);
        })

    }
};