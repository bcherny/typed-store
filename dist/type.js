(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', '_'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._);
        global.type = mod.exports;
    }
})(this, function (exports, _2) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _3 = _interopRequireDefault(_2);

    var type = {
        array: _3['default'].isArray,
        boolean: _3['default'].isBoolean,
        'function': _3['default'].isFunction,
        number: _3['default'].isNumber,
        object: _3['default'].isPlainObject,
        string: _3['default'].isString,
        instanceOf: function instanceOf(a) {
            return function (_) {
                return _ instanceof a;
            };
        },
        and: function and(a, b) {
            return a && b;
        },
        or: function or(a, b) {
            return a || b;
        },
        not: function not(_) {
            return !_;
        }
    };
    exports.type = type;
});