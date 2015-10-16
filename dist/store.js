(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular', 'baobab', '_'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('angular'), require('baobab'), require('_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.angular, global.Baobab, global._);
        global.store = mod.exports;
    }
})(this, function (exports, _angular, _baobab, _2) {
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _angular2 = _interopRequireDefault(_angular);

    var _Baobab = _interopRequireDefault(_baobab);

    _angular2['default'].module('coatue/store', []).factory('Store', function () {
        var store = new _Baobab['default']({}, {
            asynchronous: false,
            immutable: true,
            syncwrite: true
        });

        var Store = (function () {
            function Store() {
                var _this = this;

                var schema = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                _classCallCheck(this, Store);

                var id = options.id ? options.id : (0, _2.uniqueId)();
                var onUpdate = options.onUpdate || _2.noop;
                store.set(id, {});
                this.cursor = store.select(id);
                this.cursor.on('update', function () {
                    return onUpdate(_this.cursor.get());
                });
                // create getters & setters for each key in the schema
                this.assign(this.cursor, this, schema);
            }

            _createClass(Store, [{
                key: 'assign',
                value: function assign(cursor, facade, schema) {
                    var _this2 = this;

                    Object.keys(schema).forEach(function (key) {
                        var value = schema[key];
                        if ((0, _2.isPlainObject)(value)) {
                            cursor.set(key, {});
                            facade[key] = {};
                            _this2.assign(cursor.select(key), facade[key], value);
                        } else {
                            cursor.set(key, value);
                            Object.defineProperty(facade, key, {
                                get: function get() {
                                    return cursor.get(key);
                                },
                                set: function set(_) {
                                    if (value(_)) {
                                        cursor.set(key, _);
                                    } else {
                                        throw new TypeError('type check failed!');
                                    }
                                }
                            });
                        }
                    });
                }
            }, {
                key: 'get',
                value: function get(key) {
                    return this.cursor.get(key);
                }
            }, {
                key: 'set',
                value: function set(key, value) {
                    return this.cursor.set(key, value);
                }
            }], [{
                key: 'getFor',
                value: function getFor(id) {
                    return store.select(id);
                }
            }]);

            return Store;
        })();

        return Store;
    });
});