const createEnumerableProperty = function(property) {
    return property;
};
const createNotEnumerableProperty = function(property) {
    return Symbol.for(property);
};
const createProtoMagicObject = function() {
    var f = function() { };
    var o = {};
    f.__proto__ = o;
    f.prototype = o;
    return f;
};
const incrementor = function() {
    if (!Function.prototype.value) Function.prototype.value = 0;
    if (!incrementor.hasOwnProperty('toString')) {
        incrementor.toString = function () {
            return Function.prototype.value;
        }
    }
    Function.prototype.value++;
    return incrementor;
};
const asyncIncrementor = function() {
    return new Promise(function(resolved, rejected) {
        if (!Function.prototype.valueOne) Function.prototype.valueOne = 0;
        if (!asyncIncrementor.hasOwnProperty('toString')) {
            asyncIncrementor.toString = function () {
                return Function.prototype.valueOne;
            }
        }
        Function.prototype.valueOne++;
        resolved();
    }).then(function() {
        return Function.prototype.valueOne;
    });
}
const createIncrementer = function() {
    var o = {
        value: 0,
        next: function() {
            if (this.value > -1) {
                return {
                    done: false,
                    value: ++this.value
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
    o[Symbol.iterator] = function() {
        return this;
    };
    return o;
}

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = function (property) {
    return new Promise(function(fulfilled) {
        setTimeout(function () {
            fulfilled(property);
        }, 1100);
    }).then(function(property) {
        return property;
    });
};

const getDeepPropertiesCount = function(obj) {
    var counter = 0;
    function count(obj) {
        for (var key in obj) {
            counter++;
            if (typeof obj[key] == 'object') count(obj[key]);
        }
    }
    count(obj);
    return counter;
};

const createSerializedObject = function() {
    return {
        valueOf: function () {
            return '';
        },
        toJSON: function () {
            return '';
        }
    }
}

const sortByProto = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i];
        var length = 0;
        while (temp.__proto__) {
            if (temp.__proto__ == Object.prototype) break;
            temp = temp.__proto__;
            length++;
        }
        arr[i].length = length;
    }
    arr.sort(function(a, b) {
       return b.length - a.length;
    });
    for (i = 0; i < arr.length; i++) {
        delete arr[i].length;
    }
    return arr;
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
