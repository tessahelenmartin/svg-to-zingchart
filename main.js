var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
var area = require('./getAreaInfo');
var SVGSTRING;

document.getElementById('select_Region').addEventListener("change", function () {
    document.getElementById("loading").visibility = "visible";
    var location = new XMLHttpRequest();
    var url = '/' + document.getElementById('select_Region').value + '.svg';
    location.onreadystatechange = function() {
        if (location.readyState == 4 && location.status == 200) {
            SVGSTRING = location.response;
            loadSVG(mainCallback);
        }
    };
    location.open("GET", url, true);
    location.send();
}, false);


function loadSVG(fxn) {
    var parser = new DOMParser();
    var SVGObject = parser.parseFromString(SVGSTRING, "image/svg+xml");
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
    mainCallback(SVGObject,shapesArray)
}

function mainCallback(SVGObject,shapesArray)
{
    zingchart.render({
        id: "SHAPESDIV",
        width: "100%",
        height: "100%",
        margins: 0,
        backgroundColor: "transparent",
        data: {
            backgroundColor: "transparent",
            "shapes": shapesArray
        }
    });
    zingchart.render({
        id: "CHARTDIV",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        data: {
            id: "pokemonRoute",
            "type": "bar",
            "background-color": "transparent",
            "fill-angle": 45,
            "stacked": true,
            width: "100%",
            height: "100%",
            "title": {
                "text": "Likelyhood of Encountering Pokemon",
                "text-align": "left",
                "font-family": 'Exo 2, sans-serif',
                "font-size": "20px",
                "font-color": "#fff",
                "background-color": "none",
                "padding": "20px 0 0 20px",
                "height": "40px"
            },
            "legend": {
                "layout":"12x1",
                "toggle-action": "none",
                "background-color": "#0B4153",
                "border-width": 0,
                "border-color": "none",
                "y": "0",
                "x": "80%",
                "height":"95%",
                "width":"20%",
                "padding-bottom":"10px",
                "shadow": 0,
                "max-items":12,
                "overflow":"scroll",
                "scroll":{
                    "bar":{
                        "background-color":"#0D4A61",
                        "border-left":"1px solid #0D4A61",
                        "border-right":"1px solid #0D4A61",
                        "border-top":"1px solid #0D4A61",
                        "border-bottom":"1px solid #0D4A61",
                    },
                    "handle":{
                        "background-color":"#116381",
                        "border-left":"2px solid #116381",
                        "border-right":"2px solid #116381",
                        "border-top":"2px solid #116381",
                        "border-bottom":"2px solid #116381",
                        "border-radius":"15px"
                    }
                },
                "item": {
                    "overflow":"wrap",
                    "font-color": "#fff",
                    "font-family": 'Exo 2, sans-serif',
                    "font-size": "15px",
                    "font-weight": "normal",
                    "alpha": 0.6
                },
                "header": {
                    "text": "POKEMON ON ROUTE",
                    "font-family": 'Exo 2, sans-serif',
                    "font-size": "15px",
                    "font-color": "#fff",
                    "background-color": "#082F3D",
                    "border-width": 0,
                    "border-color": "none",
                    "height": "5%",
                    "padding": "0 0 0 20px",
                }
            },
            "plotarea":{
                "margin-left":"10%",
                "margin-right":"25%",
                "margin-top":"15%",
                "margin-bottom":"20%"
            },
            "plot": {
                "alpha": 0.8,
                "bar-width": "10px",
                "hover-state": {
                    "background-color": "#212339",
                    "alpha": 1
                },
                "animation": {
                    "delay": 0,
                    "effect": 3,
                    "speed": 1000,
                    "method": 0,
                    "sequence": 1
                }
            },
            "scale-x": {
                "values": pokescript.pokemonOut[0],
                "items-overlap": false,
                "line-color": "#E6ECED",
                "line-width": "1px",
                "tick": {
                    "line-color": "#E6ECED",
                    "line-width": ".75px",
                },
                "label": {
                    "text": "Pokemon Level",
                    "font-family": 'Exo 2, sans-serif',
                    "font-weight": "normal",
                    "font-size": "20px",
                    "font-color": "#fff",
                    "padding-top": "30px"
                },
                "guide": {
                    "visible": false
                },
                "item": {
                    "font-color": "#fff",
                    "font-family": "Exo 2, sans-serif",
                    "font-size": "10px",
                    "font-angle": -48,
                    "offset-x": "5px"
                }
            },
            "scale-y": {
                "line-color": "#E6ECED",
                "line-width": "1px",
                "tick": {
                    "line-color": "#E6ECED",
                    "line-width": ".75px",
                },
                "label": {
                    "text": "Encounter Chance",
                    "font-family": 'Exo 2, sans-serif',
                    "font-weight": "normal",
                    "font-size": "20px",
                    "font-color": "#fff"
                },
                "guide": {
                    "visible":false
                },
                "item": {
                    "font-color": "#fff",
                    "font-family": "Exo 2, sans-serif",
                    "font-size": "10px",
                    "padding": "3px"
                }
            },
            "tooltip": {
                "text": "Chance of encountering a level %k %t: %v",
                "font-family": 'Exo 2, sans-serif',
                "font-size": "15px",
                "font-weight": "normal",
                "font-color": "#fff",
                "decimals": 0,
                "text-align": "left",
                "border-radius": "8px",
                "padding": "10px 10px",
                "background-color": "#0B4153",
                "alpha": 0.95,
                "shadow": 0,
                "border-width": 0,
                "border-color": "none"
            },
            "series": pokescript.pokemonOut[1]
        }
    });
    zingchart.shape_click = function(p) {
        if (SVGObject.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
            document.getElementById("loading").style.visibility = "visible";
            pokescript.beginRoute(JSON.parse(SVGObject.getElementById(p.shapeid).getAttribute("areaid")));
        }
    };
    zingchart.legend_item_click = function(p) {
        document.getElementById("loading").style.visibility = "visible";
        document.getElementById("pokemon_image").src = "holder.png";
        document.getElementById("radar").style.visibility = "hidden";
        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
        pokescript.selectPokemon(pokeText.slice(0,pokeText.indexOf('<')));
    };
    document.getElementById("loading").style.visibility = "hidden";
}