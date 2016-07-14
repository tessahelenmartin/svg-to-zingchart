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
        data: {
            "shapes":shapesArray,
            backgroundColor: "transparent",
        }
    });
    zingchart.shape_click = function(p) {
        if (SVGObject.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
            JSON.parse(SVGObject.getElementById(p.shapeid).getAttribute("areaid")).forEach(function (val) {
                pokescript.pokeLocationFunction(val,pokescript.outputPokeJSON);
            })
        }
    }
}

// var levelsData = [1,2,3,4,5,6,7]
// var pokemon = []
// var poke1 = [["PIKACHU"],[30,2,5,"SURF"],[30,2,5,"OLD ROD"]]//chance min max, method
// var poke2 = [["MAGICARP"],[20,1,3,"SURF"],[40,4,6,"OLD ROD"]]//chance min max, method
// var poke2 = [["MAGICARP"],[23,1,3,"SURF"],[10,4,6,"OLD ROD"]]//chance min max, method
// pokemon.push(poke1);
// pokemon.push(poke2);
// var pokeSeries = [];
// pokemon.forEach(function (poke){
//     poke.forEach(function (method_in){
//         if (method_in[0].typeOf != "string"){
//             var methodCatch = [0,0,0,0,0,0,0];
//             for (var i = method_in[1]; i <= method_in[2]; i++){
//                 methodCatch[(levelsData[0]) + i - 1]=method_in[0];
//             }
//             pokeSeries.push({
//                 text: poke[0] + " " + method_in[3],
//                 values:methodCatch,
//                 legendItem: {
//                     order: pokeSeries.length
//                 },
//                 backgroundColor: "#3e99cf",
//             })
//         }
//     })
// })
// console.log(pokeSeries)
//
// // {
// //     "text": "Communications",
// //     "values": [
// //     ],
// //     "background-color": "#3e99cf",
// //     "legend-item": {
// //         "order": 6
// //     }
// // }
// zingchart.THEME="classic";
// var myConfig = {
//     "graphset": [
//         {
//             "type": "bar",
//             "background-color": "#343856 #212339",
//             "fill-angle": 45,
//             "stacked": true,
//             "title": {
//                 "text": "COMMUNITY SERVER MONITORING",
//                 "text-align": "left",
//                 "font-family": "Arial",
//                 "font-size": "14px",
//                 "font-color": "#fff",
//                 "background-color": "none",
//                 "padding": "20px 0 0 20px",
//                 "height": "40px"
//             },
//             "legend": {
//                 "toggle-action": "none",
//                 "background-color": "#31344c",
//                 "border-width": 0,
//                 "border-color": "none",
//                 "padding": "10px 5px",
//                 "y": "75px",
//                 "shadow": 0,
//                 "item": {
//                     "font-color": "#fff",
//                     "font-family": "Arial",
//                     "font-size": "10px",
//                     "font-weight": "normal",
//                     "alpha": 0.6
//                 },
//                 "header": {
//                     "text": "MONITORED SYSTEMS",
//                     "font-family": "Arial",
//                     "font-size": "10px",
//                     "font-color": "#fff",
//                     "background-color": "#212339",
//                     "border-width": 0,
//                     "border-color": "none",
//                     "height": "30px",
//                     "padding": "5px 10px"
//                 }
//             },
//             "plotarea": {
//                 "margin": "75px 180px 85px 80px"
//             },
//             "plot": {
//                 "alpha": 0.8,
//                 "bar-width": "25px",
//                 "hover-state": {
//                     "background-color": "#212339",
//                     "alpha": 1
//                 },
//                 "animation": {
//                     "delay": 0,
//                     "effect": 3,
//                     "speed": "1000",
//                     "method": "0",
//                     "sequence": "1"
//                 }
//             },
//             "scale-x": {
//                 "values": levelsData,
//                 "items-overlap": true,
//                 "line-color": "#53566f",
//                 "tick": {
//                     "line-color": "#53566f"
//                 },
//                 "label": {
//                     "text": "SERVER BUILDING LOCATION",
//                     "font-family": "Arial",
//                     "font-weight": "normal",
//                     "font-size": "10px",
//                     "font-color": "#fff",
//                     "padding-top": "30px"
//                 },
//                 "guide": {
//                     "visible": false
//                 },
//                 "item": {
//                     "font-color": "#9a9cab",
//                     "font-family": "Arial",
//                     "font-size": "10px",
//                     "font-angle": -48,
//                     "offset-x": "5px"
//                 }
//             },
//             "scale-y": {
//                 "line-color": "#53566f",
//                 "tick": {
//                     "line-color": "#53566f"
//                 },
//                 "label": {
//                     "text": "SERVER CPU USAGE",
//                     "font-family": "Arial",
//                     "font-weight": "normal",
//                     "font-size": "10px",
//                     "font-color": "#fff"
//                 },
//                 "guide": {
//                     "line-style": "solid",
//                     "line-color": "#53566f",
//                     "line-width": "1px",
//                     "alpha": 0.4
//                 },
//                 "item": {
//                     "font-color": "#9a9cab",
//                     "font-family": "Arial",
//                     "font-size": "10px",
//                     "padding": "3px"
//                 }
//             },
//             "tooltip": {
//                 "text": "<b>%k</b><br>%t CPU usage: %v%<br><br><b>Average of all</b><br>%t CPU usage: %pavg%",
//                 "font-family": "Arial",
//                 "font-size": "10px",
//                 "font-weight": "normal",
//                 "font-color": "#fff",
//                 "decimals": 0,
//                 "text-align": "left",
//                 "border-radius": "8px",
//                 "padding": "10px 10px",
//                 "background-color": "#212339",
//                 "alpha": 0.95,
//                 "shadow": 0,
//                 "border-width": 0,
//                 "border-color": "none"
//             },
//             "series": pokeSeries
//         }
//     ]
// };
//
// zingchart.render({
//     id : 'myChart',
//     data : myConfig,
//     height: 500,
//     width: 725
// });