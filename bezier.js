function bezier(pts) {
	return function (t) {
		for (var a = pts; a.length > 1; a = b)  // do..while loop in disguise
			for (var i = 0, b = [], j; i < a.length - 1; i++)  // cycle over control points
				for (b[i] = [], j = 0; j < a[i].length; j++)  // cycle over dimensions
					b[i][j] = a[i][j] * (1 - t) + a[i+1][j] * t;  // interpolation
		return a[0];
	}
}

/* example usage:
var b = bezier([[0, 0, 0], [1, 1, 1], [2, -3, 6]]);
for (var t = 0; t <= 10; t++) console.log(b(t/10));
*/