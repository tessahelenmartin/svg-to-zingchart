var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        //displayContents(contents);
        loadSVG(contents)
    };
    reader.readAsText(file, "image/svg+xml");
}

function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.innerHTML = contents;
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);


function loadSVG(object) {
    var parser = new DOMParser();
    var SVGObject = parser.parseFromString(object, "image/svg+xml");
    pokescript.createDropDown(SVGObject.getElementsByTagName("svg")[0].getAttribute("regionID"));
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
        id: "CHARTDIV",
        width: "100%",
        height: "100%",
        data: {
            "shapes":shapesArray,
            backgroundColor: "transparent",
        }
    });
    zingchart.shape_click = function(p) {
        JSON.parse(SVGObject.getElementById(p.shapeid).getAttribute("areaid")).forEach(function (val) {
            pokescript.pokeLocationFunction(val);
        })

    }
}