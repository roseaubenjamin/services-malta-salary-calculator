
var convert = { 
	single : [{
        from: 0,
        to: 9100,
        rate: 0,
        subtract: 0
    }, {
        from: 9101,
        to: 14500,
        rate: .15,
        subtract: 1365
    }, {
        from: 14501,
        to: 19500,
        rate: .25,
        subtract: 2815
    }, {
        from: 19501,
        to: 6e4,
        rate: .25,
        subtract: 2725
    }, {
        from: 60001,
        to: 1 / 0,
        rate: .35,
        subtract: 8725
    }],
    married: [{
        from: 0,
        to: 12700,
        rate: 0,
        subtract: 0
    }, {
        from: 12701,
        to: 21200,
        rate: .15,
        subtract: 1905
    }, {
        from: 21201,
        to: 28700,
        rate: .25,
        subtract: 4025
    }, {
        from: 28701,
        to: 6e4,
        rate: .25,
        subtract: 3905
    }, {
        from: 60001,
        to: 1 / 0,
        rate: .35,
        subtract: 9905
    }] , 
    parent: [{
        from: 0,
        to: 10500,
        rate: 0,
        subtract: 0
    }, {
        from: 10501,
        to: 15800,
        rate: .15,
        subtract: 1575
    }, {
        from: 15801,
        to: 21200,
        rate: .25,
        subtract: 3155
    }, {
        from: 21201,
        to: 6e4,
        rate: .25,
        subtract: 3050
    }, {
        from: 60001,
        to: 1 / 0,
        rate: .35,
        subtract: 9050
    }]
}

var beable = [{
    from: 6.62,
    to: 175.84,
    fixed: 6.62,
    isAdult: !1,
    isBetween: !0,
    isStudent: !1
}, {
    from: 17.58,
    to: 175.84,
    fixed: 17.58,
    isAdult: !0,
    isBetween: !0,
    isStudent: !1
}, {
    from: 175.85,
    to: 356.96,
    rate: .1,
    isBetween: !0,
    isBornBefore: !0,
    isStudent: !1
}, {
    from: 356.97,
    fixed: 35.7,
    isBetween: !0,
    isBornBefore: !0,
    isStudent: !1
}, {
    from: 175.85,
    to: 465.27,
    rate: .1,
    isBornBefore: !1,
    isStudent: !1,
    isBetween: !0
}, {
    from: 465.28,
    fixed: 46.53,
    isBornBefore: !1,
    isStudent: !1,
    isBetween: !0
}, {
    isAdult: !1,
    isStudent: !0,
    rate: .1,
    max: 4.38
}, {
    isAdult: !0,
    isStudent: !0,
    rate: .1,
    max: 7.94
}] ; 

var tax = function( a, b ){
    var c = b.find(function(i) {
	  	return i.from <= a && i.to >= a
	});
    return Math.max(0, a * c.rate - c.subtract)
}

var c = function(a, c) {
    var d = a.isStudent,
        e = a.isAdult,
        f = a.isBornBefore,
        g = {};
    for (var h in beable) {
        var i = beable[h],
            j = i.from || 0,
            k = i.to || 1 / 0;
        if (i.hasOwnProperty("isBetween")) {
            if (i.isBetween && (j > c || c > k)) continue;
            if (!i.isBetween && k > c) continue
        }
        if (i.hasOwnProperty("isAdult")) {
            if (i.isAdult && !e) continue;
            if (!i.isAdult && e) continue
        }
        if (i.hasOwnProperty("isBornBefore")) {
            if (i.isBornBefore && !f) continue;
            if (!i.isBornBefore && f) continue
        }
        if (i.hasOwnProperty("isStudent")) {
            if (i.isStudent && !d) continue;
            if (!i.isStudent && d) continue
        }
        g = i;
        break
    }
    var l = 0;
    return g.hasOwnProperty("fixed") && (l = g.fixed), g.hasOwnProperty("rate") && (l = g.rate * c, g.hasOwnProperty("max") && (l = Math.min(l, g.max))), 4 * l
};

var calculator = function ( a, b, e ) {
	var f = 0,
        g = 0;
    a = +a;
    var h = [{
        value: 121.16
    }, {
        value: 135.1
    }, {
        value: 121.16
    }, {
        value: 135.1
    }]; 
    const reducer = (accumulator, currentValue) => {
    	if ( accumulator && accumulator.value ) {
    		return accumulator.value + currentValue.value
    	}
    	return accumulator + currentValue.value
    } ;
    var i = h.reduce(reducer) ; 
    var j = tax( a, convert[e] ) ; 
    var k = ( tax(a + i, convert[e] ), a / 52);
    var f = c(b, k) ;
    var g = a - (f / 4 * 52 + j) ;
    var l = {
        weekly: {
            gross: a / 52,
            ni: f / 4,
            tax: j / 52,
            net: g / 52,
            bonus: i / 52
        },
        monthly: {
            gross: a / 12,
            ni: f / 4 * 52 / 12,
            tax: j / 12,
            net: g / 12,
            bonus: i / 12
        },
        yearly: {
            gross: a,
            ni: f / 4 * 52,
            tax: j,
            net: g,
            bonus: i
        }
    };
    return l
}

export default calculator ; 