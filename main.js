var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
var area = require('./getAreaInfo');


//area();
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
        backgroundColor: "transparent",
        data: {
                    id: "pokemonRoute",
                    "type": "bar",
                    "background-color": "#343856 #212339",
                    "fill-angle": 45,
                    "stacked": true,
                    width: "50%",
                    height: "100%",
                    "shapes":shapesArray,
                    x:"50%",
                    "title": {
                        "text": "Likelyhood of Encountering Pokemon",
                        "text-align": "left",
                        "font-family": "Arial",
                        "font-size": "20px",
                        "font-color": "#fff",
                        "background-color": "none",
                        "padding": "20px 0 0 20px",
                        "height": "40px"
                    },
                    "legend": {
                        "toggle-action": "none",
                        "background-color": "#31344c",
                        "border-width": 0,
                        "border-color": "none",
                        "padding": "10px 5px",
                        "y": "75px",
                        "shadow": 0,
                        "item": {
                            "font-color": "#fff",
                            "font-family": "Arial",
                            "font-size": "15px",
                            "font-weight": "normal",
                            "alpha": 0.6
                        },
                        "header": {
                            "text": "MONITORED SYSTEMS",
                            "font-family": "Arial",
                            "font-size": "15px",
                            "font-color": "#fff",
                            "background-color": "#212339",
                            "border-width": 0,
                            "border-color": "none",
                            "height": "30px",
                            "padding": "5px 10px"
                        }
                    },
                    "plotarea": {
                        "margin": "75px 180px 85px 80px"
                    },
                    "plot": {
                        "bar-width": "10px",
                        "hover-state": {
                            "background-color": "#212339",
                            "alpha": 1
                        },
                    },
                    "scale-x": {
                        "values": pokescript.pokemonOut[0],
                        "items-overlap": true,
                        "line-color": "#53566f",
                        "tick": {
                            "line-color": "#53566f"
                        },
                        "label": {
                            "text": "Pokemon Level",
                            "font-family": "Arial",
                            "font-weight": "normal",
                            "font-size": "20px",
                            "font-color": "#fff",
                            "padding-top": "30px"
                        },
                        "guide": {
                            "visible": false
                        },
                        "item": {
                            "font-color": "#9a9cab",
                            "font-family": "Arial",
                            "font-size": "10px",
                            "font-angle": -48,
                            "offset-x": "5px"
                        }
                    },
                    "scale-y": {
                        "line-color": "#53566f",
                        "tick": {
                            "line-color": "#53566f"
                        },
                        "label": {
                            "text": "Encounter Chance",
                            "font-family": "Arial",
                            "font-weight": "normal",
                            "font-size": "20px",
                            "font-color": "#fff"
                        },
                        "guide": {
                            "line-style": "solid",
                            "line-color": "#53566f",
                            "line-width": "1px",
                            "alpha": 0.4
                        },
                        "item": {
                            "font-color": "#9a9cab",
                            "font-family": "Arial",
                            "font-size": "30px",
                            "padding": "3px"
                        }
                    },
                    "tooltip": {
                        "text": "Chance of encountering a level %k %t: %v",
                        "font-family": "Arial",
                        "font-size": "15px",
                        "font-weight": "normal",
                        "font-color": "#fff",
                        "decimals": 0,
                        "text-align": "left",
                        "border-radius": "8px",
                        "padding": "10px 10px",
                        "background-color": "#212339",
                        "alpha": 0.95,
                        "shadow": 0,
                        "border-width": 0,
                        "border-color": "none"
                    },
                    "series": pokescript.pokemonOut[1]
        },
    });
    zingchart.shape_click = function(p) {
        if (SVGObject.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
            JSON.parse(SVGObject.getElementById(p.shapeid).getAttribute("areaid")).forEach(function (val) {
                pokescript.pokeLocationFunction(val);
            })
        }
    }
}

