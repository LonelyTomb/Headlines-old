webpackJsonp([0],{

/***/ "a4gv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {
    self.idb = exp;
  }
}());


/***/ }),

/***/ "oZEw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _idb = __webpack_require__("a4gv");

var _idb2 = _interopRequireDefault(_idb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbPromise = _idb2.default.open('headlines', 4, function (upgradeDb) {
	switch (upgradeDb.oldVersion) {
		case 0:
			var keyVal = upgradeDb.createObjectStore('keyval');
			keyVal.put('world', 'hello');
		case 1:
			upgradeDb.createObjectStore('people', { keyPath: 'name' });
		case 2:
			var peopleStore = upgradeDb.transaction.objectStore('people');
			peopleStore.createIndex('animal', 'favoriteAnimal');
		case 3:
			var ageStore = upgradeDb.transaction.objectStore('people');
			ageStore.createIndex('age', 'age');
	}
});
dbPromise.then(function (db) {
	var tx = db.transaction('keyval');
	var keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(function (val) {
	console.log('The value of "hello" is ' + val);
});

dbPromise.then(function (db) {
	var tx = db.transaction('keyval', 'readwrite');
	var keyValStore = tx.objectStore('keyval');
	keyValStore.put('bar', 'foo');
	return tx.complete;
}).then(function () {
	console.log('Added foo:bar to keyval');
});

dbPromise.then(function (db) {
	var tx = db.transaction('keyval', 'readwrite');
	var keyValStore = tx.objectStore('keyval');
	keyValStore.put('cat', 'favoriteAnimal');
	return keyValStore.get('favoriteAnimal');
}).then(function (val) {
	console.log('Favorite Animal: ' + val);
});

dbPromise.then(function (db) {
	var tx = db.transaction('people', 'readwrite');
	var peopleStore = tx.objectStore('people');

	peopleStore.put({
		name: 'Vic',
		age: 22,
		favoriteAnimal: 'cat'
	});
	peopleStore.put({
		name: 'Fav',
		age: 19,
		favoriteAnimal: 'cat'
	});
	peopleStore.put({
		name: 'Tunji',
		age: 24,
		favoriteAnimal: 'dog'
	});
	peopleStore.put({
		name: 'Jw',
		age: 23,
		favoriteAnimal: 'dog'
	});
	return tx.complete;
}).then(function () {
	console.log('done');
});

dbPromise.then(function (db) {
	var tx = db.transaction('people');
	var peopleStore = tx.objectStore('people');
	// let animalIndex = peopleStore.index('animal')
	var ageIndex = peopleStore.index('age');

	return ageIndex.getAll('age');
}).then(function (vals) {
	console.log(vals);
});

dbPromise.then(function (db) {
	var tx = db.transaction('people');
	var peopleStore = tx.objectStore('people');
	var ageIndex = peopleStore.index('age');

	return ageIndex.openCursor();
}).then(function logPerson(cursor) {
	if (!cursor) return;
	console.log('Cursor at: ' + cursor.value.name);
	return cursor.continue().then(logPerson);
}).then(function () {
	console.log('done');
});

/***/ })

},["oZEw"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWRiL2xpYi9pZGIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2lkYi9pZGIuanMiXSwibmFtZXMiOlsiZGJQcm9taXNlIiwib3BlbiIsInVwZ3JhZGVEYiIsIm9sZFZlcnNpb24iLCJrZXlWYWwiLCJjcmVhdGVPYmplY3RTdG9yZSIsInB1dCIsImtleVBhdGgiLCJwZW9wbGVTdG9yZSIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsImFnZVN0b3JlIiwidGhlbiIsInR4IiwiZGIiLCJrZXlWYWxTdG9yZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJ2YWwiLCJjb21wbGV0ZSIsIm5hbWUiLCJhZ2UiLCJmYXZvcml0ZUFuaW1hbCIsImFnZUluZGV4IiwiaW5kZXgiLCJnZXRBbGwiLCJ2YWxzIiwib3BlbkN1cnNvciIsImxvZ1BlcnNvbiIsImN1cnNvciIsInZhbHVlIiwiY29udGludWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtB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QU07QUFDYkssU0FBUUMsR0FBUixDQUFZLE1BQVo7QUFDQSxDQVpELEUiLCJmaWxlIjoianMvaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHRvQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcbiAgICB2YXIgcmVxdWVzdDtcbiAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxdWVzdCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcblxuICAgIHAucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlDdXJzb3JSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpO1xuICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBwLnJlcXVlc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlQcm9wZXJ0aWVzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb3h5Q2xhc3MucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgdGhpc1t0YXJnZXRQcm9wXVtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0uYXBwbHkodGhpc1t0YXJnZXRQcm9wXSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gSW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEluZGV4LCAnX2luZGV4JywgW1xuICAgICduYW1lJyxcbiAgICAna2V5UGF0aCcsXG4gICAgJ211bHRpRW50cnknLFxuICAgICd1bmlxdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdnZXQnLFxuICAgICdnZXRLZXknLFxuICAgICdnZXRBbGwnLFxuICAgICdnZXRBbGxLZXlzJyxcbiAgICAnY291bnQnXG4gIF0pO1xuXG4gIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdvcGVuQ3Vyc29yJyxcbiAgICAnb3BlbktleUN1cnNvcidcbiAgXSk7XG5cbiAgZnVuY3Rpb24gQ3Vyc29yKGN1cnNvciwgcmVxdWVzdCkge1xuICAgIHRoaXMuX2N1cnNvciA9IGN1cnNvcjtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3h5UHJvcGVydGllcyhDdXJzb3IsICdfY3Vyc29yJywgW1xuICAgICdkaXJlY3Rpb24nLFxuICAgICdrZXknLFxuICAgICdwcmltYXJ5S2V5JyxcbiAgICAndmFsdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoQ3Vyc29yLCAnX2N1cnNvcicsIElEQkN1cnNvciwgW1xuICAgICd1cGRhdGUnLFxuICAgICdkZWxldGUnXG4gIF0pO1xuXG4gIC8vIHByb3h5ICduZXh0JyBtZXRob2RzXG4gIFsnYWR2YW5jZScsICdjb250aW51ZScsICdjb250aW51ZVByaW1hcnlLZXknXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICBpZiAoIShtZXRob2ROYW1lIGluIElEQkN1cnNvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgQ3Vyc29yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGN1cnNvciA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBjdXJzb3IuX2N1cnNvclttZXRob2ROYW1lXS5hcHBseShjdXJzb3IuX2N1cnNvciwgYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KGN1cnNvci5fcmVxdWVzdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgICByZXR1cm4gbmV3IEN1cnNvcih2YWx1ZSwgY3Vyc29yLl9yZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBPYmplY3RTdG9yZShzdG9yZSkge1xuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gIH1cblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuY3JlYXRlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmNyZWF0ZUluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuaW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnaW5kZXhOYW1lcycsXG4gICAgJ2F1dG9JbmNyZW1lbnQnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdwdXQnLFxuICAgICdhZGQnLFxuICAgICdkZWxldGUnLFxuICAgICdjbGVhcicsXG4gICAgJ2dldCcsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdkZWxldGVJbmRleCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oaWRiVHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl90eCA9IGlkYlRyYW5zYWN0aW9uO1xuICAgIHRoaXMuY29tcGxldGUgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChpZGJUcmFuc2FjdGlvbi5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLm9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl90eC5vYmplY3RTdG9yZS5hcHBseSh0aGlzLl90eCwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFRyYW5zYWN0aW9uLCAnX3R4JywgW1xuICAgICdvYmplY3RTdG9yZU5hbWVzJyxcbiAgICAnbW9kZSdcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKFRyYW5zYWN0aW9uLCAnX3R4JywgSURCVHJhbnNhY3Rpb24sIFtcbiAgICAnYWJvcnQnXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIFVwZ3JhZGVEQihkYiwgb2xkVmVyc2lvbiwgdHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICAgIHRoaXMub2xkVmVyc2lvbiA9IG9sZFZlcnNpb247XG4gICAgdGhpcy50cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XG4gIH1cblxuICBVcGdyYWRlREIucHJvdG90eXBlLmNyZWF0ZU9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl9kYi5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFVwZ3JhZGVEQiwgJ19kYicsIFtcbiAgICAnbmFtZScsXG4gICAgJ3ZlcnNpb24nLFxuICAgICdvYmplY3RTdG9yZU5hbWVzJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVXBncmFkZURCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnZGVsZXRlT2JqZWN0U3RvcmUnLFxuICAgICdjbG9zZSdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gREIoZGIpIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICB9XG5cbiAgREIucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbih0aGlzLl9kYi50cmFuc2FjdGlvbi5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKERCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICAvLyBBZGQgY3Vyc29yIGl0ZXJhdG9yc1xuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBvbmNlIGJyb3dzZXJzIGRvIHRoZSByaWdodCB0aGluZyB3aXRoIHByb21pc2VzXG4gIFsnb3BlbkN1cnNvcicsICdvcGVuS2V5Q3Vyc29yJ10uZm9yRWFjaChmdW5jdGlvbihmdW5jTmFtZSkge1xuICAgIFtPYmplY3RTdG9yZSwgSW5kZXhdLmZvckVhY2goZnVuY3Rpb24oQ29uc3RydWN0b3IpIHtcbiAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVtmdW5jTmFtZS5yZXBsYWNlKCdvcGVuJywgJ2l0ZXJhdGUnKV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIG5hdGl2ZU9iamVjdCA9IHRoaXMuX3N0b3JlIHx8IHRoaXMuX2luZGV4O1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5hdGl2ZU9iamVjdFtmdW5jTmFtZV0uYXBwbHkobmF0aXZlT2JqZWN0LCBhcmdzLnNsaWNlKDAsIC0xKSk7XG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2socmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gcG9seWZpbGwgZ2V0QWxsXG4gIFtJbmRleCwgT2JqZWN0U3RvcmVdLmZvckVhY2goZnVuY3Rpb24oQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEFsbCkgcmV0dXJuO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihxdWVyeSwgY291bnQpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICB2YXIgaXRlbXMgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgaW5zdGFuY2UuaXRlcmF0ZUN1cnNvcihxdWVyeSwgZnVuY3Rpb24oY3Vyc29yKSB7XG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSk7XG5cbiAgICAgICAgICBpZiAoY291bnQgIT09IHVuZGVmaW5lZCAmJiBpdGVtcy5sZW5ndGggPT0gY291bnQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICB2YXIgZXhwID0ge1xuICAgIG9wZW46IGZ1bmN0aW9uKG5hbWUsIHZlcnNpb24sIHVwZ3JhZGVDYWxsYmFjaykge1xuICAgICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdvcGVuJywgW25hbWUsIHZlcnNpb25dKTtcbiAgICAgIHZhciByZXF1ZXN0ID0gcC5yZXF1ZXN0O1xuXG4gICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgICAgICB1cGdyYWRlQ2FsbGJhY2sobmV3IFVwZ3JhZGVEQihyZXF1ZXN0LnJlc3VsdCwgZXZlbnQub2xkVmVyc2lvbiwgcmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XG4gICAgICAgIHJldHVybiBuZXcgREIoZGIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdkZWxldGVEYXRhYmFzZScsIFtuYW1lXSk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwO1xuICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiAgfVxuICBlbHNlIHtcbiAgICBzZWxmLmlkYiA9IGV4cDtcbiAgfVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lkYi9saWIvaWRiLmpzXG4vLyBtb2R1bGUgaWQgPSBhNGd2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBpZGIgZnJvbSAnaWRiJ1xuXG5sZXQgZGJQcm9taXNlID0gaWRiLm9wZW4oJ2hlYWRsaW5lcycsIDQsICh1cGdyYWRlRGIpID0+IHtcblx0c3dpdGNoICh1cGdyYWRlRGIub2xkVmVyc2lvbikge1xuXHRcdGNhc2UgMDpcblx0XHRcdGxldCBrZXlWYWwgPSB1cGdyYWRlRGIuY3JlYXRlT2JqZWN0U3RvcmUoJ2tleXZhbCcpXG5cdFx0XHRrZXlWYWwucHV0KCd3b3JsZCcsICdoZWxsbycpXG5cdFx0Y2FzZSAxOlxuXHRcdFx0dXBncmFkZURiLmNyZWF0ZU9iamVjdFN0b3JlKCdwZW9wbGUnLCB7a2V5UGF0aDogJ25hbWUnfSlcblx0XHRjYXNlIDI6XG5cdFx0XHRsZXQgcGVvcGxlU3RvcmUgPSB1cGdyYWRlRGIudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoJ3Blb3BsZScpXG5cdFx0XHRwZW9wbGVTdG9yZS5jcmVhdGVJbmRleCgnYW5pbWFsJywgJ2Zhdm9yaXRlQW5pbWFsJylcblx0XHRjYXNlIDM6XG5cdFx0XHRsZXQgYWdlU3RvcmUgPSB1cGdyYWRlRGIudHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoJ3Blb3BsZScpXG5cdFx0XHRhZ2VTdG9yZS5jcmVhdGVJbmRleCgnYWdlJywgJ2FnZScpXG5cdH1cbn0pXG5kYlByb21pc2UudGhlbihkYiA9PiB7XG5cdGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdrZXl2YWwnKVxuXHRsZXQga2V5VmFsU3RvcmUgPSB0eC5vYmplY3RTdG9yZSgna2V5dmFsJylcblx0cmV0dXJuIGtleVZhbFN0b3JlLmdldCgnaGVsbG8nKVxufSkudGhlbih2YWwgPT4ge1xuXHRjb25zb2xlLmxvZyhgVGhlIHZhbHVlIG9mIFwiaGVsbG9cIiBpcyAke3ZhbH1gKVxufSlcblxuZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuXHRsZXQgdHggPSBkYi50cmFuc2FjdGlvbigna2V5dmFsJywgJ3JlYWR3cml0ZScpXG5cdGxldCBrZXlWYWxTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdrZXl2YWwnKVxuXHRrZXlWYWxTdG9yZS5wdXQoJ2JhcicsICdmb28nKVxuXHRyZXR1cm4gdHguY29tcGxldGVcbn0pLnRoZW4oKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnQWRkZWQgZm9vOmJhciB0byBrZXl2YWwnKVxufSlcblxuZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuXHRsZXQgdHggPSBkYi50cmFuc2FjdGlvbigna2V5dmFsJywgJ3JlYWR3cml0ZScpXG5cdGxldCBrZXlWYWxTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdrZXl2YWwnKVxuXHRrZXlWYWxTdG9yZS5wdXQoJ2NhdCcsICdmYXZvcml0ZUFuaW1hbCcpXG5cdHJldHVybiBrZXlWYWxTdG9yZS5nZXQoJ2Zhdm9yaXRlQW5pbWFsJylcbn0pLnRoZW4odmFsID0+IHtcblx0Y29uc29sZS5sb2coYEZhdm9yaXRlIEFuaW1hbDogJHt2YWx9YClcbn0pXG5cbmRiUHJvbWlzZS50aGVuKGRiID0+IHtcblx0bGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Blb3BsZScsICdyZWFkd3JpdGUnKVxuXHRsZXQgcGVvcGxlU3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVvcGxlJylcblxuXHRwZW9wbGVTdG9yZS5wdXQoe1xuXHRcdG5hbWU6ICdWaWMnLFxuXHRcdGFnZTogMjIsXG5cdFx0ZmF2b3JpdGVBbmltYWw6ICdjYXQnXG5cdH0pXG5cdHBlb3BsZVN0b3JlLnB1dCh7XG5cdFx0bmFtZTogJ0ZhdicsXG5cdFx0YWdlOiAxOSxcblx0XHRmYXZvcml0ZUFuaW1hbDogJ2NhdCdcblx0fSlcblx0cGVvcGxlU3RvcmUucHV0KHtcblx0XHRuYW1lOiAnVHVuamknLFxuXHRcdGFnZTogMjQsXG5cdFx0ZmF2b3JpdGVBbmltYWw6ICdkb2cnXG5cdH0pXG5cdHBlb3BsZVN0b3JlLnB1dCh7XG5cdFx0bmFtZTogJ0p3Jyxcblx0XHRhZ2U6IDIzLFxuXHRcdGZhdm9yaXRlQW5pbWFsOiAnZG9nJ1xuXHR9KVxuXHRyZXR1cm4gdHguY29tcGxldGVcbn0pLnRoZW4oKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnZG9uZScpXG59KVxuXG5kYlByb21pc2UudGhlbihkYiA9PiB7XG5cdGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW9wbGUnKVxuXHRsZXQgcGVvcGxlU3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVvcGxlJylcblx0Ly8gbGV0IGFuaW1hbEluZGV4ID0gcGVvcGxlU3RvcmUuaW5kZXgoJ2FuaW1hbCcpXG5cdGxldCBhZ2VJbmRleCA9IHBlb3BsZVN0b3JlLmluZGV4KCdhZ2UnKVxuXG5cdHJldHVybiBhZ2VJbmRleC5nZXRBbGwoJ2FnZScpXG59KS50aGVuKHZhbHMgPT4ge1xuXHRjb25zb2xlLmxvZyh2YWxzKVxufSlcblxuZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuXHRsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncGVvcGxlJylcblx0bGV0IHBlb3BsZVN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Blb3BsZScpXG5cdGxldCBhZ2VJbmRleCA9IHBlb3BsZVN0b3JlLmluZGV4KCdhZ2UnKVxuXG5cdHJldHVybiBhZ2VJbmRleC5vcGVuQ3Vyc29yKClcbn0pLnRoZW4oZnVuY3Rpb24gbG9nUGVyc29uKGN1cnNvcikge1xuXHRpZiAoIWN1cnNvcikgcmV0dXJuXG5cdGNvbnNvbGUubG9nKGBDdXJzb3IgYXQ6ICR7Y3Vyc29yLnZhbHVlLm5hbWV9YClcblx0cmV0dXJuIGN1cnNvci5jb250aW51ZSgpLnRoZW4obG9nUGVyc29uKVxufSkudGhlbigoKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdkb25lJylcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvaWRiL2lkYi5qcyJdLCJzb3VyY2VSb290IjoiIn0=