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
/***/ function(module, exports) {

	/**
	 * Created by tmartin on 7/8/16.
	 */
	document.getElementById("sample-svg").onload = function () {
	    var SVGObject = document.getElementById("sample-svg").contentDocument;
	    var pathList = SVGObject.getElementsByTagName("path");
	    var pathArray = Array.from(pathList);
	    var shapesArray = [];
	    shapesArray.push({
	        "type":"zingchart.maps",
	        "options":{
	            "name":"world.countries",
	            "id":"test",
	            "scale":true,
	            "zoom":1,
	            "groups":[],
	            "items":[],
	            "ignore":[],
	            "style":{
	                "label":{
	                    "visible":false
	                }
	            },
	            "graphid":0
	        }
	    })
	    pathArray.forEach(function (path) {
	        shapesArray.push(makeShape(path));
	        console.log(makeShape(path))
	    });
	    window.setTimeout(toZingChartShape, 1000);
	    function toZingChartShape() {
	        zingchart.render({
	            id: "sample",
	            width: "100%",
	            height: "100%",
	            data: {
	                "shapes":shapesArray
	            }
	        })
	    }
	};


	function pathToString(array) {
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
	                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2))/5;
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
	    var points_in = [];
	    if (path.getAttribute("d")) {
	        points_in = pathToString(path.getAttribute("d").trim().split(/[\s,]+/));
	    }
	    console.log(points_in)
	    var lineColor_in = "black";
	    var fillColor_in = "none";
	    var strokeWidth_in = "5";
	    var style_array = path.getAttribute("style").split(";");
	    style_array.forEach(function (value) {
	        value.trim();
	        if (value.startsWith("stroke:")) {
	            lineColor_in = value.substr(7);
	            console.log(lineColor_in);
	        }
	        if (value.startsWith("fill:")) {
	            fillColor_in = value.substr(5);
	            console.log(fillColor_in);
	        }
	        if (value.startsWith("stroke-width:")) {
	            strokeWidth_in = value.substr(13);
	            console.log(strokeWidth_in);
	        }
	    });
	    return {
	        type:"poly",
	        borderWidth:strokeWidth_in,
	        borderColor:lineColor_in,
	        backgroundColor:fillColor_in,
	        points:points_in,
	        "generated":true,
	        "map-item":true,
	        "shadow":true,
	        "shadow-distance":3,
	        "shadow-color":"#ccc",
	        "shadow-alpha": 1,
	        "z-sort":0,
	        "z-index":0,
	    };
	}

/***/ }
/******/ ]);