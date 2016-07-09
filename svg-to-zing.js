/**
 * Created by tmartin on 7/8/16.
 */
document.getElementById("sample-svg").onload = function () {
    var SVGObject = document.getElementById("sample-svg").contentDocument;
    var pathList = SVGObject.getElementsByTagName("path");
    var pathArray = Array.from(pathList);
    var shapesArray = [];
    pathArray.forEach(function (path) {
        shapesArray.push(makeShape(path));
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
    array.forEach(function (value) {
        if (isNaN(parseFloat(value))){
            currentLetter = value;
            if (currentLetter == "M" || currentLetter == "m")
            {
                pointsArray.push("null");
            }
        }
        else {
            switch (currentLetter) {
                case 'M':
                    if (position) {
                        pointsArray[pointsArray.length-1].push(parseFloat(value));
                        position = 0;
                    }
                    else {
                        pointsArray.push([parseFloat(value)]);
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
                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2))/10;
                            for (var t = 0; t < distance;t++) {
                                pointsArray.push(vals(t/distance));
                            }
                            curvePoints = [];
                        }
                    }
                    break;
                case 'A':
                    //handle arc
                    break;
            }
        }
    });
    if (currentLetter == "z" || currentLetter == "Z"){
        pointsArray.push([pointsArray[0][0],pointsArray[0][1]]);
    }
    return pointsArray;
}

function makeShape(path) {
    var points_in = [];
    if (path.getAttribute("d") != null) {
        points_in = pathToString(path.getAttribute("d").trim().split(/[\s,]+/));
    }
    var lineColor_in = "black";
    if (path.getAttribute("stroke") != null) {
        lineColor_in = path.getAttribute("stroke").trim();
    }
    var fillColor_in = "none";
    if (path.getAttribute("fill") != null) {
        fillColor_in = path.getAttribute("fill").trim();
    }
    return {
        type:"poly",
        borderWidth:10,
        borderColor:lineColor_in,
        borderWidth:10,
        backgroundColor:fillColor_in,
        points:points_in
    };
}