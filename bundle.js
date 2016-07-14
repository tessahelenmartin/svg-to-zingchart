/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var pokescript = __webpack_require__(1);
	var svgToZing = __webpack_require__(2);
	function readFile(e) {
	    var file = e.target.files[0];
	    if (!file) {
	        return;
	    }
	    var reader = new FileReader();
	    reader.onload = function(e) {
	        var contents = e.target.result;
	        displayContents(contents);
	    };
	    reader.readAsText(file);
	}
	readFile("./pokemap-SIMPLE.svg");
	FileReader.onload = function () {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by tmartin on 7/12/16.
	 */
	module.exports = {

	    pokeLocationFunction: function (value) {
	        console.log(value);
	        var location = new XMLHttpRequest();
	        var url = 'http://pokeapi.co/api/v2/location-area/'+value;
	        location.onreadystatechange = function() {
	            if (location.readyState == 4 && location.status == 200) {
	                pokemonOnRoute(JSON.parse(location.response));
	            }
	        };
	        location.open("GET", url, true);
	        location.send();
	        console.log(location.responseText)
	    }

	};

	function pokemonOnRoute(location_area_in) {
	    var possiblePokemon = location_area_in.pokemon_encounters;
	    possiblePokemon.forEach(function (poke){
	    console.log(poke.pokemon.name);
	    })
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by tmartin on 7/8/16.
	 */

	module.exports = function (val_in) {
	    return makeShape(val_in);
	};

	function pathToPolygon(array) {
	    var pointsArray = [];
	    var currentLetter = "";
	    var position = 0;
	    var pointCount = 0; //CURVE
	    var curvePoints = [];
	    var recentStart = [0,0];
	    array.forEach(function (value) {
	        if (isNaN(parseFloat(value))){
	            currentLetter = value;
	            if ((currentLetter == "M" || currentLetter == "m") && pointsArray.length > 0)
	            {
	                pointsArray.push(null);
	            }
	            if (currentLetter == "z" || currentLetter == "Z"){
	                pointsArray.push([recentStart[0],recentStart[1]]);
	            }
	        }
	        else {
	            switch (currentLetter) {
	                case 'M':
	                    if (position) {
	                        pointsArray[pointsArray.length-1].push(parseFloat(value));
	                        recentStart[1] = parseFloat(value);
	                        position = 0;

	                    }
	                    else {
	                        pointsArray.push([parseFloat(value)]);
	                        recentStart[0] = parseFloat(value);
	                        position = 1;
	                    }
	                    break;
	                case 'L':
	                    if (position) {
	                        pointsArray[pointsArray.length-1].push(parseFloat(value));
	                        position = 0;
	                    }
	                    else {
	                        pointsArray.push([parseFloat(value)]);
	                        position = 1;
	                    }
	                    break;
	                case 'C':
	                    if (position == 0) {
	                        if (pointCount == 0)
	                        {
	                            curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
	                        }
	                        curvePoints.push([parseFloat(value)]);
	                        position = 1;
	                    }
	                    else {
	                        curvePoints[curvePoints.length-1].push(parseFloat(value));
	                        pointCount++;
	                        position = 0;
	                        if (pointCount == 3)
	                        {
	                            var vals = bezier(curvePoints);
	                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
	                            for (var t = 0; t < distance;t++) {
	                                pointsArray.push(vals(t/distance));
	                            }
	                            curvePoints = [];
	                            pointCount = 0;
	                        }
	                    }
	                    break;
	                case 'A':
	                    //handle arc
	                    break;
	            }
	        }
	    });
	    return pointsArray;
	}
	function pathToLine(array) {
	    var pointsArray = [];
	    var currentLetter = "";
	    var position = 0;
	    var pointCount = 0; //CURVE
	    var curvePoints = [];
	    var recentStart = [0,0];
	    array.forEach(function (value) {
	        if (isNaN(parseFloat(value))){
	            currentLetter = value;
	            if ((currentLetter == "M" || currentLetter == "m") && pointsArray.length > 0)
	            {
	                pointsArray.push(null);
	            }
	            if (currentLetter == "z" || currentLetter == "Z"){
	                pointsArray.push([recentStart[0],recentStart[1]]);
	            }
	        }
	        else {
	            switch (currentLetter) {
	                case 'M':
	                    if (position) {
	                        pointsArray[pointsArray.length-1].push(parseFloat(value));
	                        recentStart[1] = parseFloat(value);
	                        position = 0;

	                    }
	                    else {
	                        pointsArray.push([parseFloat(value)]);
	                        recentStart[0] = parseFloat(value);
	                        position = 1;
	                    }
	                    break;
	                case 'L':
	                    if (position) {
	                        pointsArray[pointsArray.length-1].push(parseFloat(value));
	                        position = 0;
	                    }
	                    else {
	                        pointsArray.push([parseFloat(value)]);
	                        position = 1;
	                    }
	                    break;
	                case 'C':
	                    if (position == 0) {
	                        if (pointCount == 0)
	                        {
	                            curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
	                        }
	                        curvePoints.push([parseFloat(value)]);
	                        position = 1;
	                    }
	                    else {
	                        curvePoints[curvePoints.length-1].push(parseFloat(value));
	                        pointCount++;
	                        position = 0;
	                        if (pointCount == 3)
	                        {
	                            var vals = bezier(curvePoints);
	                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
	                            for (var t = 0; t < distance;t++) {
	                                pointsArray.push(vals(t/distance));
	                            }
	                            curvePoints = [];
	                            pointCount = 0;
	                        }
	                    }
	                    break;
	                case 'A':
	                    //handle arc
	                    break;
	            }
	        }
	    });
	    return pointsArray;
	}

	function makeShape(path) {
	    var lineColor_in = "black";
	    var fillColor_in = "none";
	    var strokeWidth_in = "5";
	    var points_in = [];
	    var style_array = [];
	    if (path.getAttribute("class") == "LAND") {
	        if (path.getAttribute("d")) {
	            points_in = pathToPolygon(path.getAttribute("d").trim().split(/[\s,]+/));
	            style_array = path.getAttribute("style").split(";");
	            style_array.forEach(function (value) {
	                value.trim();
	                if (value.startsWith("stroke:")) {
	                    lineColor_in = value.substr(7);
	                }
	                else if (value.startsWith("fill:")) {
	                    fillColor_in = value.substr(5);
	                }
	                else if (value.startsWith("stroke-width:")) {
	                    strokeWidth_in = value.substr(13);
	                }
	            });
	            return {
	                id: path.getAttribute("id"),
	                type: "poly",
	                borderWidth: strokeWidth_in,
	                borderColor: lineColor_in,
	                backgroundColor: fillColor_in,
	                points: points_in,
	                "shadow": true,
	                "shadow-distance": 3,
	                "shadow-color": "#0D485F",
	                "shadow-alpha": 1,
	            };
	        }
	    }
	    else if (path.getAttribute("class") == "ROUTE") {
	        if (path.getAttribute("d")) {
	            points_in = pathToLine(path.getAttribute("d").trim().split(/[\s,]+/));
	            lineColor_in = "black";
	            strokeWidth_in = "5";
	            style_array = path.getAttribute("style").split(";");
	            style_array.forEach(function (value) {
	                value.trim();
	                if (value.startsWith("stroke:")) {
	                    lineColor_in = value.substr(7);
	                }
	                else if (value.startsWith("stroke-width:")) {
	                    strokeWidth_in = value.substr(13);
	                }
	            });
	            return {
	                id: path.getAttribute("id"),
	                type: "line",
	                lineWidth: strokeWidth_in,
	                lineColor: lineColor_in,
	                points: points_in,
	                //FOR POKEMON
	                "hover-state": {
	                    "lineColor": "#FFD700",
	                }
	            };
	        }
	    }
	    else if (path.getAttribute("class") == "CITY") {
	        var circleR = path.getAttribute("r").trim();
	        var circleX = path.getAttribute("cx").trim();
	        var circleY = path.getAttribute("cy").trim();
	        lineColor_in = "black";
	        strokeWidth_in = "5";
	        style_array = path.getAttribute("style").split(";");
	        style_array.forEach(function (value) {
	            value.trim();
	            if (value.startsWith("stroke:")) {
	                lineColor_in = value.substr(7);
	            }
	            else if (value.startsWith("fill:")) {
	                fillColor_in = value.substr(5);
	            }
	            if (value.startsWith("stroke-width:")) {
	                strokeWidth_in = value.substr(13);
	            }
	        });
	        return {
	            id: path.getAttribute("id"),
	            type:"circle",
	            borderWidth:strokeWidth_in,
	            borderColor:lineColor_in,
	            backgroundColor: fillColor_in,
	            size:circleR,
	            x: circleX,
	            y: circleY,
	            //FOR POKEMON
	            "hover-state": {
	                "lineColor": "#FFD700",
	            }
	        };
	    }
	}

/***/ }
/******/ ]);