/**
 * Created by tmartin on 7/12/16.
 */
var versions = require('./versions');
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
    "1": 'HP',
    "2": 'Attack',
    "3": 'Defense',
    "4": 'S. Attack',
    "5": 'S. Defense',
    "6": 'Speed',
    "7": 'Accuracy',
    "8": 'Evasion'
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
                    "effect": 3,
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
            stats_name_obj.push(stats[pokemon_stats[q].stat_id]);
            stats_value_obj.push(pokemon_stats[q].base_stat);
            effort_obj.push(pokemon_stats[q].effort);
            if (q == pokemon_stats.length-1) {
                render_stats_graph(stats_name, stats_value, effort_obj);
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
    max_Val = Math.ceil(Math.max(...stats_value)/25)*25;
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
        "series" : [
            {
                "values" : [stats_value[0],null,null,null,null,null],
                "data-band" : [stats_name[0],null,null,null,null,null],
                "target" : "_blank",
                "background-color":"#8b1a1a",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#8b1a1a",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[0]
            },
            {
                "values" : [null,stats_value[1],null,null,null,null],
                "data-band" : [null,stats_name[1],null,null,null,null],
                "target" : "_blank",
                "background-color":"#ff7f00",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#ff7f00",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[1]
            },
            {
                "values" : [null,null,stats_value[2],null,null,null],
                "data-band" : [null,null,stats_name[2],null,null,null],
                "target" : "_blank",
                "background-color":"#daa520",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#daa520",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[2]
            },
            {
                "values" : [null,null,null,stats_value[3],null,null],
                "data-band" : [null,null,null,stats_name[3],null,null],
                "target" : "_blank",
                "background-color":"OliveDrab",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"OliveDrab",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[3]
            },
            {
                "values" : [null,null,null,null,stats_value[4],null],
                "data-band" : [null,null,null,null,stats_name[4],null],
                "target" : "_blank",
                "background-color":"#27408b",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#27408b",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[4]
            },
            {
                "values" : [null,null,null,null,null,stats_value[5]],
                "data-band" : [null,null,null,null,null,stats_name[5]],
                "target" : "_blank",
                "background-color":"#551a8b",
                "tooltip": {
                    "text":"%data-band: %v",
                    "background-color":"#551a8b",
                    "color":"#FFF",
                    "font-size":"14px"
                },
                "text":stats_name[5]
            },
        ],
    };

    zingchart.render({
        id : 'radar',
        data : myRadar,
    });
    document.getElementById("pokemon_image").src = "sugimori/"+id_in+".png";
    document.getElementById("radar").style.visibility = "visible";
    // document.getElementById("loading").style.visibility = "hidden";
}

function typeEffectivity(types_in, typename) {
    var this_pokemon_index_array = [];
    types_in.forEach(function (type) {
        this_pokemon_index_array.push(type-1);
    })
    var effectivity = [
        [1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1],
        [1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1],
        [1,   2, 0.5,   1, 0.5,   1,   1,   1,   2,   1,   1,   1,   2,   1, 0.5,   1,   1,   1],
        [1,   1,   2, 0.5, 0.5,   1,   1,   1,   0,   2,   1,   1,   1,   1, 0.5,   1,   1,   1],
        [1, 0.5,   2,   1, 0.5,   1,   1, 0.5,   2, 0.5,   1, 0.5,   2,   1, 0.5,   1, 0.5,   1],
        [1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   2,   2,   1,   1,   1,   1,   2,   1, 0.5,   1],
        [2,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5],
        [1,   1,   1,   1,   2,   1,   1, 0.5, 0.5,   1,   1,   1, 0.5, 0.5,   1,   1, 0.5,   2],
        [1,   2,   1,   2, 0.5,   1,   1,   2,   1,   0,   1, 0.5,   2,   1,   1,   1,   2,   1],
        [1,   1,   1, 0.5,   2,   1,   2,   1,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1],
        [1,   1,   1,   1,   1,   1,   2,   2,   1,   1, 0.5,   1,   1,   1,   1,   0, 0.5,   1],
        [1, 0.5,   1,   1,   2,   1, 0.5, 0.5,   1, 0.5,   2,   1,   1, 0.5,   1,   2, 0.5, 0.5],
        [1,   2,   1,   1,   1,   2, 0.5,   1, 0.5,   2,   1,   2,   1,   1,   1,   1, 0.5,   1],
        [0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1],
        [1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0],
        [1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1, 0.5],
        [1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2],
        [1, 0.5,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   1,   2,   2, 0.5,   1],
    ];
    function calculateEffectivity(attack_index_array, defense_index_array)
    {
        var effectivity_value = effectivity[defense_index_array[0]][attack_index_array[0]];
        if (defense_index_array.length == 2) {
            effectivity_value = effectivity_value*effectivity[defense_index_array[1]][attack_index_array[0]];
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

function render_stats_graph(stats_name, stats_value, effort_obj) {
    var levels=[0,10,20,30,40,50,60,70,80,90,100]
    var values=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0]
    var statsFinal = [];
    for (i = 0; i < stats_value.length; i++)
    {
        statsFinal
        for (k=0; k < 11; k++)
        {
            values[k]= (stats_value[]*2+(Math.sqrt(effort_obj)))
        }
    }
    var statsProgression = {
        type: "area",
        stacked: true,
        plot:{
            aspect: "stepped",
            alphaArea: 0.6
        },
        series : [
        ]
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


//"location-area-methods" : [ null, [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], null, null, null, null, null, [ 1 ], null, null, null, null, null, [ 1 ], null, null, null, null, null, [ 1 ], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], null, [ 1, 2, 3, 4, 5 ], null, [ 1 ], null, null, [ 2, 3, 4, 5, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], null, [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 6 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], null, [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5, 6 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5, 6 ], [ 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 6 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 6 ], [ 1 ], [ 1 ], null, [ 1, 2, 3, 4, 5, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6 ], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 6 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5, 6 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 6 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 6 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6 ], [ 1, 6 ], [ 1, 2, 3, 4, 5, 6 ], [ 1 ], [ 1, 6 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 6 ], [ 1 ], [ 1, 6 ], [ 1, 6 ], [ 1, 6 ], [ 1, 6 ], [ 1, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5, 6 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1, 6 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 4, 5 ], [ 4, 5 ], null, [ 1, 8 ], [ 1, 8 ], [ 1, 8 ], [ 1, 4, 5, 8 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], null, null, null, [ 1 ], [ 1 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 8 ], [ 1, 4, 5 ], [ 1, 8 ], [ 1, 4, 5, 8 ], [ 1, 4, 5 ], null, null, [ 1, 4, 5, 8 ], null, [ 1, 4, 5, 8 ], [ 1 ], [ 1, 4, 5, 8 ], [ 1, 4, 5 ], [ 1, 4, 5 ], [ 1, 8 ], null, [ 1 ], [ 1 ], null, [ 1 ], [ 1 ], [ 1 ], [ 1 ], null, null, [ 1, 8 ], [ 1 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1 ], [ 1, 4, 5, 8 ], [ 1, 8 ], [ 1, 4, 5, 8 ], [ 1, 4, 5, 8 ], [ 1, 4, 5, 8 ], [ 1, 8 ], [ 1, 8 ], [ 1, 4, 5, 8 ], [ 1, 4, 5, 8 ], [ 4, 5 ], [ 4, 5 ], [ 1, 8 ], [ 4, 5 ], [ 4, 5 ], [ 4, 5 ], [ 1 ], [ 1, 4, 5 ], [ 1, 8 ], [ 1, 4, 5, 8 ], [ 1 ], [ 1, 4, 5 ], [ 1, 8 ], [ 1 ], [ 1, 4, 5 ], [ 1, 4, 5, 8 ], [ 1 ], [ 1, 4, 5 ], [ 1, 4, 5 ], [ 4, 5 ], [ 1, 4, 5 ], [ 1, 4, 5 ], [ 1, 8 ], [ 1, 8 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1, 4, 5 ], [ 1 ], [ 1, 4, 5, 8 ], [ 1, 4, 5 ], null, [ 1, 4, 5, 8 ], [ 1, 4, 5, 8 ], [ 4, 5 ] ],

// def calculated_stat(base_stat, level, iv, effort, nature=None):
// """Returns the calculated stat -- i.e. the value actually shown in the game
// on a Pokémon's status tab.
// """
//
// # Remember: this is from C; use floor division!
//     stat = (base_stat * 2 + iv + effort // 4) * level // 100 + 5
//
// if nature:
// stat = int(stat * nature)
//
// return stat
//
// def calculated_hp(base_stat, level, iv, effort, nature=None):
// """Similar to `calculated_stat`, except with a slightly different formula
// used specifically for HP.
//     """
//
// # Shedinja's base stat of 1 is special; its HP is always 1
// if base_stat == 1:
// return 1
//
// return (base_stat * 2 + iv + effort // 4) * level // 100 + 10 + level
