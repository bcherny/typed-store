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
})(this, function (exports, _angular, _baobab, _) {
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

        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Store);

        var id = options.id ? options.id : (0, _.uniqueId)();
        var onUpdate = options.onUpdate || _.noop;

        store.set(id, data);

        this.cursor = store.select(id);
        this.cursor.on('update', function () {
          return onUpdate(_this.cursor.get());
        });
      }

      _createClass(Store, null, [{
        key: 'getFor',
        value: function getFor(id) {
          var _store$select;

          if (typeof id !== 'string') throw new TypeError('Value of argument \'id\' violates contract, expected string got ' + (id === null ? 'null' : id instanceof Object && id.constructor ? id.constructor.name : typeof id));
          _store$select = store.select(id);
          if (!(_store$select instanceof _Baobab['default'])) throw new TypeError('Function return value violates contract, expected Baobab got ' + (_store$select === null ? 'null' : _store$select instanceof Object && _store$select.constructor ? _store$select.constructor.name : typeof _store$select));
          return _store$select;
        }
      }]);

      return Store;
    })();

    return Store;
  });
});