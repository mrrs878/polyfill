//----------------------------------------------------------------------
//
// ECMAScript "Harmony" Polyfills
//
//----------------------------------------------------------------------

(function (global) {
  "use strict";

  //
  // Tentatively approved proposals
  // http://wiki.ecmascript.org/doku.php?id=harmony:proposals
  //

  //----------------------------------------
  // Identity Testing
  //----------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=harmony:egal
  if (!Object.is) {
    Object.defineProperty(
      Object,
      'is',
      {
        value: function (x, y) {
          if (x === y) {
            // 0 === -0, but they are not identical
            return x !== 0 || 1 / x === 1 / y;
          }

          // NaN !== NaN, but they are identical.
          // NaNs are the only non-reflexive value, i.e., if x !== x,
          // then x is a NaN.
          // isNaN is broken: it converts its argument to number, so
          // isNaN("foo") => true
          //return x !== x && y !== y;
          return Number.isNaN(x) && Number.isNaN(y);
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  if (!Object.isnt) {
    Object.defineProperty(
      Object,
      'isnt',
      {
        value: function isnt(x, y) { return !Object.is(x, y); },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }


  //----------------------------------------
  // Number improvements
  //----------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=harmony:number.isfinite
  if (!Number.isFinite) {
    (function () {
      var global_isFinite = global.isFinite;
      Object.defineProperty(
        Number,
        'isFinite',
        {
          value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:number.isnan
  if (!Number.isNaN) {
    (function () {
      var global_isNaN = global.isNaN;
      Object.defineProperty(
        Number,
        'isNaN',
        {
          value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
  if (!Number.isInteger) {
    (function () {
      var floor = Math.floor,
          isFinite = global.isFinite;

      Object.defineProperty(
        Number,
        'isInteger',
        {
          value: function isInteger(value) {
            return typeof value === 'number' && isFinite(value) &&
              value > -9007199254740992 && value < 9007199254740992 &&
              floor(value) === value;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger
  if (!Number.toInteger) {
    (function () {
      var abs = Math.abs,
          floor = Math.floor,
          isFinite = global.isFinite,
          isNaN = global.isNaN;

      function sign(n) { return (n < 0) ? -1 : 1; }

      Object.defineProperty(
        Number,
        'toInteger',
        {
          value: function toInteger(value) {
            var n = +value;
            if (isNaN(n)) {
              return +0;
            } else if (n === 0 || !isFinite(n)) {
              return n;
            } else {
              return sign(n) * floor(abs(n));
            }
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }


  //----------------------------------------
  // String improvements
  //----------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=harmony:string.prototype.repeat
  if (!String.prototype.repeat) {
    // var ToInteger = Number.toInteger;

    Object.defineProperty(
      String.prototype,
      'repeat',
      {
        value: function (count) {
          // var string = '' + this;
          // count = ToInteger(count);
          // var result = ';
          // while (--count >= 0) {
          //     result += string;
          // }
          // return result;

          count = Number.toInteger(count);
          var a = [];
          a.length = count + 1;
          return a.join(String(this));
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
  if (!String.prototype.startsWith) {
    Object.defineProperty(
      String.prototype,
      'startsWith',
      {
        value: function startsWith(s) {
          return String(this).indexOf(s) === 0;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
  if (!String.prototype.endsWith) {
    Object.defineProperty(
      String.prototype,
      'endsWith',
      {
        value: function endsWith(s) {
          var t = String(s);
          return String(this).lastIndexOf(t) === (this.length - t.length);
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
  if (!String.prototype.contains) {
    Object.defineProperty(
      String.prototype,
      'contains',
      {
        value: function contains(searchString, position) {
          return String(this).indexOf(searchString, position) !== -1;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
  if (!String.prototype.toArray) {
    Object.defineProperty(
      String.prototype,
      'toArray',
      {
        value: function toArray() {
          return String(this).split('');
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }


  //----------------------------------------
  // Math improvements
  //----------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.log10) {
    (function () {
      var log = Math.log,
          LOG10E = Math.LOG10E;

      Object.defineProperty(
        Math,
        'log10',
        {
          value: function log10(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return log(x) * LOG10E;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.log2) {
    (function () {
      var log = Math.log,
          LOG2E = Math.LOG2E;

      Object.defineProperty(
        Math,
        'log2',
        {
          value: function log2(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return log(x) * LOG2E;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.log1p) {
    (function () {
      var log = Math.log,
          abs = Math.abs;

      Object.defineProperty(
        Math,
        'log1p',
        {
          value: function log1p(x) {
            x = (typeof x !== 'number') ? NaN : x;
            // from: http://www.johndcook.com/cpp_expm1.html
            if (x <= -1) {
              return -Infinity;
            } else if (Object.is(x, -0)) {
              return -0;
            } else if (abs(x) > 1e-4) {
              return log(1 + x);
            } else {
              return (-0.5 * x + 1) * x;
            }
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.expm1) {
    (function () {
      var exp = Math.exp;

      Object.defineProperty(
        Math,
        'expm1',
        {
          value: function expm1(x) {
            x = (typeof x !== 'number') ? NaN : x;
            // from: http://www.johndcook.com/cpp_log1p.html
            if (Object.is(x, -0)) {
              return -0;
            } else if (x === -Infinity) {
              return 1;
            } else if (Math.abs(x) < 1e-5) {
              return x + 0.5 * x * x; // two terms of Taylor expansion
            } else {
              return exp(x) - 1;
            }
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.cosh) {
    (function () {
      var pow = Math.pow,
          E = Math.E;

      Object.defineProperty(
        Math,
        'cosh',
        {
          value: function cosh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return (pow(E, x) + pow(E, -x)) / 2;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.sinh) {
    (function () {
      var pow = Math.pow,
          E = Math.E;

      Object.defineProperty(
        Math,
        'sinh',
        {
          value: function sinh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return Object.is(x, -0) ? x : (pow(E, x) - pow(E, -x)) / 2;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.tanh) {
    (function () {
      var pow = Math.pow,
          E = Math.E;

      Object.defineProperty(
        Math,
        'tanh',
        {
          value: function tanh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            var n = pow(E, 2 * x) - 1,
                d = pow(E, 2 * x) + 1;
            return (n === d) ? 1 : n / d; // Handle Infinity/Infinity
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.acosh) {
    (function () {
      var log = Math.log,
          sqrt = Math.sqrt;

      Object.defineProperty(
        Math,
        'acosh',
        {
          value: function acosh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return log(x + sqrt(x * x - 1));
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.asinh) {
    (function () {
      var log = Math.log,
          sqrt = Math.sqrt;

      Object.defineProperty(
        Math,
        'asinh',
        {
          value: function asinh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            if (Object.is(x, -0)) {
              return x;
            }
            var s = sqrt(x * x + 1);
            return (s === -x) ? log(0) : log(x + s);
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.atanh) {
    (function () {
      var log = Math.log;

      Object.defineProperty(
        Math,
        'atanh',
        {
          value: function atanh(x) {
            x = (typeof x !== 'number') ? NaN : x;
            return (x === 0) ? x : log((1 + x) / (1 - x)) / 2;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.hypot) {
    (function () {
      var sqrt = Math.sqrt,
          abs = Math.abs;

      Object.defineProperty(
        Math,
        'hypot',
        {
          value: function hypot(x, y) {
            var tmp, d;
            x = (typeof x !== 'number') ? NaN : x;
            y = (typeof y !== 'number') ? NaN : y;
            if (abs(x) < abs(y)) {
              tmp = x; x = y; y = tmp;
            }
            d = (x === y) ? 1 : y / x;
            return abs(x) * sqrt(1 + d * d);
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.trunc) {
    (function () {
      var ceil = Math.ceil,
          floor = Math.floor;
      Object.defineProperty(
        Math,
        'trunc',
        {
          value: function trunc(x) {
            if (typeof (x) !== 'number') { return NaN; }
            return x < 0 ? ceil(x) : floor(x);
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }

  // http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions
  if (!Math.sign) {
    (function () {
      Object.defineProperty(
        Math,
        'sign',
        {
          value: function sign(x) {
            return typeof (x) !== 'number' || isNaN(x) ? NaN :
              x < 0 ? -1 :
              x > 0 ? 1 : x;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      );
    }());
  }


  //----------------------------------------
  // Collections: Maps, Sets, and WeakMaps
  //----------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
  global.Map = global.Map || function Map() {
    if (!(this instanceof Map)) { return new Map(); }
    var keys = [], vals = [];
    function indexOfIdentical(keys, key) {
      var i;
      for (i = 0; i < keys.length; i += 1) {
        if (Object.is(keys[i], key)) { return i; }
      }
      return -1;
    }
    Object.defineProperties(
      this,
      {
        'get': {
          value: function get(key) {
            var i = indexOfIdentical(keys, key);
            return i < 0 ? undefined : vals[i];
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'has': {
          value: function has(key) {
            return indexOfIdentical(keys, key) >= 0;
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'set': {
          value: function set(key, val) {
            var i = indexOfIdentical(keys, key);
            if (i < 0) { i = keys.length; }
            keys[i] = key;
            vals[i] = val;
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'delete': {
          value: function deleteFunction(key) {
            var i = indexOfIdentical(keys, key);
            if (i < 0) { return false; }
            keys.splice(i, 1);
            vals.splice(i, 1);
            return true;
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      }
    );
    return this;
  };

  global.Set = global.Set || function Set() {
    if (!(this instanceof Set)) { return new Set(); }
    var map = new global.Map();

    Object.defineProperties(
      this,
      {
        'has': {
          value: function has(key) { return map.has(key); },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'add': {
          value: function add(key) { map.set(key, true); },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'delete': {
          value: function deleteFunction(key) { return map['delete'](key); },
          configurable: true,
          enumerable: false,
          writable: true
        }
      }
    );
    return this;
  };

  // Inspired by https://gist.github.com/1638059
  // http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps
  global.WeakMap = global.WeakMap || function WeakMap() {
    if (!(this instanceof WeakMap)) { return new WeakMap(); }

    var unique = {};

    function conceal(o) {
      var oValueOf = o.valueOf, secrets = {};
      o.valueOf = function (k) {
        return (k === unique) ? secrets : oValueOf.apply(o, arguments);
      };
      return secrets;
    }

    function reveal(o) {
      var v = o.valueOf(unique);
      return v === o ? null : v;
    }

    Object.defineProperties(
      this,
      {
        'get': {
          value: function get(key, defaultValue) {
            key = Object(key);
            var secrets = reveal(key);
            return (secrets && Object.prototype.hasOwnProperty.call(secrets, 'value')) ? secrets.value : defaultValue;
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'set': {
          value: function set(key, value) {
            key = Object(key);
            var secrets = reveal(key) || conceal(key);
            secrets.value = value;
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'has': {
          value: function has(key) {
            key = Object(key);
            var secrets = reveal(key);
            return Boolean(secrets && 'value' in secrets);
          },
          configurable: true,
          enumerable: false,
          writable: true
        },
        'delete': {
          value: function deleteFunction(key) {
            key = Object(key);
            var secrets = reveal(key);
            if (secrets) {
              delete secrets.value;
            }
          },
          configurable: true,
          enumerable: false,
          writable: true
        }
      });
    return this;
  };


  //----------------------------------------------------------------------
  //
  // ECMAScript Strawman Proposals
  //
  //----------------------------------------------------------------------

  // http://wiki.ecmascript.org/doku.php?id=strawman:number_compare
  if (!Number.prototype.compare) {
    Object.defineProperty(
      Number,
      'compare',
      {
        value: function compare(first, second, tolerance) {
          var difference = first - second;
          return Math.abs(difference) <= (tolerance || 0) ? 0 : difference < 0 ? -1 : 1;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=strawman:number_epsilon
  if (!Number.EPSILON) {
    Object.defineProperty(
      Number,
      'EPSILON',
      {
        value: (function () {
          var next, result;
          for (next = 1; 1 + next !== 1; next = next / 2) {
            result = next;
          }
          return result;
        }()),
        configurable: false,
        enumerable: false,
        writable: false
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=strawman:number_max_integer
  if (!Number.MAX_INTEGER) {
    Object.defineProperty(
      Number,
      'MAX_INTEGER',
      {
        value: 9007199254740992,
        configurable: false,
        enumerable: false,
        writable: false
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=strawman:array_extras
  if (!Array.of) {
    Object.defineProperty(
      Array,
      'of',
      {
        value: function of() {
          return Array.from(arguments);
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=strawman:array_extras
  if (!Array.from) {
    Object.defineProperty(
      Array,
      'from',
      {
        value: function from(o) {
          o = Object(o);
          var i, length = o.length >>> 0, result = [];
          for (i = 0; i < length; i += 1) {
            result[i] = o[i];
          }
          return result;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

  // http://wiki.ecmascript.org/doku.php?id=strawman:array.prototype.pushall
  if (!Array.prototype.pushAll) {
    Object.defineProperty(
      Array.prototype,
      'pushAll', {
        value: function pushAll(other, start, end) {
          other = Object(other);
          if (typeof start === 'undefined') {
            start = 0;
          }
          start = start >>> 0;
          var otherLength = other.length >>> 0;
          if (typeof end === 'undefined') {
            end = otherLength;
          }
          end = end >>> 0;
          var self = Object(this);
          var length = self.length >>> 0;
          for (var i = 0, j = length; i < end; i++, j++) {
            self[j] = other[i];
          }
          self.length = j;
          return;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    );
  }

}(self));
