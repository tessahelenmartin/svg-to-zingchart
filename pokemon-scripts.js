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
var currentPokeID = null;
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
    // console.log(svg_stored)
    // console.log(shapes_stored)
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
            beginRoute(JSON.parse(svg_stored.getElementById(p.shapeid).getAttribute("locationid")));
        }
    };
    zingchart.legend_item_click = function(p) {
        document.getElementById("pokemon_image").src = "UI_images/holder.png";
        document.getElementById("radar").style.visibility = "hidden";
        var pokeText = zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex}).text;
        infoAboutSelectedPokemon(pokeText.slice(),zingchart.exec('CHARTDIV', 'getseriesdata', {'plotindex' : p.plotindex})["value-box"].text);
    };
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
    firebase.database().ref("location-area-methods/"+selected_areaID).once("value").then(function (snapMethods) {
        snapMethods.val().forEach(function (method_indiv) {
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
    accessDatabaseCHILD(firebase.database().ref("version-groups-regions"), "region_id", region_stored, function (version_groups) {
        for (var group = 0; group < version_groups.length; group++)
        {
            accessDatabaseCHILD(firebase.database().ref("version"), "version_group_id", version_groups[group]["version_group_id"], function (versions_in_group){
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
        if (possiblePokemonEncounters[p].pokemon_id > 10000)
        {
            if (p == possiblePokemonEncounters.length-1)
            {
                callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 9280].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, true);
            }
            else
            {
                callback_in(pokedex[possiblePokemonEncounters[p].pokemon_id - 9280].identifier, possiblePokemonEncounters[p].pokemon_id, possiblePokemonEncounters[p], colorArray, false);
            }
        }
        else
        {
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
}

function handlePokemon(pokemon_name, pokemon_id, pokemon, colorArray, boolval) {
    var rand = Math.floor(Math.random() * (colorArray.length-1));
    colorArray.splice(rand,1);
    if ((min == null) || pokemon.min_level < min) {
        min = pokemon.min_level;
    }
    if ((max == null) || pokemon.max_level > max) {
        max = pokemon.max_level;
    }

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
        var text = pokemonSERIES[p][0];
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
            JSONStorage.push([text,methodCatch,count,pokemonSERIES[p][4],pokemonSERIES[p][5]]);
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
                    backgroundColor: storedEncounter[3],
                    valueBox: {
                        visible:false,
                        text:storedEncounter[4]
                    }
                })
            });
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

function typeEffectivity(types_in) {

    var this_pokemon_index_array = [];
    types_in.forEach(function (type) {
        this_pokemon_index_array.push(parseInt(type)-1);
    });
    zingchart.render({
        width: "100%",
        height: "100%",
        margins: 0,
        backgroundColor: "transparent",
        data: {
            backgroundColor:"transparent",
            shapes: computeNetwork(this_pokemon_index_array)
        },
        overflow: "visible",
        id : 'typesZing',
    });
    window.onresize = function(){
        zingchart.exec('typesZing', 'setdata', {
            data : {
                backgroundColor: "transparent",
                shapes : computeNetwork(this_pokemon_index_array)
            }
        });
    };
}
function computeNetwork(this_pokemon_index_array) {
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
    function calculateEffectivity(attack_index, defense_index_array) {
        var effectivity_value = effectivity[defense_index_array[0]][attack_index];
        if (defense_index_array.length == 2) {
            effectivity_value = effectivity_value*effectivity[defense_index_array[1]][attack_index];
        }
        return effectivity_value;
    };
    var currentShapeArray = [{"type":"poly","shapeid":"branch-1","backgroundColor":"#ffffff","points":[[645,132.49899],[645,147.49899],[570,274.99902],[645,162.49899],[645,177.49899],[570,289.99902],[645,192.499],[645,207.499],[570,304.99903],[645,222.499],[645,237.49901],[570,319.99903],[645,252.49901],[645,267.49902],[570,334.99903],[645,282.49902],[645,297.49902],[570,349.99904],[645,312.49903],[645,327.49903],[570,364.99904],[645,342.49903],[645,357.49904],[570,379.99905],[645,372.49905],[645,387.49905],[570,394.99905],[645,402.49905],[645,417.49906],[570,409.99905],[645,432.49906],[645,447.49906],[570,424.99906],[645,462.49907],[645,477.49907],[570,439.99906],[645,492.49908],[645,507.49908],[570,454.99907],[645,522.49908],[645,537.49909],[570,469.99907],[645,552.49909],[645,567.49909],[570,484.99907],[645,582.4991],[645,597.4991],[570,499.99908],[645,612.49907],[645,627.49907],[570,514.99908],[645,642.49907],[645,657.49908],[495,402.49905],[395,402.49905],[395,387.49905],[495,387.49905],[645,132.49899]],"flat":true},{"type":"poly","shapeid":"attack-1-only","backgroundColor":"#a8a878","points":[[740,132.49986],[645,132.49986],[645,147.49986],[740,147.49986],[742.77,147.49986,745,145.26986,745,142.49986,1],[745,137.49986],[745,134.72986,742.77,132.49986,740,132.49986,1],[740,132.49986]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-only","backgroundColor":"#c03028","points":[[740,162.49985],[645,162.49985],[645,177.49985],[740,177.49985],[742.77,177.49985,745,175.26985,745,172.49985,1],[745,167.49985],[745,164.72985,742.77,162.49985,740,162.49985,1],[740,162.49985]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-only","backgroundColor":"#a890f0","points":[[740,192.49987],[645,192.49987],[645,207.49987],[740,207.49987],[742.77,207.49987,745,205.26987,745,202.49987,1],[745,197.49987],[745,194.72987,742.77,192.49987,740,192.49987,1],[740,192.49987]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-only","backgroundColor":"#a040a0","points":[[740,222.49987],[645,222.49987],[645,237.49988],[740,237.49988],[742.77,237.49988,745,235.26988,745,232.49988,1],[745,227.49988],[745,224.72988,742.77,222.49987,740,222.49987,1],[740,222.49987]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-only","backgroundColor":"#e0c068","points":[[740,252.49988],[645,252.49988],[645,267.49989],[740,267.49989],[742.77,267.49989,745,265.26989,745,262.49988,1],[745,257.49988],[745,254.72988,742.77,252.49988,740,252.49988,1],[740,252.49988]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-only","backgroundColor":"#b8a038","points":[[740,282.49989],[645,282.49989],[645,297.49989],[740,297.49989],[742.77,297.49989,745,295.26989,745,292.49989,1],[745,287.49989],[745,284.72989,742.77,282.49989,740,282.49989,1],[740,282.49989]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-only","backgroundColor":"#a8b820","points":[[740,312.4999],[645,312.4999],[645,327.4999],[740,327.4999],[742.77,327.4999,745,325.2699,745,322.4999,1],[745,317.4999],[745,314.7299,742.77,312.4999,740,312.4999,1],[740,312.4999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-only","backgroundColor":"#705898","points":[[740,342.4999],[645,342.4999],[645,357.49991],[740,357.49991],[742.77,357.49991,745,355.26991,745,352.49991,1],[745,347.49991],[745,344.72991,742.77,342.4999,740,342.4999,1],[740,342.4999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-only","backgroundColor":"#b8b8d0","points":[[740,372.49992],[645,372.49992],[645,387.49992],[740,387.49992],[742.77,387.49992,745,385.26992,745,382.49992,1],[745,377.49992],[745,374.72992,742.77,372.49992,740,372.49992,1],[740,372.49992]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-only","backgroundColor":"#f08030","points":[[740,402.49992],[645,402.49992],[645,417.49993],[740,417.49993],[742.77,417.49993,745,415.26993,745,412.49993,1],[745,407.49992],[745,404.72992,742.77,402.49992,740,402.49992,1],[740,402.49992]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-only","backgroundColor":"#6890f0","points":[[740,432.49993],[645,432.49993],[645,447.49993],[740,447.49993],[742.77,447.49993,745,445.26993,745,442.49993,1],[745,437.49993],[745,434.72993,742.77,432.49993,740,432.49993,1],[740,432.49993]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-only","backgroundColor":"#78c850","points":[[740,462.49994],[645,462.49994],[645,477.49994],[740,477.49994],[742.77,477.49994,745,475.26994,745,472.49994,1],[745,467.49994],[745,464.72994,742.77,462.49994,740,462.49994,1],[740,462.49994]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-only","backgroundColor":"#f8d030","points":[[740,492.49995],[645,492.49995],[645,507.49995],[740,507.49995],[742.77,507.49995,745,505.26995,745,502.49995,1],[745,497.49995],[745,494.72995,742.77,492.49995,740,492.49995,1],[740,492.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-only","backgroundColor":"#f85888","points":[[740,522.49995],[645,522.49995],[645,537.49996],[740,537.49996],[742.77,537.49996,745,535.26996,745,532.49996,1],[745,527.49995],[745,524.72995,742.77,522.49995,740,522.49995,1],[740,522.49995]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-only","backgroundColor":"#98d8d8","points":[[740,552.49996],[645,552.49996],[645,567.49996],[740,567.49996],[742.77,567.49996,745,565.26996,745,562.49996,1],[745,557.49996],[745,554.72996,742.77,552.49996,740,552.49996,1],[740,552.49996]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-only","backgroundColor":"#7038f8","points":[[740,582.49996],[645,582.49996],[645,597.49996],[740,597.49996],[742.77,597.49996,745,595.26996,745,592.49996,1],[745,587.49996],[745,584.72996,742.77,582.49996,740,582.49996,1],[740,582.49996]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-only","backgroundColor":"#705848","points":[[740,612.49998],[645,612.49998],[645,627.49998],[740,627.49998],[742.77,627.49998,745,625.26998,745,622.49998,1],[745,617.49998],[745,614.72998,742.77,612.49998,740,612.49998,1],[740,612.49998]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-only","backgroundColor":"#ee99ac","points":[[740,642.49998],[645,642.49998],[645,657.49999],[740,657.49999],[742.77,657.49999,745,655.26999,745,652.49998,1],[745,647.49998],[745,644.72998,742.77,642.49998,740,642.49998,1],[740,642.49998]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"branch-defend","backgroundColor":"#ffffff","points":[[145,132.49912],[145,147.49912],[220,274.99912],[145,162.49912],[145,177.49912],[220,289.99912],[145,192.49912],[145,207.49912],[220,304.99912],[145,222.49912],[145,237.49912],[220,319.99912],[145,252.49912],[145,267.49912],[220,334.99912],[145,282.49912],[145,297.49912],[220,349.99912],[145,312.49912],[145,327.49912],[220,364.99912],[145,342.49912],[145,357.49912],[220,379.99912],[145,372.49912],[145,387.49912],[220,394.99912],[145,402.49912],[145,417.49912],[220,409.99912],[145,432.49912],[145,447.49912],[220,424.99912],[145,462.49912],[145,477.49912],[220,439.99912],[145,492.49912],[145,507.49912],[220,454.99912],[145,522.49912],[145,537.49912],[220,469.99912],[145,552.49912],[145,567.49912],[220,484.99912],[145,582.49912],[145,597.49912],[220,499.99912],[145,612.49908],[145,627.49908],[220,514.99912],[145,642.49908],[145,657.49908],[295,402.49912],[395,402.499],[395,387.499],[295,387.49912],[145,132.49912]],"flat":true},{"type":"poly","shapeid":"defend-1","backgroundColor":"#a8a878","points":[[50,132.49999],[145,132.49999],[145,147.49999],[50,147.49999],[47.23,147.49999,45,145.26999,45,142.49999,1],[45,137.49999],[45,134.72999,47.23,132.49999,50,132.49999,1],[50,132.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-2","backgroundColor":"#c03028","points":[[50,162.49998],[145,162.49998],[145,177.49998],[50,177.49998],[47.23,177.49998,45,175.26998,45,172.49998,1],[45,167.49998],[45,164.72998,47.23,162.49998,50,162.49998,1],[50,162.49998]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-3","backgroundColor":"#a890f0","points":[[50,192.49999],[145,192.49999],[145,207.49999],[50,207.49999],[47.23,207.49999,45,205.26999,45,202.49999,1],[45,197.49999],[45,194.72999,47.23,192.49999,50,192.49999,1],[50,192.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-4","backgroundColor":"#a040a0","points":[[50,222.49999],[145,222.49999],[145,237.49999],[50,237.49999],[47.23,237.49999,45,235.26999,45,232.49999,1],[45,227.49999],[45,224.72999,47.23,222.49999,50,222.49999,1],[50,222.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-5","backgroundColor":"#e0c068","points":[[50,252.49999],[145,252.49999],[145,267.49999],[50,267.49999],[47.23,267.49999,45,265.26999,45,262.49999,1],[45,257.49999],[45,254.72999,47.23,252.49999,50,252.49999,1],[50,252.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-6","backgroundColor":"#b8a038","points":[[50,282.49999],[145,282.49999],[145,297.49999],[50,297.49999],[47.23,297.49999,45,295.26999,45,292.49999,1],[45,287.49999],[45,284.72999,47.23,282.49999,50,282.49999,1],[50,282.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-7","backgroundColor":"#a8b820","points":[[50,312.49999],[145,312.49999],[145,327.49999],[50,327.49999],[47.23,327.49999,45,325.26999,45,322.49999,1],[45,317.49999],[45,314.72999,47.23,312.49999,50,312.49999,1],[50,312.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-8","backgroundColor":"#705898","points":[[50,342.49999],[145,342.49999],[145,357.49999],[50,357.49999],[47.23,357.49999,45,355.26999,45,352.49999,1],[45,347.49999],[45,344.72999,47.23,342.49999,50,342.49999,1],[50,342.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-9","backgroundColor":"#b8b8d0","points":[[50,372.49999],[145,372.49999],[145,387.49999],[50,387.49999],[47.23,387.49999,45,385.26999,45,382.49999,1],[45,377.49999],[45,374.72999,47.23,372.49999,50,372.49999,1],[50,372.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-10","backgroundColor":"#f08030","points":[[50,402.49999],[145,402.49999],[145,417.49999],[50,417.49999],[47.23,417.49999,45,415.26999,45,412.49999,1],[45,407.49999],[45,404.72999,47.23,402.49999,50,402.49999,1],[50,402.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-11","backgroundColor":"#6890f0","points":[[50,432.49999],[145,432.49999],[145,447.49999],[50,447.49999],[47.23,447.49999,45,445.26999,45,442.49999,1],[45,437.49999],[45,434.72999,47.23,432.49999,50,432.49999,1],[50,432.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-12","backgroundColor":"#78c850","points":[[50,462.49999],[145,462.49999],[145,477.49999],[50,477.49999],[47.23,477.49999,45,475.26999,45,472.49999,1],[45,467.49999],[45,464.72999,47.23,462.49999,50,462.49999,1],[50,462.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-13","backgroundColor":"#f8d030","points":[[50,492.49999],[145,492.49999],[145,507.49999],[50,507.49999],[47.23,507.49999,45,505.26999,45,502.49999,1],[45,497.49999],[45,494.72999,47.23,492.49999,50,492.49999,1],[50,492.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-14","backgroundColor":"#f85888","points":[[50,522.49999],[145,522.49999],[145,537.49999],[50,537.49999],[47.23,537.49999,45,535.26999,45,532.49999,1],[45,527.49999],[45,524.72999,47.23,522.49999,50,522.49999,1],[50,522.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-15","backgroundColor":"#98d8d8","points":[[50,552.49999],[145,552.49999],[145,567.49999],[50,567.49999],[47.23,567.49999,45,565.26999,45,562.49999,1],[45,557.49999],[45,554.72999,47.23,552.49999,50,552.49999,1],[50,552.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-16","backgroundColor":"#7038f8","points":[[50,582.49998],[145,582.49998],[145,597.49998],[50,597.49998],[47.23,597.49998,45,595.26998,45,592.49998,1],[45,587.49998],[45,584.72998,47.23,582.49998,50,582.49998,1],[50,582.49998]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-17","backgroundColor":"#705848","points":[[50,612.49999],[145,612.49999],[145,627.49999],[50,627.49999],[47.23,627.49999,45,625.26999,45,622.49999,1],[45,617.49999],[45,614.72999,47.23,612.49999,50,612.49999,1],[50,612.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"defend-18","backgroundColor":"#ee99ac","points":[[50,642.49999],[145,642.49999],[145,657.49999],[50,657.49999],[47.23,657.49999,45,655.26999,45,652.49999,1],[45,647.49999],[45,644.72999,47.23,642.49999,50,642.49999,1],[50,642.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"branch-2","backgroundColor":"#ffffff","points":[[645,3.0000129],[540,181.50002],[435,387.50002],[395,387.49999],[395,402.49999],[435,402.50002],[540,608.49998],[645,786.99998],[645,776.49998],[592.5,687.24998],[645,765.99998],[645,755.49998],[592.5,676.74998],[645,744.99998],[645,734.49998],[592.5,666.24998],[645,723.99998],[645,713.49998],[592.5,655.74998],[645,702.99998],[645,692.49998],[592.5,645.24998],[645,681.99998],[645,671.49998],[592.5,634.74998],[645,660.99998],[645,650.49998],[592.5,624.24998],[645,639.99998],[645,629.49998],[592.5,613.74998],[645,618.99998],[645,608.49998],[592.5,603.25002],[645,598.00002],[645,587.50002],[592.5,592.75002],[645,577.00002],[645,566.50002],[592.5,582.25002],[645,556.00002],[645,545.50002],[592.5,571.75002],[645,535.00002],[645,524.50002],[592.5,561.25002],[645,514.00002],[645,503.50002],[592.5,550.75002],[645,493.00002],[645,482.50002],[592.5,540.25002],[645,472.00002],[645,461.50002],[592.5,529.75002],[645,451.00002],[645,440.50002],[592.49609,519.25588],[645,430.00002],[645,419.50002],[560.66406,562.87111],[440.375,395.00002],[560.66406,227.12892],[645,370.49989],[645,360.00002],[592.49609,270.74416],[645,349.50002],[645,339.00002],[592.5,260.25002],[645,328.50002],[645,318.00002],[592.5,249.75002],[645,307.50002],[645,297.00002],[592.5,239.25002],[645,286.50002],[645,276.00002],[592.5,228.75002],[645,265.50002],[645,255.00002],[592.5,218.25002],[645,244.50002],[645,234.00002],[592.5,207.75002],[645,223.50002],[645,213.00002],[592.5,197.25002],[645,202.50002],[645,192.00002],[592.5,186.75002],[645,181.50002],[645,171.00002],[592.5,176.25002],[645,160.50002],[645,150.00002],[592.5,165.75002],[645,139.50002],[645,129.00002],[592.5,155.25002],[645,118.50002],[645,108.00002],[592.5,144.75002],[645,97.500013],[645,87.000013],[592.5,134.25002],[645,76.500013],[645,66.000013],[592.5,123.75002],[645,55.500013],[645,45.000013],[592.5,113.25002],[645,34.500013],[645,24.000013],[592.5,102.75001],[645,13.500013],[645,3.0000129]],"flat":true},{"type":"poly","shapeid":"attack-1-second","backgroundColor":"#a8a878","points":[[741.49998,419.49835],[645,419.49835],[645,429.9984],[741.49998,429.9984],[743.43899,429.9984,745,428.43739,745,426.49838,1],[745,422.99836],[745,421.05935,743.43899,419.49835,741.49998,419.49835,1],[741.49998,419.49835]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-second","backgroundColor":"#c03028","points":[[741.49998,440.49843],[645,440.49843],[645,450.99849],[741.49998,450.99849],[743.43899,450.99849,745,449.43748,745,447.49846,1],[745,443.99845],[745,442.05944,743.43899,440.49843,741.49998,440.49843,1],[741.49998,440.49843]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-second","backgroundColor":"#a890f0","points":[[741.49998,461.49854],[645,461.49854],[645,471.99858],[741.49998,471.99858],[743.43899,471.99858,745,470.43758,745,468.49857,1],[745,464.99855],[745,463.05955,743.43899,461.49854,741.49998,461.49854,1],[741.49998,461.49854]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-second","backgroundColor":"#a040a0","points":[[741.49998,482.49863],[645,482.49863],[645,492.99868],[741.49998,492.99868],[743.43899,492.99868,745,491.43767,745,489.49866,1],[745,485.99865],[745,484.05964,743.43899,482.49863,741.49998,482.49863,1],[741.49998,482.49863]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-second","backgroundColor":"#e0c068","points":[[741.49998,503.49873],[645,503.49873],[645,513.99877],[741.49998,513.99877],[743.43899,513.99877,745,512.43776,745,510.49876,1],[745,506.99874],[745,505.05974,743.43899,503.49873,741.49998,503.49873,1],[741.49998,503.49873]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-second","backgroundColor":"#b8a038","points":[[741.49998,524.49883],[645,524.49883],[645,534.99887],[741.49998,534.99887],[743.43899,534.99887,745,533.43786,745,531.49885,1],[745,527.99884],[745,526.05982,743.43899,524.49883,741.49998,524.49883,1],[741.49998,524.49883]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-second","backgroundColor":"#a8b820","points":[[741.49998,545.49891],[645,545.49891],[645,555.99896],[741.49998,555.99896],[743.43899,555.99896,745,554.43796,745,552.49895,1],[745,548.99894],[745,547.05992,743.43899,545.49891,741.49998,545.49891,1],[741.49998,545.49891]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-second","backgroundColor":"#705898","points":[[741.49998,566.49901],[645,566.49901],[645,576.99906],[741.49998,576.99906],[743.43899,576.99906,745,575.43805,745,573.49905,1],[745,569.99902],[745,568.06002,743.43899,566.49901,741.49998,566.49901,1],[741.49998,566.49901]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-second","backgroundColor":"#b8b8d0","points":[[741.49998,587.4991],[645,587.4991],[645,597.99916],[741.49998,597.99916],[743.43899,597.99916,745,596.43815,745,594.49913,1],[745,590.99912],[745,589.06011,743.43899,587.4991,741.49998,587.4991,1],[741.49998,587.4991]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-second","backgroundColor":"#f08030","points":[[741.49998,608.49919],[645,608.49919],[645,618.99919],[741.49998,618.99919],[743.43899,618.99919,745,617.43829,745,615.49919,1],[745,611.99919],[745,610.06019,743.43899,608.49919,741.49998,608.49919,1],[741.49998,608.49919]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-second","backgroundColor":"#6890f0","points":[[741.49998,629.49929],[645,629.49929],[645,639.99939],[741.49998,639.99939],[743.43899,639.99939,745,638.43829,745,636.49929,1],[745,632.99929],[745,631.06029,743.43899,629.49929,741.49998,629.49929,1],[741.49998,629.49929]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-second","backgroundColor":"#78c850","points":[[741.49998,650.49939],[645,650.49939],[645,660.99939],[741.49998,660.99939],[743.43899,660.99939,745,659.43839,745,657.49939,1],[745,653.99939],[745,652.06039,743.43899,650.49939,741.49998,650.49939,1],[741.49998,650.49939]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-second","backgroundColor":"#f8d030","points":[[741.49998,671.49949],[645,671.49949],[645,681.99949],[741.49998,681.99949],[743.43899,681.99949,745,680.43849,745,678.49949,1],[745,674.99949],[745,673.06049,743.43899,671.49949,741.49998,671.49949,1],[741.49998,671.49949]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-second","backgroundColor":"#f85888","points":[[741.49998,692.49959],[645,692.49959],[645,702.99959],[741.49998,702.99959],[743.43899,702.99959,745,701.43859,745,699.49959,1],[745,695.99959],[745,694.06059,743.43899,692.49959,741.49998,692.49959,1],[741.49998,692.49959]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-second","backgroundColor":"#98d8d8","points":[[741.49998,713.49969],[645,713.49969],[645,723.99969],[741.49998,723.99969],[743.43899,723.99969,745,722.43869,745,720.49969,1],[745,716.99969],[745,715.06069,743.43899,713.49969,741.49998,713.49969,1],[741.49998,713.49969]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-second","backgroundColor":"#7038f8","points":[[741.49998,734.49979],[645,734.49979],[645,744.99979],[741.49998,744.99979],[743.43899,744.99979,745,743.43879,745,741.49979,1],[745,737.99979],[745,736.06079,743.43899,734.49979,741.49998,734.49979,1],[741.49998,734.49979]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-second","backgroundColor":"#705848","points":[[741.49998,755.49989],[645,755.49989],[645,765.99989],[741.49998,765.99989],[743.43899,765.99989,745,764.43889,745,762.49989,1],[745,758.99989],[745,757.06089,743.43899,755.49989,741.49998,755.49989,1],[741.49998,755.49989]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-second","backgroundColor":"#ee99ac","points":[[741.49998,776.49999],[645,776.49999],[645,786.99999],[741.49998,786.99999],[743.43899,786.99999,745,785.43899,745,783.49999,1],[745,779.99999],[745,778.06099,743.43899,776.49999,741.49998,776.49999,1],[741.49998,776.49999]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-1-first","backgroundColor":"#a8a878","points":[[741.49998,3.0000172],[645,3.0000172],[645,13.500067],[741.49998,13.500067],[743.43899,13.500067,745,11.939057,745,10.000047,1],[745,6.5000272],[745,4.5610172,743.43899,3.0000172,741.49998,3.0000172,1],[741.49998,3.0000172]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-2-first","backgroundColor":"#c03028","points":[[741.49998,24.000097],[645,24.000097],[645,34.500157],[741.49998,34.500157],[743.43899,34.500157,745,32.939147,745,31.000127,1],[745,27.500117],[745,25.561107,743.43899,24.000097,741.49998,24.000097,1],[741.49998,24.000097]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-3-first","backgroundColor":"#a890f0","points":[[741.49998,45.000207],[645,45.000207],[645,55.500247],[741.49998,55.500247],[743.43899,55.500247,745,53.939247,745,52.000237,1],[745,48.500217],[745,46.561217,743.43899,45.000207,741.49998,45.000207,1],[741.49998,45.000207]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-4-first","backgroundColor":"#a040a0","points":[[741.49998,66.000297],[645,66.000297],[645,76.500347],[741.49998,76.500347],[743.43899,76.500347,745,74.939337,745,73.000327,1],[745,69.500317],[745,67.561307,743.43899,66.000297,741.49998,66.000297,1],[741.49998,66.000297]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-5-first","backgroundColor":"#e0c068","points":[[741.49998,87.000397],[645,87.000397],[645,97.500437],[741.49998,97.500437],[743.43899,97.500437,745,95.939427,745,94.000427,1],[745,90.500407],[745,88.561407,743.43899,87.000397,741.49998,87.000397,1],[741.49998,87.000397]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-6-first","backgroundColor":"#b8a038","points":[[741.49998,108.0005],[645,108.0005],[645,118.50054],[741.49998,118.50054],[743.43899,118.50054,745,116.93953,745,115.00052,1],[745,111.50051],[745,109.56149,743.43899,108.0005,741.49998,108.0005,1],[741.49998,108.0005]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-7-first","backgroundColor":"#a8b820","points":[[741.49998,129.00058],[645,129.00058],[645,139.50063],[741.49998,139.50063],[743.43899,139.50063,745,137.93963,745,136.00062,1],[745,132.50061],[745,130.56159,743.43899,129.00058,741.49998,129.00058,1],[741.49998,129.00058]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-8-first","backgroundColor":"#705898","points":[[741.49998,150.00068],[645,150.00068],[645,160.50073],[741.49998,160.50073],[743.43899,160.50073,745,158.93972,745,157.00072,1],[745,153.50069],[745,151.56169,743.43899,150.00068,741.49998,150.00068,1],[741.49998,150.00068]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-9-first","backgroundColor":"#b8b8d0","points":[[741.49998,171.00077],[645,171.00077],[645,181.50083],[741.49998,181.50083],[743.43899,181.50083,745,179.93982,745,178.0008,1],[745,174.50079],[745,172.56178,743.43899,171.00077,741.49998,171.00077,1],[741.49998,171.00077]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-10-first","backgroundColor":"#f08030","points":[[741.49998,192.00087],[645,192.00087],[645,202.50091],[741.49998,202.50091],[743.43899,202.50091,745,200.93991,745,199.0009,1],[745,195.50088],[745,193.56188,743.43899,192.00087,741.49998,192.00087,1],[741.49998,192.00087]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-11-first","backgroundColor":"#6890f0","points":[[741.49998,213.00096],[645,213.00096],[645,223.50101],[741.49998,223.50101],[743.43899,223.50101,745,221.94,745,220.00099,1],[745,216.50098],[745,214.56197,743.43899,213.00096,741.49998,213.00096,1],[741.49998,213.00096]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-12-first","backgroundColor":"#78c850","points":[[741.49998,234.00106],[645,234.00106],[645,244.5011],[741.49998,244.5011],[743.43899,244.5011,745,242.94009,745,241.00109,1],[745,237.50107],[745,235.56207,743.43899,234.00106,741.49998,234.00106,1],[741.49998,234.00106]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-13-first","backgroundColor":"#f8d030","points":[[741.49998,255.00116],[645,255.00116],[645,265.5012],[741.49998,265.5012],[743.43899,265.5012,745,263.94019,745,262.00118,1],[745,258.50117],[745,256.56215,743.43899,255.00116,741.49998,255.00116,1],[741.49998,255.00116]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-14-first","backgroundColor":"#f85888","points":[[741.49998,276.00124],[645,276.00124],[645,286.50129],[741.49998,286.50129],[743.43899,286.50129,745,284.94029,745,283.00128,1],[745,279.50127],[745,277.56225,743.43899,276.00124,741.49998,276.00124,1],[741.49998,276.00124]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-15-first","backgroundColor":"#98d8d8","points":[[741.49998,297.00134],[645,297.00134],[645,307.50139],[741.49998,307.50139],[743.43899,307.50139,745,305.94038,745,304.00138,1],[745,300.50135],[745,298.56235,743.43899,297.00134,741.49998,297.00134,1],[741.49998,297.00134]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-16-first","backgroundColor":"#7038f8","points":[[741.49998,318.00143],[645,318.00143],[645,328.50145],[741.49998,328.50145],[743.43899,328.50145,745,326.94047,745,325.00145,1],[745,321.50144],[745,319.56242,743.43899,318.00143,741.49998,318.00143,1],[741.49998,318.00143]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-17-first","backgroundColor":"#705848","points":[[741.49998,339.00155],[645,339.00155],[645,349.50156],[741.49998,349.50156],[743.43899,349.50156,745,347.94058,745,346.00155,1],[745,342.50155],[745,340.56253,743.43899,339.00155,741.49998,339.00155,1],[741.49998,339.00155]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}},{"type":"poly","shapeid":"attack-18-first","backgroundColor":"#ee99ac","points":[[741.49998,360.00166],[645,360.00166],[645,370.50166],[741.49998,370.50166],[743.43899,370.50166,745,368.94068,745,367.00166,1],[745,363.50166],[745,361.56264,743.43899,360.00166,741.49998,360.00166,1],[741.49998,360.00166]],"alpha":1,"shadow":false,"hoverState":{"shadowColor":"#fff","shadow":true,"shadowDistance":5},"tooltip":{"backgroundColor":"#FFF","borderRadius":"5px","font-family":"Exo 2, sans-serif","text":"","visible":true,"maxWidth":"100%","wrapText":true}}];
    for (var shape_index = 0; shape_index < currentShapeArray.length; shape_index++)
    {
        var currentShape = currentShapeArray[shape_index]
        var e_multiple = 0;
        if (currentShape.shapeid != null)
        {
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
                                point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
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
                                point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                            }
                        }
                    })
                }
            }
            else if (currentShape_id[0]=="attack")
            {
                if (this_pokemon_index_array.length == 1)
                {
                    if (currentShape_id[2]=="only")
                    {
                        e_multiple = calculateEffectivity(this_pokemon_index_array[0],[currentShape_id[1]-1]);
                        currentShape.tooltip.text = types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1) + " type moves inflict x" + e_multiple*1.5 + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                                    }
                                }
                            })
                        }
                    }
                    else
                    {
                        currentShapeArray.splice(shape_index,1)
                        shape_index--;
                    }
                }
                else if (this_pokemon_index_array.length == 2)
                {
                    if (currentShape_id[2]=="first") {
                        e_multiple = calculateEffectivity(this_pokemon_index_array[0],[currentShape_id[1]-1]);
                        currentShape.tooltip.text = types[this_pokemon_index_array[0]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[0]+1].identifier.slice(1) + " type moves inflict x" + e_multiple*1.5 + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                                    }
                                }
                            })
                        }
                    }
                    else if (currentShape_id[2]=="second") {
                        e_multiple = calculateEffectivity(this_pokemon_index_array[1],[currentShape_id[1]-1]);
                        currentShape.tooltip.text = types[this_pokemon_index_array[1]+1].identifier.charAt(0).toUpperCase() + types[this_pokemon_index_array[1]+1].identifier.slice(1) + " type moves inflict x" + e_multiple*1.5 + " damage on " + types[currentShape_id[1]].identifier.charAt(0).toUpperCase() + types[currentShape_id[1]].identifier.slice(1) + " type pokemon";
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
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
                                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
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
                                point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                            }
                        }
                    })}
                else if (currentShape_id[1]==this_pokemon_index_array.length)
                {
                    currentShape.points.forEach(function (point_array) {
                        if (point_array != null) {
                            for (var pt = 0; point_array.length > pt; pt++) {
                                point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                            }
                        }
                    })
                }
                else {
                    currentShapeArray.splice(shape_index, 1)
                    shape_index--;
                }
            }
        }
        else
        {
            currentShape.points.forEach(function (point_array) {
                if (point_array != null) {
                    for (var pt = 0; point_array.length > pt; pt++) {
                        point_array[pt] *= (document.getElementById("typesZing").offsetHeight)/790
                    }
                }
            })
        }
    };
    return currentShapeArray;
}

function render_stats_graph(pokename,stats_name, stats_value, effort_obj) {
    var nature_str=document.getElementById("nature").value.split(",");
    var nature= [parseInt(nature_str[0]),parseInt(nature_str[1])];
    var iv_values = [parseInt(document.getElementById("HP").value), parseInt(document.getElementById("attack").value), parseInt(document.getElementById("defense").value), parseInt(document.getElementById("s_attack").value), parseInt(document.getElementById("s_defense").value), parseInt(document.getElementById("speed").value)];
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


