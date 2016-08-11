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

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var pokescript = __webpack_require__(2);
	var svgToZing = __webpack_require__(3);
	var SVGSTRING;

	window.addEventListener("load", beginApp);
	function beginApp() {
	    document.getElementById('select_Region').addEventListener("change", function () {
	        if (document.getElementById('select_Region').value != "")
	        {
	            document.getElementById("loading").visibility = "visible";
	            var location = new XMLHttpRequest();
	            var url = '/region_maps/' + document.getElementById('select_Region').value + '.svg';
	            console.log(url)
	            location.onreadystatechange = function() {
	                if (location.readyState == 4 && location.status == 200) {
	                    SVGSTRING = location.response;
	                    loadSVG();
	                }
	            };
	            location.open("GET", url, true);
	            location.send();
	        }
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by tmartin on 7/12/16.
	 */
	var pokeVersion;
	var pokeVersionArray = [];
	var min = null;
	var max = null;
	var pokemonSERIES = [];
	var pokeJSON = [];
	var levelsINDEX = [];
	var methodIndex = [];
	var locationName = "";
	var selected_areaName = "";
	var selected_areaID;
	var selected_method;
	var responseArray = [];
	var svg_stored;
	var shapes_stored;
	var region_stored;
	var selectedShapeID = null;
	var regions = {
	    "1": {
	        "name": "Kanto"
	    },
	    "2": {
	        "name": "Johto"
	    },
	    "3": {
	        "name": "Hoenn"
	    },
	    "4": {
	        "name": "Sinnoh"
	    },
	    "5": {
	        "name": "Unova"
	    },
	    "6": {
	        "name": "Kalos"
	    }
	};
	var stats = {
	    "1": {
	        text:'HP',
	        color: '#b20000'
	    },
	    "2": {
	        text:'Attack',
	        color: '#d8732b'
	    },
	    "3": {
	        text:'Defense',
	        color: '#dfbb2b'
	    },
	    "4": {
	        text:'S. Attack',
	        color: '#6890F0'
	    },
	    "5": {
	        text:'S. Defense',
	        color: '#78C850'
	    },
	    "6": {
	        text:'Speed',
	        color: '#F85888'
	    },
	    "7": {
	        text:'Accuracy',
	        color: '#1A8B55'
	    },
	    "8": {
	        text:'Evasion',
	        color: '#47A0A2'
	    }
	}
	var types = {
	        "1": {
	            "identifier": "normal",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "2": {
	            "identifier": "fighting",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "3": {
	            "identifier": "flying",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "4": {
	            "identifier": "poison",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "5": {
	            "identifier": "ground",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "6": {
	            "identifier": "rock",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "7": {
	            "identifier": "bug",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "8": {
	            "identifier": "ghost",
	            "generation_id": 1,
	            "damage_class_id": 2
	        },
	        "9": {
	            "identifier": "steel",
	            "generation_id": 2,
	            "damage_class_id": 2
	        },
	        "10": {
	            "identifier": "fire",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "11": {
	            "identifier": "water",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "12": {
	            "identifier": "grass",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "13": {
	            "identifier": "electric",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "14": {
	            "identifier": "psychic",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "15": {
	            "identifier": "ice",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "16": {
	            "identifier": "dragon",
	            "generation_id": 1,
	            "damage_class_id": 3
	        },
	        "17": {
	            "identifier": "dark",
	            "generation_id": 2,
	            "damage_class_id": 3
	        },
	        "18": {
	            "identifier": "fairy",
	            "generation_id": 6,
	            "damage_class_id": ""
	        },
	        "10001": {
	            "identifier": "unknown",
	            "generation_id": 2,
	            "damage_class_id": ""
	        },
	        "10002": {
	            "identifier": "shadow",
	            "generation_id": 3,
	            "damage_class_id": ""
	        }
	    }
	var method_names = ["walk", "old-rod","good-rod","super-rod","surf","rock-smash","headbutt","dark-grass","grass-spots","cave-spots","bridge-spots","super-rod-spots","surf-spots","yellow-flowers","purple-flowers","red-flowers","rough-terrain"]
	var pokedex = []
	var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134],[255,183,183],[255,234,183],[255,255,183],[234,255,183],[183,255,183],[183,255,234],[183,255,255],[183,234,255],[183,183,255],[234,183,255],[255,183,255],[255,183,234],[185,113,113],[185,134,113],[185,185,113],[134,185,113],[113,185,113],[113,185,134],[113,185,185],[113,134,185],[113,113,185],[134,113,185],[185,113,185],[185,113,134]];
	var prevMultiple = 1;
	module.exports = {
	    createDropDown:initialFunction
	};

	function initialFunction(region,render_obj) {
	    selectedShapeID = null;
	    document.getElementById("select_Method").options.length = 0;
	    var tempOptionMethod = document.createElement("option");
	    tempOptionMethod.text = "Select Method";
	    tempOptionMethod.selected = true;
	    tempOptionMethod.disabled = true;
	    document.getElementById("select_Method").add(tempOptionMethod)
	    document.getElementById("select_Location_Area").options.length = 0;
	    var tempOptionArea = document.createElement("option");
	    tempOptionArea.text = "Select Area";
	    tempOptionArea.selected = true;
	    tempOptionArea.disabled = true;
	    document.getElementById("select_Location_Area").add(tempOptionArea)
	    document.getElementById("select_Version").options.length = 0;
	    var tempOptionVersion = document.createElement("option");
	    tempOptionVersion.text = "Select Version";
	    tempOptionVersion.selected = true;
	    tempOptionVersion.disabled = true;
	    document.getElementById("select_Version").add(tempOptionVersion)
	    svg_stored = render_obj[0];
	    shapes_stored = render_obj[1];
	    region_stored = parseInt(region);
	    prevMultiple = 1;
	    createPokedex();
	    renderShape();
	}

	function createPokedex() {
	    firebase.database().ref("pokemon").orderByKey().once("value").then(function(snapshot) {
	        snapshot.forEach(function (snap_child) {
	            pokedex.push(snap_child.val());
	        })
	    });
	}

	function renderShape() {
	    setHeightWidth()
	    zingchart.render({
	        id: "SHAPESDIV",
	        width: "100%",
	        height: "100%",
	        margins: 0,
	        backgroundColor: "transparent",
	        data: {
	            backgroundColor: "transparent",
	            "shapes": shapes_stored
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
	                    "alpha": 0.6,
	                    cursor: "pointer"
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
	                    "effect": 1,
	                    "speed": 1000,
	                    "method": 0,
	                    "sequence": 1
	                }
	            },
	            "scale-x": {
	                "values": [],
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
	                "text": "Chance of encountering a level %k %t: %v%",
	                "font-family": 'Exo 2, sans-serif',
	                "font-size": "15px",
	                "font-weight": "normal",
	                "font-color": "#fff",
	                "decimals": 2,
	                "text-align": "left",
	                "border-radius": "8px",
	                "padding": "10px 10px",
	                "background-color": "#0B4153",
	                "alpha": 0.95,
	                "shadow": 0,
	                "border-width": 0,
	                "border-color": "none"
	            },
	            "series": pokeJSON
	        }
	    });
	    zingchart.shape_click = function(p) {
	        if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
	            console.log(p.shapeid)
	            if (selectedShapeID != null)
	            {
	                zingchart.exec('SHAPESDIV', 'updateobject', {
	                    'type':'shape',
	                    'data' : {
	                        'id' : selectedShapeID,
	                        'line-color' : 'black',
	                        'border-color' : 'black',
	                        'background-color': 'black',
	                        zIndex : 2
	                    }
	                });
	            }
	            selectedShapeID = p.shapeid;
	            zingchart.exec('SHAPESDIV', 'updateobject', {
	                'type':'shape',
	                'data' : {
	                    'id' : selectedShapeID,
	                    'line-color' : '#b81c19',
	                    zIndex : 3
	                }
	            });
	            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
	        }
	        else if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "LANDMARK"){
	            console.log(p.shapeid)
	            if (selectedShapeID != null)
	            {
	                zingchart.exec('SHAPESDIV', 'updateobject', {
	                    'type':'shape',
	                    'data' : {
	                        'id' : selectedShapeID,
	                        'border-color' : 'black',
	                        'background-color': 'black',
	                        'line-color' : 'black',
	                        zIndex : 1
	                    }
	                });
	            }
	            selectedShapeID = p.shapeid;
	            zingchart.exec('SHAPESDIV', 'updateobject', {
	                'type':'shape',
	                'data' : {
	                    'id' : selectedShapeID,
	                    'border-color' : '#b81c19',
	                    'background-color': '#b81c19',
	                    zIndex : 3
	                }
	            });
	            // document.getElementById("loading").style.visibility = "visible";
	            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
	        }
	    };
	    zingchart.legend_item_click = function(p) {
	        // document.getElementById("loading").style.visibility = "visible";
	        document.getElementById("pokemon_image").src = "UI_images/holder.png";
	        document.getElementById("radar").style.visibility = "hidden";
	        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
	        infoAboutSelectedPokemon(pokeText.slice(0,pokeText.indexOf('(')),pokeText.slice(pokeText.indexOf('(ID: ')+5,pokeText.indexOf(')')));
	    };
	    // document.getElementById("loading").style.visibility = "hidden";
	    window.onresize = function(){
	        setHeightWidth();
	        var currentShapeArray = [];
	        zingchart.exec('SHAPESDIV', 'setdata', {
	            data : {
	                backgroundColor: "transparent",
	                shapes : shapes_stored
	            }
	        });
	    };
	}

	function setHeightWidth(){
	    var multiple = (document.getElementById("SHAPESDIV").offsetHeight)/ 400;
	    shapes_stored.forEach(function(shape){
	        if (shape.type == "circle") {
	            shape.size *= multiple/prevMultiple;
	            shape.x *= multiple/prevMultiple;
	            shape.y *= multiple/prevMultiple;
	        }
	        else {
	            shape.points.forEach(function(point_array){
	                if (point_array != null)
	                {
	                    for (var pt = 0;point_array.length > pt; pt++)
	                    {
	                        point_array[pt] *= multiple/prevMultiple;
	                    }
	                }
	            })
	        }
	    });
	    prevMultiple = multiple
	}

	function beginRoute(inVal) {
	    methodIndex = [];
	    pokemonSERIES = [];
	    levelsINDEX = [];
	    pokeJSON = [];
	    locationName = "";
	    responseArray = [];
	    min = null;
	    max = null;
	    document.getElementById("select_Method").options.length = 0;
	    var tempOptionMethod = document.createElement("option");
	    tempOptionMethod.text = "Select Method";
	    tempOptionMethod.selected = true;
	    tempOptionMethod.disabled = true;
	    document.getElementById("select_Method").add(tempOptionMethod)
	    document.getElementById("select_Location_Area").options.length = 0;
	    var tempOptionArea = document.createElement("option");
	    tempOptionArea.text = "Select Area";
	    tempOptionArea.selected = true;
	    tempOptionArea.disabled = true;
	    document.getElementById("select_Location_Area").add(tempOptionArea)
	    document.getElementById("select_Version").options.length = 0;
	    var tempOptionVersion = document.createElement("option");
	    tempOptionVersion.text = "Select Version";
	    tempOptionVersion.selected = true;
	    tempOptionVersion.disabled = true;
	    document.getElementById("select_Version").add(tempOptionVersion)
	    pokeLocationFunction(inVal);
	}

	function formatLocationArea(name) {
	    function hyphenLowerToSpaceUpper(match) {
	        return ' ' + match.slice(1).toUpperCase();
	    }
	    return name.replace(/\-([a-z])|\-\d/g, hyphenLowerToSpaceUpper);
	}

	function pokeLocationFunction (inVal) {
	    firebase.database().ref("locations/"+inVal.toString()).once("value").then(function (locationName_accessed) {
	        getAllAreasInLocation(locationName_accessed.val()["identifier"],inVal)
	    });
	}

	function getAllAreasInLocation(location_in,location_id){
	    locationName = location_in;
	    accessDatabaseCHILD(firebase.database().ref("location-areas"), "location_id", location_id, function (areas) {
	        if (areas.length != 0){
	            document.getElementById("select_Location_Area").options.length = 0;
	            var tempOptionArea = document.createElement("option");
	            tempOptionArea.text = "Select Area";
	            tempOptionArea.selected = true;
	            tempOptionArea.disabled = true;
	            document.getElementById("select_Location_Area").add(tempOptionArea)
	            selectLocationArea(areas)
	        }
	        else
	        {
	            alert("We're sorry, we don't detect any wild pokemon in this area!")
	        }
	    },1)
	}

	function selectLocationArea(areas_in){
	    for (var i = 0; i < areas_in.length; i++){
	        var newoptions = document.createElement("option");
	        if (areas_in[i].identifier != "")
	        {
	            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1)) + " " + formatLocationArea(areas_in[i].identifier[0].toUpperCase() + areas_in[i].identifier.slice(1));
	        }
	        else
	        {
	            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1));
	        }
	        newoptions.value = areas_in[i].id;
	        document.getElementById("select_Location_Area").options.add(newoptions);
	        if (i == areas_in.length - 1)
	        {
	            document.getElementById("select_Location_Area").disabled = false;
	            document.getElementById("select_Location_Area").onchange = function () {
	                if (document.getElementById("select_Location_Area").value != "")
	                {
	                    document.getElementById("select_Method").options.length = 0;
	                    var tempOptionMethod = document.createElement("option");
	                    tempOptionMethod.text = "Select Method";
	                    tempOptionMethod.selected = true;
	                    tempOptionMethod.disabled = true;
	                    document.getElementById("select_Method").add(tempOptionMethod)
	                    document.getElementById("select_Version").options.length = 0;
	                    var tempOptionVersion = document.createElement("option");
	                    tempOptionVersion.text = "Select Version";
	                    tempOptionVersion.selected = true;
	                    tempOptionVersion.disabled = true;
	                    document.getElementById("select_Version").add(tempOptionVersion)
	                    setMethodOptions()
	                }
	            }
	        }
	    }
	}

	function setMethodOptions(){
	    selected_areaName = document.getElementById("select_Location_Area").options[document.getElementById("select_Location_Area").selectedIndex].text;
	    selected_areaID = document.getElementById("select_Location_Area").value;
	    console.log("location-area-methods/"+selected_areaID)
	    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
	        console.log("Methods available for area "+selected_areaID+" "+ snapMethods.numChildren());
	        snapMethods.val().forEach(function (method_indiv) {
	            console.log(method_indiv)
	            var newoptions = document.createElement("option");
	            newoptions.text = method_names[method_indiv-1];
	            newoptions.value = method_indiv;
	            document.getElementById("select_Method").options.add(newoptions);
	            if (snapMethods.numChildren() == document.getElementById("select_Method").options.length-1)
	            {
	                document.getElementById("select_Method").disabled = false;
	                document.getElementById("select_Method").onchange = function () {
	                    if (document.getElementById("select_Method").value != "")
	                    {
	                        document.getElementById("select_Version").options.length = 0;
	                        var tempOptionVersion = document.createElement("option");
	                        tempOptionVersion.text = "Select Version";
	                        tempOptionVersion.selected = true;
	                        tempOptionVersion.disabled = true;
	                        document.getElementById("select_Version").add(tempOptionVersion)
	                        selectRegion();
	                    }
	                }
	            }
	        })
	    });
	}

	function selectRegion() {
	    selected_method = document.getElementById("select_Method").value;
	    var tempcount = 0;
	    var gameSelect = document.getElementById("select_Version");
	    console.log(region_stored)
	    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
	        console.log(version_groups);
	        for (var group = 0; group < version_groups.length; group++)
	        {
	            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
	                console.log(versions_in_group);
	                for (var individual = 0; individual < versions_in_group.length; individual++) {
	                    var temp = versions_in_group[individual];
	                    pokeVersionArray.push(temp);
	                    var newoptions = document.createElement("option");
	                    newoptions.text = "";
	                    var holdName = [];
	                    temp.identifier.split("-").forEach(function (val) {
	                        holdName.push(val.charAt(0).toUpperCase() + val.slice(1));
	                    });
	                    newoptions.text = holdName.join(" ");
	                    newoptions.value = temp.id;
	                    gameSelect.options.add(newoptions);
	                    if (individual == versions_in_group.length - 1) {
	                        if (tempcount == version_groups.length - 1) {
	                            document.getElementById("select_Version").disabled = false;
	                        }
	                        else
	                        {
	                            tempcount++;
	                        }
	                    }
	                }
	            },1);
	        }
	    },1);
	    document.getElementById("select_Version").onchange = versionSelect;
	}

	function versionSelect() {
	    if (document.getElementById("select_Version").value != "Select Version")
	    {
	        pokeVersion = document.getElementById("select_Version").value;
	        getEncountersAtAreaGivenMethod(document.getElementById("select_Location_Area").value,document.getElementById("select_Method").value);
	    }
	}

	function getEncountersAtAreaGivenMethod(a_in, m_in) {
	    methodIndex = [];
	    pokemonSERIES = [];
	    levelsINDEX = [];
	    pokeJSON = [];
	    locationName = "";
	    responseArray = [];
	    min = null;
	    max = null;
	    var version_IN;
	    if (pokeVersion == 25 || pokeVersion == 26) {
	        version_IN = (pokeVersion%25)+7;
	    }
	    else
	    {
	        version_IN = pokeVersion;
	    }
	    firebase.database().ref("encounters/"+ a_in + "/"+version_IN+","+ m_in).once("value").then(postFirebase);
	    function postFirebase(snapshot){
	        var snaparray = [];
	        if (snapshot.numChildren() > 0) {
	            snapshot.forEach(function (snap_child) {
	                snaparray.push(snap_child.val())
	                if (snaparray.length == snapshot.numChildren())
	                {
	                    pokemonOnRoute(snaparray,handlePokemon);
	                }
	            })
	        }
	        else
	        {
	            if (pokeVersion == 10 || pokeVersion == 11) {
	                console.log("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in)
	                firebase.database().ref("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in).once("value").then(function (snaptwo) {
	                    var snaparray = [];
	                    if (snaptwo.numChildren() > 0) {
	                        snaptwo.forEach(function (snap_child) {
	                            snaparray.push(snap_child.val())
	                            if (snaparray.length == snaptwo.numChildren()) {
	                                pokemonOnRoute(snaparray, handlePokemon)
	                            }
	                        })
	                    }
	                    else
	                    {
	                        alert("We're sorry, we don't detect any wild pokemon in this area!")
	                    }
	                })
	            }
	            else
	            {
	                alert("We're sorry, we don't detect any wild pokemon in this area!")
	            }
	        }
	    }
	}

	function pokemonOnRoute(possiblePokemonEncounters,callback_in) {
	    if (possiblePokemonEncounters.length == 0){
	        alert("We're sorry, we don't detect any wild pokemon in this area!");
	        return;
	    }
	    pokemonSERIES = [];
	    levelsINDEX = [];
	    var colorArray = colorOptions.slice();
	    for (var p = 0; p < possiblePokemonEncounters.length; p ++) {
	        if (p == possiblePokemonEncounters.length-1)
	        {
	            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
	        }
	        else
	        {
	            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
	        }
	    }
	}

	function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
	    console.log(pokemon_id)
	    var rand = Math.floor(Math.random() * (colorArray.length-1));
	    colorArray.splice(rand,1);
	    if ((min == null) || pokemon.min_level < min) {
	        min = pokemon.min_level;
	    }
	    if ((max == null) || pokemon.max_level > max) {
	        max = pokemon.max_level;
	    }

	    console.log(pokemon_name+ " at rarity "+parseInt(pokemon.rarity));
	    pokemonSERIES.push([pokemon_name,parseInt(pokemon.rarity), parseInt(pokemon.min_level),  parseInt(pokemon.max_level),  "rgb(" + colorArray[rand].join(",")+")",pokemon_id]);
	    if (boolval)
	    {
	        outputPokeJSON(updateChart)
	    }
	}

	function outputPokeJSON(callback) {
	    pokeJSON = [];
	    var levelsTEMP = [];
	    for (var i = min; i <= max; i++){
	        levelsINDEX.push(i);
	        levelsTEMP.push(null);
	    }
	    var JSONStorage = [];
	    var count = 0;

	    for (var p = pokemonSERIES.length - 1; p >= 0; p-- ){
	        count++
	        var text = pokemonSERIES[p][0] + "(ID: "+ pokemonSERIES[p][5] +")";
	        var index = -1;
	        for (var r = 0; r < JSONStorage.length; r++)
	        {
	            if (text == JSONStorage[r][0])
	            {
	                index = r;
	                break;
	            }
	        }
	        if (index != -1)
	        {
	            for(i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
	                if (JSONStorage[r][1][i - min] != null)
	                {
	                    JSONStorage[r][1][i - min] += pokemonSERIES[p][1];
	                }
	                else
	                {
	                    JSONStorage[r][1][i - min] = pokemonSERIES[p][1];
	                }
	            }
	        }
	        else
	        {
	            var methodCatch = levelsTEMP.slice();
	            for (i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
	                methodCatch[i - min] = pokemonSERIES[p][1];
	            }
	            count++;
	            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4]]);
	        }
	        if (p == 0)
	        {
	            JSONStorage.forEach(function (storedEncounter) {
	                pokeJSON.push({
	                    text: storedEncounter[0],
	                    values: storedEncounter[1],
	                    legendItem: {
	                        order: storedEncounter[2]
	                    },
	                    backgroundColor: storedEncounter[3]
	                })
	            });
	            // document.getElementById("loading").style.visibility = "hidden";
	            callback()
	        }
	    }

	}

	function updateChart() {
	    zingchart.exec('CHARTDIV', 'setseriesdata', {
	        data : pokeJSON
	    });
	    zingchart.exec('CHARTDIV', 'modify', {
	        data : {
	            "title": {
	                "text": "Likelyhood of Encountering Pokemon in " + selected_areaName + " with method " + method_names[selected_method-1]
	            },
	            "scale-x": {
	                "values": levelsINDEX
	            },
	            "scale-y": {}
	        }
	    });
	}

	function infoAboutSelectedPokemon(pokename,id_in) {
	    var poke_id = parseInt(id_in);
	    document.getElementById("pokemon_header_types").innerHTML = pokename.charAt(0).toUpperCase() + pokename.slice(1);
	    accessDatabaseCHILD(firebase.database().ref("pokemon-stats"), "pokemon_id", poke_id, function (pokemon_stats) {
	        var stats_name_obj = [];
	        var stats_value_obj = [];
	        var effort_obj = [];
	        for (var q = 0; q < pokemon_stats.length;q++) {
	            stats_name_obj.push(pokemon_stats[q].stat_id);
	            stats_value_obj.push(pokemon_stats[q].base_stat);
	            effort_obj.push(pokemon_stats[q].effort);
	            if (q == pokemon_stats.length-1) {
	                render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                document.getElementById("nature").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("HP").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("attack").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("defense").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("s_attack").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("s_defense").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                document.getElementById("speed").onchange = function () {
	                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
	                }
	                render_Radar(pokename,id_in, stats_name_obj, stats_value_obj);
	                accessDatabaseCHILD(firebase.database().ref("pokemon-types"), "pokemon_id", poke_id, function (pokemon_types) {
	                    if (pokemon_types.length == 2)
	                    {
	                        var type1 = types[pokemon_types[0].type_id].identifier;
	                        var type2 = types[pokemon_types[1].type_id].identifier;
	                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type1 + " ><p>"+type1.charAt(0).toUpperCase() + type1.slice(1)+"</p></div>";
	                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type2 + " ><p>"+type2.charAt(0).toUpperCase() + type2.slice(1)+"</p></div>";
	                        typeEffectivity([pokemon_types[0].type_id,pokemon_types[1].type_id], type1.charAt(0).toUpperCase() + type1.slice(1)+" "+type2.charAt(0).toUpperCase() + type2.slice(1))
	                    }
	                    else
	                    {
	                        var type = types[pokemon_types[0].type_id].identifier;
	                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type + " ><p>"+type.charAt(0).toUpperCase() + type.slice(1)+"</p></div>";
	                        typeEffectivity([pokemon_types[0].type_id],type.charAt(0).toUpperCase() + type.slice(1))
	                    }
	                },1);
	            }
	        }
	    },1);
	}

	function render_Radar(pokename,id_in, stats_name, stats_value){
	    var max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
	    var radar_series = []
	    var null_array = [null,null,null,null,null,null,null,null].slice(0,stats_value.length);
	    for (var t = 0; t < stats_value.length; t++)
	    {
	        var values_array = null_array.slice();
	        values_array[t]  = stats_value[t];
	        var names_array = null_array.slice();
	        names_array[t]  = stats[stats_name[t]].text;
	        radar_series.push({
	            "values" : values_array,
	            "data-band": names_array,
	            "target" : "_blank",
	            "background-color":stats[stats_name[t]].color,
	            "tooltip": {
	                "text":"%data-band: %v",
	                "background-color":stats[stats_name[t]].color,
	                "color":"#FFF",
	                "font-size":"14px"
	            },
	            "text":stats[stats_name[1]].text
	            })
	        if (t == stats_value.length - 1)
	        {

	            var myRadar = {
	                "globals": {
	                    "font-family": 'Exo 2, sans-serif',
	                    "shadow":false
	                },
	                "title" : {
	                    visible:true,
	                    "font-color": "#fff",
	                    "font-family": 'Exo 2, sans-serif',
	                    "text" : "Base Stats for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
	                    "background-color":"transparent",
	                    "font-size":"15",
	                    height:"10%",
	                    textAlign:"center"
	                },
	                type: "radar",
	                backgroundColor: "transparent",
	                scale:{
	                    sizeFactor: "100%"
	                },
	                plot: {
	                    "background-color":"#fff",
	                    aspect:"rose",
	                    "animation": {
	                        "effect":"ANIMATION_EXPAND_TOP",
	                        "sequence":"ANIMATION_BY_PLOT_AND_NODE",
	                        "speed":10
	                    },
	                    "stacked": true //To create a stacked radar chart.
	                },
	                "scale-k":{
	                    "aspect":"circle",
	                    "visible":false
	                },
	                // "legend": {
	                //     "layout":"6x1",
	                //     "toggle-action": "none",
	                //     "border-width": 0,
	                //     "border-color": "none",
	                //     backgroundColor: "#116381",
	                //     "border-radius":"5vmin",
	                //     x: "70%",
	                //     y: "0%",
	                //     height:"90%",
	                //     "item": {
	                //         "font-color": "#fff",
	                //         "font-family": 'Exo 2, sans-serif',
	                //         "font-size": "15px",
	                //         "font-weight": "600",
	                //     },
	                //
	                // },
	                "scale-v":{
	                    "values": "0:"+ max_Val +":25",
	                    "guide": {
	                        "line-width":1,
	                        "line-style":"FFF",
	                        "line-color":"#FFF"
	                    },
	                    "item": {
	                        "color":"#FFF"
	                    },
	                    "line-color":"#FFF",
	                    alpha:0.6
	                },
	                plotarea:{
	                    height:"100%",
	                },
	                "series" : radar_series
	            };

	            zingchart.render({
	                id : 'radar',
	                data : myRadar,
	            });
	            document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
	            document.getElementById("radar").style.visibility = "visible";
	        }
	    }
	}

	function typeEffectivity(types_in, typename) {

	    var effectivity = [
	        [1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
	        [1,1,2,1,1,0.5,0.5,1,1,1,1,1,1,2,1,1,0.5,2],
	        [1,0.5,1,1,0,2,0.5,1,1,1,1,0.5,2,1,2,1,1,1],
	        [1,0.5,1,0.5,2,1,0.5,1,1,1,1,0.5,1,2,1,1,1,0.5],
	        [1,1,1,0.5,1,0.5,1,1,1,1,2,2,0,1,2,1,1,1],
	        [0.5,2,0.5,0.5,2,1,1,1,2,0.5,2,2,1,1,1,1,1,1],
	        [1,0.5,2,1,0.5,2,1,1,1,2,1,0.5,1,1,1,1,1,1],
	        [0,0,1,0.5,1,1,0.5,2,1,1,1,1,1,1,1,1,2,1],
	        [0.5,2,0.5,0,2,0.5,0.5,1,0.5,2,1,0.5,1,0.5,0.5,0.5,1,0.5],
	        [1,1,1,1,2,2,0.5,1,0.5,0.5,2,0.5,1,1,0.5,1,1,0.5],
	        [1,1,1,1,1,1,1,1,0.5,0.5,0.5,2,2,1,0.5,1,1,1],
	        [1,1,2,2,0.5,1,2,1,1,2,0.5,0.5,0.5,1,2,1,1,1],
	        [1,1,0.5,1,2,1,1,1,0.5,1,1,1,0.5,1,1,1,1,1],
	        [1,0.5,1,1,1,1,2,2,1,1,1,1,1,0.5,1,1,2,1],
	        [1,2,1,1,1,2,1,1,2,2,1,1,1,1,0.5,1,1,1],
	        [1,1,1,1,1,1,1,1,1,0.5,0.5,0.5,0.5,1,2,2,1,2],
	        [1,2,1,1,1,1,2,0.5,1,1,1,1,1,0,1,1,0.5,2],
	        [1,0.5,1,2,1,1,0.5,1,2,1,1,1,1,1,1,0,0.5,1]
	    ];
	    var this_pokemon_index_array = [];
	    types_in.forEach(function (type) {
	        this_pokemon_index_array.push(parseInt(type)-1);
	    });
	    function calculateEffectivity(attack_index, defense_index_array) {
	        var effectivity_value = effectivity[defense_index_array[0]][attack_index];
	        if (defense_index_array.length == 2) {
	            effectivity_value = effectivity_value*effectivity[defense_index_array[1]][attack_index];
	        }
	        return effectivity_value;
	    };
	    var currentShapeArray = [{"type":"poly","shapeid":"branch-1","backgroundColor":"#ffffff","points":[[600,129.49895],[600,144.49895],[525,271.99898],[600,159.49895],[600,174.49895],[525,286.99898],[600,189.49896],[600,204.49896],[525,301.99899],[600,219.49896],[600,234.49897],[525,316.99899],[600,249.49897],[600,264.49898],[525,331.99899],[600,279.49898],[600,294.49898],[525,346.999],[600,309.49899],[600,324.49899],[525,361.999],[600,339.49899],[600,354.499],[525,376.99901],[600,369.49901],[600,384.49901],[525,391.99901],[600,399.49901],[600,414.49902],[525,406.99901],[600,429.49902],[600,444.49902],[525,421.99902],[600,459.49903],[600,474.49903],[525,436.99902],[600,489.49904],[600,504.49904],[525,451.99903],[600,519.49904],[600,534.49905],[525,466.99903],[600,549.49905],[600,564.49905],[525,481.99903],[600,579.49906],[600,594.49906],[525,496.99904],[600,609.49903],[600,624.49903],[525,511.99904],[600,639.49903],[600,654.49904],[450,399.49901],[350,399.49901],[350,384.49901],[450,384.49901],[600,129.49895]],"flat":true},{"type":"poly","shapeid":"attack-1-only","backgroundColor":"#a8a878","points":[[695,129.49982],[600,129.49982],[600,144.49982],[695,144.49982],[697.77,144.49982,700,142.26982,700,139.49982,1],[700,134.49982],[700,131.72982,697.77,129.49982,695,129.49982,1],[695,129.49982]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-only","backgroundColor":"#c03028","points":[[695,159.49981],[600,159.49981],[600,174.49981],[695,174.49981],[697.77,174.49981,700,172.26981,700,169.49981,1],[700,164.49981],[700,161.72981,697.77,159.49981,695,159.49981,1],[695,159.49981]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-only","backgroundColor":"#a890f0","points":[[695,189.49983],[600,189.49983],[600,204.49983],[695,204.49983],[697.77,204.49983,700,202.26983,700,199.49983,1],[700,194.49983],[700,191.72983,697.77,189.49983,695,189.49983,1],[695,189.49983]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-only","backgroundColor":"#a040a0","points":[[695,219.49983],[600,219.49983],[600,234.49984],[695,234.49984],[697.77,234.49984,700,232.26984,700,229.49984,1],[700,224.49984],[700,221.72984,697.77,219.49983,695,219.49983,1],[695,219.49983]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-only","backgroundColor":"#e0c068","points":[[695,249.49984],[600,249.49984],[600,264.49985],[695,264.49985],[697.77,264.49985,700,262.26985,700,259.49984,1],[700,254.49984],[700,251.72984,697.77,249.49984,695,249.49984,1],[695,249.49984]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-only","backgroundColor":"#b8a038","points":[[695,279.49985],[600,279.49985],[600,294.49985],[695,294.49985],[697.77,294.49985,700,292.26985,700,289.49985,1],[700,284.49985],[700,281.72985,697.77,279.49985,695,279.49985,1],[695,279.49985]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-only","backgroundColor":"#a8b820","points":[[695,309.49986],[600,309.49986],[600,324.49986],[695,324.49986],[697.77,324.49986,700,322.26986,700,319.49986,1],[700,314.49986],[700,311.72986,697.77,309.49986,695,309.49986,1],[695,309.49986]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-only","backgroundColor":"#705898","points":[[695,339.49986],[600,339.49986],[600,354.49987],[695,354.49987],[697.77,354.49987,700,352.26987,700,349.49987,1],[700,344.49987],[700,341.72987,697.77,339.49986,695,339.49986,1],[695,339.49986]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-only","backgroundColor":"#b8b8d0","points":[[695,369.49988],[600,369.49988],[600,384.49988],[695,384.49988],[697.77,384.49988,700,382.26988,700,379.49988,1],[700,374.49988],[700,371.72988,697.77,369.49988,695,369.49988,1],[695,369.49988]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-only","backgroundColor":"#f08030","points":[[695,399.49988],[600,399.49988],[600,414.49989],[695,414.49989],[697.77,414.49989,700,412.26989,700,409.49989,1],[700,404.49988],[700,401.72988,697.77,399.49988,695,399.49988,1],[695,399.49988]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-only","backgroundColor":"#6890f0","points":[[695,429.49989],[600,429.49989],[600,444.49989],[695,444.49989],[697.77,444.49989,700,442.26989,700,439.49989,1],[700,434.49989],[700,431.72989,697.77,429.49989,695,429.49989,1],[695,429.49989]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-only","backgroundColor":"#78c850","points":[[695,459.4999],[600,459.4999],[600,474.4999],[695,474.4999],[697.77,474.4999,700,472.2699,700,469.4999,1],[700,464.4999],[700,461.7299,697.77,459.4999,695,459.4999,1],[695,459.4999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-only","backgroundColor":"#f8d030","points":[[695,489.49991],[600,489.49991],[600,504.49991],[695,504.49991],[697.77,504.49991,700,502.26991,700,499.49991,1],[700,494.49991],[700,491.72991,697.77,489.49991,695,489.49991,1],[695,489.49991]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-only","backgroundColor":"#f85888","points":[[695,519.49991],[600,519.49991],[600,534.49992],[695,534.49992],[697.77,534.49992,700,532.26992,700,529.49992,1],[700,524.49991],[700,521.72991,697.77,519.49991,695,519.49991,1],[695,519.49991]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-only","backgroundColor":"#98d8d8","points":[[695,549.49992],[600,549.49992],[600,564.49992],[695,564.49992],[697.77,564.49992,700,562.26992,700,559.49992,1],[700,554.49992],[700,551.72992,697.77,549.49992,695,549.49992,1],[695,549.49992]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-only","backgroundColor":"#7038f8","points":[[695,579.49992],[600,579.49992],[600,594.49992],[695,594.49992],[697.77,594.49992,700,592.26992,700,589.49992,1],[700,584.49992],[700,581.72992,697.77,579.49992,695,579.49992,1],[695,579.49992]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-only","backgroundColor":"#705848","points":[[695,609.49994],[600,609.49994],[600,624.49994],[695,624.49994],[697.77,624.49994,700,622.26994,700,619.49994,1],[700,614.49994],[700,611.72994,697.77,609.49994,695,609.49994,1],[695,609.49994]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-only","backgroundColor":"#ee99ac","points":[[695,639.49994],[600,639.49994],[600,654.49995],[695,654.49995],[697.77,654.49995,700,652.26995,700,649.49994,1],[700,644.49994],[700,641.72994,697.77,639.49994,695,639.49994,1],[695,639.49994]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"branch-defend","backgroundColor":"#ffffff","points":[[100,129.49908],[100,144.49908],[175,271.99908],[100,159.49908],[100,174.49908],[175,286.99908],[100,189.49908],[100,204.49908],[175,301.99908],[100,219.49908],[100,234.49908],[175,316.99908],[100,249.49908],[100,264.49908],[175,331.99908],[100,279.49908],[100,294.49908],[175,346.99908],[100,309.49908],[100,324.49908],[175,361.99908],[100,339.49908],[100,354.49908],[175,376.99908],[100,369.49908],[100,384.49908],[175,391.99908],[100,399.49908],[100,414.49908],[175,406.99908],[100,429.49908],[100,444.49908],[175,421.99908],[100,459.49908],[100,474.49908],[175,436.99908],[100,489.49908],[100,504.49908],[175,451.99908],[100,519.49908],[100,534.49908],[175,466.99908],[100,549.49908],[100,564.49908],[175,481.99908],[100,579.49908],[100,594.49908],[175,496.99908],[100,609.49904],[100,624.49904],[175,511.99908],[100,639.49904],[100,654.49904],[250,399.49908],[350,399.49908],[350,384.49908],[250,384.49908],[100,129.49908]],"flat":true},{"type":"poly","shapeid":"defend-1","backgroundColor":"#a8a878","points":[[5,129.49995],[100,129.49995],[100,144.49995],[5,144.49995],[2.23,144.49995,0,142.26995,0,139.49995,1],[0,134.49995],[0,131.72995,2.23,129.49995,5,129.49995,1],[5,129.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-2","backgroundColor":"#c03028","points":[[5,159.49994],[100,159.49994],[100,174.49994],[5,174.49994],[2.23,174.49994,0,172.26994,0,169.49994,1],[0,164.49994],[0,161.72994,2.23,159.49994,5,159.49994,1],[5,159.49994]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-3","backgroundColor":"#a890f0","points":[[5,189.49995],[100,189.49995],[100,204.49995],[5,204.49995],[2.23,204.49995,0,202.26995,0,199.49995,1],[0,194.49995],[0,191.72995,2.23,189.49995,5,189.49995,1],[5,189.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-4","backgroundColor":"#a040a0","points":[[5,219.49995],[100,219.49995],[100,234.49995],[5,234.49995],[2.23,234.49995,0,232.26995,0,229.49995,1],[0,224.49995],[0,221.72995,2.23,219.49995,5,219.49995,1],[5,219.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-5","backgroundColor":"#e0c068","points":[[5,249.49995],[100,249.49995],[100,264.49995],[5,264.49995],[2.23,264.49995,0,262.26995,0,259.49995,1],[0,254.49995],[0,251.72995,2.23,249.49995,5,249.49995,1],[5,249.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-6","backgroundColor":"#b8a038","points":[[5,279.49995],[100,279.49995],[100,294.49995],[5,294.49995],[2.23,294.49995,0,292.26995,0,289.49995,1],[0,284.49995],[0,281.72995,2.23,279.49995,5,279.49995,1],[5,279.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-7","backgroundColor":"#a8b820","points":[[5,309.49995],[100,309.49995],[100,324.49995],[5,324.49995],[2.23,324.49995,0,322.26995,0,319.49995,1],[0,314.49995],[0,311.72995,2.23,309.49995,5,309.49995,1],[5,309.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-8","backgroundColor":"#705898","points":[[5,339.49995],[100,339.49995],[100,354.49995],[5,354.49995],[2.23,354.49995,0,352.26995,0,349.49995,1],[0,344.49995],[0,341.72995,2.23,339.49995,5,339.49995,1],[5,339.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-9","backgroundColor":"#b8b8d0","points":[[5,369.49995],[100,369.49995],[100,384.49995],[5,384.49995],[2.23,384.49995,0,382.26995,0,379.49995,1],[0,374.49995],[0,371.72995,2.23,369.49995,5,369.49995,1],[5,369.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-10","backgroundColor":"#f08030","points":[[5,399.49995],[100,399.49995],[100,414.49995],[5,414.49995],[2.23,414.49995,0,412.26995,0,409.49995,1],[0,404.49995],[0,401.72995,2.23,399.49995,5,399.49995,1],[5,399.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-11","backgroundColor":"#6890f0","points":[[5,429.49995],[100,429.49995],[100,444.49995],[5,444.49995],[2.23,444.49995,0,442.26995,0,439.49995,1],[0,434.49995],[0,431.72995,2.23,429.49995,5,429.49995,1],[5,429.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-12","backgroundColor":"#78c850","points":[[5,459.49995],[100,459.49995],[100,474.49995],[5,474.49995],[2.23,474.49995,0,472.26995,0,469.49995,1],[0,464.49995],[0,461.72995,2.23,459.49995,5,459.49995,1],[5,459.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-13","backgroundColor":"#f8d030","points":[[5,489.49995],[100,489.49995],[100,504.49995],[5,504.49995],[2.23,504.49995,0,502.26995,0,499.49995,1],[0,494.49995],[0,491.72995,2.23,489.49995,5,489.49995,1],[5,489.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-14","backgroundColor":"#f85888","points":[[5,519.49995],[100,519.49995],[100,534.49995],[5,534.49995],[2.23,534.49995,0,532.26995,0,529.49995,1],[0,524.49995],[0,521.72995,2.23,519.49995,5,519.49995,1],[5,519.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-15","backgroundColor":"#98d8d8","points":[[5,549.49995],[100,549.49995],[100,564.49995],[5,564.49995],[2.23,564.49995,0,562.26995,0,559.49995,1],[0,554.49995],[0,551.72995,2.23,549.49995,5,549.49995,1],[5,549.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-16","backgroundColor":"#7038f8","points":[[5,579.49994],[100,579.49994],[100,594.49994],[5,594.49994],[2.23,594.49994,0,592.26994,0,589.49994,1],[0,584.49994],[0,581.72994,2.23,579.49994,5,579.49994,1],[5,579.49994]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-17","backgroundColor":"#705848","points":[[5,609.49995],[100,609.49995],[100,624.49995],[5,624.49995],[2.23,624.49995,0,622.26995,0,619.49995,1],[0,614.49995],[0,611.72995,2.23,609.49995,5,609.49995,1],[5,609.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-18","backgroundColor":"#ee99ac","points":[[5,639.49995],[100,639.49995],[100,654.49995],[5,654.49995],[2.23,654.49995,0,652.26995,0,649.49995,1],[0,644.49995],[0,641.72995,2.23,639.49995,5,639.49995,1],[5,639.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"branch-2","backgroundColor":"#ffffff","points":[[630,-0.000024345472],[525,178.49998],[420,384.49998],[350,384.49995],[350,399.49995],[420,399.49998],[525,605.49994],[630,783.99994],[630,773.49994],[577.5,684.24994],[630,762.99994],[630,752.49994],[577.5,673.74994],[630,741.99994],[630,731.49994],[577.5,663.24994],[630,720.99994],[630,710.49994],[577.5,652.74994],[630,699.99994],[630,689.49994],[577.5,642.24994],[630,678.99994],[630,668.49994],[577.5,631.74994],[630,657.99994],[630,647.49994],[577.5,621.24994],[630,636.99994],[630,626.49994],[577.5,610.74994],[630,615.99994],[630,605.49994],[577.5,600.24998],[630,594.99998],[630,584.49998],[577.5,589.74998],[630,573.99998],[630,563.49998],[577.5,579.24998],[630,552.99998],[630,542.49998],[577.5,568.74998],[630,531.99998],[630,521.49998],[577.5,558.24998],[630,510.99998],[630,500.49998],[577.5,547.74998],[630,489.99998],[630,479.49998],[577.5,537.24998],[630,468.99998],[630,458.49998],[577.5,526.74998],[630,447.99998],[630,437.49998],[577.49609,516.25584],[630,426.99998],[630,416.49998],[545.66406,559.87107],[425.375,391.99998],[545.66406,224.12888],[630,367.49985],[630,356.99998],[577.49609,267.74412],[630,346.49998],[630,335.99998],[577.5,257.24998],[630,325.49998],[630,314.99998],[577.5,246.74998],[630,304.49998],[630,293.99998],[577.5,236.24998],[630,283.49998],[630,272.99998],[577.5,225.74998],[630,262.49998],[630,251.99998],[577.5,215.24998],[630,241.49998],[630,230.99998],[577.5,204.74998],[630,220.49998],[630,209.99998],[577.5,194.24998],[630,199.49998],[630,188.99998],[577.5,183.74998],[630,178.49998],[630,167.99998],[577.5,173.24998],[630,157.49998],[630,146.99998],[577.5,162.74998],[630,136.49998],[630,125.99998],[577.5,152.24998],[630,115.49998],[630,104.99998],[577.5,141.74998],[630,94.499976],[630,83.999976],[577.5,131.24998],[630,73.499976],[630,62.999976],[577.5,120.74998],[630,52.499976],[630,41.999976],[577.5,110.24998],[630,31.499976],[630,20.999976],[577.5,99.749976],[630,10.499976],[630,-0.000024345472]],"flat":true},{"type":"poly","shapeid":"attack-1-second","backgroundColor":"#a8a878","points":[[726.49998,416.49831],[630,416.49831],[630,426.99836],[726.49998,426.99836],[728.43899,426.99836,730,425.43735,730,423.49834,1],[730,419.99832],[730,418.05931,728.43899,416.49831,726.49998,416.49831,1],[726.49998,416.49831]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-second","backgroundColor":"#c03028","points":[[726.49998,437.49839],[630,437.49839],[630,447.99845],[726.49998,447.99845],[728.43899,447.99845,730,446.43744,730,444.49842,1],[730,440.99841],[730,439.0594,728.43899,437.49839,726.49998,437.49839,1],[726.49998,437.49839]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-second","backgroundColor":"#a890f0","points":[[726.49998,458.4985],[630,458.4985],[630,468.99854],[726.49998,468.99854],[728.43899,468.99854,730,467.43754,730,465.49853,1],[730,461.99851],[730,460.05951,728.43899,458.4985,726.49998,458.4985,1],[726.49998,458.4985]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-second","backgroundColor":"#a040a0","points":[[726.49998,479.49859],[630,479.49859],[630,489.99864],[726.49998,489.99864],[728.43899,489.99864,730,488.43763,730,486.49862,1],[730,482.99861],[730,481.0596,728.43899,479.49859,726.49998,479.49859,1],[726.49998,479.49859]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-second","backgroundColor":"#e0c068","points":[[726.49998,500.49869],[630,500.49869],[630,510.99873],[726.49998,510.99873],[728.43899,510.99873,730,509.43772,730,507.49872,1],[730,503.9987],[730,502.0597,728.43899,500.49869,726.49998,500.49869,1],[726.49998,500.49869]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-second","backgroundColor":"#b8a038","points":[[726.49998,521.49879],[630,521.49879],[630,531.99883],[726.49998,531.99883],[728.43899,531.99883,730,530.43782,730,528.49881,1],[730,524.9988],[730,523.05978,728.43899,521.49879,726.49998,521.49879,1],[726.49998,521.49879]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-second","backgroundColor":"#a8b820","points":[[726.49998,542.49887],[630,542.49887],[630,552.99892],[726.49998,552.99892],[728.43899,552.99892,730,551.43792,730,549.49891,1],[730,545.9989],[730,544.05988,728.43899,542.49887,726.49998,542.49887,1],[726.49998,542.49887]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-second","backgroundColor":"#705898","points":[[726.49998,563.49897],[630,563.49897],[630,573.99902],[726.49998,573.99902],[728.43899,573.99902,730,572.43801,730,570.49901,1],[730,566.99898],[730,565.05998,728.43899,563.49897,726.49998,563.49897,1],[726.49998,563.49897]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-second","backgroundColor":"#b8b8d0","points":[[726.49998,584.49906],[630,584.49906],[630,594.99912],[726.49998,594.99912],[728.43899,594.99912,730,593.43811,730,591.49909,1],[730,587.99908],[730,586.06007,728.43899,584.49906,726.49998,584.49906,1],[726.49998,584.49906]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-second","backgroundColor":"#f08030","points":[[726.49998,605.49915],[630,605.49915],[630,615.99915],[726.49998,615.99915],[728.43899,615.99915,730,614.43825,730,612.49915,1],[730,608.99915],[730,607.06015,728.43899,605.49915,726.49998,605.49915,1],[726.49998,605.49915]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-second","backgroundColor":"#6890f0","points":[[726.49998,626.49925],[630,626.49925],[630,636.99935],[726.49998,636.99935],[728.43899,636.99935,730,635.43825,730,633.49925,1],[730,629.99925],[730,628.06025,728.43899,626.49925,726.49998,626.49925,1],[726.49998,626.49925]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-second","backgroundColor":"#78c850","points":[[726.49998,647.49935],[630,647.49935],[630,657.99935],[726.49998,657.99935],[728.43899,657.99935,730,656.43835,730,654.49935,1],[730,650.99935],[730,649.06035,728.43899,647.49935,726.49998,647.49935,1],[726.49998,647.49935]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-second","backgroundColor":"#f8d030","points":[[726.49998,668.49945],[630,668.49945],[630,678.99945],[726.49998,678.99945],[728.43899,678.99945,730,677.43845,730,675.49945,1],[730,671.99945],[730,670.06045,728.43899,668.49945,726.49998,668.49945,1],[726.49998,668.49945]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-second","backgroundColor":"#f85888","points":[[726.49998,689.49955],[630,689.49955],[630,699.99955],[726.49998,699.99955],[728.43899,699.99955,730,698.43855,730,696.49955,1],[730,692.99955],[730,691.06055,728.43899,689.49955,726.49998,689.49955,1],[726.49998,689.49955]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-second","backgroundColor":"#98d8d8","points":[[726.49998,710.49965],[630,710.49965],[630,720.99965],[726.49998,720.99965],[728.43899,720.99965,730,719.43865,730,717.49965,1],[730,713.99965],[730,712.06065,728.43899,710.49965,726.49998,710.49965,1],[726.49998,710.49965]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-second","backgroundColor":"#7038f8","points":[[726.49998,731.49975],[630,731.49975],[630,741.99975],[726.49998,741.99975],[728.43899,741.99975,730,740.43875,730,738.49975,1],[730,734.99975],[730,733.06075,728.43899,731.49975,726.49998,731.49975,1],[726.49998,731.49975]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-second","backgroundColor":"#705848","points":[[726.49998,752.49985],[630,752.49985],[630,762.99985],[726.49998,762.99985],[728.43899,762.99985,730,761.43885,730,759.49985,1],[730,755.99985],[730,754.06085,728.43899,752.49985,726.49998,752.49985,1],[726.49998,752.49985]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-second","backgroundColor":"#ee99ac","points":[[726.49998,773.49995],[630,773.49995],[630,783.99995],[726.49998,783.99995],[728.43899,783.99995,730,782.43895,730,780.49995,1],[730,776.99995],[730,775.06095,728.43899,773.49995,726.49998,773.49995,1],[726.49998,773.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-1-first","backgroundColor":"#a8a878","points":[[726.49998,-0.00002],[630,-0.00002],[630,10.50003],[726.49998,10.50003],[728.43899,10.50003,730,8.93902,730,7.00001,1],[730,3.49999],[730,1.56098,728.43899,-0.00002,726.49998,-0.00002,1],[726.49998,-0.00002]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-first","backgroundColor":"#c03028","points":[[726.49998,21.00006],[630,21.00006],[630,31.50012],[726.49998,31.50012],[728.43899,31.50012,730,29.93911,730,28.00009,1],[730,24.50008],[730,22.56107,728.43899,21.00006,726.49998,21.00006,1],[726.49998,21.00006]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-first","backgroundColor":"#a890f0","points":[[726.49998,42.00017],[630,42.00017],[630,52.50021],[726.49998,52.50021],[728.43899,52.50021,730,50.93921,730,49.0002,1],[730,45.50018],[730,43.56118,728.43899,42.00017,726.49998,42.00017,1],[726.49998,42.00017]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-first","backgroundColor":"#a040a0","points":[[726.49998,63.00026],[630,63.00026],[630,73.50031],[726.49998,73.50031],[728.43899,73.50031,730,71.9393,730,70.00029,1],[730,66.50028],[730,64.56127,728.43899,63.00026,726.49998,63.00026,1],[726.49998,63.00026]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-first","backgroundColor":"#e0c068","points":[[726.49998,84.00036],[630,84.00036],[630,94.5004],[726.49998,94.5004],[728.43899,94.5004,730,92.93939,730,91.00039,1],[730,87.50037],[730,85.56137,728.43899,84.00036,726.49998,84.00036,1],[726.49998,84.00036]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-first","backgroundColor":"#b8a038","points":[[726.49998,105.00046],[630,105.00046],[630,115.5005],[726.49998,115.5005],[728.43899,115.5005,730,113.93949,730,112.00048,1],[730,108.50047],[730,106.56145,728.43899,105.00046,726.49998,105.00046,1],[726.49998,105.00046]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-first","backgroundColor":"#a8b820","points":[[726.49998,126.00054],[630,126.00054],[630,136.50059],[726.49998,136.50059],[728.43899,136.50059,730,134.93959,730,133.00058,1],[730,129.50057],[730,127.56155,728.43899,126.00054,726.49998,126.00054,1],[726.49998,126.00054]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-first","backgroundColor":"#705898","points":[[726.49998,147.00064],[630,147.00064],[630,157.50069],[726.49998,157.50069],[728.43899,157.50069,730,155.93968,730,154.00068,1],[730,150.50065],[730,148.56165,728.43899,147.00064,726.49998,147.00064,1],[726.49998,147.00064]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-first","backgroundColor":"#b8b8d0","points":[[726.49998,168.00073],[630,168.00073],[630,178.50079],[726.49998,178.50079],[728.43899,178.50079,730,176.93978,730,175.00076,1],[730,171.50075],[730,169.56174,728.43899,168.00073,726.49998,168.00073,1],[726.49998,168.00073]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-first","backgroundColor":"#f08030","points":[[726.49998,189.00083],[630,189.00083],[630,199.50087],[726.49998,199.50087],[728.43899,199.50087,730,197.93987,730,196.00086,1],[730,192.50084],[730,190.56184,728.43899,189.00083,726.49998,189.00083,1],[726.49998,189.00083]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-first","backgroundColor":"#6890f0","points":[[726.49998,210.00092],[630,210.00092],[630,220.50097],[726.49998,220.50097],[728.43899,220.50097,730,218.93996,730,217.00095,1],[730,213.50094],[730,211.56193,728.43899,210.00092,726.49998,210.00092,1],[726.49998,210.00092]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-first","backgroundColor":"#78c850","points":[[726.49998,231.00102],[630,231.00102],[630,241.50106],[726.49998,241.50106],[728.43899,241.50106,730,239.94005,730,238.00105,1],[730,234.50103],[730,232.56203,728.43899,231.00102,726.49998,231.00102,1],[726.49998,231.00102]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-first","backgroundColor":"#f8d030","points":[[726.49998,252.00112],[630,252.00112],[630,262.50116],[726.49998,262.50116],[728.43899,262.50116,730,260.94015,730,259.00114,1],[730,255.50113],[730,253.56211,728.43899,252.00112,726.49998,252.00112,1],[726.49998,252.00112]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-first","backgroundColor":"#f85888","points":[[726.49998,273.0012],[630,273.0012],[630,283.50125],[726.49998,283.50125],[728.43899,283.50125,730,281.94025,730,280.00124,1],[730,276.50123],[730,274.56221,728.43899,273.0012,726.49998,273.0012,1],[726.49998,273.0012]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-first","backgroundColor":"#98d8d8","points":[[726.49998,294.0013],[630,294.0013],[630,304.50135],[726.49998,304.50135],[728.43899,304.50135,730,302.94034,730,301.00134,1],[730,297.50131],[730,295.56231,728.43899,294.0013,726.49998,294.0013,1],[726.49998,294.0013]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-first","backgroundColor":"#7038f8","points":[[726.49998,315.00139],[630,315.00139],[630,325.50141],[726.49998,325.50141],[728.43899,325.50141,730,323.94043,730,322.00141,1],[730,318.5014],[730,316.56238,728.43899,315.00139,726.49998,315.00139,1],[726.49998,315.00139]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-first","backgroundColor":"#705848","points":[[726.49998,336.00151],[630,336.00151],[630,346.50152],[726.49998,346.50152],[728.43899,346.50152,730,344.94054,730,343.00151,1],[730,339.50151],[730,337.56249,728.43899,336.00151,726.49998,336.00151,1],[726.49998,336.00151]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-first","backgroundColor":"#ee99ac","points":[[726.49998,357.00162],[630,357.00162],[630,367.50162],[726.49998,367.50162],[728.43899,367.50162,730,365.94064,730,364.00162,1],[730,360.50162],[730,358.5626,728.43899,357.00162,726.49998,357.00162,1],[726.49998,357.00162]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}}];
	    for (var shape_index = 0; shape_index < currentShapeArray.length; shape_index++)
	    {
	        var currentShape = currentShapeArray[shape_index]
	        var e_multiple = 0;
	        if (currentShape.shapeid != null)
	        {
	            console.log(currentShape.shapeid+" wat")
	            var currentShape_id = currentShape.shapeid.split("-");
	            if (currentShape_id[0]=="defend")
	            {
	                e_multiple = calculateEffectivity(currentShape_id[1]-1,this_pokemon_index_array);
	                if (this_pokemon_index_array.length == 1)
	                {
	                    currentShape.tooltip.text = types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type moves inflict x" + e_multiple + " damage on " + types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1) + " type pokemon";
	                }
	                else
	                {
	                    currentShape.tooltip.text = types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type moves inflict x" + e_multiple + " damage on " + types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1)+ " " + types[this_pokemon_index_array[1]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[1]+1].identifier.slice(1)+ " type pokemon";
	                }
	                if (e_multiple == 0)
	                {
	                    currentShape.points.forEach(function(point_array,pa_index){
	                        if (point_array != null)
	                        {
	                            for (var pt = 0;point_array.length > pt; pt++)
	                            {
	                                if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                {
	                                    point_array[pt] =  point_array[pt] + 90;
	                                }
	                                point_array[pt] *= window.innerHeight*0.34/784
	                            }
	                        }
	                    })
	                }
	                else
	                {
	                    currentShape.points.forEach(function(point_array,pa_index){
	                        if (point_array != null)
	                        {
	                            for (var pt = 0;point_array.length > pt; pt++)
	                            {
	                                if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                {
	                                    point_array[pt] =  point_array[pt] + 20/ e_multiple;
	                                }
	                                point_array[pt] *= window.innerHeight*0.34/784
	                            }
	                        }
	                    })
	                }
	            }
	            else if (currentShape_id[0]=="attack")
	            {
	                if (types_in.length == 1)
	                {
	                    console.log(currentShape.shapeid+" not weird")
	                    if (currentShape_id[2]=="only")
	                    {
	                        e_multiple = calculateEffectivity(this_pokemon_index_array[0],[currentShape_id[1]-1]);
	                        currentShape.tooltip.text = types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1) + " type moves inflict x" + e_multiple + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
	                        if (e_multiple == 0)
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 90;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                        else
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 20/ e_multiple;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                    }
	                else
	                    {
	                        console.log(currentShapeArray.splice(shape_index,1))
	                        shape_index--;
	                    }
	                }
	                else if (types_in.length == 2)
	                {
	                    if (currentShape_id[2]=="first") {
	                        e_multiple = calculateEffectivity(this_pokemon_index_array[0],[currentShape_id[1]-1]);
	                        currentShape.tooltip.text = types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1) + " type moves inflict x" + e_multiple + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
	                        if (e_multiple == 0)
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 90;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                        else
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 20/ e_multiple;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                    }
	                    else if (currentShape_id[2]=="second") {
	                        e_multiple = calculateEffectivity(this_pokemon_index_array[1],[currentShape_id[1]-1]);
	                        currentShape.tooltip.text = types[this_pokemon_index_array[1]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[1]+1].identifier.slice(1) + " type moves inflict x" + e_multiple + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
	                        if (e_multiple == 0)
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 90;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                        else
	                        {
	                            currentShape.points.forEach(function(point_array,pa_index){
	                                if (point_array != null)
	                                {
	                                    for (var pt = 0;point_array.length > pt; pt++)
	                                    {
	                                        if ((pt == 0 && (pa_index == 0 || pa_index == 3 || pa_index == 5 || pa_index == 7 || pa_index == 4 || pa_index == 6)) || ((pt == 2 || pt == 4) && (pa_index == 4 || pa_index == 6)))
	                                        {
	                                            point_array[pt] =  point_array[pt] - 20/ e_multiple;
	                                        }
	                                        point_array[pt] *= window.innerHeight*0.34/784
	                                    }
	                                }
	                            })
	                        }
	                    }
	                }
	            }
	            else if (currentShape_id[0]=="branch")
	            {
	                if (currentShape_id[1]=="defend") {
	                currentShape.points.forEach(function (point_array) {
	                    if (point_array != null) {
	                        for (var pt = 0; point_array.length > pt; pt++) {
	                            point_array[pt] *= window.innerHeight * 0.34 / 783.99994;
	                        }
	                    }
	                })}
	                else if (currentShape_id[1]==types_in.length)
	                {
	                    currentShape.points.forEach(function (point_array) {
	                        if (point_array != null) {
	                            for (var pt = 0; point_array.length > pt; pt++) {
	                                point_array[pt] *= window.innerHeight * 0.34 / 783.99994;
	                            }
	                        }
	                    })
	                }
	            }
	        }
	        else
	        {
	            currentShape.points.forEach(function (point_array) {
	                if (point_array != null) {
	                    for (var pt = 0; point_array.length > pt; pt++) {
	                        point_array[pt] *= window.innerHeight * 0.34 / 783.99994;
	                    }
	                }
	            })
	        }
	    };
	    console.log(currentShapeArray)
	    zingchart.render({
	        width: "100%",
	        height: "100%",
	        margins: 0,
	        backgroundColor: "transparent",
	        data: {
	            backgroundColor:"transparent",
	            shapes: currentShapeArray
	        },
	        overflow: "visible",
	        id : 'chord',
	    });
	}

	function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
	    var nature_str=document.getElementById("nature").value.split(",");
	    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
	    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
	    console.log(stats_name)
	    console.log(nature)
	    var levels=[10,20,30,40,50,60,70,80,90,100];
	    var statsFinal = [];
	    var k;
	    for (var i = 0; i < stats_name.length; i++)
	    {
	        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	        if (stats_name[i] == "1")
	        {
	            for (k=0; k < 10; k++)
	            {
	                temp[k]= Math.floor((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+levels[k]+10;
	                if (k == 9)
	                {
	                    statsFinal.push(temp)
	                }
	            }
	        }
	        else
	        {
	            for (k=0; k < 10; k++)
	            {
	                if (stats_name[i] == parseInt(nature[0]))
	                {
	                    console.log(stats_name[i])
	                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*1.1);
	                    if (k == 9)
	                    {
	                        statsFinal.push(temp)
	                    }
	                }
	                else if (stats_name[i] == parseInt(nature[1]))
	                {
	                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*0.9);
	                    if (k == 9)
	                    {
	                        statsFinal.push(temp)
	                    }
	                }
	                else
	                {
	                    temp[k]= Math.floor(((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5);
	                    if (k == 9)
	                    {
	                        statsFinal.push(temp)
	                    }
	                }
	            }
	        }
	    }
	    var stats_graph_progress = [];
	    for (var p = 0; p < statsFinal.length; p++)
	    {
	        stats_graph_progress.push({
	            text: stats[stats_name[p]].text,
	            values: statsFinal[p],
	            backgroundColor: stats[stats_name[p]].color,
	            lineColor: stats[stats_name[p]].color,
	            marker:{
	                backgroundColor: stats[stats_name[p]].color,
	                borderColor: stats[stats_name[p]].color

	            },
	            "tooltip": {
	                "text": "%t at level %kt: %vt"
	            }
	        });
	    }
	    var statsProgression = {
	        "background-color": "transparent",
	        "title" : {
	            visible:true,
	            "font-color": "#fff",
	            "font-family": 'Exo 2, sans-serif',
	            "text" : "Stats Progression for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
	            "background-color":"transparent",
	            "font-size":"15",
	            height:"14.2857143%",
	            textAlign:"center"
	        },
	        "scale-x": {
	            values:levels,
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
	                "font-size":"12.5",
	                "font-color": "#fff",
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
	                "text": "Stat Value",
	                "font-family": 'Exo 2, sans-serif',
	                "font-weight": "normal",
	                "font-size":"12.5",
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
	        type: "area",
	        stacked: true,
	        height: "100%",
	        width: "100%",
	        plot:{
	            alphaArea: 0.6,
	            "animation": {
	                "delay": 0,
	                "effect": 1,
	                "speed": 1000,
	                "method": 0,
	                "sequence": 1
	            }
	        },
	        series : stats_graph_progress,
	    };
	    zingchart.render({
	        id : 'stats_progression',
	        data : statsProgression,
	    });
	}

	function accessDatabaseCHILD(ref_in,str,val_comp,callbackfunction,pass) {
	    ref_in.orderByChild(str).equalTo(val_comp).once("value").then(function(snapshot) {
	        var temp_database_array = [];
	        console.log(str+": "+snapshot.numChildren())
	        snapshot.forEach(function (snap_child) {
	            temp_database_array.push(snap_child.val());
	            if (temp_database_array.length == snapshot.numChildren())
	            {
	                if (pass) {
	                    callbackfunction(temp_database_array);
	                }
	                else
	                {
	                    callbackfunction();
	                }
	            }
	        })
	    });
	}




/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by tmartin on 7/8/16.
	 */

	module.exports = {
	    mkshape:makeShape,
	};




	function pathToPolygon(array) {
	    var pointsArray = [];
	    var currentLetter = "";
	    var position = 0;
	    var pointCount = 0; //CURVE
	    var curvePoints = [];
	    var coordinateCount = 0; //CURVE
	    var coordinateArray = []; //CURVE
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
	                        currentLetter = "L";

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
	                    coordinateArray.push(parseFloat(value));
	                    coordinateCount++;
	                    if (coordinateCount == 6){
	                        coordinateArray.push(1);
	                        coordinateCount = 0;
	                        pointsArray.push(coordinateArray);
	                        coordinateArray = [];

	                    }
	                    // if (position == 0) {
	                    //     if (pointCount == 0)
	                    //     {
	                    //         curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
	                    //     }
	                    //     curvePoints.push([parseFloat(value)]);
	                    //     position = 1;
	                    // }
	                    // else {
	                    //     curvePoints[curvePoints.length-1].push(parseFloat(value));
	                    //     pointCount++;
	                    //     position = 0;
	                    //     if (pointCount == 3)
	                    //     {
	                    //         var vals = bezier(curvePoints);
	                    //         var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
	                    //         for (var t = 0; t < distance;t++) {
	                    //             pointsArray.push(vals(t/distance));
	                    //         }
	                    //         curvePoints = [];
	                    //         pointCount = 0;
	                    //     }
	                    // }
	                    //
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
	    var coordinateCount = 0; //CURVE
	    var coordinateArray = []; //CURVE
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
	                        currentLetter = "L";

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
	                    coordinateArray.push(parseFloat(value));
	                    coordinateCount++;
	                    if (coordinateCount == 6){
	                        coordinateArray.push(1);
	                        coordinateCount = 0;
	                        pointsArray.push(coordinateArray);
	                        coordinateArray = [];

	                    }
	                    else {
	                        coordinateCount++;
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
	    if (path.getAttribute("class") == "ROUTE") {
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
	                },
	                zIndex:2
	            };
	        }
	    }
	    else if (path.getAttribute("class") == "LAND") {
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
	                "shadow-angle":0,
	                "shadow-blur":"3px",
	                "shadow-color": "#082f3d",
	                "shadow-alpha": 1,
	                flat: true
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
	            zIndex:1
	        };
	    }
	    else if (path.getAttribute("class") == "LANDMARK") {
	         circleR = path.getAttribute("r").trim();
	         circleX = path.getAttribute("cx").trim();
	         circleY = path.getAttribute("cy").trim();
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
	            "hover-state": {
	                "borderColor": "#FFD700",
	                "backgroundColor": "#FFD700",
	            },
	            zIndex:1
	        };
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

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

		__webpack_require__(1);
		__webpack_require__(1);
		module.exports = __webpack_require__(5);


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var pokescript = __webpack_require__(2);
		var svgToZing = __webpack_require__(4);
		var SVGSTRING;

		window.addEventListener("load", beginApp);
		function beginApp() {
		    document.getElementById('select_Region').addEventListener("change", function () {
		        if (document.getElementById('select_Region').value != "")
		        {
		            document.getElementById("loading").visibility = "visible";
		            var location = new XMLHttpRequest();
		            var url = '/region_maps/' + document.getElementById('select_Region').value + '.svg';
		            console.log(url)
		            location.onreadystatechange = function() {
		                if (location.readyState == 4 && location.status == 200) {
		                    SVGSTRING = location.response;
		                    loadSVG();
		                }
		            };
		            location.open("GET", url, true);
		            location.send();
		        }
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

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * Created by tmartin on 7/12/16.
		 */
		var versions = __webpack_require__(3);
		var pokeVersion;
		var pokeVersionArray = [];
		var min = null;
		var max = null;
		var pokemonSERIES = [];
		var pokeJSON = [];
		var levelsINDEX = [];
		var methodIndex = [];
		var locationName = "";
		var selected_areaName = "";
		var selected_areaID;
		var selected_method;
		var responseArray = [];
		var svg_stored;
		var shapes_stored;
		var region_stored;
		var selectedShapeID = null;
		var regions = {
		    "1": {
		        "name": "Kanto"
		    },
		    "2": {
		        "name": "Johto"
		    },
		    "3": {
		        "name": "Hoenn"
		    },
		    "4": {
		        "name": "Sinnoh"
		    },
		    "5": {
		        "name": "Unova"
		    },
		    "6": {
		        "name": "Kalos"
		    }
		};
		var stats = {
		    "1": {
		        text:'HP',
		        color: '#b20000'
		    },
		    "2": {
		        text:'Attack',
		        color: '#d8732b'
		    },
		    "3": {
		        text:'Defense',
		        color: '#dfbb2b'
		    },
		    "4": {
		        text:'S. Attack',
		        color: '#6890F0'
		    },
		    "5": {
		        text:'S. Defense',
		        color: '#78C850'
		    },
		    "6": {
		        text:'Speed',
		        color: '#F85888'
		    },
		    "7": {
		        text:'Accuracy',
		        color: '#1A8B55'
		    },
		    "8": {
		        text:'Evasion',
		        color: '#47A0A2'
		    }
		}
		var types = {
		        "1": {
		            "identifier": "normal",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "2": {
		            "identifier": "fighting",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "3": {
		            "identifier": "flying",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "4": {
		            "identifier": "poison",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "5": {
		            "identifier": "ground",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "6": {
		            "identifier": "rock",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "7": {
		            "identifier": "bug",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "8": {
		            "identifier": "ghost",
		            "generation_id": 1,
		            "damage_class_id": 2
		        },
		        "9": {
		            "identifier": "steel",
		            "generation_id": 2,
		            "damage_class_id": 2
		        },
		        "10": {
		            "identifier": "fire",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "11": {
		            "identifier": "water",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "12": {
		            "identifier": "grass",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "13": {
		            "identifier": "electric",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "14": {
		            "identifier": "psychic",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "15": {
		            "identifier": "ice",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "16": {
		            "identifier": "dragon",
		            "generation_id": 1,
		            "damage_class_id": 3
		        },
		        "17": {
		            "identifier": "dark",
		            "generation_id": 2,
		            "damage_class_id": 3
		        },
		        "18": {
		            "identifier": "fairy",
		            "generation_id": 6,
		            "damage_class_id": ""
		        },
		        "10001": {
		            "identifier": "unknown",
		            "generation_id": 2,
		            "damage_class_id": ""
		        },
		        "10002": {
		            "identifier": "shadow",
		            "generation_id": 3,
		            "damage_class_id": ""
		        }
		    }
		var method_names = ["walk", "old-rod","good-rod","super-rod","surf","rock-smash","headbutt","dark-grass","grass-spots","cave-spots","bridge-spots","super-rod-spots","surf-spots","yellow-flowers","purple-flowers","red-flowers","rough-terrain"]
		var pokedex = []
		var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134],[255,183,183],[255,234,183],[255,255,183],[234,255,183],[183,255,183],[183,255,234],[183,255,255],[183,234,255],[183,183,255],[234,183,255],[255,183,255],[255,183,234],[185,113,113],[185,134,113],[185,185,113],[134,185,113],[113,185,113],[113,185,134],[113,185,185],[113,134,185],[113,113,185],[134,113,185],[185,113,185],[185,113,134]];
		var prevMultiple = 1;

		module.exports = {
		    createDropDown:initialFunction
		};

		function initialFunction(region,render_obj) {
		    selectedShapeID = null;
		    document.getElementById("select_Method").options.length = 0;
		    var tempOptionMethod = document.createElement("option");
		    tempOptionMethod.text = "Select Method";
		    tempOptionMethod.selected = true;
		    tempOptionMethod.disabled = true;
		    document.getElementById("select_Method").add(tempOptionMethod)
		    document.getElementById("select_Location_Area").options.length = 0;
		    var tempOptionArea = document.createElement("option");
		    tempOptionArea.text = "Select Area";
		    tempOptionArea.selected = true;
		    tempOptionArea.disabled = true;
		    document.getElementById("select_Location_Area").add(tempOptionArea)
		    document.getElementById("select_Version").options.length = 0;
		    var tempOptionVersion = document.createElement("option");
		    tempOptionVersion.text = "Select Version";
		    tempOptionVersion.selected = true;
		    tempOptionVersion.disabled = true;
		    document.getElementById("select_Version").add(tempOptionVersion)
		    svg_stored = render_obj[0];
		    shapes_stored = render_obj[1];
		    region_stored = parseInt(region);
		    prevMultiple = 1;
		    createPokedex();
		    renderShape();
		}

		function createPokedex() {
		    firebase.database().ref("pokemon").orderByKey().once("value").then(function(snapshot) {
		        snapshot.forEach(function (snap_child) {
		            pokedex.push(snap_child.val());
		        })
		    });
		}

		function renderShape() {
		    setHeightWidth()
		    zingchart.render({
		        id: "SHAPESDIV",
		        width: "100%",
		        height: "100%",
		        margins: 0,
		        backgroundColor: "transparent",
		        data: {
		            backgroundColor: "transparent",
		            "shapes": shapes_stored
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
		                    "alpha": 0.6,
		                    cursor: "pointer"
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
		                    "effect": 1,
		                    "speed": 1000,
		                    "method": 0,
		                    "sequence": 1
		                }
		            },
		            "scale-x": {
		                "values": [],
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
		                "text": "Chance of encountering a level %k %t: %v%",
		                "font-family": 'Exo 2, sans-serif',
		                "font-size": "15px",
		                "font-weight": "normal",
		                "font-color": "#fff",
		                "decimals": 2,
		                "text-align": "left",
		                "border-radius": "8px",
		                "padding": "10px 10px",
		                "background-color": "#0B4153",
		                "alpha": 0.95,
		                "shadow": 0,
		                "border-width": 0,
		                "border-color": "none"
		            },
		            "series": pokeJSON
		        }
		    });
		    zingchart.shape_click = function(p) {
		        if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
		            console.log(p.shapeid)
		            if (selectedShapeID != null)
		            {
		                zingchart.exec('SHAPESDIV', 'updateobject', {
		                    'type':'shape',
		                    'data' : {
		                        'id' : selectedShapeID,
		                        'line-color' : 'black',
		                        'border-color' : 'black',
		                        'background-color': 'black',
		                        zIndex : 2
		                    }
		                });
		            }
		            selectedShapeID = p.shapeid;
		            zingchart.exec('SHAPESDIV', 'updateobject', {
		                'type':'shape',
		                'data' : {
		                    'id' : selectedShapeID,
		                    'line-color' : '#b81c19',
		                    zIndex : 3
		                }
		            });
		            // document.getElementById("loading").style.visibility = "visible";
		            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
		        }
		        else if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "LANDMARK"){
		            console.log(p.shapeid)
		            if (selectedShapeID != null)
		            {
		                zingchart.exec('SHAPESDIV', 'updateobject', {
		                    'type':'shape',
		                    'data' : {
		                        'id' : selectedShapeID,
		                        'border-color' : 'black',
		                        'background-color': 'black',
		                        'line-color' : 'black',
		                        zIndex : 1
		                    }
		                });
		            }
		            selectedShapeID = p.shapeid;
		            zingchart.exec('SHAPESDIV', 'updateobject', {
		                'type':'shape',
		                'data' : {
		                    'id' : selectedShapeID,
		                    'border-color' : '#b81c19',
		                    'background-color': '#b81c19',
		                    zIndex : 3
		                }
		            });
		            // document.getElementById("loading").style.visibility = "visible";
		            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
		        }
		    };
		    zingchart.legend_item_click = function(p) {
		        // document.getElementById("loading").style.visibility = "visible";
		        document.getElementById("pokemon_image").src = "UI_images/holder.png";
		        document.getElementById("radar").style.visibility = "hidden";
		        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
		        infoAboutSelectedPokemon(pokeText.slice(0,pokeText.indexOf('(')),pokeText.slice(pokeText.indexOf('(ID: ')+5,pokeText.indexOf(')')));
		    };
		    // document.getElementById("loading").style.visibility = "hidden";
		    window.onresize = function(){
		        setHeightWidth();
		        zingchart.exec('SHAPESDIV', 'setdata', {
		            data : {
		                backgroundColor: "transparent",
		                shapes : shapes_stored
		            }
		        });
		    };
		}

		function setHeightWidth(){
		    var multiple = (document.getElementById("SHAPESDIV").offsetHeight)/ 400;
		    shapes_stored.forEach(function(shape){
		        if (shape.type == "circle") {
		            shape.size *= multiple/prevMultiple;
		            shape.x *= multiple/prevMultiple;
		            shape.y *= multiple/prevMultiple;
		        }
		        else {
		            shape.points.forEach(function(point_array){
		                if (point_array != null)
		                {
		                    for (var pt = 0;point_array.length > pt; pt++)
		                    {
		                        point_array[pt] *= multiple/prevMultiple;
		                    }
		                }
		            })
		        }
		    });
		    prevMultiple = multiple
		}

		function beginRoute(inVal) {
		    methodIndex = [];
		    pokemonSERIES = [];
		    levelsINDEX = [];
		    pokeJSON = [];
		    locationName = "";
		    responseArray = [];
		    min = null;
		    max = null;
		    document.getElementById("select_Method").options.length = 0;
		    var tempOptionMethod = document.createElement("option");
		    tempOptionMethod.text = "Select Method";
		    tempOptionMethod.selected = true;
		    tempOptionMethod.disabled = true;
		    document.getElementById("select_Method").add(tempOptionMethod)
		    document.getElementById("select_Location_Area").options.length = 0;
		    var tempOptionArea = document.createElement("option");
		    tempOptionArea.text = "Select Area";
		    tempOptionArea.selected = true;
		    tempOptionArea.disabled = true;
		    document.getElementById("select_Location_Area").add(tempOptionArea)
		    document.getElementById("select_Version").options.length = 0;
		    var tempOptionVersion = document.createElement("option");
		    tempOptionVersion.text = "Select Version";
		    tempOptionVersion.selected = true;
		    tempOptionVersion.disabled = true;
		    document.getElementById("select_Version").add(tempOptionVersion)
		    pokeLocationFunction(inVal);
		}

		function formatLocationArea(name) {
		    function hyphenLowerToSpaceUpper(match) {
		        return ' ' + match.slice(1).toUpperCase();
		    }
		    return name.replace(/\-([a-z])|\-\d/g, hyphenLowerToSpaceUpper);
		}

		function pokeLocationFunction (inVal) {
		    firebase.database().ref("locations/"+inVal.toString()).once("value").then(function (locationName_accessed) {
		        getAllAreasInLocation(locationName_accessed.val()["identifier"],inVal)
		    });
		}

		function getAllAreasInLocation(location_in,location_id){
		    locationName = location_in;
		    accessDatabaseCHILD(firebase.database().ref("location-areas"), "location_id", location_id, function (areas) {
		        if (areas.length != 0){
		            document.getElementById("select_Location_Area").options.length = 0;
		            var tempOptionArea = document.createElement("option");
		            tempOptionArea.text = "Select Area";
		            tempOptionArea.selected = true;
		            tempOptionArea.disabled = true;
		            document.getElementById("select_Location_Area").add(tempOptionArea)
		            selectLocationArea(areas)
		        }
		        else
		        {
		            alert("We're sorry, we don't detect any wild pokemon in this area!")
		        }
		    },1)
		}

		function selectLocationArea(areas_in){
		    for (var i = 0; i < areas_in.length; i++){
		        var newoptions = document.createElement("option");
		        if (areas_in[i].identifier != "")
		        {
		            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1)) + " " + formatLocationArea(areas_in[i].identifier[0].toUpperCase() + areas_in[i].identifier.slice(1));
		        }
		        else
		        {
		            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1));
		        }
		        newoptions.value = areas_in[i].id;
		        document.getElementById("select_Location_Area").options.add(newoptions);
		        if (i == areas_in.length - 1)
		        {
		            document.getElementById("select_Location_Area").disabled = false;
		            document.getElementById("select_Location_Area").onchange = function () {
		                if (document.getElementById("select_Location_Area").value != "")
		                {
		                    document.getElementById("select_Method").options.length = 0;
		                    var tempOptionMethod = document.createElement("option");
		                    tempOptionMethod.text = "Select Method";
		                    tempOptionMethod.selected = true;
		                    tempOptionMethod.disabled = true;
		                    document.getElementById("select_Method").add(tempOptionMethod)
		                    document.getElementById("select_Version").options.length = 0;
		                    var tempOptionVersion = document.createElement("option");
		                    tempOptionVersion.text = "Select Version";
		                    tempOptionVersion.selected = true;
		                    tempOptionVersion.disabled = true;
		                    document.getElementById("select_Version").add(tempOptionVersion)
		                    setMethodOptions()
		                }
		            }
		        }
		    }
		}

		function setMethodOptions(){
		    selected_areaName = document.getElementById("select_Location_Area").options[document.getElementById("select_Location_Area").selectedIndex].text;
		    selected_areaID = document.getElementById("select_Location_Area").value;
		    console.log("location-area-methods/"+selected_areaID)
		    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
		        console.log("Methods available for area "+selected_areaID+" "+ snapMethods.numChildren());
		        snapMethods.val().forEach(function (method_indiv) {
		            console.log(method_indiv)
		            var newoptions = document.createElement("option");
		            newoptions.text = method_names[method_indiv-1];
		            newoptions.value = method_indiv;
		            document.getElementById("select_Method").options.add(newoptions);
		            if (snapMethods.numChildren() == document.getElementById("select_Method").options.length-1)
		            {
		                document.getElementById("select_Method").disabled = false;
		                document.getElementById("select_Method").onchange = function () {
		                    if (document.getElementById("select_Method").value != "")
		                    {
		                        document.getElementById("select_Version").options.length = 0;
		                        var tempOptionVersion = document.createElement("option");
		                        tempOptionVersion.text = "Select Version";
		                        tempOptionVersion.selected = true;
		                        tempOptionVersion.disabled = true;
		                        document.getElementById("select_Version").add(tempOptionVersion)
		                        selectRegion();
		                    }
		                }
		            }
		        })
		    });
		}

		function selectRegion() {
		    selected_method = document.getElementById("select_Method").value;
		    var tempcount = 0;
		    var gameSelect = document.getElementById("select_Version");
		    console.log(region_stored)
		    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
		        console.log(version_groups);
		        for (var group = 0; group < version_groups.length; group++)
		        {
		            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
		                console.log(versions_in_group);
		                for (var individual = 0; individual < versions_in_group.length; individual++) {
		                    var temp = versions_in_group[individual];
		                    pokeVersionArray.push(temp);
		                    var newoptions = document.createElement("option");
		                    newoptions.text = "";
		                    var holdName = [];
		                    temp.identifier.split("-").forEach(function (val) {
		                        holdName.push(val.charAt(0).toUpperCase() + val.slice(1));
		                    });
		                    newoptions.text = holdName.join(" ");
		                    newoptions.value = temp.id;
		                    gameSelect.options.add(newoptions);
		                    if (individual == versions_in_group.length - 1) {
		                        if (tempcount == version_groups.length - 1) {
		                            document.getElementById("select_Version").disabled = false;
		                        }
		                        else
		                        {
		                            tempcount++;
		                        }
		                    }
		                }
		            },1);
		        }
		    },1);
		    document.getElementById("select_Version").onchange = versionSelect;
		}

		function versionSelect() {
		    if (document.getElementById("select_Version").value != "Select Version")
		    {
		        pokeVersion = document.getElementById("select_Version").value;
		        getEncountersAtAreaGivenMethod(document.getElementById("select_Location_Area").value,document.getElementById("select_Method").value);
		    }
		}

		function getEncountersAtAreaGivenMethod(a_in, m_in) {
		    methodIndex = [];
		    pokemonSERIES = [];
		    levelsINDEX = [];
		    pokeJSON = [];
		    locationName = "";
		    responseArray = [];
		    min = null;
		    max = null;
		    var version_IN;
		    if (pokeVersion == 25 || pokeVersion == 26) {
		        version_IN = (pokeVersion%25)+7;
		    }
		    else
		    {
		        version_IN = pokeVersion;
		    }
		    firebase.database().ref("encounters/"+ a_in + "/"+version_IN+","+ m_in).once("value").then(postFirebase);
		    function postFirebase(snapshot){
		        var snaparray = [];
		        if (snapshot.numChildren() > 0) {
		            snapshot.forEach(function (snap_child) {
		                snaparray.push(snap_child.val())
		                if (snaparray.length == snapshot.numChildren())
		                {
		                    pokemonOnRoute(snaparray,handlePokemon);
		                }
		            })
		        }
		        else
		        {
		            if (pokeVersion == 10 || pokeVersion == 11) {
		                console.log("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in)
		                firebase.database().ref("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in).once("value").then(function (snaptwo) {
		                    var snaparray = [];
		                    if (snaptwo.numChildren() > 0) {
		                        snaptwo.forEach(function (snap_child) {
		                            snaparray.push(snap_child.val())
		                            if (snaparray.length == snaptwo.numChildren()) {
		                                pokemonOnRoute(snaparray, handlePokemon)
		                            }
		                        })
		                    }
		                    else
		                    {
		                        alert("We're sorry, we don't detect any wild pokemon in this area!")
		                    }
		                })
		            }
		            else
		            {
		                alert("We're sorry, we don't detect any wild pokemon in this area!")
		            }
		        }
		    }
		}

		function pokemonOnRoute(possiblePokemonEncounters,callback_in) {
		    if (possiblePokemonEncounters.length == 0){
		        alert("We're sorry, we don't detect any wild pokemon in this area!");
		        return;
		    }
		    pokemonSERIES = [];
		    levelsINDEX = [];
		    var colorArray = colorOptions.slice();
		    for (var p = 0; p < possiblePokemonEncounters.length; p ++) {
		        if (p == possiblePokemonEncounters.length-1)
		        {
		            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
		        }
		        else
		        {
		            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
		        }
		    }
		}

		function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
		    console.log(pokemon_id)
		    var rand = Math.floor(Math.random() * (colorArray.length-1));
		    colorArray.splice(rand,1);
		    if ((min == null) || pokemon.min_level < min) {
		        min = pokemon.min_level;
		    }
		    if ((max == null) || pokemon.max_level > max) {
		        max = pokemon.max_level;
		    }

		    console.log(pokemon_name+ " at rarity "+parseInt(pokemon.rarity));
		    pokemonSERIES.push([pokemon_name,parseInt(pokemon.rarity), parseInt(pokemon.min_level),  parseInt(pokemon.max_level),  "rgb(" + colorArray[rand].join(",")+")",pokemon_id]);
		    if (boolval)
		    {
		        outputPokeJSON(updateChart)
		    }
		}

		function outputPokeJSON(callback) {
		    pokeJSON = [];
		    var levelsTEMP = [];
		    for (var i = min; i <= max; i++){
		        levelsINDEX.push(i);
		        levelsTEMP.push(null);
		    }
		    var JSONStorage = [];
		    var count = 0;

		    for (var p = pokemonSERIES.length - 1; p >= 0; p-- ){
		        count++
		        var text = pokemonSERIES[p][0] + "(ID: "+ pokemonSERIES[p][5] +")";
		        var index = -1;
		        for (var r = 0; r < JSONStorage.length; r++)
		        {
		            if (text == JSONStorage[r][0])
		            {
		                index = r;
		                break;
		            }
		        }
		        if (index != -1)
		        {
		            for(i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
		                if (JSONStorage[r][1][i - min] != null)
		                {
		                    JSONStorage[r][1][i - min] += pokemonSERIES[p][1];
		                }
		                else
		                {
		                    JSONStorage[r][1][i - min] = pokemonSERIES[p][1];
		                }
		            }
		        }
		        else
		        {
		            var methodCatch = levelsTEMP.slice();
		            for (i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
		                methodCatch[i - min] = pokemonSERIES[p][1];
		            }
		            count++;
		            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4]]);
		        }
		        if (p == 0)
		        {
		            JSONStorage.forEach(function (storedEncounter) {
		                pokeJSON.push({
		                    text: storedEncounter[0],
		                    values: storedEncounter[1],
		                    legendItem: {
		                        order: storedEncounter[2]
		                    },
		                    backgroundColor: storedEncounter[3]
		                })
		            });
		            // document.getElementById("loading").style.visibility = "hidden";
		            callback()
		        }
		    }

		}

		function updateChart() {
		    zingchart.exec('CHARTDIV', 'setseriesdata', {
		        data : pokeJSON
		    });
		    zingchart.exec('CHARTDIV', 'modify', {
		        data : {
		            "title": {
		                "text": "Likelyhood of Encountering Pokemon in " + selected_areaName + " with method " + method_names[selected_method-1]
		            },
		            "scale-x": {
		                "values": levelsINDEX
		            },
		            "scale-y": {}
		        }
		    });
		}

		function infoAboutSelectedPokemon(pokename,id_in) {
		    var poke_id = parseInt(id_in);
		    document.getElementById("pokemon_header_types").innerHTML = pokename.charAt(0).toUpperCase() + pokename.slice(1);
		    accessDatabaseCHILD(firebase.database().ref("pokemon-stats"), "pokemon_id", poke_id, function (pokemon_stats) {
		        var stats_name_obj = [];
		        var stats_value_obj = [];
		        var effort_obj = [];
		        for (var q = 0; q < pokemon_stats.length;q++) {
		            stats_name_obj.push(pokemon_stats[q].stat_id);
		            stats_value_obj.push(pokemon_stats[q].base_stat);
		            effort_obj.push(pokemon_stats[q].effort);
		            if (q == pokemon_stats.length-1) {
		                render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                document.getElementById("nature").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("HP").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("attack").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("defense").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("s_attack").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("s_defense").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                document.getElementById("speed").onchange = function () {
		                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
		                }
		                render_Radar(pokename,id_in, stats_name_obj, stats_value_obj);
		                accessDatabaseCHILD(firebase.database().ref("pokemon-types"), "pokemon_id", poke_id, function (pokemon_types) {
		                    if (pokemon_types.length == 2)
		                    {
		                        var type1 = types[pokemon_types[0].type_id].identifier;
		                        var type2 = types[pokemon_types[1].type_id].identifier;
		                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type1 + " ><p>"+type1.charAt(0).toUpperCase() + type1.slice(1)+"</p></div>";
		                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type2 + " ><p>"+type2.charAt(0).toUpperCase() + type2.slice(1)+"</p></div>";
		                        typeEffectivity([pokemon_types[0].type_id,pokemon_types[1].type_id], type1.charAt(0).toUpperCase() + type1.slice(1)+" "+type2.charAt(0).toUpperCase() + type2.slice(1))
		                    }
		                    else
		                    {
		                        var type = types[pokemon_types[0].type_id].identifier;
		                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type + " ><p>"+type.charAt(0).toUpperCase() + type.slice(1)+"</p></div>";
		                        typeEffectivity([pokemon_types[0].type_id],type.charAt(0).toUpperCase() + type.slice(1))
		                    }
		                },1);
		            }
		        }
		    },1);
		}

		function render_Radar(pokename,id_in, stats_name, stats_value){
		    var max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
		    var radar_series = []
		    var null_array = [null,null,null,null,null,null,null,null].slice(0,stats_value.length);
		    for (var t = 0; t < stats_value.length; t++)
		    {
		        var values_array = null_array.slice();
		        values_array[t]  = stats_value[t];
		        var names_array = null_array.slice();
		        names_array[t]  = stats[stats_name[t]].text;
		        radar_series.push({
		            "values" : values_array,
		            "data-band": names_array,
		            "target" : "_blank",
		            "background-color":stats[stats_name[t]].color,
		            "tooltip": {
		                "text":"%data-band: %v",
		                "background-color":stats[stats_name[t]].color,
		                "color":"#FFF",
		                "font-size":"14px"
		            },
		            "text":stats[stats_name[1]].text
		            })
		        if (t == stats_value.length - 1)
		        {

		            var myRadar = {
		                "globals": {
		                    "font-family": 'Exo 2, sans-serif',
		                    "shadow":false
		                },
		                "title" : {
		                    visible:true,
		                    "font-color": "#fff",
		                    "font-family": 'Exo 2, sans-serif',
		                    "text" : "Base Stats for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
		                    "background-color":"transparent",
		                    "font-size":"15",
		                    height:"10%",
		                    textAlign:"center"
		                },
		                type: "radar",
		                backgroundColor: "transparent",
		                scale:{
		                    sizeFactor: "100%"
		                },
		                plot: {
		                    "background-color":"#fff",
		                    aspect:"rose",
		                    "animation": {
		                        "effect":"ANIMATION_EXPAND_TOP",
		                        "sequence":"ANIMATION_BY_PLOT_AND_NODE",
		                        "speed":10
		                    },
		                    "stacked": true //To create a stacked radar chart.
		                },
		                "scale-k":{
		                    "aspect":"circle",
		                    "visible":false
		                },
		                // "legend": {
		                //     "layout":"6x1",
		                //     "toggle-action": "none",
		                //     "border-width": 0,
		                //     "border-color": "none",
		                //     backgroundColor: "#116381",
		                //     "border-radius":"5vmin",
		                //     x: "70%",
		                //     y: "0%",
		                //     height:"90%",
		                //     "item": {
		                //         "font-color": "#fff",
		                //         "font-family": 'Exo 2, sans-serif',
		                //         "font-size": "15px",
		                //         "font-weight": "600",
		                //     },
		                //
		                // },
		                "scale-v":{
		                    "values": "0:"+ max_Val +":25",
		                    "guide": {
		                        "line-width":1,
		                        "line-style":"FFF",
		                        "line-color":"#FFF"
		                    },
		                    "item": {
		                        "color":"#FFF"
		                    },
		                    "line-color":"#FFF",
		                    alpha:0.6
		                },
		                plotarea:{
		                    height:"100%",
		                },
		                "series" : radar_series
		            };

		            zingchart.render({
		                id : 'radar',
		                data : myRadar,
		            });
		            document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
		            document.getElementById("radar").style.visibility = "visible";
		        }
		    }
		}

		function typeEffectivity(types_in, typename) {

		    var effectivity = [
		        [1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
		        [1,1,2,1,1,0.5,0.5,1,1,1,1,1,1,2,1,1,0.5,2],
		        [1,0.5,1,1,0,2,0.5,1,1,1,1,0.5,2,1,2,1,1,1],
		        [1,0.5,1,0.5,2,1,0.5,1,1,1,1,0.5,1,2,1,1,1,0.5],
		        [1,1,1,0.5,1,0.5,1,1,1,1,2,2,0,1,2,1,1,1],
		        [0.5,2,0.5,0.5,2,1,1,1,2,0.5,2,2,1,1,1,1,1,1],
		        [1,0.5,2,1,0.5,2,1,1,1,2,1,0.5,1,1,1,1,1,1],
		        [0,0,1,0.5,1,1,0.5,2,1,1,1,1,1,1,1,1,2,1],
		        [0.5,2,0.5,0,2,0.5,0.5,1,0.5,2,1,0.5,1,0.5,0.5,0.5,1,0.5],
		        [1,1,1,1,2,2,0.5,1,0.5,0.5,2,0.5,1,1,0.5,1,1,0.5],
		        [1,1,1,1,1,1,1,1,0.5,0.5,0.5,2,2,1,0.5,1,1,1],
		        [1,1,2,2,0.5,1,2,1,1,2,0.5,0.5,0.5,1,2,1,1,1],
		        [1,1,0.5,1,2,1,1,1,0.5,1,1,1,0.5,1,1,1,1,1],
		        [1,0.5,1,1,1,1,2,2,1,1,1,1,1,0.5,1,1,2,1],
		        [1,2,1,1,1,2,1,1,2,2,1,1,1,1,0.5,1,1,1],
		        [1,1,1,1,1,1,1,1,1,0.5,0.5,0.5,0.5,1,2,2,1,2],
		        [1,2,1,1,1,1,2,0.5,1,1,1,1,1,0,1,1,0.5,2],
		        [1,0.5,1,2,1,1,0.5,1,2,1,1,1,1,1,1,0,0.5,1]
		    ];
		    var this_pokemon_index_array = [];
		    types_in.forEach(function (type) {
		        console.log(type)
		        console.log(types)
		        this_pokemon_index_array.push(parseInt(type));
		    })
		    function calculateEffectivity(attack_index_array, defense_index_array)
		    {
		        var effectivity_value = effectivity[attack_index_array[0]][defense_index_array[0]];
		        if (defense_index_array.length == 2) {
		            effectivity_value = effectivity_value*effectivity[attack_index_array[0]][defense_index_array[1]];
		        }
		        else if (attack_index_array.length == 2) {
		            effectivity_value = effectivity_value*effectivity[attack_index_array[1]][defense_index_array[0]];
		        }
		        if (effectivity_value == 0)
		        {
		            effectivity_value = 1
		        }
		        return effectivity_value;
		    }
		    var val_array = [
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([0],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([1],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([2],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([3],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([4],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([5],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([6],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([7],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([8],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([9],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([10],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([11],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([12],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([13],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([14],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([15],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([16],this_pokemon_index_array)],
		        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([17],this_pokemon_index_array)],
		        [calculateEffectivity(this_pokemon_index_array,[0]),
		        calculateEffectivity(this_pokemon_index_array,[1]),
		        calculateEffectivity(this_pokemon_index_array,[2]),
		        calculateEffectivity(this_pokemon_index_array,[3]),
		        calculateEffectivity(this_pokemon_index_array,[4]),
		        calculateEffectivity(this_pokemon_index_array,[5]),
		        calculateEffectivity(this_pokemon_index_array,[6]),
		        calculateEffectivity(this_pokemon_index_array,[7]),
		        calculateEffectivity(this_pokemon_index_array,[8]),
		        calculateEffectivity(this_pokemon_index_array,[9]),
		        calculateEffectivity(this_pokemon_index_array,[10]),
		        calculateEffectivity(this_pokemon_index_array,[11]),
		        calculateEffectivity(this_pokemon_index_array,[12]),
		        calculateEffectivity(this_pokemon_index_array,[13]),
		        calculateEffectivity(this_pokemon_index_array,[14]),
		        calculateEffectivity(this_pokemon_index_array,[15]),
		        calculateEffectivity(this_pokemon_index_array,[16]),
		        calculateEffectivity(this_pokemon_index_array,[17]),
		        calculateEffectivity(this_pokemon_index_array,this_pokemon_index_array)]
		    ]

		    var myChord = {
		        "title" : {
		            visible:true,
		            "font-color": "#fff",
		            "font-family": 'Exo 2, sans-serif',
		            "text" : "Type Effectiveness",
		            "background-color":"transparent",
		            "font-size":"15",
		            height:"10%",
		            y:"-5%",
		            textAlign:"center"
		        },
		        "type": "chord",
		        "background-color": "transparent",
		        // "legend": {
		        //     "layout":"10x2",
		        //     "toggle-action": "none",
		        //     "border-width": 0,
		        //     "border-color": "none",
		        //     backgroundColor: "#116381",
		        //     "border-radius":"5vmin",
		        //     x: "70%",
		        //     y: "0%",
		        //     height:"85%",
		        //     "item": {
		        //         "font-color": "#fff",
		        //         "font-family": 'Exo 2, sans-serif',
		        //         "font-size": "15px",
		        //         "font-weight": "600",
		        //     },
		        // },
		        y:"5%",
		        "options": {
		            radius:"90%",
		            "band-space": 0,
		            "shadow": 0,
		            "border": "none",
		            "color-type":"palette",
		            "style":{
		                offsetY:"10%",
		                "chord":{
		                    "border-color":"none"
		                },
		                "tick":{
		                    visible: false
		                },
		                "item":{
		                    visible: false
		                },
		                "label": {
		                    visible: false
		                },
		                "tooltip":{
		                    "text-chord":"%text-source attacks %text-destination with effectivity  of x%value-source, <br>%text-destination attacks %text-source with effectivity of x%value-destination",
		                    "text":"Self-chord of item %text with value %value"
		                }
		            },
		            "palette":["#A8A878",
		                "#F08030",
		                "#6890F0",
		                "#F8D030",
		                "#78C850",
		                "#98D8D8",
		                "#C03028",
		                "#A040A0",
		                "#E0C068",
		                "#A890F0",
		                "#F85888",
		                "#A8B820",
		                "#B8A038",
		                "#705898",
		                "#7038F8",
		                "#705848",
		                "#B8B8D0",
		                "#EE99AC",
		                "#FFF"]
		        },
		        "series":[{
		            text:"Normal",
		            "values": val_array[0],
		            "style": {
		                "band": {
		                    "background-color": "#C6C6A7",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Fire",
		            "values": val_array[1],
		            "style": {
		                "band": {
		                    "background-color": "#9C531F",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Water",
		            "values": val_array[2],
		            "style": {
		                "band": {
		                    "background-color": "#445E9C",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Electric",
		            "values":val_array[3],
		            "style": {
		                "band": {
		                    "background-color": "#A1871F",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Grass",
		            "values":val_array[4],
		            "style": {
		                "band": {
		                    "background-color": "#4E8234",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Ice",
		            "values":val_array[5],
		            "style": {
		                "band": {
		                    "background-color": "#638D8D",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Fighting",
		            "values":val_array[6],
		            "style": {
		                "band": {
		                    "background-color": "#7D1F1A",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Poison",
		            "values":val_array[7],
		            "style": {
		                "band": {
		                    "background-color": "#682A68",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Ground",
		            "values":val_array[8],
		            "style": {
		                "band": {
		                    "background-color": "#927D44",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Flying",
		            "values": val_array[9],
		            "style": {
		                "band": {
		                    "background-color": "#6D5E9C",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Psychic",
		            "values": val_array[10],
		            "style": {
		                "band": {
		                    "background-color": "#A13959",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Bug",
		            "values": val_array[11],
		            "style": {
		                "band": {
		                    "background-color": "#6D7815",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Rock",
		            "values": val_array[12],
		            "style": {
		                "band": {
		                    "background-color": "#786824",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Ghost",
		            "values": val_array[13],
		            "style": {
		                "band": {
		                    "background-color": "#493963",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Dragon",
		            "values": val_array[14],
		            "style": {
		                "band": {
		                    "background-color": "#4924A1",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Dark",
		            "values": val_array[15],
		            "style": {
		                "band": {
		                    "background-color": "#49392F",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Steel",
		            "values": val_array[16],
		            "style": {
		                "band": {
		                    "background-color": "#787887",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:"Fairy",
		            "values": val_array[17],
		            "style": {
		                "band": {
		                    "background-color": "#9B6470",
		                    "alpha": 1
		                },
		            },
		        },{
		            text:typename,
		            "values": val_array[18],
		            "style": {
		                "band": {
		                    "background-color": "#FFF",
		                    "alpha": 1
		                },
		            },
		        }]
		    };
		    zingchart.render({
		        id : 'chord',
		        data : myChord,
		    });
		}

		function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
		    var nature_str=document.getElementById("nature").value.split(",");
		    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
		    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
		    console.log(stats_name)
		    console.log(nature)
		    var levels=[10,20,30,40,50,60,70,80,90,100];
		    var statsFinal = [];
		    var k;
		    for (var i = 0; i < stats_name.length; i++)
		    {
		        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		        if (stats_name[i] == "1")
		        {
		            for (k=0; k < 10; k++)
		            {
		                temp[k]= Math.floor((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+levels[k]+10;
		                if (k == 9)
		                {
		                    statsFinal.push(temp)
		                }
		            }
		        }
		        else
		        {
		            for (k=0; k < 10; k++)
		            {
		                if (stats_name[i] == parseInt(nature[0]))
		                {
		                    console.log(stats_name[i])
		                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*1.1);
		                    if (k == 9)
		                    {
		                        statsFinal.push(temp)
		                    }
		                }
		                else if (stats_name[i] == parseInt(nature[1]))
		                {
		                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*0.9);
		                    if (k == 9)
		                    {
		                        statsFinal.push(temp)
		                    }
		                }
		                else
		                {
		                    temp[k]= Math.floor(((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5);
		                    if (k == 9)
		                    {
		                        statsFinal.push(temp)
		                    }
		                }
		            }
		        }
		    }
		    var stats_graph_progress = [];
		    for (var p = 0; p < statsFinal.length; p++)
		    {
		        stats_graph_progress.push({
		            text: stats[stats_name[p]].text,
		            values: statsFinal[p],
		            backgroundColor: stats[stats_name[p]].color,
		            lineColor: stats[stats_name[p]].color,
		            marker:{
		                backgroundColor: stats[stats_name[p]].color,
		                borderColor: stats[stats_name[p]].color

		            },
		            "tooltip": {
		                "text": "%t at level %kt: %vt"
		            }
		        });
		    }
		    var statsProgression = {
		        "background-color": "transparent",
		        "title" : {
		            visible:true,
		            "font-color": "#fff",
		            "font-family": 'Exo 2, sans-serif',
		            "text" : "Stats Progression for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
		            "background-color":"transparent",
		            "font-size":"15",
		            height:"14.2857143%",
		            textAlign:"center"
		        },
		        "scale-x": {
		            "values": [],
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
		                "font-size":"12.5",
		                "font-color": "#fff",
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
		                "text": "Stat Value",
		                "font-family": 'Exo 2, sans-serif',
		                "font-weight": "normal",
		                "font-size":"12.5",
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
		        type: "area",
		        stacked: true,
		        height: "100%",
		        width: "100%",
		        plot:{
		            alphaArea: 0.6,
		            "animation": {
		                "delay": 0,
		                "effect": 1,
		                "speed": 1000,
		                "method": 0,
		                "sequence": 1
		            }
		        },
		        series : stats_graph_progress,
		    };
		    zingchart.render({
		        id : 'stats_progression',
		        data : statsProgression,
		    });
		}

		function accessDatabaseCHILD(ref_in,str,val_comp,callbackfunction,pass) {
		    ref_in.orderByChild(str).equalTo(val_comp).once("value").then(function(snapshot) {
		        var temp_database_array = [];
		        console.log(str+": "+snapshot.numChildren())
		        snapshot.forEach(function (snap_child) {
		            temp_database_array.push(snap_child.val());
		            if (temp_database_array.length == snapshot.numChildren())
		            {
		                if (pass) {
		                    callbackfunction(temp_database_array);
		                }
		                else
		                {
		                    callbackfunction();
		                }
		            }
		        })
		    });
		}


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		
		module.exports = function () {
		  return [
		  {
		    "name": "red-blue",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/1/",
		        "name": "red"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/2/",
		        "name": "blue"
		      }
		    ]
		  },
		  {
		    "name": "yellow",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/3/",
		        "name": "yellow"
		      }
		    ],
		  },
		  {
		    "name": "gold-silver",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/4/",
		        "name": "gold"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/5/",
		        "name": "silver"
		      }
		    ]
		  },
		  {
		    "name": "crystal",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/6/",
		        "name": "crystal"
		      }
		    ]
		  },
		  {
		    "name": "ruby-sapphire",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/7/",
		        "name": "ruby"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/8/",
		        "name": "sapphire"
		      }
		    ]
		  },
		  {
		    "name": "emerald",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/9/",
		        "name": "emerald"
		      }
		    ]
		  },
		  {
		    "name": "firered-leafgreen",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/10/",
		        "name": "firered"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/11/",
		        "name": "leafgreen"
		      }
		    ]
		  },
		  {
		    "name": "diamond-pearl",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/12/",
		        "name": "diamond"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/13/",
		        "name": "pearl"
		      }
		    ]
		  },
		  {
		    "name": "platinum",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/14/",
		        "name": "platinum"
		      }
		    ]
		  },
		  {
		    "name": "heartgold-soulsilver",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/15/",
		        "name": "heartgold"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/16/",
		        "name": "soulsilver"
		      }
		    ]
		  },
		  {
		    "name": "black-white",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/17/",
		        "name": "black"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/18/",
		        "name": "white"
		      }
		    ]
		  },
		  {
		    "name": "colosseum",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/19/",
		        "name": "colosseum"
		      }
		    ]
		  },
		  {
		    "name": "xd",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/20/",
		        "name": "xd"
		      }
		    ]
		  },
		  {
		    "name": "black-2-white-2",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/21/",
		        "name": "black-2"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/22/",
		        "name": "white-2"
		      }
		    ]
		  },
		  {
		    "name": "x-y",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/23/",
		        "name": "x"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/24/",
		        "name": "y"
		      }
		    ]
		  },
		  {
		    "name": "omega-ruby-alpha-sapphire",
		    "versions": [
		      {
		        "url": "http://pokeapi.co/api/v2/version/25/",
		        "name": "omega-ruby"
		      },
		      {
		        "url": "http://pokeapi.co/api/v2/version/26/",
		        "name": "alpha-sapphire"
		      }
		    ]
		  }
		]};

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		/**
		 * Created by tmartin on 7/8/16.
		 */

		module.exports = {
		    mkshape:makeShape,
		};




		function pathToPolygon(array) {
		    var pointsArray = [];
		    var currentLetter = "";
		    var position = 0;
		    var pointCount = 0; //CURVE
		    var curvePoints = [];
		    var coordinateCount = 0; //CURVE
		    var coordinateArray = []; //CURVE
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
		                    coordinateArray.push(parseFloat(value));
		                    coordinateCount++;
		                    if (coordinateCount == 6){
		                        coordinateArray.push(1);
		                        coordinateCount = 0;
		                        pointsArray.push(coordinateArray);
		                        coordinateArray = [];

		                    }
		                    // if (position == 0) {
		                    //     if (pointCount == 0)
		                    //     {
		                    //         curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
		                    //     }
		                    //     curvePoints.push([parseFloat(value)]);
		                    //     position = 1;
		                    // }
		                    // else {
		                    //     curvePoints[curvePoints.length-1].push(parseFloat(value));
		                    //     pointCount++;
		                    //     position = 0;
		                    //     if (pointCount == 3)
		                    //     {
		                    //         var vals = bezier(curvePoints);
		                    //         var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
		                    //         for (var t = 0; t < distance;t++) {
		                    //             pointsArray.push(vals(t/distance));
		                    //         }
		                    //         curvePoints = [];
		                    //         pointCount = 0;
		                    //     }
		                    // }
		                    //
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
		    var coordinateCount = 0; //CURVE
		    var coordinateArray = []; //CURVE
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
		                    coordinateArray.push(parseFloat(value));
		                    coordinateCount++;
		                    if (coordinateCount == 6){
		                        coordinateArray.push(1);
		                        coordinateCount = 0;
		                        pointsArray.push(coordinateArray);
		                        coordinateArray = [];

		                    }
		                    else {
		                        coordinateCount++;
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
		    if (path.getAttribute("class") == "ROUTE") {
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
		                },
		                zIndex:2,
		                cursor: "pointer"
		            };
		        }
		    }
		    else if (path.getAttribute("class") == "LAND") {
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
		                "shadow-angle":0,
		                "shadow-blur":"3px",
		                "shadow-color": "#082f3d",
		                "shadow-alpha": 1,
		                flat: true
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
		            zIndex:1
		        };
		    }
		    else if (path.getAttribute("class") == "LANDMARK") {
		         circleR = path.getAttribute("r").trim();
		         circleX = path.getAttribute("cx").trim();
		         circleY = path.getAttribute("cy").trim();
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
		            "hover-state": {
		                "borderColor": "#FFD700",
		                "backgroundColor": "#FFD700",
		            },
		            zIndex:1,
		            cursor: "pointer"
		        };
		    }
		}

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

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

			__webpack_require__(1);
			__webpack_require__(1);
			module.exports = __webpack_require__(5);


		/***/ },
		/* 1 */
		/***/ function(module, exports, __webpack_require__) {

			var pokescript = __webpack_require__(2);
			var svgToZing = __webpack_require__(4);
			var SVGSTRING;

			window.addEventListener("load", beginApp);
			function beginApp() {
			    document.getElementById('select_Region').addEventListener("change", function () {
			        document.getElementById("loading").visibility = "visible";
			        var location = new XMLHttpRequest();
			        var url = '/region_maps/' + document.getElementById('select_Region').name + '.svg';
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

		/***/ },
		/* 2 */
		/***/ function(module, exports, __webpack_require__) {

			/**
			 * Created by tmartin on 7/12/16.
			 */
			var versions = __webpack_require__(3);
			var pokeVersion;
			var pokeVersionArray = [];
			var min = null;
			var max = null;
			var pokemonSERIES = [];
			var pokeJSON = [];
			var levelsINDEX = [];
			var methodIndex = [];
			var locationName = "";
			var selected_areaName = "";
			var selected_areaID;
			var selected_method;
			var responseArray = [];
			var svg_stored;
			var shapes_stored;
			var region_stored;
			var selectedShapeID = null;
			var regions = {
			    "1": {
			        "name": "Kanto"
			    },
			    "2": {
			        "name": "Johto"
			    },
			    "3": {
			        "name": "Hoenn"
			    },
			    "4": {
			        "name": "Sinnoh"
			    },
			    "5": {
			        "name": "Unova"
			    },
			    "6": {
			        "name": "Kalos"
			    }
			};
			var stats = {
			    "1": {
			        text:'HP',
			        color: '#b20000'
			    },
			    "2": {
			        text:'Attack',
			        color: '#d8732b'
			    },
			    "3": {
			        text:'Defense',
			        color: '#dfbb2b'
			    },
			    "4": {
			        text:'S. Attack',
			        color: '#6890F0'
			    },
			    "5": {
			        text:'S. Defense',
			        color: '#78C850'
			    },
			    "6": {
			        text:'Speed',
			        color: '#F85888'
			    },
			    "7": {
			        text:'Accuracy',
			        color: '#1A8B55'
			    },
			    "8": {
			        text:'Evasion',
			        color: '#47A0A2'
			    }
			}
			var types = {
			        "1": {
			            "identifier": "normal",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "2": {
			            "identifier": "fighting",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "3": {
			            "identifier": "flying",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "4": {
			            "identifier": "poison",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "5": {
			            "identifier": "ground",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "6": {
			            "identifier": "rock",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "7": {
			            "identifier": "bug",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "8": {
			            "identifier": "ghost",
			            "generation_id": 1,
			            "damage_class_id": 2
			        },
			        "9": {
			            "identifier": "steel",
			            "generation_id": 2,
			            "damage_class_id": 2
			        },
			        "10": {
			            "identifier": "fire",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "11": {
			            "identifier": "water",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "12": {
			            "identifier": "grass",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "13": {
			            "identifier": "electric",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "14": {
			            "identifier": "psychic",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "15": {
			            "identifier": "ice",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "16": {
			            "identifier": "dragon",
			            "generation_id": 1,
			            "damage_class_id": 3
			        },
			        "17": {
			            "identifier": "dark",
			            "generation_id": 2,
			            "damage_class_id": 3
			        },
			        "18": {
			            "identifier": "fairy",
			            "generation_id": 6,
			            "damage_class_id": ""
			        },
			        "10001": {
			            "identifier": "unknown",
			            "generation_id": 2,
			            "damage_class_id": ""
			        },
			        "10002": {
			            "identifier": "shadow",
			            "generation_id": 3,
			            "damage_class_id": ""
			        }
			    }
			var method_names = ["walk", "old-rod","good-rod","super-rod","surf","rock-smash","headbutt","dark-grass","grass-spots","cave-spots","bridge-spots","super-rod-spots","surf-spots","yellow-flowers","purple-flowers","red-flowers","rough-terrain"]
			var pokedex = []
			var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134],[255,183,183],[255,234,183],[255,255,183],[234,255,183],[183,255,183],[183,255,234],[183,255,255],[183,234,255],[183,183,255],[234,183,255],[255,183,255],[255,183,234],[185,113,113],[185,134,113],[185,185,113],[134,185,113],[113,185,113],[113,185,134],[113,185,185],[113,134,185],[113,113,185],[134,113,185],[185,113,185],[185,113,134]];
			var prevMultiple = 1;

			module.exports = {
			    createDropDown:initialFunction
			};

			function initialFunction(region,render_obj) {
			    selectedShapeID = null;
			    document.getElementById("select_Method").options.length = 0;
			    var tempOptionMethod = document.createElement("option");
			    tempOptionMethod.text = "Select Method";
			    tempOptionMethod.selected = true;
			    tempOptionMethod.disabled = true;
			    document.getElementById("select_Method").add(tempOptionMethod)
			    document.getElementById("select_Location_Area").options.length = 0;
			    var tempOptionArea = document.createElement("option");
			    tempOptionArea.text = "Select Area";
			    tempOptionArea.selected = true;
			    tempOptionArea.disabled = true;
			    document.getElementById("select_Location_Area").add(tempOptionArea)
			    document.getElementById("select_Version").options.length = 0;
			    var tempOptionVersion = document.createElement("option");
			    tempOptionVersion.text = "Select Version";
			    tempOptionVersion.selected = true;
			    tempOptionVersion.disabled = true;
			    document.getElementById("select_Version").add(tempOptionVersion)
			    svg_stored = render_obj[0];
			    shapes_stored = render_obj[1];
			    region_stored = parseInt(region);
			    prevMultiple = 1;
			    createPokedex();
			    renderShape();
			}

			function createPokedex() {
			    firebase.database().ref("pokemon").orderByKey().once("value").then(function(snapshot) {
			        snapshot.forEach(function (snap_child) {
			            pokedex.push(snap_child.val());
			        })
			    });
			}

			function renderShape() {
			    setHeightWidth()
			    zingchart.render({
			        id: "SHAPESDIV",
			        width: "100%",
			        height: "100%",
			        margins: 0,
			        backgroundColor: "transparent",
			        data: {
			            backgroundColor: "transparent",
			            "shapes": shapes_stored
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
			                    "alpha": 0.6,
			                    cursor: "pointer"
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
			                    "effect": 1,
			                    "speed": 1000,
			                    "method": 0,
			                    "sequence": 1
			                }
			            },
			            "scale-x": {
			                "values": [],
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
			                "text": "Chance of encountering a level %k %t: %v%",
			                "font-family": 'Exo 2, sans-serif',
			                "font-size": "15px",
			                "font-weight": "normal",
			                "font-color": "#fff",
			                "decimals": 2,
			                "text-align": "left",
			                "border-radius": "8px",
			                "padding": "10px 10px",
			                "background-color": "#0B4153",
			                "alpha": 0.95,
			                "shadow": 0,
			                "border-width": 0,
			                "border-color": "none"
			            },
			            "series": pokeJSON
			        }
			    });
			    zingchart.shape_click = function(p) {
			        if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
			            console.log(p.shapeid)
			            if (selectedShapeID != null)
			            {
			                zingchart.exec('SHAPESDIV', 'updateobject', {
			                    'type':'shape',
			                    'data' : {
			                        'id' : selectedShapeID,
			                        'line-color' : 'black',
			                        'border-color' : 'black',
			                        'background-color': 'black',
			                        zIndex : 2
			                    }
			                });
			            }
			            selectedShapeID = p.shapeid;
			            zingchart.exec('SHAPESDIV', 'updateobject', {
			                'type':'shape',
			                'data' : {
			                    'id' : selectedShapeID,
			                    'line-color' : '#b81c19',
			                    zIndex : 3
			                }
			            });
			            // document.getElementById("loading").style.visibility = "visible";
			            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
			        }
			        else if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "LANDMARK"){
			            console.log(p.shapeid)
			            if (selectedShapeID != null)
			            {
			                zingchart.exec('SHAPESDIV', 'updateobject', {
			                    'type':'shape',
			                    'data' : {
			                        'id' : selectedShapeID,
			                        'border-color' : 'black',
			                        'background-color': 'black',
			                        'line-color' : 'black',
			                        zIndex : 1
			                    }
			                });
			            }
			            selectedShapeID = p.shapeid;
			            zingchart.exec('SHAPESDIV', 'updateobject', {
			                'type':'shape',
			                'data' : {
			                    'id' : selectedShapeID,
			                    'border-color' : '#b81c19',
			                    'background-color': '#b81c19',
			                    zIndex : 3
			                }
			            });
			            // document.getElementById("loading").style.visibility = "visible";
			            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
			        }
			    };
			    zingchart.legend_item_click = function(p) {
			        // document.getElementById("loading").style.visibility = "visible";
			        document.getElementById("pokemon_image").src = "UI_images/holder.png";
			        document.getElementById("radar").style.visibility = "hidden";
			        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
			        infoAboutSelectedPokemon(pokeText.slice(0,pokeText.indexOf('(')),pokeText.slice(pokeText.indexOf('(ID: ')+5,pokeText.indexOf(')')));
			    };
			    // document.getElementById("loading").style.visibility = "hidden";
			    window.onresize = function(){
			        setHeightWidth();
			        zingchart.exec('SHAPESDIV', 'setdata', {
			            data : {
			                backgroundColor: "transparent",
			                shapes : shapes_stored
			            }
			        });
			    };
			}

			function setHeightWidth(){
			    var multiple = (document.getElementById("SHAPESDIV").offsetHeight)/ 400;
			    shapes_stored.forEach(function(shape){
			        if (shape.type == "circle") {
			            shape.size *= multiple/prevMultiple;
			            shape.x *= multiple/prevMultiple;
			            shape.y *= multiple/prevMultiple;
			        }
			        else {
			            shape.points.forEach(function(point_array){
			                if (point_array != null)
			                {
			                    for (var pt = 0;point_array.length > pt; pt++)
			                    {
			                        point_array[pt] *= multiple/prevMultiple;
			                    }
			                }
			            })
			        }
			    });
			    prevMultiple = multiple
			}

			function beginRoute(inVal) {
			    methodIndex = [];
			    pokemonSERIES = [];
			    levelsINDEX = [];
			    pokeJSON = [];
			    locationName = "";
			    responseArray = [];
			    min = null;
			    max = null;
			    document.getElementById("select_Method").options.length = 0;
			    var tempOptionMethod = document.createElement("option");
			    tempOptionMethod.text = "Select Method";
			    tempOptionMethod.selected = true;
			    tempOptionMethod.disabled = true;
			    document.getElementById("select_Method").add(tempOptionMethod)
			    document.getElementById("select_Location_Area").options.length = 0;
			    var tempOptionArea = document.createElement("option");
			    tempOptionArea.text = "Select Area";
			    tempOptionArea.selected = true;
			    tempOptionArea.disabled = true;
			    document.getElementById("select_Location_Area").add(tempOptionArea)
			    document.getElementById("select_Version").options.length = 0;
			    var tempOptionVersion = document.createElement("option");
			    tempOptionVersion.text = "Select Version";
			    tempOptionVersion.selected = true;
			    tempOptionVersion.disabled = true;
			    document.getElementById("select_Version").add(tempOptionVersion)
			    pokeLocationFunction(inVal);
			}

			function formatLocationArea(name) {
			    function hyphenLowerToSpaceUpper(match) {
			        return ' ' + match.slice(1).toUpperCase();
			    }
			    return name.replace(/\-([a-z])|\-\d/g, hyphenLowerToSpaceUpper);
			}

			function pokeLocationFunction (inVal) {
			    firebase.database().ref("locations/"+inVal.toString()).once("value").then(function (locationName_accessed) {
			        getAllAreasInLocation(locationName_accessed.val()["identifier"],inVal)
			    });
			}

			function getAllAreasInLocation(location_in,location_id){
			    locationName = location_in;
			    accessDatabaseCHILD(firebase.database().ref("location-areas"), "location_id", location_id, function (areas) {
			        if (areas.length != 0){
			            document.getElementById("select_Location_Area").options.length = 0;
			            var tempOptionArea = document.createElement("option");
			            tempOptionArea.text = "Select Area";
			            tempOptionArea.selected = true;
			            tempOptionArea.disabled = true;
			            document.getElementById("select_Location_Area").add(tempOptionArea)
			            selectLocationArea(areas)
			        }
			        else
			        {
			            alert("We're sorry, we don't detect any wild pokemon in this area!")
			        }
			    },1)
			}

			function selectLocationArea(areas_in){
			    for (var i = 0; i < areas_in.length; i++){
			        var newoptions = document.createElement("option");
			        if (areas_in[i].identifier != "")
			        {
			            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1)) + " " + formatLocationArea(areas_in[i].identifier[0].toUpperCase() + areas_in[i].identifier.slice(1));
			        }
			        else
			        {
			            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1));
			        }
			        newoptions.value = areas_in[i].id;
			        document.getElementById("select_Location_Area").options.add(newoptions);
			        if (i == areas_in.length - 1)
			        {
			            document.getElementById("select_Location_Area").disabled = false;
			            document.getElementById("select_Location_Area").onchange = function () {
			                if (document.getElementById("select_Location_Area").value != "")
			                {
			                    document.getElementById("select_Method").options.length = 0;
			                    var tempOptionMethod = document.createElement("option");
			                    tempOptionMethod.text = "Select Method";
			                    tempOptionMethod.selected = true;
			                    tempOptionMethod.disabled = true;
			                    document.getElementById("select_Method").add(tempOptionMethod)
			                    document.getElementById("select_Version").options.length = 0;
			                    var tempOptionVersion = document.createElement("option");
			                    tempOptionVersion.text = "Select Version";
			                    tempOptionVersion.selected = true;
			                    tempOptionVersion.disabled = true;
			                    document.getElementById("select_Version").add(tempOptionVersion)
			                    setMethodOptions()
			                }
			            }
			        }
			    }
			}

			function setMethodOptions(){
			    selected_areaName = document.getElementById("select_Location_Area").options[document.getElementById("select_Location_Area").selectedIndex].text;
			    selected_areaID = document.getElementById("select_Location_Area").value;
			    console.log("location-area-methods/"+selected_areaID)
			    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
			        console.log("Methods available for area "+selected_areaID+" "+ snapMethods.numChildren());
			        snapMethods.val().forEach(function (method_indiv) {
			            console.log(method_indiv)
			            var newoptions = document.createElement("option");
			            newoptions.text = method_names[method_indiv-1];
			            newoptions.value = method_indiv;
			            document.getElementById("select_Method").options.add(newoptions);
			            if (snapMethods.numChildren() == document.getElementById("select_Method").options.length-1)
			            {
			                document.getElementById("select_Method").disabled = false;
			                document.getElementById("select_Method").onchange = function () {
			                    if (document.getElementById("select_Method").value != "")
			                    {
			                        document.getElementById("select_Version").options.length = 0;
			                        var tempOptionVersion = document.createElement("option");
			                        tempOptionVersion.text = "Select Version";
			                        tempOptionVersion.selected = true;
			                        tempOptionVersion.disabled = true;
			                        document.getElementById("select_Version").add(tempOptionVersion)
			                        selectRegion();
			                    }
			                }
			            }
			        })
			    });
			}

			function selectRegion() {
			    selected_method = document.getElementById("select_Method").value;
			    var tempcount = 0;
			    var gameSelect = document.getElementById("select_Version");
			    console.log(region_stored)
			    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
			        console.log(version_groups);
			        for (var group = 0; group < version_groups.length; group++)
			        {
			            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
			                console.log(versions_in_group);
			                for (var individual = 0; individual < versions_in_group.length; individual++) {
			                    var temp = versions_in_group[individual];
			                    pokeVersionArray.push(temp);
			                    var newoptions = document.createElement("option");
			                    newoptions.text = "";
			                    var holdName = [];
			                    temp.identifier.split("-").forEach(function (val) {
			                        holdName.push(val.charAt(0).toUpperCase() + val.slice(1));
			                    });
			                    newoptions.text = holdName.join(" ");
			                    newoptions.value = temp.id;
			                    gameSelect.options.add(newoptions);
			                    if (individual == versions_in_group.length - 1) {
			                        if (tempcount == version_groups.length - 1) {
			                            document.getElementById("select_Version").disabled = false;
			                        }
			                        else
			                        {
			                            tempcount++;
			                        }
			                    }
			                }
			            },1);
			        }
			    },1);
			    document.getElementById("select_Version").onchange = versionSelect;
			}

			function versionSelect() {
			    if (document.getElementById("select_Version").value != "Select Version")
			    {
			        pokeVersion = document.getElementById("select_Version").value;
			        getEncountersAtAreaGivenMethod(document.getElementById("select_Location_Area").value,document.getElementById("select_Method").value);
			    }
			}

			function getEncountersAtAreaGivenMethod(a_in, m_in) {
			    methodIndex = [];
			    pokemonSERIES = [];
			    levelsINDEX = [];
			    pokeJSON = [];
			    locationName = "";
			    responseArray = [];
			    min = null;
			    max = null;
			    var version_IN;
			    if (pokeVersion == 25 || pokeVersion == 26) {
			        version_IN = (pokeVersion%25)+7;
			    }
			    else
			    {
			        version_IN = pokeVersion;
			    }
			    firebase.database().ref("encounters/"+ a_in + "/"+version_IN+","+ m_in).once("value").then(postFirebase);
			    function postFirebase(snapshot){
			        var snaparray = [];
			        if (snapshot.numChildren() > 0) {
			            snapshot.forEach(function (snap_child) {
			                snaparray.push(snap_child.val())
			                if (snaparray.length == snapshot.numChildren())
			                {
			                    pokemonOnRoute(snaparray,handlePokemon);
			                }
			            })
			        }
			        else
			        {
			            if (pokeVersion == 10 || pokeVersion == 11) {
			                console.log("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in)
			                firebase.database().ref("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in).once("value").then(function (snaptwo) {
			                    var snaparray = [];
			                    if (snaptwo.numChildren() > 0) {
			                        snaptwo.forEach(function (snap_child) {
			                            snaparray.push(snap_child.val())
			                            if (snaparray.length == snaptwo.numChildren()) {
			                                pokemonOnRoute(snaparray, handlePokemon)
			                            }
			                        })
			                    }
			                    else
			                    {
			                        alert("We're sorry, we don't detect any wild pokemon in this area!")
			                    }
			                })
			            }
			            else
			            {
			                alert("We're sorry, we don't detect any wild pokemon in this area!")
			            }
			        }
			    }
			}

			function pokemonOnRoute(possiblePokemonEncounters,callback_in) {
			    if (possiblePokemonEncounters.length == 0){
			        alert("We're sorry, we don't detect any wild pokemon in this area!");
			        return;
			    }
			    pokemonSERIES = [];
			    levelsINDEX = [];
			    var colorArray = colorOptions.slice();
			    for (var p = 0; p < possiblePokemonEncounters.length; p ++) {
			        if (p == possiblePokemonEncounters.length-1)
			        {
			            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
			        }
			        else
			        {
			            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
			        }
			    }
			}

			function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
			    console.log(pokemon_id)
			    var rand = Math.floor(Math.random() * (colorArray.length-1));
			    colorArray.splice(rand,1);
			    if ((min == null) || pokemon.min_level < min) {
			        min = pokemon.min_level;
			    }
			    if ((max == null) || pokemon.max_level > max) {
			        max = pokemon.max_level;
			    }

			    console.log(pokemon_name+ " at rarity "+parseInt(pokemon.rarity));
			    pokemonSERIES.push([pokemon_name,parseInt(pokemon.rarity), parseInt(pokemon.min_level),  parseInt(pokemon.max_level),  "rgb(" + colorArray[rand].join(",")+")",pokemon_id]);
			    if (boolval)
			    {
			        outputPokeJSON(updateChart)
			    }
			}

			function outputPokeJSON(callback) {
			    pokeJSON = [];
			    var levelsTEMP = [];
			    for (var i = min; i <= max; i++){
			        levelsINDEX.push(i);
			        levelsTEMP.push(null);
			    }
			    var JSONStorage = [];
			    var count = 0;

			    for (var p = pokemonSERIES.length - 1; p >= 0; p-- ){
			        count++
			        var text = pokemonSERIES[p][0] + "(ID: "+ pokemonSERIES[p][5] +")";
			        var index = -1;
			        for (var r = 0; r < JSONStorage.length; r++)
			        {
			            if (text == JSONStorage[r][0])
			            {
			                index = r;
			                break;
			            }
			        }
			        if (index != -1)
			        {
			            for(i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
			                if (JSONStorage[r][1][i - min] != null)
			                {
			                    JSONStorage[r][1][i - min] += pokemonSERIES[p][1];
			                }
			                else
			                {
			                    JSONStorage[r][1][i - min] = pokemonSERIES[p][1];
			                }
			            }
			        }
			        else
			        {
			            var methodCatch = levelsTEMP.slice();
			            for (i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
			                methodCatch[i - min] = pokemonSERIES[p][1];
			            }
			            count++;
			            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4]]);
			        }
			        if (p == 0)
			        {
			            JSONStorage.forEach(function (storedEncounter) {
			                pokeJSON.push({
			                    text: storedEncounter[0],
			                    values: storedEncounter[1],
			                    legendItem: {
			                        order: storedEncounter[2]
			                    },
			                    backgroundColor: storedEncounter[3]
			                })
			            });
			            // document.getElementById("loading").style.visibility = "hidden";
			            callback()
			        }
			    }

			}

			function updateChart() {
			    zingchart.exec('CHARTDIV', 'setseriesdata', {
			        data : pokeJSON
			    });
			    zingchart.exec('CHARTDIV', 'modify', {
			        data : {
			            "title": {
			                "text": "Likelyhood of Encountering Pokemon in " + selected_areaName + " with method " + method_names[selected_method-1]
			            },
			            "scale-x": {
			                "values": levelsINDEX
			            },
			            "scale-y": {}
			        }
			    });
			}

			function infoAboutSelectedPokemon(pokename,id_in) {
			    var poke_id = parseInt(id_in);
			    document.getElementById("pokemon_header_types").innerHTML = pokename.charAt(0).toUpperCase() + pokename.slice(1);
			    accessDatabaseCHILD(firebase.database().ref("pokemon-stats"), "pokemon_id", poke_id, function (pokemon_stats) {
			        var stats_name_obj = [];
			        var stats_value_obj = [];
			        var effort_obj = [];
			        for (var q = 0; q < pokemon_stats.length;q++) {
			            stats_name_obj.push(pokemon_stats[q].stat_id);
			            stats_value_obj.push(pokemon_stats[q].base_stat);
			            effort_obj.push(pokemon_stats[q].effort);
			            if (q == pokemon_stats.length-1) {
			                render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                document.getElementById("nature").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("HP").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("attack").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("defense").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("s_attack").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("s_defense").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                document.getElementById("speed").onchange = function () {
			                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
			                }
			                render_Radar(pokename,id_in, stats_name_obj, stats_value_obj);
			                accessDatabaseCHILD(firebase.database().ref("pokemon-types"), "pokemon_id", poke_id, function (pokemon_types) {
			                    if (pokemon_types.length == 2)
			                    {
			                        var type1 = types[pokemon_types[0].type_id].identifier;
			                        var type2 = types[pokemon_types[1].type_id].identifier;
			                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type1 + " ><p>"+type1.charAt(0).toUpperCase() + type1.slice(1)+"</p></div>";
			                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type2 + " ><p>"+type2.charAt(0).toUpperCase() + type2.slice(1)+"</p></div>";
			                        typeEffectivity([pokemon_types[0].type_id,pokemon_types[1].type_id], type1.charAt(0).toUpperCase() + type1.slice(1)+" "+type2.charAt(0).toUpperCase() + type2.slice(1))
			                    }
			                    else
			                    {
			                        var type = types[pokemon_types[0].type_id].identifier;
			                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type + " ><p>"+type.charAt(0).toUpperCase() + type.slice(1)+"</p></div>";
			                        typeEffectivity([pokemon_types[0].type_id],type.charAt(0).toUpperCase() + type.slice(1))
			                    }
			                },1);
			            }
			        }
			    },1);
			}

			function render_Radar(pokename,id_in, stats_name, stats_value){
			    var max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
			    var radar_series = []
			    var null_array = [null,null,null,null,null,null,null,null].slice(0,stats_value.length);
			    for (var t = 0; t < stats_value.length; t++)
			    {
			        var values_array = null_array.slice();
			        values_array[t]  = stats_value[t];
			        var names_array = null_array.slice();
			        names_array[t]  = stats[stats_name[t]].text;
			        radar_series.push({
			            "values" : values_array,
			            "data-band": names_array,
			            "target" : "_blank",
			            "background-color":stats[stats_name[t]].color,
			            "tooltip": {
			                "text":"%data-band: %v",
			                "background-color":stats[stats_name[t]].color,
			                "color":"#FFF",
			                "font-size":"14px"
			            },
			            "text":stats[stats_name[1]].text
			            })
			        if (t == stats_value.length - 1)
			        {

			            var myRadar = {
			                "globals": {
			                    "font-family": 'Exo 2, sans-serif',
			                    "shadow":false
			                },
			                "title" : {
			                    visible:true,
			                    "font-color": "#fff",
			                    "font-family": 'Exo 2, sans-serif',
			                    "text" : "Base Stats for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
			                    "background-color":"transparent",
			                    "font-size":"15",
			                    height:"10%",
			                    textAlign:"center"
			                },
			                type: "radar",
			                backgroundColor: "transparent",
			                scale:{
			                    sizeFactor: "100%"
			                },
			                plot: {
			                    "background-color":"#fff",
			                    aspect:"rose",
			                    "animation": {
			                        "effect":"ANIMATION_EXPAND_TOP",
			                        "sequence":"ANIMATION_BY_PLOT_AND_NODE",
			                        "speed":10
			                    },
			                    "stacked": true //To create a stacked radar chart.
			                },
			                "scale-k":{
			                    "aspect":"circle",
			                    "visible":false
			                },
			                // "legend": {
			                //     "layout":"6x1",
			                //     "toggle-action": "none",
			                //     "border-width": 0,
			                //     "border-color": "none",
			                //     backgroundColor: "#116381",
			                //     "border-radius":"5vmin",
			                //     x: "70%",
			                //     y: "0%",
			                //     height:"90%",
			                //     "item": {
			                //         "font-color": "#fff",
			                //         "font-family": 'Exo 2, sans-serif',
			                //         "font-size": "15px",
			                //         "font-weight": "600",
			                //     },
			                //
			                // },
			                "scale-v":{
			                    "values": "0:"+ max_Val +":25",
			                    "guide": {
			                        "line-width":1,
			                        "line-style":"FFF",
			                        "line-color":"#FFF"
			                    },
			                    "item": {
			                        "color":"#FFF"
			                    },
			                    "line-color":"#FFF",
			                    alpha:0.6
			                },
			                plotarea:{
			                    height:"100%",
			                },
			                "series" : radar_series
			            };

			            zingchart.render({
			                id : 'radar',
			                data : myRadar,
			            });
			            document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
			            document.getElementById("radar").style.visibility = "visible";
			        }
			    }
			}

			function typeEffectivity(types_in, typename) {

			    var effectivity = [
			        [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
			        [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
			        [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
			        [1,1,1,0.5,0.5,0.5,1,0.5,0.5,1,1,2,1,1,1,1,1,2],
			        [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
			        [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
			        [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
			        [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
			        [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
			        [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
			        [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
			        [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
			        [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
			        [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
			        [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
			        [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
			        [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
			        [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1]
			    ];
			    var this_pokemon_index_array = [];
			    types_in.forEach(function (type) {
			        console.log(type)
			        console.log(types)
			        this_pokemon_index_array.push(parseInt(type));
			    })
			    function calculateEffectivity(attack_index_array, defense_index_array)
			    {
			        var effectivity_value = effectivity[attack_index_array[0]][defense_index_array[0]];
			        if (defense_index_array.length == 2) {
			            effectivity_value = effectivity_value*effectivity[attack_index_array[0]][defense_index_array[1]];
			        }
			        else if (attack_index_array.length == 2) {
			            effectivity_value = effectivity_value*effectivity[attack_index_array[1]][defense_index_array[0]];
			        }
			        if (effectivity_value == 0)
			        {
			            effectivity_value = 1
			        }
			        return effectivity_value;
			    }
			    var val_array = [
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([0],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([1],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([2],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([3],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([4],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([5],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([6],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([7],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([8],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([9],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([10],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([11],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([12],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([13],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([14],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([15],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([16],this_pokemon_index_array)],
			        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([17],this_pokemon_index_array)],
			        [calculateEffectivity(this_pokemon_index_array,[0]),
			        calculateEffectivity(this_pokemon_index_array,[1]),
			        calculateEffectivity(this_pokemon_index_array,[2]),
			        calculateEffectivity(this_pokemon_index_array,[3]),
			        calculateEffectivity(this_pokemon_index_array,[4]),
			        calculateEffectivity(this_pokemon_index_array,[5]),
			        calculateEffectivity(this_pokemon_index_array,[6]),
			        calculateEffectivity(this_pokemon_index_array,[7]),
			        calculateEffectivity(this_pokemon_index_array,[8]),
			        calculateEffectivity(this_pokemon_index_array,[9]),
			        calculateEffectivity(this_pokemon_index_array,[10]),
			        calculateEffectivity(this_pokemon_index_array,[11]),
			        calculateEffectivity(this_pokemon_index_array,[12]),
			        calculateEffectivity(this_pokemon_index_array,[13]),
			        calculateEffectivity(this_pokemon_index_array,[14]),
			        calculateEffectivity(this_pokemon_index_array,[15]),
			        calculateEffectivity(this_pokemon_index_array,[16]),
			        calculateEffectivity(this_pokemon_index_array,[17]),
			        calculateEffectivity(this_pokemon_index_array,this_pokemon_index_array)]
			    ]

			    var myChord = {
			        "title" : {
			            visible:true,
			            "font-color": "#fff",
			            "font-family": 'Exo 2, sans-serif',
			            "text" : "Type Effectiveness",
			            "background-color":"transparent",
			            "font-size":"15",
			            height:"10%",
			            y:"-5%",
			            textAlign:"center"
			        },
			        "type": "chord",
			        "background-color": "transparent",
			        // "legend": {
			        //     "layout":"10x2",
			        //     "toggle-action": "none",
			        //     "border-width": 0,
			        //     "border-color": "none",
			        //     backgroundColor: "#116381",
			        //     "border-radius":"5vmin",
			        //     x: "70%",
			        //     y: "0%",
			        //     height:"85%",
			        //     "item": {
			        //         "font-color": "#fff",
			        //         "font-family": 'Exo 2, sans-serif',
			        //         "font-size": "15px",
			        //         "font-weight": "600",
			        //     },
			        // },
			        y:"5%",
			        "options": {
			            radius:"90%",
			            "band-space": 0,
			            "shadow": 0,
			            "border": "none",
			            "color-type":"palette",
			            "style":{
			                offsetY:"10%",
			                "chord":{
			                    "border-color":"none"
			                },
			                "tick":{
			                    visible: false
			                },
			                "item":{
			                    visible: false
			                },
			                "label": {
			                    visible: false
			                },
			                "tooltip":{
			                    "text-chord":"%text-source attacks %text-destination with effectivity  of x%value-source, <br>%text-destination attacks %text-source with effectivity of x%value-destination",
			                    "text":"Self-chord of item %text with value %value"
			                }
			            },
			            "palette":["#A8A878",
			                "#F08030",
			                "#6890F0",
			                "#F8D030",
			                "#78C850",
			                "#98D8D8",
			                "#C03028",
			                "#A040A0",
			                "#E0C068",
			                "#A890F0",
			                "#F85888",
			                "#A8B820",
			                "#B8A038",
			                "#705898",
			                "#7038F8",
			                "#705848",
			                "#B8B8D0",
			                "#EE99AC",
			                "#FFF"]
			        },
			        "series":[{
			            text:"Normal",
			            "values": val_array[0],
			            "style": {
			                "band": {
			                    "background-color": "#C6C6A7",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Fire",
			            "values": val_array[1],
			            "style": {
			                "band": {
			                    "background-color": "#9C531F",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Water",
			            "values": val_array[2],
			            "style": {
			                "band": {
			                    "background-color": "#445E9C",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Electric",
			            "values":val_array[3],
			            "style": {
			                "band": {
			                    "background-color": "#A1871F",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Grass",
			            "values":val_array[4],
			            "style": {
			                "band": {
			                    "background-color": "#4E8234",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Ice",
			            "values":val_array[5],
			            "style": {
			                "band": {
			                    "background-color": "#638D8D",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Fighting",
			            "values":val_array[6],
			            "style": {
			                "band": {
			                    "background-color": "#7D1F1A",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Poison",
			            "values":val_array[7],
			            "style": {
			                "band": {
			                    "background-color": "#682A68",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Ground",
			            "values":val_array[8],
			            "style": {
			                "band": {
			                    "background-color": "#927D44",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Flying",
			            "values": val_array[9],
			            "style": {
			                "band": {
			                    "background-color": "#6D5E9C",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Psychic",
			            "values": val_array[10],
			            "style": {
			                "band": {
			                    "background-color": "#A13959",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Bug",
			            "values": val_array[11],
			            "style": {
			                "band": {
			                    "background-color": "#6D7815",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Rock",
			            "values": val_array[12],
			            "style": {
			                "band": {
			                    "background-color": "#786824",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Ghost",
			            "values": val_array[13],
			            "style": {
			                "band": {
			                    "background-color": "#493963",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Dragon",
			            "values": val_array[14],
			            "style": {
			                "band": {
			                    "background-color": "#4924A1",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Dark",
			            "values": val_array[15],
			            "style": {
			                "band": {
			                    "background-color": "#49392F",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Steel",
			            "values": val_array[16],
			            "style": {
			                "band": {
			                    "background-color": "#787887",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:"Fairy",
			            "values": val_array[17],
			            "style": {
			                "band": {
			                    "background-color": "#9B6470",
			                    "alpha": 1
			                },
			            },
			        },{
			            text:typename,
			            "values": val_array[18],
			            "style": {
			                "band": {
			                    "background-color": "#FFF",
			                    "alpha": 1
			                },
			            },
			        }]
			    };
			    zingchart.render({
			        id : 'chord',
			        data : myChord,
			    });
			}

			function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
			    var nature_str=document.getElementById("nature").value.split(",");
			    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
			    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
			    console.log(stats_name)
			    console.log(nature)
			    var levels=[10,20,30,40,50,60,70,80,90,100];
			    var statsFinal = [];
			    var k;
			    for (var i = 0; i < stats_name.length; i++)
			    {
			        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			        if (stats_name[i] == "1")
			        {
			            for (k=0; k < 10; k++)
			            {
			                temp[k]= Math.floor((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+levels[k]+10;
			                if (k == 9)
			                {
			                    statsFinal.push(temp)
			                }
			            }
			        }
			        else
			        {
			            for (k=0; k < 10; k++)
			            {
			                if (stats_name[i] == parseInt(nature[0]))
			                {
			                    console.log(stats_name[i])
			                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*1.1);
			                    if (k == 9)
			                    {
			                        statsFinal.push(temp)
			                    }
			                }
			                else if (stats_name[i] == parseInt(nature[1]))
			                {
			                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*0.9);
			                    if (k == 9)
			                    {
			                        statsFinal.push(temp)
			                    }
			                }
			                else
			                {
			                    temp[k]= Math.floor(((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5);
			                    if (k == 9)
			                    {
			                        statsFinal.push(temp)
			                    }
			                }
			            }
			        }
			    }
			    var stats_graph_progress = [];
			    for (var p = 0; p < statsFinal.length; p++)
			    {
			        stats_graph_progress.push({
			            text: stats[stats_name[p]].text,
			            values: statsFinal[p],
			            backgroundColor: stats[stats_name[p]].color,
			            lineColor: stats[stats_name[p]].color,
			            marker:{
			                backgroundColor: stats[stats_name[p]].color,
			                borderColor: stats[stats_name[p]].color

			            },
			            "tooltip": {
			                "text": "%t at level %kt: %vt"
			            }
			        });
			    }
			    var statsProgression = {
			        "background-color": "transparent",
			        "title" : {
			            visible:true,
			            "font-color": "#fff",
			            "font-family": 'Exo 2, sans-serif',
			            "text" : "Stats Progression for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
			            "background-color":"transparent",
			            "font-size":"15",
			            height:"14.2857143%",
			            textAlign:"center"
			        },
			        "scale-x": {
			            "values": [],
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
			                "font-size":"12.5",
			                "font-color": "#fff",
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
			                "text": "Stat Value",
			                "font-family": 'Exo 2, sans-serif',
			                "font-weight": "normal",
			                "font-size":"12.5",
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
			        type: "area",
			        stacked: true,
			        height: "100%",
			        width: "100%",
			        plot:{
			            alphaArea: 0.6,
			            "animation": {
			                "delay": 0,
			                "effect": 1,
			                "speed": 1000,
			                "method": 0,
			                "sequence": 1
			            }
			        },
			        series : stats_graph_progress,
			    };
			    zingchart.render({
			        id : 'stats_progression',
			        data : statsProgression,
			    });
			}

			function accessDatabaseCHILD(ref_in,str,val_comp,callbackfunction,pass) {
			    ref_in.orderByChild(str).equalTo(val_comp).once("value").then(function(snapshot) {
			        var temp_database_array = [];
			        console.log(str+": "+snapshot.numChildren())
			        snapshot.forEach(function (snap_child) {
			            temp_database_array.push(snap_child.val());
			            if (temp_database_array.length == snapshot.numChildren())
			            {
			                if (pass) {
			                    callbackfunction(temp_database_array);
			                }
			                else
			                {
			                    callbackfunction();
			                }
			            }
			        })
			    });
			}


		/***/ },
		/* 3 */
		/***/ function(module, exports) {

			
			module.exports = function () {
			  return [
			  {
			    "name": "red-blue",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/1/",
			        "name": "red"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/2/",
			        "name": "blue"
			      }
			    ]
			  },
			  {
			    "name": "yellow",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/3/",
			        "name": "yellow"
			      }
			    ],
			  },
			  {
			    "name": "gold-silver",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/4/",
			        "name": "gold"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/5/",
			        "name": "silver"
			      }
			    ]
			  },
			  {
			    "name": "crystal",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/6/",
			        "name": "crystal"
			      }
			    ]
			  },
			  {
			    "name": "ruby-sapphire",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/7/",
			        "name": "ruby"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/8/",
			        "name": "sapphire"
			      }
			    ]
			  },
			  {
			    "name": "emerald",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/9/",
			        "name": "emerald"
			      }
			    ]
			  },
			  {
			    "name": "firered-leafgreen",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/10/",
			        "name": "firered"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/11/",
			        "name": "leafgreen"
			      }
			    ]
			  },
			  {
			    "name": "diamond-pearl",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/12/",
			        "name": "diamond"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/13/",
			        "name": "pearl"
			      }
			    ]
			  },
			  {
			    "name": "platinum",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/14/",
			        "name": "platinum"
			      }
			    ]
			  },
			  {
			    "name": "heartgold-soulsilver",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/15/",
			        "name": "heartgold"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/16/",
			        "name": "soulsilver"
			      }
			    ]
			  },
			  {
			    "name": "black-white",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/17/",
			        "name": "black"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/18/",
			        "name": "white"
			      }
			    ]
			  },
			  {
			    "name": "colosseum",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/19/",
			        "name": "colosseum"
			      }
			    ]
			  },
			  {
			    "name": "xd",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/20/",
			        "name": "xd"
			      }
			    ]
			  },
			  {
			    "name": "black-2-white-2",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/21/",
			        "name": "black-2"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/22/",
			        "name": "white-2"
			      }
			    ]
			  },
			  {
			    "name": "x-y",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/23/",
			        "name": "x"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/24/",
			        "name": "y"
			      }
			    ]
			  },
			  {
			    "name": "omega-ruby-alpha-sapphire",
			    "versions": [
			      {
			        "url": "http://pokeapi.co/api/v2/version/25/",
			        "name": "omega-ruby"
			      },
			      {
			        "url": "http://pokeapi.co/api/v2/version/26/",
			        "name": "alpha-sapphire"
			      }
			    ]
			  }
			]};

		/***/ },
		/* 4 */
		/***/ function(module, exports) {

			/**
			 * Created by tmartin on 7/8/16.
			 */

			module.exports = {
			    mkshape:makeShape,
			};




			function pathToPolygon(array) {
			    var pointsArray = [];
			    var currentLetter = "";
			    var position = 0;
			    var pointCount = 0; //CURVE
			    var curvePoints = [];
			    var coordinateCount = 0; //CURVE
			    var coordinateArray = []; //CURVE
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
			                    coordinateArray.push(parseFloat(value));
			                    coordinateCount++;
			                    if (coordinateCount == 6){
			                        coordinateArray.push(1);
			                        coordinateCount = 0;
			                        pointsArray.push(coordinateArray);
			                        coordinateArray = [];

			                    }
			                    // if (position == 0) {
			                    //     if (pointCount == 0)
			                    //     {
			                    //         curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
			                    //     }
			                    //     curvePoints.push([parseFloat(value)]);
			                    //     position = 1;
			                    // }
			                    // else {
			                    //     curvePoints[curvePoints.length-1].push(parseFloat(value));
			                    //     pointCount++;
			                    //     position = 0;
			                    //     if (pointCount == 3)
			                    //     {
			                    //         var vals = bezier(curvePoints);
			                    //         var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
			                    //         for (var t = 0; t < distance;t++) {
			                    //             pointsArray.push(vals(t/distance));
			                    //         }
			                    //         curvePoints = [];
			                    //         pointCount = 0;
			                    //     }
			                    // }
			                    //
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
			    var coordinateCount = 0; //CURVE
			    var coordinateArray = []; //CURVE
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
			                    coordinateArray.push(parseFloat(value));
			                    coordinateCount++;
			                    if (coordinateCount == 6){
			                        coordinateArray.push(1);
			                        coordinateCount = 0;
			                        pointsArray.push(coordinateArray);
			                        coordinateArray = [];

			                    }
			                    else {
			                        coordinateCount++;
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
			    if (path.getAttribute("class") == "ROUTE") {
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
			                },
			                zIndex:2,
			                cursor: "pointer"
			            };
			        }
			    }
			    else if (path.getAttribute("class") == "LAND") {
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
			                "shadow-angle":0,
			                "shadow-blur":"3px",
			                "shadow-color": "#082f3d",
			                "shadow-alpha": 1,
			                flat: true
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
			            zIndex:1
			        };
			    }
			    else if (path.getAttribute("class") == "LANDMARK") {
			         circleR = path.getAttribute("r").trim();
			         circleX = path.getAttribute("cx").trim();
			         circleY = path.getAttribute("cy").trim();
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
			            "hover-state": {
			                "borderColor": "#FFD700",
			                "backgroundColor": "#FFD700",
			            },
			            zIndex:1,
			            cursor: "pointer"
			        };
			    }
			}

		/***/ },
		/* 5 */
		/***/ function(module, exports) {

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

				__webpack_require__(1);
				__webpack_require__(1);
				module.exports = __webpack_require__(5);


			/***/ },
			/* 1 */
			/***/ function(module, exports, __webpack_require__) {

				var pokescript = __webpack_require__(2);
				var svgToZing = __webpack_require__(4);
				var SVGSTRING;

				window.addEventListener("load", beginApp);
				function beginApp() {
				    document.getElementById('select_Region').addEventListener("change", function () {
				        document.getElementById("loading").visibility = "visible";
				        var location = new XMLHttpRequest();
				        var url = '/region_maps/' + document.getElementById('select_Region').value + '.svg';
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

			/***/ },
			/* 2 */
			/***/ function(module, exports, __webpack_require__) {

				/**
				 * Created by tmartin on 7/12/16.
				 */
				var versions = __webpack_require__(3);
				var pokeVersion;
				var pokeVersionArray = [];
				var min = null;
				var max = null;
				var pokemonSERIES = [];
				var pokeJSON = [];
				var levelsINDEX = [];
				var methodIndex = [];
				var locationName = "";
				var selected_areaName = "";
				var selected_areaID;
				var selected_method;
				var responseArray = [];
				var svg_stored;
				var shapes_stored;
				var region_stored;
				var selectedShapeID = null;
				var regions = {
				    "1": {
				        "name": "Kanto"
				    },
				    "2": {
				        "name": "Johto"
				    },
				    "3": {
				        "name": "Hoenn"
				    },
				    "4": {
				        "name": "Sinnoh"
				    },
				    "5": {
				        "name": "Unova"
				    },
				    "6": {
				        "name": "Kalos"
				    }
				};
				var stats = {
				    "1": {
				        text:'HP',
				        color: '#b20000'
				    },
				    "2": {
				        text:'Attack',
				        color: '#d8732b'
				    },
				    "3": {
				        text:'Defense',
				        color: '#dfbb2b'
				    },
				    "4": {
				        text:'S. Attack',
				        color: '#6890F0'
				    },
				    "5": {
				        text:'S. Defense',
				        color: '#78C850'
				    },
				    "6": {
				        text:'Speed',
				        color: '#F85888'
				    },
				    "7": {
				        text:'Accuracy',
				        color: '#1A8B55'
				    },
				    "8": {
				        text:'Evasion',
				        color: '#47A0A2'
				    }
				}
				var types = {
				        "1": {
				            "identifier": "normal",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "2": {
				            "identifier": "fighting",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "3": {
				            "identifier": "flying",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "4": {
				            "identifier": "poison",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "5": {
				            "identifier": "ground",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "6": {
				            "identifier": "rock",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "7": {
				            "identifier": "bug",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "8": {
				            "identifier": "ghost",
				            "generation_id": 1,
				            "damage_class_id": 2
				        },
				        "9": {
				            "identifier": "steel",
				            "generation_id": 2,
				            "damage_class_id": 2
				        },
				        "10": {
				            "identifier": "fire",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "11": {
				            "identifier": "water",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "12": {
				            "identifier": "grass",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "13": {
				            "identifier": "electric",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "14": {
				            "identifier": "psychic",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "15": {
				            "identifier": "ice",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "16": {
				            "identifier": "dragon",
				            "generation_id": 1,
				            "damage_class_id": 3
				        },
				        "17": {
				            "identifier": "dark",
				            "generation_id": 2,
				            "damage_class_id": 3
				        },
				        "18": {
				            "identifier": "fairy",
				            "generation_id": 6,
				            "damage_class_id": ""
				        },
				        "10001": {
				            "identifier": "unknown",
				            "generation_id": 2,
				            "damage_class_id": ""
				        },
				        "10002": {
				            "identifier": "shadow",
				            "generation_id": 3,
				            "damage_class_id": ""
				        }
				    }
				var method_names = ["walk", "old-rod","good-rod","super-rod","surf","rock-smash","headbutt","dark-grass","grass-spots","cave-spots","bridge-spots","super-rod-spots","surf-spots","yellow-flowers","purple-flowers","red-flowers","rough-terrain"]
				var pokedex = []
				var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134],[255,183,183],[255,234,183],[255,255,183],[234,255,183],[183,255,183],[183,255,234],[183,255,255],[183,234,255],[183,183,255],[234,183,255],[255,183,255],[255,183,234],[185,113,113],[185,134,113],[185,185,113],[134,185,113],[113,185,113],[113,185,134],[113,185,185],[113,134,185],[113,113,185],[134,113,185],[185,113,185],[185,113,134]];
				var prevMultiple = 1;

				module.exports = {
				    createDropDown:initialFunction
				};

				function initialFunction(region,render_obj) {
				    selectedShapeID = null;
				    document.getElementById("select_Method").options.length = 0;
				    var tempOptionMethod = document.createElement("option");
				    tempOptionMethod.text = "Select Method";
				    tempOptionMethod.selected = true;
				    tempOptionMethod.disabled = true;
				    document.getElementById("select_Method").add(tempOptionMethod)
				    document.getElementById("select_Location_Area").options.length = 0;
				    var tempOptionArea = document.createElement("option");
				    tempOptionArea.text = "Select Area";
				    tempOptionArea.selected = true;
				    tempOptionArea.disabled = true;
				    document.getElementById("select_Location_Area").add(tempOptionArea)
				    document.getElementById("select_Version").options.length = 0;
				    var tempOptionVersion = document.createElement("option");
				    tempOptionVersion.text = "Select Version";
				    tempOptionVersion.selected = true;
				    tempOptionVersion.disabled = true;
				    document.getElementById("select_Version").add(tempOptionVersion)
				    svg_stored = render_obj[0];
				    shapes_stored = render_obj[1];
				    region_stored = parseInt(region);
				    prevMultiple = 1;
				    createPokedex();
				    renderShape();
				}

				function createPokedex() {
				    firebase.database().ref("pokemon").orderByKey().once("value").then(function(snapshot) {
				        snapshot.forEach(function (snap_child) {
				            pokedex.push(snap_child.val());
				        })
				    });
				}

				function renderShape() {
				    setHeightWidth()
				    zingchart.render({
				        id: "SHAPESDIV",
				        width: "100%",
				        height: "100%",
				        margins: 0,
				        backgroundColor: "transparent",
				        data: {
				            backgroundColor: "transparent",
				            "shapes": shapes_stored
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
				                    "alpha": 0.6,
				                    cursor: "pointer"
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
				                    "effect": 1,
				                    "speed": 1000,
				                    "method": 0,
				                    "sequence": 1
				                }
				            },
				            "scale-x": {
				                "values": [],
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
				                "text": "Chance of encountering a level %k %t: %v%",
				                "font-family": 'Exo 2, sans-serif',
				                "font-size": "15px",
				                "font-weight": "normal",
				                "font-color": "#fff",
				                "decimals": 2,
				                "text-align": "left",
				                "border-radius": "8px",
				                "padding": "10px 10px",
				                "background-color": "#0B4153",
				                "alpha": 0.95,
				                "shadow": 0,
				                "border-width": 0,
				                "border-color": "none"
				            },
				            "series": pokeJSON
				        }
				    });
				    zingchart.shape_click = function(p) {
				        if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
				            console.log(p.shapeid)
				            if (selectedShapeID != null)
				            {
				                zingchart.exec('SHAPESDIV', 'updateobject', {
				                    'type':'shape',
				                    'data' : {
				                        'id' : selectedShapeID,
				                        'line-color' : 'black',
				                        'border-color' : 'black',
				                        'background-color': 'black',
				                        zIndex : 2
				                    }
				                });
				            }
				            selectedShapeID = p.shapeid;
				            zingchart.exec('SHAPESDIV', 'updateobject', {
				                'type':'shape',
				                'data' : {
				                    'id' : selectedShapeID,
				                    'line-color' : '#b81c19',
				                    zIndex : 3
				                }
				            });
				            // document.getElementById("loading").style.visibility = "visible";
				            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
				        }
				        else if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "LANDMARK"){
				            console.log(p.shapeid)
				            if (selectedShapeID != null)
				            {
				                zingchart.exec('SHAPESDIV', 'updateobject', {
				                    'type':'shape',
				                    'data' : {
				                        'id' : selectedShapeID,
				                        'border-color' : 'black',
				                        'background-color': 'black',
				                        'line-color' : 'black',
				                        zIndex : 1
				                    }
				                });
				            }
				            selectedShapeID = p.shapeid;
				            zingchart.exec('SHAPESDIV', 'updateobject', {
				                'type':'shape',
				                'data' : {
				                    'id' : selectedShapeID,
				                    'border-color' : '#b81c19',
				                    'background-color': '#b81c19',
				                    zIndex : 3
				                }
				            });
				            // document.getElementById("loading").style.visibility = "visible";
				            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
				        }
				    };
				    zingchart.legend_item_click = function(p) {
				        // document.getElementById("loading").style.visibility = "visible";
				        document.getElementById("pokemon_image").src = "UI_images/holder.png";
				        document.getElementById("radar").style.visibility = "hidden";
				        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
				        infoAboutSelectedPokemon(pokeText.slice(0,pokeText.indexOf('(')),pokeText.slice(pokeText.indexOf('(ID: ')+5,pokeText.indexOf(')')));
				    };
				    // document.getElementById("loading").style.visibility = "hidden";
				    window.onresize = function(){
				        setHeightWidth();
				        zingchart.exec('SHAPESDIV', 'setdata', {
				            data : {
				                backgroundColor: "transparent",
				                shapes : shapes_stored
				            }
				        });
				    };
				}

				function setHeightWidth(){
				    var multiple = (document.getElementById("SHAPESDIV").offsetHeight)/ 400;
				    shapes_stored.forEach(function(shape){
				        if (shape.type == "circle") {
				            shape.size *= multiple/prevMultiple;
				            shape.x *= multiple/prevMultiple;
				            shape.y *= multiple/prevMultiple;
				        }
				        else {
				            shape.points.forEach(function(point_array){
				                if (point_array != null)
				                {
				                    for (var pt = 0;point_array.length > pt; pt++)
				                    {
				                        point_array[pt] *= multiple/prevMultiple;
				                    }
				                }
				            })
				        }
				    });
				    prevMultiple = multiple
				}

				function beginRoute(inVal) {
				    methodIndex = [];
				    pokemonSERIES = [];
				    levelsINDEX = [];
				    pokeJSON = [];
				    locationName = "";
				    responseArray = [];
				    min = null;
				    max = null;
				    document.getElementById("select_Method").options.length = 0;
				    var tempOptionMethod = document.createElement("option");
				    tempOptionMethod.text = "Select Method";
				    tempOptionMethod.selected = true;
				    tempOptionMethod.disabled = true;
				    document.getElementById("select_Method").add(tempOptionMethod)
				    document.getElementById("select_Location_Area").options.length = 0;
				    var tempOptionArea = document.createElement("option");
				    tempOptionArea.text = "Select Area";
				    tempOptionArea.selected = true;
				    tempOptionArea.disabled = true;
				    document.getElementById("select_Location_Area").add(tempOptionArea)
				    document.getElementById("select_Version").options.length = 0;
				    var tempOptionVersion = document.createElement("option");
				    tempOptionVersion.text = "Select Version";
				    tempOptionVersion.selected = true;
				    tempOptionVersion.disabled = true;
				    document.getElementById("select_Version").add(tempOptionVersion)
				    pokeLocationFunction(inVal);
				}

				function formatLocationArea(name) {
				    function hyphenLowerToSpaceUpper(match) {
				        return ' ' + match.slice(1).toUpperCase();
				    }
				    return name.replace(/\-([a-z])|\-\d/g, hyphenLowerToSpaceUpper);
				}

				function pokeLocationFunction (inVal) {
				    firebase.database().ref("locations/"+inVal.toString()).once("value").then(function (locationName_accessed) {
				        getAllAreasInLocation(locationName_accessed.val()["identifier"],inVal)
				    });
				}

				function getAllAreasInLocation(location_in,location_id){
				    locationName = location_in;
				    accessDatabaseCHILD(firebase.database().ref("location-areas"), "location_id", location_id, function (areas) {
				        if (areas.length != 0){
				            document.getElementById("select_Location_Area").options.length = 0;
				            var tempOptionArea = document.createElement("option");
				            tempOptionArea.text = "Select Area";
				            tempOptionArea.selected = true;
				            tempOptionArea.disabled = true;
				            document.getElementById("select_Location_Area").add(tempOptionArea)
				            selectLocationArea(areas)
				        }
				        else
				        {
				            alert("We're sorry, we don't detect any wild pokemon in this area!")
				        }
				    },1)
				}

				function selectLocationArea(areas_in){
				    for (var i = 0; i < areas_in.length; i++){
				        var newoptions = document.createElement("option");
				        if (areas_in[i].identifier != "")
				        {
				            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1)) + " " + formatLocationArea(areas_in[i].identifier[0].toUpperCase() + areas_in[i].identifier.slice(1));
				        }
				        else
				        {
				            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1));
				        }
				        newoptions.value = areas_in[i].id;
				        document.getElementById("select_Location_Area").options.add(newoptions);
				        if (i == areas_in.length - 1)
				        {
				            document.getElementById("select_Location_Area").disabled = false;
				            document.getElementById("select_Location_Area").onchange = function () {
				                if (document.getElementById("select_Location_Area").value != "")
				                {
				                    document.getElementById("select_Method").options.length = 0;
				                    var tempOptionMethod = document.createElement("option");
				                    tempOptionMethod.text = "Select Method";
				                    tempOptionMethod.selected = true;
				                    tempOptionMethod.disabled = true;
				                    document.getElementById("select_Method").add(tempOptionMethod)
				                    document.getElementById("select_Version").options.length = 0;
				                    var tempOptionVersion = document.createElement("option");
				                    tempOptionVersion.text = "Select Version";
				                    tempOptionVersion.selected = true;
				                    tempOptionVersion.disabled = true;
				                    document.getElementById("select_Version").add(tempOptionVersion)
				                    setMethodOptions()
				                }
				            }
				        }
				    }
				}

				function setMethodOptions(){
				    selected_areaName = document.getElementById("select_Location_Area").options[document.getElementById("select_Location_Area").selectedIndex].text;
				    selected_areaID = document.getElementById("select_Location_Area").value;
				    console.log("location-area-methods/"+selected_areaID)
				    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
				        console.log("Methods available for area "+selected_areaID+" "+ snapMethods.numChildren());
				        snapMethods.val().forEach(function (method_indiv) {
				            console.log(method_indiv)
				            var newoptions = document.createElement("option");
				            newoptions.text = method_names[method_indiv-1];
				            newoptions.value = method_indiv;
				            document.getElementById("select_Method").options.add(newoptions);
				            if (snapMethods.numChildren() == document.getElementById("select_Method").options.length-1)
				            {
				                document.getElementById("select_Method").disabled = false;
				                document.getElementById("select_Method").onchange = function () {
				                    if (document.getElementById("select_Method").value != "")
				                    {
				                        document.getElementById("select_Version").options.length = 0;
				                        var tempOptionVersion = document.createElement("option");
				                        tempOptionVersion.text = "Select Version";
				                        tempOptionVersion.selected = true;
				                        tempOptionVersion.disabled = true;
				                        document.getElementById("select_Version").add(tempOptionVersion)
				                        selectRegion();
				                    }
				                }
				            }
				        })
				    });
				}

				function selectRegion() {
				    selected_method = document.getElementById("select_Method").value;
				    var tempcount = 0;
				    var gameSelect = document.getElementById("select_Version");
				    console.log(region_stored)
				    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
				        console.log(version_groups);
				        for (var group = 0; group < version_groups.length; group++)
				        {
				            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
				                console.log(versions_in_group);
				                for (var individual = 0; individual < versions_in_group.length; individual++) {
				                    var temp = versions_in_group[individual];
				                    pokeVersionArray.push(temp);
				                    var newoptions = document.createElement("option");
				                    newoptions.text = "";
				                    var holdName = [];
				                    temp.identifier.split("-").forEach(function (val) {
				                        holdName.push(val.charAt(0).toUpperCase() + val.slice(1));
				                    });
				                    newoptions.text = holdName.join(" ");
				                    newoptions.value = temp.id;
				                    gameSelect.options.add(newoptions);
				                    if (individual == versions_in_group.length - 1) {
				                        if (tempcount == version_groups.length - 1) {
				                            document.getElementById("select_Version").disabled = false;
				                        }
				                        else
				                        {
				                            tempcount++;
				                        }
				                    }
				                }
				            },1);
				        }
				    },1);
				    document.getElementById("select_Version").onchange = versionSelect;
				}

				function versionSelect() {
				    if (document.getElementById("select_Version").value != "Select Version")
				    {
				        pokeVersion = document.getElementById("select_Version").value;
				        getEncountersAtAreaGivenMethod(document.getElementById("select_Location_Area").value,document.getElementById("select_Method").value);
				    }
				}

				function getEncountersAtAreaGivenMethod(a_in, m_in) {
				    methodIndex = [];
				    pokemonSERIES = [];
				    levelsINDEX = [];
				    pokeJSON = [];
				    locationName = "";
				    responseArray = [];
				    min = null;
				    max = null;
				    var version_IN;
				    if (pokeVersion == 25 || pokeVersion == 26) {
				        version_IN = (pokeVersion%25)+7;
				    }
				    else
				    {
				        version_IN = pokeVersion;
				    }
				    firebase.database().ref("encounters/"+ a_in + "/"+version_IN+","+ m_in).once("value").then(postFirebase);
				    function postFirebase(snapshot){
				        var snaparray = [];
				        if (snapshot.numChildren() > 0) {
				            snapshot.forEach(function (snap_child) {
				                snaparray.push(snap_child.val())
				                if (snaparray.length == snapshot.numChildren())
				                {
				                    pokemonOnRoute(snaparray,handlePokemon);
				                }
				            })
				        }
				        else
				        {
				            if (pokeVersion == 10 || pokeVersion == 11) {
				                console.log("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in)
				                firebase.database().ref("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in).once("value").then(function (snaptwo) {
				                    var snaparray = [];
				                    if (snaptwo.numChildren() > 0) {
				                        snaptwo.forEach(function (snap_child) {
				                            snaparray.push(snap_child.val())
				                            if (snaparray.length == snaptwo.numChildren()) {
				                                pokemonOnRoute(snaparray, handlePokemon)
				                            }
				                        })
				                    }
				                    else
				                    {
				                        alert("We're sorry, we don't detect any wild pokemon in this area!")
				                    }
				                })
				            }
				            else
				            {
				                alert("We're sorry, we don't detect any wild pokemon in this area!")
				            }
				        }
				    }
				}

				function pokemonOnRoute(possiblePokemonEncounters,callback_in) {
				    if (possiblePokemonEncounters.length == 0){
				        alert("We're sorry, we don't detect any wild pokemon in this area!");
				        return;
				    }
				    pokemonSERIES = [];
				    levelsINDEX = [];
				    var colorArray = colorOptions.slice();
				    for (var p = 0; p < possiblePokemonEncounters.length; p ++) {
				        if (p == possiblePokemonEncounters.length-1)
				        {
				            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
				        }
				        else
				        {
				            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
				        }
				    }
				}

				function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
				    console.log(pokemon_id)
				    var rand = Math.floor(Math.random() * (colorArray.length-1));
				    colorArray.splice(rand,1);
				    if ((min == null) || pokemon.min_level < min) {
				        min = pokemon.min_level;
				    }
				    if ((max == null) || pokemon.max_level > max) {
				        max = pokemon.max_level;
				    }

				    console.log(pokemon_name+ " at rarity "+parseInt(pokemon.rarity));
				    pokemonSERIES.push([pokemon_name,parseInt(pokemon.rarity), parseInt(pokemon.min_level),  parseInt(pokemon.max_level),  "rgb(" + colorArray[rand].join(",")+")",pokemon_id]);
				    if (boolval)
				    {
				        outputPokeJSON(updateChart)
				    }
				}

				function outputPokeJSON(callback) {
				    pokeJSON = [];
				    var levelsTEMP = [];
				    for (var i = min; i <= max; i++){
				        levelsINDEX.push(i);
				        levelsTEMP.push(null);
				    }
				    var JSONStorage = [];
				    var count = 0;

				    for (var p = pokemonSERIES.length - 1; p >= 0; p-- ){
				        count++
				        var text = pokemonSERIES[p][0] + "(ID: "+ pokemonSERIES[p][5] +")";
				        var index = -1;
				        for (var r = 0; r < JSONStorage.length; r++)
				        {
				            if (text == JSONStorage[r][0])
				            {
				                index = r;
				                break;
				            }
				        }
				        if (index != -1)
				        {
				            for(i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
				                if (JSONStorage[r][1][i - min] != null)
				                {
				                    JSONStorage[r][1][i - min] += pokemonSERIES[p][1];
				                }
				                else
				                {
				                    JSONStorage[r][1][i - min] = pokemonSERIES[p][1];
				                }
				            }
				        }
				        else
				        {
				            var methodCatch = levelsTEMP.slice();
				            for (i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
				                methodCatch[i - min] = pokemonSERIES[p][1];
				            }
				            count++;
				            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4]]);
				        }
				        if (p == 0)
				        {
				            JSONStorage.forEach(function (storedEncounter) {
				                pokeJSON.push({
				                    text: storedEncounter[0],
				                    values: storedEncounter[1],
				                    legendItem: {
				                        order: storedEncounter[2]
				                    },
				                    backgroundColor: storedEncounter[3]
				                })
				            });
				            // document.getElementById("loading").style.visibility = "hidden";
				            callback()
				        }
				    }

				}

				function updateChart() {
				    zingchart.exec('CHARTDIV', 'setseriesdata', {
				        data : pokeJSON
				    });
				    zingchart.exec('CHARTDIV', 'modify', {
				        data : {
				            "title": {
				                "text": "Likelyhood of Encountering Pokemon in " + selected_areaName + " with method " + method_names[selected_method-1]
				            },
				            "scale-x": {
				                "values": levelsINDEX
				            },
				            "scale-y": {}
				        }
				    });
				}

				function infoAboutSelectedPokemon(pokename,id_in) {
				    var poke_id = parseInt(id_in);
				    document.getElementById("pokemon_header_types").innerHTML = pokename.charAt(0).toUpperCase() + pokename.slice(1);
				    accessDatabaseCHILD(firebase.database().ref("pokemon-stats"), "pokemon_id", poke_id, function (pokemon_stats) {
				        var stats_name_obj = [];
				        var stats_value_obj = [];
				        var effort_obj = [];
				        for (var q = 0; q < pokemon_stats.length;q++) {
				            stats_name_obj.push(pokemon_stats[q].stat_id);
				            stats_value_obj.push(pokemon_stats[q].base_stat);
				            effort_obj.push(pokemon_stats[q].effort);
				            if (q == pokemon_stats.length-1) {
				                render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                document.getElementById("nature").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("HP").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("attack").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("defense").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("s_attack").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("s_defense").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                document.getElementById("speed").onchange = function () {
				                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
				                }
				                render_Radar(pokename,id_in, stats_name_obj, stats_value_obj);
				                accessDatabaseCHILD(firebase.database().ref("pokemon-types"), "pokemon_id", poke_id, function (pokemon_types) {
				                    if (pokemon_types.length == 2)
				                    {
				                        var type1 = types[pokemon_types[0].type_id].identifier;
				                        var type2 = types[pokemon_types[1].type_id].identifier;
				                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type1 + " ><p>"+type1.charAt(0).toUpperCase() + type1.slice(1)+"</p></div>";
				                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type2 + " ><p>"+type2.charAt(0).toUpperCase() + type2.slice(1)+"</p></div>";
				                        typeEffectivity([pokemon_types[0].type_id,pokemon_types[1].type_id], type1.charAt(0).toUpperCase() + type1.slice(1)+" "+type2.charAt(0).toUpperCase() + type2.slice(1))
				                    }
				                    else
				                    {
				                        var type = types[pokemon_types[0].type_id].identifier;
				                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type + " ><p>"+type.charAt(0).toUpperCase() + type.slice(1)+"</p></div>";
				                        typeEffectivity([pokemon_types[0].type_id],type.charAt(0).toUpperCase() + type.slice(1))
				                    }
				                },1);
				            }
				        }
				    },1);
				}

				function render_Radar(pokename,id_in, stats_name, stats_value){
				    var max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
				    var radar_series = []
				    var null_array = [null,null,null,null,null,null,null,null].slice(0,stats_value.length);
				    for (var t = 0; t < stats_value.length; t++)
				    {
				        var values_array = null_array.slice();
				        values_array[t]  = stats_value[t];
				        var names_array = null_array.slice();
				        names_array[t]  = stats[stats_name[t]].text;
				        radar_series.push({
				            "values" : values_array,
				            "data-band": names_array,
				            "target" : "_blank",
				            "background-color":stats[stats_name[t]].color,
				            "tooltip": {
				                "text":"%data-band: %v",
				                "background-color":stats[stats_name[t]].color,
				                "color":"#FFF",
				                "font-size":"14px"
				            },
				            "text":stats[stats_name[1]].text
				            })
				        if (t == stats_value.length - 1)
				        {

				            var myRadar = {
				                "globals": {
				                    "font-family": 'Exo 2, sans-serif',
				                    "shadow":false
				                },
				                "title" : {
				                    visible:true,
				                    "font-color": "#fff",
				                    "font-family": 'Exo 2, sans-serif',
				                    "text" : "Base Stats for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
				                    "background-color":"transparent",
				                    "font-size":"15",
				                    height:"10%",
				                    textAlign:"center"
				                },
				                type: "radar",
				                backgroundColor: "transparent",
				                scale:{
				                    sizeFactor: "100%"
				                },
				                plot: {
				                    "background-color":"#fff",
				                    aspect:"rose",
				                    "animation": {
				                        "effect":"ANIMATION_EXPAND_TOP",
				                        "sequence":"ANIMATION_BY_PLOT_AND_NODE",
				                        "speed":10
				                    },
				                    "stacked": true //To create a stacked radar chart.
				                },
				                "scale-k":{
				                    "aspect":"circle",
				                    "visible":false
				                },
				                // "legend": {
				                //     "layout":"6x1",
				                //     "toggle-action": "none",
				                //     "border-width": 0,
				                //     "border-color": "none",
				                //     backgroundColor: "#116381",
				                //     "border-radius":"5vmin",
				                //     x: "70%",
				                //     y: "0%",
				                //     height:"90%",
				                //     "item": {
				                //         "font-color": "#fff",
				                //         "font-family": 'Exo 2, sans-serif',
				                //         "font-size": "15px",
				                //         "font-weight": "600",
				                //     },
				                //
				                // },
				                "scale-v":{
				                    "values": "0:"+ max_Val +":25",
				                    "guide": {
				                        "line-width":1,
				                        "line-style":"FFF",
				                        "line-color":"#FFF"
				                    },
				                    "item": {
				                        "color":"#FFF"
				                    },
				                    "line-color":"#FFF",
				                    alpha:0.6
				                },
				                plotarea:{
				                    height:"100%",
				                },
				                "series" : radar_series
				            };

				            zingchart.render({
				                id : 'radar',
				                data : myRadar,
				            });
				            document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
				            document.getElementById("radar").style.visibility = "visible";
				        }
				    }
				}

				function typeEffectivity(types_in, typename) {

				    var effectivity = [
				        [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
				        [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
				        [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
				        [1,1,1,0.5,0.5,0.5,1,0.5,0.5,1,1,2,1,1,1,1,1,2],
				        [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
				        [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
				        [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
				        [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
				        [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
				        [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
				        [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
				        [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
				        [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
				        [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
				        [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
				        [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
				        [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
				        [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1]
				    ];
				    var this_pokemon_index_array = [];
				    types_in.forEach(function (type) {
				        console.log(type)
				        console.log(types)
				        this_pokemon_index_array.push(parseInt(type));
				    })
				    function calculateEffectivity(attack_index_array, defense_index_array)
				    {
				        var effectivity_value = effectivity[attack_index_array[0]][defense_index_array[0]];
				        if (defense_index_array.length == 2) {
				            effectivity_value = effectivity_value*effectivity[attack_index_array[0]][defense_index_array[1]];
				        }
				        else if (attack_index_array.length == 2) {
				            effectivity_value = effectivity_value*effectivity[attack_index_array[1]][defense_index_array[0]];
				        }
				        if (effectivity_value == 0)
				        {
				            effectivity_value = 1
				        }
				        return effectivity_value;
				    }
				    var val_array = [
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([0],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([1],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([2],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([3],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([4],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([5],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([6],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([7],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([8],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([9],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([10],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([11],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([12],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([13],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([14],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([15],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([16],this_pokemon_index_array)],
				        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([17],this_pokemon_index_array)],
				        [calculateEffectivity(this_pokemon_index_array,[0]),
				        calculateEffectivity(this_pokemon_index_array,[1]),
				        calculateEffectivity(this_pokemon_index_array,[2]),
				        calculateEffectivity(this_pokemon_index_array,[3]),
				        calculateEffectivity(this_pokemon_index_array,[4]),
				        calculateEffectivity(this_pokemon_index_array,[5]),
				        calculateEffectivity(this_pokemon_index_array,[6]),
				        calculateEffectivity(this_pokemon_index_array,[7]),
				        calculateEffectivity(this_pokemon_index_array,[8]),
				        calculateEffectivity(this_pokemon_index_array,[9]),
				        calculateEffectivity(this_pokemon_index_array,[10]),
				        calculateEffectivity(this_pokemon_index_array,[11]),
				        calculateEffectivity(this_pokemon_index_array,[12]),
				        calculateEffectivity(this_pokemon_index_array,[13]),
				        calculateEffectivity(this_pokemon_index_array,[14]),
				        calculateEffectivity(this_pokemon_index_array,[15]),
				        calculateEffectivity(this_pokemon_index_array,[16]),
				        calculateEffectivity(this_pokemon_index_array,[17]),
				        calculateEffectivity(this_pokemon_index_array,this_pokemon_index_array)]
				    ]

				    var myChord = {
				        "title" : {
				            visible:true,
				            "font-color": "#fff",
				            "font-family": 'Exo 2, sans-serif',
				            "text" : "Type Effectiveness",
				            "background-color":"transparent",
				            "font-size":"15",
				            height:"10%",
				            y:"-5%",
				            textAlign:"center"
				        },
				        "type": "chord",
				        "background-color": "transparent",
				        // "legend": {
				        //     "layout":"10x2",
				        //     "toggle-action": "none",
				        //     "border-width": 0,
				        //     "border-color": "none",
				        //     backgroundColor: "#116381",
				        //     "border-radius":"5vmin",
				        //     x: "70%",
				        //     y: "0%",
				        //     height:"85%",
				        //     "item": {
				        //         "font-color": "#fff",
				        //         "font-family": 'Exo 2, sans-serif',
				        //         "font-size": "15px",
				        //         "font-weight": "600",
				        //     },
				        // },
				        y:"5%",
				        "options": {
				            radius:"90%",
				            "band-space": 0,
				            "shadow": 0,
				            "border": "none",
				            "color-type":"palette",
				            "style":{
				                offsetY:"10%",
				                "chord":{
				                    "border-color":"none"
				                },
				                "tick":{
				                    visible: false
				                },
				                "item":{
				                    visible: false
				                },
				                "label": {
				                    visible: false
				                },
				                "tooltip":{
				                    "text-chord":"%text-source attacks %text-destination with effectivity  of x%value-source, <br>%text-destination attacks %text-source with effectivity of x%value-destination",
				                    "text":"Self-chord of item %text with value %value"
				                }
				            },
				            "palette":["#A8A878",
				                "#F08030",
				                "#6890F0",
				                "#F8D030",
				                "#78C850",
				                "#98D8D8",
				                "#C03028",
				                "#A040A0",
				                "#E0C068",
				                "#A890F0",
				                "#F85888",
				                "#A8B820",
				                "#B8A038",
				                "#705898",
				                "#7038F8",
				                "#705848",
				                "#B8B8D0",
				                "#EE99AC",
				                "#FFF"]
				        },
				        "series":[{
				            text:"Normal",
				            "values": val_array[0],
				            "style": {
				                "band": {
				                    "background-color": "#C6C6A7",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Fire",
				            "values": val_array[1],
				            "style": {
				                "band": {
				                    "background-color": "#9C531F",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Water",
				            "values": val_array[2],
				            "style": {
				                "band": {
				                    "background-color": "#445E9C",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Electric",
				            "values":val_array[3],
				            "style": {
				                "band": {
				                    "background-color": "#A1871F",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Grass",
				            "values":val_array[4],
				            "style": {
				                "band": {
				                    "background-color": "#4E8234",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Ice",
				            "values":val_array[5],
				            "style": {
				                "band": {
				                    "background-color": "#638D8D",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Fighting",
				            "values":val_array[6],
				            "style": {
				                "band": {
				                    "background-color": "#7D1F1A",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Poison",
				            "values":val_array[7],
				            "style": {
				                "band": {
				                    "background-color": "#682A68",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Ground",
				            "values":val_array[8],
				            "style": {
				                "band": {
				                    "background-color": "#927D44",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Flying",
				            "values": val_array[9],
				            "style": {
				                "band": {
				                    "background-color": "#6D5E9C",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Psychic",
				            "values": val_array[10],
				            "style": {
				                "band": {
				                    "background-color": "#A13959",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Bug",
				            "values": val_array[11],
				            "style": {
				                "band": {
				                    "background-color": "#6D7815",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Rock",
				            "values": val_array[12],
				            "style": {
				                "band": {
				                    "background-color": "#786824",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Ghost",
				            "values": val_array[13],
				            "style": {
				                "band": {
				                    "background-color": "#493963",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Dragon",
				            "values": val_array[14],
				            "style": {
				                "band": {
				                    "background-color": "#4924A1",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Dark",
				            "values": val_array[15],
				            "style": {
				                "band": {
				                    "background-color": "#49392F",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Steel",
				            "values": val_array[16],
				            "style": {
				                "band": {
				                    "background-color": "#787887",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:"Fairy",
				            "values": val_array[17],
				            "style": {
				                "band": {
				                    "background-color": "#9B6470",
				                    "alpha": 1
				                },
				            },
				        },{
				            text:typename,
				            "values": val_array[18],
				            "style": {
				                "band": {
				                    "background-color": "#FFF",
				                    "alpha": 1
				                },
				            },
				        }]
				    };
				    zingchart.render({
				        id : 'chord',
				        data : myChord,
				    });
				}

				function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
				    var nature_str=document.getElementById("nature").value.split(",");
				    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
				    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
				    console.log(stats_name)
				    console.log(nature)
				    var levels=[10,20,30,40,50,60,70,80,90,100];
				    var statsFinal = [];
				    var k;
				    for (var i = 0; i < stats_name.length; i++)
				    {
				        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				        if (stats_name[i] == "1")
				        {
				            for (k=0; k < 10; k++)
				            {
				                temp[k]= Math.floor((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+levels[k]+10;
				                if (k == 9)
				                {
				                    statsFinal.push(temp)
				                }
				            }
				        }
				        else
				        {
				            for (k=0; k < 10; k++)
				            {
				                if (stats_name[i] == parseInt(nature[0]))
				                {
				                    console.log(stats_name[i])
				                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*1.1);
				                    if (k == 9)
				                    {
				                        statsFinal.push(temp)
				                    }
				                }
				                else if (stats_name[i] == parseInt(nature[1]))
				                {
				                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*0.9);
				                    if (k == 9)
				                    {
				                        statsFinal.push(temp)
				                    }
				                }
				                else
				                {
				                    temp[k]= Math.floor(((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5);
				                    if (k == 9)
				                    {
				                        statsFinal.push(temp)
				                    }
				                }
				            }
				        }
				    }
				    var stats_graph_progress = [];
				    for (var p = 0; p < statsFinal.length; p++)
				    {
				        stats_graph_progress.push({
				            text: stats[stats_name[p]].text,
				            values: statsFinal[p],
				            backgroundColor: stats[stats_name[p]].color,
				            lineColor: stats[stats_name[p]].color,
				            marker:{
				                backgroundColor: stats[stats_name[p]].color,
				                borderColor: stats[stats_name[p]].color

				            },
				            "tooltip": {
				                "text": "%t at level %kt: %vt"
				            }
				        });
				    }
				    var statsProgression = {
				        "background-color": "transparent",
				        "title" : {
				            visible:true,
				            "font-color": "#fff",
				            "font-family": 'Exo 2, sans-serif',
				            "text" : "Stats Progression for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
				            "background-color":"transparent",
				            "font-size":"15",
				            height:"14.2857143%",
				            textAlign:"center"
				        },
				        "scale-x": {
				            "values": [],
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
				                "font-size":"12.5",
				                "font-color": "#fff",
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
				                "text": "Stat Value",
				                "font-family": 'Exo 2, sans-serif',
				                "font-weight": "normal",
				                "font-size":"12.5",
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
				        type: "area",
				        stacked: true,
				        height: "100%",
				        width: "100%",
				        plot:{
				            alphaArea: 0.6,
				            "animation": {
				                "delay": 0,
				                "effect": 1,
				                "speed": 1000,
				                "method": 0,
				                "sequence": 1
				            }
				        },
				        series : stats_graph_progress,
				    };
				    zingchart.render({
				        id : 'stats_progression',
				        data : statsProgression,
				    });
				}

				function accessDatabaseCHILD(ref_in,str,val_comp,callbackfunction,pass) {
				    ref_in.orderByChild(str).equalTo(val_comp).once("value").then(function(snapshot) {
				        var temp_database_array = [];
				        console.log(str+": "+snapshot.numChildren())
				        snapshot.forEach(function (snap_child) {
				            temp_database_array.push(snap_child.val());
				            if (temp_database_array.length == snapshot.numChildren())
				            {
				                if (pass) {
				                    callbackfunction(temp_database_array);
				                }
				                else
				                {
				                    callbackfunction();
				                }
				            }
				        })
				    });
				}


			/***/ },
			/* 3 */
			/***/ function(module, exports) {

				
				module.exports = function () {
				  return [
				  {
				    "name": "red-blue",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/1/",
				        "name": "red"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/2/",
				        "name": "blue"
				      }
				    ]
				  },
				  {
				    "name": "yellow",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/3/",
				        "name": "yellow"
				      }
				    ],
				  },
				  {
				    "name": "gold-silver",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/4/",
				        "name": "gold"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/5/",
				        "name": "silver"
				      }
				    ]
				  },
				  {
				    "name": "crystal",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/6/",
				        "name": "crystal"
				      }
				    ]
				  },
				  {
				    "name": "ruby-sapphire",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/7/",
				        "name": "ruby"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/8/",
				        "name": "sapphire"
				      }
				    ]
				  },
				  {
				    "name": "emerald",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/9/",
				        "name": "emerald"
				      }
				    ]
				  },
				  {
				    "name": "firered-leafgreen",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/10/",
				        "name": "firered"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/11/",
				        "name": "leafgreen"
				      }
				    ]
				  },
				  {
				    "name": "diamond-pearl",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/12/",
				        "name": "diamond"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/13/",
				        "name": "pearl"
				      }
				    ]
				  },
				  {
				    "name": "platinum",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/14/",
				        "name": "platinum"
				      }
				    ]
				  },
				  {
				    "name": "heartgold-soulsilver",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/15/",
				        "name": "heartgold"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/16/",
				        "name": "soulsilver"
				      }
				    ]
				  },
				  {
				    "name": "black-white",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/17/",
				        "name": "black"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/18/",
				        "name": "white"
				      }
				    ]
				  },
				  {
				    "name": "colosseum",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/19/",
				        "name": "colosseum"
				      }
				    ]
				  },
				  {
				    "name": "xd",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/20/",
				        "name": "xd"
				      }
				    ]
				  },
				  {
				    "name": "black-2-white-2",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/21/",
				        "name": "black-2"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/22/",
				        "name": "white-2"
				      }
				    ]
				  },
				  {
				    "name": "x-y",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/23/",
				        "name": "x"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/24/",
				        "name": "y"
				      }
				    ]
				  },
				  {
				    "name": "omega-ruby-alpha-sapphire",
				    "versions": [
				      {
				        "url": "http://pokeapi.co/api/v2/version/25/",
				        "name": "omega-ruby"
				      },
				      {
				        "url": "http://pokeapi.co/api/v2/version/26/",
				        "name": "alpha-sapphire"
				      }
				    ]
				  }
				]};

			/***/ },
			/* 4 */
			/***/ function(module, exports) {

				/**
				 * Created by tmartin on 7/8/16.
				 */

				module.exports = {
				    mkshape:makeShape,
				};




				function pathToPolygon(array) {
				    var pointsArray = [];
				    var currentLetter = "";
				    var position = 0;
				    var pointCount = 0; //CURVE
				    var curvePoints = [];
				    var coordinateCount = 0; //CURVE
				    var coordinateArray = []; //CURVE
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
				                    coordinateArray.push(parseFloat(value));
				                    coordinateCount++;
				                    if (coordinateCount == 6){
				                        coordinateArray.push(1);
				                        coordinateCount = 0;
				                        pointsArray.push(coordinateArray);
				                        coordinateArray = [];

				                    }
				                    // if (position == 0) {
				                    //     if (pointCount == 0)
				                    //     {
				                    //         curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
				                    //     }
				                    //     curvePoints.push([parseFloat(value)]);
				                    //     position = 1;
				                    // }
				                    // else {
				                    //     curvePoints[curvePoints.length-1].push(parseFloat(value));
				                    //     pointCount++;
				                    //     position = 0;
				                    //     if (pointCount == 3)
				                    //     {
				                    //         var vals = bezier(curvePoints);
				                    //         var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
				                    //         for (var t = 0; t < distance;t++) {
				                    //             pointsArray.push(vals(t/distance));
				                    //         }
				                    //         curvePoints = [];
				                    //         pointCount = 0;
				                    //     }
				                    // }
				                    //
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
				    var coordinateCount = 0; //CURVE
				    var coordinateArray = []; //CURVE
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
				                    coordinateArray.push(parseFloat(value));
				                    coordinateCount++;
				                    if (coordinateCount == 6){
				                        coordinateArray.push(1);
				                        coordinateCount = 0;
				                        pointsArray.push(coordinateArray);
				                        coordinateArray = [];

				                    }
				                    else {
				                        coordinateCount++;
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
				    if (path.getAttribute("class") == "ROUTE") {
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
				                },
				                zIndex:2,
				                cursor: "pointer"
				            };
				        }
				    }
				    else if (path.getAttribute("class") == "LAND") {
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
				                "shadow-angle":0,
				                "shadow-blur":"3px",
				                "shadow-color": "#082f3d",
				                "shadow-alpha": 1,
				                flat: true
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
				            zIndex:1
				        };
				    }
				    else if (path.getAttribute("class") == "LANDMARK") {
				         circleR = path.getAttribute("r").trim();
				         circleX = path.getAttribute("cx").trim();
				         circleY = path.getAttribute("cy").trim();
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
				            "hover-state": {
				                "borderColor": "#FFD700",
				                "backgroundColor": "#FFD700",
				            },
				            zIndex:1,
				            cursor: "pointer"
				        };
				    }
				}

			/***/ },
			/* 5 */
			/***/ function(module, exports) {

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

					__webpack_require__(1);
					(function webpackMissingModule() { throw new Error("Cannot find module \"bundle\""); }());


				/***/ },
				/* 1 */
				/***/ function(module, exports, __webpack_require__) {

					var pokescript = __webpack_require__(2);
					var svgToZing = __webpack_require__(4);
					var SVGSTRING;

					window.addEventListener("load", beginApp);
					function beginApp() {
					    document.getElementById('select_Region').addEventListener("change", function () {
					        document.getElementById("loading").visibility = "visible";
					        var location = new XMLHttpRequest();
					        var url = '/region_maps/' + document.getElementById('select_Region').value + '.svg';
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

				/***/ },
				/* 2 */
				/***/ function(module, exports, __webpack_require__) {

					/**
					 * Created by tmartin on 7/12/16.
					 */
					var versions = __webpack_require__(3);
					var pokeVersion;
					var pokeVersionArray = [];
					var min = null;
					var max = null;
					var pokemonSERIES = [];
					var pokeJSON = [];
					var levelsINDEX = [];
					var methodIndex = [];
					var locationName = "";
					var selected_areaName = "";
					var selected_areaID;
					var selected_method;
					var responseArray = [];
					var svg_stored;
					var shapes_stored;
					var region_stored;
					var selectedShapeID = null;
					var regions = {
					    "1": {
					        "name": "Kanto"
					    },
					    "2": {
					        "name": "Johto"
					    },
					    "3": {
					        "name": "Hoenn"
					    },
					    "4": {
					        "name": "Sinnoh"
					    },
					    "5": {
					        "name": "Unova"
					    },
					    "6": {
					        "name": "Kalos"
					    }
					};
					var stats = {
					    "1": {
					        text:'HP',
					        color: '#b20000'
					    },
					    "2": {
					        text:'Attack',
					        color: '#d8732b'
					    },
					    "3": {
					        text:'Defense',
					        color: '#dfbb2b'
					    },
					    "4": {
					        text:'S. Attack',
					        color: '#6890F0'
					    },
					    "5": {
					        text:'S. Defense',
					        color: '#78C850'
					    },
					    "6": {
					        text:'Speed',
					        color: '#F85888'
					    },
					    "7": {
					        text:'Accuracy',
					        color: '#1A8B55'
					    },
					    "8": {
					        text:'Evasion',
					        color: '#47A0A2'
					    }
					}
					var types = {
					        "1": {
					            "identifier": "normal",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "2": {
					            "identifier": "fighting",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "3": {
					            "identifier": "flying",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "4": {
					            "identifier": "poison",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "5": {
					            "identifier": "ground",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "6": {
					            "identifier": "rock",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "7": {
					            "identifier": "bug",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "8": {
					            "identifier": "ghost",
					            "generation_id": 1,
					            "damage_class_id": 2
					        },
					        "9": {
					            "identifier": "steel",
					            "generation_id": 2,
					            "damage_class_id": 2
					        },
					        "10": {
					            "identifier": "fire",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "11": {
					            "identifier": "water",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "12": {
					            "identifier": "grass",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "13": {
					            "identifier": "electric",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "14": {
					            "identifier": "psychic",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "15": {
					            "identifier": "ice",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "16": {
					            "identifier": "dragon",
					            "generation_id": 1,
					            "damage_class_id": 3
					        },
					        "17": {
					            "identifier": "dark",
					            "generation_id": 2,
					            "damage_class_id": 3
					        },
					        "18": {
					            "identifier": "fairy",
					            "generation_id": 6,
					            "damage_class_id": ""
					        },
					        "10001": {
					            "identifier": "unknown",
					            "generation_id": 2,
					            "damage_class_id": ""
					        },
					        "10002": {
					            "identifier": "shadow",
					            "generation_id": 3,
					            "damage_class_id": ""
					        }
					    }
					var method_names = ["walk", "old-rod","good-rod","super-rod","surf","rock-smash","headbutt","dark-grass","grass-spots","cave-spots","bridge-spots","super-rod-spots","surf-spots","yellow-flowers","purple-flowers","red-flowers","rough-terrain"]
					var pokedex = []
					var colorOptions = [[255,153,153],[255,204,153],[255,255,153],[204,255,153],[153,255,153],[153,255,204],[153,255,255],[153,204,255],[153,153,255],[204,153,255],[255,153,255],[255,153,204],[185,83,83],[185,134,83],[185,185,83],[134,185,83],[83,185,83],[83,185,134],[83,185,185],[83,134,185],[83,83,185],[134,83,185],[185,83,185],[185,83,134],[255,183,183],[255,234,183],[255,255,183],[234,255,183],[183,255,183],[183,255,234],[183,255,255],[183,234,255],[183,183,255],[234,183,255],[255,183,255],[255,183,234],[185,113,113],[185,134,113],[185,185,113],[134,185,113],[113,185,113],[113,185,134],[113,185,185],[113,134,185],[113,113,185],[134,113,185],[185,113,185],[185,113,134]];
					var prevMultiple = 1;

					module.exports = {
					    createDropDown:initialFunction
					};

					function initialFunction(region,render_obj) {
					    selectedShapeID = null;
					    document.getElementById("select_Method").options.length = 0;
					    var tempOptionMethod = document.createElement("option");
					    tempOptionMethod.text = "Select Method";
					    tempOptionMethod.selected = true;
					    tempOptionMethod.disabled = true;
					    document.getElementById("select_Method").add(tempOptionMethod)
					    document.getElementById("select_Location_Area").options.length = 0;
					    var tempOptionArea = document.createElement("option");
					    tempOptionArea.text = "Select Area";
					    tempOptionArea.selected = true;
					    tempOptionArea.disabled = true;
					    document.getElementById("select_Location_Area").add(tempOptionArea)
					    document.getElementById("select_Version").options.length = 0;
					    var tempOptionVersion = document.createElement("option");
					    tempOptionVersion.text = "Select Version";
					    tempOptionVersion.selected = true;
					    tempOptionVersion.disabled = true;
					    document.getElementById("select_Version").add(tempOptionVersion)
					    svg_stored = render_obj[0];
					    shapes_stored = render_obj[1];
					    region_stored = parseInt(region);
					    prevMultiple = 1;
					    createPokedex();
					    renderShape();
					}

					function createPokedex() {
					    firebase.database().ref("pokemon").orderByKey().once("value").then(function(snapshot) {
					        snapshot.forEach(function (snap_child) {
					            pokedex.push(snap_child.val());
					        })
					    });
					}

					function renderShape() {
					    setHeightWidth()
					    zingchart.render({
					        id: "SHAPESDIV",
					        width: "100%",
					        height: "100%",
					        margins: 0,
					        backgroundColor: "transparent",
					        data: {
					            backgroundColor: "transparent",
					            "shapes": shapes_stored
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
					                    "alpha": 0.6,
					                    cursor: "pointer"
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
					                    "effect": 1,
					                    "speed": 1000,
					                    "method": 0,
					                    "sequence": 1
					                }
					            },
					            "scale-x": {
					                "values": [],
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
					                "text": "Chance of encountering a level %k %t: %v%",
					                "font-family": 'Exo 2, sans-serif',
					                "font-size": "15px",
					                "font-weight": "normal",
					                "font-color": "#fff",
					                "decimals": 2,
					                "text-align": "left",
					                "border-radius": "8px",
					                "padding": "10px 10px",
					                "background-color": "#0B4153",
					                "alpha": 0.95,
					                "shadow": 0,
					                "border-width": 0,
					                "border-color": "none"
					            },
					            "series": pokeJSON
					        }
					    });
					    zingchart.shape_click = function(p) {
					        if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "ROUTE"){
					            console.log(p.shapeid)
					            if (selectedShapeID != null)
					            {
					                zingchart.exec('SHAPESDIV', 'updateobject', {
					                    'type':'shape',
					                    'data' : {
					                        'id' : selectedShapeID,
					                        'line-color' : 'black',
					                        'border-color' : 'black',
					                        'background-color': 'black',
					                        zIndex : 2
					                    }
					                });
					            }
					            selectedShapeID = p.shapeid;
					            zingchart.exec('SHAPESDIV', 'updateobject', {
					                'type':'shape',
					                'data' : {
					                    'id' : selectedShapeID,
					                    'line-color' : '#b81c19',
					                    zIndex : 3
					                }
					            });
					            // document.getElementById("loading").style.visibility = "visible";
					            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
					        }
					        else if (svg_stored.getElementById(p.shapeid).getAttribute("class") == "LANDMARK"){
					            console.log(p.shapeid)
					            if (selectedShapeID != null)
					            {
					                zingchart.exec('SHAPESDIV', 'updateobject', {
					                    'type':'shape',
					                    'data' : {
					                        'id' : selectedShapeID,
					                        'border-color' : 'black',
					                        'background-color': 'black',
					                        'line-color' : 'black',
					                        zIndex : 1
					                    }
					                });
					            }
					            selectedShapeID = p.shapeid;
					            zingchart.exec('SHAPESDIV', 'updateobject', {
					                'type':'shape',
					                'data' : {
					                    'id' : selectedShapeID,
					                    'border-color' : '#b81c19',
					                    'background-color': '#b81c19',
					                    zIndex : 3
					                }
					            });
					            // document.getElementById("loading").style.visibility = "visible";
					            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
					        }
					    };
					    zingchart.legend_item_click = function(p) {
					        // document.getElementById("loading").style.visibility = "visible";
					        document.getElementById("pokemon_image").src = "UI_images/holder.png";
					        document.getElementById("radar").style.visibility = "hidden";
					        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
					        infoAboutSelectedPokemon(pokeText.slice(0,pokeText.indexOf('(')),pokeText.slice(pokeText.indexOf('(ID: ')+5,pokeText.indexOf(')')));
					    };
					    // document.getElementById("loading").style.visibility = "hidden";
					    window.onresize = function(){
					        setHeightWidth();
					        zingchart.exec('SHAPESDIV', 'setdata', {
					            data : {
					                backgroundColor: "transparent",
					                shapes : shapes_stored
					            }
					        });
					    };
					}

					function setHeightWidth(){
					    var multiple = (document.getElementById("SHAPESDIV").offsetHeight)/ 400;
					    shapes_stored.forEach(function(shape){
					        if (shape.type == "circle") {
					            shape.size *= multiple/prevMultiple;
					            shape.x *= multiple/prevMultiple;
					            shape.y *= multiple/prevMultiple;
					        }
					        else {
					            shape.points.forEach(function(point_array){
					                if (point_array != null)
					                {
					                    for (var pt = 0;point_array.length > pt; pt++)
					                    {
					                        point_array[pt] *= multiple/prevMultiple;
					                    }
					                }
					            })
					        }
					    });
					    prevMultiple = multiple
					}

					function beginRoute(inVal) {
					    methodIndex = [];
					    pokemonSERIES = [];
					    levelsINDEX = [];
					    pokeJSON = [];
					    locationName = "";
					    responseArray = [];
					    min = null;
					    max = null;
					    document.getElementById("select_Method").options.length = 0;
					    var tempOptionMethod = document.createElement("option");
					    tempOptionMethod.text = "Select Method";
					    tempOptionMethod.selected = true;
					    tempOptionMethod.disabled = true;
					    document.getElementById("select_Method").add(tempOptionMethod)
					    document.getElementById("select_Location_Area").options.length = 0;
					    var tempOptionArea = document.createElement("option");
					    tempOptionArea.text = "Select Area";
					    tempOptionArea.selected = true;
					    tempOptionArea.disabled = true;
					    document.getElementById("select_Location_Area").add(tempOptionArea)
					    document.getElementById("select_Version").options.length = 0;
					    var tempOptionVersion = document.createElement("option");
					    tempOptionVersion.text = "Select Version";
					    tempOptionVersion.selected = true;
					    tempOptionVersion.disabled = true;
					    document.getElementById("select_Version").add(tempOptionVersion)
					    pokeLocationFunction(inVal);
					}

					function formatLocationArea(name) {
					    function hyphenLowerToSpaceUpper(match) {
					        return ' ' + match.slice(1).toUpperCase();
					    }
					    return name.replace(/\-([a-z])|\-\d/g, hyphenLowerToSpaceUpper);
					}

					function pokeLocationFunction (inVal) {
					    firebase.database().ref("locations/"+inVal.toString()).once("value").then(function (locationName_accessed) {
					        getAllAreasInLocation(locationName_accessed.val()["identifier"],inVal)
					    });
					}

					function getAllAreasInLocation(location_in,location_id){
					    locationName = location_in;
					    accessDatabaseCHILD(firebase.database().ref("location-areas"), "location_id", location_id, function (areas) {
					        if (areas.length != 0){
					            document.getElementById("select_Location_Area").options.length = 0;
					            var tempOptionArea = document.createElement("option");
					            tempOptionArea.text = "Select Area";
					            tempOptionArea.selected = true;
					            tempOptionArea.disabled = true;
					            document.getElementById("select_Location_Area").add(tempOptionArea)
					            selectLocationArea(areas)
					        }
					        else
					        {
					            alert("We're sorry, we don't detect any wild pokemon in this area!")
					        }
					    },1)
					}

					function selectLocationArea(areas_in){
					    for (var i = 0; i < areas_in.length; i++){
					        var newoptions = document.createElement("option");
					        if (areas_in[i].identifier != "")
					        {
					            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1)) + " " + formatLocationArea(areas_in[i].identifier[0].toUpperCase() + areas_in[i].identifier.slice(1));
					        }
					        else
					        {
					            newoptions.text = formatLocationArea(locationName[0].toUpperCase() + locationName.slice(1));
					        }
					        newoptions.value = areas_in[i].id;
					        document.getElementById("select_Location_Area").options.add(newoptions);
					        if (i == areas_in.length - 1)
					        {
					            document.getElementById("select_Location_Area").disabled = false;
					            document.getElementById("select_Location_Area").onchange = function () {
					                if (document.getElementById("select_Location_Area").value != "")
					                {
					                    document.getElementById("select_Method").options.length = 0;
					                    var tempOptionMethod = document.createElement("option");
					                    tempOptionMethod.text = "Select Method";
					                    tempOptionMethod.selected = true;
					                    tempOptionMethod.disabled = true;
					                    document.getElementById("select_Method").add(tempOptionMethod)
					                    document.getElementById("select_Version").options.length = 0;
					                    var tempOptionVersion = document.createElement("option");
					                    tempOptionVersion.text = "Select Version";
					                    tempOptionVersion.selected = true;
					                    tempOptionVersion.disabled = true;
					                    document.getElementById("select_Version").add(tempOptionVersion)
					                    setMethodOptions()
					                }
					            }
					        }
					    }
					}

					function setMethodOptions(){
					    selected_areaName = document.getElementById("select_Location_Area").options[document.getElementById("select_Location_Area").selectedIndex].text;
					    selected_areaID = document.getElementById("select_Location_Area").value;
					    console.log("location-area-methods/"+selected_areaID)
					    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
					        console.log("Methods available for area "+selected_areaID+" "+ snapMethods.numChildren());
					        snapMethods.val().forEach(function (method_indiv) {
					            console.log(method_indiv)
					            var newoptions = document.createElement("option");
					            newoptions.text = method_names[method_indiv-1];
					            newoptions.value = method_indiv;
					            document.getElementById("select_Method").options.add(newoptions);
					            if (snapMethods.numChildren() == document.getElementById("select_Method").options.length-1)
					            {
					                document.getElementById("select_Method").disabled = false;
					                document.getElementById("select_Method").onchange = function () {
					                    if (document.getElementById("select_Method").value != "")
					                    {
					                        document.getElementById("select_Version").options.length = 0;
					                        var tempOptionVersion = document.createElement("option");
					                        tempOptionVersion.text = "Select Version";
					                        tempOptionVersion.selected = true;
					                        tempOptionVersion.disabled = true;
					                        document.getElementById("select_Version").add(tempOptionVersion)
					                        selectRegion();
					                    }
					                }
					            }
					        })
					    });
					}

					function selectRegion() {
					    selected_method = document.getElementById("select_Method").value;
					    var tempcount = 0;
					    var gameSelect = document.getElementById("select_Version");
					    console.log(region_stored)
					    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
					        console.log(version_groups);
					        for (var group = 0; group < version_groups.length; group++)
					        {
					            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
					                console.log(versions_in_group);
					                for (var individual = 0; individual < versions_in_group.length; individual++) {
					                    var temp = versions_in_group[individual];
					                    pokeVersionArray.push(temp);
					                    var newoptions = document.createElement("option");
					                    newoptions.text = "";
					                    var holdName = [];
					                    temp.identifier.split("-").forEach(function (val) {
					                        holdName.push(val.charAt(0).toUpperCase() + val.slice(1));
					                    });
					                    newoptions.text = holdName.join(" ");
					                    newoptions.value = temp.id;
					                    gameSelect.options.add(newoptions);
					                    if (individual == versions_in_group.length - 1) {
					                        if (tempcount == version_groups.length - 1) {
					                            document.getElementById("select_Version").disabled = false;
					                        }
					                        else
					                        {
					                            tempcount++;
					                        }
					                    }
					                }
					            },1);
					        }
					    },1);
					    document.getElementById("select_Version").onchange = versionSelect;
					}

					function versionSelect() {
					    if (document.getElementById("select_Version").value != "Select Version")
					    {
					        pokeVersion = document.getElementById("select_Version").value;
					        getEncountersAtAreaGivenMethod(document.getElementById("select_Location_Area").value,document.getElementById("select_Method").value);
					    }
					}

					function getEncountersAtAreaGivenMethod(a_in, m_in) {
					    methodIndex = [];
					    pokemonSERIES = [];
					    levelsINDEX = [];
					    pokeJSON = [];
					    locationName = "";
					    responseArray = [];
					    min = null;
					    max = null;
					    var version_IN;
					    if (pokeVersion == 25 || pokeVersion == 26) {
					        version_IN = (pokeVersion%25)+7;
					    }
					    else
					    {
					        version_IN = pokeVersion;
					    }
					    firebase.database().ref("encounters/"+ a_in + "/"+version_IN+","+ m_in).once("value").then(postFirebase);
					    function postFirebase(snapshot){
					        var snaparray = [];
					        if (snapshot.numChildren() > 0) {
					            snapshot.forEach(function (snap_child) {
					                snaparray.push(snap_child.val())
					                if (snaparray.length == snapshot.numChildren())
					                {
					                    pokemonOnRoute(snaparray,handlePokemon);
					                }
					            })
					        }
					        else
					        {
					            if (pokeVersion == 10 || pokeVersion == 11) {
					                console.log("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in)
					                firebase.database().ref("encounters/"+ a_in + "/"+(pokeVersion%10+1)+","+ m_in).once("value").then(function (snaptwo) {
					                    var snaparray = [];
					                    if (snaptwo.numChildren() > 0) {
					                        snaptwo.forEach(function (snap_child) {
					                            snaparray.push(snap_child.val())
					                            if (snaparray.length == snaptwo.numChildren()) {
					                                pokemonOnRoute(snaparray, handlePokemon)
					                            }
					                        })
					                    }
					                    else
					                    {
					                        alert("We're sorry, we don't detect any wild pokemon in this area!")
					                    }
					                })
					            }
					            else
					            {
					                alert("We're sorry, we don't detect any wild pokemon in this area!")
					            }
					        }
					    }
					}

					function pokemonOnRoute(possiblePokemonEncounters,callback_in) {
					    if (possiblePokemonEncounters.length == 0){
					        alert("We're sorry, we don't detect any wild pokemon in this area!");
					        return;
					    }
					    pokemonSERIES = [];
					    levelsINDEX = [];
					    var colorArray = colorOptions.slice();
					    for (var p = 0; p < possiblePokemonEncounters.length; p ++) {
					        if (p == possiblePokemonEncounters.length-1)
					        {
					            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
					        }
					        else
					        {
					            callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 1].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
					        }
					    }
					}

					function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
					    console.log(pokemon_id)
					    var rand = Math.floor(Math.random() * (colorArray.length-1));
					    colorArray.splice(rand,1);
					    if ((min == null) || pokemon.min_level < min) {
					        min = pokemon.min_level;
					    }
					    if ((max == null) || pokemon.max_level > max) {
					        max = pokemon.max_level;
					    }

					    console.log(pokemon_name+ " at rarity "+parseInt(pokemon.rarity));
					    pokemonSERIES.push([pokemon_name,parseInt(pokemon.rarity), parseInt(pokemon.min_level),  parseInt(pokemon.max_level),  "rgb(" + colorArray[rand].join(",")+")",pokemon_id]);
					    if (boolval)
					    {
					        outputPokeJSON(updateChart)
					    }
					}

					function outputPokeJSON(callback) {
					    pokeJSON = [];
					    var levelsTEMP = [];
					    for (var i = min; i <= max; i++){
					        levelsINDEX.push(i);
					        levelsTEMP.push(null);
					    }
					    var JSONStorage = [];
					    var count = 0;

					    for (var p = pokemonSERIES.length - 1; p >= 0; p-- ){
					        count++
					        var text = pokemonSERIES[p][0] + "(ID: "+ pokemonSERIES[p][5] +")";
					        var index = -1;
					        for (var r = 0; r < JSONStorage.length; r++)
					        {
					            if (text == JSONStorage[r][0])
					            {
					                index = r;
					                break;
					            }
					        }
					        if (index != -1)
					        {
					            for(i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
					                if (JSONStorage[r][1][i - min] != null)
					                {
					                    JSONStorage[r][1][i - min] += pokemonSERIES[p][1];
					                }
					                else
					                {
					                    JSONStorage[r][1][i - min] = pokemonSERIES[p][1];
					                }
					            }
					        }
					        else
					        {
					            var methodCatch = levelsTEMP.slice();
					            for (i = pokemonSERIES[p][2]; i <= pokemonSERIES[p][3]; i++) {
					                methodCatch[i - min] = pokemonSERIES[p][1];
					            }
					            count++;
					            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4]]);
					        }
					        if (p == 0)
					        {
					            JSONStorage.forEach(function (storedEncounter) {
					                pokeJSON.push({
					                    text: storedEncounter[0],
					                    values: storedEncounter[1],
					                    legendItem: {
					                        order: storedEncounter[2]
					                    },
					                    backgroundColor: storedEncounter[3]
					                })
					            });
					            // document.getElementById("loading").style.visibility = "hidden";
					            callback()
					        }
					    }

					}

					function updateChart() {
					    zingchart.exec('CHARTDIV', 'setseriesdata', {
					        data : pokeJSON
					    });
					    zingchart.exec('CHARTDIV', 'modify', {
					        data : {
					            "title": {
					                "text": "Likelyhood of Encountering Pokemon in " + selected_areaName + " with method " + method_names[selected_method-1]
					            },
					            "scale-x": {
					                "values": levelsINDEX
					            },
					            "scale-y": {}
					        }
					    });
					}

					function infoAboutSelectedPokemon(pokename,id_in) {
					    var poke_id = parseInt(id_in);
					    document.getElementById("pokemon_header_types").innerHTML = pokename.charAt(0).toUpperCase() + pokename.slice(1);
					    accessDatabaseCHILD(firebase.database().ref("pokemon-stats"), "pokemon_id", poke_id, function (pokemon_stats) {
					        var stats_name_obj = [];
					        var stats_value_obj = [];
					        var effort_obj = [];
					        for (var q = 0; q < pokemon_stats.length;q++) {
					            stats_name_obj.push(pokemon_stats[q].stat_id);
					            stats_value_obj.push(pokemon_stats[q].base_stat);
					            effort_obj.push(pokemon_stats[q].effort);
					            if (q == pokemon_stats.length-1) {
					                render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                document.getElementById("nature").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("HP").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("attack").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("defense").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("s_attack").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("s_defense").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                document.getElementById("speed").onchange = function () {
					                    render_stats_graph(pokename,stats_name_obj, stats_value_obj, effort_obj);
					                }
					                render_Radar(pokename,id_in, stats_name_obj, stats_value_obj);
					                accessDatabaseCHILD(firebase.database().ref("pokemon-types"), "pokemon_id", poke_id, function (pokemon_types) {
					                    if (pokemon_types.length == 2)
					                    {
					                        var type1 = types[pokemon_types[0].type_id].identifier;
					                        var type2 = types[pokemon_types[1].type_id].identifier;
					                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type1 + " ><p>"+type1.charAt(0).toUpperCase() + type1.slice(1)+"</p></div>";
					                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type2 + " ><p>"+type2.charAt(0).toUpperCase() + type2.slice(1)+"</p></div>";
					                        typeEffectivity([pokemon_types[0].type_id,pokemon_types[1].type_id], type1.charAt(0).toUpperCase() + type1.slice(1)+" "+type2.charAt(0).toUpperCase() + type2.slice(1))
					                    }
					                    else
					                    {
					                        var type = types[pokemon_types[0].type_id].identifier;
					                        document.getElementById("pokemon_header_types").innerHTML += "<div class=types id=" + type + " ><p>"+type.charAt(0).toUpperCase() + type.slice(1)+"</p></div>";
					                        typeEffectivity([pokemon_types[0].type_id],type.charAt(0).toUpperCase() + type.slice(1))
					                    }
					                },1);
					            }
					        }
					    },1);
					}

					function render_Radar(pokename,id_in, stats_name, stats_value){
					    var max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
					    var radar_series = []
					    var null_array = [null,null,null,null,null,null,null,null].slice(0,stats_value.length);
					    for (var t = 0; t < stats_value.length; t++)
					    {
					        var values_array = null_array.slice();
					        values_array[t]  = stats_value[t];
					        var names_array = null_array.slice();
					        names_array[t]  = stats[stats_name[t]].text;
					        radar_series.push({
					            "values" : values_array,
					            "data-band": names_array,
					            "target" : "_blank",
					            "background-color":stats[stats_name[t]].color,
					            "tooltip": {
					                "text":"%data-band: %v",
					                "background-color":stats[stats_name[t]].color,
					                "color":"#FFF",
					                "font-size":"14px"
					            },
					            "text":stats[stats_name[1]].text
					            })
					        if (t == stats_value.length - 1)
					        {

					            var myRadar = {
					                "globals": {
					                    "font-family": 'Exo 2, sans-serif',
					                    "shadow":false
					                },
					                "title" : {
					                    visible:true,
					                    "font-color": "#fff",
					                    "font-family": 'Exo 2, sans-serif',
					                    "text" : "Base Stats for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
					                    "background-color":"transparent",
					                    "font-size":"15",
					                    height:"10%",
					                    textAlign:"center"
					                },
					                type: "radar",
					                backgroundColor: "transparent",
					                scale:{
					                    sizeFactor: "100%"
					                },
					                plot: {
					                    "background-color":"#fff",
					                    aspect:"rose",
					                    "animation": {
					                        "effect":"ANIMATION_EXPAND_TOP",
					                        "sequence":"ANIMATION_BY_PLOT_AND_NODE",
					                        "speed":10
					                    },
					                    "stacked": true //To create a stacked radar chart.
					                },
					                "scale-k":{
					                    "aspect":"circle",
					                    "visible":false
					                },
					                // "legend": {
					                //     "layout":"6x1",
					                //     "toggle-action": "none",
					                //     "border-width": 0,
					                //     "border-color": "none",
					                //     backgroundColor: "#116381",
					                //     "border-radius":"5vmin",
					                //     x: "70%",
					                //     y: "0%",
					                //     height:"90%",
					                //     "item": {
					                //         "font-color": "#fff",
					                //         "font-family": 'Exo 2, sans-serif',
					                //         "font-size": "15px",
					                //         "font-weight": "600",
					                //     },
					                //
					                // },
					                "scale-v":{
					                    "values": "0:"+ max_Val +":25",
					                    "guide": {
					                        "line-width":1,
					                        "line-style":"FFF",
					                        "line-color":"#FFF"
					                    },
					                    "item": {
					                        "color":"#FFF"
					                    },
					                    "line-color":"#FFF",
					                    alpha:0.6
					                },
					                plotarea:{
					                    height:"100%",
					                },
					                "series" : radar_series
					            };

					            zingchart.render({
					                id : 'radar',
					                data : myRadar,
					            });
					            document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
					            document.getElementById("radar").style.visibility = "visible";
					        }
					    }
					}

					function typeEffectivity(types_in, typename) {

					    var effectivity = [
					        [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
					        [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
					        [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
					        [1,1,1,0.5,0.5,0.5,1,0.5,0.5,1,1,2,1,1,1,1,1,2],
					        [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
					        [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
					        [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
					        [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
					        [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
					        [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
					        [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
					        [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
					        [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
					        [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
					        [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
					        [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
					        [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
					        [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1]
					    ];
					    var this_pokemon_index_array = [];
					    types_in.forEach(function (type) {
					        console.log(type)
					        console.log(types)
					        this_pokemon_index_array.push(parseInt(type));
					    })
					    function calculateEffectivity(attack_index_array, defense_index_array)
					    {
					        var effectivity_value = effectivity[attack_index_array[0]][defense_index_array[0]];
					        if (defense_index_array.length == 2) {
					            effectivity_value = effectivity_value*effectivity[attack_index_array[0]][defense_index_array[1]];
					        }
					        else if (attack_index_array.length == 2) {
					            effectivity_value = effectivity_value*effectivity[attack_index_array[1]][defense_index_array[0]];
					        }
					        if (effectivity_value == 0)
					        {
					            effectivity_value = 1
					        }
					        return effectivity_value;
					    }
					    var val_array = [
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([0],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([1],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([2],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([3],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([4],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([5],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([6],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([7],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([8],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([9],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([10],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([11],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([12],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([13],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([14],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([15],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([16],this_pokemon_index_array)],
					        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,calculateEffectivity([17],this_pokemon_index_array)],
					        [calculateEffectivity(this_pokemon_index_array,[0]),
					        calculateEffectivity(this_pokemon_index_array,[1]),
					        calculateEffectivity(this_pokemon_index_array,[2]),
					        calculateEffectivity(this_pokemon_index_array,[3]),
					        calculateEffectivity(this_pokemon_index_array,[4]),
					        calculateEffectivity(this_pokemon_index_array,[5]),
					        calculateEffectivity(this_pokemon_index_array,[6]),
					        calculateEffectivity(this_pokemon_index_array,[7]),
					        calculateEffectivity(this_pokemon_index_array,[8]),
					        calculateEffectivity(this_pokemon_index_array,[9]),
					        calculateEffectivity(this_pokemon_index_array,[10]),
					        calculateEffectivity(this_pokemon_index_array,[11]),
					        calculateEffectivity(this_pokemon_index_array,[12]),
					        calculateEffectivity(this_pokemon_index_array,[13]),
					        calculateEffectivity(this_pokemon_index_array,[14]),
					        calculateEffectivity(this_pokemon_index_array,[15]),
					        calculateEffectivity(this_pokemon_index_array,[16]),
					        calculateEffectivity(this_pokemon_index_array,[17]),
					        calculateEffectivity(this_pokemon_index_array,this_pokemon_index_array)]
					    ]

					    var myChord = {
					        "title" : {
					            visible:true,
					            "font-color": "#fff",
					            "font-family": 'Exo 2, sans-serif',
					            "text" : "Type Effectiveness",
					            "background-color":"transparent",
					            "font-size":"15",
					            height:"10%",
					            y:"-5%",
					            textAlign:"center"
					        },
					        "type": "chord",
					        "background-color": "transparent",
					        // "legend": {
					        //     "layout":"10x2",
					        //     "toggle-action": "none",
					        //     "border-width": 0,
					        //     "border-color": "none",
					        //     backgroundColor: "#116381",
					        //     "border-radius":"5vmin",
					        //     x: "70%",
					        //     y: "0%",
					        //     height:"85%",
					        //     "item": {
					        //         "font-color": "#fff",
					        //         "font-family": 'Exo 2, sans-serif',
					        //         "font-size": "15px",
					        //         "font-weight": "600",
					        //     },
					        // },
					        y:"5%",
					        "options": {
					            radius:"90%",
					            "band-space": 0,
					            "shadow": 0,
					            "border": "none",
					            "color-type":"palette",
					            "style":{
					                offsetY:"10%",
					                "chord":{
					                    "border-color":"none"
					                },
					                "tick":{
					                    visible: false
					                },
					                "item":{
					                    visible: false
					                },
					                "label": {
					                    visible: false
					                },
					                "tooltip":{
					                    "text-chord":"%text-source attacks %text-destination with effectivity  of x%value-source, <br>%text-destination attacks %text-source with effectivity of x%value-destination",
					                    "text":"Self-chord of item %text with value %value"
					                }
					            },
					            "palette":["#A8A878",
					                "#F08030",
					                "#6890F0",
					                "#F8D030",
					                "#78C850",
					                "#98D8D8",
					                "#C03028",
					                "#A040A0",
					                "#E0C068",
					                "#A890F0",
					                "#F85888",
					                "#A8B820",
					                "#B8A038",
					                "#705898",
					                "#7038F8",
					                "#705848",
					                "#B8B8D0",
					                "#EE99AC",
					                "#FFF"]
					        },
					        "series":[{
					            text:"Normal",
					            "values": val_array[0],
					            "style": {
					                "band": {
					                    "background-color": "#C6C6A7",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Fire",
					            "values": val_array[1],
					            "style": {
					                "band": {
					                    "background-color": "#9C531F",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Water",
					            "values": val_array[2],
					            "style": {
					                "band": {
					                    "background-color": "#445E9C",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Electric",
					            "values":val_array[3],
					            "style": {
					                "band": {
					                    "background-color": "#A1871F",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Grass",
					            "values":val_array[4],
					            "style": {
					                "band": {
					                    "background-color": "#4E8234",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Ice",
					            "values":val_array[5],
					            "style": {
					                "band": {
					                    "background-color": "#638D8D",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Fighting",
					            "values":val_array[6],
					            "style": {
					                "band": {
					                    "background-color": "#7D1F1A",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Poison",
					            "values":val_array[7],
					            "style": {
					                "band": {
					                    "background-color": "#682A68",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Ground",
					            "values":val_array[8],
					            "style": {
					                "band": {
					                    "background-color": "#927D44",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Flying",
					            "values": val_array[9],
					            "style": {
					                "band": {
					                    "background-color": "#6D5E9C",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Psychic",
					            "values": val_array[10],
					            "style": {
					                "band": {
					                    "background-color": "#A13959",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Bug",
					            "values": val_array[11],
					            "style": {
					                "band": {
					                    "background-color": "#6D7815",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Rock",
					            "values": val_array[12],
					            "style": {
					                "band": {
					                    "background-color": "#786824",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Ghost",
					            "values": val_array[13],
					            "style": {
					                "band": {
					                    "background-color": "#493963",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Dragon",
					            "values": val_array[14],
					            "style": {
					                "band": {
					                    "background-color": "#4924A1",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Dark",
					            "values": val_array[15],
					            "style": {
					                "band": {
					                    "background-color": "#49392F",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Steel",
					            "values": val_array[16],
					            "style": {
					                "band": {
					                    "background-color": "#787887",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:"Fairy",
					            "values": val_array[17],
					            "style": {
					                "band": {
					                    "background-color": "#9B6470",
					                    "alpha": 1
					                },
					            },
					        },{
					            text:typename,
					            "values": val_array[18],
					            "style": {
					                "band": {
					                    "background-color": "#FFF",
					                    "alpha": 1
					                },
					            },
					        }]
					    };
					    zingchart.render({
					        id : 'chord',
					        data : myChord,
					    });
					}

					function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
					    var nature_str=document.getElementById("nature").value.split(",");
					    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
					    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
					    console.log(stats_name)
					    console.log(nature)
					    var levels=[10,20,30,40,50,60,70,80,90,100];
					    var statsFinal = [];
					    var k;
					    for (var i = 0; i < stats_name.length; i++)
					    {
					        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
					        if (stats_name[i] == "1")
					        {
					            for (k=0; k < 10; k++)
					            {
					                temp[k]= Math.floor((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+levels[k]+10;
					                if (k == 9)
					                {
					                    statsFinal.push(temp)
					                }
					            }
					        }
					        else
					        {
					            for (k=0; k < 10; k++)
					            {
					                if (stats_name[i] == parseInt(nature[0]))
					                {
					                    console.log(stats_name[i])
					                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*1.1);
					                    if (k == 9)
					                    {
					                        statsFinal.push(temp)
					                    }
					                }
					                else if (stats_name[i] == parseInt(nature[1]))
					                {
					                    temp[k]= Math.floor((((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5)*0.9);
					                    if (k == 9)
					                    {
					                        statsFinal.push(temp)
					                    }
					                }
					                else
					                {
					                    temp[k]= Math.floor(((stats_value[i]*2+iv_values[i]+Math.floor(Math.ceil(Math.sqrt(effort_obj[i])))/4)/100*levels[k])+5);
					                    if (k == 9)
					                    {
					                        statsFinal.push(temp)
					                    }
					                }
					            }
					        }
					    }
					    var stats_graph_progress = [];
					    for (var p = 0; p < statsFinal.length; p++)
					    {
					        stats_graph_progress.push({
					            text: stats[stats_name[p]].text,
					            values: statsFinal[p],
					            backgroundColor: stats[stats_name[p]].color,
					            lineColor: stats[stats_name[p]].color,
					            marker:{
					                backgroundColor: stats[stats_name[p]].color,
					                borderColor: stats[stats_name[p]].color

					            },
					            "tooltip": {
					                "text": "%t at level %kt: %vt"
					            }
					        });
					    }
					    var statsProgression = {
					        "background-color": "transparent",
					        "title" : {
					            visible:true,
					            "font-color": "#fff",
					            "font-family": 'Exo 2, sans-serif',
					            "text" : "Stats Progression for " + pokename.charAt(0).toUpperCase() + pokename.slice(1),
					            "background-color":"transparent",
					            "font-size":"15",
					            height:"14.2857143%",
					            textAlign:"center"
					        },
					        "scale-x": {
					            "values": [],
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
					                "font-size":"12.5",
					                "font-color": "#fff",
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
					                "text": "Stat Value",
					                "font-family": 'Exo 2, sans-serif',
					                "font-weight": "normal",
					                "font-size":"12.5",
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
					        type: "area",
					        stacked: true,
					        height: "100%",
					        width: "100%",
					        plot:{
					            alphaArea: 0.6,
					            "animation": {
					                "delay": 0,
					                "effect": 1,
					                "speed": 1000,
					                "method": 0,
					                "sequence": 1
					            }
					        },
					        series : stats_graph_progress,
					    };
					    zingchart.render({
					        id : 'stats_progression',
					        data : statsProgression,
					    });
					}

					function accessDatabaseCHILD(ref_in,str,val_comp,callbackfunction,pass) {
					    ref_in.orderByChild(str).equalTo(val_comp).once("value").then(function(snapshot) {
					        var temp_database_array = [];
					        console.log(str+": "+snapshot.numChildren())
					        snapshot.forEach(function (snap_child) {
					            temp_database_array.push(snap_child.val());
					            if (temp_database_array.length == snapshot.numChildren())
					            {
					                if (pass) {
					                    callbackfunction(temp_database_array);
					                }
					                else
					                {
					                    callbackfunction();
					                }
					            }
					        })
					    });
					}


				/***/ },
				/* 3 */
				/***/ function(module, exports) {

					
					module.exports = function () {
					  return [
					  {
					    "name": "red-blue",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/1/",
					        "name": "red"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/2/",
					        "name": "blue"
					      }
					    ]
					  },
					  {
					    "name": "yellow",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/3/",
					        "name": "yellow"
					      }
					    ],
					  },
					  {
					    "name": "gold-silver",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/4/",
					        "name": "gold"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/5/",
					        "name": "silver"
					      }
					    ]
					  },
					  {
					    "name": "crystal",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/6/",
					        "name": "crystal"
					      }
					    ]
					  },
					  {
					    "name": "ruby-sapphire",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/7/",
					        "name": "ruby"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/8/",
					        "name": "sapphire"
					      }
					    ]
					  },
					  {
					    "name": "emerald",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/9/",
					        "name": "emerald"
					      }
					    ]
					  },
					  {
					    "name": "firered-leafgreen",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/10/",
					        "name": "firered"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/11/",
					        "name": "leafgreen"
					      }
					    ]
					  },
					  {
					    "name": "diamond-pearl",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/12/",
					        "name": "diamond"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/13/",
					        "name": "pearl"
					      }
					    ]
					  },
					  {
					    "name": "platinum",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/14/",
					        "name": "platinum"
					      }
					    ]
					  },
					  {
					    "name": "heartgold-soulsilver",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/15/",
					        "name": "heartgold"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/16/",
					        "name": "soulsilver"
					      }
					    ]
					  },
					  {
					    "name": "black-white",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/17/",
					        "name": "black"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/18/",
					        "name": "white"
					      }
					    ]
					  },
					  {
					    "name": "colosseum",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/19/",
					        "name": "colosseum"
					      }
					    ]
					  },
					  {
					    "name": "xd",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/20/",
					        "name": "xd"
					      }
					    ]
					  },
					  {
					    "name": "black-2-white-2",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/21/",
					        "name": "black-2"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/22/",
					        "name": "white-2"
					      }
					    ]
					  },
					  {
					    "name": "x-y",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/23/",
					        "name": "x"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/24/",
					        "name": "y"
					      }
					    ]
					  },
					  {
					    "name": "omega-ruby-alpha-sapphire",
					    "versions": [
					      {
					        "url": "http://pokeapi.co/api/v2/version/25/",
					        "name": "omega-ruby"
					      },
					      {
					        "url": "http://pokeapi.co/api/v2/version/26/",
					        "name": "alpha-sapphire"
					      }
					    ]
					  }
					]};

				/***/ },
				/* 4 */
				/***/ function(module, exports) {

					/**
					 * Created by tmartin on 7/8/16.
					 */

					module.exports = {
					    mkshape:makeShape,
					};




					function pathToPolygon(array) {
					    var pointsArray = [];
					    var currentLetter = "";
					    var position = 0;
					    var pointCount = 0; //CURVE
					    var curvePoints = [];
					    var coordinateCount = 0; //CURVE
					    var coordinateArray = []; //CURVE
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
					                    coordinateArray.push(parseFloat(value));
					                    coordinateCount++;
					                    if (coordinateCount == 6){
					                        coordinateArray.push(1);
					                        coordinateCount = 0;
					                        pointsArray.push(coordinateArray);
					                        coordinateArray = [];

					                    }
					                    // if (position == 0) {
					                    //     if (pointCount == 0)
					                    //     {
					                    //         curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
					                    //     }
					                    //     curvePoints.push([parseFloat(value)]);
					                    //     position = 1;
					                    // }
					                    // else {
					                    //     curvePoints[curvePoints.length-1].push(parseFloat(value));
					                    //     pointCount++;
					                    //     position = 0;
					                    //     if (pointCount == 3)
					                    //     {
					                    //         var vals = bezier(curvePoints);
					                    //         var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
					                    //         for (var t = 0; t < distance;t++) {
					                    //             pointsArray.push(vals(t/distance));
					                    //         }
					                    //         curvePoints = [];
					                    //         pointCount = 0;
					                    //     }
					                    // }
					                    //
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
					    var coordinateCount = 0; //CURVE
					    var coordinateArray = []; //CURVE
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
					                    coordinateArray.push(parseFloat(value));
					                    coordinateCount++;
					                    if (coordinateCount == 6){
					                        coordinateArray.push(1);
					                        coordinateCount = 0;
					                        pointsArray.push(coordinateArray);
					                        coordinateArray = [];

					                    }
					                    else {
					                        coordinateCount++;
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
					    if (path.getAttribute("class") == "ROUTE") {
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
					                },
					                zIndex:2,
					                cursor: "pointer"
					            };
					        }
					    }
					    else if (path.getAttribute("class") == "LAND") {
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
					                "shadow-angle":0,
					                "shadow-blur":"3px",
					                "shadow-color": "#082f3d",
					                "shadow-alpha": 1,
					                flat: true
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
					            zIndex:1
					        };
					    }
					    else if (path.getAttribute("class") == "LANDMARK") {
					         circleR = path.getAttribute("r").trim();
					         circleX = path.getAttribute("cx").trim();
					         circleY = path.getAttribute("cy").trim();
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
					            "hover-state": {
					                "borderColor": "#FFD700",
					                "backgroundColor": "#FFD700",
					            },
					            zIndex:1,
					            cursor: "pointer"
					        };
					    }
					}

				/***/ }
				/******/ ]);

			/***/ }
			/******/ ]);

		/***/ }
		/******/ ]);

	/***/ }
	/******/ ]);

/***/ }
/******/ ]);