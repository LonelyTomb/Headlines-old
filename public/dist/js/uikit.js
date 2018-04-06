/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "0bcdf6cf21dbc1633e4c"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("YMCN");
module.exports = __webpack_require__("vNiz");


/***/ }),

/***/ "162o":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("mypn");
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "2EC8":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*! UIkit 3.0.0-beta.40 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikit', factory) :
	(global.UIkit = factory());
}(this, (function () { 'use strict';

function bind(fn, context) {
    return function (a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(context, arguments) : fn.call(context, a) : fn.call(context);
    };
}

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

var hyphenateRe = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
    return str
        .replace(hyphenateRe, '$1-$2')
        .toLowerCase();
}

var camelizeRE = /-(\w)/g;

function camelize(str) {
    return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
}

function ucfirst(str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
}

var strPrototype = String.prototype;
var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

function startsWith(str, search) {
    return startsWithFn.call(str, search);
}

var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

function endsWith(str, search) {
    return endsWithFn.call(str, search);
}

var includesFn = function (search) { return ~this.indexOf(search); };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
}

var isArray = Array.isArray;

function isFunction(obj) {
    return typeof obj === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
}

function isDocument(obj) {
    return isObject(obj) && obj.nodeType === 9;
}

function isJQuery(obj) {
    return isObject(obj) && !!obj.jquery;
}

function isNode(element) {
    return element instanceof Node || isObject(element) && element.nodeType === 1;
}

function isNodeCollection(element) {
    return element instanceof NodeList || element instanceof HTMLCollection;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
}

function isUndefined(value) {
    return value === void 0;
}

function toBoolean(value) {
    return isBoolean(value)
        ? value
        : value === 'true' || value === '1' || value === ''
            ? true
            : value === 'false' || value === '0'
                ? false
                : value;
}

function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
}

function toFloat(value) {
    return parseFloat(value) || 0;
}

function toNode(element) {
    return isNode(element) || isWindow(element) || isDocument(element)
        ? element
        : isNodeCollection(element) || isJQuery(element)
            ? element[0]
            : isArray(element)
                ? toNode(element[0])
                : null;
}

var arrayProto = Array.prototype;
function toNodes(element) {
    return isNode(element)
        ? [element]
        : isNodeCollection(element)
            ? arrayProto.slice.call(element)
            : isArray(element)
                ? element.map(toNode).filter(Boolean)
                : isJQuery(element)
                    ? element.toArray()
                    : [];
}

function toList(value) {
    return isArray(value)
        ? value
        : isString(value)
            ? value.split(/,(?![^(]*\))/).map(function (value) { return isNumeric(value)
                ? toNumber(value)
                : toBoolean(value.trim()); })
            : [value];
}

function toMs(time) {
    return !time
        ? 0
        : endsWith(time, 'ms')
            ? toFloat(time)
            : toFloat(time) * 1000;
}

function swap(value, a, b) {
    return value.replace(new RegExp((a + "|" + b), 'mg'), function (match) {
        return match === a ? b : a;
    });
}

var assign = Object.assign || function (target) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    target = Object(target);
    for (var i = 0; i < args.length; i++) {
        var source = args[i];
        if (source !== null) {
            for (var key in source) {
                if (hasOwn(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
};

function each(obj, cb) {
    for (var key in obj) {
        if (cb.call(obj[key], obj[key], key) === false) {
            break;
        }
    }
}

function sortBy(collection, prop) {
    return collection.sort(function (a, b) { return a[prop] > b[prop]
            ? 1
            : b[prop] > a[prop]
                ? -1
                : 0; }
    );
}

function clamp(number, min, max) {
    if ( min === void 0 ) min = 0;
    if ( max === void 0 ) max = 1;

    return Math.min(Math.max(number, min), max);
}

function noop() {}

function intersectRect(r1, r2) {
    return r1.left <= r2.right &&
        r2.left <= r1.right &&
        r1.top <= r2.bottom &&
        r2.top <= r1.bottom;
}

function pointInRect(point, rect) {
    return intersectRect({top: point.y, bottom: point.y, left: point.x, right: point.x}, rect);
}

var Dimensions = {

    ratio: function ratio(dimensions, prop, value) {
        var obj;


        var aProp = prop === 'width' ? 'height' : 'width';

        return ( obj = {}, obj[aProp] = Math.round(value * dimensions[aProp] / dimensions[prop]), obj[prop] = value, obj);
    },

    contain: function contain(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = assign({}, dimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] > maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    },

    cover: function cover(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = this.contain(dimensions, maxDimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] < maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    }

};

function attr(element, name, value) {

    if (isObject(name)) {
        for (var key in name) {
            attr(element, key, name[key]);
        }
        return;
    }

    if (isUndefined(value)) {
        element = toNode(element);
        return element && element.getAttribute(name);
    } else {
        toNodes(element).forEach(function (element) {

            if (isFunction(value)) {
                value = value.call(element, attr(element, name));
            }

            if (value === null) {
                removeAttr(element, name);
            } else {
                element.setAttribute(name, value);
            }
        });
    }

}

function hasAttr(element, name) {
    return toNodes(element).some(function (element) { return element.hasAttribute(name); });
}

function removeAttr(element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
        ); }
    );
}

function filterAttr(element, attribute, pattern, replacement) {
    attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
}

function data(element, attribute) {
    for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
        if (hasAttr(element, attrs[i])) {
            return attr(element, attrs[i]);
        }
    }
}

/* global setImmediate */
var Promise = 'Promise' in window ? window.Promise : PromiseFn;

var Deferred = function Deferred() {
    var this$1 = this;

    this.promise = new Promise(function (resolve, reject) {
        this$1.reject = reject;
        this$1.resolve = resolve;
    });
};

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

var async = 'setImmediate' in window ? setImmediate : setTimeout;

function PromiseFn(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
        reject(r);
    });
};

PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
        resolve(x);
    });
};

PromiseFn.all = function all(iterable) {
    return new PromiseFn(function (resolve, reject) {
        var result = [];
        var count = 0;

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

PromiseFn.race = function race(iterable) {
    return new PromiseFn(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            PromiseFn.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = PromiseFn.prototype;

p.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x.then;

            if (x !== null && isObject(x) && isFunction(then)) {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify() {
    var this$1 = this;

    async(function () {
        if (this$1.state !== PENDING) {
            while (this$1.deferred.length) {
                var ref = this$1.deferred.shift();
                var onResolved = ref[0];
                var onRejected = ref[1];
                var resolve = ref[2];
                var reject = ref[3];

                try {
                    if (this$1.state === RESOLVED) {
                        if (isFunction(onResolved)) {
                            resolve(onResolved.call(undefined, this$1.value));
                        } else {
                            resolve(this$1.value);
                        }
                    } else if (this$1.state === REJECTED) {
                        if (isFunction(onRejected)) {
                            resolve(onRejected.call(undefined, this$1.value));
                        } else {
                            reject(this$1.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then(onResolved, onRejected) {
    var this$1 = this;

    return new PromiseFn(function (resolve, reject) {
        this$1.deferred.push([onResolved, onRejected, resolve, reject]);
        this$1.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/* global DocumentTouch */
var win = window;
var doc = document;
var docEl = doc.documentElement;

var isRtl = attr(docEl, 'dir') === 'rtl';

var Observer = win.MutationObserver;

var hasTouchEvents = 'ontouchstart' in win;
var hasPointerEvents = win.PointerEvent;
var hasTouch = hasTouchEvents
    || win.DocumentTouch && doc instanceof DocumentTouch
    || navigator.maxTouchPoints; // IE >=11

var pointerDown = !hasTouch ? 'mousedown' : ("mousedown " + (hasTouchEvents ? 'touchstart' : 'pointerdown'));
var pointerMove = !hasTouch ? 'mousemove' : ("mousemove " + (hasTouchEvents ? 'touchmove' : 'pointermove'));
var pointerUp = !hasTouch ? 'mouseup' : ("mouseup " + (hasTouchEvents ? 'touchend' : 'pointerup'));
var pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
var pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';

function getImage(src) {

    return new Promise(function (resolve, reject) {
        var img = new Image();

        img.onerror = reject;
        img.onload = function () { return resolve(img); };

        img.src = src;
    });

}

var supports = {};

// IE 11
(function () {

    var list = doc.createElement('_').classList;
    if (list) {
        list.add('a', 'b');
        list.toggle('c', false);
        supports.Multiple = list.contains('b');
        supports.Force = !list.contains('c');
        supports.ClassList = true;
    }
    list = null;

})();

function query(selector, context) {
    return toNode(selector) || find(selector, isContextSelector(selector) ? context : doc);
}

function queryAll(selector, context) {
    var nodes = toNodes(selector);
    return nodes.length && nodes || findAll(selector, isContextSelector(selector) ? context : doc);
}

function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
}

function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
}

function _query(selector, context, queryFn) {
    if ( context === void 0 ) context = doc;


    if (!selector || !isString(selector)) {
        return null;
    }

    selector = selector.replace(contextSanitizeRe, '$1 *');

    var removes;

    if (isContextSelector(selector)) {

        removes = [];

        selector = selector.split(',').map(function (selector, i) {

            var ctx = context;

            selector = selector.trim();

            if (selector[0] === '!') {

                var selectors = selector.substr(1).trim().split(' ');
                ctx = closest(context.parentNode, selectors[0]);
                selector = selectors.slice(1).join(' ');

            }

            if (!ctx) {
                return null;
            }

            if (!ctx.id) {
                ctx.id = "uk-" + (Date.now()) + i;
                removes.push(function () { return removeAttr(ctx, 'id'); });
            }

            return ("#" + (escape(ctx.id)) + " " + selector);

        }).filter(Boolean).join(',');

        context = doc;

    }

    try {

        return context[queryFn](selector);

    } catch (e) {

        return null;

    } finally {

        removes && removes.forEach(function (remove) { return remove(); });

    }

}

var contextSelectorRe = /(^|,)\s*[!>+~]/;
var contextSanitizeRe = /([!>+~])(?=\s+[!>+~]|\s*$)/g;

function isContextSelector(selector) {
    return isString(selector) && selector.match(contextSelectorRe);
}

var elProto = Element.prototype;
var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;

function matches(element, selector) {
    return toNodes(element).some(function (element) { return matchesFn.call(element, selector); });
}

var closestFn = elProto.closest || function (selector) {
    var ancestor = this;

    do {

        if (matches(ancestor, selector)) {
            return ancestor;
        }

        ancestor = ancestor.parentNode;

    } while (ancestor && ancestor.nodeType === 1);
};

function closest(element, selector) {

    if (startsWith(selector, '>')) {
        selector = selector.slice(1);
    }

    return isNode(element)
        ? element.parentNode && closestFn.call(element, selector)
        : toNodes(element).map(function (element) { return element.parentNode && closestFn.call(element, selector); }).filter(Boolean);
}

function parents(element, selector) {
    var elements = [];
    var parent = toNode(element).parentNode;

    while (parent && parent.nodeType === 1) {

        if (matches(parent, selector)) {
            elements.push(parent);
        }

        parent = parent.parentNode;
    }

    return elements;
}

var escapeFn = win.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return ("\\" + match); }); };
function escape(css) {
    return isString(css) ? escapeFn.call(null, css) : '';
}

var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
function isVoidElement(element) {
    return toNodes(element).some(function (element) { return voidElements[element.tagName.toLowerCase()]; });
}

function isVisible(element) {
    return toNodes(element).some(function (element) { return element.offsetHeight || element.getBoundingClientRect().height; });
}

var selInput = 'input,select,textarea,button';
function isInput(element) {
    return toNodes(element).some(function (element) { return matches(element, selInput); });
}

function filter(element, selector) {
    return toNodes(element).filter(function (element) { return matches(element, selector); });
}

function within(element, selector) {
    return !isString(selector)
        ? element === selector || toNode(selector).contains(toNode(element))
        : matches(element, selector) || closest(element, selector);
}

function on() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs(args);
    var target = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];

    target = toEventTarget(target);

    if (selector) {
        listener = delegate(target, selector, listener);
    }

    if (listener.length > 1) {
        listener = detail(listener);
    }

    type.split(' ').forEach(function (type) { return target && target.addEventListener(type, listener, useCapture); });
    return function () { return off(target, type, listener, useCapture); };
}

function off(target, type, listener, useCapture) {
    if ( useCapture === void 0 ) useCapture = false;

    target = toEventTarget(target);
    target && type.split(' ').forEach(function (type) { return target.removeEventListener(type, listener, useCapture); });
}

function once() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs(args);
    var element = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];
    var condition = ref[5];
    var off = on(element, type, selector, function (e) {
        var result = !condition || condition(e);
        if (result) {
            off();
            listener(e, result);
        }
    }, useCapture);

    return off;
}

function trigger(target, event, detail) {
    return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
        , true);
}

function createEvent(e, bubbles, cancelable, detail) {
    if ( bubbles === void 0 ) bubbles = true;
    if ( cancelable === void 0 ) cancelable = false;

    if (isString(e)) {
        var event = document.createEvent('CustomEvent'); // IE 11
        event.initCustomEvent(e, bubbles, cancelable, detail);
        e = event;
    }

    return e;
}

function getArgs(args) {

    if (isString(args[0])) {
        args[0] = find(args[0]);
    }

    if (isFunction(args[2])) {
        args.splice(2, 0, false);
    }
    return args;
}

function delegate(element, selector, listener) {
    var this$1 = this;

    return function (e) {

        var target = e.target;
        var current = selector[0] === '>'
            ? findAll(selector, element).reverse().filter(function (element) { return within(target, element); })[0]
            : closest(target, selector);

        if (current) {
            e.delegate = element;
            e.current = current;

            listener.call(this$1, e);
        }
    };
}

function detail(listener) {
    return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); };
}

function isEventTarget(target) {
    return 'EventTarget' in window
        ? target instanceof EventTarget
        : target && 'addEventListener' in target;
}

function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
}

function toEventTargets(target) {
    return isEventTarget(target)
        ? [target]
        : isArray(target)
            ? target.map(toEventTarget).filter(Boolean)
            : toNodes(target);
}

function preventClick() {

    var timer = setTimeout(once(document, 'click', function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        clearTimeout(timer);

    }, true));

}

function ajax(url, options) {
    return new Promise(function (resolve, reject) {

        var env = assign({
            data: null,
            method: 'GET',
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: ''
        }, options);

        env.beforeSend(env);

        var xhr = env.xhr;

        for (var prop in env) {
            if (prop in xhr) {
                try {

                    xhr[prop] = env[prop];

                } catch (e) {}
            }
        }

        xhr.open(env.method.toUpperCase(), url);

        for (var header in env.headers) {
            xhr.setRequestHeader(header, env.headers[header]);
        }

        on(xhr, 'load', function () {

            if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr);
            } else {
                reject(assign(Error(xhr.statusText), {
                    xhr: xhr,
                    status: xhr.status
                }));
            }

        });

        on(xhr, 'error', function () { return reject(assign(Error('Network Error'), {xhr: xhr})); });
        on(xhr, 'timeout', function () { return reject(assign(Error('Network Timeout'), {xhr: xhr})); });

        xhr.send(env.data);
    });
}

function isReady() {
    return doc.readyState === 'complete' || doc.readyState !== 'loading' && !docEl.doScroll;
}

function ready(fn) {

    if (isReady()) {
        fn();
        return;
    }

    var handle = function () {
        unbind1();
        unbind2();
        fn();
    };
    var unbind1 = on(doc, 'DOMContentLoaded', handle);
    var unbind2 = on(win, 'load', handle);
}

function index(element, ref) {
    return ref
        ? toNodes(element).indexOf(toNode(ref))
        : toNodes((element = toNode(element)) && element.parentNode.children).indexOf(element);
}

function getIndex(i, elements, current, finite) {
    if ( current === void 0 ) current = 0;
    if ( finite === void 0 ) finite = false;


    elements = toNodes(elements);

    var length = elements.length;

    i = isNumeric(i)
        ? toNumber(i)
        : i === 'next'
            ? current + 1
            : i === 'previous'
                ? current - 1
                : index(elements, i);

    if (finite) {
        return clamp(i, 0, length - 1);
    }

    i %= length;

    return i < 0 ? i + length : i;
}

function empty(element) {
    element = toNode(element);
    element.innerHTML = '';
    return element;
}

function html(parent, html) {
    parent = toNode(parent);
    return isUndefined(html)
        ? parent.innerHTML
        : append(parent.hasChildNodes() ? empty(parent) : parent, html);
}

function prepend(parent, element) {

    parent = toNode(parent);

    if (!parent.hasChildNodes()) {
        return append(parent, element);
    } else {
        return insertNodes(element, function (element) { return parent.insertBefore(element, parent.firstChild); });
    }
}

function append(parent, element) {
    parent = toNode(parent);
    return insertNodes(element, function (element) { return parent.appendChild(element); });
}

function before(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); });
}

function after(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.nextSibling
        ? before(ref.nextSibling, element)
        : append(ref.parentNode, element); }
    );
}

function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element
        ? 'length' in element
            ? toNodes(element).map(fn)
            : fn(element)
        : null;
}

function remove(element) {
    toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
}

function wrapAll(element, structure) {

    structure = toNode(before(element, structure));

    while (structure.firstChild) {
        structure = structure.firstChild;
    }

    append(structure, element);

    return structure;
}

function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
    ));
}

function unwrap(element) {
    toNodes(element)
        .map(function (element) { return element.parentNode; })
        .filter(function (value, index, self) { return self.indexOf(value) === index; })
        .forEach(function (parent) {
            before(parent, parent.childNodes);
            remove(parent);
        });
}

var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

function fragment(html) {

    var matches = singleTagRE.exec(html);
    if (matches) {
        return doc.createElement(matches[1]);
    }

    var container = doc.createElement('div');
    if (fragmentRE.test(html)) {
        container.insertAdjacentHTML('beforeend', html.trim());
    } else {
        container.textContent = html;
    }

    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

}

function addClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'add');
}

function removeClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'remove');
}

function removeClasses(element, cls) {
    filterAttr(element, 'class', new RegExp(("(^|\\s)" + cls + "(?!\\S)"), 'g'), '');
}

function replaceClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
}

function hasClass(element, cls) {
    return supports.ClassList && toNodes(element).some(function (element) { return element.classList.contains(cls); });
}

function toggleClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];


    if (!supports.ClassList || !args.length) {
        return;
    }

    args = getArgs$1(args);

    var force = !isString(args[args.length - 1]) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

    args = args.filter(Boolean);

    toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        for (var i = 0; i < args.length; i++) {
            supports.Force
                ? classList.toggle.apply(classList, [args[i]].concat(force))
                : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
        }
    });

}

function apply(element, args, fn) {
    args = getArgs$1(args).filter(Boolean);

    supports.ClassList && args.length && toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        supports.Multiple
            ? classList[fn].apply(classList, args)
            : args.forEach(function (cls) { return classList[fn](cls); });
    });
}

function getArgs$1(args) {
    return args.reduce(function (args, arg) { return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
        , []);
}

var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'z-index': true,
    'zoom': true
};

function css(element, property, value) {

    return toNodes(element).map(function (element) {

        if (isString(property)) {

            property = propName(property);

            if (isUndefined(value)) {
                return getStyle(element, property);
            } else if (!value && value !== 0) {
                element.style.removeProperty(property);
            } else {
                element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
            }

        } else if (isArray(property)) {

            var styles = getStyles(element);

            return property.reduce(function (props, property) {
                props[property] = styles[propName(property)];
                return props;
            }, {});

        } else if (isObject(property)) {
            each(property, function (value, property) { return css(element, property, value); });
        }

        return element;

    })[0];

}

function getStyles(element, pseudoElt) {
    element = toNode(element);
    return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
}

function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
}

var vars = {};

function getCssVar(name) {

    if (!(name in vars)) {

        /* usage in css: .var-name:before { content:"xyz" } */

        var element = append(docEl, doc.createElement('div'));

        addClass(element, ("var-" + name));

        try {

            vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
            vars[name] = JSON.parse(vars[name]);

        } catch (e) {}

        docEl.removeChild(element);

    }

    return vars[name];

}

var cssProps = {};

function propName(name) {

    var ret = cssProps[name];
    if (!ret) {
        ret = cssProps[name] = vendorPropName(name) || name;
    }
    return ret;
}

var cssPrefixes = ['webkit', 'moz', 'ms'];
var ref$1 = doc.createElement('_');
var style = ref$1.style;

function vendorPropName(name) {

    name = hyphenate(name);

    if (name in style) {
        return name;
    }

    var i = cssPrefixes.length, prefixedName;

    while (i--) {
        prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
        if (prefixedName in style) {
            return prefixedName;
        }
    }
}

function transition(element, props, duration, timing) {
    if ( duration === void 0 ) duration = 400;
    if ( timing === void 0 ) timing = 'linear';


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            for (var name in props) {
                var value = css(element, name);
                if (value === '') {
                    css(element, name, value);
                }
            }

            var timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);

            once(element, 'transitionend transitioncanceled', function (ref) {
                var type = ref.type;

                clearTimeout(timer);
                removeClass(element, 'uk-transition');
                css(element, {
                    'transition-property': '',
                    'transition-duration': '',
                    'transition-timing-function': ''
                });
                type === 'transitioncanceled' ? reject() : resolve();
            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            addClass(element, 'uk-transition');
            css(element, assign({
                'transition-property': Object.keys(props).map(propName).join(','),
                'transition-duration': (duration + "ms"),
                'transition-timing-function': timing
            }, props));

        }); }
    ));

}

var Transition = {

    start: transition,

    stop: function stop(element) {
        trigger(element, 'transitionend');
        return Promise.resolve();
    },

    cancel: function cancel(element) {
        trigger(element, 'transitioncanceled');
    },

    inProgress: function inProgress(element) {
        return hasClass(element, 'uk-transition');
    }

};

var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';

function animate(element, animation, duration, origin, out) {
    var arguments$1 = arguments;
    if ( duration === void 0 ) duration = 200;


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            if (hasClass(element, clsCancelAnimation)) {
                requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(void 0, arguments$1).then(resolve, reject); }
                    ); }
                );
                return;
            }

            var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');

            if (startsWith(animation, animationPrefix)) {

                if (origin) {
                    cls += " uk-transform-origin-" + origin;
                }

                if (out) {
                    cls += " " + animationPrefix + "reverse";
                }

            }

            reset();

            once(element, 'animationend animationcancel', function (ref) {
                var type = ref.type;


                var hasReset = false;

                if (type === 'animationcancel') {
                    reject();
                    reset();
                } else {
                    resolve();
                    Promise.resolve().then(function () {
                        hasReset = true;
                        reset();
                    });
                }

                requestAnimationFrame(function () {
                    if (!hasReset) {
                        addClass(element, clsCancelAnimation);

                        requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
                    }
                });

            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            css(element, 'animationDuration', (duration + "ms"));
            addClass(element, cls);

            function reset() {
                css(element, 'animationDuration', '');
                removeClasses(element, (animationPrefix + "\\S*"));
            }

        }); }
    ));

}

var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
var Animation = {

    in: function in$1(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, false);
    },

    out: function out(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, true);
    },

    inProgress: function inProgress$1(element) {
        return inProgress.test(attr(element, 'class'));
    },

    cancel: function cancel(element) {
        trigger(element, 'animationcancel');
    }

};

function $(selector, context) {
    return !isString(selector)
        ? toNode(selector)
        : isHtml(selector)
            ? toNode(fragment(selector))
            : find(selector, context);
}

function $$(selector, context) {
    return !isString(selector)
        ? toNodes(selector)
        : isHtml(selector)
            ? toNodes(fragment(selector))
            : findAll(selector, context);
}

function isHtml(str) {
    return str[0] === '<' || str.match(/^\s*</);
}

var dirs = {
    width: ['x', 'left', 'right'],
    height: ['y', 'top', 'bottom']
};

function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

    elAttach = getPos(elAttach);
    targetAttach = getPos(targetAttach);

    var flipped = {element: elAttach, target: targetAttach};

    if (!element || !target) {
        return flipped;
    }

    var dim = getDimensions(element);
    var targetDim = getDimensions(target);
    var position = targetDim;

    moveTo(position, elAttach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);

    elOffset = getOffsets(elOffset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

    elOffset['x'] += targetOffset['x'];
    elOffset['y'] += targetOffset['y'];

    position.left += elOffset['x'];
    position.top += elOffset['y'];

    boundary = getDimensions(boundary || window$1(element));

    if (flip) {
        each(dirs, function (ref, prop) {
            var dir = ref[0];
            var align = ref[1];
            var alignFlip = ref[2];


            if (!(flip === true || includes(flip, dir))) {
                return;
            }

            var elemOffset = elAttach[dir] === align
                ? -dim[prop]
                : elAttach[dir] === alignFlip
                    ? dim[prop]
                    : 0;

            var targetOffset = targetAttach[dir] === align
                ? targetDim[prop]
                : targetAttach[dir] === alignFlip
                    ? -targetDim[prop]
                    : 0;

            if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                var centerOffset = dim[prop] / 2;
                var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

                elAttach[dir] === 'center' && (
                    apply(centerOffset, centerTargetOffset)
                    || apply(-centerOffset, -centerTargetOffset)
                ) || apply(elemOffset, targetOffset);

            }

            function apply(elemOffset, targetOffset) {

                var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

                if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                    position[align] = newVal;

                    ['element', 'target'].forEach(function (el) {
                        flipped[el][dir] = !elemOffset
                            ? flipped[el][dir]
                            : flipped[el][dir] === dirs[prop][1]
                                ? dirs[prop][2]
                                : dirs[prop][1];
                    });

                    return true;
                }

            }

        });
    }

    offset(element, position);

    return flipped;
}

function offset(element, coordinates) {

    element = toNode(element);

    if (coordinates) {

        var currentOffset = offset(element);
        var pos = css(element, 'position');

        ['left', 'top'].forEach(function (prop) {
            if (prop in coordinates) {
                var value = css(element, prop);
                element.style[prop] = ((coordinates[prop] - currentOffset[prop])
                + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
            }
        });

        return;
    }

    return getDimensions(element);
}

function getDimensions(element) {

    element = toNode(element);

    var ref = window$1(element);
    var top = ref.pageYOffset;
    var left = ref.pageXOffset;

    if (isWindow(element)) {

        var height = element.innerHeight;
        var width = element.innerWidth;

        return {
            top: top,
            left: left,
            height: height,
            width: width,
            bottom: top + height,
            right: left + width,
        };
    }

    var display = false;
    if (!isVisible(element)) {
        display = element.style.display;
        element.style.display = 'block';
    }

    var rect = element.getBoundingClientRect();

    if (display !== false) {
        element.style.display = display;
    }

    return {
        height: rect.height,
        width: rect.width,
        top: rect.top + top,
        left: rect.left + left,
        bottom: rect.bottom + top,
        right: rect.right + left,
    };
}

function position(element) {
    element = toNode(element);

    var parent = offsetParent(element);
    var parentOffset = parent === docEl$1(element) ? {top: 0, left: 0} : offset(parent);
    var ref = ['top', 'left'].reduce(function (props, prop) {
        var propName$$1 = ucfirst(prop);
        props[prop] -= parentOffset[prop]
            + (toFloat(css(element, ("margin" + propName$$1))) || 0)
            + (toFloat(css(parent, ("border" + propName$$1 + "Width"))) || 0);
        return props;
    }, offset(element));
    var top = ref.top;
    var left = ref.left;

    return {top: top, left: left};
}

function offsetParent(element) {

    var parent = toNode(element).offsetParent;

    while (parent && css(parent, 'position') === 'static') {
        parent = parent.offsetParent;
    }

    return parent || docEl$1(element);
}

var height = dimension('height');
var width = dimension('width');

function dimension(prop) {
    var propName$$1 = ucfirst(prop);
    return function (element, value) {

        element = toNode(element);

        if (isUndefined(value)) {

            if (isWindow(element)) {
                return element[("inner" + propName$$1)];
            }

            if (isDocument(element)) {
                var doc = element.documentElement;
                return Math.max(doc.offsetHeight, doc.scrollHeight);
            }

            value = css(element, prop);
            value = value === 'auto' ? element[("offset" + propName$$1)] : toFloat(value) || 0;

            return getContentSize(prop, element, value);

        } else {

            css(element, prop, !value && value !== 0
                ? ''
                : getContentSize(prop, element, value) + 'px'
            );

        }

    };
}

function getContentSize(prop, element, value) {
    return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value
        - toFloat(css(element, ("padding" + prop)))
        - toFloat(css(element, ("border" + prop + "Width"))); }
        , value) : value;
}

function moveTo(position, attach, dim, factor) {
    each(dirs, function (ref, prop) {
        var dir = ref[0];
        var align = ref[1];
        var alignFlip = ref[2];

        if (attach[dir] === alignFlip) {
            position[align] += dim[prop] * factor;
        } else if (attach[dir] === 'center') {
            position[align] += dim[prop] * factor / 2;
        }
    });
}

function getPos(pos) {

    var x = /left|center|right/;
    var y = /top|center|bottom/;

    pos = (pos || '').split(' ');

    if (pos.length === 1) {
        pos = x.test(pos[0])
            ? pos.concat(['center'])
            : y.test(pos[0])
                ? ['center'].concat(pos)
                : ['center', 'center'];
    }

    return {
        x: x.test(pos[0]) ? pos[0] : 'center',
        y: y.test(pos[1]) ? pos[1] : 'center'
    };
}

function getOffsets(offsets, width, height) {

    var ref = (offsets || '').split(' ');
    var x = ref[0];
    var y = ref[1];

    return {
        x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
        y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
    };
}

function flipPosition(pos) {
    switch (pos) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        default:
            return pos;
    }
}

function isInView(element, top, left) {
    if ( top === void 0 ) top = 0;
    if ( left === void 0 ) left = 0;


    element = toNode(element);

    var win = window$1(element);
    return intersectRect(element.getBoundingClientRect(), {
        top: top,
        left: left,
        bottom: top + height(win),
        right: left + width(win)
    });
}

function scrolledOver(element) {

    element = toNode(element);

    var win = window$1(element);
    var doc = document$1(element);
    var elHeight = element.offsetHeight;
    var top = positionTop(element);
    var vp = height(win);
    var vh = vp + Math.min(0, top - vp);
    var diff = Math.max(0, vp - (height(doc) - (top + elHeight)));

    return clamp(((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0))) / 100)) / 100);
}

function positionTop(element) {
    var top = 0;

    do {

        top += element.offsetTop;

    } while ((element = element.offsetParent));

    return top;
}

function window$1(element) {
    return isWindow(element) ? element : document$1(element).defaultView;
}

function document$1(element) {
    return toNode(element).ownerDocument;
}

function docEl$1(element) {
    return document$1(element).documentElement;
}

/*
    Based on:
    Copyright (c) 2016 Wilson Page wilsonpage@me.com
    https://github.com/wilsonpage/fastdom
*/

var fastdom = {

    reads: [],
    writes: [],

    read: function read(task) {
        this.reads.push(task);
        scheduleFlush();
        return task;
    },

    write: function write(task) {
        this.writes.push(task);
        scheduleFlush();
        return task;
    },

    clear: function clear(task) {
        return remove$1(this.reads, task) || remove$1(this.writes, task);
    },

    flush: function flush() {

        runTasks(this.reads);
        runTasks(this.writes.splice(0, this.writes.length));

        this.scheduled = false;

        if (this.reads.length || this.writes.length) {
            scheduleFlush();
        }

    }

};

function scheduleFlush() {
    if (!fastdom.scheduled) {
        fastdom.scheduled = true;
        requestAnimationFrame(fastdom.flush.bind(fastdom));
    }
}

function runTasks(tasks) {
    var task;
    while ((task = tasks.shift())) {
        task();
    }
}

function remove$1(array, item) {
    var index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1);
}

function MouseTracker() {}

MouseTracker.prototype = {

    positions: [],
    position: null,

    init: function init() {
        var this$1 = this;


        this.positions = [];
        this.position = null;

        var ticking = false;
        this.unbind = on(doc, 'mousemove', function (e) {

            if (ticking) {
                return;
            }

            setTimeout(function () {

                var time = Date.now();
                var ref = this$1.positions;
                var length = ref.length;

                if (length && (time - this$1.positions[length - 1].time > 100)) {
                    this$1.positions.splice(0, length);
                }

                this$1.positions.push({time: time, x: e.pageX, y: e.pageY});

                if (this$1.positions.length > 5) {
                    this$1.positions.shift();
                }

                ticking = false;
            }, 5);

            ticking = true;
        });

    },

    cancel: function cancel() {
        if (this.unbind) {
            this.unbind();
        }
    },

    movesTo: function movesTo(target) {

        if (this.positions.length < 2) {
            return false;
        }

        var p = offset(target);
        var position$$1 = this.positions[this.positions.length - 1];
        var ref = this.positions;
        var prevPos = ref[0];

        if (p.left <= position$$1.x && position$$1.x <= p.right && p.top <= position$$1.y && position$$1.y <= p.bottom) {
            return false;
        }

        var points = [
            [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
            [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
        ];

        if (p.right <= position$$1.x) {
            // empty
        } else if (p.left >= position$$1.x) {
            points[0].reverse();
            points[1].reverse();
        } else if (p.bottom <= position$$1.y) {
            points[0].reverse();
        } else if (p.top >= position$$1.y) {
            points[1].reverse();
        }

        return !!points.reduce(function (result, point) {
            return result + (slope(prevPos, point[0]) < slope(position$$1, point[0]) && slope(prevPos, point[1]) > slope(position$$1, point[1]));
        }, 0);
    }

};

function slope(a, b) {
    return (b.y - a.y) / (b.x - a.x);
}

var strats = {};

// concat strategy
strats.args =
strats.events =
strats.init =
strats.created =
strats.beforeConnect =
strats.connected =
strats.ready =
strats.beforeDisconnect =
strats.disconnected =
strats.destroy = function (parentVal, childVal) {

    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
};

// update strategy
strats.update = function (parentVal, childVal) {
    return strats.args(parentVal, isFunction(childVal) ? {read: childVal} : childVal);
};

// property strategy
strats.props = function (parentVal, childVal) {

    if (isArray(childVal)) {
        childVal = childVal.reduce(function (value, key) {
            value[key] = String;
            return value;
        }, {});
    }

    return strats.methods(parentVal, childVal);
};

// extend strategy
strats.computed =
strats.defaults =
strats.methods = function (parentVal, childVal) {
    return childVal
        ? parentVal
            ? assign({}, parentVal, childVal)
            : childVal
        : parentVal;
};

// default strategy
var defaultStrat = function (parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
};

function mergeOptions(parent, child) {

    var options = {};

    if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i]);
        }
    }

    for (var key in parent) {
        mergeKey(key);
    }

    for (var key$1 in child) {
        if (!hasOwn(parent, key$1)) {
            mergeKey(key$1);
        }
    }

    function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key]);
    }

    return options;
}

var id = 0;

var Player = function Player(el) {
    this.id = ++id;
    this.el = toNode(el);
};

Player.prototype.isVideo = function isVideo () {
    return this.isYoutube() || this.isVimeo() || this.isHTML5();
};

Player.prototype.isHTML5 = function isHTML5 () {
    return this.el.tagName === 'VIDEO';
};

Player.prototype.isIFrame = function isIFrame () {
    return this.el.tagName === 'IFRAME';
};

Player.prototype.isYoutube = function isYoutube () {
    return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
};

Player.prototype.isVimeo = function isVimeo () {
    return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
};

Player.prototype.enableApi = function enableApi () {
        var this$1 = this;


    if (this.ready) {
        return this.ready;
    }

    var youtube = this.isYoutube();
    var vimeo = this.isVimeo();

    var poller;

    if (youtube || vimeo) {

        return this.ready = new Promise(function (resolve) {

            once(this$1.el, 'load', function () {
                if (youtube) {
                    var listener = function () { return post(this$1.el, {event: 'listening', id: this$1.id}); };
                    poller = setInterval(listener, 100);
                    listener();
                }
            });

            listen(function (data$$1) { return youtube && data$$1.id === this$1.id && data$$1.event === 'onReady' || vimeo && Number(data$$1.player_id) === this$1.id; })
                .then(function () {
                    resolve();
                    poller && clearInterval(poller);
                });

            attr(this$1.el, 'src', ("" + (this$1.el.src) + (includes(this$1.el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : ("api=1&player_id=" + id))));

        });

    }

    return Promise.resolve();

};

Player.prototype.play = function play () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'playVideo', method: 'play'}); });
    } else if (this.isHTML5()) {
        try {
            this.el.play();
        } catch (e) {}
    }
};

Player.prototype.pause = function pause () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'pauseVideo', method: 'pause'}); });
    } else if (this.isHTML5()) {
        this.el.pause();
    }
};

Player.prototype.mute = function mute () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'mute', method: 'setVolume', value: 0}); });
    } else if (this.isHTML5()) {
        this.el.muted = true;
        attr(this.el, 'muted', '');
    }

};

function post(el, cmd) {
    try {
        el.contentWindow.postMessage(JSON.stringify(assign({event: 'command'}, cmd)), '*');
    } catch (e) {}
}

function listen(cb) {

    return new Promise(function (resolve) {

        once(win, 'message', function (_, data$$1) { return resolve(data$$1); }, false, function (ref) {
            var data$$1 = ref.data;


            if (!data$$1 || !isString(data$$1)) {
                return;
            }

            try {
                data$$1 = JSON.parse(data$$1);
            } catch (e) {
                return;
            }

            return data$$1 && cb(data$$1);

        });

    });

}

/*
    Based on:
    Copyright (c) 2010-2016 Thomas Fuchs
    http://zeptojs.com/
*/
var touch = {};
var clickTimeout;
var swipeTimeout;
var tapTimeout;
var clicked;

function swipeDirection(ref) {
    var x1 = ref.x1;
    var x2 = ref.x2;
    var y1 = ref.y1;
    var y2 = ref.y2;

    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
}

function cancelAll() {
    clickTimeout && clearTimeout(clickTimeout);
    swipeTimeout && clearTimeout(swipeTimeout);
    tapTimeout && clearTimeout(tapTimeout);
    clickTimeout = swipeTimeout = tapTimeout = null;
    touch = {};
}

ready(function () {

    on(doc, 'click', function () { return clicked = true; }, true);

    on(doc, pointerDown, function (e) {

        var target = e.target;
        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;
        var now = Date.now();
        var type = getType(e.type);

        if (touch.type && touch.type !== type) {
            return;
        }

        touch.el = 'tagName' in target ? target : target.parentNode;

        clickTimeout && clearTimeout(clickTimeout);

        touch.x1 = x;
        touch.y1 = y;

        if (touch.last && now - touch.last <= 250) {
            touch = {};
        }

        touch.type = type;
        touch.last = now;

        clicked = e.button > 0;

    });

    on(doc, pointerMove, function (e) {

        if (e.defaultPrevented) {
            return;
        }

        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;

        touch.x2 = x;
        touch.y2 = y;

    });

    on(doc, pointerUp, function (ref) {
        var type = ref.type;
        var target = ref.target;


        if (touch.type !== getType(type)) {
            return;
        }

        // swipe
        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {

            swipeTimeout = setTimeout(function () {
                if (touch.el) {
                    trigger(touch.el, 'swipe');
                    trigger(touch.el, ("swipe" + (swipeDirection(touch))));
                }
                touch = {};
            });

        // normal tap
        } else if ('last' in touch) {

            tapTimeout = setTimeout(function () { return trigger(touch.el, 'tap'); });

            // trigger single click after 350ms of inactivity
            if (touch.el && type !== 'mouseup' && within(target, touch.el)) {
                clickTimeout = setTimeout(function () {
                    clickTimeout = null;
                    if (touch.el && !clicked) {
                        trigger(touch.el, 'click');
                    }
                    touch = {};
                }, 350);
            }

        } else {
            touch = {};
        }

    });

    on(doc, 'touchcancel', cancelAll);
    on(win, 'scroll', cancelAll);

});

var touching = false;
on(doc, 'touchstart', function () { return touching = true; }, true);
on(doc, 'click', function () {touching = false;});
on(doc, 'touchcancel', function () { return touching = false; }, true);

function isTouch(e) {
    return touching || e.pointerType === 'touch';
}

function getPos$1(e) {
    var touches = e.touches;
    var changedTouches = e.changedTouches;
    var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
    var x = ref.pageX;
    var y = ref.pageY;

    return {x: x, y: y};
}

function getType(type) {
    return type.slice(0, 5);
}



var util = Object.freeze({
	ajax: ajax,
	transition: transition,
	Transition: Transition,
	animate: animate,
	Animation: Animation,
	attr: attr,
	hasAttr: hasAttr,
	removeAttr: removeAttr,
	filterAttr: filterAttr,
	data: data,
	addClass: addClass,
	removeClass: removeClass,
	removeClasses: removeClasses,
	replaceClass: replaceClass,
	hasClass: hasClass,
	toggleClass: toggleClass,
	$: $,
	$$: $$,
	positionAt: positionAt,
	offset: offset,
	position: position,
	height: height,
	width: width,
	flipPosition: flipPosition,
	isInView: isInView,
	scrolledOver: scrolledOver,
	isReady: isReady,
	ready: ready,
	index: index,
	getIndex: getIndex,
	empty: empty,
	html: html,
	prepend: prepend,
	append: append,
	before: before,
	after: after,
	remove: remove,
	wrapAll: wrapAll,
	wrapInner: wrapInner,
	unwrap: unwrap,
	fragment: fragment,
	win: win,
	doc: doc,
	docEl: docEl,
	isRtl: isRtl,
	Observer: Observer,
	hasTouch: hasTouch,
	pointerDown: pointerDown,
	pointerMove: pointerMove,
	pointerUp: pointerUp,
	pointerEnter: pointerEnter,
	pointerLeave: pointerLeave,
	getImage: getImage,
	supports: supports,
	on: on,
	off: off,
	once: once,
	trigger: trigger,
	createEvent: createEvent,
	toEventTargets: toEventTargets,
	preventClick: preventClick,
	fastdom: fastdom,
	isVoidElement: isVoidElement,
	isVisible: isVisible,
	selInput: selInput,
	isInput: isInput,
	filter: filter,
	within: within,
	bind: bind,
	hasOwn: hasOwn,
	hyphenate: hyphenate,
	camelize: camelize,
	ucfirst: ucfirst,
	startsWith: startsWith,
	endsWith: endsWith,
	includes: includes,
	isArray: isArray,
	isFunction: isFunction,
	isObject: isObject,
	isPlainObject: isPlainObject,
	isWindow: isWindow,
	isDocument: isDocument,
	isJQuery: isJQuery,
	isNode: isNode,
	isNodeCollection: isNodeCollection,
	isBoolean: isBoolean,
	isString: isString,
	isNumber: isNumber,
	isNumeric: isNumeric,
	isUndefined: isUndefined,
	toBoolean: toBoolean,
	toNumber: toNumber,
	toFloat: toFloat,
	toNode: toNode,
	toNodes: toNodes,
	toList: toList,
	toMs: toMs,
	swap: swap,
	assign: assign,
	each: each,
	sortBy: sortBy,
	clamp: clamp,
	noop: noop,
	intersectRect: intersectRect,
	pointInRect: pointInRect,
	Dimensions: Dimensions,
	MouseTracker: MouseTracker,
	mergeOptions: mergeOptions,
	Player: Player,
	Promise: Promise,
	Deferred: Deferred,
	query: query,
	queryAll: queryAll,
	find: find,
	findAll: findAll,
	matches: matches,
	closest: closest,
	parents: parents,
	escape: escape,
	css: css,
	getStyles: getStyles,
	getStyle: getStyle,
	getCssVar: getCssVar,
	propName: propName,
	isTouch: isTouch,
	getPos: getPos$1
});

function componentAPI (UIkit) {

    var DATA = UIkit.data;

    UIkit.components = {};

    UIkit.component = function (id, options) {

        var name = camelize(id);

        if (isPlainObject(options)) {
            options.name = name;
            options = UIkit.extend(options);
        } else if (isUndefined(options)) {
            return UIkit.components[name];
        } else {
            options.options.name = name;
        }

        UIkit.components[name] = options;

        UIkit[name] = function (element, data) {
            var i = arguments.length, argsArray = Array(i);
            while ( i-- ) argsArray[i] = arguments[i];


            if (isPlainObject(element)) {
                return new UIkit.components[name]({data: element});
            }

            if (UIkit.components[name].options.functional) {
                return new UIkit.components[name]({data: [].concat( argsArray )});
            }

            return element && element.nodeType ? init(element) : $$(element).map(init)[0];

            function init(element) {

                var cmp = UIkit.getComponent(element, name);

                if (cmp && data) {
                    cmp.$reset(data);
                }

                return cmp || new UIkit.components[name]({el: element, data: data || {}});
            }

        };

        if (UIkit._initialized && !options.options.functional) {
            fastdom.read(function () { return UIkit[name](("[uk-" + id + "],[data-uk-" + id + "]")); });
        }

        return UIkit.components[name];
    };

    UIkit.getComponents = function (element) { return element && (element = isJQuery(element) ? element[0] : element) && element[DATA] || {}; };
    UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

    UIkit.connect = function (node) {

        if (node[DATA]) {
            for (var name in node[DATA]) {
                node[DATA][name]._callConnected();
            }
        }

        for (var i = 0; i < node.attributes.length; i++) {

            var name$1 = getComponentName(node.attributes[i].name);

            if (name$1 && name$1 in UIkit.components) {
                UIkit[name$1](node);
            }

        }

    };

    UIkit.disconnect = function (node) {
        for (var name in node[DATA]) {
            node[DATA][name]._callDisconnected();
        }
    };

}

function getComponentName(attribute) {
    return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-')
        ? camelize(attribute.replace('data-uk-', '').replace('uk-', ''))
        : false;
}

function boot (UIkit) {

    var connect = UIkit.connect;
    var disconnect = UIkit.disconnect;

    if (!Observer) {
        return;
    }

    if (doc.body) {

        init();

    } else {

        (new Observer(function () {

            if (doc.body) {
                this.disconnect();
                init();
            }

        })).observe(docEl, {childList: true, subtree: true});

    }

    function init() {

        apply(doc.body, connect);

        fastdom.flush();

        (new Observer(function (mutations) { return mutations.forEach(applyMutation); })).observe(docEl, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });

        UIkit._initialized = true;
    }

    function applyMutation(mutation) {

        var target = mutation.target;
        var type = mutation.type;

        var update = type !== 'attributes'
            ? applyChildList(mutation)
            : applyAttribute(mutation);

        update && UIkit.update('update', target, true);

    }

    function applyAttribute(ref) {
        var target = ref.target;
        var attributeName = ref.attributeName;


        if (attributeName === 'href') {
            return true;
        }

        var name = getComponentName(attributeName);

        if (!name || !(name in UIkit.components)) {
            return;
        }

        if (hasAttr(target, attributeName)) {
            UIkit[name](target);
            return true;
        }

        var component = UIkit.getComponent(target, name);

        if (component) {
            component.$destroy();
            return true;
        }

    }

    function applyChildList(ref) {
        var addedNodes = ref.addedNodes;
        var removedNodes = ref.removedNodes;


        for (var i = 0; i < addedNodes.length; i++) {
            apply(addedNodes[i], connect);
        }

        for (var i$1 = 0; i$1 < removedNodes.length; i$1++) {
            apply(removedNodes[i$1], disconnect);
        }

        return true;
    }
    function apply(node, fn) {

        if (node.nodeType !== 1 || hasAttr(node, 'uk-no-boot')) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            var next = node.nextElementSibling;
            apply(node, fn);
            node = next;
        }
    }

}

function globalAPI (UIkit) {

    var DATA = UIkit.data;

    UIkit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    UIkit.mixin = function (mixin, component) {
        component = (isString(component) ? UIkit.components[component] : component) || this;
        mixin = mergeOptions({}, mixin);
        mixin.mixins = component.options.mixins;
        delete component.options.mixins;
        component.options = mergeOptions(mixin, component.options);
    };

    UIkit.extend = function (options) {

        options = options || {};

        var Super = this;
        var Sub = function UIkitComponent (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub['super'] = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    UIkit.update = function (e, element, parents) {
        if ( parents === void 0 ) parents = false;


        e = createEvent(e || 'update');

        if (!element) {

            update(UIkit.instances, e);
            return;

        }

        element = toNode(element);

        if (parents) {

            do {

                update(element[DATA], e);
                element = element.parentNode;

            } while (element);

        } else {

            apply(element, function (element) { return update(element[DATA], e); });

        }

    };

    var container;
    Object.defineProperty(UIkit, 'container', {

        get: function get() {
            return container || doc.body;
        },

        set: function set(element) {
            container = $(element);
        }

    });

    function apply(node, fn) {

        if (node.nodeType !== 1) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            apply(node, fn);
            node = node.nextElementSibling;
        }
    }

    function update(data, e) {

        if (!data) {
            return;
        }

        for (var name in data) {
            if (data[name]._isReady) {
                data[name]._callUpdate(e);
            }
        }

    }

}

function hooksAPI (UIkit) {

    UIkit.prototype._callHook = function (hook) {
        var this$1 = this;


        var handlers = this.$options[hook];

        if (handlers) {
            handlers.forEach(function (handler) { return handler.call(this$1); });
        }
    };

    UIkit.prototype._callConnected = function () {
        var this$1 = this;


        if (this._connected) {
            return;
        }

        if (!includes(UIkit.elements, this.$options.el)) {
            UIkit.elements.push(this.$options.el);
        }

        UIkit.instances[this._uid] = this;

        this._data = {};

        this._callHook('beforeConnect');
        this._connected = true;

        this._initEvents();
        this._initObserver();

        this._callHook('connected');

        if (!this._isReady) {
            ready(function () { return this$1._callReady(); });
        }

        this._callUpdate();
    };

    UIkit.prototype._callDisconnected = function () {

        if (!this._connected) {
            return;
        }

        this._callHook('beforeDisconnect');

        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }

        var index = UIkit.elements.indexOf(this.$options.el);

        if (~index) {
            UIkit.elements.splice(index, 1);
        }

        delete UIkit.instances[this._uid];

        this._unbindEvents();
        this._callHook('disconnected');

        this._connected = false;

    };

    UIkit.prototype._callReady = function () {

        if (this._isReady) {
            return;
        }

        this._isReady = true;
        this._callHook('ready');
        this._resetComputeds();
        this._callUpdate();
    };

    UIkit.prototype._callUpdate = function (e) {
        var this$1 = this;


        e = createEvent(e || 'update');

        var type = e.type;

        if (includes(['update', 'load', 'resize'], type)) {
            this._resetComputeds();
        }

        var updates = this.$options.update;
        var ref = this._frames;
        var reads = ref.reads;
        var writes = ref.writes;

        if (!updates) {
            return;
        }

        updates.forEach(function (ref, i) {
            var read = ref.read;
            var write = ref.write;
            var events = ref.events;


            if (type !== 'update' && !includes(events, type)) {
                return;
            }

            if (read && !includes(fastdom.reads, reads[i])) {
                reads[i] = fastdom.read(function () {

                    var result = read.call(this$1, this$1._data, e);

                    if (result === false && write) {
                        fastdom.clear(writes[i]);
                        delete writes[i];
                    } else if (isPlainObject(result)) {
                        assign(this$1._data, result);
                    }
                    delete reads[i];
                });
            }

            if (write && !includes(fastdom.writes, writes[i])) {
                writes[i] = fastdom.write(function () {
                    write.call(this$1, this$1._data, e);
                    delete writes[i];
                });
            }

        });

    };

}

function stateAPI (UIkit) {

    var uid = 0;

    UIkit.prototype.props = {};

    UIkit.prototype._init = function (options) {

        options = options || {};
        options = this.$options = mergeOptions(this.constructor.options, options, this);

        this.$el = null;
        this.$name = UIkit.prefix + hyphenate(this.$options.name);
        this.$props = {};

        this._frames = {reads: {}, writes: {}};
        this._events = [];

        this._uid = uid++;
        this._initData();
        this._initMethods();
        this._initComputeds();
        this._callHook('created');

        if (options.el) {
            this.$mount(options.el);
        }
    };

    UIkit.prototype._initData = function () {
        var this$1 = this;


        var ref = this.$options;
        var defaults = ref.defaults;
        var data$$1 = ref.data; if ( data$$1 === void 0 ) data$$1 = {};
        var args = ref.args; if ( args === void 0 ) args = [];
        var props = ref.props; if ( props === void 0 ) props = {};
        var el = ref.el;

        if (args.length && isArray(data$$1)) {
            data$$1 = data$$1.slice(0, args.length).reduce(function (data$$1, value, index) {
                if (isPlainObject(value)) {
                    assign(data$$1, value);
                } else {
                    data$$1[args[index]] = value;
                }
                return data$$1;
            }, {});
        }

        for (var key in assign({}, defaults, props)) {
            this$1.$props[key] = this$1[key] = hasOwn(data$$1, key) && !isUndefined(data$$1[key])
                ? coerce(props[key], data$$1[key], el)
                : defaults
                    ? defaults[key] && isArray(defaults[key])
                        ? defaults[key].concat()
                        : defaults[key]
                    : null;
        }
    };

    UIkit.prototype._initMethods = function () {
        var this$1 = this;


        var ref = this.$options;
        var methods = ref.methods;

        if (methods) {
            for (var key in methods) {
                this$1[key] = bind(methods[key], this$1);
            }
        }
    };

    UIkit.prototype._initComputeds = function () {
        var this$1 = this;


        var ref = this.$options;
        var computed = ref.computed;

        this._resetComputeds();

        if (computed) {
            for (var key in computed) {
                registerComputed(this$1, key, computed[key]);
            }
        }
    };

    UIkit.prototype._resetComputeds = function () {
        this._computeds = {};
    };

    UIkit.prototype._initProps = function (props) {
        var this$1 = this;


        var key;

        this._resetComputeds();

        props = props || getProps(this.$options, this.$name);

        for (key in props) {
            if (!isUndefined(props[key])) {
                this$1.$props[key] = props[key];
            }
        }

        var exclude = [this.$options.computed, this.$options.methods];
        for (key in this$1.$props) {
            if (key in props && notIn(exclude, key)) {
                this$1[key] = this$1.$props[key];
            }
        }
    };

    UIkit.prototype._initEvents = function () {
        var this$1 = this;


        var ref = this.$options;
        var events = ref.events;

        if (events) {

            events.forEach(function (event) {

                if (!hasOwn(event, 'handler')) {
                    for (var key in event) {
                        registerEvent(this$1, event[key], key);
                    }
                } else {
                    registerEvent(this$1, event);
                }

            });
        }
    };

    UIkit.prototype._unbindEvents = function () {
        this._events.forEach(function (unbind) { return unbind(); });
        this._events = [];
    };

    UIkit.prototype._initObserver = function () {
        var this$1 = this;


        var ref = this.$options;
        var attrs = ref.attrs;
        var props = ref.props;
        var el = ref.el;
        if (this._observer || !props || !attrs || !Observer) {
            return;
        }

        attrs = isArray(attrs) ? attrs : Object.keys(props).map(function (key) { return hyphenate(key); });

        this._observer = new Observer(function () {

            var data$$1 = getProps(this$1.$options, this$1.$name);
            if (attrs.some(function (key) { return !isUndefined(data$$1[key]) && data$$1[key] !== this$1.$props[key]; })) {
                this$1.$reset(data$$1);
            }

        });

        this._observer.observe(el, {attributes: true, attributeFilter: attrs.concat([this.$name, ("data-" + (this.$name))])});
    };

    function getProps(opts, name) {

        var data$$1 = {};
        var args = opts.args; if ( args === void 0 ) args = [];
        var props = opts.props; if ( props === void 0 ) props = {};
        var el = opts.el;

        if (!props) {
            return data$$1;
        }

        for (var key in props) {
            var prop = hyphenate(key);
            if (hasAttr(el, prop)) {

                var value = coerce(props[key], attr(el, prop), el);

                if (prop === 'target' && (!value || startsWith(value, '_'))) {
                    continue;
                }

                data$$1[key] = value;
            }
        }

        var options = parseOptions(data(el, name), args);

        for (var key$1 in options) {
            var prop$1 = camelize(key$1);
            if (props[prop$1] !== undefined) {
                data$$1[prop$1] = coerce(props[prop$1], options[key$1], el);
            }
        }

        return data$$1;
    }

    function parseOptions(options, args) {
        var obj;

        if ( args === void 0 ) args = [];

        try {

            return !options
                ? {}
                : startsWith(options, '{')
                    ? JSON.parse(options)
                    : args.length && !includes(options, ':')
                        ? (( obj = {}, obj[args[0]] = options, obj))
                        : options.split(';').reduce(function (options, option) {
                            var ref = option.split(/:(.+)/);
                            var key = ref[0];
                            var value = ref[1];
                            if (key && value) {
                                options[key.trim()] = value.trim();
                            }
                            return options;
                        }, {});

        } catch (e) {
            return {};
        }

    }

    function registerComputed(component, key, cb) {
        Object.defineProperty(component, key, {

            enumerable: true,

            get: function get() {

                var _computeds = component._computeds;
                var $props = component.$props;
                var $el = component.$el;

                if (!hasOwn(_computeds, key)) {
                    _computeds[key] = cb.call(component, $props, $el);
                }

                return _computeds[key];
            },

            set: function set(value) {
                component._computeds[key] = value;
            }

        });
    }

    function registerEvent(component, event, key) {

        if (!isPlainObject(event)) {
            event = ({name: key, handler: event});
        }

        var name = event.name;
        var el = event.el;
        var handler = event.handler;
        var capture = event.capture;
        var delegate = event.delegate;
        var filter = event.filter;
        var self = event.self;
        el = isFunction(el)
            ? el.call(component)
            : el || component.$el;

        if (isArray(el)) {
            el.forEach(function (el) { return registerEvent(component, assign({}, event, {el: el}), key); });
            return;
        }

        if (!el || filter && !filter.call(component)) {
            return;
        }

        handler = detail(isString(handler) ? component[handler] : bind(handler, component));

        if (self) {
            handler = selfFilter(handler);
        }

        component._events.push(
            on(
                el,
                name,
                !delegate
                    ? null
                    : isString(delegate)
                        ? delegate
                        : delegate.call(component),
                handler,
                capture
            )
        );

    }

    function selfFilter(handler) {
        return function selfHandler(e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return handler.call(null, e);
            }
        };
    }

    function notIn(options, key) {
        return options.every(function (arr) { return !arr || !hasOwn(arr, key); });
    }

    function detail(listener) {
        return function (e) { return isArray(e.detail) ? listener.apply(void 0, [e].concat(e.detail)) : listener(e); };
    }

    function coerce(type, value, context) {

        if (type === Boolean) {
            return toBoolean(value);
        } else if (type === Number) {
            return toNumber(value);
        } else if (type === 'query') {
            return query(value, context);
        } else if (type === 'list') {
            return toList(value);
        } else if (type === 'media') {
            return toMedia(value);
        }

        return type ? type(value) : value;
    }

    function toMedia(value) {

        if (isString(value)) {
            if (value[0] === '@') {
                var name = "media-" + (value.substr(1));
                value = toFloat(getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }

        return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false;
    }

}

function instanceAPI (UIkit) {

    var DATA = UIkit.data;

    UIkit.prototype.$mount = function (el) {

        var ref = this.$options;
        var name = ref.name;

        if (!el[DATA]) {
            el[DATA] = {};
        }

        if (el[DATA][name]) {
            return;
        }

        el[DATA][name] = this;

        this.$el = this.$options.el = this.$options.el || el;

        this._initProps();

        this._callHook('init');

        if (within(el, docEl)) {
            this._callConnected();
        }
    };

    UIkit.prototype.$emit = function (e) {
        this._callUpdate(e);
    };

    UIkit.prototype.$update = function (e, parents) {
        UIkit.update(e, this.$options.el, parents);
    };

    UIkit.prototype.$reset = function (data) {
        this._callDisconnected();
        this._initProps(data);
        this._callConnected();
    };

    UIkit.prototype.$destroy = function (removeEl) {
        if ( removeEl === void 0 ) removeEl = false;


        var ref = this.$options;
        var el = ref.el;
        var name = ref.name;

        if (el) {
            this._callDisconnected();
        }

        this._callHook('destroy');

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
        }

        if (removeEl) {
            remove(this.$el);
        }
    };

}

var UIkit$2 = function (options) {
    this._init(options);
};

UIkit$2.util = util;
UIkit$2.data = '__uikit__';
UIkit$2.prefix = 'uk-';
UIkit$2.options = {};
UIkit$2.instances = {};
UIkit$2.elements = [];

globalAPI(UIkit$2);
hooksAPI(UIkit$2);
stateAPI(UIkit$2);
instanceAPI(UIkit$2);
componentAPI(UIkit$2);

var Class = {

    init: function init() {
        addClass(this.$el, this.$name);
    }

};

var Container = {

    props: {
        container: Boolean
    },

    defaults: {
        container: true
    },

    computed: {

        container: function container(ref) {
            var container = ref.container;

            return container === true && UIkit$2.container || container && $(container);
        }

    }

};

var Togglable = {

    props: {
        cls: Boolean,
        animation: 'list',
        duration: Number,
        origin: String,
        transition: String,
        queued: Boolean
    },

    defaults: {
        cls: false,
        animation: [false],
        duration: 200,
        origin: false,
        transition: 'linear',
        queued: false,

        initProps: {
            overflow: '',
            height: '',
            paddingTop: '',
            paddingBottom: '',
            marginTop: '',
            marginBottom: ''
        },

        hideProps: {
            overflow: 'hidden',
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0
        }

    },

    computed: {

        hasAnimation: function hasAnimation(ref) {
            var animation = ref.animation;

            return !!animation[0];
        },

        hasTransition: function hasTransition(ref) {
            var animation = ref.animation;

            return this.hasAnimation && animation[0] === true;
        }

    },

    methods: {

        toggleElement: function toggleElement(targets, show, animate) {
            var this$1 = this;

            return new Promise(function (resolve) {

                targets = toNodes(targets);

                var all = function (targets) { return Promise.all(targets.map(function (el) { return this$1._toggleElement(el, show, animate); })); };
                var toggled = targets.filter(function (el) { return this$1.isToggled(el); });
                var untoggled = targets.filter(function (el) { return !includes(toggled, el); });

                var p;

                if (!this$1.queued || !isUndefined(animate) || !isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

                    p = all(untoggled.concat(toggled));

                } else {

                    var body = doc.body;
                    var scroll = body.scrollTop;
                    var el = toggled[0];
                    var inProgress = Animation.inProgress(el) && hasClass(el, 'uk-animation-leave')
                            || Transition.inProgress(el) && el.style.height === '0px';

                    p = all(toggled);

                    if (!inProgress) {
                        p = p.then(function () {
                            var p = all(untoggled);
                            body.scrollTop = scroll;
                            return p;
                        });
                    }

                }

                p.then(resolve, noop);

            });
        },

        toggleNow: function toggleNow(targets, show) {
            var this$1 = this;

            return new Promise(function (resolve) { return Promise.all(toNodes(targets).map(function (el) { return this$1._toggleElement(el, show, false); })).then(resolve, noop); });
        },

        isToggled: function isToggled(el) {
            var nodes = toNodes(el || this.$el);
            return this.cls
                ? hasClass(nodes, this.cls.split(' ')[0])
                : !hasAttr(nodes, 'hidden');
        },

        updateAria: function updateAria(el) {
            if (this.cls === false) {
                attr(el, 'aria-hidden', !this.isToggled(el));
            }
        },

        _toggleElement: function _toggleElement(el, show, animate) {
            var this$1 = this;


            show = isBoolean(show)
                ? show
                : Animation.inProgress(el)
                    ? hasClass(el, 'uk-animation-leave')
                    : Transition.inProgress(el)
                        ? el.style.height === '0px'
                        : !this.isToggled(el);

            if (!trigger(el, ("before" + (show ? 'show' : 'hide')), [this])) {
                return Promise.reject();
            }

            var promise = (animate === false || !this.hasAnimation
                ? this._toggleImmediate
                : this.hasTransition
                    ? this._toggleHeight
                    : this._toggleAnimation
            )(el, show);

            trigger(el, show ? 'show' : 'hide', [this]);

            return promise.then(function () {
                trigger(el, show ? 'shown' : 'hidden', [this$1]);
                UIkit$2.update(null, el);
            });
        },

        _toggle: function _toggle(el, toggled) {

            if (!el) {
                return;
            }

            if (this.cls) {
                toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
            } else {
                attr(el, 'hidden', !toggled ? '' : null);
            }

            $$('[autofocus]', el).some(function (el) { return isVisible(el) && (el.focus() || true); });

            this.updateAria(el);
            UIkit$2.update(null, el);
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            this._toggle(el, show);
            return Promise.resolve();
        },

        _toggleHeight: function _toggleHeight(el, show) {
            var this$1 = this;


            var inProgress = Transition.inProgress(el);
            var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
            var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

            Transition.cancel(el);

            if (!this.isToggled(el)) {
                this._toggle(el, true);
            }

            height(el, '');

            // Update child components first
            fastdom.flush();

            var endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);

            return (show
                ? Transition.start(el, assign({}, this.initProps, {overflow: 'hidden', height: endHeight}), Math.round(this.duration * (1 - currentHeight / endHeight)), this.transition)
                : Transition.start(el, this.hideProps, Math.round(this.duration * (currentHeight / endHeight)), this.transition).then(function () { return this$1._toggle(el, false); })
            ).then(function () { return css(el, this$1.initProps); });

        },

        _toggleAnimation: function _toggleAnimation(el, show) {
            var this$1 = this;


            Animation.cancel(el);

            if (show) {
                this._toggle(el, true);
                return Animation.in(el, this.animation[0], this.duration, this.origin);
            }

            return Animation.out(el, this.animation[1] || this.animation[0], this.duration, this.origin).then(function () { return this$1._toggle(el, false); });
        }

    }

};

var active;

var Modal = {

    mixins: [Class, Container, Togglable],

    props: {
        clsPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean
    },

    defaults: {
        cls: 'uk-open',
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false
    },

    computed: {

        panel: function panel(ref, $el) {
            var clsPanel = ref.clsPanel;

            return $(("." + clsPanel), $el);
        },

        transitionElement: function transitionElement() {
            return this.panel;
        },

        transitionDuration: function transitionDuration() {
            return toMs(css(this.transitionElement, 'transitionDuration'));
        }

    },

    events: [

        {

            name: 'click',

            delegate: function delegate() {
                return this.selClose;
            },

            handler: function handler(e) {
                e.preventDefault();
                this.hide();
            }

        },

        {

            name: 'toggle',

            self: true,

            handler: function handler(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.toggle();
            }

        },

        {
            name: 'beforeshow',

            self: true,

            handler: function handler(e) {

                var prev = active && active !== this && active;

                active = this;

                if (prev) {
                    if (this.stack) {
                        this.prev = prev;
                    } else {
                        prev.hide().then(this.show);
                        e.preventDefault();
                        return;
                    }
                }

                registerEvents();

            }

        },

        {
            name: 'beforehide',

            self: true,

            handler: function handler() {

                active = active && active !== this && active || this.prev;

                if (!active) {
                    deregisterEvents();
                }

            }

        },

        {

            name: 'show',

            self: true,

            handler: function handler() {

                if (!hasClass(docEl, this.clsPage)) {
                    this.scrollbarWidth = width(win) - docEl.offsetWidth;
                    css(doc.body, 'overflowY', this.scrollbarWidth && this.overlay ? 'scroll' : '');
                }

                addClass(docEl, this.clsPage);

            }

        },

        {

            name: 'hidden',

            self: true,

            handler: function handler() {
                var this$1 = this;


                var found;
                var ref = this;
                var prev = ref.prev;

                while (prev) {

                    if (prev.clsPage === this$1.clsPage) {
                        found = true;
                        break;
                    }

                    prev = prev.prev;

                }

                if (!found) {
                    removeClass(docEl, this.clsPage);

                }

                !this.prev && css(doc.body, 'overflowY', '');
            }

        }

    ],

    methods: {

        toggle: function toggle() {
            return this.isToggled() ? this.hide() : this.show();
        },

        show: function show() {

            if (this.isToggled()) {
                return;
            }

            if (this.container && this.$el.parentNode !== this.container) {
                append(this.container, this.$el);
                this._callConnected();
            }

            return this.toggleNow(this.$el, true);
        },

        hide: function hide() {
            if (this.isToggled()) {
                return this.toggleNow(this.$el, false);
            }
        },

        getActive: function getActive() {
            return active;
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            var this$1 = this;

            return new Promise(function (resolve) { return requestAnimationFrame(function () {
                    this$1._toggle(el, show);

                    if (this$1.transitionDuration) {
                        once(this$1.transitionElement, 'transitionend', resolve, false, function (e) { return e.target === this$1.transitionElement; });
                    } else {
                        resolve();
                    }
                }); }
            );
        }

    }

};

var events;

function registerEvents() {

    if (events) {
        return;
    }

    events = [
        on(docEl, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            if (active && active.bgClose && !defaultPrevented && !within(target, (active.panel || active.$el))) {
                active.hide();
            }
        }),
        on(doc, 'keydown', function (e) {
            if (e.keyCode === 27 && active && active.escClose) {
                e.preventDefault();
                active.hide();
            }
        })
    ];
}

function deregisterEvents() {
    events && events.forEach(function (unbind) { return unbind(); });
    events = null;
}

var Position = {

    props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String
    },

    defaults: {
        pos: ("bottom-" + (!isRtl ? 'left' : 'right')),
        flip: true,
        offset: false,
        clsPos: ''
    },

    computed: {

        pos: function pos(ref) {
            var pos = ref.pos;

            return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
        },

        dir: function dir() {
            return this.pos[0];
        },

        align: function align() {
            return this.pos[1];
        }

    },

    methods: {

        positionAt: function positionAt$1(element, target, boundary) {

            removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));
            css(element, {top: '', left: ''});

            var node;
            var ref = this;
            var offset$$1 = ref.offset;

            offset$$1 = isNumeric(offset$$1)
                ? offset$$1
                : (node = $(offset$$1))
                    ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
                    : 0;

            var axis = this.getAxis();
            var ref$1 = positionAt(
                element,
                target,
                axis === 'x' ? ((flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (flipPosition(this.dir))),
                axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
                axis === 'x' ? ("" + (this.dir === 'left' ? -offset$$1 : offset$$1)) : (" " + (this.dir === 'top' ? -offset$$1 : offset$$1)),
                null,
                this.flip,
                boundary
            ).target;
            var x = ref$1.x;
            var y = ref$1.y;

            this.dir = axis === 'x' ? x : y;
            this.align = axis === 'x' ? y : x;

            toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

        },

        getAxis: function getAxis() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
        }

    }

};

function mixin (UIkit) {

    UIkit.mixin.class = Class;
    UIkit.mixin.container = Container;
    UIkit.mixin.modal = Modal;
    UIkit.mixin.position = Position;
    UIkit.mixin.togglable = Togglable;

}

function Accordion (UIkit) {

    UIkit.component('accordion', {

        mixins: [Class, Togglable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String
        },

        defaults: {
            targets: '> *',
            active: false,
            animation: [true],
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '> .uk-accordion-title',
            content: '> .uk-accordion-content',
            transition: 'ease'
        },

        computed: {

            items: function items(ref, $el) {
                var targets = ref.targets;

                return $$(targets, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.targets) + " " + (this.$props.toggle));
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.toggle(index($$(((this.targets) + " " + (this.$props.toggle)), this.$el), e.current));
                }

            }

        ],

        connected: function connected() {

            if (this.active === false) {
                return;
            }

            var active = this.items[Number(this.active)];
            if (active && !hasClass(active, this.clsOpen)) {
                this.toggle(active, false);
            }
        },

        update: function update() {
            var this$1 = this;


            this.items.forEach(function (el) { return this$1._toggleImmediate($(this$1.content, el), hasClass(el, this$1.clsOpen)); });

            var active = !this.collapsible && !hasClass(this.items, this.clsOpen) && this.items[0];
            if (active) {
                this.toggle(active, false);
            }
        },

        methods: {

            toggle: function toggle(item, animate) {
                var this$1 = this;


                var index = getIndex(item, this.items);
                var active = filter(this.items, ("." + (this.clsOpen)));

                item = this.items[index];

                item && [item]
                    .concat(!this.multiple && !includes(active, item) && active || [])
                    .forEach(function (el) {

                        var isItem = el === item;
                        var state = isItem && !hasClass(el, this$1.clsOpen);

                        if (!state && isItem && !this$1.collapsible && active.length < 2) {
                            return;
                        }

                        toggleClass(el, this$1.clsOpen, state);

                        var content = el._wrapper ? el._wrapper.firstElementChild : $(this$1.content, el);

                        if (!el._wrapper) {
                            el._wrapper = wrapAll(content, '<div>');
                            attr(el._wrapper, 'hidden', state ? '' : null);
                        }

                        this$1._toggleImmediate(content, true);
                        this$1.toggleElement(el._wrapper, state, animate).then(function () {
                            if (hasClass(el, this$1.clsOpen) === state) {

                                if (!state) {
                                    this$1._toggleImmediate(content, false);
                                }

                                el._wrapper = null;
                                unwrap(content);
                            }
                        });

                    });
            }

        }

    });

}

function Alert (UIkit) {

    UIkit.component('alert', {

        attrs: true,

        mixins: [Class, Togglable],

        args: 'animation',

        props: {
            close: String
        },

        defaults: {
            animation: [true],
            selClose: '.uk-alert-close',
            duration: 150,
            hideProps: assign({opacity: 0}, Togglable.defaults.hideProps)
        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return this.selClose;
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.close();
                }

            }

        ],

        methods: {

            close: function close() {
                var this$1 = this;

                this.toggleElement(this.$el).then(function () { return this$1.$destroy(true); });
            }

        }

    });

}

function Core (UIkit) {

    ready(function () {

        var scroll = 0;
        var started = 0;

        on(win, 'load resize', UIkit.update);
        on(win, 'scroll', function (e) {
            e.dir = scroll <= win.pageYOffset ? 'down' : 'up';
            e.scrollY = scroll = win.pageYOffset;
            UIkit.update(e);
        });

        on(doc, 'animationstart', function (ref) {
            var target = ref.target;

            if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {
                started++;
                doc.body.style.overflowX = 'hidden';
                setTimeout(function () {
                    if (!--started) {
                        doc.body.style.overflowX = '';
                    }
                }, toMs(css(target, 'animationDuration')) + 100);
            }
        }, true);

        if (!hasTouch) {
            return;
        }

        var cls = 'uk-hover';

        on(doc, 'tap', function (ref) {
                var target = ref.target;

                return $$(("." + cls)).forEach(function (el) { return !within(target, el) && removeClass(el, cls); }
            );
        }
        );

        Object.defineProperty(UIkit, 'hoverSelector', {

            set: function set(selector) {
                on(doc, 'tap', selector, function (ref) {
                    var current = ref.current;

                    return addClass(current, cls);
                });
            }

        });

        UIkit.hoverSelector = '.uk-animation-toggle, .uk-transition-toggle, [uk-hover]';

    });

}

function Cover (UIkit) {

    UIkit.component('cover', {

        mixins: [Class, UIkit.components.video.options],

        props: {
            width: Number,
            height: Number
        },

        defaults: {
            automute: true
        },

        update: {

            write: function write() {

                var el = this.$el;

                if (!isVisible(el)) {
                    return;
                }

                var ref = el.parentNode;
                var height = ref.offsetHeight;
                var width = ref.offsetWidth;

                css(
                    css(el, {width: '', height: ''}),
                    Dimensions.cover(
                        {
                            width: this.width || el.clientWidth,
                            height: this.height || el.clientHeight
                        },
                        {
                            width: width + (width % 2 ? 1 : 0),
                            height: height + (height % 2 ? 1 : 0)
                        }
                    )
                );

            },

            events: ['load', 'resize']

        },

        events: {

            loadedmetadata: function loadedmetadata() {
                this.$emit();
            }

        }

    });

}

function Drop (UIkit) {

    var active;

    UIkit.component('drop', {

        mixins: [Position, Togglable],

        args: 'pos',

        props: {
            mode: 'list',
            toggle: Boolean,
            boundary: 'query',
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        defaults: {
            mode: ['click', 'hover'],
            toggle: true,
            boundary: win,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            hoverIdle: 200,
            animation: ['uk-animation-fade'],
            cls: 'uk-open'
        },

        computed: {

            clsDrop: function clsDrop(ref) {
                var clsDrop = ref.clsDrop;

                return clsDrop || ("uk-" + (this.$options.name));
            },

            clsPos: function clsPos() {
                return this.clsDrop;
            }

        },

        init: function init() {
            this.tracker = new MouseTracker();
            addClass(this.$el, this.clsDrop);
        },

        connected: function connected() {

            var ref = this.$props;
            var toggle = ref.toggle;
            this.toggle = toggle && UIkit.toggle(isString(toggle) ? query(toggle, this.$el) : this.$el.previousElementSibling, {
                target: this.$el,
                mode: this.mode
            });

            this.updateAria(this.$el);

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ("." + (this.clsDrop) + "-close");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    var id = e.target.hash;

                    if (!id) {
                        e.preventDefault();
                    }

                    if (!id || !within(id, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'beforescroll',

                handler: function handler() {
                    this.hide(false);
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function handler(e, toggle) {

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle, false);
                    }
                }

            },

            {

                name: pointerEnter,

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {

                    if (isTouch(e)) {
                        return;
                    }

                    if (active
                        && active !== this
                        && active.toggle
                        && includes(active.toggle.mode, 'hover')
                        && !within(e.target, active.toggle.$el)
                        && !pointInRect({x: e.pageX, y: e.pageY}, offset(active.$el))
                    ) {
                        active.hide(false);
                    }

                    e.preventDefault();
                    this.show(this.toggle);
                }

            },

            {

                name: 'toggleshow',

                handler: function handler(e, toggle) {

                    if (toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();
                    this.show(toggle || this.toggle);
                }

            },

            {

                name: ("togglehide " + pointerLeave),

                handler: function handler(e, toggle) {

                    if (isTouch(e) || toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();

                    if (this.toggle && includes(this.toggle.mode, 'hover')) {
                        this.hide();
                    }
                }

            },

            {

                name: 'beforeshow',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                    this.position();
                }

            },

            {

                name: 'show',

                self: true,

                handler: function handler() {
                    this.tracker.init();
                    addClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'true');
                    registerEvent();
                }

            },

            {

                name: 'beforehide',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                }

            },

            {

                name: 'hide',

                handler: function handler(ref) {
                    var target = ref.target;


                    if (this.$el !== target) {
                        active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
                        return;
                    }

                    active = this.isActive() ? null : active;
                    removeClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'false');
                    this.toggle.$el.blur();
                    $$('a, button', this.toggle.$el).forEach(function (el) { return el.blur(); });
                    this.tracker.cancel();
                }

            }

        ],

        update: {

            write: function write() {

                if (this.isToggled() && !Animation.inProgress(this.$el)) {
                    this.position();
                }

            },

            events: ['resize']

        },

        methods: {

            show: function show(toggle, delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var show = function () { return !this$1.isToggled() && this$1.toggleElement(this$1.$el, true); };
                var tryShow = function () {

                    this$1.toggle = toggle || this$1.toggle;

                    this$1.clearTimers();

                    if (this$1.isActive()) {
                        return;
                    } else if (delay && active && active !== this$1 && active.isDelaying) {
                        this$1.showTimer = setTimeout(this$1.show, 10);
                        return;
                    } else if (this$1.isParentOf(active)) {

                        if (active.hideTimer) {
                            active.hide(false);
                        } else {
                            return;
                        }

                    } else if (active && !this$1.isChildOf(active) && !this$1.isParentOf(active)) {

                        var prev;
                        while (active && active !== prev && !this$1.isChildOf(active)) {
                            prev = active;
                            active.hide(false);
                        }

                    }

                    if (delay && this$1.delayShow) {
                        this$1.showTimer = setTimeout(show, this$1.delayShow);
                    } else {
                        show();
                    }

                    active = this$1;
                };

                if (toggle && this.toggle && toggle.$el !== this.toggle.$el) {

                    once(this.$el, 'hide', tryShow);
                    this.hide(false);

                } else {
                    tryShow();
                }
            },

            hide: function hide(delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var hide = function () { return this$1.toggleNow(this$1.$el, false); };

                this.clearTimers();

                this.isDelaying = this.tracker.movesTo(this.$el);

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, this.hoverIdle);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },

            clearTimers: function clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },

            isActive: function isActive() {
                return active === this;
            },

            isChildOf: function isChildOf(drop) {
                return drop && drop !== this && within(this.$el, drop.$el);
            },

            isParentOf: function isParentOf(drop) {
                return drop && drop !== this && within(drop.$el, this.$el);
            },

            position: function position() {

                removeClasses(this.$el, ((this.clsDrop) + "-(stack|boundary)"));
                css(this.$el, {top: '', left: '', display: 'block'});
                toggleClass(this.$el, ((this.clsDrop) + "-boundary"), this.boundaryAlign);

                var boundary = offset(this.boundary);
                var alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

                if (this.align === 'justify') {
                    var prop = this.getAxis() === 'y' ? 'width' : 'height';
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, ((this.clsDrop) + "-stack"));
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);

                css(this.$el, 'display', '');

            }

        }

    });

    UIkit.drop.getActive = function () { return active; };

    var registered;

    function registerEvent() {

        if (registered) {
            return;
        }

        registered = true;
        on(docEl, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            var prev;

            if (defaultPrevented) {
                return;
            }

            while (active && active !== prev && !within(target, active.$el) && !(active.toggle && within(target, active.toggle.$el))) {
                prev = active;
                active.hide(false);
            }
        });
    }

}

function Dropdown (UIkit) {

    UIkit.component('dropdown', UIkit.components.drop.extend({name: 'dropdown'}));

}

function FormCustom (UIkit) {

    UIkit.component('form-custom', {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        defaults: {
            target: false
        },

        computed: {

            input: function input(_, $el) {
                return $(selInput, $el);
            },

            state: function state() {
                return this.input.nextElementSibling;
            },

            target: function target(ref, $el) {
                var target = ref.target;

                return target && (target === true
                    && this.input.parentNode === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
            }

        },

        update: function update() {

            var ref = this;
            var target = ref.target;
            var input = ref.input;

            if (!target) {
                return;
            }

            var option;

            target[isInput(target) ? 'value' : 'textContent'] = input.files && input.files[0]
                ? input.files[0].name
                : matches(input, 'select') && (option = $$('option', input).filter(function (el) { return el.selected; })[0])
                    ? option.textContent
                    : input.value;

        },

        events: [

            {

                name: 'focusin focusout mouseenter mouseleave',

                delegate: selInput,

                handler: function handler(ref) {
                    var type = ref.type;
                    var current = ref.current;

                    if (current === this.input) {
                        toggleClass(
                            this.state,
                            ("uk-" + (includes(type, 'focus') ? 'focus' : 'hover')),
                            includes(['focusin', 'mouseenter'], type)
                        );
                    }
                }

            },

            {

                name: 'change',

                handler: function handler() {
                    this.$emit();
                }

            }

        ]

    });

}

function Gif (UIkit) {

    // Deprecated
    UIkit.component('gif', {

        update: {

            read: function read(data) {

                var inview = isInView(this.$el);

                if (!inview || data.isInView === inview) {
                    return false;
                }

                data.isInView = inview;
            },

            write: function write() {
                this.$el.src = this.$el.src;
            },

            events: ['scroll', 'load', 'resize']
        }

    });

}

function Grid (UIkit) {

    UIkit.component('grid', UIkit.components.margin.extend({

        mixins: [Class],

        name: 'grid',

        defaults: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack'
        },

        update: {

            write: function write(ref) {
                var stacks = ref.stacks;


                toggleClass(this.$el, this.clsStack, stacks);

            },

            events: ['load', 'resize']

        }

    }));

}

function HeightMatch (UIkit) {

    UIkit.component('height-match', {

        args: 'target',

        props: {
            target: String,
            row: Boolean
        },

        defaults: {
            target: '> *',
            row: true
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return $$(target, $el);
            }

        },

        update: {

            read: function read() {
                var this$1 = this;


                var lastOffset = false;

                css(this.elements, 'minHeight', '');

                return {
                    rows: !this.row
                        ? [this.match(this.elements)]
                        : this.elements.reduce(function (rows, el) {

                            if (lastOffset !== el.offsetTop) {
                                rows.push([el]);
                            } else {
                                rows[rows.length - 1].push(el);
                            }

                            lastOffset = el.offsetTop;

                            return rows;

                        }, []).map(function (elements) { return this$1.match(elements); })
                };
            },

            write: function write(ref) {
                var rows = ref.rows;


                rows.forEach(function (ref) {
                    var height = ref.height;
                    var elements = ref.elements;

                    return css(elements, 'minHeight', height);
                });

            },

            events: ['load', 'resize']

        },

        methods: {

            match: function match(elements) {

                if (elements.length < 2) {
                    return {};
                }

                var heights = [];
                var max = 0;

                elements
                    .forEach(function (el) {

                        var style, hidden;

                        if (!isVisible(el)) {
                            style = attr(el, 'style');
                            hidden = attr(el, 'hidden');

                            attr(el, {
                                style: ((style || '') + ";display:block !important;"),
                                hidden: null
                            });
                        }

                        max = Math.max(max, el.offsetHeight);
                        heights.push(el.offsetHeight);

                        if (!isUndefined(style)) {
                            attr(el, {style: style, hidden: hidden});
                        }

                    });

                elements = elements.filter(function (el, i) { return heights[i] < max; });

                return {height: max, elements: elements};
            }
        }

    });

}

function HeightViewport (UIkit) {

    UIkit.component('height-viewport', {

        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },

        defaults: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },

        update: {

            write: function write() {

                css(this.$el, 'boxSizing', 'border-box');

                var viewport = height(win);
                var minHeight, offsetTop = 0;

                if (this.expand) {

                    css(this.$el, {height: '', minHeight: ''});

                    var diff = viewport - offsetHeight(docEl);

                    if (diff > 0) {
                        minHeight = offsetHeight(this.$el) + diff;
                    }

                } else {

                    var ref = offset(this.$el);
                    var top = ref.top;

                    if (top < viewport / 2 && this.offsetTop) {
                        offsetTop += top;
                    }

                    if (this.offsetBottom === true) {

                        offsetTop += offsetHeight(this.$el.nextElementSibling);

                    } else if (isNumeric(this.offsetBottom)) {

                        offsetTop += (viewport / 100) * this.offsetBottom;

                    } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

                        offsetTop += toFloat(this.offsetBottom);

                    } else if (isString(this.offsetBottom)) {

                        offsetTop += offsetHeight(query(this.offsetBottom, this.$el));

                    }

                    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
                    minHeight = offsetTop ? ("calc(100vh - " + offsetTop + "px)") : '100vh';

                }

                if (!minHeight) {
                    return;
                }

                css(this.$el, {height: '', minHeight: minHeight});

                var elHeight = this.$el.offsetHeight;
                if (this.minHeight && this.minHeight > elHeight) {
                    css(this.$el, 'minHeight', this.minHeight);
                }

                // IE 11 fix (min-height on a flex container won't apply to its flex items)
                if (viewport - offsetTop >= elHeight) {
                    css(this.$el, 'height', minHeight);
                }

            },

            events: ['load', 'resize']

        }

    });

    function offsetHeight(el) {
        return el && el.offsetHeight || 0;
    }

}

var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";

var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

var slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

var slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

var slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

var slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

function Icon (UIkit) {

    var parsed = {};
    var icons = {
        spinner: spinner,
        totop: totop,
        marker: marker,
        'close-icon': closeIcon,
        'close-large': closeLarge,
        'navbar-toggle-icon': navbarToggleIcon,
        'overlay-icon': overlayIcon,
        'pagination-next': paginationNext,
        'pagination-previous': paginationPrevious,
        'search-icon': searchIcon,
        'search-large': searchLarge,
        'search-navbar': searchNavbar,
        'slidenav-next': slidenavNext,
        'slidenav-next-large': slidenavNextLarge,
        'slidenav-previous': slidenavPrevious,
        'slidenav-previous-large': slidenavPreviousLarge
    };

    UIkit.component('icon', UIkit.components.svg.extend({

        attrs: ['icon', 'ratio'],

        mixins: [Class],

        name: 'icon',

        args: 'icon',

        props: ['icon'],

        defaults: {exclude: ['id', 'style', 'class', 'src', 'icon']},

        init: function init() {
            addClass(this.$el, 'uk-icon');

            if (isRtl) {
                this.icon = swap(swap(this.icon, 'left', 'right'), 'previous', 'next');
            }
        },

        methods: {

            getSvg: function getSvg() {

                var icon = getIcon(this.icon);

                if (!icon) {
                    return Promise.reject('Icon not found.');
                }

                return Promise.resolve(icon);
            }

        }

    }));

    [
        'marker',
        'navbar-toggle-icon',
        'overlay-icon',
        'pagination-previous',
        'pagination-next',
        'totop'
    ].forEach(function (name) { return registerComponent(name); });

    [
        'slidenav-previous',
        'slidenav-next'
    ].forEach(function (name) { return registerComponent(name, {

        init: function init() {
            addClass(this.$el, 'uk-slidenav');

            if (hasClass(this.$el, 'uk-slidenav-large')) {
                this.icon += '-large';
            }
        }

    }); });

    registerComponent('search-icon', {

        init: function init() {
            if (hasClass(this.$el, 'uk-search-icon') && parents(this.$el, '.uk-search-large').length) {
                this.icon = 'search-large';
            } else if (parents(this.$el, '.uk-search-navbar').length) {
                this.icon = 'search-navbar';
            }
        }

    });

    registerComponent('close', {

        init: function init() {
            this.icon = "close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon');
        }

    });

    registerComponent('spinner', {

        connected: function connected() {
            var this$1 = this;

            this.svg.then(function (svg) { return this$1.ratio !== 1 && css($('circle', svg), 'stroke-width', 1 / this$1.ratio); }, noop);
        }

    });

    UIkit.icon.add = function (added) {
        Object.keys(added).forEach(function (name) {
            icons[name] = added[name];
            delete parsed[name];
        });

        if (UIkit._initialized) {
            each(UIkit.instances, function (component) {
                if (component.$options.name === 'icon') {
                    component.$reset();
                }
            });
        }
    };

    function registerComponent(name, mixin$$1) {

        UIkit.component(name, UIkit.components.icon.extend({

            name: name,

            mixins: mixin$$1 ? [mixin$$1] : [],

            defaults: {
                icon: name
            }

        }));
    }

    function getIcon(icon) {

        if (!icons[icon]) {
            return null;
        }

        if (!parsed[icon]) {
            parsed[icon] = $(icons[icon].trim());
        }

        return parsed[icon];
    }

}

function Leader (UIkit) {

    UIkit.component('leader', {

        mixins: [Class],

        props: {
            fill: String,
            media: 'media'
        },

        defaults: {
            fill: '',
            media: false,
            clsWrapper: 'uk-leader-fill',
            clsHide: 'uk-leader-hide',
            attrFill: 'data-fill'
        },

        computed: {

            fill: function fill(ref) {
                var fill = ref.fill;

                return fill || getCssVar('leader-fill');
            }

        },

        connected: function connected() {
            var assign;
            (assign = wrapInner(this.$el, ("<span class=\"" + (this.clsWrapper) + "\">")), this.wrapper = assign[0]);
        },

        disconnected: function disconnected() {
            unwrap(this.wrapper.childNodes);
        },

        update: [

            {

                read: function read(ref) {
                    var changed = ref.changed;
                    var width = ref.width;


                    var prev = width;

                    width = Math.floor(this.$el.offsetWidth / 2);

                    return {
                        width: width,
                        changed: changed || prev !== width,
                        hide: this.media && !win.matchMedia(this.media).matches
                    };
                },

                write: function write(data) {

                    toggleClass(this.wrapper, this.clsHide, data.hide);

                    if (data.changed) {
                        data.changed = false;
                        attr(this.wrapper, this.attrFill, new Array(data.width).join(this.fill));
                    }

                },

                events: ['load', 'resize']

            }
        ]
    });

}

function Margin (UIkit) {

    UIkit.component('margin', {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        defaults: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {

            read: function read(data) {

                var items = this.$el.children;

                if (!items.length || !isVisible(this.$el)) {
                    return data.rows = false;
                }

                data.stacks = true;

                var rows = [[]];

                for (var i = 0; i < items.length; i++) {

                    var el = items[i];
                    var dim = el.getBoundingClientRect();

                    if (!dim.height) {
                        continue;
                    }

                    for (var j = rows.length - 1; j >= 0; j--) {

                        var row = rows[j];

                        if (!row[0]) {
                            row.push(el);
                            break;
                        }

                        var leftDim = row[0].getBoundingClientRect();

                        if (dim.top >= Math.floor(leftDim.bottom)) {
                            rows.push([el]);
                            break;
                        }

                        if (Math.floor(dim.bottom) > leftDim.top) {

                            data.stacks = false;

                            if (dim.left < leftDim.left && !isRtl) {
                                row.unshift(el);
                                break;
                            }

                            row.push(el);
                            break;
                        }

                        if (j === 0) {
                            rows.unshift([el]);
                            break;
                        }

                    }

                }

                data.rows = rows;

            },

            write: function write(ref) {
                var this$1 = this;
                var rows = ref.rows;


                rows.forEach(function (row, i) { return row.forEach(function (el, j) {
                        toggleClass(el, this$1.margin, i !== 0);
                        toggleClass(el, this$1.firstColumn, j === 0);
                    }); }
                );

            },

            events: ['load', 'resize']

        }

    });

}

function Modal$1 (UIkit) {

    UIkit.component('modal', {

        mixins: [Modal],

        defaults: {
            clsPage: 'uk-modal-page',
            clsPanel: 'uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
        },

        events: [

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                        addClass(this.$el, 'uk-flex');
                    } else {
                        css(this.$el, 'display', 'block');
                    }

                    height(this.$el); // force reflow
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    css(this.$el, 'display', '');
                    removeClass(this.$el, 'uk-flex');

                }
            }

        ]

    });

    UIkit.component('overflow-auto', {

        mixins: [Class],

        computed: {

            modal: function modal(_, $el) {
                return closest($el, '.uk-modal');
            },

            panel: function panel(_, $el) {
                return closest($el, '.uk-modal-dialog');
            }

        },

        connected: function connected() {
            css(this.$el, 'minHeight', 150);
        },

        update: {

            write: function write() {

                if (!this.panel || !this.modal) {
                    return;
                }

                var current = css(this.$el, 'maxHeight');

                css(css(this.$el, 'maxHeight', 150), 'maxHeight', Math.max(150, 150 + height(this.modal) - this.panel.offsetHeight));
                if (current !== css(this.$el, 'maxHeight')) {
                    trigger(this.$el, 'resize');
                }
            },

            events: ['load', 'resize']

        }

    });

    UIkit.modal.dialog = function (content, options) {

        var dialog = UIkit.modal((" <div class=\"uk-modal\"> <div class=\"uk-modal-dialog\">" + content + "</div> </div> "), options);

        dialog.show();

        on(dialog.$el, 'hidden', function (ref) {
            var target = ref.target;
            var currentTarget = ref.currentTarget;

            if (target === currentTarget) {
                dialog.$destroy(true);
            }
        });

        return dialog;
    };

    UIkit.modal.alert = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: UIkit.modal.labels}, options);

        return new Promise(
            function (resolve) { return on(UIkit.modal.dialog((" <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + (options.labels.ok) + "</button> </div> "), options).$el, 'hide', resolve); }
        );
    };

    UIkit.modal.confirm = function (message, options) {

        options = assign({bgClose: false, escClose: true, labels: UIkit.modal.labels}, options);

        return new Promise(function (resolve, reject) {

            var confirm = UIkit.modal.dialog((" <form> <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\" autofocus>" + (options.labels.ok) + "</button> </div> </form> "), options);

            var resolved = false;

            on(confirm.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                resolve();
                resolved = true;
                confirm.hide();
            });
            on(confirm.$el, 'hide', function () {
                if (!resolved) {
                    reject();
                }
            });

        });
    };

    UIkit.modal.prompt = function (message, value, options) {

        options = assign({bgClose: false, escClose: true, labels: UIkit.modal.labels}, options);

        return new Promise(function (resolve) {

            var prompt = UIkit.modal.dialog((" <form class=\"uk-form-stacked\"> <div class=\"uk-modal-body\"> <label>" + (isString(message) ? message : html(message)) + "</label> <input class=\"uk-input\" autofocus> </div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\">" + (options.labels.ok) + "</button> </div> </form> "), options),
                input = $('input', prompt.$el);

            input.value = value;

            var resolved = false;

            on(prompt.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                resolve(input.value);
                resolved = true;
                prompt.hide();
            });
            on(prompt.$el, 'hide', function () {
                if (!resolved) {
                    resolve(null);
                }
            });

        });
    };

    UIkit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

}

function Nav (UIkit) {

    UIkit.component('nav', UIkit.components.accordion.extend({

        name: 'nav',

        defaults: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: '> ul'
        }

    }));

}

function Navbar (UIkit) {

    UIkit.component('navbar', {

        mixins: [Class],

        props: {
            dropdown: String,
            mode: 'list',
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: 'query',
            duration: Number
        },

        defaults: {
            dropdown: '.uk-navbar-nav > li',
            align: !isRtl ? 'left' : 'right',
            clsDrop: 'uk-navbar-dropdown',
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: 'x',
            boundary: true,
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200,
        },

        computed: {

            boundary: function boundary(ref, $el) {
                var boundary = ref.boundary;
                var boundaryAlign = ref.boundaryAlign;

                return (boundary === true || boundaryAlign) ? $el : boundary;
            },

            pos: function pos(ref) {
                var align = ref.align;

                return ("bottom-" + align);
            }

        },

        beforeConnect: function beforeConnect() {

            var ref = this.$props;
            var dropbar = ref.dropbar;

            this.dropbar = dropbar && (isString(dropbar) && query(dropbar, this.$el) || $('<div></div>'));

            if (this.dropbar) {

                addClass(this.dropbar, 'uk-navbar-dropbar');

                if (this.dropbarMode === 'slide') {
                    addClass(this.dropbar, 'uk-navbar-dropbar-slide');
                }
            }

        },

        disconnected: function disconnected() {
            this.dropbar && remove(this.dropbar);
        },

        update: function update() {

            UIkit.drop(
                $$(((this.dropdown) + " ." + (this.clsDrop)), this.$el).filter(function (el) { return !UIkit.getComponent(el, 'drop') && !UIkit.getComponent(el, 'dropdown'); }),
                assign({}, this.$props, {boundary: this.boundary, pos: this.pos, offset: this.dropbar || this.offset})
            );

        },

        events: [

            {
                name: 'mouseover',

                delegate: function delegate() {
                    return this.dropdown;
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    var active = this.getActive();
                    if (active && active.toggle && !within(active.toggle.$el, current) && !active.tracker.movesTo(active.$el)) {
                        active.hide(false);
                    }
                }

            },

            {
                name: 'mouseleave',

                el: function el() {
                    return this.dropbar;
                },

                handler: function handler() {
                    var active = this.getActive();

                    if (active && !matches(this.dropbar, ':hover')) {
                        active.hide();
                    }
                }
            },

            {
                name: 'beforeshow',

                capture: true,

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler() {

                    if (!this.dropbar.parentNode) {
                        after(this.dropbarAnchor || this.$el, this.dropbar);
                    }

                }
            },

            {
                name: 'show',

                capture: true,

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(_, drop) {

                    var $el = drop.$el;

                    this.clsDrop && addClass($el, ((this.clsDrop) + "-dropbar"));

                    this.transitionTo($el.offsetHeight + toFloat(css($el, 'margin-top')) + toFloat(css($el, 'margin-bottom')), $el);
                }
            },

            {
                name: 'beforehide',

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(e, ref) {
                    var $el = ref.$el;


                    var active = this.getActive();

                    if (matches(this.dropbar, ':hover') && active && active.$el === $el) {
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'hide',

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(_, ref) {
                    var $el = ref.$el;


                    var active = this.getActive();

                    if (!active || active && active.$el === $el) {
                        this.transitionTo(0);
                    }
                }
            }

        ],

        methods: {

            getActive: function getActive() {
                var active = UIkit.drop.getActive();
                return active && includes(active.mode, 'hover') && within(active.toggle.$el, this.$el) && active;
            },

            transitionTo: function transitionTo(newHeight, el) {

                var ref = this;
                var dropbar = ref.dropbar;
                var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;

                el = oldHeight < newHeight && el;

                css(el, {height: oldHeight, overflow: 'hidden'});
                height(dropbar, oldHeight);

                Transition.cancel([el, dropbar]);
                return Transition
                    .start([el, dropbar], {height: newHeight}, this.duration)
                    .catch(noop)
                    .finally(function () { return css(el, {height: '', overflow: ''}); });
            }

        }

    });

}

var scroll;

function Offcanvas (UIkit) {

    UIkit.component('offcanvas', {

        mixins: [Modal],

        args: 'mode',

        props: {
            content: String,
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        defaults: {
            content: '.uk-offcanvas-content',
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsContainer: 'uk-offcanvas-container',
            clsPanel: 'uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsContent: 'uk-offcanvas-content',
            clsContentAnimation: 'uk-offcanvas-content-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            selClose: '.uk-offcanvas-close'
        },

        computed: {

            content: function content(ref) {
                var content = ref.content;

                return $(content) || doc.body;
            },

            clsFlip: function clsFlip(ref) {
                var flip = ref.flip;
                var clsFlip = ref.clsFlip;

                return flip ? clsFlip : '';
            },

            clsOverlay: function clsOverlay(ref) {
                var overlay = ref.overlay;
                var clsOverlay = ref.clsOverlay;

                return overlay ? clsOverlay : '';
            },

            clsMode: function clsMode(ref) {
                var mode = ref.mode;
                var clsMode = ref.clsMode;

                return (clsMode + "-" + mode);
            },

            clsSidebarAnimation: function clsSidebarAnimation(ref) {
                var mode = ref.mode;
                var clsSidebarAnimation = ref.clsSidebarAnimation;

                return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
            },

            clsContentAnimation: function clsContentAnimation(ref) {
                var mode = ref.mode;
                var clsContentAnimation = ref.clsContentAnimation;

                return mode !== 'push' && mode !== 'reveal' ? '' : clsContentAnimation;
            },

            transitionElement: function transitionElement(ref) {
                var mode = ref.mode;

                return mode === 'reveal' ? this.panel.parentNode : this.panel;
            }

        },

        update: {

            write: function write() {

                if (this.getActive() === this) {

                    if (this.overlay || this.clsContentAnimation) {
                        width(this.content, width(win) - this.scrollbarWidth);
                    }

                    if (this.overlay) {
                        height(this.content, height(win));
                        if (scroll) {
                            this.content.scrollTop = scroll.y;
                        }
                    }

                }

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    if (current.hash && $(current.hash, this.content)) {
                        scroll = null;
                        this.hide();
                    }
                }

            },

            {

                name: 'beforescroll',

                filter: function filter() {
                    return this.overlay;
                },

                handler: function handler(e, scroll, target) {
                    if (scroll && target && this.isToggled() && $(target, this.content)) {
                        once(this.$el, 'hidden', function () { return scroll.scrollTo(target); });
                        e.preventDefault();
                    }
                }

            },

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    scroll = scroll || {x: win.pageXOffset, y: win.pageYOffset};

                    if (this.mode === 'reveal' && !hasClass(this.panel, this.clsMode)) {
                        wrapAll(this.panel, '<div>');
                        addClass(this.panel.parentNode, this.clsMode);
                    }

                    css(docEl, 'overflowY', (!this.clsContentAnimation || this.flip) && this.scrollbarWidth && this.overlay ? 'scroll' : '');
                    addClass(doc.body, this.clsContainer, this.clsFlip, this.clsOverlay);
                    height(doc.body); // force reflow
                    addClass(this.content, this.clsContentAnimation);
                    addClass(this.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
                    addClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', 'block');
                    height(this.$el); // force reflow

                }
            },

            {
                name: 'hide',

                self: true,

                handler: function handler() {
                    removeClass(this.content, this.clsContentAnimation);

                    var active = this.getActive();
                    if (this.mode === 'none' || active && active !== this && active !== this.prev) {
                        trigger(this.panel, 'transitionend');
                    }
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    if (this.mode === 'reveal') {
                        unwrap(this.panel);
                    }

                    if (!this.overlay) {
                        scroll = {x: win.pageXOffset, y: win.pageYOffset};
                    } else if (!scroll) {
                        var ref = this.content;
                        var x = ref.scrollLeft;
                        var y = ref.scrollTop;
                        scroll = {x: x, y: y};
                    }

                    removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                    removeClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', '');
                    removeClass(doc.body, this.clsContainer, this.clsFlip, this.clsOverlay);
                    doc.body.scrollTop = scroll.y;

                    css(docEl, 'overflow-y', '');

                    width(this.content, '');
                    height(this.content, '');

                    win.scrollTo(scroll.x, scroll.y);

                    scroll = null;

                }
            },

            {
                name: 'swipeLeft swipeRight',

                handler: function handler(e) {

                    if (this.isToggled() && isTouch(e) && (e.type === 'swipeLeft' && !this.flip || e.type === 'swipeRight' && this.flip)) {
                        this.hide();
                    }

                }
            }

        ]

    });

}

function Responsive (UIkit) {

    UIkit.component('responsive', {

        props: ['width', 'height'],

        init: function init() {
            addClass(this.$el, 'uk-responsive-width');
        },

        update: {

            read: function read() {
                return isVisible(this.$el) && this.width && this.height
                    ? {width: width(this.$el.parentNode), height: this.height}
                    : false;
            },

            write: function write(dim) {
                height(this.$el, Dimensions.contain({height: this.height, width: this.width}, dim).height);
            },

            events: ['load', 'resize']

        }

    });

}

function Scroll (UIkit) {

    UIkit.component('scroll', {

        props: {
            duration: Number,
            offset: Number
        },

        defaults: {
            duration: 1000,
            offset: 0
        },

        methods: {

            scrollTo: function scrollTo(el) {
                var this$1 = this;


                el = el && $(el) || doc.body;

                var docHeight = height(doc);
                var winHeight = height(win);

                var target = offset(el).top - this.offset;
                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                if (!trigger(this.$el, 'beforescroll', [this, el])) {
                    return;
                }

                var start = Date.now();
                var startY = win.pageYOffset;
                var step = function () {

                    var currentY = startY + (target - startY) * ease(clamp((Date.now() - start) / this$1.duration));

                    win.scrollTo(win.pageXOffset, currentY);

                    // scroll more if we have not reached our destination
                    if (currentY !== target) {
                        requestAnimationFrame(step);
                    } else {
                        trigger(this$1.$el, 'scrolled', [this$1, el]);
                    }

                };

                step();

            }

        },

        events: {

            click: function click(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.scrollTo(escape(this.$el.hash).substr(1));
            }

        }

    });

    function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }

}

function Scrollspy (UIkit) {

    UIkit.component('scrollspy', {

        args: 'cls',

        props: {
            cls: 'list',
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        defaults: {
            cls: [],
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return target ? $$(target, $el) : [$el];
            }

        },

        update: [

            {

                write: function write() {
                    if (this.hidden) {
                        css(filter(this.elements, (":not(." + (this.inViewClass) + ")")), 'visibility', 'hidden');
                    }
                }

            },

            {

                read: function read(els) {
                    var this$1 = this;


                    // Let child components be applied at least once first
                    if (!UIkit._initialized) {

                        if (doc.readyState === 'complete') {
                            requestAnimationFrame(function () { return this$1.$emit(); });
                        }

                        return false;
                    }

                    this.elements.forEach(function (el, i) {

                        var elData = els[i];

                        if (!elData || elData.el !== el) {
                            var cls = data(el, 'uk-scrollspy-class');
                            elData = {el: el, toggles: cls && cls.split(',') || this$1.cls};
                        }

                        elData.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
                        els[i] = elData;

                    });
                },

                write: function write(els) {
                    var this$1 = this;


                    var index = this.elements.length === 1 ? 1 : 0;

                    this.elements.forEach(function (el, i) {

                        var elData = els[i];
                        var cls = elData.toggles[i] || elData.toggles[0];

                        if (elData.show && !elData.inview && !elData.timer) {

                            var show = function () {
                                css(el, 'visibility', '');
                                addClass(el, this$1.inViewClass);
                                toggleClass(el, cls);

                                trigger(el, 'inview');

                                UIkit.update(null, el);

                                elData.inview = true;
                                delete elData.timer;
                            };

                            if (this$1.delay && index) {
                                elData.timer = setTimeout(show, this$1.delay * index);
                            } else {
                                show();
                            }

                            index++;

                        } else if (!elData.show && elData.inview && this$1.repeat) {

                            if (elData.timer) {
                                clearTimeout(elData.timer);
                                delete elData.timer;
                            }

                            css(el, 'visibility', this$1.hidden ? 'hidden' : '');
                            removeClass(el, this$1.inViewClass);
                            toggleClass(el, cls);

                            trigger(el, 'outview');

                            UIkit.update(null, el);

                            elData.inview = false;

                        }


                    });

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

}

function ScrollspyNav (UIkit) {

    UIkit.component('scrollspy-nav', {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },

        defaults: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },

        computed: {

            links: function links(_, $el) {
                return $$('a[href^="#"]', $el).filter(function (el) { return el.hash; });
            },

            elements: function elements() {
                return this.closest ? closest(this.links, this.closest) : this.links;
            },

            targets: function targets() {
                return $$(this.links.map(function (el) { return el.hash; }).join(','));
            }

        },

        update: [

            {

                read: function read() {
                    if (this.scroll) {
                        UIkit.scroll(this.links, {offset: this.offset || 0});
                    }
                }

            },

            {

                read: function read(data) {
                    var this$1 = this;


                    var scroll = win.pageYOffset + this.offset + 1;
                    var max = height(doc) - height(win) + this.offset;

                    data.active = false;

                    this.targets.every(function (el, i) {

                        var ref = offset(el);
                        var top = ref.top;
                        var last = i + 1 === this$1.targets.length;

                        if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
                            return false;
                        }

                        if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
                            return true;
                        }

                        if (scroll >= max) {
                            for (var j = this$1.targets.length - 1; j > i; j--) {
                                if (isInView(this$1.targets[j])) {
                                    el = this$1.targets[j];
                                    break;
                                }
                            }
                        }

                        return !(data.active = $(filter(this$1.links, ("[href=\"#" + (el.id) + "\"]"))));

                    });

                },

                write: function write(ref) {
                    var active = ref.active;


                    this.links.forEach(function (el) { return el.blur(); });
                    removeClass(this.elements, this.cls);

                    if (active) {
                        trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)]);
                    }

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

}

function Sticky (UIkit) {

    UIkit.component('sticky', {

        mixins: [Class],

        attrs: true,

        props: {
            top: null,
            bottom: Boolean,
            offset: Number,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: 'query',
            showOnUp: Boolean,
            media: 'media',
            target: Number
        },

        defaults: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            clsFixed: 'uk-sticky-fixed',
            clsBelow: 'uk-sticky-below',
            selTarget: '',
            widthElement: false,
            showOnUp: false,
            media: false,
            target: false
        },

        computed: {

            selTarget: function selTarget(ref, $el) {
                var selTarget = ref.selTarget;

                return selTarget && $(selTarget, $el) || $el;
            }

        },

        connected: function connected() {

            this.placeholder = $('<div class="uk-sticky-placeholder"></div>');
            this.widthElement = this.$props.widthElement || this.placeholder;

            if (!this.isActive) {
                this.hide();
            }
        },

        disconnected: function disconnected() {

            if (this.isActive) {
                this.isActive = false;
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }

            remove(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },

        ready: function ready() {
            var this$1 = this;


            if (!(this.target && location.hash && win.pageYOffset > 0)) {
                return;
            }

            var target = $(location.hash);

            if (target) {
                fastdom.read(function () {

                    var ref = offset(target);
                    var top = ref.top;
                    var elTop = offset(this$1.$el).top;
                    var elHeight = this$1.$el.offsetHeight;

                    if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                        win.scrollTo(0, top - elHeight - this$1.target - this$1.offset);
                    }

                });
            }

        },

        events: [

            {
                name: 'active',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                }

            },

            {
                name: 'inactive',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                }

            }

        ],

        update: [

            {

                write: function write() {

                    var ref = this;
                    var placeholder = ref.placeholder;
                    var outerHeight = (this.isActive ? placeholder : this.$el).offsetHeight;

                    css(placeholder, assign(
                        {height: css(this.$el, 'position') !== 'absolute' ? outerHeight : ''},
                        css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
                    ));

                    if (!within(placeholder, docEl)) {
                        after(this.$el, placeholder);
                        attr(placeholder, 'hidden', '');
                    }

                    attr(this.widthElement, 'hidden', null);
                    this.width = this.widthElement.offsetWidth;
                    attr(this.widthElement, 'hidden', this.isActive ? null : '');

                    this.topOffset = offset(this.isActive ? placeholder : this.$el).top;
                    this.bottomOffset = this.topOffset + outerHeight;

                    var bottom = parseProp('bottom', this);

                    this.top = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
                    this.bottom = bottom && bottom - outerHeight;
                    this.inactive = this.media && !win.matchMedia(this.media).matches;

                    if (this.isActive) {
                        this.update();
                    }
                },

                events: ['load', 'resize']

            },

            {

                read: function read(_, ref) {
                    var scrollY = ref.scrollY; if ( scrollY === void 0 ) scrollY = win.pageYOffset;

                    return {
                        scroll: this.scroll = scrollY,
                        visible: isVisible(this.$el)
                    };
                },

                write: function write(ref, ref$1) {
                    var this$1 = this;
                    var visible = ref.visible;
                    var scroll = ref.scroll;
                    if ( ref$1 === void 0 ) ref$1 = {};
                    var dir = ref$1.dir;


                    if (scroll < 0 || !visible || this.disabled || this.showOnUp && !dir) {
                        return;
                    }

                    if (this.inactive
                        || scroll < this.top
                        || this.showOnUp && (scroll <= this.top || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
                    ) {

                        if (!this.isActive) {
                            return;
                        }

                        this.isActive = false;

                        if (this.animation && scroll > this.topOffset) {
                            Animation.cancel(this.$el);
                            Animation.out(this.$el, this.animation).then(function () { return this$1.hide(); }, noop);
                        } else {
                            this.hide();
                        }

                    } else if (this.isActive) {

                        this.update();

                    } else if (this.animation) {

                        Animation.cancel(this.$el);
                        this.show();
                        Animation.in(this.$el, this.animation).catch(noop);

                    } else {
                        this.show();
                    }

                },

                events: ['scroll']

            } ],

        methods: {

            show: function show() {

                this.isActive = true;
                this.update();
                attr(this.placeholder, 'hidden', null);

            },

            hide: function hide() {

                if (!this.isActive || hasClass(this.selTarget, this.clsActive)) {
                    trigger(this.$el, 'inactive');
                }

                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {position: '', top: '', width: ''});
                attr(this.placeholder, 'hidden', '');

            },

            update: function update() {

                var active = this.top !== 0 || this.scroll > this.top;
                var top = Math.max(0, this.offset);

                if (this.bottom && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }

                css(this.$el, {
                    position: 'fixed',
                    top: (top + "px"),
                    width: this.width
                });

                if (hasClass(this.selTarget, this.clsActive)) {

                    if (!active) {
                        trigger(this.$el, 'inactive');
                    }

                } else if (active) {
                    trigger(this.$el, 'active');
                }

                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);

            }

        }

    });

    function parseProp(prop, ref) {
        var $props = ref.$props;
        var $el = ref.$el;
        var propOffset = ref[(prop + "Offset")];


        var value = $props[prop];

        if (!value) {
            return;
        }

        if (isNumeric(value)) {

            return propOffset + toFloat(value);

        } else if (isString(value) && value.match(/^-?\d+vh$/)) {

            return height(win) * toFloat(value) / 100;

        } else {

            var el = value === true ? $el.parentNode : query(value, $el);

            if (el) {
                return offset(el).top + el.offsetHeight;
            }

        }
    }

}

var svgs = {};

function Svg (UIkit) {

    UIkit.component('svg', {

        attrs: true,

        props: {
            id: String,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            'class': String
        },

        defaults: {
            ratio: 1,
            id: false,
            exclude: ['src'],
            'class': ''
        },

        init: function init() {
            this.class += ' uk-svg';
        },

        connected: function connected() {
            var this$1 = this;


            if (!this.icon && includes(this.src, '#')) {

                var parts = this.src.split('#');

                if (parts.length > 1) {
                    var assign;
                    (assign = parts, this.src = assign[0], this.icon = assign[1]);
                }
            }

            this.svg = this.getSvg().then(function (svg) {

                var el;

                if (isString(svg)) {

                    if (this$1.icon && includes(svg, '<symbol')) {
                        svg = parseSymbols(svg, this$1.icon) || svg;
                    }

                    el = $(svg.substr(svg.indexOf('<svg')));

                } else {
                    el = svg.cloneNode(true);
                }

                if (!el) {
                    return Promise.reject('SVG not found.');
                }

                var dimensions = attr(el, 'viewBox');

                if (dimensions) {
                    dimensions = dimensions.split(' ');
                    this$1.width = this$1.$props.width || dimensions[2];
                    this$1.height = this$1.$props.height || dimensions[3];
                }

                this$1.width *= this$1.ratio;
                this$1.height *= this$1.ratio;

                for (var prop in this$1.$options.props) {
                    if (this$1[prop] && !includes(this$1.exclude, prop)) {
                        attr(el, prop, this$1[prop]);
                    }
                }

                if (!this$1.id) {
                    removeAttr(el, 'id');
                }

                if (this$1.width && !this$1.height) {
                    removeAttr(el, 'height');
                }

                if (this$1.height && !this$1.width) {
                    removeAttr(el, 'width');
                }

                var root = this$1.$el;
                if (isVoidElement(root) || root.tagName === 'CANVAS') {

                    attr(root, {hidden: true, id: null});

                    var next = root.nextElementSibling;
                    if (next && el.isEqualNode(next)) {
                        el = next;
                    } else {
                        after(root, el);
                    }

                } else {

                    var last = root.lastElementChild;
                    if (last && el.isEqualNode(last)) {
                        el = last;
                    } else {
                        append(root, el);
                    }

                }

                this$1.svgEl = el;

                return el;

            }, noop);

        },

        disconnected: function disconnected() {
            var this$1 = this;


            if (isVoidElement(this.$el)) {
                attr(this.$el, {hidden: null, id: this.id || null});
            }

            if (this.svg) {
                this.svg.then(function (svg) { return (!this$1._connected || svg !== this$1.svgEl) && remove(svg); }, noop);
            }

            this.svg = this.svgEl = null;

        },

        methods: {

            getSvg: function getSvg() {
                var this$1 = this;


                if (!this.src) {
                    return Promise.reject();
                }

                if (svgs[this.src]) {
                    return svgs[this.src];
                }

                svgs[this.src] = new Promise(function (resolve, reject) {

                    if (startsWith(this$1.src, 'data:')) {
                        resolve(decodeURIComponent(this$1.src.split(',')[1]));
                    } else {

                        ajax(this$1.src).then(
                            function (xhr) { return resolve(xhr.response); },
                            function () { return reject('SVG not found.'); }
                        );

                    }

                });

                return svgs[this.src];

            }

        }

    });

    var symbolRe = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g;
    var symbols = {};

    function parseSymbols(svg, icon) {

        if (!symbols[svg]) {

            symbols[svg] = {};

            var match;
            while ((match = symbolRe.exec(svg))) {
                symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + (match[1]) + "svg>";
            }

        }

        return symbols[svg][icon];
    }

}

function Switcher (UIkit) {

    UIkit.component('switcher', {

        mixins: [Togglable],

        args: 'connect',

        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        defaults: {
            connect: '~.uk-switcher',
            toggle: '> *',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            clsContainer: 'uk-switcher',
            attrItem: 'uk-switcher-item',
            queued: true
        },

        computed: {

            connects: function connects(ref, $el) {
                var connect = ref.connect;

                return queryAll(connect, $el);
            },

            toggles: function toggles(ref, $el) {
                var toggle = ref.toggle;

                return $$(toggle, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(e.current);
                }

            },

            {
                name: 'click',

                el: function el() {
                    return this.connects;
                },

                delegate: function delegate() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }
            },

            {
                name: 'swipeRight swipeLeft',

                filter: function filter() {
                    return this.swiping;
                },

                el: function el() {
                    return this.connects;
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        return;
                    }

                    e.preventDefault();
                    if (!win.getSelection().toString()) {
                        this.show(e.type === 'swipeLeft' ? 'next' : 'previous');
                    }
                }
            }

        ],

        update: function update() {
            var this$1 = this;


            this.connects.forEach(function (list) { return this$1.updateAria(list.children); });
            this.show(filter(this.toggles, ("." + (this.cls)))[0] || this.toggles[this.active] || this.toggles[0]);

        },

        methods: {

            show: function show(item) {
                var this$1 = this;


                var ref = this.toggles;
                var length = ref.length;
                var prev = !!this.connects.length && index(filter(this.connects[0].children, ("." + (this.cls)))[0]);
                var hasPrev = prev >= 0;
                var dir = item === 'previous' ? -1 : 1;

                var toggle, next = getIndex(item, this.toggles, prev);

                for (var i = 0; i < length; i++, next = (next + dir + length) % length) {
                    if (!matches(this$1.toggles[next], '.uk-disabled, [disabled]')) {
                        toggle = this$1.toggles[next];
                        break;
                    }
                }

                if (!toggle || prev >= 0 && hasClass(toggle, this.cls) || prev === next) {
                    return;
                }

                removeClass(this.toggles, this.cls);
                attr(this.toggles, 'aria-expanded', false);
                addClass(toggle, this.cls);
                attr(toggle, 'aria-expanded', true);

                this.connects.forEach(function (list) {
                    if (!hasPrev) {
                        this$1.toggleNow(list.children[next]);
                    } else {
                        this$1.toggleElement([list.children[prev], list.children[next]]);
                    }
                });

            }

        }

    });

}

function Tab (UIkit) {

    UIkit.component('tab', UIkit.components.switcher.extend({

        mixins: [Class],

        name: 'tab',

        props: {
            media: 'media'
        },

        defaults: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        init: function init() {

            var cls = hasClass(this.$el, 'uk-tab-left')
                ? 'uk-tab-left'
                : hasClass(this.$el, 'uk-tab-right')
                    ? 'uk-tab-right'
                    : false;

            if (cls) {
                UIkit.toggle(this.$el, {cls: cls, mode: 'media', media: this.media});
            }
        }

    }));

}

function Toggle (UIkit) {

    UIkit.component('toggle', {

        mixins: [UIkit.mixin.togglable],

        args: 'target',

        props: {
            href: String,
            target: null,
            mode: 'list',
            media: 'media'
        },

        defaults: {
            href: false,
            target: false,
            mode: 'click',
            queued: true,
            media: false
        },

        computed: {

            target: function target(ref, $el) {
                var href = ref.href;
                var target = ref.target;

                target = queryAll(target || href, $el);
                return target.length && target || [$el];
            }

        },

        events: [

            {

                name: (pointerEnter + " " + pointerLeave),

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        this.toggle(("toggle" + (e.type === pointerEnter ? 'show' : 'hide')));
                    }
                }

            },

            {

                name: 'click',

                filter: function filter() {
                    return includes(this.mode, 'click') || hasTouch;
                },

                handler: function handler(e) {

                    if (!isTouch(e) && !includes(this.mode, 'click')) {
                        return;
                    }

                    // TODO better isToggled handling
                    var link;
                    if (closest(e.target, 'a[href="#"], button')
                        || (link = closest(e.target, 'a[href]')) && (
                            this.cls
                            || !isVisible(this.target)
                            || link.hash && matches(this.target, link.hash)
                        )
                    ) {
                        once(doc, 'click', function (e) { return e.preventDefault(); });
                    }

                    this.toggle();
                }

            }
        ],

        update: {

            write: function write() {

                if (!includes(this.mode, 'media') || !this.media) {
                    return;
                }

                var toggled = this.isToggled(this.target);
                if (win.matchMedia(this.media).matches ? !toggled : toggled) {
                    this.toggle();
                }

            },

            events: ['load', 'resize']

        },

        methods: {

            toggle: function toggle(type) {
                if (trigger(this.target, type || 'toggle', [this])) {
                    this.toggleElement(this.target);
                }
            }

        }

    });

}

function Video (UIkit) {

    UIkit.component('video', {

        props: {
            automute: Boolean,
            autoplay: Boolean,
        },

        defaults: {
            automute: false,
            autoplay: true
        },

        computed: {

            inView: function inView(ref) {
                var autoplay = ref.autoplay;

                return autoplay === 'inview';
            }

        },

        ready: function ready() {

            this.player = new Player(this.$el);

            if (this.automute) {
                this.player.mute();
            }

        },

        update: [

            {

                read: function read(_, ref) {
                    var type = ref.type;


                    return !this.player || (type === 'scroll' || type === 'resize') && !this.inView
                        ? false
                        : {
                            visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
                            inView: this.inView && isInView(this.$el)
                        };
                },

                write: function write(ref) {
                    var visible = ref.visible;
                    var inView = ref.inView;


                    if (!visible || this.inView && !inView) {
                        this.player.pause();
                    } else if (this.autoplay === true || this.inView && inView) {
                        this.player.play();
                    }

                },

                events: ['load', 'resize', 'scroll']

            }

        ],

    });

}

function core (UIkit) {

    // core components
    UIkit.use(Toggle);
    UIkit.use(Accordion);
    UIkit.use(Alert);
    UIkit.use(Video);
    UIkit.use(Cover);
    UIkit.use(Drop);
    UIkit.use(Dropdown);
    UIkit.use(FormCustom);
    UIkit.use(HeightMatch);
    UIkit.use(HeightViewport);
    UIkit.use(Margin);
    UIkit.use(Gif);
    UIkit.use(Grid);
    UIkit.use(Leader);
    UIkit.use(Modal$1);
    UIkit.use(Nav);
    UIkit.use(Navbar);
    UIkit.use(Offcanvas);
    UIkit.use(Responsive);
    UIkit.use(Scroll);
    UIkit.use(Scrollspy);
    UIkit.use(ScrollspyNav);
    UIkit.use(Sticky);
    UIkit.use(Svg);
    UIkit.use(Icon);
    UIkit.use(Switcher);
    UIkit.use(Tab);

    // core functionality
    UIkit.use(Core);

}

UIkit$2.version = '3.0.0-beta.40';

mixin(UIkit$2);
core(UIkit$2);

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    var ref = UIkit.util;
    var $ = ref.$;
    var doc = ref.doc;
    var empty = ref.empty;
    var html = ref.html;

    UIkit.component('countdown', {

        mixins: [UIkit.mixin.class],

        attrs: true,

        props: {
            date: String,
            clsWrapper: String
        },

        defaults: {
            date: '',
            clsWrapper: '.uk-countdown-%unit%'
        },

        computed: {

            date: function date(ref) {
                var date = ref.date;

                return Date.parse(date);
            },

            days: function days(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'days'), $el);
            },

            hours: function hours(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'hours'), $el);
            },

            minutes: function minutes(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'minutes'), $el);
            },

            seconds: function seconds(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'seconds'), $el);
            },

            units: function units() {
                var this$1 = this;

                return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) { return this$1[unit]; });
            }

        },

        connected: function connected() {
            this.start();
        },

        disconnected: function disconnected() {
            var this$1 = this;

            this.stop();
            this.units.forEach(function (unit) { return empty(this$1[unit]); });
        },

        events: [

            {

                name: 'visibilitychange',

                el: doc,

                handler: function handler() {
                    if (doc.hidden) {
                        this.stop();
                    } else {
                        this.start();
                    }
                }

            }

        ],

        update: {

            write: function write() {
                var this$1 = this;


                var timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(function (unit) {

                    var digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? ("0" + digits) : digits;

                    var el = this$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split('');

                        if (digits.length !== el.children.length) {
                            html(el, digits.map(function () { return '<span></span>'; }).join(''));
                        }

                        digits.forEach(function (digit, i) { return el.children[i].textContent = digit; });
                    }

                });

            }

        },

        methods: {

            start: function start() {
                var this$1 = this;


                this.stop();

                if (this.date && this.units.length) {
                    this.$emit();
                    this.timer = setInterval(function () { return this$1.$emit(); }, 1000);
                }

            },

            stop: function stop() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    });

    function getTimeSpan(date) {

        var total = date - Date.now();

        return {
            total: total,
            seconds: total / 1000 % 60,
            minutes: total / 1000 / 60 % 60,
            hours: total / 1000 / 60 / 60 % 24,
            days: total / 1000 / 60 / 60 / 24
        };
    }

}

function plugin$1(UIkit) {

    if (plugin$1.installed) {
        return;
    }

    var ref = UIkit.util;
    var addClass = ref.addClass;
    var css = ref.css;
    var scrolledOver = ref.scrolledOver;
    var sortBy = ref.sortBy;
    var toFloat = ref.toFloat;

    UIkit.component('grid-parallax', UIkit.components.grid.extend({

        props: {
            target: String,
            translate: Number
        },

        defaults: {
            target: false,
            translate: 150
        },

        computed: {

            translate: function translate(ref) {
                var translate = ref.translate;

                return Math.abs(translate);
            }

        },

        init: function init() {
            addClass(this.$el, 'uk-grid');
        },

        disconnected: function disconnected() {
            this.reset();
            css(this.$el, 'marginBottom', '');
        },

        update: [

            {

                read: function read(ref) {
                    var rows = ref.rows;

                    return {
                        columns: rows && rows[0] && rows[0].length || 0,
                        rows: rows && rows.map(function (elements) { return sortBy(elements, 'offsetLeft'); })
                    };
                },

                write: function write(ref) {
                    var columns = ref.columns;

                    css(this.$el, 'marginBottom', columns > 1
                        ? this.translate + toFloat(css(css(this.$el, 'marginBottom', ''), 'marginBottom'))
                        : '');
                },

                events: ['load', 'resize']
            },

            {

                read: function read() {
                    return {scrolled: scrolledOver(this.$el) * this.translate};
                },

                write: function write(ref) {
                    var rows = ref.rows;
                    var columns = ref.columns;
                    var scrolled = ref.scrolled;


                    if (!rows || columns === 1 || !scrolled) {
                        return this.reset();
                    }

                    rows.forEach(function (row) { return row.forEach(function (el, i) { return css(el, 'transform', ("translateY(" + (i % 2 ? scrolled : scrolled / 8) + "px)")); }
                        ); }
                    );

                },

                events: ['scroll', 'load', 'resize']
            }
        ],

        methods: {

            reset: function reset() {
                css(this.$el.children, 'transform', '');
            }

        }

    }));

    UIkit.components.gridParallax.options.update.unshift({

        read: function read() {
            this.reset();
        },

        events: ['load', 'resize']

    });

}

function AnimationsPlugin (UIkit) {

    var ref = UIkit.util;
    var css = ref.css;

    var Animations = {

        slide: {

            show: function show(dir) {
                return [
                    {transform: translate(dir * -100)},
                    {transform: translate()}
                ];
            },

            percent: function percent(current) {
                return Animations.translated(current);
            },

            translate: function translate$1(percent, dir) {
                return [
                    {transform: translate(dir * -100 * percent)},
                    {transform: translate(dir * 100 * (1 - percent))}
                ];
            }

        },

        translated: function translated(el) {
            return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
        }

    };

    return Animations;

}

function translate(value, unit) {
    if ( value === void 0 ) value = 0;
    if ( unit === void 0 ) unit = '%';

    return ("translateX(" + value + (value ? unit : '') + ")"); // currently not translate3d to support IE, translate3d within translate3d does not work while transitioning
}

function scale3d(value) {
    return ("scale3d(" + value + ", " + value + ", 1)");
}

function TransitionerPlugin (UIkit) {

    var ref = UIkit.util;
    var createEvent = ref.createEvent;
    var clamp = ref.clamp;
    var css = ref.css;
    var Deferred = ref.Deferred;
    var noop = ref.noop;
    var Promise = ref.Promise;
    var Transition = ref.Transition;
    var trigger = ref.trigger;

    function Transitioner(prev, next, dir, ref) {
        var animation = ref.animation;
        var easing = ref.easing;


        var percent = animation.percent;
        var translate = animation.translate;
        var show = animation.show; if ( show === void 0 ) show = noop;
        var props = show(dir);
        var deferred = new Deferred();

        return {

            dir: dir,

            show: function show(duration, percent, linear) {
                var this$1 = this;
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                triggerUpdate(next, 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                triggerUpdate(prev, 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                Promise.all([
                    Transition.start(next, props[1], duration, timing),
                    Transition.start(prev, props[0], duration, timing)
                ]).then(function () {
                    this$1.reset();
                    deferred.resolve();
                }, noop);

                return deferred.promise;
            },

            stop: function stop() {
                return Transition.stop([next, prev]);
            },

            cancel: function cancel() {
                Transition.cancel([next, prev]);
            },

            reset: function reset() {
                for (var prop in props[0]) {
                    css([next, prev], prop, '');
                }
            },

            forward: function forward(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel([next, prev]);
                return this.show(duration, percent, true);

            },

            translate: function translate$1(percent) {

                var props = translate(percent, dir);
                css(next, props[1]);
                css(prev, props[0]);
                triggerUpdate(next, 'itemtranslatein', {percent: percent, dir: dir});
                triggerUpdate(prev, 'itemtranslateout', {percent: 1 - percent, dir: dir});

            },

            percent: function percent$1() {
                return percent(prev || next, next, dir);
            },

            getDistance: function getDistance() {
                return prev.offsetWidth;
            }

        };

    }

    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    return Transitioner;

}

function AutoplayMixin (UIkit) {

    var ref = UIkit.util;
    var doc = ref.doc;
    var pointerDown = ref.pointerDown;

    return {

        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },

        defaults: {
            autoplay: false,
            autoplayInterval: 7000,
            pauseOnHover: true
        },

        connected: function connected() {
            this.startAutoplay();
        },

        disconnected: function disconnected() {
            this.stopAutoplay();
        },

        events: [

            {

                name: 'visibilitychange',

                el: doc,

                handler: function handler() {
                    if (doc.hidden) {
                        this.stopAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                }

            },

            {

                name: pointerDown,
                handler: 'stopAutoplay'

            },

            {

                name: 'mouseenter',

                filter: function filter() {
                    return this.autoplay;
                },

                handler: function handler() {
                    this.isHovering = true;
                }

            },

            {

                name: 'mouseleave',

                filter: function filter() {
                    return this.autoplay;
                },

                handler: function handler() {
                    this.isHovering = false;
                }

            }

        ],

        methods: {

            startAutoplay: function startAutoplay() {
                var this$1 = this;


                this.stopAutoplay();

                if (this.autoplay) {
                    this.interval = setInterval(
                        function () { return !(this$1.isHovering && this$1.pauseOnHover) && !this$1.stack.length && this$1.show('next'); },
                        this.autoplayInterval
                    );
                }

            },

            stopAutoplay: function stopAutoplay() {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }

        }

    };
}

function DragMixin (UIkit) {

    var ref = UIkit.util;
    var doc = ref.doc;
    var getPos = ref.getPos;
    var includes = ref.includes;
    var isRtl = ref.isRtl;
    var isTouch = ref.isTouch;
    var off = ref.off;
    var on = ref.on;
    var pointerDown = ref.pointerDown;
    var pointerMove = ref.pointerMove;
    var pointerUp = ref.pointerUp;
    var preventClick = ref.preventClick;
    var trigger = ref.trigger;
    var win = ref.win;

    return {

        defaults: {
            threshold: 10,
            preventCatch: false
        },

        init: function init() {
            var this$1 = this;


            ['start', 'move', 'end'].forEach(function (key) {

                var fn = this$1[key];
                this$1[key] = function (e) {

                    var pos = getPos(e).x * (isRtl ? -1 : 1);

                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;

                    fn(e);
                };

            });

        },

        events: [

            {

                name: pointerDown,

                delegate: function delegate() {
                    return this.slidesSelector;
                },

                handler: function handler(e) {

                    if (!isTouch(e) && hasTextNodesOnly(e.target)
                        || e.button > 0
                        || this.length < 2
                        || this.preventCatch
                    ) {
                        return;
                    }

                    this.start(e);
                }

            },

            {
                name: 'dragstart',

                handler: function handler(e) {
                    e.preventDefault();
                }
            }

        ],

        methods: {

            start: function start() {

                this.drag = this.pos;

                if (this._transitioner) {

                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;

                    this._transitioner.translate(this.percent);
                    this._transitioner.cancel();

                    this.dragging = true;

                    this.stack = [];

                } else {
                    this.prevIndex = this.index;
                }

                this.unbindMove = on(doc, pointerMove, this.move, {capture: true, passive: false});
                on(win, 'scroll', this.unbindMove);
                on(doc, pointerUp, this.end, true);

            },

            move: function move(e) {
                var this$1 = this;


                var distance = this.pos - this.drag;

                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }

                e.cancelable && e.preventDefault();

                this.dragging = true;
                this.dir = (distance < 0 ? 1 : -1);

                var ref = this;
                var slides = ref.slides;
                var ref$1 = this;
                var prevIndex = ref$1.prevIndex;
                var dis = Math.abs(distance);
                var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                while (nextIndex !== prevIndex && dis > width) {

                    this$1.drag -= width * this$1.dir;

                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this$1.getIndex(prevIndex + this$1.dir, prevIndex);
                    width = this$1._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                }

                this.percent = dis / width;

                var prev = slides[prevIndex];
                var next = slides[nextIndex];
                var changed = this.index !== nextIndex;
                var edge = prevIndex === nextIndex;

                var reset;

                [this.index, this.prevIndex].filter(function (i) { return !includes([nextIndex, prevIndex], i); }).forEach(function (i) {
                    trigger(slides[i], 'itemhidden', [this$1]);

                    reset = true;

                    if (edge) {
                        this$1.prevIndex = prevIndex;
                    }

                });

                if (this.index === prevIndex && this.prevIndex !== prevIndex || reset && edge) {
                    trigger(slides[this.index], 'itemshown', [this]);
                }

                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;

                    !edge && trigger(prev, 'beforeitemhide', [this]);
                    trigger(next, 'beforeitemshow', [this]);
                }

                (reset || this.length < 3) && this._transitioner && this._transitioner.reset();
                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);

                if (changed) {
                    !edge && trigger(prev, 'itemhide', [this]);
                    trigger(next, 'itemshow', [this]);
                }

            },

            end: function end() {

                off(win, 'scroll', this.unbindMove);
                this.unbindMove();
                off(doc, pointerUp, this.end, true);

                if (this.dragging) {

                    this.dragging = null;

                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {

                        var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;

                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }

                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
                    }

                    preventClick();

                }

                this.drag
                    = this.percent
                    = null;

            }

        }

    };

    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }

}

function NavMixin (UIkit) {

    var ref = UIkit.util;
    var $ = ref.$;
    var $$ = ref.$$;
    var data = ref.data;
    var html = ref.html;
    var toggleClass = ref.toggleClass;
    var toNumber = ref.toNumber;

    return {

        defaults: {
            selNav: false
        },

        computed: {

            nav: function nav(ref, $el) {
                var selNav = ref.selNav;

                return $(selNav, $el);
            },

            navItemSelector: function navItemSelector(ref) {
                var attrItem = ref.attrItem;

                return ("[" + attrItem + "],[data-" + attrItem + "]");
            },

            navItems: function navItems(_, $el) {
                return $$(this.navItemSelector, $el);
            }

        },

        update: [

            {

                write: function write() {
                    var this$1 = this;


                    if (this.nav && this.length !== this.nav.children.length) {
                        html(this.nav, this.slides.map(function (_, i) { return ("<li " + (this$1.attrItem) + "=\"" + i + "\"><a href=\"#\"></a></li>"); }).join(''));
                    }

                    toggleClass($$(this.navItemSelector, this.$el).concat(this.nav), 'uk-hidden', !this.maxIndex);

                    this.updateNav();

                },

                events: ['load', 'resize']

            }

        ],

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return this.navItemSelector;
                },

                handler: function handler(e) {
                    e.preventDefault();
                    e.current.blur();
                    this.show(data(e.current, this.attrItem));
                }

            },

            {

                name: 'itemshow',
                handler: 'updateNav'

            }

        ],

        methods: {

            updateNav: function updateNav() {
                var this$1 = this;


                var i = this.getValidIndex();
                this.navItems.forEach(function (el) {

                    var cmd = data(el, this$1.attrItem);

                    toggleClass(el, this$1.clsActive, toNumber(cmd) === i);
                    toggleClass(el, 'uk-invisible', this$1.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this$1.maxIndex));
                });

            }

        }

    };

}

function plugin$5(UIkit) {

    if (plugin$5.installed) {
        return;
    }

    var ref = UIkit.util;
    var $ = ref.$;
    var assign = ref.assign;
    var clamp = ref.clamp;
    var fastdom = ref.fastdom;
    var getIndex = ref.getIndex;
    var hasClass = ref.hasClass;
    var isNumber = ref.isNumber;
    var isRtl = ref.isRtl;
    var Promise = ref.Promise;
    var toNodes = ref.toNodes;
    var trigger = ref.trigger;

    UIkit.mixin.slider = {

        attrs: true,

        mixins: [AutoplayMixin(UIkit), DragMixin(UIkit), NavMixin(UIkit)],

        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number
        },

        defaults: {
            easing: 'ease',
            finite: false,
            velocity: 1,
            index: 0,
            stack: [],
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        },

        computed: {

            duration: function duration(ref, $el) {
                var velocity = ref.velocity;

                return speedUp($el.offsetWidth / velocity);
            },

            length: function length() {
                return this.slides.length;
            },

            list: function list(ref, $el) {
                var selList = ref.selList;

                return $(selList, $el);
            },

            maxIndex: function maxIndex() {
                return this.length - 1;
            },

            slidesSelector: function slidesSelector(ref) {
                var selList = ref.selList;

                return (selList + " > *");
            },

            slides: function slides() {
                return toNodes(this.list.children);
            }

        },

        methods: {

            show: function show(index, force) {
                var this$1 = this;
                if ( force === void 0 ) force = false;


                if (this.dragging || !this.length) {
                    return;
                }

                var ref = this;
                var stack = ref.stack;
                var queueIndex = force ? 0 : stack.length;
                var reset = function () {
                    stack.splice(queueIndex, 1);

                    if (stack.length) {
                        this$1.show(stack.shift(), true);
                    }
                };

                stack[force ? 'unshift' : 'push'](index);

                if (!force && stack.length > 1) {

                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }

                    return;
                }

                var prevIndex = this.index;
                var prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                var nextIndex = this.getIndex(index, this.index);
                var next = this.slides[nextIndex];

                if (prev === next) {
                    reset();
                    return;
                }

                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;

                prev && trigger(prev, 'beforeitemhide', [this]);
                if (!trigger(next, 'beforeitemshow', [this, prev])) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }

                var promise = this._show(prev, next, force).then(function () {

                    prev && trigger(prev, 'itemhidden', [this$1]);
                    trigger(next, 'itemshown', [this$1]);

                    return new Promise(function (resolve) {
                        fastdom.write(function () {
                            stack.shift();
                            if (stack.length) {
                                this$1.show(stack.shift(), true);
                            } else {
                                this$1._transitioner = null;
                            }
                            resolve();
                        });
                    });

                });

                prev && trigger(prev, 'itemhide', [this]);
                trigger(next, 'itemshow', [this]);

                return promise;

            },

            getIndex: function getIndex$1(index, prev) {
                if ( index === void 0 ) index = this.index;
                if ( prev === void 0 ) prev = this.index;

                return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },

            getValidIndex: function getValidIndex(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;

                return this.getIndex(index, prevIndex);
            },

            _show: function _show(prev, next, force) {

                this._transitioner = this._getTransitioner(
                    prev,
                    next,
                    this.dir,
                    assign({
                        easing: force
                            ? next.offsetWidth < 600
                                ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */
                                : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */
                            : this.easing
                    }, this.transitionOptions)
                );

                if (!force && !prev) {
                    this._transitioner.translate(1);
                    return Promise.resolve();
                }

                var ref = this.stack;
                var length = ref.length;
                return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);

            },

            _getDistance: function _getDistance(prev, next) {
                return new this._getTransitioner(prev, prev !== next && next).getDistance();
            },

            _translate: function _translate(percent, prev, next) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;

                var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },

            _getTransitioner: function _getTransitioner(prev, next, dir, options) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;
                if ( dir === void 0 ) dir = this.dir || 1;
                if ( options === void 0 ) options = this.transitionOptions;

                return new this.Transitioner(
                    isNumber(prev) ? this.slides[prev] : prev,
                    isNumber(next) ? this.slides[next] : next,
                    dir * (isRtl ? -1 : 1),
                    options
                );
            }

        }

    };

    function getDirection(index, prevIndex) {
        return index === 'next'
            ? 1
            : index === 'previous'
                ? -1
                : index < prevIndex
                    ? -1
                    : 1;
    }

}

function speedUp(x) {
    return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
}

function plugin$4(UIkit) {

    if (plugin$4.installed) {
        return;
    }

    UIkit.use(plugin$5);

    var mixin = UIkit.mixin;
    var UIkit_util = UIkit.util;
    var addClass = UIkit_util.addClass;
    var assign = UIkit_util.assign;
    var fastdom = UIkit_util.fastdom;
    var isNumber = UIkit_util.isNumber;
    var removeClass = UIkit_util.removeClass;

    var Animations = AnimationsPlugin(UIkit);
    var Transitioner = TransitionerPlugin(UIkit);

    UIkit.mixin.slideshow = {

        mixins: [mixin.slider],

        props: {
            animation: String
        },

        defaults: {
            animation: 'slide',
            clsActivated: 'uk-transition-active',
            Animations: Animations,
            Transitioner: Transitioner
        },

        computed: {

            animation: function animation(ref) {
                var animation = ref.animation;
                var Animations = ref.Animations;

                return assign(animation in Animations ? Animations[animation] : Animations.slide, {name: animation});
            },

            transitionOptions: function transitionOptions() {
                return {animation: this.animation};
            }

        },

        events: {

            'itemshow itemhide itemshown itemhidden': function itemshowitemhideitemshownitemhidden(ref) {
                var target = ref.target;

                UIkit.update(null, target);
            },

            itemshow: function itemshow() {
                isNumber(this.prevIndex) && fastdom.flush(); // iOS 10+ will honor the video.play only if called from a gesture handler
            },

            beforeitemshow: function beforeitemshow(ref) {
                var target = ref.target;

                addClass(target, this.clsActive);
            },

            itemshown: function itemshown(ref) {
                var target = ref.target;

                addClass(target, this.clsActivated);
            },

            itemhidden: function itemhidden(ref) {
                var target = ref.target;

                removeClass(target, this.clsActive, this.clsActivated);
            }

        }

    };

}

function AnimationsPlugin$1 (UIkit) {

    var mixin = UIkit.mixin;
    var UIkit_util = UIkit.util;
    var assign = UIkit_util.assign;
    var css = UIkit_util.css;

    return assign({}, mixin.slideshow.defaults.Animations, {

        fade: {

            show: function show() {
                return [
                    {opacity: 0},
                    {opacity: 1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent},
                    {opacity: percent}
                ];
            }

        },

        scale: {

            show: function show() {
                return [
                    {opacity: 0, transform: scale3d(1 - .2)},
                    {opacity: 1, transform: scale3d(1)}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 - .2 * percent)},
                    {opacity: percent, transform: scale3d(1 - .2 + .2 * percent)}
                ];
            }

        }

    });

}

function plugin$3(UIkit) {

    if (plugin$3.installed) {
        return;
    }

    UIkit.use(plugin$4);

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var $ = util.$;
    var addClass = util.addClass;
    var ajax = util.ajax;
    var append = util.append;
    var assign = util.assign;
    var attr = util.attr;
    var css = util.css;
    var doc = util.doc;
    var getImage = util.getImage;
    var html = util.html;
    var index = util.index;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerMove = util.pointerMove;
    var removeClass = util.removeClass;
    var Transition = util.Transition;
    var trigger = util.trigger;

    var Animations = AnimationsPlugin$1(UIkit);

    UIkit.component('lightbox-panel', {

        mixins: [mixin.container, mixin.modal, mixin.togglable, mixin.slideshow],

        functional: true,

        defaults: {
            preload: 1,
            videoAutoplay: false,
            delayControls: 3000,
            items: [],
            cls: 'uk-open',
            clsPage: 'uk-lightbox-page',
            selList: '.uk-lightbox-items',
            attrItem: 'uk-lightbox-item',
            selClose: '.uk-close-large',
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations,
            template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
        },

        created: function created() {
            var this$1 = this;


            this.$mount(append(this.container, this.template));

            this.caption = $('.uk-lightbox-caption', this.$el);

            this.items.forEach(function () { return append(this$1.list, '<li></li>'); });

        },

        events: [

            {

                name: (pointerMove + " " + pointerDown + " keydown"),

                handler: 'showControls'

            },

            {

                name: 'click',

                self: true,

                delegate: function delegate() {
                    return this.slidesSelector;
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'shown',

                self: true,

                handler: 'showControls'
            },

            {

                name: 'hide',

                self: true,

                handler: function handler() {

                    this.hideControls();

                    removeClass(this.slides, this.clsActive);
                    Transition.stop(this.slides);

                }
            },

            {

                name: 'keyup',

                el: function el() {
                    return doc;
                },

                handler: function handler(e) {

                    if (!this.isToggled(this.$el)) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 37:
                            this.show('previous');
                            break;
                        case 39:
                            this.show('next');
                            break;
                    }
                }
            },

            {

                name: 'beforeitemshow',

                handler: function handler(e) {

                    if (this.isToggled()) {
                        return;
                    }

                    this.preventCatch = true;

                    e.preventDefault();

                    this.toggleNow(this.$el, true);

                    this.animation = Animations['scale'];
                    removeClass(e.target, this.clsActive);
                    this.stack.splice(1, 0, this.index);

                }

            },

            {

                name: 'itemshow',

                handler: function handler(ref) {
                    var this$1 = this;
                    var target = ref.target;


                    var i = index(target);
                    var ref$1 = this.getItem(i);
                    var caption = ref$1.caption;

                    css(this.caption, 'display', caption ? '' : 'none');
                    html(this.caption, caption);

                    for (var j = 0; j <= this.preload; j++) {
                        this$1.loadItem(this$1.getIndex(i + j));
                        this$1.loadItem(this$1.getIndex(i - j));
                    }

                }

            },

            {

                name: 'itemshown',

                handler: function handler() {
                    this.preventCatch = false;
                }

            },

            {

                name: 'itemload',

                handler: function handler(_, item) {
                    var this$1 = this;


                    var source = item.source;
                    var type = item.type;
                    var alt = item.alt;

                    this.setItem(item, '<span uk-spinner></span>');

                    if (!source) {
                        return;
                    }

                    var matches;

                    // Image
                    if (type === 'image' || source.match(/\.(jp(e)?g|png|gif|svg)$/i)) {

                        getImage(source).then(
                            function (img) { return this$1.setItem(item, ("<img width=\"" + (img.width) + "\" height=\"" + (img.height) + "\" src=\"" + source + "\" alt=\"" + (alt ? alt : '') + "\">")); },
                            function () { return this$1.setError(item); }
                        );

                    // Video
                    } else if (type === 'video' || source.match(/\.(mp4|webm|ogv)$/i)) {

                        var video = $(("<video controls playsinline" + (item.poster ? (" poster=\"" + (item.poster) + "\"") : '') + " uk-video=\"autoplay: " + (this.videoAutoplay) + "\"></video>"));
                        attr(video, 'src', source);

                        on(video, 'error', function () { return this$1.setError(item); });
                        on(video, 'loadedmetadata', function () {
                            attr(video, {width: video.videoWidth, height: video.videoHeight});
                            this$1.setItem(item, video);
                        });

                    // Iframe
                    } else if (type === 'iframe') {

                        this.setItem(item, ("<iframe class=\"uk-lightbox-iframe\" src=\"" + source + "\" frameborder=\"0\" allowfullscreen></iframe>"));

                    // YouTube
                    } else if ((matches = source.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/) || source.match(/()youtu\.be\/(.*)/))) {

                        var id = matches[2];
                        var setIframe = function (width, height) {
                            if ( width === void 0 ) width = 640;
                            if ( height === void 0 ) height = 450;

                            return this$1.setItem(item, getIframe(("//www.youtube" + (matches[1] || '') + ".com/embed/" + id), width, height, this$1.videoAutoplay));
                        };

                        getImage(("//img.youtube.com/vi/" + id + "/maxresdefault.jpg")).then(
                            function (ref) {
                                var width = ref.width;
                                var height = ref.height;

                                // YouTube default 404 thumb, fall back to low resolution
                                if (width === 120 && height === 90) {
                                    getImage(("//img.youtube.com/vi/" + id + "/0.jpg")).then(
                                        function (ref) {
                                            var width = ref.width;
                                            var height = ref.height;

                                            return setIframe(width, height);
                                    },
                                        setIframe
                                    );
                                } else {
                                    setIframe(width, height);
                                }
                            },
                            setIframe
                        );

                    // Vimeo
                    } else if ((matches = source.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))) {

                        ajax(("//vimeo.com/api/oembed.json?maxwidth=1920&url=" + (encodeURI(source))), {responseType: 'json'})
                            .then(function (ref) {
                                    var ref_response = ref.response;
                                    var height = ref_response.height;
                                    var width = ref_response.width;

                                    return this$1.setItem(item, getIframe(("//player.vimeo.com/video/" + (matches[2])), width, height, this$1.videoAutoplay));
                        }
                            );

                    }

                }

            }

        ],

        methods: {

            loadItem: function loadItem(index) {
                if ( index === void 0 ) index = this.index;


                var item = this.getItem(index);

                if (item.content) {
                    return;
                }

                trigger(this.$el, 'itemload', [item]);
            },

            getItem: function getItem(index) {
                if ( index === void 0 ) index = this.index;

                return this.items[index] || {};
            },

            setItem: function setItem(item, content) {
                assign(item, {content: content});
                var el = html(this.slides[this.items.indexOf(item)], content);
                trigger(this.$el, 'itemloaded', [this, el]);
                UIkit.update(null, el);
            },

            setError: function setError(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },

            showControls: function showControls() {

                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

                addClass(this.$el, 'uk-active', 'uk-transition-active');

            },

            hideControls: function hideControls() {
                removeClass(this.$el, 'uk-active', 'uk-transition-active');
            }

        }

    });

    function getIframe(src, width, height, autoplay) {
        return ("<iframe src=\"" + src + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"max-width: 100%; box-sizing: border-box;\" frameborder=\"0\" allowfullscreen uk-video=\"autoplay: " + autoplay + "\" uk-responsive></iframe>");
    }

}

function plugin$2(UIkit) {

    if (plugin$2.installed) {
        return;
    }

    UIkit.use(plugin$3);

    var util = UIkit.util;
    var $$ = util.$$;
    var assign = util.assign;
    var data = util.data;
    var index = util.index;
    var ref = UIkit.components.lightboxPanel;
    var options = ref.options;

    UIkit.component('lightbox', {

        attrs: true,

        props: assign({toggle: String}, options.props),

        defaults: assign({toggle: 'a'}, Object.keys(options.props).reduce(function (defaults, key) {
            defaults[key] = options.defaults[key];
            return defaults;
        }, {})),

        computed: {

            toggles: function toggles(ref, $el) {
                var toggle = ref.toggle;

                return $$(toggle, $el);
            }

        },

        disconnected: function disconnected() {
            this._destroy();
        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    e.current.blur();
                    this.show(index(this.toggles, e.current));
                }

            }

        ],

        update: function update(data) {

            if (this.panel && this.animation) {
                this.panel.$props.animation = this.animation;
                this.panel.$emit();
            }

            if (!this.panel || data.toggles && isEqualList(data.toggles, this.toggles)) {
                return;
            }

            data.toggles = this.toggles;
            this._destroy();
            this._init();

        },

        methods: {

            _init: function _init() {
                return this.panel = this.panel || UIkit.lightboxPanel(assign({}, this.$props, {
                    items: this.toggles.reduce(function (items, el) {
                        items.push(['href', 'caption', 'type', 'poster', 'alt'].reduce(function (obj, attr) {
                            obj[attr === 'href' ? 'source' : attr] = data(el, attr);
                            return obj;
                        }, {}));
                        return items;
                    }, [])
                }));
            },

            _destroy: function _destroy() {
                if (this.panel) {
                    this.panel.$destroy(true);
                    this.panel = null;
                }
            },

            show: function show(index) {

                if (!this.panel) {
                    this._init();
                }

                return this.panel.show(index);

            },

            hide: function hide() {

                return this.panel && this.panel.hide();

            }

        }

    });

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el, i) { return el !== listB[i]; });
    }

}

function plugin$6(UIkit) {
    var obj;


    if (plugin$6.installed) {
        return;
    }

    var ref = UIkit.util;
    var append = ref.append;
    var closest = ref.closest;
    var css = ref.css;
    var each = ref.each;
    var pointerEnter = ref.pointerEnter;
    var pointerLeave = ref.pointerLeave;
    var remove = ref.remove;
    var toFloat = ref.toFloat;
    var Transition = ref.Transition;
    var trigger = ref.trigger;
    var containers = {};

    UIkit.component('notification', {

        functional: true,

        args: ['message', 'status'],

        defaults: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        created: function created() {

            if (!containers[this.pos]) {
                containers[this.pos] = append(UIkit.container, ("<div class=\"uk-notification uk-notification-" + (this.pos) + "\"></div>"));
            }

            var container = css(containers[this.pos], 'display', 'block');

            this.$mount(append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href=\"#\" class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        ready: function ready() {
            var this$1 = this;


            var marginBottom = toFloat(css(this.$el, 'marginBottom'));
            Transition.start(
                css(this.$el, {opacity: 0, marginTop: -this.$el.offsetHeight, marginBottom: 0}),
                {opacity: 1, marginTop: 0, marginBottom: marginBottom}
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj = {

            click: function click(e) {
                if (closest(e.target, 'a[href="#"]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj[pointerEnter] = function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }, obj[pointerLeave] = function () {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }, obj),

        methods: {

            close: function close(immediate) {
                var this$1 = this;


                var removeFn = function () {

                    trigger(this$1.$el, 'close', [this$1]);
                    remove(this$1.$el);

                    if (!containers[this$1.pos].children.length) {
                        css(containers[this$1.pos], 'display', 'none');
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn();
                } else {
                    Transition.start(this.$el, {
                        opacity: 0,
                        marginTop: -this.$el.offsetHeight,
                        marginBottom: 0
                    }).then(removeFn);
                }
            }

        }

    });

    UIkit.notification.closeAll = function (group, immediate) {
        each(UIkit.instances, function (component) {
            if (component.$options.name === 'notification' && (!group || group === component.group)) {
                component.close(immediate);
            }
        });
    };

}

function plugin$8(UIkit) {

    if (plugin$8.installed) {
        return;
    }

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var css = util.css;
    var Dimensions = util.Dimensions;
    var each = util.each;
    var getImage = util.getImage;
    var includes = util.includes;
    var isNumber = util.isNumber;
    var isUndefined = util.isUndefined;
    var toFloat = util.toFloat;
    var win = util.win;

    var props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity'];

    mixin.parallax = {

        props: props.reduce(function (props, prop) {
            props[prop] = 'list';
            return props;
        }, {
            media: 'media'
        }),

        defaults: props.reduce(function (defaults, prop) {
            defaults[prop] = undefined;
            return defaults;
        }, {
            media: false
        }),

        computed: {

            props: function props$1(properties, $el) {
                var this$1 = this;


                return props.reduce(function (props, prop) {

                    if (isUndefined(properties[prop])) {
                        return props;
                    }

                    var isColor = prop.match(/color/i);
                    var isCssProp = isColor || prop === 'opacity';

                    var pos, bgPos, diff;
                    var steps = properties[prop].slice(0);

                    if (isCssProp) {
                        css($el, prop, '');
                    }

                    if (steps.length < 2) {
                        steps.unshift((prop === 'scale'
                            ? 1
                            : isCssProp
                                ? css($el, prop)
                                : 0) || 0);
                    }

                    var unit = includes(steps.join(''), '%') ? '%' : 'px';

                    if (isColor) {

                        var ref = $el.style;
                        var color = ref.color;
                        steps = steps.map(function (step) { return parseColor($el, step); });
                        $el.style.color = color;

                    } else {

                        steps = steps.map(toFloat);

                    }

                    if (prop.match(/^bg/)) {

                        css($el, ("background-position-" + (prop[2])), '');
                        bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

                        if (this$1.covers) {

                            var min = Math.min.apply(Math, steps);
                            var max = Math.max.apply(Math, steps);
                            var down = steps.indexOf(min) < steps.indexOf(max);

                            diff = max - min;

                            steps = steps.map(function (step) { return step - (down ? min : max); });
                            pos = (down ? -diff : 0) + "px";

                        } else {

                            pos = bgPos;

                        }
                    }

                    props[prop] = {steps: steps, unit: unit, pos: pos, bgPos: bgPos, diff: diff};

                    return props;

                }, {});

            },

            bgProps: function bgProps() {
                var this$1 = this;

                return ['bgx', 'bgy'].filter(function (bg) { return bg in this$1.props; });
            },

            covers: function covers(_, $el) {
                return css($el.style.backgroundSize !== '' ? css($el, 'backgroundSize', '') : $el, 'backgroundSize') === 'cover';
            }

        },

        disconnected: function disconnected() {
            delete this._image;
        },

        update: [

            {

                read: function read(data) {
                    var this$1 = this;


                    data.active = !this.media || win.matchMedia(this.media).matches;

                    if (data.image) {
                        data.image.dimEl = {
                            width: this.$el.offsetWidth,
                            height: this.$el.offsetHeight
                        };
                    }

                    if ('image' in data || !this.covers || !this.bgProps.length) {
                        return;
                    }

                    var src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

                    if (!src) {
                        return;
                    }

                    data.image = false;

                    getImage(src).then(function (img) {
                        data.image = {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        };

                        this$1.$emit();
                    });

                },

                write: function write(ref) {
                    var this$1 = this;
                    var image = ref.image;
                    var active = ref.active;


                    if (!image) {
                        return;
                    }

                    if (!active) {
                        css(this.$el, {backgroundSize: '', backgroundRepeat: ''});
                        return;
                    }

                    var dimEl = image.dimEl;

                    var dim = Dimensions.cover(image, dimEl);

                    this.bgProps.forEach(function (prop) {

                        var ref = this$1.props[prop];
                        var diff = ref.diff;
                        var bgPos = ref.bgPos;
                        var steps = ref.steps;
                        var attr = prop === 'bgy' ? 'height' : 'width';
                        var span = dim[attr] - dimEl[attr];

                        if (!bgPos.match(/%$|0px/)) {
                            return;
                        }

                        if (span < diff) {
                            dimEl[attr] = dim[attr] + diff - span;
                        } else if (span > diff) {

                            var bgPosFloat = parseFloat(bgPos);

                            if (bgPosFloat) {
                                this$1.props[prop].steps = steps.map(function (step) { return step - (span - diff) / (100 / bgPosFloat); });
                            }
                        }

                        dim = Dimensions.cover(image, dimEl);
                    });

                    css(this.$el, {
                        backgroundSize: ((dim.width) + "px " + (dim.height) + "px"),
                        backgroundRepeat: 'no-repeat'
                    });

                },

                events: ['load', 'resize']

            }

        ],

        methods: {

            reset: function reset() {
                var this$1 = this;

                each(this.getCss(0), function (_, prop) { return css(this$1.$el, prop, ''); });
            },

            getCss: function getCss(percent) {

                var ref = this;
                var props = ref.props;
                var translated = false;

                return Object.keys(props).reduce(function (css, prop) {

                    var ref = props[prop];
                    var steps = ref.steps;
                    var unit = ref.unit;
                    var pos = ref.pos;
                    var value = getValue(steps, percent);

                    switch (prop) {

                        // transforms
                        case 'x':
                        case 'y':

                            if (translated) {
                                break;
                            }

                            var ref$1 = ['x', 'y'].map(function (dir) { return prop === dir
                                ? value + unit
                                : props[dir]
                                    ? getValue(props[dir].steps, percent) + props[dir].unit
                                    : 0; }
                            );
                    var x = ref$1[0];
                    var y = ref$1[1];

                            translated = css.transform += " translate3d(" + x + ", " + y + ", 0)";
                            break;
                        case 'rotate':
                            css.transform += " rotate(" + value + "deg)";
                            break;
                        case 'scale':
                            css.transform += " scale(" + value + ")";
                            break;

                        // bg image
                        case 'bgy':
                        case 'bgx':
                            css[("background-position-" + (prop[2]))] = "calc(" + pos + " + " + (value + unit) + ")";
                            break;

                        // color
                        case 'color':
                        case 'backgroundColor':
                        case 'borderColor':

                            var ref$2 = getStep(steps, percent);
                    var start = ref$2[0];
                    var end = ref$2[1];
                    var p = ref$2[2];

                            css[prop] = "rgba(" + (start.map(function (value, i) {
                                    value = value + p * (end[i] - value);
                                    return i === 3 ? toFloat(value) : parseInt(value, 10);
                                }).join(',')) + ")";
                            break;

                        // CSS Filter
                        case 'blur':
                            css.filter += " blur(" + value + "px)";
                            break;
                        case 'hue':
                            css.filter += " hue-rotate(" + value + "deg)";
                            break;
                        case 'fopacity':
                            css.filter += " opacity(" + value + "%)";
                            break;
                        case 'grayscale':
                        case 'invert':
                        case 'saturate':
                        case 'sepia':
                            css.filter += " " + prop + "(" + value + "%)";
                            break;

                        default:
                            css[prop] = value;
                    }

                    return css;

                }, {transform: '', filter: ''});

            }

        }

    };

    function parseColor(el, color) {
        return css(css(el, 'color', color), 'color').split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(function (n) { return toFloat(n); });
    }

    function getStep(steps, percent) {
        var count = steps.length - 1;
        var index = Math.min(Math.floor(count * percent), count - 1);
        var step = steps.slice(index, index + 2);

        step.push(percent === 1 ? 1 : percent % (1 / count) * count);

        return step;
    }

    function getValue(steps, percent) {
        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return (isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end
        ).toFixed(2);
    }

}

function plugin$7(UIkit) {

    if (plugin$7.installed) {
        return;
    }

    UIkit.use(plugin$8);

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var clamp = util.clamp;
    var css = util.css;
    var scrolledOver = util.scrolledOver;
    var query = util.query;

    UIkit.component('parallax', {

        mixins: [mixin.parallax],

        props: {
            target: String,
            viewport: Number,
            easing: Number,
        },

        defaults: {
            target: false,
            viewport: 1,
            easing: 1,
        },

        computed: {

            target: function target(ref, $el) {
                var target = ref.target;

                return target && query(target, $el) || $el;
            }

        },

        update: [

            {

                read: function read(ref) {
                    var percent = ref.percent;

                    return {
                        prev: percent,
                        percent: ease(scrolledOver(this.target) / (this.viewport || 1), this.easing)
                    };
                },

                write: function write(ref, ref$1) {
                    var prev = ref.prev;
                    var percent = ref.percent;
                    var active = ref.active;
                    var type = ref$1.type;


                    if (type !== 'scroll') {
                        prev = false;
                    }

                    if (!active) {
                        this.reset();
                        return;
                    }

                    if (prev !== percent) {
                        css(this.$el, this.getCss(percent));
                    }

                },

                events: ['scroll', 'load', 'resize']
            }

        ]

    });

    function ease(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)));
    }

}

function SliderReactive (UIkit) {

    var ref = UIkit.util;
    var removeClass = ref.removeClass;

    return {

        update: [

            {

                write: function write() {

                    if (this.stack.length || this.dragging) {
                        return;
                    }

                    var index = this.getValidIndex();
                    delete this.index;
                    removeClass(this.slides, this.clsActive, this.clsActivated);
                    this.show(index);

                },

                events: ['load', 'resize']

            }

        ]

    };

}

function TransitionerPlugin$1 (UIkit) {

    var ref = UIkit.util;
    var assign = ref.assign;
    var clamp = ref.clamp;
    var createEvent = ref.createEvent;
    var css = ref.css;
    var Deferred = ref.Deferred;
    var includes = ref.includes;
    var index = ref.index;
    var isRtl = ref.isRtl;
    var noop = ref.noop;
    var sortBy = ref.sortBy;
    var toNodes = ref.toNodes;
    var Transition = ref.Transition;
    var trigger = ref.trigger;

    var Transitioner = assign(function (prev, next, dir, ref) {
        var center = ref.center;
        var easing = ref.easing;
        var list = ref.list;


        var deferred = new Deferred();

        var from = prev
                ? Transitioner.getLeft(prev, list, center)
                : Transitioner.getLeft(next, list, center) + next.offsetWidth * dir,
            to = next
                ? Transitioner.getLeft(next, list, center)
                : from + prev.offsetWidth * dir * (isRtl ? -1 : 1);

        return {

            dir: dir,

            show: function show(duration, percent, linear) {
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                prev && this.updateTranslates();
                percent = prev ? percent : clamp(percent, 0, 1);
                triggerUpdate(this.getItemIn(), 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                prev && triggerUpdate(this.getItemIn(true), 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                Transition
                    .start(list, {transform: translate(-to * (isRtl ? -1 : 1), 'px')}, duration, timing)
                    .then(deferred.resolve, noop);

                return deferred.promise;

            },

            stop: function stop() {
                return Transition.stop(list);
            },

            cancel: function cancel() {
                Transition.cancel(list);
            },

            reset: function reset() {
                css(list, 'transform', '');
            },

            forward: function forward(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel(list);
                return this.show(duration, percent, true);
            },

            translate: function translate$1(percent) {

                var distance = this.getDistance() * dir * (isRtl ? -1 : 1);

                css(list, 'transform', translate(clamp(
                    -to + (distance - distance * percent),
                    -Transitioner.getWidth(list),
                    list.offsetWidth
                ) * (isRtl ? -1 : 1), 'px'));

                this.updateTranslates();

                if (prev) {
                    percent = clamp(percent, -1, 1);
                    triggerUpdate(this.getItemIn(), 'itemtranslatein', {percent: percent, dir: dir});
                    triggerUpdate(this.getItemIn(true), 'itemtranslateout', {percent: 1 - percent, dir: dir});
                }

            },

            percent: function percent() {
                return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
            },

            getDistance: function getDistance() {
                return Math.abs(to - from);
            },

            getItemIn: function getItemIn(out) {
                if ( out === void 0 ) out = false;


                var actives = this.getActives();
                var all = sortBy(slides(list), 'offsetLeft');
                var i = index(all, actives[dir * (out ? -1 : 1) > 0 ? actives.length - 1 : 0]);

                return ~i && all[i + (prev && !out ? dir : 0)];

            },

            getActives: function getActives() {

                var left = Transitioner.getLeft(prev || next, list, center);

                return sortBy(slides(list).filter(function (slide) {
                    var slideLeft = Transitioner.getElLeft(slide, list);
                    return slideLeft >= left && slideLeft + slide.offsetWidth <= list.offsetWidth + left;
                }), 'offsetLeft');

            },

            updateTranslates: function updateTranslates() {

                var actives = this.getActives();

                slides(list).forEach(function (slide) {
                    var isActive = includes(actives, slide);

                    triggerUpdate(slide, ("itemtranslate" + (isActive ? 'in' : 'out')), {
                        percent: isActive ? 1 : 0,
                        dir: slide.offsetLeft <= next.offsetLeft ? 1 : -1
                    });
                });
            }

        };

    }, {

        getLeft: function getLeft(el, list, center) {

            var left = this.getElLeft(el, list);

            return center
                ? left - this.center(el, list)
                : Math.min(left, this.getMax(list));

        },

        getMax: function getMax(list) {
            return Math.max(0, this.getWidth(list) - list.offsetWidth);
        },

        getWidth: function getWidth(list) {
            return slides(list).reduce(function (right, el) { return el.offsetWidth + right; }, 0);
        },

        getMaxWidth: function getMaxWidth(list) {
            return slides(list).reduce(function (right, el) { return Math.max(right, el.offsetWidth); }, 0);
        },

        center: function center(el, list) {
            return list.offsetWidth / 2 - el.offsetWidth / 2;
        },

        getElLeft: function getElLeft(el, list) {
            return (el.offsetLeft + (isRtl ? el.offsetWidth - list.offsetWidth : 0)) * (isRtl ? -1 : 1);
        }

    });

    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    function slides(list) {
        return toNodes(list.children);
    }

    return Transitioner;

}

function ParallaxPlugin (UIkit, parent) {

    UIkit.use(plugin$8);

    var mixin = UIkit.mixin;
    var UIkit_util = UIkit.util;
    var closest = UIkit_util.closest;
    var css = UIkit_util.css;
    var endsWith = UIkit_util.endsWith;
    var noop = UIkit_util.noop;
    var Transition = UIkit_util.Transition;

    return {

        mixins: [mixin.parallax],

        computed: {

            item: function item() {
                var slider = UIkit.getComponent(closest(this.$el, (".uk-" + parent)), parent);
                return slider && closest(this.$el, slider.slidesSelector);
            }

        },

        events: [

            {

                name: 'itemshown',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler() {
                    css(this.$el, this.getCss(.5));
                }

            },

            {
                name: 'itemin itemout',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler(ref) {
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var duration = ref_detail.duration;
                    var timing = ref_detail.timing;
                    var dir = ref_detail.dir;


                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));

                    Transition.start(this.$el, this.getCss(isIn(type)
                        ? .5
                        : dir > 0
                            ? 1
                            : 0
                    ), duration, timing).catch(noop);

                }
            },

            {
                name: 'transitioncanceled transitionend',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler() {
                    Transition.cancel(this.$el);
                }

            },

            {
                name: 'itemtranslatein itemtranslateout',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler(ref) {
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var dir = ref_detail.dir;

                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));
                }
            }

        ]

    };

    function isIn(type) {
        return endsWith(type, 'in');
    }

    function getCurrent(type, dir, percent) {

        percent /= 2;

        return !isIn(type)
            ? dir < 0
                ? percent
                : 1 - percent
            : dir < 0
                ? 1 - percent
                : percent;
    }

}

function plugin$9(UIkit) {

    if (plugin$9.installed) {
        return;
    }

    UIkit.use(plugin$5);

    var mixin = UIkit.mixin;
    var UIkit_util = UIkit.util;
    var $ = UIkit_util.$;
    var $$ = UIkit_util.$$;
    var addClass = UIkit_util.addClass;
    var css = UIkit_util.css;
    var data = UIkit_util.data;
    var includes = UIkit_util.includes;
    var isNumeric = UIkit_util.isNumeric;
    var isUndefined = UIkit_util.isUndefined;
    var toggleClass = UIkit_util.toggleClass;
    var toFloat = UIkit_util.toFloat;
    var Transitioner = TransitionerPlugin$1(UIkit);

    UIkit.component('slider-parallax', ParallaxPlugin(UIkit, 'slider'));

    UIkit.component('slider', {

        mixins: [mixin.class, mixin.slider, SliderReactive(UIkit)],

        props: {
            center: Boolean,
            sets: Boolean,
        },

        defaults: {
            center: false,
            sets: false,
            attrItem: 'uk-slider-item',
            selList: '.uk-slider-items',
            selNav: '.uk-slider-nav',
            clsContainer: 'uk-slider-container',
            Transitioner: Transitioner
        },

        computed: {

            avgWidth: function avgWidth() {
                return Transitioner.getWidth(this.list) / this.length;
            },

            finite: function finite(ref) {
                var finite = ref.finite;

                return finite || Transitioner.getWidth(this.list) < this.list.offsetWidth + Transitioner.getMaxWidth(this.list) + this.center;
            },

            maxIndex: function maxIndex() {
                var this$1 = this;


                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }

                if (this.center) {
                    return this.sets[this.sets.length - 1];
                }

                css(this.slides, 'order', '');

                var max = Transitioner.getMax(this.list);
                var i = this.length;

                while (i--) {
                    if (Transitioner.getElLeft(this$1.list.children[i], this$1.list) < max) {
                        return Math.min(i + 1, this$1.length - 1);
                    }
                }

                return 0;
            },

            sets: function sets(ref) {
                var this$1 = this;
                var sets = ref.sets;


                var width = this.list.offsetWidth / (this.center ? 2 : 1);

                var left = 0;
                var leftCenter = width;
                var slideLeft = 0;

                sets = sets && this.slides.reduce(function (sets, slide, i) {

                    var slideWidth = slide.offsetWidth;
                    var slideRight = slideLeft + slideWidth;

                    if (slideRight > left) {

                        if (!this$1.center && i > this$1.maxIndex) {
                            i = this$1.maxIndex;
                        }

                        if (!includes(sets, i)) {

                            var cmp = this$1.slides[i + 1];
                            if (this$1.center && cmp && slideWidth < leftCenter - cmp.offsetWidth / 2) {
                                leftCenter -= slideWidth;
                            } else {
                                leftCenter = width;
                                sets.push(i);
                                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
                            }

                        }
                    }

                    slideLeft += slideWidth;

                    return sets;

                }, []);

                return sets && sets.length && sets;

            },

            transitionOptions: function transitionOptions() {
                return {
                    center: this.center,
                    list: this.list
                };
            }

        },

        connected: function connected() {
            toggleClass(this.$el, this.clsContainer, !$(("." + (this.clsContainer)), this.$el));
        },

        update: {

            write: function write() {
                var this$1 = this;


                $$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), this.$el).forEach(function (el) {
                    var index = data(el, this$1.attrItem);
                    this$1.maxIndex && toggleClass(el, 'uk-hidden', isNumeric(index) && (this$1.sets && !includes(this$1.sets, toFloat(index)) || index > this$1.maxIndex));
                });

            },

            events: ['load', 'resize']

        },

        events: {

            beforeitemshow: function beforeitemshow(e) {
                var this$1 = this;


                if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }

                var diff = Math.abs(
                    this.index
                    - this.prevIndex
                    + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
                );

                if (!this.dragging && diff > 1) {

                    for (var i = 0; i < diff; i++) {
                        this$1.stack.splice(1, 0, this$1.dir > 0 ? 'next' : 'previous');
                    }

                    e.preventDefault();
                    return;
                }

                this.duration = speedUp(this.avgWidth / this.velocity)
                    * ((
                        this.dir < 0 || !this.slides[this.prevIndex]
                            ? this.slides[this.index]
                            : this.slides[this.prevIndex]
                    ).offsetWidth / this.avgWidth);

                this.reorder();

            },

            itemshow: function itemshow() {
                !isUndefined(this.prevIndex) && addClass(this._getTransitioner().getItemIn(), this.clsActive);
            },

            itemshown: function itemshown() {
                var this$1 = this;

                var actives = this._getTransitioner(this.index).getActives();
                this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActive, includes(actives, slide)); });
                (!this.sets || includes(this.sets, toFloat(this.index))) && this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActivated, includes(actives, slide)); });
            }

        },

        methods: {

            reorder: function reorder() {
                var this$1 = this;


                css(this.slides, 'order', '');

                if (this.finite) {
                    return;
                }

                var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;

                this.slides.forEach(function (slide, i) { return css(slide, 'order', this$1.dir > 0 && i < index
                        ? 1
                        : this$1.dir < 0 && i >= this$1.index
                            ? -1
                            : ''
                    ); }
                );

                if (!this.center) {
                    return;
                }

                var next = this.slides[index];
                var width = this.list.offsetWidth / 2 - next.offsetWidth / 2;
                var j = 0;

                while (width > 0) {
                    var slideIndex = this$1.getIndex(--j + index, index);
                    var slide = this$1.slides[slideIndex];

                    css(slide, 'order', slideIndex > index ? -2 : -1);
                    width -= slide.offsetWidth;
                }

            },

            getValidIndex: function getValidIndex(index, prevIndex) {
                var this$1 = this;
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;


                index = this.getIndex(index, prevIndex);

                if (!this.sets) {
                    return index;
                }

                var prev;

                do {

                    if (includes(this$1.sets, index)) {
                        return index;
                    }

                    prev = index;
                    index = this$1.getIndex(index + this$1.dir, prevIndex);

                } while (index !== prev);

                return index;
            }

        }

    });

}

function AnimationsPlugin$2 (UIkit) {

    var mixin = UIkit.mixin;
    var UIkit_util = UIkit.util;
    var assign = UIkit_util.assign;
    var css = UIkit_util.css;

    var Animations = assign({}, mixin.slideshow.defaults.Animations, {

        fade: {

            show: function show() {
                return [
                    {opacity: 0, zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        scale: {

            show: function show() {
                return [
                    {opacity: 0, transform: scale3d(1 + .5), zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 + .5 * percent), zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        pull: {

            show: function show(dir) {
                return dir < 0
                    ? [
                        {transform: translate(30), zIndex: -1},
                        {transform: translate(), zIndex: 0} ]
                    : [
                        {transform: translate(-100), zIndex: 0},
                        {transform: translate(), zIndex: -1}
                    ];
            },

            percent: function percent(current, next, dir) {
                return dir < 0
                    ? 1 - Animations.translated(next)
                    : Animations.translated(current);
            },

            translate: function translate$1(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(30 * percent), zIndex: -1},
                        {transform: translate(-100 * (1 - percent)), zIndex: 0} ]
                    : [
                        {transform: translate(-percent * 100), zIndex: 0},
                        {transform: translate(30 * (1 - percent)), zIndex: -1}
                    ];
            }

        },

        push: {

            show: function show(dir) {
                return dir < 0
                    ? [
                        {transform: translate(100), zIndex: 0},
                        {transform: translate(), zIndex: -1} ]
                    : [
                        {transform: translate(-30), zIndex: -1},
                        {transform: translate(), zIndex: 0}
                    ];
            },

            percent: function percent(current, next, dir) {
                return dir > 0
                    ? 1 - Animations.translated(next)
                    : Animations.translated(current);
            },

            translate: function translate$2(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(percent * 100), zIndex: 0},
                        {transform: translate(-30 * (1 - percent)), zIndex: -1} ]
                    : [
                        {transform: translate(-30 * percent), zIndex: -1},
                        {transform: translate(100 * (1 - percent)), zIndex: 0}
                    ];
            }

        }

    });

    return Animations;

}

function plugin$10(UIkit) {

    if (plugin$10.installed) {
        return;
    }

    UIkit.use(plugin$4);

    var mixin = UIkit.mixin;
    var height = UIkit.util.height;

    var Animations = AnimationsPlugin$2(UIkit);

    UIkit.component('slideshow-parallax', ParallaxPlugin(UIkit, 'slideshow'));

    UIkit.component('slideshow', {

        mixins: [mixin.class, mixin.slideshow, SliderReactive(UIkit)],

        props: {
            ratio: String,
            minHeight: Boolean,
            maxHeight: Boolean,
        },

        defaults: {
            ratio: '16:9',
            minHeight: false,
            maxHeight: false,
            selList: '.uk-slideshow-items',
            attrItem: 'uk-slideshow-item',
            selNav: '.uk-slideshow-nav',
            Animations: Animations
        },

        update: {

            read: function read() {

                var ref = this.ratio.split(':').map(Number);
                var width = ref[0];
                var height = ref[1];

                height = height * this.$el.offsetWidth / width;

                if (this.minHeight) {
                    height = Math.max(this.minHeight, height);
                }

                if (this.maxHeight) {
                    height = Math.min(this.maxHeight, height);
                }

                return {height: height};
            },

            write: function write(ref) {
                var hgt = ref.height;

                height(this.list, Math.floor(hgt));
            },

            events: ['load', 'resize']

        }

    });

}

function plugin$11(UIkit) {
    var obj;


    if (plugin$11.installed) {
        return;
    }

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var addClass = util.addClass;
    var after = util.after;
    var assign = util.assign;
    var append = util.append;
    var attr = util.attr;
    var before = util.before;
    var closest = util.closest;
    var css = util.css;
    var doc = util.doc;
    var docEl = util.docEl;
    var height = util.height;
    var fastdom = util.fastdom;
    var getPos = util.getPos;
    var includes = util.includes;
    var index = util.index;
    var isInput = util.isInput;
    var noop = util.noop;
    var offset = util.offset;
    var off = util.off;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerMove = util.pointerMove;
    var pointerUp = util.pointerUp;
    var position = util.position;
    var preventClick = util.preventClick;
    var Promise = util.Promise;
    var remove = util.remove;
    var removeClass = util.removeClass;
    var toggleClass = util.toggleClass;
    var toNodes = util.toNodes;
    var Transition = util.Transition;
    var trigger = util.trigger;
    var win = util.win;
    var within = util.within;

    UIkit.component('sortable', {

        mixins: [mixin.class],

        props: {
            group: String,
            animation: Number,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },

        defaults: {
            group: false,
            animation: 150,
            threshold: 5,
            clsItem: 'uk-sortable-item',
            clsPlaceholder: 'uk-sortable-placeholder',
            clsDrag: 'uk-sortable-drag',
            clsDragState: 'uk-drag',
            clsBase: 'uk-sortable',
            clsNoDrag: 'uk-sortable-nodrag',
            clsEmpty: 'uk-sortable-empty',
            clsCustom: '',
            handle: false
        },

        init: function init() {
            var this$1 = this;

            ['init', 'start', 'move', 'end'].forEach(function (key) {
                var fn = this$1[key];
                this$1[key] = function (e) {
                    this$1.scrollY = win.pageYOffset;
                    var ref = getPos(e);
                    var x = ref.x;
                    var y = ref.y;
                    this$1.pos = {x: x, y: y};

                    fn(e);
                };
            });
        },

        events: ( obj = {}, obj[pointerDown] = 'init', obj),

        update: {

            write: function write() {

                if (this.clsEmpty) {
                    toggleClass(this.$el, this.clsEmpty, !this.$el.children.length);
                }

                if (!this.drag) {
                    return;
                }

                offset(this.drag, {top: this.pos.y + this.origin.top, left: this.pos.x + this.origin.left});

                var ref = offset(this.drag);
                var top = ref.top;
                var bottom = top + this.drag.offsetHeight;
                var scroll;

                if (top > 0 && top < this.scrollY) {
                    scroll = this.scrollY - 5;
                } else if (bottom < height(doc) && bottom > height(win) + this.scrollY) {
                    scroll = this.scrollY + 5;
                }

                scroll && setTimeout(function () { return win.scrollTo(win.scrollX, scroll); }, 5);
            }

        },

        methods: {

            init: function init(e) {

                var target = e.target;
                var button = e.button;
                var defaultPrevented = e.defaultPrevented;
                var ref = toNodes(this.$el.children).filter(function (el) { return within(target, el); });
                var placeholder = ref[0];

                if (!placeholder
                    || isInput(e.target)
                    || this.handle && !within(target, this.handle)
                    || button > 0
                    || within(target, ("." + (this.clsNoDrag)))
                    || defaultPrevented
                ) {
                    return;
                }

                e.preventDefault();

                this.touched = [this];
                this.placeholder = placeholder;
                this.origin = assign({target: target, index: index(placeholder)}, this.pos);

                on(docEl, pointerMove, this.move);
                on(docEl, pointerUp, this.end);
                on(win, 'scroll', this.scroll);

                if (!this.threshold) {
                    this.start(e);
                }

            },

            start: function start(e) {

                this.drag = append(UIkit.container, this.placeholder.outerHTML.replace(/^<li/i, '<div').replace(/li>$/i, 'div>'));

                css(this.drag, assign({
                    boxSizing: 'border-box',
                    width: this.placeholder.offsetWidth,
                    height: this.placeholder.offsetHeight
                }, css(this.placeholder, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])));
                attr(this.drag, 'uk-no-boot', '');
                addClass(this.drag, this.clsDrag, this.clsCustom);

                height(this.drag.firstElementChild, height(this.placeholder.firstElementChild));

                var ref = offset(this.placeholder);
                var left = ref.left;
                var top = ref.top;
                assign(this.origin, {left: left - this.pos.x, top: top - this.pos.y});

                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.$el.children, this.clsItem);
                addClass(docEl, this.clsDragState);

                trigger(this.$el, 'start', [this, this.placeholder, this.drag]);

                this.move(e);
            },

            move: function move(e) {

                if (!this.drag) {

                    if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                        this.start(e);
                    }

                    return;
                }

                this.$emit();

                var target = e.type === 'mousemove' ? e.target : doc.elementFromPoint(this.pos.x - doc.body.scrollLeft, this.pos.y - doc.body.scrollTop);

                var sortable = getSortable(target);
                var previous = getSortable(this.placeholder);
                var move = sortable !== previous;

                if (!sortable || within(target, this.placeholder) || move && (!sortable.group || sortable.group !== previous.group)) {
                    return;
                }

                target = sortable.$el === target.parentNode && target || toNodes(sortable.$el.children).filter(function (element) { return within(target, element); })[0];

                if (move) {
                    previous.remove(this.placeholder);
                } else if (!target) {
                    return;
                }

                sortable.insert(this.placeholder, target);

                if (!includes(this.touched, sortable)) {
                    this.touched.push(sortable);
                }

            },

            scroll: function scroll() {
                var scroll = win.pageYOffset;
                if (scroll !== this.scrollY) {
                    this.pos.y += scroll - this.scrollY;
                    this.scrollY = scroll;
                    this.$emit();
                }
            },

            end: function end(e) {

                off(docEl, pointerMove, this.move);
                off(docEl, pointerUp, this.end);
                off(win, 'scroll', this.scroll);

                if (!this.drag) {

                    if (e.type !== 'mouseup' && within(e.target, 'a[href]')) {
                        location.href = closest(e.target, 'a[href]').href;
                    }

                    return;
                }

                preventClick();

                var sortable = getSortable(this.placeholder);

                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, 'moved', [this, this.placeholder]);
                    }
                } else {
                    trigger(sortable.$el, 'added', [sortable, this.placeholder]);
                    trigger(this.$el, 'removed', [this, this.placeholder]);
                }

                trigger(this.$el, 'stop', [this]);

                remove(this.drag);
                this.drag = null;

                var classes = this.touched.map(function (sortable) { return ((sortable.clsPlaceholder) + " " + (sortable.clsItem)); }).join(' ');
                this.touched.forEach(function (sortable) { return removeClass(sortable.$el.children, classes); });

                removeClass(docEl, this.clsDragState);

            },

            insert: function insert(element, target) {
                var this$1 = this;


                addClass(this.$el.children, this.clsItem);

                var insert = function () {

                    if (target) {

                        if (!within(element, this$1.$el) || isPredecessor(element, target)) {
                            before(target, element);
                        } else {
                            after(target, element);
                        }

                    } else {
                        append(this$1.$el, element);
                    }

                };

                if (this.animation) {
                    this.animate(insert);
                } else {
                    insert();
                }

            },

            remove: function remove$1(element) {

                if (!within(element, this.$el)) {
                    return;
                }

                if (this.animation) {
                    this.animate(function () { return remove(element); });
                } else {
                    remove(element);
                }

            },

            animate: function animate(action) {
                var this$1 = this;


                var props = [];
                var children = toNodes(this.$el.children);
                var reset = {position: '', width: '', height: '', pointerEvents: '', top: '', left: '', bottom: '', right: ''};

                children.forEach(function (el) {
                    props.push(assign({
                        position: 'absolute',
                        pointerEvents: 'none',
                        width: el.offsetWidth,
                        height: el.offsetHeight
                    }, position(el)));
                });

                action();

                children.forEach(Transition.cancel);
                css(this.$el.children, reset);
                this.$update('update', true);
                fastdom.flush();

                css(this.$el, 'minHeight', height(this.$el));

                var positions = children.map(function (el) { return position(el); });
                Promise.all(children.map(function (el, i) { return Transition.start(css(el, props[i]), positions[i], this$1.animation); }))
                    .then(function () {
                        css(this$1.$el, 'minHeight', '');
                        css(children, reset);
                        this$1.$update('update', true);
                        fastdom.flush();
                    }, noop);

            }

        }

    });

    function getSortable(element) {
        return element && (UIkit.getComponent(element, 'sortable') || getSortable(element.parentNode));
    }

    function isPredecessor(element, target) {
        return element.parentNode === target.parentNode && index(element) > index(target);
    }

}

function plugin$12(UIkit) {
    var obj;


    if (plugin$12.installed) {
        return;
    }

    var util = UIkit.util;
    var mixin = UIkit.mixin;
    var append = util.append;
    var attr = util.attr;
    var doc = util.doc;
    var flipPosition = util.flipPosition;
    var hasAttr = util.hasAttr;
    var includes = util.includes;
    var isTouch = util.isTouch;
    var isVisible = util.isVisible;
    var matches = util.matches;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerEnter = util.pointerEnter;
    var pointerLeave = util.pointerLeave;
    var remove = util.remove;
    var within = util.within;

    var actives = [];

    UIkit.component('tooltip', {

        attrs: true,

        args: 'title',

        mixins: [mixin.container, mixin.togglable, mixin.position],

        props: {
            delay: Number,
            title: String
        },

        defaults: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        beforeConnect: function beforeConnect() {
            this._hasTitle = hasAttr(this.$el, 'title');
            attr(this.$el, {title: '', 'aria-expanded': false});
        },

        disconnected: function disconnected() {
            this.hide();
            attr(this.$el, {title: this._hasTitle ? this.title : null, 'aria-expanded': null});
        },

        methods: {

            show: function show() {
                var this$1 = this;


                if (includes(actives, this)) {
                    return;
                }

                actives.forEach(function (active) { return active.hide(); });
                actives.push(this);

                this._unbind = on(doc, 'click', function (e) { return !within(e.target, this$1.$el) && this$1.hide(); });

                clearTimeout(this.showTimer);

                this.tooltip = append(this.container, ("<div class=\"" + (this.clsPos) + "\" aria-hidden><div class=\"" + (this.clsPos) + "-inner\">" + (this.title) + "</div></div>"));

                attr(this.$el, 'aria-expanded', true);

                this.positionAt(this.tooltip, this.$el);

                this.origin = this.getAxis() === 'y' ? ((flipPosition(this.dir)) + "-" + (this.align)) : ((this.align) + "-" + (flipPosition(this.dir)));

                this.showTimer = setTimeout(function () {

                    this$1.toggleElement(this$1.tooltip, true);

                    this$1.hideTimer = setInterval(function () {

                        if (!isVisible(this$1.$el)) {
                            this$1.hide();
                        }

                    }, 150);

                }, this.delay);
            },

            hide: function hide() {

                var index = actives.indexOf(this);

                if (!~index || matches(this.$el, 'input') && this.$el === doc.activeElement) {
                    return;
                }

                actives.splice(index, 1);

                clearTimeout(this.showTimer);
                clearInterval(this.hideTimer);
                attr(this.$el, 'aria-expanded', false);
                this.toggleElement(this.tooltip, false);
                this.tooltip && remove(this.tooltip);
                this.tooltip = false;
                this._unbind();

            }

        },

        events: ( obj = {}, obj[("focus " + pointerEnter + " " + pointerDown)] = function (e) {
                if (e.type !== pointerDown || !isTouch(e)) {
                    this.show();
                }
            }, obj.blur = 'hide', obj[pointerLeave] = function (e) {
                if (!isTouch(e)) {
                    this.hide();
                }
            }, obj)

    });

}

function plugin$13(UIkit) {

    if (plugin$13.installed) {
        return;
    }

    var ref = UIkit.util;
    var addClass = ref.addClass;
    var ajax = ref.ajax;
    var matches = ref.matches;
    var noop = ref.noop;
    var on = ref.on;
    var removeClass = ref.removeClass;
    var trigger = ref.trigger;

    UIkit.component('upload', {

        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            maxSize: Number,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            msgInvalidSize: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String,
        },

        defaults: {
            allow: false,
            clsDragover: 'uk-dragover',
            concurrent: 1,
            maxSize: 0,
            mime: false,
            msgInvalidMime: 'Invalid File Type: %s',
            msgInvalidName: 'Invalid File Name: %s',
            msgInvalidSize: 'Invalid File Size: %s Bytes Max',
            multiple: false,
            name: 'files[]',
            params: {},
            type: 'POST',
            url: '',
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },

        events: {

            change: function change(e) {

                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }

                e.preventDefault();

                if (e.target.files) {
                    this.upload(e.target.files);
                }

                e.target.value = '';
            },

            drop: function drop(e) {
                stop(e);

                var transfer = e.dataTransfer;

                if (!transfer || !transfer.files) {
                    return;
                }

                removeClass(this.$el, this.clsDragover);

                this.upload(transfer.files);
            },

            dragenter: function dragenter(e) {
                stop(e);
            },

            dragover: function dragover(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },

            dragleave: function dragleave(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }

        },

        methods: {

            upload: function upload(files) {
                var this$1 = this;


                if (!files.length) {
                    return;
                }

                trigger(this.$el, 'upload', [files]);

                for (var i = 0; i < files.length; i++) {

                    if (this$1.maxSize && this$1.maxSize * 1000 < files[i].size) {
                        this$1.fail(this$1.msgInvalidSize.replace('%s', this$1.allow));
                        return;
                    }

                    if (this$1.allow && !match(this$1.allow, files[i].name)) {
                        this$1.fail(this$1.msgInvalidName.replace('%s', this$1.allow));
                        return;
                    }

                    if (this$1.mime && !match(this$1.mime, files[i].type)) {
                        this$1.fail(this$1.msgInvalidMime.replace('%s', this$1.mime));
                        return;
                    }

                }

                if (!this.multiple) {
                    files = [files[0]];
                }

                this.beforeAll(this, files);

                var chunks = chunk(files, this.concurrent);
                var upload = function (files) {

                    var data = new FormData();

                    files.forEach(function (file) { return data.append(this$1.name, file); });

                    for (var key in this$1.params) {
                        data.append(key, this$1.params[key]);
                    }

                    ajax(this$1.url, {
                        data: data,
                        method: this$1.type,
                        beforeSend: function (env) {

                            var xhr = env.xhr;
                            xhr.upload && on(xhr.upload, 'progress', this$1.progress);
                            ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) { return on(xhr, type.toLowerCase(), this$1[type]); }
                            );

                            this$1.beforeSend(env);

                        }
                    }).then(
                        function (xhr) {

                            this$1.complete(xhr);

                            if (chunks.length) {
                                upload(chunks.shift());
                            } else {
                                this$1.completeAll(xhr);
                            }

                        },
                        function (e) { return this$1.error(e.message); }
                    );

                };

                upload(chunks.shift());

            }

        }

    });

    function match(pattern, path) {
        return path.match(new RegExp(("^" + (pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.')) + "$"), 'i'));
    }

    function chunk(files, size) {
        var chunks = [];
        for (var i = 0; i < files.length; i += size) {
            var chunk = [];
            for (var j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
        }
        return chunks;
    }

    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }

}

UIkit$2.use(plugin);
UIkit$2.use(plugin$1);
UIkit$2.use(plugin$2);
UIkit$2.use(plugin$6);
UIkit$2.use(plugin$7);
UIkit$2.use(plugin$9);
UIkit$2.use(plugin$10);
UIkit$2.use(plugin$11);
UIkit$2.use(plugin$12);
UIkit$2.use(plugin$13);

{
    boot(UIkit$2);
}

return UIkit$2;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("162o").setImmediate))

/***/ }),

/***/ "DuR2":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "W2nU":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "YMCN":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["UIkit"] = __webpack_require__("2EC8");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "mypn":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2"), __webpack_require__("W2nU")))

/***/ }),

/***/ "vNiz":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGJjZGY2Y2YyMWRiYzE2MzNlNGMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Vpa2l0L2Rpc3QvanMvdWlraXQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91aWtpdC9kaXN0L2pzL3Vpa2l0LmpzLWV4cG9zZWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlc2hlZXRzL3N0eWxlLnNjc3M/YmI2NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQVksMkJBQTJCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQTJEO0FBQzNEO0FBQ0E7QUFDQSxXQUFHOztBQUVILG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7OztBQUlBO0FBQ0Esc0RBQThDO0FBQzlDO0FBQ0E7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakMsK0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztB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VDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELGdCQUFnQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0hBQXdIO0FBQ3hIO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxtQ0FBbUM7O0FBRTFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTOztBQUVULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLG9CQUFvQixHQUFHLHdCQUF3QjtBQUM3RCxjQUFjLHFCQUFxQixHQUFHLHVCQUF1QjtBQUM3RDs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFD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O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQSxtQ0FBbUMsd0JBQXdCLEVBQUU7QUFDN0QsOEJBQThCLGtCQUFrQjtBQUNoRCxvQ0FBb0MseUJBQXlCLEVBQUU7O0FBRS9EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsbURBQW1ELGNBQWM7QUFDakU7O0FBRUE7QUFDQSxtREFBbUQsNkJBQTZCO0FBQ2hGOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwREFBMEQsOEJBQThCO0FBQ3hGOztBQUVBOztBQUVBO0FBQ0Esc0NBQXNDLDhEQUE4RCxFQUFFO0FBQ3RHOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLCtGQUErRjtBQUM3SSxtREFBbUQsMkNBQTJDOztBQUU5Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qiw0QkFBNEI7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLG1CQUFtQiwrQkFBK0I7O0FBRTNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDRDQUE0Qyx5Q0FBeUMsRUFBRTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7O0FBRUEseUJBQXlCLDJCQUEyQjtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYixTQUFTOztBQUVULCtDQUErQyxpQ0FBaUMsRUFBRTs7QUFFbEY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSxpREFBaUQsNkJBQTZCLEVBQUU7QUFDaEY7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtCQUErQiw0QkFBNEIsRUFBRTtBQUM3RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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RkFBdUY7QUFDcEg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7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QUNyQjtBQUNBO0FBQ0EsaUJBQWlCLEVBQUU7QUFDbkI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxpQkFBaUIsRUFBRTtBQUNuRTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0EsMEJBQTBCLGtCQUFrQjs7QUFFNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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YTs7QUFFYjs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCLDREQUE0RDs7QUFFdEY7QUFDQSxnQ0FBZ0MsOFRBQThUO0FBQzlWO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCLDJEQUEyRDs7QUFFckY7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWIsU0FBUztBQUNUOztBQUVBOztBQUVBLDBCQUEwQiwyREFBMkQ7O0FBRXJGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWIsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFF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Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxhQUFhOztBQUViO0FBQ0EscURBQXFELHVDQUF1QztBQUM1RixhQUFhOztBQUViOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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U0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCwyQkFBMkIsRUFBRTtBQUN0Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0Esd0VBQXdFLGdGQUFnRixFQUFFO0FBQzFKOztBQUVBOztBQUVBOztBQUVBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDLDZHOzs7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDekxELHlDIiwiZmlsZSI6ImpzL3Vpa2l0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdLCByZXN1bHQ7XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzKTtcbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG4gXHRcdGlmKGV4ZWN1dGVNb2R1bGVzKSB7XG4gXHRcdFx0Zm9yKGk9MDsgaSA8IGV4ZWN1dGVNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGV4ZWN1dGVNb2R1bGVzW2ldKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH07XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBcclxuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0fSA7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gXHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcclxuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xyXG4gXHRcdDtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcclxuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XHJcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjBiY2RmNmNmMjFkYmMxNjMzZTRjXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH07XHJcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xyXG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdHRocm93IGVycjtcclxuIFx0XHRcdH0pO1xyXG4gXHRcclxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xyXG4gXHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxyXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3REZWZlcnJlZDtcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xyXG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXHJcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xyXG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcclxuIFx0XHRpZighZGVmZXJyZWQpIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xyXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXHJcbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XHJcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XHJcbiBcdFx0XHR9KS50aGVuKFxyXG4gXHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHQpO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgY2I7XHJcbiBcdFx0dmFyIGk7XHJcbiBcdFx0dmFyIGo7XHJcbiBcdFx0dmFyIG1vZHVsZTtcclxuIFx0XHR2YXIgbW9kdWxlSWQ7XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XHJcbiBcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbiBcdFx0XHRcdFx0aWQ6IGlkXHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZighcGFyZW50KSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxyXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcclxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4gXHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiKTtcclxuIFx0XHR9O1xyXG4gXHRcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQ7XHJcbiBcdFx0XHRcdGlmKGhvdFVwZGF0ZVtpZF0pIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XHJcbiBcdFx0XHRcdGlmKHJlc3VsdC5jaGFpbikge1xyXG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRzd2l0Y2gocmVzdWx0LnR5cGUpIHtcclxuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIiBpbiBcIiArIHJlc3VsdC5wYXJlbnRJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vblVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25BY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRkZWZhdWx0OlxyXG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihhYm9ydEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvQXBwbHkpIHtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHRcdFx0XHRmb3IobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9EaXNwb3NlKSB7XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcclxuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHRcclxuIFx0XHR2YXIgaWR4O1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdFx0aWYoY2IpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XHJcbiBcdFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcihpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyMikge1xyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yZ2luYWxFcnJvcjogZXJyLCAvLyBUT0RPIHJlbW92ZSBpbiB3ZWJwYWNrIDRcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjI7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0cyB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQzOiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBiY2RmNmNmMjFkYmMxNjMzZTRjIiwidmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVpZGF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTYyb1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvKiEgVUlraXQgMy4wLjAtYmV0YS40MCB8IGh0dHA6Ly93d3cuZ2V0dWlraXQuY29tIHwgKGMpIDIwMTQgLSAyMDE3IFlPT3RoZW1lIHwgTUlUIExpY2Vuc2UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ3Vpa2l0JywgZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlVJa2l0ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBiaW5kKGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGwgPyBsID4gMSA/IGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cykgOiBmbi5jYWxsKGNvbnRleHQsIGEpIDogZm4uY2FsbChjb250ZXh0KTtcbiAgICB9O1xufVxuXG52YXIgcmVmID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHJlZi5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG52YXIgaHlwaGVuYXRlUmUgPSAvKFthLXpcXGRdKShbQS1aXSkvZztcblxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnJlcGxhY2UoaHlwaGVuYXRlUmUsICckMS0kMicpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG52YXIgY2FtZWxpemVSRSA9IC8tKFxcdykvZztcblxuZnVuY3Rpb24gY2FtZWxpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIHRvVXBwZXIpO1xufVxuXG5mdW5jdGlvbiB0b1VwcGVyKF8sIGMpIHtcbiAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnO1xufVxuXG5mdW5jdGlvbiB1Y2ZpcnN0KHN0cikge1xuICAgIHJldHVybiBzdHIubGVuZ3RoID8gdG9VcHBlcihudWxsLCBzdHIuY2hhckF0KDApKSArIHN0ci5zbGljZSgxKSA6ICcnO1xufVxuXG52YXIgc3RyUHJvdG90eXBlID0gU3RyaW5nLnByb3RvdHlwZTtcbnZhciBzdGFydHNXaXRoRm4gPSBzdHJQcm90b3R5cGUuc3RhcnRzV2l0aCB8fCBmdW5jdGlvbiAoc2VhcmNoKSB7IHJldHVybiB0aGlzLmxhc3RJbmRleE9mKHNlYXJjaCwgMCkgPT09IDA7IH07XG5cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCBzZWFyY2gpIHtcbiAgICByZXR1cm4gc3RhcnRzV2l0aEZuLmNhbGwoc3RyLCBzZWFyY2gpO1xufVxuXG52YXIgZW5kc1dpdGhGbiA9IHN0clByb3RvdHlwZS5lbmRzV2l0aCB8fCBmdW5jdGlvbiAoc2VhcmNoKSB7IHJldHVybiB0aGlzLnN1YnN0cigtc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDsgfTtcblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gpIHtcbiAgICByZXR1cm4gZW5kc1dpdGhGbi5jYWxsKHN0ciwgc2VhcmNoKTtcbn1cblxudmFyIGluY2x1ZGVzRm4gPSBmdW5jdGlvbiAoc2VhcmNoKSB7IHJldHVybiB+dGhpcy5pbmRleE9mKHNlYXJjaCk7IH07XG52YXIgaW5jbHVkZXNTdHIgPSBzdHJQcm90b3R5cGUuaW5jbHVkZXMgfHwgaW5jbHVkZXNGbjtcbnZhciBpbmNsdWRlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzIHx8IGluY2x1ZGVzRm47XG5cbmZ1bmN0aW9uIGluY2x1ZGVzKG9iaiwgc2VhcmNoKSB7XG4gICAgcmV0dXJuIG9iaiAmJiAoaXNTdHJpbmcob2JqKSA/IGluY2x1ZGVzU3RyIDogaW5jbHVkZXNBcnJheSkuY2FsbChvYmosIHNlYXJjaCk7XG59XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgb2JqID09PSBvYmoud2luZG93O1xufVxuXG5mdW5jdGlvbiBpc0RvY3VtZW50KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmIG9iai5ub2RlVHlwZSA9PT0gOTtcbn1cblxuZnVuY3Rpb24gaXNKUXVlcnkob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgISFvYmouanF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBpc05vZGUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgTm9kZSB8fCBpc09iamVjdChlbGVtZW50KSAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc05vZGVDb2xsZWN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWModmFsdWUpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpIHx8IGlzU3RyaW5nKHZhbHVlKSAmJiAhaXNOYU4odmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHwgdmFsdWUgPT09ICcnXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJ1xuICAgICAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgICAgICA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgIHJldHVybiAhaXNOYU4obnVtYmVyKSA/IG51bWJlciA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHRvTm9kZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzTm9kZShlbGVtZW50KSB8fCBpc1dpbmRvdyhlbGVtZW50KSB8fCBpc0RvY3VtZW50KGVsZW1lbnQpXG4gICAgICAgID8gZWxlbWVudFxuICAgICAgICA6IGlzTm9kZUNvbGxlY3Rpb24oZWxlbWVudCkgfHwgaXNKUXVlcnkoZWxlbWVudClcbiAgICAgICAgICAgID8gZWxlbWVudFswXVxuICAgICAgICAgICAgOiBpc0FycmF5KGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgPyB0b05vZGUoZWxlbWVudFswXSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG59XG5cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuZnVuY3Rpb24gdG9Ob2RlcyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzTm9kZShlbGVtZW50KVxuICAgICAgICA/IFtlbGVtZW50XVxuICAgICAgICA6IGlzTm9kZUNvbGxlY3Rpb24oZWxlbWVudClcbiAgICAgICAgICAgID8gYXJyYXlQcm90by5zbGljZS5jYWxsKGVsZW1lbnQpXG4gICAgICAgICAgICA6IGlzQXJyYXkoZWxlbWVudClcbiAgICAgICAgICAgICAgICA/IGVsZW1lbnQubWFwKHRvTm9kZSkuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgOiBpc0pRdWVyeShlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICA/IGVsZW1lbnQudG9BcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIDogW107XG59XG5cbmZ1bmN0aW9uIHRvTGlzdCh2YWx1ZSkge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcodmFsdWUpXG4gICAgICAgICAgICA/IHZhbHVlLnNwbGl0KC8sKD8hW14oXSpcXCkpLykubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXNOdW1lcmljKHZhbHVlKVxuICAgICAgICAgICAgICAgID8gdG9OdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgOiB0b0Jvb2xlYW4odmFsdWUudHJpbSgpKTsgfSlcbiAgICAgICAgICAgIDogW3ZhbHVlXTtcbn1cblxuZnVuY3Rpb24gdG9Ncyh0aW1lKSB7XG4gICAgcmV0dXJuICF0aW1lXG4gICAgICAgID8gMFxuICAgICAgICA6IGVuZHNXaXRoKHRpbWUsICdtcycpXG4gICAgICAgICAgICA/IHRvRmxvYXQodGltZSlcbiAgICAgICAgICAgIDogdG9GbG9hdCh0aW1lKSAqIDEwMDA7XG59XG5cbmZ1bmN0aW9uIHN3YXAodmFsdWUsIGEsIGIpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKChhICsgXCJ8XCIgKyBiKSwgJ21nJyksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2ggPT09IGEgPyBiIDogYTtcbiAgICB9KTtcbn1cblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJnc1tpXTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNPd24oc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuXG5mdW5jdGlvbiBlYWNoKG9iaiwgY2IpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChjYi5jYWxsKG9ialtrZXldLCBvYmpba2V5XSwga2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzb3J0QnkoY29sbGVjdGlvbiwgcHJvcCkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbcHJvcF0gPiBiW3Byb3BdXG4gICAgICAgICAgICA/IDFcbiAgICAgICAgICAgIDogYltwcm9wXSA+IGFbcHJvcF1cbiAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgOiAwOyB9XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobnVtYmVyLCBtaW4sIG1heCkge1xuICAgIGlmICggbWluID09PSB2b2lkIDAgKSBtaW4gPSAwO1xuICAgIGlmICggbWF4ID09PSB2b2lkIDAgKSBtYXggPSAxO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bWJlciwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGludGVyc2VjdFJlY3QocjEsIHIyKSB7XG4gICAgcmV0dXJuIHIxLmxlZnQgPD0gcjIucmlnaHQgJiZcbiAgICAgICAgcjIubGVmdCA8PSByMS5yaWdodCAmJlxuICAgICAgICByMS50b3AgPD0gcjIuYm90dG9tICYmXG4gICAgICAgIHIyLnRvcCA8PSByMS5ib3R0b207XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5SZWN0KHBvaW50LCByZWN0KSB7XG4gICAgcmV0dXJuIGludGVyc2VjdFJlY3Qoe3RvcDogcG9pbnQueSwgYm90dG9tOiBwb2ludC55LCBsZWZ0OiBwb2ludC54LCByaWdodDogcG9pbnQueH0sIHJlY3QpO1xufVxuXG52YXIgRGltZW5zaW9ucyA9IHtcblxuICAgIHJhdGlvOiBmdW5jdGlvbiByYXRpbyhkaW1lbnNpb25zLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICB2YXIgb2JqO1xuXG5cbiAgICAgICAgdmFyIGFQcm9wID0gcHJvcCA9PT0gJ3dpZHRoJyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgICAgICByZXR1cm4gKCBvYmogPSB7fSwgb2JqW2FQcm9wXSA9IE1hdGgucm91bmQodmFsdWUgKiBkaW1lbnNpb25zW2FQcm9wXSAvIGRpbWVuc2lvbnNbcHJvcF0pLCBvYmpbcHJvcF0gPSB2YWx1ZSwgb2JqKTtcbiAgICB9LFxuXG4gICAgY29udGFpbjogZnVuY3Rpb24gY29udGFpbihkaW1lbnNpb25zLCBtYXhEaW1lbnNpb25zKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBhc3NpZ24oe30sIGRpbWVuc2lvbnMpO1xuXG4gICAgICAgIGVhY2goZGltZW5zaW9ucywgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGRpbWVuc2lvbnMgPSBkaW1lbnNpb25zW3Byb3BdID4gbWF4RGltZW5zaW9uc1twcm9wXVxuICAgICAgICAgICAgPyB0aGlzJDEucmF0aW8oZGltZW5zaW9ucywgcHJvcCwgbWF4RGltZW5zaW9uc1twcm9wXSlcbiAgICAgICAgICAgIDogZGltZW5zaW9uczsgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH0sXG5cbiAgICBjb3ZlcjogZnVuY3Rpb24gY292ZXIoZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucykge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5jb250YWluKGRpbWVuc2lvbnMsIG1heERpbWVuc2lvbnMpO1xuXG4gICAgICAgIGVhY2goZGltZW5zaW9ucywgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGRpbWVuc2lvbnMgPSBkaW1lbnNpb25zW3Byb3BdIDwgbWF4RGltZW5zaW9uc1twcm9wXVxuICAgICAgICAgICAgPyB0aGlzJDEucmF0aW8oZGltZW5zaW9ucywgcHJvcCwgbWF4RGltZW5zaW9uc1twcm9wXSlcbiAgICAgICAgICAgIDogZGltZW5zaW9uczsgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gYXR0cihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuXG4gICAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgICAgICBhdHRyKGVsZW1lbnQsIGtleSwgbmFtZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b05vZGVzKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKGVsZW1lbnQsIGF0dHIoZWxlbWVudCwgbmFtZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBoYXNBdHRyKGVsZW1lbnQsIG5hbWUpIHtcbiAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShuYW1lKTsgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHIoZWxlbWVudCwgbmFtZSkge1xuICAgIGVsZW1lbnQgPSB0b05vZGVzKGVsZW1lbnQpO1xuICAgIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBlbGVtZW50LmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyB9XG4gICAgICAgICk7IH1cbiAgICApO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJBdHRyKGVsZW1lbnQsIGF0dHJpYnV0ZSwgcGF0dGVybiwgcmVwbGFjZW1lbnQpIHtcbiAgICBhdHRyKGVsZW1lbnQsIGF0dHJpYnV0ZSwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UocGF0dGVybiwgcmVwbGFjZW1lbnQpIDogdmFsdWU7IH0pO1xufVxuXG5mdW5jdGlvbiBkYXRhKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhdHRycyA9IFthdHRyaWJ1dGUsIChcImRhdGEtXCIgKyBhdHRyaWJ1dGUpXTsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNBdHRyKGVsZW1lbnQsIGF0dHJzW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGF0dHIoZWxlbWVudCwgYXR0cnNbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKiBnbG9iYWwgc2V0SW1tZWRpYXRlICovXG52YXIgUHJvbWlzZSA9ICdQcm9taXNlJyBpbiB3aW5kb3cgPyB3aW5kb3cuUHJvbWlzZSA6IFByb21pc2VGbjtcblxudmFyIERlZmVycmVkID0gZnVuY3Rpb24gRGVmZXJyZWQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXMkMS5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIHRoaXMkMS5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvbWlzZXMvQSsgcG9seWZpbGwgdjEuMS40IChodHRwczovL2dpdGh1Yi5jb20vYnJhbXN0ZWluL3Byb21pcylcbiAqL1xuXG52YXIgUkVTT0xWRUQgPSAwO1xudmFyIFJFSkVDVEVEID0gMTtcbnZhciBQRU5ESU5HID0gMjtcblxudmFyIGFzeW5jID0gJ3NldEltbWVkaWF0ZScgaW4gd2luZG93ID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dDtcblxuZnVuY3Rpb24gUHJvbWlzZUZuKGV4ZWN1dG9yKSB7XG5cbiAgICB0aGlzLnN0YXRlID0gUEVORElORztcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVmZXJyZWQgPSBbXTtcblxuICAgIHZhciBwcm9taXNlID0gdGhpcztcblxuICAgIHRyeSB7XG4gICAgICAgIGV4ZWN1dG9yKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdChyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcm9taXNlLnJlamVjdChlKTtcbiAgICB9XG59XG5cblByb21pc2VGbi5yZWplY3QgPSBmdW5jdGlvbiAocikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZUZuKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHIpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZUZuLnJlc29sdmUgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZUZuKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzb2x2ZSh4KTtcbiAgICB9KTtcbn07XG5cblByb21pc2VGbi5hbGwgPSBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VGbihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgICBpZiAoaXRlcmFibGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlcihpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSB4O1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIFByb21pc2VGbi5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlRm4ucmFjZSA9IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VGbihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIFByb21pc2VGbi5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciBwID0gUHJvbWlzZUZuLnByb3RvdHlwZTtcblxucC5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgICAgaWYgKHggPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB4ICYmIHgudGhlbjtcblxuICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgaXNPYmplY3QoeCkgJiYgaXNGdW5jdGlvbih0aGVuKSkge1xuICAgICAgICAgICAgICAgIHRoZW4uY2FsbCh4LCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3Qocik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVTT0xWRUQ7XG4gICAgICAgIHByb21pc2UudmFsdWUgPSB4O1xuICAgICAgICBwcm9taXNlLm5vdGlmeSgpO1xuICAgIH1cbn07XG5cbnAucmVqZWN0ID0gZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcblxuICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgICAgIGlmIChyZWFzb24gPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2Uuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgICAgICAgcHJvbWlzZS52YWx1ZSA9IHJlYXNvbjtcbiAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcbiAgICB9XG59O1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGFzeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMkMS5zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMkMS5kZWZlcnJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcyQxLmRlZmVycmVkLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9uUmVzb2x2ZWQgPSByZWZbMF07XG4gICAgICAgICAgICAgICAgdmFyIG9uUmVqZWN0ZWQgPSByZWZbMV07XG4gICAgICAgICAgICAgICAgdmFyIHJlc29sdmUgPSByZWZbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHJlZlszXTtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuc3RhdGUgPT09IFJFU09MVkVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihvblJlc29sdmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob25SZXNvbHZlZC5jYWxsKHVuZGVmaW5lZCwgdGhpcyQxLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcyQxLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzJDEuc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihvblJlamVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob25SZWplY3RlZC5jYWxsKHVuZGVmaW5lZCwgdGhpcyQxLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aGlzJDEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5wLnRoZW4gPSBmdW5jdGlvbiB0aGVuKG9uUmVzb2x2ZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZUZuKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcyQxLmRlZmVycmVkLnB1c2goW29uUmVzb2x2ZWQsIG9uUmVqZWN0ZWQsIHJlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICB0aGlzJDEubm90aWZ5KCk7XG4gICAgfSk7XG59O1xuXG5wLmNhdGNoID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG59O1xuXG4vKiBnbG9iYWwgRG9jdW1lbnRUb3VjaCAqL1xudmFyIHdpbiA9IHdpbmRvdztcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbnZhciBpc1J0bCA9IGF0dHIoZG9jRWwsICdkaXInKSA9PT0gJ3J0bCc7XG5cbnZhciBPYnNlcnZlciA9IHdpbi5NdXRhdGlvbk9ic2VydmVyO1xuXG52YXIgaGFzVG91Y2hFdmVudHMgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW47XG52YXIgaGFzUG9pbnRlckV2ZW50cyA9IHdpbi5Qb2ludGVyRXZlbnQ7XG52YXIgaGFzVG91Y2ggPSBoYXNUb3VjaEV2ZW50c1xuICAgIHx8IHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2hcbiAgICB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7IC8vIElFID49MTFcblxudmFyIHBvaW50ZXJEb3duID0gIWhhc1RvdWNoID8gJ21vdXNlZG93bicgOiAoXCJtb3VzZWRvd24gXCIgKyAoaGFzVG91Y2hFdmVudHMgPyAndG91Y2hzdGFydCcgOiAncG9pbnRlcmRvd24nKSk7XG52YXIgcG9pbnRlck1vdmUgPSAhaGFzVG91Y2ggPyAnbW91c2Vtb3ZlJyA6IChcIm1vdXNlbW92ZSBcIiArIChoYXNUb3VjaEV2ZW50cyA/ICd0b3VjaG1vdmUnIDogJ3BvaW50ZXJtb3ZlJykpO1xudmFyIHBvaW50ZXJVcCA9ICFoYXNUb3VjaCA/ICdtb3VzZXVwJyA6IChcIm1vdXNldXAgXCIgKyAoaGFzVG91Y2hFdmVudHMgPyAndG91Y2hlbmQnIDogJ3BvaW50ZXJ1cCcpKTtcbnZhciBwb2ludGVyRW50ZXIgPSBoYXNUb3VjaCAmJiBoYXNQb2ludGVyRXZlbnRzID8gJ3BvaW50ZXJlbnRlcicgOiAnbW91c2VlbnRlcic7XG52YXIgcG9pbnRlckxlYXZlID0gaGFzVG91Y2ggJiYgaGFzUG9pbnRlckV2ZW50cyA/ICdwb2ludGVybGVhdmUnIDogJ21vdXNlbGVhdmUnO1xuXG5mdW5jdGlvbiBnZXRJbWFnZShzcmMpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUoaW1nKTsgfTtcblxuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgIH0pO1xuXG59XG5cbnZhciBzdXBwb3J0cyA9IHt9O1xuXG4vLyBJRSAxMVxuKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBsaXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ18nKS5jbGFzc0xpc3Q7XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgbGlzdC5hZGQoJ2EnLCAnYicpO1xuICAgICAgICBsaXN0LnRvZ2dsZSgnYycsIGZhbHNlKTtcbiAgICAgICAgc3VwcG9ydHMuTXVsdGlwbGUgPSBsaXN0LmNvbnRhaW5zKCdiJyk7XG4gICAgICAgIHN1cHBvcnRzLkZvcmNlID0gIWxpc3QuY29udGFpbnMoJ2MnKTtcbiAgICAgICAgc3VwcG9ydHMuQ2xhc3NMaXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGlzdCA9IG51bGw7XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRvTm9kZShzZWxlY3RvcikgfHwgZmluZChzZWxlY3RvciwgaXNDb250ZXh0U2VsZWN0b3Ioc2VsZWN0b3IpID8gY29udGV4dCA6IGRvYyk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIG5vZGVzID0gdG9Ob2RlcyhzZWxlY3Rvcik7XG4gICAgcmV0dXJuIG5vZGVzLmxlbmd0aCAmJiBub2RlcyB8fCBmaW5kQWxsKHNlbGVjdG9yLCBpc0NvbnRleHRTZWxlY3RvcihzZWxlY3RvcikgPyBjb250ZXh0IDogZG9jKTtcbn1cblxuZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiB0b05vZGUoX3F1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0LCAncXVlcnlTZWxlY3RvcicpKTtcbn1cblxuZnVuY3Rpb24gZmluZEFsbChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiB0b05vZGVzKF9xdWVyeShzZWxlY3RvciwgY29udGV4dCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnKSk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeShzZWxlY3RvciwgY29udGV4dCwgcXVlcnlGbikge1xuICAgIGlmICggY29udGV4dCA9PT0gdm9pZCAwICkgY29udGV4dCA9IGRvYztcblxuXG4gICAgaWYgKCFzZWxlY3RvciB8fCAhaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShjb250ZXh0U2FuaXRpemVSZSwgJyQxIConKTtcblxuICAgIHZhciByZW1vdmVzO1xuXG4gICAgaWYgKGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSkge1xuXG4gICAgICAgIHJlbW92ZXMgPSBbXTtcblxuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChzZWxlY3RvciwgaSkge1xuXG4gICAgICAgICAgICB2YXIgY3R4ID0gY29udGV4dDtcblxuICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RvclswXSA9PT0gJyEnKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3JzID0gc2VsZWN0b3Iuc3Vic3RyKDEpLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGN0eCA9IGNsb3Nlc3QoY29udGV4dC5wYXJlbnROb2RlLCBzZWxlY3RvcnNbMF0pO1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3JzLnNsaWNlKDEpLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWN0eC5pZCkge1xuICAgICAgICAgICAgICAgIGN0eC5pZCA9IFwidWstXCIgKyAoRGF0ZS5ub3coKSkgKyBpO1xuICAgICAgICAgICAgICAgIHJlbW92ZXMucHVzaChmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmVBdHRyKGN0eCwgJ2lkJyk7IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFwiI1wiICsgKGVzY2FwZShjdHguaWQpKSArIFwiIFwiICsgc2VsZWN0b3IpO1xuXG4gICAgICAgIH0pLmZpbHRlcihCb29sZWFuKS5qb2luKCcsJyk7XG5cbiAgICAgICAgY29udGV4dCA9IGRvYztcblxuICAgIH1cblxuICAgIHRyeSB7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHRbcXVlcnlGbl0oc2VsZWN0b3IpO1xuXG4gICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICByZW1vdmVzICYmIHJlbW92ZXMuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlKSB7IHJldHVybiByZW1vdmUoKTsgfSk7XG5cbiAgICB9XG5cbn1cblxudmFyIGNvbnRleHRTZWxlY3RvclJlID0gLyhefCwpXFxzKlshPit+XS87XG52YXIgY29udGV4dFNhbml0aXplUmUgPSAvKFshPit+XSkoPz1cXHMrWyE+K35dfFxccyokKS9nO1xuXG5mdW5jdGlvbiBpc0NvbnRleHRTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgIHJldHVybiBpc1N0cmluZyhzZWxlY3RvcikgJiYgc2VsZWN0b3IubWF0Y2goY29udGV4dFNlbGVjdG9yUmUpO1xufVxuXG52YXIgZWxQcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xudmFyIG1hdGNoZXNGbiA9IGVsUHJvdG8ubWF0Y2hlcyB8fCBlbFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbWF0Y2hlc0ZuLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpOyB9KTtcbn1cblxudmFyIGNsb3Nlc3RGbiA9IGVsUHJvdG8uY2xvc2VzdCB8fCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgYW5jZXN0b3IgPSB0aGlzO1xuXG4gICAgZG8ge1xuXG4gICAgICAgIGlmIChtYXRjaGVzKGFuY2VzdG9yLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBhbmNlc3RvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50Tm9kZTtcblxuICAgIH0gd2hpbGUgKGFuY2VzdG9yICYmIGFuY2VzdG9yLm5vZGVUeXBlID09PSAxKTtcbn07XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpIHtcblxuICAgIGlmIChzdGFydHNXaXRoKHNlbGVjdG9yLCAnPicpKSB7XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzTm9kZShlbGVtZW50KVxuICAgICAgICA/IGVsZW1lbnQucGFyZW50Tm9kZSAmJiBjbG9zZXN0Rm4uY2FsbChlbGVtZW50LCBzZWxlY3RvcilcbiAgICAgICAgOiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlICYmIGNsb3Nlc3RGbi5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTsgfSkuZmlsdGVyKEJvb2xlYW4pO1xufVxuXG5mdW5jdGlvbiBwYXJlbnRzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgdmFyIGVsZW1lbnRzID0gW107XG4gICAgdmFyIHBhcmVudCA9IHRvTm9kZShlbGVtZW50KS5wYXJlbnROb2RlO1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDEpIHtcblxuICAgICAgICBpZiAobWF0Y2hlcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG52YXIgZXNjYXBlRm4gPSB3aW4uQ1NTICYmIENTUy5lc2NhcGUgfHwgZnVuY3Rpb24gKGNzcykgeyByZXR1cm4gY3NzLnJlcGxhY2UoLyhbXlxceDdmLVxcdUZGRkZcXHctXSkvZywgZnVuY3Rpb24gKG1hdGNoKSB7IHJldHVybiAoXCJcXFxcXCIgKyBtYXRjaCk7IH0pOyB9O1xuZnVuY3Rpb24gZXNjYXBlKGNzcykge1xuICAgIHJldHVybiBpc1N0cmluZyhjc3MpID8gZXNjYXBlRm4uY2FsbChudWxsLCBjc3MpIDogJyc7XG59XG5cbnZhciB2b2lkRWxlbWVudHMgPSB7XG4gICAgYXJlYTogdHJ1ZSxcbiAgICBiYXNlOiB0cnVlLFxuICAgIGJyOiB0cnVlLFxuICAgIGNvbDogdHJ1ZSxcbiAgICBlbWJlZDogdHJ1ZSxcbiAgICBocjogdHJ1ZSxcbiAgICBpbWc6IHRydWUsXG4gICAgaW5wdXQ6IHRydWUsXG4gICAga2V5Z2VuOiB0cnVlLFxuICAgIGxpbms6IHRydWUsXG4gICAgbWVudWl0ZW06IHRydWUsXG4gICAgbWV0YTogdHJ1ZSxcbiAgICBwYXJhbTogdHJ1ZSxcbiAgICBzb3VyY2U6IHRydWUsXG4gICAgdHJhY2s6IHRydWUsXG4gICAgd2JyOiB0cnVlXG59O1xuZnVuY3Rpb24gaXNWb2lkRWxlbWVudChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gdm9pZEVsZW1lbnRzW2VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXTsgfSk7XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7IH0pO1xufVxuXG52YXIgc2VsSW5wdXQgPSAnaW5wdXQsc2VsZWN0LHRleHRhcmVhLGJ1dHRvbic7XG5mdW5jdGlvbiBpc0lucHV0KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsIHNlbElucHV0KTsgfSk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbWF0Y2hlcyhlbGVtZW50LCBzZWxlY3Rvcik7IH0pO1xufVxuXG5mdW5jdGlvbiB3aXRoaW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IGVsZW1lbnQgPT09IHNlbGVjdG9yIHx8IHRvTm9kZShzZWxlY3RvcikuY29udGFpbnModG9Ob2RlKGVsZW1lbnQpKVxuICAgICAgICA6IG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHx8IGNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBvbigpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cblxuICAgIHZhciByZWYgPSBnZXRBcmdzKGFyZ3MpO1xuICAgIHZhciB0YXJnZXQgPSByZWZbMF07XG4gICAgdmFyIHR5cGUgPSByZWZbMV07XG4gICAgdmFyIHNlbGVjdG9yID0gcmVmWzJdO1xuICAgIHZhciBsaXN0ZW5lciA9IHJlZlszXTtcbiAgICB2YXIgdXNlQ2FwdHVyZSA9IHJlZls0XTtcblxuICAgIHRhcmdldCA9IHRvRXZlbnRUYXJnZXQodGFyZ2V0KTtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBsaXN0ZW5lciA9IGRlbGVnYXRlKHRhcmdldCwgc2VsZWN0b3IsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAobGlzdGVuZXIubGVuZ3RoID4gMSkge1xuICAgICAgICBsaXN0ZW5lciA9IGRldGFpbChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdHlwZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHRhcmdldCAmJiB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7IH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBvZmYodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7IH07XG59XG5cbmZ1bmN0aW9uIG9mZih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgaWYgKCB1c2VDYXB0dXJlID09PSB2b2lkIDAgKSB1c2VDYXB0dXJlID0gZmFsc2U7XG5cbiAgICB0YXJnZXQgPSB0b0V2ZW50VGFyZ2V0KHRhcmdldCk7XG4gICAgdGFyZ2V0ICYmIHR5cGUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7IH0pO1xufVxuXG5mdW5jdGlvbiBvbmNlKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuXG4gICAgdmFyIHJlZiA9IGdldEFyZ3MoYXJncyk7XG4gICAgdmFyIGVsZW1lbnQgPSByZWZbMF07XG4gICAgdmFyIHR5cGUgPSByZWZbMV07XG4gICAgdmFyIHNlbGVjdG9yID0gcmVmWzJdO1xuICAgIHZhciBsaXN0ZW5lciA9IHJlZlszXTtcbiAgICB2YXIgdXNlQ2FwdHVyZSA9IHJlZls0XTtcbiAgICB2YXIgY29uZGl0aW9uID0gcmVmWzVdO1xuICAgIHZhciBvZmYgPSBvbihlbGVtZW50LCB0eXBlLCBzZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICFjb25kaXRpb24gfHwgY29uZGl0aW9uKGUpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBvZmYoKTtcbiAgICAgICAgICAgIGxpc3RlbmVyKGUsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9LCB1c2VDYXB0dXJlKTtcblxuICAgIHJldHVybiBvZmY7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXIodGFyZ2V0LCBldmVudCwgZGV0YWlsKSB7XG4gICAgcmV0dXJuIHRvRXZlbnRUYXJnZXRzKHRhcmdldCkucmVkdWNlKGZ1bmN0aW9uIChub3RDYW5jZWxlZCwgdGFyZ2V0KSB7IHJldHVybiBub3RDYW5jZWxlZCAmJiB0YXJnZXQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSwgZGV0YWlsKSk7IH1cbiAgICAgICAgLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnQoZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKSB7XG4gICAgaWYgKCBidWJibGVzID09PSB2b2lkIDAgKSBidWJibGVzID0gdHJ1ZTtcbiAgICBpZiAoIGNhbmNlbGFibGUgPT09IHZvaWQgMCApIGNhbmNlbGFibGUgPSBmYWxzZTtcblxuICAgIGlmIChpc1N0cmluZyhlKSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTsgLy8gSUUgMTFcbiAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCk7XG4gICAgICAgIGUgPSBldmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJncyhhcmdzKSB7XG5cbiAgICBpZiAoaXNTdHJpbmcoYXJnc1swXSkpIHtcbiAgICAgICAgYXJnc1swXSA9IGZpbmQoYXJnc1swXSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oYXJnc1syXSkpIHtcbiAgICAgICAgYXJncy5zcGxpY2UoMiwgMCwgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbn1cblxuZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIGxpc3RlbmVyKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIHZhciBjdXJyZW50ID0gc2VsZWN0b3JbMF0gPT09ICc+J1xuICAgICAgICAgICAgPyBmaW5kQWxsKHNlbGVjdG9yLCBlbGVtZW50KS5yZXZlcnNlKCkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiB3aXRoaW4odGFyZ2V0LCBlbGVtZW50KTsgfSlbMF1cbiAgICAgICAgICAgIDogY2xvc2VzdCh0YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgZS5kZWxlZ2F0ZSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBlLmN1cnJlbnQgPSBjdXJyZW50O1xuXG4gICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMkMSwgZSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkZXRhaWwobGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGlzQXJyYXkoZS5kZXRhaWwpID8gbGlzdGVuZXIuYXBwbHkobGlzdGVuZXIsIFtlXS5jb25jYXQoZS5kZXRhaWwpKSA6IGxpc3RlbmVyKGUpOyB9O1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiAnRXZlbnRUYXJnZXQnIGluIHdpbmRvd1xuICAgICAgICA/IHRhcmdldCBpbnN0YW5jZW9mIEV2ZW50VGFyZ2V0XG4gICAgICAgIDogdGFyZ2V0ICYmICdhZGRFdmVudExpc3RlbmVyJyBpbiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHRvRXZlbnRUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSA/IHRhcmdldCA6IHRvTm9kZSh0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiB0b0V2ZW50VGFyZ2V0cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNFdmVudFRhcmdldCh0YXJnZXQpXG4gICAgICAgID8gW3RhcmdldF1cbiAgICAgICAgOiBpc0FycmF5KHRhcmdldClcbiAgICAgICAgICAgID8gdGFyZ2V0Lm1hcCh0b0V2ZW50VGFyZ2V0KS5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgIDogdG9Ob2Rlcyh0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50Q2xpY2soKSB7XG5cbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KG9uY2UoZG9jdW1lbnQsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG5cbiAgICB9LCB0cnVlKSk7XG5cbn1cblxuZnVuY3Rpb24gYWpheCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBlbnYgPSBhc3NpZ24oe1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIHhocjogbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBub29wLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnJ1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICBlbnYuYmVmb3JlU2VuZChlbnYpO1xuXG4gICAgICAgIHZhciB4aHIgPSBlbnYueGhyO1xuXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gZW52KSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIHhocltwcm9wXSA9IGVudltwcm9wXTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB4aHIub3BlbihlbnYubWV0aG9kLnRvVXBwZXJDYXNlKCksIHVybCk7XG5cbiAgICAgICAgZm9yICh2YXIgaGVhZGVyIGluIGVudi5oZWFkZXJzKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGVudi5oZWFkZXJzW2hlYWRlcl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb24oeGhyLCAnbG9hZCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDAgfHwgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCB8fCB4aHIuc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHhocik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChhc3NpZ24oRXJyb3IoeGhyLnN0YXR1c1RleHQpLCB7XG4gICAgICAgICAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb24oeGhyLCAnZXJyb3InLCBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoYXNzaWduKEVycm9yKCdOZXR3b3JrIEVycm9yJyksIHt4aHI6IHhocn0pKTsgfSk7XG4gICAgICAgIG9uKHhociwgJ3RpbWVvdXQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoYXNzaWduKEVycm9yKCdOZXR3b3JrIFRpbWVvdXQnKSwge3hocjogeGhyfSkpOyB9KTtcblxuICAgICAgICB4aHIuc2VuZChlbnYuZGF0YSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XG4gICAgcmV0dXJuIGRvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IGRvYy5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycgJiYgIWRvY0VsLmRvU2Nyb2xsO1xufVxuXG5mdW5jdGlvbiByZWFkeShmbikge1xuXG4gICAgaWYgKGlzUmVhZHkoKSkge1xuICAgICAgICBmbigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdW5iaW5kMSgpO1xuICAgICAgICB1bmJpbmQyKCk7XG4gICAgICAgIGZuKCk7XG4gICAgfTtcbiAgICB2YXIgdW5iaW5kMSA9IG9uKGRvYywgJ0RPTUNvbnRlbnRMb2FkZWQnLCBoYW5kbGUpO1xuICAgIHZhciB1bmJpbmQyID0gb24od2luLCAnbG9hZCcsIGhhbmRsZSk7XG59XG5cbmZ1bmN0aW9uIGluZGV4KGVsZW1lbnQsIHJlZikge1xuICAgIHJldHVybiByZWZcbiAgICAgICAgPyB0b05vZGVzKGVsZW1lbnQpLmluZGV4T2YodG9Ob2RlKHJlZikpXG4gICAgICAgIDogdG9Ob2RlcygoZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KSkgJiYgZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmRleChpLCBlbGVtZW50cywgY3VycmVudCwgZmluaXRlKSB7XG4gICAgaWYgKCBjdXJyZW50ID09PSB2b2lkIDAgKSBjdXJyZW50ID0gMDtcbiAgICBpZiAoIGZpbml0ZSA9PT0gdm9pZCAwICkgZmluaXRlID0gZmFsc2U7XG5cblxuICAgIGVsZW1lbnRzID0gdG9Ob2RlcyhlbGVtZW50cyk7XG5cbiAgICB2YXIgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG4gICAgaSA9IGlzTnVtZXJpYyhpKVxuICAgICAgICA/IHRvTnVtYmVyKGkpXG4gICAgICAgIDogaSA9PT0gJ25leHQnXG4gICAgICAgICAgICA/IGN1cnJlbnQgKyAxXG4gICAgICAgICAgICA6IGkgPT09ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgICA/IGN1cnJlbnQgLSAxXG4gICAgICAgICAgICAgICAgOiBpbmRleChlbGVtZW50cywgaSk7XG5cbiAgICBpZiAoZmluaXRlKSB7XG4gICAgICAgIHJldHVybiBjbGFtcChpLCAwLCBsZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBpICU9IGxlbmd0aDtcblxuICAgIHJldHVybiBpIDwgMCA/IGkgKyBsZW5ndGggOiBpO1xufVxuXG5mdW5jdGlvbiBlbXB0eShlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBodG1sKHBhcmVudCwgaHRtbCkge1xuICAgIHBhcmVudCA9IHRvTm9kZShwYXJlbnQpO1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChodG1sKVxuICAgICAgICA/IHBhcmVudC5pbm5lckhUTUxcbiAgICAgICAgOiBhcHBlbmQocGFyZW50Lmhhc0NoaWxkTm9kZXMoKSA/IGVtcHR5KHBhcmVudCkgOiBwYXJlbnQsIGh0bWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kKHBhcmVudCwgZWxlbWVudCkge1xuXG4gICAgcGFyZW50ID0gdG9Ob2RlKHBhcmVudCk7XG5cbiAgICBpZiAoIXBhcmVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZChwYXJlbnQsIGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCBwYXJlbnQuZmlyc3RDaGlsZCk7IH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWxlbWVudCkge1xuICAgIHBhcmVudCA9IHRvTm9kZShwYXJlbnQpO1xuICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpOyB9KTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKHJlZiwgZWxlbWVudCkge1xuICAgIHJlZiA9IHRvTm9kZShyZWYpO1xuICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHJlZik7IH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlcihyZWYsIGVsZW1lbnQpIHtcbiAgICByZWYgPSB0b05vZGUocmVmKTtcbiAgICByZXR1cm4gaW5zZXJ0Tm9kZXMoZWxlbWVudCwgZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIHJlZi5uZXh0U2libGluZ1xuICAgICAgICA/IGJlZm9yZShyZWYubmV4dFNpYmxpbmcsIGVsZW1lbnQpXG4gICAgICAgIDogYXBwZW5kKHJlZi5wYXJlbnROb2RlLCBlbGVtZW50KTsgfVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGluc2VydE5vZGVzKGVsZW1lbnQsIGZuKSB7XG4gICAgZWxlbWVudCA9IGlzU3RyaW5nKGVsZW1lbnQpID8gZnJhZ21lbnQoZWxlbWVudCkgOiBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50XG4gICAgICAgID8gJ2xlbmd0aCcgaW4gZWxlbWVudFxuICAgICAgICAgICAgPyB0b05vZGVzKGVsZW1lbnQpLm1hcChmbilcbiAgICAgICAgICAgIDogZm4oZWxlbWVudClcbiAgICAgICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xuICAgIHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpOyB9KTtcbn1cblxuZnVuY3Rpb24gd3JhcEFsbChlbGVtZW50LCBzdHJ1Y3R1cmUpIHtcblxuICAgIHN0cnVjdHVyZSA9IHRvTm9kZShiZWZvcmUoZWxlbWVudCwgc3RydWN0dXJlKSk7XG5cbiAgICB3aGlsZSAoc3RydWN0dXJlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgc3RydWN0dXJlID0gc3RydWN0dXJlLmZpcnN0Q2hpbGQ7XG4gICAgfVxuXG4gICAgYXBwZW5kKHN0cnVjdHVyZSwgZWxlbWVudCk7XG5cbiAgICByZXR1cm4gc3RydWN0dXJlO1xufVxuXG5mdW5jdGlvbiB3cmFwSW5uZXIoZWxlbWVudCwgc3RydWN0dXJlKSB7XG4gICAgcmV0dXJuIHRvTm9kZXModG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuaGFzQ2hpbGROb2RlcyA/IHdyYXBBbGwodG9Ob2RlcyhlbGVtZW50LmNoaWxkTm9kZXMpLCBzdHJ1Y3R1cmUpIDogYXBwZW5kKGVsZW1lbnQsIHN0cnVjdHVyZSk7IH1cbiAgICApKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwKGVsZW1lbnQpIHtcbiAgICB0b05vZGVzKGVsZW1lbnQpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZTsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7IHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDsgfSlcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgICAgYmVmb3JlKHBhcmVudCwgcGFyZW50LmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgcmVtb3ZlKHBhcmVudCk7XG4gICAgICAgIH0pO1xufVxuXG52YXIgZnJhZ21lbnRSRSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi87XG52YXIgc2luZ2xlVGFnUkUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XG5cbmZ1bmN0aW9uIGZyYWdtZW50KGh0bWwpIHtcblxuICAgIHZhciBtYXRjaGVzID0gc2luZ2xlVGFnUkUuZXhlYyhodG1sKTtcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQobWF0Y2hlc1sxXSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpZiAoZnJhZ21lbnRSRS50ZXN0KGh0bWwpKSB7XG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwudHJpbSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBodG1sO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPiAxID8gdG9Ob2Rlcyhjb250YWluZXIuY2hpbGROb2RlcykgOiBjb250YWluZXIuZmlyc3RDaGlsZDtcblxufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXBwbHkoZWxlbWVudCwgYXJncywgJ2FkZCcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXBwbHkoZWxlbWVudCwgYXJncywgJ3JlbW92ZScpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzKGVsZW1lbnQsIGNscykge1xuICAgIGZpbHRlckF0dHIoZWxlbWVudCwgJ2NsYXNzJywgbmV3IFJlZ0V4cCgoXCIoXnxcXFxccylcIiArIGNscyArIFwiKD8hXFxcXFMpXCIpLCAnZycpLCAnJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXJnc1swXSAmJiByZW1vdmVDbGFzcyhlbGVtZW50LCBhcmdzWzBdKTtcbiAgICBhcmdzWzFdICYmIGFkZENsYXNzKGVsZW1lbnQsIGFyZ3NbMV0pO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCBjbHMpIHtcbiAgICByZXR1cm4gc3VwcG9ydHMuQ2xhc3NMaXN0ICYmIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTsgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoIGxlbi0tID4gMCApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cblxuICAgIGlmICghc3VwcG9ydHMuQ2xhc3NMaXN0IHx8ICFhcmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXJncyA9IGdldEFyZ3MkMShhcmdzKTtcblxuICAgIHZhciBmb3JjZSA9ICFpc1N0cmluZyhhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pID8gYXJncy5wb3AoKSA6IFtdOyAvLyBpbiBpT1MgOS4zIGZvcmNlID09PSB1bmRlZmluZWQgZXZhbHVhdGVzIHRvIGZhbHNlXG5cbiAgICBhcmdzID0gYXJncy5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICB0b05vZGVzKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gcmVmLmNsYXNzTGlzdDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1cHBvcnRzLkZvcmNlXG4gICAgICAgICAgICAgICAgPyBjbGFzc0xpc3QudG9nZ2xlLmFwcGx5KGNsYXNzTGlzdCwgW2FyZ3NbaV1dLmNvbmNhdChmb3JjZSkpXG4gICAgICAgICAgICAgICAgOiAoY2xhc3NMaXN0WyghaXNVbmRlZmluZWQoZm9yY2UpID8gZm9yY2UgOiAhY2xhc3NMaXN0LmNvbnRhaW5zKGFyZ3NbaV0pKSA/ICdhZGQnIDogJ3JlbW92ZSddKGFyZ3NbaV0pKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGFwcGx5KGVsZW1lbnQsIGFyZ3MsIGZuKSB7XG4gICAgYXJncyA9IGdldEFyZ3MkMShhcmdzKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBzdXBwb3J0cy5DbGFzc0xpc3QgJiYgYXJncy5sZW5ndGggJiYgdG9Ob2RlcyhlbGVtZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHJlZi5jbGFzc0xpc3Q7XG5cbiAgICAgICAgc3VwcG9ydHMuTXVsdGlwbGVcbiAgICAgICAgICAgID8gY2xhc3NMaXN0W2ZuXS5hcHBseShjbGFzc0xpc3QsIGFyZ3MpXG4gICAgICAgICAgICA6IGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7IHJldHVybiBjbGFzc0xpc3RbZm5dKGNscyk7IH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdzJDEoYXJncykge1xuICAgIHJldHVybiBhcmdzLnJlZHVjZShmdW5jdGlvbiAoYXJncywgYXJnKSB7IHJldHVybiBhcmdzLmNvbmNhdC5jYWxsKGFyZ3MsIGlzU3RyaW5nKGFyZykgJiYgaW5jbHVkZXMoYXJnLCAnICcpID8gYXJnLnRyaW0oKS5zcGxpdCgnICcpIDogYXJnKTsgfVxuICAgICAgICAsIFtdKTtcbn1cblxudmFyIGNzc051bWJlciA9IHtcbiAgICAnYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCc6IHRydWUsXG4gICAgJ2NvbHVtbi1jb3VudCc6IHRydWUsXG4gICAgJ2ZpbGwtb3BhY2l0eSc6IHRydWUsXG4gICAgJ2ZsZXgtZ3Jvdyc6IHRydWUsXG4gICAgJ2ZsZXgtc2hyaW5rJzogdHJ1ZSxcbiAgICAnZm9udC13ZWlnaHQnOiB0cnVlLFxuICAgICdsaW5lLWhlaWdodCc6IHRydWUsXG4gICAgJ29wYWNpdHknOiB0cnVlLFxuICAgICdvcmRlcic6IHRydWUsXG4gICAgJ29ycGhhbnMnOiB0cnVlLFxuICAgICd3aWRvd3MnOiB0cnVlLFxuICAgICd6LWluZGV4JzogdHJ1ZSxcbiAgICAnem9vbSc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpIHtcblxuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGlmIChpc1N0cmluZyhwcm9wZXJ0eSkpIHtcblxuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wTmFtZShwcm9wZXJ0eSk7XG5cbiAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSBpc051bWVyaWModmFsdWUpICYmICFjc3NOdW1iZXJbcHJvcGVydHldID8gKHZhbHVlICsgXCJweFwiKSA6IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShwcm9wZXJ0eSkpIHtcblxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGdldFN0eWxlcyhlbGVtZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5LnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgcHJvcHNbcHJvcGVydHldID0gc3R5bGVzW3Byb3BOYW1lKHByb3BlcnR5KV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocHJvcGVydHkpKSB7XG4gICAgICAgICAgICBlYWNoKHByb3BlcnR5LCBmdW5jdGlvbiAodmFsdWUsIHByb3BlcnR5KSB7IHJldHVybiBjc3MoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcblxuICAgIH0pWzBdO1xuXG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhlbGVtZW50LCBwc2V1ZG9FbHQpIHtcbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBwc2V1ZG9FbHQpO1xufVxuXG5mdW5jdGlvbiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSwgcHNldWRvRWx0KSB7XG4gICAgcmV0dXJuIGdldFN0eWxlcyhlbGVtZW50LCBwc2V1ZG9FbHQpW3Byb3BlcnR5XTtcbn1cblxudmFyIHZhcnMgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3NzVmFyKG5hbWUpIHtcblxuICAgIGlmICghKG5hbWUgaW4gdmFycykpIHtcblxuICAgICAgICAvKiB1c2FnZSBpbiBjc3M6IC52YXItbmFtZTpiZWZvcmUgeyBjb250ZW50OlwieHl6XCIgfSAqL1xuXG4gICAgICAgIHZhciBlbGVtZW50ID0gYXBwZW5kKGRvY0VsLCBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuXG4gICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIChcInZhci1cIiArIG5hbWUpKTtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICB2YXJzW25hbWVdID0gZ2V0U3R5bGUoZWxlbWVudCwgJ2NvbnRlbnQnLCAnOmJlZm9yZScpLnJlcGxhY2UoL15bXCInXSguKilbXCInXSQvLCAnJDEnKTtcbiAgICAgICAgICAgIHZhcnNbbmFtZV0gPSBKU09OLnBhcnNlKHZhcnNbbmFtZV0pO1xuXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgZG9jRWwucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdmFyc1tuYW1lXTtcblxufVxuXG52YXIgY3NzUHJvcHMgPSB7fTtcblxuZnVuY3Rpb24gcHJvcE5hbWUobmFtZSkge1xuXG4gICAgdmFyIHJldCA9IGNzc1Byb3BzW25hbWVdO1xuICAgIGlmICghcmV0KSB7XG4gICAgICAgIHJldCA9IGNzc1Byb3BzW25hbWVdID0gdmVuZG9yUHJvcE5hbWUobmFtZSkgfHwgbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxudmFyIGNzc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJ107XG52YXIgcmVmJDEgPSBkb2MuY3JlYXRlRWxlbWVudCgnXycpO1xudmFyIHN0eWxlID0gcmVmJDEuc3R5bGU7XG5cbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKG5hbWUpIHtcblxuICAgIG5hbWUgPSBoeXBoZW5hdGUobmFtZSk7XG5cbiAgICBpZiAobmFtZSBpbiBzdHlsZSkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IGNzc1ByZWZpeGVzLmxlbmd0aCwgcHJlZml4ZWROYW1lO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBwcmVmaXhlZE5hbWUgPSBcIi1cIiArIChjc3NQcmVmaXhlc1tpXSkgKyBcIi1cIiArIG5hbWU7XG4gICAgICAgIGlmIChwcmVmaXhlZE5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXhlZE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb24oZWxlbWVudCwgcHJvcHMsIGR1cmF0aW9uLCB0aW1pbmcpIHtcbiAgICBpZiAoIGR1cmF0aW9uID09PSB2b2lkIDAgKSBkdXJhdGlvbiA9IDQwMDtcbiAgICBpZiAoIHRpbWluZyA9PT0gdm9pZCAwICkgdGltaW5nID0gJ2xpbmVhcic7XG5cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY3NzKGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJpZ2dlcihlbGVtZW50LCAndHJhbnNpdGlvbmVuZCcpOyB9LCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgIG9uY2UoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQgdHJhbnNpdGlvbmNhbmNlbGVkJywgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsICd1ay10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgY3NzKGVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24tcHJvcGVydHknOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24tZHVyYXRpb24nOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJzogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0eXBlID09PSAndHJhbnNpdGlvbmNhbmNlbGVkJyA/IHJlamVjdCgpIDogcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSwgZmFsc2UsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID09PSB0YXJnZXQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCBhc3NpZ24oe1xuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLXByb3BlcnR5JzogT2JqZWN0LmtleXMocHJvcHMpLm1hcChwcm9wTmFtZSkuam9pbignLCcpLFxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogKGR1cmF0aW9uICsgXCJtc1wiKSxcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nOiB0aW1pbmdcbiAgICAgICAgICAgIH0sIHByb3BzKSk7XG5cbiAgICAgICAgfSk7IH1cbiAgICApKTtcblxufVxuXG52YXIgVHJhbnNpdGlvbiA9IHtcblxuICAgIHN0YXJ0OiB0cmFuc2l0aW9uLFxuXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcChlbGVtZW50KSB7XG4gICAgICAgIHRyaWdnZXIoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0sXG5cbiAgICBjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbChlbGVtZW50KSB7XG4gICAgICAgIHRyaWdnZXIoZWxlbWVudCwgJ3RyYW5zaXRpb25jYW5jZWxlZCcpO1xuICAgIH0sXG5cbiAgICBpblByb2dyZXNzOiBmdW5jdGlvbiBpblByb2dyZXNzKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGhhc0NsYXNzKGVsZW1lbnQsICd1ay10cmFuc2l0aW9uJyk7XG4gICAgfVxuXG59O1xuXG52YXIgYW5pbWF0aW9uUHJlZml4ID0gJ3VrLWFuaW1hdGlvbi0nO1xudmFyIGNsc0NhbmNlbEFuaW1hdGlvbiA9ICd1ay1jYW5jZWwtYW5pbWF0aW9uJztcblxuZnVuY3Rpb24gYW5pbWF0ZShlbGVtZW50LCBhbmltYXRpb24sIGR1cmF0aW9uLCBvcmlnaW4sIG91dCkge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcbiAgICBpZiAoIGR1cmF0aW9uID09PSB2b2lkIDAgKSBkdXJhdGlvbiA9IDIwMDtcblxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyhlbGVtZW50LCBjbHNDYW5jZWxBbmltYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gYW5pbWF0ZS5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyQxKS50aGVuKHJlc29sdmUsIHJlamVjdCk7IH1cbiAgICAgICAgICAgICAgICAgICAgKTsgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2xzID0gYW5pbWF0aW9uICsgXCIgXCIgKyBhbmltYXRpb25QcmVmaXggKyAob3V0ID8gJ2xlYXZlJyA6ICdlbnRlcicpO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRzV2l0aChhbmltYXRpb24sIGFuaW1hdGlvblByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9IFwiIHVrLXRyYW5zZm9ybS1vcmlnaW4tXCIgKyBvcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gXCIgXCIgKyBhbmltYXRpb25QcmVmaXggKyBcInJldmVyc2VcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzZXQoKTtcblxuICAgICAgICAgICAgb25jZShlbGVtZW50LCAnYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmNhbmNlbCcsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaGFzUmVzZXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnYW5pbWF0aW9uY2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNSZXNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xzQ2FuY2VsQW5pbWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsc0NhbmNlbEFuaW1hdGlvbik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudCA9PT0gdGFyZ2V0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCAnYW5pbWF0aW9uRHVyYXRpb24nLCAoZHVyYXRpb24gKyBcIm1zXCIpKTtcbiAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNscyk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIGNzcyhlbGVtZW50LCAnYW5pbWF0aW9uRHVyYXRpb24nLCAnJyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhlbGVtZW50LCAoYW5pbWF0aW9uUHJlZml4ICsgXCJcXFxcUypcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pOyB9XG4gICAgKSk7XG5cbn1cblxudmFyIGluUHJvZ3Jlc3MgPSBuZXcgUmVnRXhwKChhbmltYXRpb25QcmVmaXggKyBcIihlbnRlcnxsZWF2ZSlcIikpO1xudmFyIEFuaW1hdGlvbiA9IHtcblxuICAgIGluOiBmdW5jdGlvbiBpbiQxKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbikge1xuICAgICAgICByZXR1cm4gYW5pbWF0ZShlbGVtZW50LCBhbmltYXRpb24sIGR1cmF0aW9uLCBvcmlnaW4sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoZWxlbWVudCwgYW5pbWF0aW9uLCBkdXJhdGlvbiwgb3JpZ2luKSB7XG4gICAgICAgIHJldHVybiBhbmltYXRlKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbiwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGluUHJvZ3Jlc3M6IGZ1bmN0aW9uIGluUHJvZ3Jlc3MkMShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBpblByb2dyZXNzLnRlc3QoYXR0cihlbGVtZW50LCAnY2xhc3MnKSk7XG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKGVsZW1lbnQpIHtcbiAgICAgICAgdHJpZ2dlcihlbGVtZW50LCAnYW5pbWF0aW9uY2FuY2VsJyk7XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuICFpc1N0cmluZyhzZWxlY3RvcilcbiAgICAgICAgPyB0b05vZGUoc2VsZWN0b3IpXG4gICAgICAgIDogaXNIdG1sKHNlbGVjdG9yKVxuICAgICAgICAgICAgPyB0b05vZGUoZnJhZ21lbnQoc2VsZWN0b3IpKVxuICAgICAgICAgICAgOiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IHRvTm9kZXMoc2VsZWN0b3IpXG4gICAgICAgIDogaXNIdG1sKHNlbGVjdG9yKVxuICAgICAgICAgICAgPyB0b05vZGVzKGZyYWdtZW50KHNlbGVjdG9yKSlcbiAgICAgICAgICAgIDogZmluZEFsbChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGlzSHRtbChzdHIpIHtcbiAgICByZXR1cm4gc3RyWzBdID09PSAnPCcgfHwgc3RyLm1hdGNoKC9eXFxzKjwvKTtcbn1cblxudmFyIGRpcnMgPSB7XG4gICAgd2lkdGg6IFsneCcsICdsZWZ0JywgJ3JpZ2h0J10sXG4gICAgaGVpZ2h0OiBbJ3knLCAndG9wJywgJ2JvdHRvbSddXG59O1xuXG5mdW5jdGlvbiBwb3NpdGlvbkF0KGVsZW1lbnQsIHRhcmdldCwgZWxBdHRhY2gsIHRhcmdldEF0dGFjaCwgZWxPZmZzZXQsIHRhcmdldE9mZnNldCwgZmxpcCwgYm91bmRhcnkpIHtcblxuICAgIGVsQXR0YWNoID0gZ2V0UG9zKGVsQXR0YWNoKTtcbiAgICB0YXJnZXRBdHRhY2ggPSBnZXRQb3ModGFyZ2V0QXR0YWNoKTtcblxuICAgIHZhciBmbGlwcGVkID0ge2VsZW1lbnQ6IGVsQXR0YWNoLCB0YXJnZXQ6IHRhcmdldEF0dGFjaH07XG5cbiAgICBpZiAoIWVsZW1lbnQgfHwgIXRhcmdldCkge1xuICAgICAgICByZXR1cm4gZmxpcHBlZDtcbiAgICB9XG5cbiAgICB2YXIgZGltID0gZ2V0RGltZW5zaW9ucyhlbGVtZW50KTtcbiAgICB2YXIgdGFyZ2V0RGltID0gZ2V0RGltZW5zaW9ucyh0YXJnZXQpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRhcmdldERpbTtcblxuICAgIG1vdmVUbyhwb3NpdGlvbiwgZWxBdHRhY2gsIGRpbSwgLTEpO1xuICAgIG1vdmVUbyhwb3NpdGlvbiwgdGFyZ2V0QXR0YWNoLCB0YXJnZXREaW0sIDEpO1xuXG4gICAgZWxPZmZzZXQgPSBnZXRPZmZzZXRzKGVsT2Zmc2V0LCBkaW0ud2lkdGgsIGRpbS5oZWlnaHQpO1xuICAgIHRhcmdldE9mZnNldCA9IGdldE9mZnNldHModGFyZ2V0T2Zmc2V0LCB0YXJnZXREaW0ud2lkdGgsIHRhcmdldERpbS5oZWlnaHQpO1xuXG4gICAgZWxPZmZzZXRbJ3gnXSArPSB0YXJnZXRPZmZzZXRbJ3gnXTtcbiAgICBlbE9mZnNldFsneSddICs9IHRhcmdldE9mZnNldFsneSddO1xuXG4gICAgcG9zaXRpb24ubGVmdCArPSBlbE9mZnNldFsneCddO1xuICAgIHBvc2l0aW9uLnRvcCArPSBlbE9mZnNldFsneSddO1xuXG4gICAgYm91bmRhcnkgPSBnZXREaW1lbnNpb25zKGJvdW5kYXJ5IHx8IHdpbmRvdyQxKGVsZW1lbnQpKTtcblxuICAgIGlmIChmbGlwKSB7XG4gICAgICAgIGVhY2goZGlycywgZnVuY3Rpb24gKHJlZiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIGRpciA9IHJlZlswXTtcbiAgICAgICAgICAgIHZhciBhbGlnbiA9IHJlZlsxXTtcbiAgICAgICAgICAgIHZhciBhbGlnbkZsaXAgPSByZWZbMl07XG5cblxuICAgICAgICAgICAgaWYgKCEoZmxpcCA9PT0gdHJ1ZSB8fCBpbmNsdWRlcyhmbGlwLCBkaXIpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGVsZW1PZmZzZXQgPSBlbEF0dGFjaFtkaXJdID09PSBhbGlnblxuICAgICAgICAgICAgICAgID8gLWRpbVtwcm9wXVxuICAgICAgICAgICAgICAgIDogZWxBdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwXG4gICAgICAgICAgICAgICAgICAgID8gZGltW3Byb3BdXG4gICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgdmFyIHRhcmdldE9mZnNldCA9IHRhcmdldEF0dGFjaFtkaXJdID09PSBhbGlnblxuICAgICAgICAgICAgICAgID8gdGFyZ2V0RGltW3Byb3BdXG4gICAgICAgICAgICAgICAgOiB0YXJnZXRBdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwXG4gICAgICAgICAgICAgICAgICAgID8gLXRhcmdldERpbVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIGlmIChwb3NpdGlvblthbGlnbl0gPCBib3VuZGFyeVthbGlnbl0gfHwgcG9zaXRpb25bYWxpZ25dICsgZGltW3Byb3BdID4gYm91bmRhcnlbYWxpZ25GbGlwXSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNlbnRlck9mZnNldCA9IGRpbVtwcm9wXSAvIDI7XG4gICAgICAgICAgICAgICAgdmFyIGNlbnRlclRhcmdldE9mZnNldCA9IHRhcmdldEF0dGFjaFtkaXJdID09PSAnY2VudGVyJyA/IC10YXJnZXREaW1bcHJvcF0gLyAyIDogMDtcblxuICAgICAgICAgICAgICAgIGVsQXR0YWNoW2Rpcl0gPT09ICdjZW50ZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgYXBwbHkoY2VudGVyT2Zmc2V0LCBjZW50ZXJUYXJnZXRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIHx8IGFwcGx5KC1jZW50ZXJPZmZzZXQsIC1jZW50ZXJUYXJnZXRPZmZzZXQpXG4gICAgICAgICAgICAgICAgKSB8fCBhcHBseShlbGVtT2Zmc2V0LCB0YXJnZXRPZmZzZXQpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5KGVsZW1PZmZzZXQsIHRhcmdldE9mZnNldCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHBvc2l0aW9uW2FsaWduXSArIGVsZW1PZmZzZXQgKyB0YXJnZXRPZmZzZXQgLSBlbE9mZnNldFtkaXJdICogMjtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gYm91bmRhcnlbYWxpZ25dICYmIG5ld1ZhbCArIGRpbVtwcm9wXSA8PSBib3VuZGFyeVthbGlnbkZsaXBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uW2FsaWduXSA9IG5ld1ZhbDtcblxuICAgICAgICAgICAgICAgICAgICBbJ2VsZW1lbnQnLCAndGFyZ2V0J10uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsaXBwZWRbZWxdW2Rpcl0gPSAhZWxlbU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZmxpcHBlZFtlbF1bZGlyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmxpcHBlZFtlbF1bZGlyXSA9PT0gZGlyc1twcm9wXVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGRpcnNbcHJvcF1bMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkaXJzW3Byb3BdWzFdO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvZmZzZXQoZWxlbWVudCwgcG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIGZsaXBwZWQ7XG59XG5cbmZ1bmN0aW9uIG9mZnNldChlbGVtZW50LCBjb29yZGluYXRlcykge1xuXG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgIGlmIChjb29yZGluYXRlcykge1xuXG4gICAgICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gb2Zmc2V0KGVsZW1lbnQpO1xuICAgICAgICB2YXIgcG9zID0gY3NzKGVsZW1lbnQsICdwb3NpdGlvbicpO1xuXG4gICAgICAgIFsnbGVmdCcsICd0b3AnXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjb29yZGluYXRlcykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNzcyhlbGVtZW50LCBwcm9wKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gKChjb29yZGluYXRlc1twcm9wXSAtIGN1cnJlbnRPZmZzZXRbcHJvcF0pXG4gICAgICAgICAgICAgICAgKyB0b0Zsb2F0KHBvcyA9PT0gJ2Fic29sdXRlJyAmJiB2YWx1ZSA9PT0gJ2F1dG8nID8gcG9zaXRpb24oZWxlbWVudClbcHJvcF0gOiB2YWx1ZSkpICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERpbWVuc2lvbnMoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldERpbWVuc2lvbnMoZWxlbWVudCkge1xuXG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgIHZhciByZWYgPSB3aW5kb3ckMShlbGVtZW50KTtcbiAgICB2YXIgdG9wID0gcmVmLnBhZ2VZT2Zmc2V0O1xuICAgIHZhciBsZWZ0ID0gcmVmLnBhZ2VYT2Zmc2V0O1xuXG4gICAgaWYgKGlzV2luZG93KGVsZW1lbnQpKSB7XG5cbiAgICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnQuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHZhciB3aWR0aCA9IGVsZW1lbnQuaW5uZXJXaWR0aDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBib3R0b206IHRvcCArIGhlaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGRpc3BsYXkgPSBmYWxzZTtcbiAgICBpZiAoIWlzVmlzaWJsZShlbGVtZW50KSkge1xuICAgICAgICBkaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmIChkaXNwbGF5ICE9PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICB0b3A6IHJlY3QudG9wICsgdG9wLFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBsZWZ0LFxuICAgICAgICBib3R0b206IHJlY3QuYm90dG9tICsgdG9wLFxuICAgICAgICByaWdodDogcmVjdC5yaWdodCArIGxlZnQsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb24oZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICB2YXIgcGFyZW50ID0gb2Zmc2V0UGFyZW50KGVsZW1lbnQpO1xuICAgIHZhciBwYXJlbnRPZmZzZXQgPSBwYXJlbnQgPT09IGRvY0VsJDEoZWxlbWVudCkgPyB7dG9wOiAwLCBsZWZ0OiAwfSA6IG9mZnNldChwYXJlbnQpO1xuICAgIHZhciByZWYgPSBbJ3RvcCcsICdsZWZ0J10ucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcCkge1xuICAgICAgICB2YXIgcHJvcE5hbWUkJDEgPSB1Y2ZpcnN0KHByb3ApO1xuICAgICAgICBwcm9wc1twcm9wXSAtPSBwYXJlbnRPZmZzZXRbcHJvcF1cbiAgICAgICAgICAgICsgKHRvRmxvYXQoY3NzKGVsZW1lbnQsIChcIm1hcmdpblwiICsgcHJvcE5hbWUkJDEpKSkgfHwgMClcbiAgICAgICAgICAgICsgKHRvRmxvYXQoY3NzKHBhcmVudCwgKFwiYm9yZGVyXCIgKyBwcm9wTmFtZSQkMSArIFwiV2lkdGhcIikpKSB8fCAwKTtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sIG9mZnNldChlbGVtZW50KSk7XG4gICAgdmFyIHRvcCA9IHJlZi50b3A7XG4gICAgdmFyIGxlZnQgPSByZWYubGVmdDtcblxuICAgIHJldHVybiB7dG9wOiB0b3AsIGxlZnQ6IGxlZnR9O1xufVxuXG5mdW5jdGlvbiBvZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuXG4gICAgdmFyIHBhcmVudCA9IHRvTm9kZShlbGVtZW50KS5vZmZzZXRQYXJlbnQ7XG5cbiAgICB3aGlsZSAocGFyZW50ICYmIGNzcyhwYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgfHwgZG9jRWwkMShlbGVtZW50KTtcbn1cblxudmFyIGhlaWdodCA9IGRpbWVuc2lvbignaGVpZ2h0Jyk7XG52YXIgd2lkdGggPSBkaW1lbnNpb24oJ3dpZHRoJyk7XG5cbmZ1bmN0aW9uIGRpbWVuc2lvbihwcm9wKSB7XG4gICAgdmFyIHByb3BOYW1lJCQxID0gdWNmaXJzdChwcm9wKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XG5cbiAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG5cbiAgICAgICAgICAgIGlmIChpc1dpbmRvdyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50WyhcImlubmVyXCIgKyBwcm9wTmFtZSQkMSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNEb2N1bWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2MgPSBlbGVtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoZG9jLm9mZnNldEhlaWdodCwgZG9jLnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gY3NzKGVsZW1lbnQsIHByb3ApO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ2F1dG8nID8gZWxlbWVudFsoXCJvZmZzZXRcIiArIHByb3BOYW1lJCQxKV0gOiB0b0Zsb2F0KHZhbHVlKSB8fCAwO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29udGVudFNpemUocHJvcCwgZWxlbWVudCwgdmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCBwcm9wLCAhdmFsdWUgJiYgdmFsdWUgIT09IDBcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiBnZXRDb250ZW50U2l6ZShwcm9wLCBlbGVtZW50LCB2YWx1ZSkgKyAncHgnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRlbnRTaXplKHByb3AsIGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGNzcyhlbGVtZW50LCAnYm94U2l6aW5nJykgPT09ICdib3JkZXItYm94JyA/IGRpcnNbcHJvcF0uc2xpY2UoMSkubWFwKHVjZmlyc3QpLnJlZHVjZShmdW5jdGlvbiAodmFsdWUsIHByb3ApIHsgcmV0dXJuIHZhbHVlXG4gICAgICAgIC0gdG9GbG9hdChjc3MoZWxlbWVudCwgKFwicGFkZGluZ1wiICsgcHJvcCkpKVxuICAgICAgICAtIHRvRmxvYXQoY3NzKGVsZW1lbnQsIChcImJvcmRlclwiICsgcHJvcCArIFwiV2lkdGhcIikpKTsgfVxuICAgICAgICAsIHZhbHVlKSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBtb3ZlVG8ocG9zaXRpb24sIGF0dGFjaCwgZGltLCBmYWN0b3IpIHtcbiAgICBlYWNoKGRpcnMsIGZ1bmN0aW9uIChyZWYsIHByb3ApIHtcbiAgICAgICAgdmFyIGRpciA9IHJlZlswXTtcbiAgICAgICAgdmFyIGFsaWduID0gcmVmWzFdO1xuICAgICAgICB2YXIgYWxpZ25GbGlwID0gcmVmWzJdO1xuXG4gICAgICAgIGlmIChhdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwKSB7XG4gICAgICAgICAgICBwb3NpdGlvblthbGlnbl0gKz0gZGltW3Byb3BdICogZmFjdG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGFjaFtkaXJdID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgcG9zaXRpb25bYWxpZ25dICs9IGRpbVtwcm9wXSAqIGZhY3RvciAvIDI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zKHBvcykge1xuXG4gICAgdmFyIHggPSAvbGVmdHxjZW50ZXJ8cmlnaHQvO1xuICAgIHZhciB5ID0gL3RvcHxjZW50ZXJ8Ym90dG9tLztcblxuICAgIHBvcyA9IChwb3MgfHwgJycpLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAocG9zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwb3MgPSB4LnRlc3QocG9zWzBdKVxuICAgICAgICAgICAgPyBwb3MuY29uY2F0KFsnY2VudGVyJ10pXG4gICAgICAgICAgICA6IHkudGVzdChwb3NbMF0pXG4gICAgICAgICAgICAgICAgPyBbJ2NlbnRlciddLmNvbmNhdChwb3MpXG4gICAgICAgICAgICAgICAgOiBbJ2NlbnRlcicsICdjZW50ZXInXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4LnRlc3QocG9zWzBdKSA/IHBvc1swXSA6ICdjZW50ZXInLFxuICAgICAgICB5OiB5LnRlc3QocG9zWzFdKSA/IHBvc1sxXSA6ICdjZW50ZXInXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0cyhvZmZzZXRzLCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICB2YXIgcmVmID0gKG9mZnNldHMgfHwgJycpLnNwbGl0KCcgJyk7XG4gICAgdmFyIHggPSByZWZbMF07XG4gICAgdmFyIHkgPSByZWZbMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4ID8gdG9GbG9hdCh4KSAqIChlbmRzV2l0aCh4LCAnJScpID8gd2lkdGggLyAxMDAgOiAxKSA6IDAsXG4gICAgICAgIHk6IHkgPyB0b0Zsb2F0KHkpICogKGVuZHNXaXRoKHksICclJykgPyBoZWlnaHQgLyAxMDAgOiAxKSA6IDBcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBmbGlwUG9zaXRpb24ocG9zKSB7XG4gICAgc3dpdGNoIChwb3MpIHtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHJldHVybiAndG9wJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luVmlldyhlbGVtZW50LCB0b3AsIGxlZnQpIHtcbiAgICBpZiAoIHRvcCA9PT0gdm9pZCAwICkgdG9wID0gMDtcbiAgICBpZiAoIGxlZnQgPT09IHZvaWQgMCApIGxlZnQgPSAwO1xuXG5cbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuXG4gICAgdmFyIHdpbiA9IHdpbmRvdyQxKGVsZW1lbnQpO1xuICAgIHJldHVybiBpbnRlcnNlY3RSZWN0KGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHtcbiAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgIGJvdHRvbTogdG9wICsgaGVpZ2h0KHdpbiksXG4gICAgICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgod2luKVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxlZE92ZXIoZWxlbWVudCkge1xuXG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgIHZhciB3aW4gPSB3aW5kb3ckMShlbGVtZW50KTtcbiAgICB2YXIgZG9jID0gZG9jdW1lbnQkMShlbGVtZW50KTtcbiAgICB2YXIgZWxIZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB2YXIgdG9wID0gcG9zaXRpb25Ub3AoZWxlbWVudCk7XG4gICAgdmFyIHZwID0gaGVpZ2h0KHdpbik7XG4gICAgdmFyIHZoID0gdnAgKyBNYXRoLm1pbigwLCB0b3AgLSB2cCk7XG4gICAgdmFyIGRpZmYgPSBNYXRoLm1heCgwLCB2cCAtIChoZWlnaHQoZG9jKSAtICh0b3AgKyBlbEhlaWdodCkpKTtcblxuICAgIHJldHVybiBjbGFtcCgoKHZoICsgd2luLnBhZ2VZT2Zmc2V0IC0gdG9wKSAvICgodmggKyAoZWxIZWlnaHQgLSAoZGlmZiA8IHZwID8gZGlmZiA6IDApKSkgLyAxMDApKSAvIDEwMCk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uVG9wKGVsZW1lbnQpIHtcbiAgICB2YXIgdG9wID0gMDtcblxuICAgIGRvIHtcblxuICAgICAgICB0b3AgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG5cbiAgICB9IHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XG5cbiAgICByZXR1cm4gdG9wO1xufVxuXG5mdW5jdGlvbiB3aW5kb3ckMShlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzV2luZG93KGVsZW1lbnQpID8gZWxlbWVudCA6IGRvY3VtZW50JDEoZWxlbWVudCkuZGVmYXVsdFZpZXc7XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50JDEoZWxlbWVudCkge1xuICAgIHJldHVybiB0b05vZGUoZWxlbWVudCkub3duZXJEb2N1bWVudDtcbn1cblxuZnVuY3Rpb24gZG9jRWwkMShlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50JDEoZWxlbWVudCkuZG9jdW1lbnRFbGVtZW50O1xufVxuXG4vKlxuICAgIEJhc2VkIG9uOlxuICAgIENvcHlyaWdodCAoYykgMjAxNiBXaWxzb24gUGFnZSB3aWxzb25wYWdlQG1lLmNvbVxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS93aWxzb25wYWdlL2Zhc3Rkb21cbiovXG5cbnZhciBmYXN0ZG9tID0ge1xuXG4gICAgcmVhZHM6IFtdLFxuICAgIHdyaXRlczogW10sXG5cbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKHRhc2spIHtcbiAgICAgICAgdGhpcy5yZWFkcy5wdXNoKHRhc2spO1xuICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIHJldHVybiB0YXNrO1xuICAgIH0sXG5cbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUodGFzaykge1xuICAgICAgICB0aGlzLndyaXRlcy5wdXNoKHRhc2spO1xuICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIHJldHVybiB0YXNrO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIodGFzaykge1xuICAgICAgICByZXR1cm4gcmVtb3ZlJDEodGhpcy5yZWFkcywgdGFzaykgfHwgcmVtb3ZlJDEodGhpcy53cml0ZXMsIHRhc2spO1xuICAgIH0sXG5cbiAgICBmbHVzaDogZnVuY3Rpb24gZmx1c2goKSB7XG5cbiAgICAgICAgcnVuVGFza3ModGhpcy5yZWFkcyk7XG4gICAgICAgIHJ1blRhc2tzKHRoaXMud3JpdGVzLnNwbGljZSgwLCB0aGlzLndyaXRlcy5sZW5ndGgpKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnJlYWRzLmxlbmd0aCB8fCB0aGlzLndyaXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBzY2hlZHVsZUZsdXNoKCkge1xuICAgIGlmICghZmFzdGRvbS5zY2hlZHVsZWQpIHtcbiAgICAgICAgZmFzdGRvbS5zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmFzdGRvbS5mbHVzaC5iaW5kKGZhc3Rkb20pKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJ1blRhc2tzKHRhc2tzKSB7XG4gICAgdmFyIHRhc2s7XG4gICAgd2hpbGUgKCh0YXNrID0gdGFza3Muc2hpZnQoKSkpIHtcbiAgICAgICAgdGFzaygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlJDEoYXJyYXksIGl0ZW0pIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgIHJldHVybiAhIX5pbmRleCAmJiAhIWFycmF5LnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIE1vdXNlVHJhY2tlcigpIHt9XG5cbk1vdXNlVHJhY2tlci5wcm90b3R5cGUgPSB7XG5cbiAgICBwb3NpdGlvbnM6IFtdLFxuICAgIHBvc2l0aW9uOiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gbnVsbDtcblxuICAgICAgICB2YXIgdGlja2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuYmluZCA9IG9uKGRvYywgJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcyQxLnBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVmLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmIChsZW5ndGggJiYgKHRpbWUgLSB0aGlzJDEucG9zaXRpb25zW2xlbmd0aCAtIDFdLnRpbWUgPiAxMDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wb3NpdGlvbnMuc3BsaWNlKDAsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcyQxLnBvc2l0aW9ucy5wdXNoKHt0aW1lOiB0aW1lLCB4OiBlLnBhZ2VYLCB5OiBlLnBhZ2VZfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnBvc2l0aW9ucy5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wb3NpdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCA1KTtcblxuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy51bmJpbmQpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbW92ZXNUbzogZnVuY3Rpb24gbW92ZXNUbyh0YXJnZXQpIHtcblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHAgPSBvZmZzZXQodGFyZ2V0KTtcbiAgICAgICAgdmFyIHBvc2l0aW9uJCQxID0gdGhpcy5wb3NpdGlvbnNbdGhpcy5wb3NpdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciByZWYgPSB0aGlzLnBvc2l0aW9ucztcbiAgICAgICAgdmFyIHByZXZQb3MgPSByZWZbMF07XG5cbiAgICAgICAgaWYgKHAubGVmdCA8PSBwb3NpdGlvbiQkMS54ICYmIHBvc2l0aW9uJCQxLnggPD0gcC5yaWdodCAmJiBwLnRvcCA8PSBwb3NpdGlvbiQkMS55ICYmIHBvc2l0aW9uJCQxLnkgPD0gcC5ib3R0b20pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb2ludHMgPSBbXG4gICAgICAgICAgICBbe3g6IHAubGVmdCwgeTogcC50b3B9LCB7eDogcC5yaWdodCwgeTogcC5ib3R0b219XSxcbiAgICAgICAgICAgIFt7eDogcC5yaWdodCwgeTogcC50b3B9LCB7eDogcC5sZWZ0LCB5OiBwLmJvdHRvbX1dXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKHAucmlnaHQgPD0gcG9zaXRpb24kJDEueCkge1xuICAgICAgICAgICAgLy8gZW1wdHlcbiAgICAgICAgfSBlbHNlIGlmIChwLmxlZnQgPj0gcG9zaXRpb24kJDEueCkge1xuICAgICAgICAgICAgcG9pbnRzWzBdLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHBvaW50c1sxXS5yZXZlcnNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocC5ib3R0b20gPD0gcG9zaXRpb24kJDEueSkge1xuICAgICAgICAgICAgcG9pbnRzWzBdLnJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwLnRvcCA+PSBwb3NpdGlvbiQkMS55KSB7XG4gICAgICAgICAgICBwb2ludHNbMV0ucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhcG9pbnRzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCArIChzbG9wZShwcmV2UG9zLCBwb2ludFswXSkgPCBzbG9wZShwb3NpdGlvbiQkMSwgcG9pbnRbMF0pICYmIHNsb3BlKHByZXZQb3MsIHBvaW50WzFdKSA+IHNsb3BlKHBvc2l0aW9uJCQxLCBwb2ludFsxXSkpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHNsb3BlKGEsIGIpIHtcbiAgICByZXR1cm4gKGIueSAtIGEueSkgLyAoYi54IC0gYS54KTtcbn1cblxudmFyIHN0cmF0cyA9IHt9O1xuXG4vLyBjb25jYXQgc3RyYXRlZ3lcbnN0cmF0cy5hcmdzID1cbnN0cmF0cy5ldmVudHMgPVxuc3RyYXRzLmluaXQgPVxuc3RyYXRzLmNyZWF0ZWQgPVxuc3RyYXRzLmJlZm9yZUNvbm5lY3QgPVxuc3RyYXRzLmNvbm5lY3RlZCA9XG5zdHJhdHMucmVhZHkgPVxuc3RyYXRzLmJlZm9yZURpc2Nvbm5lY3QgPVxuc3RyYXRzLmRpc2Nvbm5lY3RlZCA9XG5zdHJhdHMuZGVzdHJveSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cbiAgICBwYXJlbnRWYWwgPSBwYXJlbnRWYWwgJiYgIWlzQXJyYXkocGFyZW50VmFsKSA/IFtwYXJlbnRWYWxdIDogcGFyZW50VmFsO1xuXG4gICAgcmV0dXJuIGNoaWxkVmFsXG4gICAgICAgID8gcGFyZW50VmFsXG4gICAgICAgICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXG4gICAgICAgICAgICA6IGlzQXJyYXkoY2hpbGRWYWwpXG4gICAgICAgICAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICAgICAgICAgIDogW2NoaWxkVmFsXVxuICAgICAgICA6IHBhcmVudFZhbDtcbn07XG5cbi8vIHVwZGF0ZSBzdHJhdGVneVxuc3RyYXRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIHN0cmF0cy5hcmdzKHBhcmVudFZhbCwgaXNGdW5jdGlvbihjaGlsZFZhbCkgPyB7cmVhZDogY2hpbGRWYWx9IDogY2hpbGRWYWwpO1xufTtcblxuLy8gcHJvcGVydHkgc3RyYXRlZ3lcbnN0cmF0cy5wcm9wcyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cbiAgICBpZiAoaXNBcnJheShjaGlsZFZhbCkpIHtcbiAgICAgICAgY2hpbGRWYWwgPSBjaGlsZFZhbC5yZWR1Y2UoZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBTdHJpbmc7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyYXRzLm1ldGhvZHMocGFyZW50VmFsLCBjaGlsZFZhbCk7XG59O1xuXG4vLyBleHRlbmQgc3RyYXRlZ3lcbnN0cmF0cy5jb21wdXRlZCA9XG5zdHJhdHMuZGVmYXVsdHMgPVxuc3RyYXRzLm1ldGhvZHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIHJldHVybiBjaGlsZFZhbFxuICAgICAgICA/IHBhcmVudFZhbFxuICAgICAgICAgICAgPyBhc3NpZ24oe30sIHBhcmVudFZhbCwgY2hpbGRWYWwpXG4gICAgICAgICAgICA6IGNoaWxkVmFsXG4gICAgICAgIDogcGFyZW50VmFsO1xufTtcblxuLy8gZGVmYXVsdCBzdHJhdGVneVxudmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNoaWxkVmFsKSA/IHBhcmVudFZhbCA6IGNoaWxkVmFsO1xufTtcblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQpIHtcblxuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHtcbiAgICAgICAgbWVyZ2VLZXkoa2V5KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkkMSBpbiBjaGlsZCkge1xuICAgICAgICBpZiAoIWhhc093bihwYXJlbnQsIGtleSQxKSkge1xuICAgICAgICAgICAgbWVyZ2VLZXkoa2V5JDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VLZXkoa2V5KSB7XG4gICAgICAgIG9wdGlvbnNba2V5XSA9IChzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQpKHBhcmVudFtrZXldLCBjaGlsZFtrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIGlkID0gMDtcblxudmFyIFBsYXllciA9IGZ1bmN0aW9uIFBsYXllcihlbCkge1xuICAgIHRoaXMuaWQgPSArK2lkO1xuICAgIHRoaXMuZWwgPSB0b05vZGUoZWwpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc1ZpZGVvID0gZnVuY3Rpb24gaXNWaWRlbyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNZb3V0dWJlKCkgfHwgdGhpcy5pc1ZpbWVvKCkgfHwgdGhpcy5pc0hUTUw1KCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmlzSFRNTDUgPSBmdW5jdGlvbiBpc0hUTUw1ICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC50YWdOYW1lID09PSAnVklERU8nO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc0lGcmFtZSA9IGZ1bmN0aW9uIGlzSUZyYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC50YWdOYW1lID09PSAnSUZSQU1FJztcbn07XG5cblBsYXllci5wcm90b3R5cGUuaXNZb3V0dWJlID0gZnVuY3Rpb24gaXNZb3V0dWJlICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0lGcmFtZSgpICYmICEhdGhpcy5lbC5zcmMubWF0Y2goL1xcL1xcLy4qP3lvdXR1YmUoLW5vY29va2llKT9cXC5bYS16XStcXC8od2F0Y2hcXD92PVteJlxcc10rfGVtYmVkKXx5b3V0dVxcLmJlXFwvLiovKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuaXNWaW1lbyA9IGZ1bmN0aW9uIGlzVmltZW8gKCkge1xuICAgIHJldHVybiB0aGlzLmlzSUZyYW1lKCkgJiYgISF0aGlzLmVsLnNyYy5tYXRjaCgvdmltZW9cXC5jb21cXC92aWRlb1xcLy4qLyk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmVuYWJsZUFwaSA9IGZ1bmN0aW9uIGVuYWJsZUFwaSAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeTtcbiAgICB9XG5cbiAgICB2YXIgeW91dHViZSA9IHRoaXMuaXNZb3V0dWJlKCk7XG4gICAgdmFyIHZpbWVvID0gdGhpcy5pc1ZpbWVvKCk7XG5cbiAgICB2YXIgcG9sbGVyO1xuXG4gICAgaWYgKHlvdXR1YmUgfHwgdmltZW8pIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIG9uY2UodGhpcyQxLmVsLCAnbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeW91dHViZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwb3N0KHRoaXMkMS5lbCwge2V2ZW50OiAnbGlzdGVuaW5nJywgaWQ6IHRoaXMkMS5pZH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICBwb2xsZXIgPSBzZXRJbnRlcnZhbChsaXN0ZW5lciwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGlzdGVuKGZ1bmN0aW9uIChkYXRhJCQxKSB7IHJldHVybiB5b3V0dWJlICYmIGRhdGEkJDEuaWQgPT09IHRoaXMkMS5pZCAmJiBkYXRhJCQxLmV2ZW50ID09PSAnb25SZWFkeScgfHwgdmltZW8gJiYgTnVtYmVyKGRhdGEkJDEucGxheWVyX2lkKSA9PT0gdGhpcyQxLmlkOyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBwb2xsZXIgJiYgY2xlYXJJbnRlcnZhbChwb2xsZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhdHRyKHRoaXMkMS5lbCwgJ3NyYycsIChcIlwiICsgKHRoaXMkMS5lbC5zcmMpICsgKGluY2x1ZGVzKHRoaXMkMS5lbC5zcmMsICc/JykgPyAnJicgOiAnPycpICsgKHlvdXR1YmUgPyAnZW5hYmxlanNhcGk9MScgOiAoXCJhcGk9MSZwbGF5ZXJfaWQ9XCIgKyBpZCkpKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbn07XG5cblBsYXllci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIHBsYXkgKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgaWYgKCF0aGlzLmlzVmlkZW8oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJRnJhbWUoKSkge1xuICAgICAgICB0aGlzLmVuYWJsZUFwaSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zdCh0aGlzJDEuZWwsIHtmdW5jOiAncGxheVZpZGVvJywgbWV0aG9kOiAncGxheSd9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5lbC5wbGF5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgIGlmICghdGhpcy5pc1ZpZGVvKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSUZyYW1lKCkpIHtcbiAgICAgICAgdGhpcy5lbmFibGVBcGkoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvc3QodGhpcyQxLmVsLCB7ZnVuYzogJ3BhdXNlVmlkZW8nLCBtZXRob2Q6ICdwYXVzZSd9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0aGlzLmVsLnBhdXNlKCk7XG4gICAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS5tdXRlID0gZnVuY3Rpb24gbXV0ZSAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICBpZiAoIXRoaXMuaXNWaWRlbygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0lGcmFtZSgpKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlQXBpKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBwb3N0KHRoaXMkMS5lbCwge2Z1bmM6ICdtdXRlJywgbWV0aG9kOiAnc2V0Vm9sdW1lJywgdmFsdWU6IDB9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0aGlzLmVsLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgYXR0cih0aGlzLmVsLCAnbXV0ZWQnLCAnJyk7XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBwb3N0KGVsLCBjbWQpIHtcbiAgICB0cnkge1xuICAgICAgICBlbC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KGFzc2lnbih7ZXZlbnQ6ICdjb21tYW5kJ30sIGNtZCkpLCAnKicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG59XG5cbmZ1bmN0aW9uIGxpc3RlbihjYikge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgb25jZSh3aW4sICdtZXNzYWdlJywgZnVuY3Rpb24gKF8sIGRhdGEkJDEpIHsgcmV0dXJuIHJlc29sdmUoZGF0YSQkMSk7IH0sIGZhbHNlLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSQkMSA9IHJlZi5kYXRhO1xuXG5cbiAgICAgICAgICAgIGlmICghZGF0YSQkMSB8fCAhaXNTdHJpbmcoZGF0YSQkMSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGF0YSQkMSA9IEpTT04ucGFyc2UoZGF0YSQkMSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGF0YSQkMSAmJiBjYihkYXRhJCQxKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59XG5cbi8qXG4gICAgQmFzZWQgb246XG4gICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTYgVGhvbWFzIEZ1Y2hzXG4gICAgaHR0cDovL3plcHRvanMuY29tL1xuKi9cbnZhciB0b3VjaCA9IHt9O1xudmFyIGNsaWNrVGltZW91dDtcbnZhciBzd2lwZVRpbWVvdXQ7XG52YXIgdGFwVGltZW91dDtcbnZhciBjbGlja2VkO1xuXG5mdW5jdGlvbiBzd2lwZURpcmVjdGlvbihyZWYpIHtcbiAgICB2YXIgeDEgPSByZWYueDE7XG4gICAgdmFyIHgyID0gcmVmLngyO1xuICAgIHZhciB5MSA9IHJlZi55MTtcbiAgICB2YXIgeTIgPSByZWYueTI7XG5cbiAgICByZXR1cm4gTWF0aC5hYnMoeDEgLSB4MikgPj0gTWF0aC5hYnMoeTEgLSB5MikgPyAoeDEgLSB4MiA+IDAgPyAnTGVmdCcgOiAnUmlnaHQnKSA6ICh5MSAtIHkyID4gMCA/ICdVcCcgOiAnRG93bicpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxBbGwoKSB7XG4gICAgY2xpY2tUaW1lb3V0ICYmIGNsZWFyVGltZW91dChjbGlja1RpbWVvdXQpO1xuICAgIHN3aXBlVGltZW91dCAmJiBjbGVhclRpbWVvdXQoc3dpcGVUaW1lb3V0KTtcbiAgICB0YXBUaW1lb3V0ICYmIGNsZWFyVGltZW91dCh0YXBUaW1lb3V0KTtcbiAgICBjbGlja1RpbWVvdXQgPSBzd2lwZVRpbWVvdXQgPSB0YXBUaW1lb3V0ID0gbnVsbDtcbiAgICB0b3VjaCA9IHt9O1xufVxuXG5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICBvbihkb2MsICdjbGljaycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsaWNrZWQgPSB0cnVlOyB9LCB0cnVlKTtcblxuICAgIG9uKGRvYywgcG9pbnRlckRvd24sIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgcmVmID0gZ2V0UG9zJDEoZSk7XG4gICAgICAgIHZhciB4ID0gcmVmLng7XG4gICAgICAgIHZhciB5ID0gcmVmLnk7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUoZS50eXBlKTtcblxuICAgICAgICBpZiAodG91Y2gudHlwZSAmJiB0b3VjaC50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0b3VjaC5lbCA9ICd0YWdOYW1lJyBpbiB0YXJnZXQgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50Tm9kZTtcblxuICAgICAgICBjbGlja1RpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KGNsaWNrVGltZW91dCk7XG5cbiAgICAgICAgdG91Y2gueDEgPSB4O1xuICAgICAgICB0b3VjaC55MSA9IHk7XG5cbiAgICAgICAgaWYgKHRvdWNoLmxhc3QgJiYgbm93IC0gdG91Y2gubGFzdCA8PSAyNTApIHtcbiAgICAgICAgICAgIHRvdWNoID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0b3VjaC50eXBlID0gdHlwZTtcbiAgICAgICAgdG91Y2gubGFzdCA9IG5vdztcblxuICAgICAgICBjbGlja2VkID0gZS5idXR0b24gPiAwO1xuXG4gICAgfSk7XG5cbiAgICBvbihkb2MsIHBvaW50ZXJNb3ZlLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWYgPSBnZXRQb3MkMShlKTtcbiAgICAgICAgdmFyIHggPSByZWYueDtcbiAgICAgICAgdmFyIHkgPSByZWYueTtcblxuICAgICAgICB0b3VjaC54MiA9IHg7XG4gICAgICAgIHRvdWNoLnkyID0geTtcblxuICAgIH0pO1xuXG4gICAgb24oZG9jLCBwb2ludGVyVXAsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cblxuICAgICAgICBpZiAodG91Y2gudHlwZSAhPT0gZ2V0VHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3dpcGVcbiAgICAgICAgaWYgKHRvdWNoLngyICYmIE1hdGguYWJzKHRvdWNoLngxIC0gdG91Y2gueDIpID4gMzAgfHwgdG91Y2gueTIgJiYgTWF0aC5hYnModG91Y2gueTEgLSB0b3VjaC55MikgPiAzMCkge1xuXG4gICAgICAgICAgICBzd2lwZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2guZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0b3VjaC5lbCwgJ3N3aXBlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodG91Y2guZWwsIChcInN3aXBlXCIgKyAoc3dpcGVEaXJlY3Rpb24odG91Y2gpKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3VjaCA9IHt9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbm9ybWFsIHRhcFxuICAgICAgICB9IGVsc2UgaWYgKCdsYXN0JyBpbiB0b3VjaCkge1xuXG4gICAgICAgICAgICB0YXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB0cmlnZ2VyKHRvdWNoLmVsLCAndGFwJyk7IH0pO1xuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHNpbmdsZSBjbGljayBhZnRlciAzNTBtcyBvZiBpbmFjdGl2aXR5XG4gICAgICAgICAgICBpZiAodG91Y2guZWwgJiYgdHlwZSAhPT0gJ21vdXNldXAnICYmIHdpdGhpbih0YXJnZXQsIHRvdWNoLmVsKSkge1xuICAgICAgICAgICAgICAgIGNsaWNrVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjbGlja1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG91Y2guZWwgJiYgIWNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodG91Y2guZWwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoID0ge307XG4gICAgICAgICAgICAgICAgfSwgMzUwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG91Y2ggPSB7fTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBvbihkb2MsICd0b3VjaGNhbmNlbCcsIGNhbmNlbEFsbCk7XG4gICAgb24od2luLCAnc2Nyb2xsJywgY2FuY2VsQWxsKTtcblxufSk7XG5cbnZhciB0b3VjaGluZyA9IGZhbHNlO1xub24oZG9jLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvdWNoaW5nID0gdHJ1ZTsgfSwgdHJ1ZSk7XG5vbihkb2MsICdjbGljaycsIGZ1bmN0aW9uICgpIHt0b3VjaGluZyA9IGZhbHNlO30pO1xub24oZG9jLCAndG91Y2hjYW5jZWwnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0b3VjaGluZyA9IGZhbHNlOyB9LCB0cnVlKTtcblxuZnVuY3Rpb24gaXNUb3VjaChlKSB7XG4gICAgcmV0dXJuIHRvdWNoaW5nIHx8IGUucG9pbnRlclR5cGUgPT09ICd0b3VjaCc7XG59XG5cbmZ1bmN0aW9uIGdldFBvcyQxKGUpIHtcbiAgICB2YXIgdG91Y2hlcyA9IGUudG91Y2hlcztcbiAgICB2YXIgY2hhbmdlZFRvdWNoZXMgPSBlLmNoYW5nZWRUb3VjaGVzO1xuICAgIHZhciByZWYgPSB0b3VjaGVzICYmIHRvdWNoZXNbMF0gfHwgY2hhbmdlZFRvdWNoZXMgJiYgY2hhbmdlZFRvdWNoZXNbMF0gfHwgZTtcbiAgICB2YXIgeCA9IHJlZi5wYWdlWDtcbiAgICB2YXIgeSA9IHJlZi5wYWdlWTtcblxuICAgIHJldHVybiB7eDogeCwgeTogeX07XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUodHlwZSkge1xuICAgIHJldHVybiB0eXBlLnNsaWNlKDAsIDUpO1xufVxuXG5cblxudmFyIHV0aWwgPSBPYmplY3QuZnJlZXplKHtcblx0YWpheDogYWpheCxcblx0dHJhbnNpdGlvbjogdHJhbnNpdGlvbixcblx0VHJhbnNpdGlvbjogVHJhbnNpdGlvbixcblx0YW5pbWF0ZTogYW5pbWF0ZSxcblx0QW5pbWF0aW9uOiBBbmltYXRpb24sXG5cdGF0dHI6IGF0dHIsXG5cdGhhc0F0dHI6IGhhc0F0dHIsXG5cdHJlbW92ZUF0dHI6IHJlbW92ZUF0dHIsXG5cdGZpbHRlckF0dHI6IGZpbHRlckF0dHIsXG5cdGRhdGE6IGRhdGEsXG5cdGFkZENsYXNzOiBhZGRDbGFzcyxcblx0cmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxuXHRyZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzLFxuXHRyZXBsYWNlQ2xhc3M6IHJlcGxhY2VDbGFzcyxcblx0aGFzQ2xhc3M6IGhhc0NsYXNzLFxuXHR0b2dnbGVDbGFzczogdG9nZ2xlQ2xhc3MsXG5cdCQ6ICQsXG5cdCQkOiAkJCxcblx0cG9zaXRpb25BdDogcG9zaXRpb25BdCxcblx0b2Zmc2V0OiBvZmZzZXQsXG5cdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0aGVpZ2h0OiBoZWlnaHQsXG5cdHdpZHRoOiB3aWR0aCxcblx0ZmxpcFBvc2l0aW9uOiBmbGlwUG9zaXRpb24sXG5cdGlzSW5WaWV3OiBpc0luVmlldyxcblx0c2Nyb2xsZWRPdmVyOiBzY3JvbGxlZE92ZXIsXG5cdGlzUmVhZHk6IGlzUmVhZHksXG5cdHJlYWR5OiByZWFkeSxcblx0aW5kZXg6IGluZGV4LFxuXHRnZXRJbmRleDogZ2V0SW5kZXgsXG5cdGVtcHR5OiBlbXB0eSxcblx0aHRtbDogaHRtbCxcblx0cHJlcGVuZDogcHJlcGVuZCxcblx0YXBwZW5kOiBhcHBlbmQsXG5cdGJlZm9yZTogYmVmb3JlLFxuXHRhZnRlcjogYWZ0ZXIsXG5cdHJlbW92ZTogcmVtb3ZlLFxuXHR3cmFwQWxsOiB3cmFwQWxsLFxuXHR3cmFwSW5uZXI6IHdyYXBJbm5lcixcblx0dW53cmFwOiB1bndyYXAsXG5cdGZyYWdtZW50OiBmcmFnbWVudCxcblx0d2luOiB3aW4sXG5cdGRvYzogZG9jLFxuXHRkb2NFbDogZG9jRWwsXG5cdGlzUnRsOiBpc1J0bCxcblx0T2JzZXJ2ZXI6IE9ic2VydmVyLFxuXHRoYXNUb3VjaDogaGFzVG91Y2gsXG5cdHBvaW50ZXJEb3duOiBwb2ludGVyRG93bixcblx0cG9pbnRlck1vdmU6IHBvaW50ZXJNb3ZlLFxuXHRwb2ludGVyVXA6IHBvaW50ZXJVcCxcblx0cG9pbnRlckVudGVyOiBwb2ludGVyRW50ZXIsXG5cdHBvaW50ZXJMZWF2ZTogcG9pbnRlckxlYXZlLFxuXHRnZXRJbWFnZTogZ2V0SW1hZ2UsXG5cdHN1cHBvcnRzOiBzdXBwb3J0cyxcblx0b246IG9uLFxuXHRvZmY6IG9mZixcblx0b25jZTogb25jZSxcblx0dHJpZ2dlcjogdHJpZ2dlcixcblx0Y3JlYXRlRXZlbnQ6IGNyZWF0ZUV2ZW50LFxuXHR0b0V2ZW50VGFyZ2V0czogdG9FdmVudFRhcmdldHMsXG5cdHByZXZlbnRDbGljazogcHJldmVudENsaWNrLFxuXHRmYXN0ZG9tOiBmYXN0ZG9tLFxuXHRpc1ZvaWRFbGVtZW50OiBpc1ZvaWRFbGVtZW50LFxuXHRpc1Zpc2libGU6IGlzVmlzaWJsZSxcblx0c2VsSW5wdXQ6IHNlbElucHV0LFxuXHRpc0lucHV0OiBpc0lucHV0LFxuXHRmaWx0ZXI6IGZpbHRlcixcblx0d2l0aGluOiB3aXRoaW4sXG5cdGJpbmQ6IGJpbmQsXG5cdGhhc093bjogaGFzT3duLFxuXHRoeXBoZW5hdGU6IGh5cGhlbmF0ZSxcblx0Y2FtZWxpemU6IGNhbWVsaXplLFxuXHR1Y2ZpcnN0OiB1Y2ZpcnN0LFxuXHRzdGFydHNXaXRoOiBzdGFydHNXaXRoLFxuXHRlbmRzV2l0aDogZW5kc1dpdGgsXG5cdGluY2x1ZGVzOiBpbmNsdWRlcyxcblx0aXNBcnJheTogaXNBcnJheSxcblx0aXNGdW5jdGlvbjogaXNGdW5jdGlvbixcblx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuXHRpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuXHRpc1dpbmRvdzogaXNXaW5kb3csXG5cdGlzRG9jdW1lbnQ6IGlzRG9jdW1lbnQsXG5cdGlzSlF1ZXJ5OiBpc0pRdWVyeSxcblx0aXNOb2RlOiBpc05vZGUsXG5cdGlzTm9kZUNvbGxlY3Rpb246IGlzTm9kZUNvbGxlY3Rpb24sXG5cdGlzQm9vbGVhbjogaXNCb29sZWFuLFxuXHRpc1N0cmluZzogaXNTdHJpbmcsXG5cdGlzTnVtYmVyOiBpc051bWJlcixcblx0aXNOdW1lcmljOiBpc051bWVyaWMsXG5cdGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcblx0dG9Cb29sZWFuOiB0b0Jvb2xlYW4sXG5cdHRvTnVtYmVyOiB0b051bWJlcixcblx0dG9GbG9hdDogdG9GbG9hdCxcblx0dG9Ob2RlOiB0b05vZGUsXG5cdHRvTm9kZXM6IHRvTm9kZXMsXG5cdHRvTGlzdDogdG9MaXN0LFxuXHR0b01zOiB0b01zLFxuXHRzd2FwOiBzd2FwLFxuXHRhc3NpZ246IGFzc2lnbixcblx0ZWFjaDogZWFjaCxcblx0c29ydEJ5OiBzb3J0QnksXG5cdGNsYW1wOiBjbGFtcCxcblx0bm9vcDogbm9vcCxcblx0aW50ZXJzZWN0UmVjdDogaW50ZXJzZWN0UmVjdCxcblx0cG9pbnRJblJlY3Q6IHBvaW50SW5SZWN0LFxuXHREaW1lbnNpb25zOiBEaW1lbnNpb25zLFxuXHRNb3VzZVRyYWNrZXI6IE1vdXNlVHJhY2tlcixcblx0bWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG5cdFBsYXllcjogUGxheWVyLFxuXHRQcm9taXNlOiBQcm9taXNlLFxuXHREZWZlcnJlZDogRGVmZXJyZWQsXG5cdHF1ZXJ5OiBxdWVyeSxcblx0cXVlcnlBbGw6IHF1ZXJ5QWxsLFxuXHRmaW5kOiBmaW5kLFxuXHRmaW5kQWxsOiBmaW5kQWxsLFxuXHRtYXRjaGVzOiBtYXRjaGVzLFxuXHRjbG9zZXN0OiBjbG9zZXN0LFxuXHRwYXJlbnRzOiBwYXJlbnRzLFxuXHRlc2NhcGU6IGVzY2FwZSxcblx0Y3NzOiBjc3MsXG5cdGdldFN0eWxlczogZ2V0U3R5bGVzLFxuXHRnZXRTdHlsZTogZ2V0U3R5bGUsXG5cdGdldENzc1ZhcjogZ2V0Q3NzVmFyLFxuXHRwcm9wTmFtZTogcHJvcE5hbWUsXG5cdGlzVG91Y2g6IGlzVG91Y2gsXG5cdGdldFBvczogZ2V0UG9zJDFcbn0pO1xuXG5mdW5jdGlvbiBjb21wb25lbnRBUEkgKFVJa2l0KSB7XG5cbiAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XG5cbiAgICBVSWtpdC5jb21wb25lbnRzID0ge307XG5cbiAgICBVSWtpdC5jb21wb25lbnQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgbmFtZSA9IGNhbWVsaXplKGlkKTtcblxuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBVSWtpdC5leHRlbmQob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBVSWtpdC5jb21wb25lbnRzW25hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy5vcHRpb25zLm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgVUlraXQuY29tcG9uZW50c1tuYW1lXSA9IG9wdGlvbnM7XG5cbiAgICAgICAgVUlraXRbbmFtZV0gPSBmdW5jdGlvbiAoZWxlbWVudCwgZGF0YSkge1xuICAgICAgICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzQXJyYXkgPSBBcnJheShpKTtcbiAgICAgICAgICAgIHdoaWxlICggaS0tICkgYXJnc0FycmF5W2ldID0gYXJndW1lbnRzW2ldO1xuXG5cbiAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSWtpdC5jb21wb25lbnRzW25hbWVdKHtkYXRhOiBlbGVtZW50fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChVSWtpdC5jb21wb25lbnRzW25hbWVdLm9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlraXQuY29tcG9uZW50c1tuYW1lXSh7ZGF0YTogW10uY29uY2F0KCBhcmdzQXJyYXkgKX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID8gaW5pdChlbGVtZW50KSA6ICQkKGVsZW1lbnQpLm1hcChpbml0KVswXTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY21wID0gVUlraXQuZ2V0Q29tcG9uZW50KGVsZW1lbnQsIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNtcCAmJiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtcC4kcmVzZXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNtcCB8fCBuZXcgVUlraXQuY29tcG9uZW50c1tuYW1lXSh7ZWw6IGVsZW1lbnQsIGRhdGE6IGRhdGEgfHwge319KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChVSWtpdC5faW5pdGlhbGl6ZWQgJiYgIW9wdGlvbnMub3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAgICAgICBmYXN0ZG9tLnJlYWQoZnVuY3Rpb24gKCkgeyByZXR1cm4gVUlraXRbbmFtZV0oKFwiW3VrLVwiICsgaWQgKyBcIl0sW2RhdGEtdWstXCIgKyBpZCArIFwiXVwiKSk7IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVJa2l0LmNvbXBvbmVudHNbbmFtZV07XG4gICAgfTtcblxuICAgIFVJa2l0LmdldENvbXBvbmVudHMgPSBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudCAmJiAoZWxlbWVudCA9IGlzSlF1ZXJ5KGVsZW1lbnQpID8gZWxlbWVudFswXSA6IGVsZW1lbnQpICYmIGVsZW1lbnRbREFUQV0gfHwge307IH07XG4gICAgVUlraXQuZ2V0Q29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHsgcmV0dXJuIFVJa2l0LmdldENvbXBvbmVudHMoZWxlbWVudClbbmFtZV07IH07XG5cbiAgICBVSWtpdC5jb25uZWN0ID0gZnVuY3Rpb24gKG5vZGUpIHtcblxuICAgICAgICBpZiAobm9kZVtEQVRBXSkge1xuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBub2RlW0RBVEFdKSB7XG4gICAgICAgICAgICAgICAgbm9kZVtEQVRBXVtuYW1lXS5fY2FsbENvbm5lY3RlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIG5hbWUkMSA9IGdldENvbXBvbmVudE5hbWUobm9kZS5hdHRyaWJ1dGVzW2ldLm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAobmFtZSQxICYmIG5hbWUkMSBpbiBVSWtpdC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgVUlraXRbbmFtZSQxXShub2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgVUlraXQuZGlzY29ubmVjdCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbm9kZVtEQVRBXSkge1xuICAgICAgICAgICAgbm9kZVtEQVRBXVtuYW1lXS5fY2FsbERpc2Nvbm5lY3RlZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxufVxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKGF0dHJpYnV0ZSkge1xuICAgIHJldHVybiBzdGFydHNXaXRoKGF0dHJpYnV0ZSwgJ3VrLScpIHx8IHN0YXJ0c1dpdGgoYXR0cmlidXRlLCAnZGF0YS11ay0nKVxuICAgICAgICA/IGNhbWVsaXplKGF0dHJpYnV0ZS5yZXBsYWNlKCdkYXRhLXVrLScsICcnKS5yZXBsYWNlKCd1ay0nLCAnJykpXG4gICAgICAgIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJvb3QgKFVJa2l0KSB7XG5cbiAgICB2YXIgY29ubmVjdCA9IFVJa2l0LmNvbm5lY3Q7XG4gICAgdmFyIGRpc2Nvbm5lY3QgPSBVSWtpdC5kaXNjb25uZWN0O1xuXG4gICAgaWYgKCFPYnNlcnZlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRvYy5ib2R5KSB7XG5cbiAgICAgICAgaW5pdCgpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAobmV3IE9ic2VydmVyKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGRvYy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pKS5vYnNlcnZlKGRvY0VsLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuXG4gICAgICAgIGFwcGx5KGRvYy5ib2R5LCBjb25uZWN0KTtcblxuICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XG5cbiAgICAgICAgKG5ldyBPYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7IHJldHVybiBtdXRhdGlvbnMuZm9yRWFjaChhcHBseU11dGF0aW9uKTsgfSkpLm9ic2VydmUoZG9jRWwsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBVSWtpdC5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5TXV0YXRpb24obXV0YXRpb24pIHtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gbXV0YXRpb24udGFyZ2V0O1xuICAgICAgICB2YXIgdHlwZSA9IG11dGF0aW9uLnR5cGU7XG5cbiAgICAgICAgdmFyIHVwZGF0ZSA9IHR5cGUgIT09ICdhdHRyaWJ1dGVzJ1xuICAgICAgICAgICAgPyBhcHBseUNoaWxkTGlzdChtdXRhdGlvbilcbiAgICAgICAgICAgIDogYXBwbHlBdHRyaWJ1dGUobXV0YXRpb24pO1xuXG4gICAgICAgIHVwZGF0ZSAmJiBVSWtpdC51cGRhdGUoJ3VwZGF0ZScsIHRhcmdldCwgdHJ1ZSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseUF0dHJpYnV0ZShyZWYpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gcmVmLmF0dHJpYnV0ZU5hbWU7XG5cblxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShhdHRyaWJ1dGVOYW1lKTtcblxuICAgICAgICBpZiAoIW5hbWUgfHwgIShuYW1lIGluIFVJa2l0LmNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzQXR0cih0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgICAgICBVSWtpdFtuYW1lXSh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tcG9uZW50ID0gVUlraXQuZ2V0Q29tcG9uZW50KHRhcmdldCwgbmFtZSk7XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29tcG9uZW50LiRkZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlDaGlsZExpc3QocmVmKSB7XG4gICAgICAgIHZhciBhZGRlZE5vZGVzID0gcmVmLmFkZGVkTm9kZXM7XG4gICAgICAgIHZhciByZW1vdmVkTm9kZXMgPSByZWYucmVtb3ZlZE5vZGVzO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcHBseShhZGRlZE5vZGVzW2ldLCBjb25uZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHJlbW92ZWROb2Rlcy5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgICAgICBhcHBseShyZW1vdmVkTm9kZXNbaSQxXSwgZGlzY29ubmVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXBwbHkobm9kZSwgZm4pIHtcblxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSB8fCBoYXNBdHRyKG5vZGUsICd1ay1uby1ib290JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZuKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBhcHBseShub2RlLCBmbik7XG4gICAgICAgICAgICBub2RlID0gbmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBnbG9iYWxBUEkgKFVJa2l0KSB7XG5cbiAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XG5cbiAgICBVSWtpdC51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG5cbiAgICAgICAgaWYgKHBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsdWdpbi5jYWxsKG51bGwsIHRoaXMpO1xuICAgICAgICBwbHVnaW4uaW5zdGFsbGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgVUlraXQubWl4aW4gPSBmdW5jdGlvbiAobWl4aW4sIGNvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQgPSAoaXNTdHJpbmcoY29tcG9uZW50KSA/IFVJa2l0LmNvbXBvbmVudHNbY29tcG9uZW50XSA6IGNvbXBvbmVudCkgfHwgdGhpcztcbiAgICAgICAgbWl4aW4gPSBtZXJnZU9wdGlvbnMoe30sIG1peGluKTtcbiAgICAgICAgbWl4aW4ubWl4aW5zID0gY29tcG9uZW50Lm9wdGlvbnMubWl4aW5zO1xuICAgICAgICBkZWxldGUgY29tcG9uZW50Lm9wdGlvbnMubWl4aW5zO1xuICAgICAgICBjb21wb25lbnQub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhtaXhpbiwgY29tcG9uZW50Lm9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBVSWtpdC5leHRlbmQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHZhciBTdXBlciA9IHRoaXM7XG4gICAgICAgIHZhciBTdWIgPSBmdW5jdGlvbiBVSWtpdENvbXBvbmVudCAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAgICAgfTtcblxuICAgICAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xuICAgICAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xuICAgICAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhTdXBlci5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICBTdWJbJ3N1cGVyJ10gPSBTdXBlcjtcbiAgICAgICAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZDtcblxuICAgICAgICByZXR1cm4gU3ViO1xuICAgIH07XG5cbiAgICBVSWtpdC51cGRhdGUgPSBmdW5jdGlvbiAoZSwgZWxlbWVudCwgcGFyZW50cykge1xuICAgICAgICBpZiAoIHBhcmVudHMgPT09IHZvaWQgMCApIHBhcmVudHMgPSBmYWxzZTtcblxuXG4gICAgICAgIGUgPSBjcmVhdGVFdmVudChlIHx8ICd1cGRhdGUnKTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcblxuICAgICAgICAgICAgdXBkYXRlKFVJa2l0Lmluc3RhbmNlcywgZSk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHBhcmVudHMpIHtcblxuICAgICAgICAgICAgZG8ge1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlKGVsZW1lbnRbREFUQV0sIGUpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgIH0gd2hpbGUgKGVsZW1lbnQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGFwcGx5KGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiB1cGRhdGUoZWxlbWVudFtEQVRBXSwgZSk7IH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgY29udGFpbmVyO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSWtpdCwgJ2NvbnRhaW5lcicsIHtcblxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXIgfHwgZG9jLmJvZHk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbWVudCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gJChlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhcHBseShub2RlLCBmbikge1xuXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmbihub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBhcHBseShub2RlLCBmbik7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZGF0YSwgZSkge1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtuYW1lXS5faXNSZWFkeSkge1xuICAgICAgICAgICAgICAgIGRhdGFbbmFtZV0uX2NhbGxVcGRhdGUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBob29rc0FQSSAoVUlraXQpIHtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbEhvb2sgPSBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuJG9wdGlvbnNbaG9va107XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiBoYW5kbGVyLmNhbGwodGhpcyQxKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9jYWxsQ29ubmVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5jbHVkZXMoVUlraXQuZWxlbWVudHMsIHRoaXMuJG9wdGlvbnMuZWwpKSB7XG4gICAgICAgICAgICBVSWtpdC5lbGVtZW50cy5wdXNoKHRoaXMuJG9wdGlvbnMuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgVUlraXQuaW5zdGFuY2VzW3RoaXMuX3VpZF0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlQ29ubmVjdCcpO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2luaXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5faW5pdE9ic2VydmVyKCk7XG5cbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNSZWFkeSkge1xuICAgICAgICAgICAgcmVhZHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl9jYWxsUmVhZHkoKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWxsVXBkYXRlKCk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbERpc2Nvbm5lY3RlZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2JlZm9yZURpc2Nvbm5lY3QnKTtcblxuICAgICAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IFVJa2l0LmVsZW1lbnRzLmluZGV4T2YodGhpcy4kb3B0aW9ucy5lbCk7XG5cbiAgICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICAgICAgVUlraXQuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBVSWtpdC5pbnN0YW5jZXNbdGhpcy5fdWlkXTtcblxuICAgICAgICB0aGlzLl91bmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2Rpc2Nvbm5lY3RlZCcpO1xuXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbFJlYWR5ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q29tcHV0ZWRzKCk7XG4gICAgICAgIHRoaXMuX2NhbGxVcGRhdGUoKTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9jYWxsVXBkYXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICBlID0gY3JlYXRlRXZlbnQoZSB8fCAndXBkYXRlJyk7XG5cbiAgICAgICAgdmFyIHR5cGUgPSBlLnR5cGU7XG5cbiAgICAgICAgaWYgKGluY2x1ZGVzKFsndXBkYXRlJywgJ2xvYWQnLCAncmVzaXplJ10sIHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldENvbXB1dGVkcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVwZGF0ZXMgPSB0aGlzLiRvcHRpb25zLnVwZGF0ZTtcbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuX2ZyYW1lcztcbiAgICAgICAgdmFyIHJlYWRzID0gcmVmLnJlYWRzO1xuICAgICAgICB2YXIgd3JpdGVzID0gcmVmLndyaXRlcztcblxuICAgICAgICBpZiAoIXVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAocmVmLCBpKSB7XG4gICAgICAgICAgICB2YXIgcmVhZCA9IHJlZi5yZWFkO1xuICAgICAgICAgICAgdmFyIHdyaXRlID0gcmVmLndyaXRlO1xuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHJlZi5ldmVudHM7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGUgIT09ICd1cGRhdGUnICYmICFpbmNsdWRlcyhldmVudHMsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVhZCAmJiAhaW5jbHVkZXMoZmFzdGRvbS5yZWFkcywgcmVhZHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmVhZHNbaV0gPSBmYXN0ZG9tLnJlYWQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZWFkLmNhbGwodGhpcyQxLCB0aGlzJDEuX2RhdGEsIGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlICYmIHdyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYXN0ZG9tLmNsZWFyKHdyaXRlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgd3JpdGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduKHRoaXMkMS5fZGF0YSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVhZHNbaV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3cml0ZSAmJiAhaW5jbHVkZXMoZmFzdGRvbS53cml0ZXMsIHdyaXRlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXNbaV0gPSBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGUuY2FsbCh0aGlzJDEsIHRoaXMkMS5fZGF0YSwgZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB3cml0ZXNbaV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIHN0YXRlQVBJIChVSWtpdCkge1xuXG4gICAgdmFyIHVpZCA9IDA7XG5cbiAgICBVSWtpdC5wcm90b3R5cGUucHJvcHMgPSB7fTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMuY29uc3RydWN0b3Iub3B0aW9ucywgb3B0aW9ucywgdGhpcyk7XG5cbiAgICAgICAgdGhpcy4kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRuYW1lID0gVUlraXQucHJlZml4ICsgaHlwaGVuYXRlKHRoaXMuJG9wdGlvbnMubmFtZSk7XG4gICAgICAgIHRoaXMuJHByb3BzID0ge307XG5cbiAgICAgICAgdGhpcy5fZnJhbWVzID0ge3JlYWRzOiB7fSwgd3JpdGVzOiB7fX07XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3VpZCA9IHVpZCsrO1xuICAgICAgICB0aGlzLl9pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLl9pbml0TWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9pbml0Q29tcHV0ZWRzKCk7XG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdjcmVhdGVkJyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vdW50KG9wdGlvbnMuZWwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHJlZi5kZWZhdWx0cztcbiAgICAgICAgdmFyIGRhdGEkJDEgPSByZWYuZGF0YTsgaWYgKCBkYXRhJCQxID09PSB2b2lkIDAgKSBkYXRhJCQxID0ge307XG4gICAgICAgIHZhciBhcmdzID0gcmVmLmFyZ3M7IGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xuICAgICAgICB2YXIgcHJvcHMgPSByZWYucHJvcHM7IGlmICggcHJvcHMgPT09IHZvaWQgMCApIHByb3BzID0ge307XG4gICAgICAgIHZhciBlbCA9IHJlZi5lbDtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggJiYgaXNBcnJheShkYXRhJCQxKSkge1xuICAgICAgICAgICAgZGF0YSQkMSA9IGRhdGEkJDEuc2xpY2UoMCwgYXJncy5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbiAoZGF0YSQkMSwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbihkYXRhJCQxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSQkMVthcmdzW2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEkJDE7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXNzaWduKHt9LCBkZWZhdWx0cywgcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzJDEuJHByb3BzW2tleV0gPSB0aGlzJDFba2V5XSA9IGhhc093bihkYXRhJCQxLCBrZXkpICYmICFpc1VuZGVmaW5lZChkYXRhJCQxW2tleV0pXG4gICAgICAgICAgICAgICAgPyBjb2VyY2UocHJvcHNba2V5XSwgZGF0YSQkMVtrZXldLCBlbClcbiAgICAgICAgICAgICAgICA6IGRlZmF1bHRzXG4gICAgICAgICAgICAgICAgICAgID8gZGVmYXVsdHNba2V5XSAmJiBpc0FycmF5KGRlZmF1bHRzW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGRlZmF1bHRzW2tleV0uY29uY2F0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdHNba2V5XVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgdmFyIG1ldGhvZHMgPSByZWYubWV0aG9kcztcblxuICAgICAgICBpZiAobWV0aG9kcykge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzJDFba2V5XSA9IGJpbmQobWV0aG9kc1trZXldLCB0aGlzJDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdENvbXB1dGVkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgdmFyIGNvbXB1dGVkID0gcmVmLmNvbXB1dGVkO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q29tcHV0ZWRzKCk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlckNvbXB1dGVkKHRoaXMkMSwga2V5LCBjb21wdXRlZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX3Jlc2V0Q29tcHV0ZWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb21wdXRlZHMgPSB7fTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0UHJvcHMgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q29tcHV0ZWRzKCk7XG5cbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCBnZXRQcm9wcyh0aGlzLiRvcHRpb25zLCB0aGlzLiRuYW1lKTtcblxuICAgICAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChwcm9wc1trZXldKSkge1xuICAgICAgICAgICAgICAgIHRoaXMkMS4kcHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhjbHVkZSA9IFt0aGlzLiRvcHRpb25zLmNvbXB1dGVkLCB0aGlzLiRvcHRpb25zLm1ldGhvZHNdO1xuICAgICAgICBmb3IgKGtleSBpbiB0aGlzJDEuJHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHByb3BzICYmIG5vdEluKGV4Y2x1ZGUsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzJDFba2V5XSA9IHRoaXMkMS4kcHJvcHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2luaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBldmVudHMgPSByZWYuZXZlbnRzO1xuXG4gICAgICAgIGlmIChldmVudHMpIHtcblxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihldmVudCwgJ2hhbmRsZXInKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRXZlbnQodGhpcyQxLCBldmVudFtrZXldLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudCh0aGlzJDEsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fdW5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAodW5iaW5kKSB7IHJldHVybiB1bmJpbmQoKTsgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2luaXRPYnNlcnZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICAgICAgICB2YXIgcHJvcHMgPSByZWYucHJvcHM7XG4gICAgICAgIHZhciBlbCA9IHJlZi5lbDtcbiAgICAgICAgaWYgKHRoaXMuX29ic2VydmVyIHx8ICFwcm9wcyB8fCAhYXR0cnMgfHwgIU9ic2VydmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhdHRycyA9IGlzQXJyYXkoYXR0cnMpID8gYXR0cnMgOiBPYmplY3Qua2V5cyhwcm9wcykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGh5cGhlbmF0ZShrZXkpOyB9KTtcblxuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBPYnNlcnZlcihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBkYXRhJCQxID0gZ2V0UHJvcHModGhpcyQxLiRvcHRpb25zLCB0aGlzJDEuJG5hbWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJzLnNvbWUoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gIWlzVW5kZWZpbmVkKGRhdGEkJDFba2V5XSkgJiYgZGF0YSQkMVtrZXldICE9PSB0aGlzJDEuJHByb3BzW2tleV07IH0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcyQxLiRyZXNldChkYXRhJCQxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKGVsLCB7YXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBhdHRycy5jb25jYXQoW3RoaXMuJG5hbWUsIChcImRhdGEtXCIgKyAodGhpcy4kbmFtZSkpXSl9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcHMob3B0cywgbmFtZSkge1xuXG4gICAgICAgIHZhciBkYXRhJCQxID0ge307XG4gICAgICAgIHZhciBhcmdzID0gb3B0cy5hcmdzOyBpZiAoIGFyZ3MgPT09IHZvaWQgMCApIGFyZ3MgPSBbXTtcbiAgICAgICAgdmFyIHByb3BzID0gb3B0cy5wcm9wczsgaWYgKCBwcm9wcyA9PT0gdm9pZCAwICkgcHJvcHMgPSB7fTtcbiAgICAgICAgdmFyIGVsID0gb3B0cy5lbDtcblxuICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YSQkMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChoYXNBdHRyKGVsLCBwcm9wKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29lcmNlKHByb3BzW2tleV0sIGF0dHIoZWwsIHByb3ApLCBlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3RhcmdldCcgJiYgKCF2YWx1ZSB8fCBzdGFydHNXaXRoKHZhbHVlLCAnXycpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXRhJCQxW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcHRpb25zID0gcGFyc2VPcHRpb25zKGRhdGEoZWwsIG5hbWUpLCBhcmdzKTtcblxuICAgICAgICBmb3IgKHZhciBrZXkkMSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCQxID0gY2FtZWxpemUoa2V5JDEpO1xuICAgICAgICAgICAgaWYgKHByb3BzW3Byb3AkMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGEkJDFbcHJvcCQxXSA9IGNvZXJjZShwcm9wc1twcm9wJDFdLCBvcHRpb25zW2tleSQxXSwgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGEkJDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VPcHRpb25zKG9wdGlvbnMsIGFyZ3MpIHtcbiAgICAgICAgdmFyIG9iajtcblxuICAgICAgICBpZiAoIGFyZ3MgPT09IHZvaWQgMCApIGFyZ3MgPSBbXTtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICByZXR1cm4gIW9wdGlvbnNcbiAgICAgICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICAgICAgOiBzdGFydHNXaXRoKG9wdGlvbnMsICd7JylcbiAgICAgICAgICAgICAgICAgICAgPyBKU09OLnBhcnNlKG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIDogYXJncy5sZW5ndGggJiYgIWluY2x1ZGVzKG9wdGlvbnMsICc6JylcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKCggb2JqID0ge30sIG9ialthcmdzWzBdXSA9IG9wdGlvbnMsIG9iaikpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnMuc3BsaXQoJzsnKS5yZWR1Y2UoZnVuY3Rpb24gKG9wdGlvbnMsIG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBvcHRpb24uc3BsaXQoLzooLispLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHJlZlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZWZbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleS50cmltKCldID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcHV0ZWQoY29tcG9uZW50LCBrZXksIGNiKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wb25lbnQsIGtleSwge1xuXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBfY29tcHV0ZWRzID0gY29tcG9uZW50Ll9jb21wdXRlZHM7XG4gICAgICAgICAgICAgICAgdmFyICRwcm9wcyA9IGNvbXBvbmVudC4kcHJvcHM7XG4gICAgICAgICAgICAgICAgdmFyICRlbCA9IGNvbXBvbmVudC4kZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihfY29tcHV0ZWRzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb21wdXRlZHNba2V5XSA9IGNiLmNhbGwoY29tcG9uZW50LCAkcHJvcHMsICRlbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb21wdXRlZHNba2V5XTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Ll9jb21wdXRlZHNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQoY29tcG9uZW50LCBldmVudCwga2V5KSB7XG5cbiAgICAgICAgaWYgKCFpc1BsYWluT2JqZWN0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQgPSAoe25hbWU6IGtleSwgaGFuZGxlcjogZXZlbnR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuYW1lID0gZXZlbnQubmFtZTtcbiAgICAgICAgdmFyIGVsID0gZXZlbnQuZWw7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZXZlbnQuaGFuZGxlcjtcbiAgICAgICAgdmFyIGNhcHR1cmUgPSBldmVudC5jYXB0dXJlO1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBldmVudC5kZWxlZ2F0ZTtcbiAgICAgICAgdmFyIGZpbHRlciA9IGV2ZW50LmZpbHRlcjtcbiAgICAgICAgdmFyIHNlbGYgPSBldmVudC5zZWxmO1xuICAgICAgICBlbCA9IGlzRnVuY3Rpb24oZWwpXG4gICAgICAgICAgICA/IGVsLmNhbGwoY29tcG9uZW50KVxuICAgICAgICAgICAgOiBlbCB8fCBjb21wb25lbnQuJGVsO1xuXG4gICAgICAgIGlmIChpc0FycmF5KGVsKSkge1xuICAgICAgICAgICAgZWwuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHJlZ2lzdGVyRXZlbnQoY29tcG9uZW50LCBhc3NpZ24oe30sIGV2ZW50LCB7ZWw6IGVsfSksIGtleSk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlbCB8fCBmaWx0ZXIgJiYgIWZpbHRlci5jYWxsKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhbmRsZXIgPSBkZXRhaWwoaXNTdHJpbmcoaGFuZGxlcikgPyBjb21wb25lbnRbaGFuZGxlcl0gOiBiaW5kKGhhbmRsZXIsIGNvbXBvbmVudCkpO1xuXG4gICAgICAgIGlmIChzZWxmKSB7XG4gICAgICAgICAgICBoYW5kbGVyID0gc2VsZkZpbHRlcihoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudC5fZXZlbnRzLnB1c2goXG4gICAgICAgICAgICBvbihcbiAgICAgICAgICAgICAgICBlbCxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICFkZWxlZ2F0ZVxuICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgOiBpc1N0cmluZyhkZWxlZ2F0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZGVsZWdhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZGVsZWdhdGUuY2FsbChjb21wb25lbnQpLFxuICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgY2FwdHVyZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZkZpbHRlcihoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZWxmSGFuZGxlcihlKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldCA9PT0gZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbChudWxsLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RJbihvcHRpb25zLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXZlcnkoZnVuY3Rpb24gKGFycikgeyByZXR1cm4gIWFyciB8fCAhaGFzT3duKGFyciwga2V5KTsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGV0YWlsKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gaXNBcnJheShlLmRldGFpbCkgPyBsaXN0ZW5lci5hcHBseSh2b2lkIDAsIFtlXS5jb25jYXQoZS5kZXRhaWwpKSA6IGxpc3RlbmVyKGUpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvZXJjZSh0eXBlLCB2YWx1ZSwgY29udGV4dCkge1xuXG4gICAgICAgIGlmICh0eXBlID09PSBCb29sZWFuKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0b051bWJlcih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3F1ZXJ5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5KHZhbHVlLCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0b0xpc3QodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgICAgIHJldHVybiB0b01lZGlhKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0eXBlID8gdHlwZSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b01lZGlhKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlWzBdID09PSAnQCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwibWVkaWEtXCIgKyAodmFsdWUuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvRmxvYXQoZ2V0Q3NzVmFyKG5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlICYmICFpc05hTih2YWx1ZSkgPyAoXCIobWluLXdpZHRoOiBcIiArIHZhbHVlICsgXCJweClcIikgOiBmYWxzZTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaW5zdGFuY2VBUEkgKFVJa2l0KSB7XG5cbiAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBuYW1lID0gcmVmLm5hbWU7XG5cbiAgICAgICAgaWYgKCFlbFtEQVRBXSkge1xuICAgICAgICAgICAgZWxbREFUQV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbFtEQVRBXVtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxbREFUQV1bbmFtZV0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGVsID0gdGhpcy4kb3B0aW9ucy5lbCA9IHRoaXMuJG9wdGlvbnMuZWwgfHwgZWw7XG5cbiAgICAgICAgdGhpcy5faW5pdFByb3BzKCk7XG5cbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2luaXQnKTtcblxuICAgICAgICBpZiAod2l0aGluKGVsLCBkb2NFbCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxDb25uZWN0ZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLl9jYWxsVXBkYXRlKGUpO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJHVwZGF0ZSA9IGZ1bmN0aW9uIChlLCBwYXJlbnRzKSB7XG4gICAgICAgIFVJa2l0LnVwZGF0ZShlLCB0aGlzLiRvcHRpb25zLmVsLCBwYXJlbnRzKTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLiRyZXNldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NhbGxEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5faW5pdFByb3BzKGRhdGEpO1xuICAgICAgICB0aGlzLl9jYWxsQ29ubmVjdGVkKCk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmVFbCkge1xuICAgICAgICBpZiAoIHJlbW92ZUVsID09PSB2b2lkIDAgKSByZW1vdmVFbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBlbCA9IHJlZi5lbDtcbiAgICAgICAgdmFyIG5hbWUgPSByZWYubmFtZTtcblxuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgaWYgKCFlbCB8fCAhZWxbREFUQV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBlbFtEQVRBXVtuYW1lXTtcblxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGVsW0RBVEFdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbFtEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW1vdmVFbCkge1xuICAgICAgICAgICAgcmVtb3ZlKHRoaXMuJGVsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn1cblxudmFyIFVJa2l0JDIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG59O1xuXG5VSWtpdCQyLnV0aWwgPSB1dGlsO1xuVUlraXQkMi5kYXRhID0gJ19fdWlraXRfXyc7XG5VSWtpdCQyLnByZWZpeCA9ICd1ay0nO1xuVUlraXQkMi5vcHRpb25zID0ge307XG5VSWtpdCQyLmluc3RhbmNlcyA9IHt9O1xuVUlraXQkMi5lbGVtZW50cyA9IFtdO1xuXG5nbG9iYWxBUEkoVUlraXQkMik7XG5ob29rc0FQSShVSWtpdCQyKTtcbnN0YXRlQVBJKFVJa2l0JDIpO1xuaW5zdGFuY2VBUEkoVUlraXQkMik7XG5jb21wb25lbnRBUEkoVUlraXQkMik7XG5cbnZhciBDbGFzcyA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLiRuYW1lKTtcbiAgICB9XG5cbn07XG5cbnZhciBDb250YWluZXIgPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBjb250YWluZXI6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY29udGFpbmVyOiB0cnVlXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY29udGFpbmVyOiBmdW5jdGlvbiBjb250YWluZXIocmVmKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcmVmLmNvbnRhaW5lcjtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lciA9PT0gdHJ1ZSAmJiBVSWtpdCQyLmNvbnRhaW5lciB8fCBjb250YWluZXIgJiYgJChjb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbnZhciBUb2dnbGFibGUgPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBjbHM6IEJvb2xlYW4sXG4gICAgICAgIGFuaW1hdGlvbjogJ2xpc3QnLFxuICAgICAgICBkdXJhdGlvbjogTnVtYmVyLFxuICAgICAgICBvcmlnaW46IFN0cmluZyxcbiAgICAgICAgdHJhbnNpdGlvbjogU3RyaW5nLFxuICAgICAgICBxdWV1ZWQ6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY2xzOiBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uOiBbZmFsc2VdLFxuICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICBvcmlnaW46IGZhbHNlLFxuICAgICAgICB0cmFuc2l0aW9uOiAnbGluZWFyJyxcbiAgICAgICAgcXVldWVkOiBmYWxzZSxcblxuICAgICAgICBpbml0UHJvcHM6IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogJycsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnJyxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJydcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlUHJvcHM6IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGhhc0FuaW1hdGlvbjogZnVuY3Rpb24gaGFzQW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XG5cbiAgICAgICAgICAgIHJldHVybiAhIWFuaW1hdGlvblswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNUcmFuc2l0aW9uOiBmdW5jdGlvbiBoYXNUcmFuc2l0aW9uKHJlZikge1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc0FuaW1hdGlvbiAmJiBhbmltYXRpb25bMF0gPT09IHRydWU7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgdG9nZ2xlRWxlbWVudDogZnVuY3Rpb24gdG9nZ2xlRWxlbWVudCh0YXJnZXRzLCBzaG93LCBhbmltYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdG9Ob2Rlcyh0YXJnZXRzKTtcblxuICAgICAgICAgICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbiAodGFyZ2V0cykgeyByZXR1cm4gUHJvbWlzZS5hbGwodGFyZ2V0cy5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGFuaW1hdGUpOyB9KSk7IH07XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZWQgPSB0YXJnZXRzLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRoaXMkMS5pc1RvZ2dsZWQoZWwpOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdW50b2dnbGVkID0gdGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhaW5jbHVkZXModG9nZ2xlZCwgZWwpOyB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEucXVldWVkIHx8ICFpc1VuZGVmaW5lZChhbmltYXRlKSB8fCAhaXNVbmRlZmluZWQoc2hvdykgfHwgIXRoaXMkMS5oYXNBbmltYXRpb24gfHwgdGFyZ2V0cy5sZW5ndGggPCAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcCA9IGFsbCh1bnRvZ2dsZWQuY29uY2F0KHRvZ2dsZWQpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9IGJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0b2dnbGVkWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5Qcm9ncmVzcyA9IEFuaW1hdGlvbi5pblByb2dyZXNzKGVsKSAmJiBoYXNDbGFzcyhlbCwgJ3VrLWFuaW1hdGlvbi1sZWF2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgVHJhbnNpdGlvbi5pblByb2dyZXNzKGVsKSAmJiBlbC5zdHlsZS5oZWlnaHQgPT09ICcwcHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIHAgPSBhbGwodG9nZ2xlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGFsbCh1bnRvZ2dsZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHAudGhlbihyZXNvbHZlLCBub29wKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlTm93OiBmdW5jdGlvbiB0b2dnbGVOb3codGFyZ2V0cywgc2hvdykge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gUHJvbWlzZS5hbGwodG9Ob2Rlcyh0YXJnZXRzKS5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGZhbHNlKTsgfSkpLnRoZW4ocmVzb2x2ZSwgbm9vcCk7IH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzVG9nZ2xlZDogZnVuY3Rpb24gaXNUb2dnbGVkKGVsKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB0b05vZGVzKGVsIHx8IHRoaXMuJGVsKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsc1xuICAgICAgICAgICAgICAgID8gaGFzQ2xhc3Mobm9kZXMsIHRoaXMuY2xzLnNwbGl0KCcgJylbMF0pXG4gICAgICAgICAgICAgICAgOiAhaGFzQXR0cihub2RlcywgJ2hpZGRlbicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZUFyaWE6IGZ1bmN0aW9uIHVwZGF0ZUFyaWEoZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNscyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhdHRyKGVsLCAnYXJpYS1oaWRkZW4nLCAhdGhpcy5pc1RvZ2dsZWQoZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlRWxlbWVudDogZnVuY3Rpb24gX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHNob3cgPSBpc0Jvb2xlYW4oc2hvdylcbiAgICAgICAgICAgICAgICA/IHNob3dcbiAgICAgICAgICAgICAgICA6IEFuaW1hdGlvbi5pblByb2dyZXNzKGVsKVxuICAgICAgICAgICAgICAgICAgICA/IGhhc0NsYXNzKGVsLCAndWstYW5pbWF0aW9uLWxlYXZlJylcbiAgICAgICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uLmluUHJvZ3Jlc3MoZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGVsLnN0eWxlLmhlaWdodCA9PT0gJzBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogIXRoaXMuaXNUb2dnbGVkKGVsKTtcblxuICAgICAgICAgICAgaWYgKCF0cmlnZ2VyKGVsLCAoXCJiZWZvcmVcIiArIChzaG93ID8gJ3Nob3cnIDogJ2hpZGUnKSksIFt0aGlzXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSAoYW5pbWF0ZSA9PT0gZmFsc2UgfHwgIXRoaXMuaGFzQW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgPyB0aGlzLl90b2dnbGVJbW1lZGlhdGVcbiAgICAgICAgICAgICAgICA6IHRoaXMuaGFzVHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX3RvZ2dsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX3RvZ2dsZUFuaW1hdGlvblxuICAgICAgICAgICAgKShlbCwgc2hvdyk7XG5cbiAgICAgICAgICAgIHRyaWdnZXIoZWwsIHNob3cgPyAnc2hvdycgOiAnaGlkZScsIFt0aGlzXSk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsIHNob3cgPyAnc2hvd24nIDogJ2hpZGRlbicsIFt0aGlzJDFdKTtcbiAgICAgICAgICAgICAgICBVSWtpdCQyLnVwZGF0ZShudWxsLCBlbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlOiBmdW5jdGlvbiBfdG9nZ2xlKGVsLCB0b2dnbGVkKSB7XG5cbiAgICAgICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNscykge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCB0aGlzLmNscywgaW5jbHVkZXModGhpcy5jbHMsICcgJykgPyB1bmRlZmluZWQgOiB0b2dnbGVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0cihlbCwgJ2hpZGRlbicsICF0b2dnbGVkID8gJycgOiBudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCQoJ1thdXRvZm9jdXNdJywgZWwpLnNvbWUoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBpc1Zpc2libGUoZWwpICYmIChlbC5mb2N1cygpIHx8IHRydWUpOyB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVBcmlhKGVsKTtcbiAgICAgICAgICAgIFVJa2l0JDIudXBkYXRlKG51bGwsIGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlSW1tZWRpYXRlOiBmdW5jdGlvbiBfdG9nZ2xlSW1tZWRpYXRlKGVsLCBzaG93KSB7XG4gICAgICAgICAgICB0aGlzLl90b2dnbGUoZWwsIHNob3cpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90b2dnbGVIZWlnaHQ6IGZ1bmN0aW9uIF90b2dnbGVIZWlnaHQoZWwsIHNob3cpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHZhciBpblByb2dyZXNzID0gVHJhbnNpdGlvbi5pblByb2dyZXNzKGVsKTtcbiAgICAgICAgICAgIHZhciBpbm5lciA9IGVsLmhhc0NoaWxkTm9kZXMgPyB0b0Zsb2F0KGNzcyhlbC5maXJzdEVsZW1lbnRDaGlsZCwgJ21hcmdpblRvcCcpKSArIHRvRmxvYXQoY3NzKGVsLmxhc3RFbGVtZW50Q2hpbGQsICdtYXJnaW5Cb3R0b20nKSkgOiAwO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRIZWlnaHQgPSBpc1Zpc2libGUoZWwpID8gaGVpZ2h0KGVsKSArIChpblByb2dyZXNzID8gMCA6IGlubmVyKSA6IDA7XG5cbiAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKGVsKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9nZ2xlZChlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGUoZWwsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWlnaHQoZWwsICcnKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGNoaWxkIGNvbXBvbmVudHMgZmlyc3RcbiAgICAgICAgICAgIGZhc3Rkb20uZmx1c2goKTtcblxuICAgICAgICAgICAgdmFyIGVuZEhlaWdodCA9IGhlaWdodChlbCkgKyAoaW5Qcm9ncmVzcyA/IDAgOiBpbm5lcik7XG4gICAgICAgICAgICBoZWlnaHQoZWwsIGN1cnJlbnRIZWlnaHQpO1xuXG4gICAgICAgICAgICByZXR1cm4gKHNob3dcbiAgICAgICAgICAgICAgICA/IFRyYW5zaXRpb24uc3RhcnQoZWwsIGFzc2lnbih7fSwgdGhpcy5pbml0UHJvcHMsIHtvdmVyZmxvdzogJ2hpZGRlbicsIGhlaWdodDogZW5kSGVpZ2h0fSksIE1hdGgucm91bmQodGhpcy5kdXJhdGlvbiAqICgxIC0gY3VycmVudEhlaWdodCAvIGVuZEhlaWdodCkpLCB0aGlzLnRyYW5zaXRpb24pXG4gICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uLnN0YXJ0KGVsLCB0aGlzLmhpZGVQcm9wcywgTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uICogKGN1cnJlbnRIZWlnaHQgLyBlbmRIZWlnaHQpKSwgdGhpcy50cmFuc2l0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5fdG9nZ2xlKGVsLCBmYWxzZSk7IH0pXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gY3NzKGVsLCB0aGlzJDEuaW5pdFByb3BzKTsgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlQW5pbWF0aW9uOiBmdW5jdGlvbiBfdG9nZ2xlQW5pbWF0aW9uKGVsLCBzaG93KSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBBbmltYXRpb24uY2FuY2VsKGVsKTtcblxuICAgICAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGUoZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBbmltYXRpb24uaW4oZWwsIHRoaXMuYW5pbWF0aW9uWzBdLCB0aGlzLmR1cmF0aW9uLCB0aGlzLm9yaWdpbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBBbmltYXRpb24ub3V0KGVsLCB0aGlzLmFuaW1hdGlvblsxXSB8fCB0aGlzLmFuaW1hdGlvblswXSwgdGhpcy5kdXJhdGlvbiwgdGhpcy5vcmlnaW4pLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl90b2dnbGUoZWwsIGZhbHNlKTsgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxudmFyIGFjdGl2ZTtcblxudmFyIE1vZGFsID0ge1xuXG4gICAgbWl4aW5zOiBbQ2xhc3MsIENvbnRhaW5lciwgVG9nZ2xhYmxlXSxcblxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsc1BhbmVsOiBTdHJpbmcsXG4gICAgICAgIHNlbENsb3NlOiBTdHJpbmcsXG4gICAgICAgIGVzY0Nsb3NlOiBCb29sZWFuLFxuICAgICAgICBiZ0Nsb3NlOiBCb29sZWFuLFxuICAgICAgICBzdGFjazogQm9vbGVhblxuICAgIH0sXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBjbHM6ICd1ay1vcGVuJyxcbiAgICAgICAgZXNjQ2xvc2U6IHRydWUsXG4gICAgICAgIGJnQ2xvc2U6IHRydWUsXG4gICAgICAgIG92ZXJsYXk6IHRydWUsXG4gICAgICAgIHN0YWNrOiBmYWxzZVxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHBhbmVsOiBmdW5jdGlvbiBwYW5lbChyZWYsICRlbCkge1xuICAgICAgICAgICAgdmFyIGNsc1BhbmVsID0gcmVmLmNsc1BhbmVsO1xuXG4gICAgICAgICAgICByZXR1cm4gJCgoXCIuXCIgKyBjbHNQYW5lbCksICRlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNpdGlvbkVsZW1lbnQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25FbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBmdW5jdGlvbiB0cmFuc2l0aW9uRHVyYXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9Ncyhjc3ModGhpcy50cmFuc2l0aW9uRWxlbWVudCwgJ3RyYW5zaXRpb25EdXJhdGlvbicpKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGV2ZW50czogW1xuXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbENsb3NlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuXG4gICAgICAgICAgICBuYW1lOiAndG9nZ2xlJyxcblxuICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzaG93JyxcblxuICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMgJiYgYWN0aXZlO1xuXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldi5oaWRlKCkudGhlbih0aGlzLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudHMoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2JlZm9yZWhpZGUnLFxuXG4gICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gYWN0aXZlICYmIGFjdGl2ZSAhPT0gdGhpcyAmJiBhY3RpdmUgfHwgdGhpcy5wcmV2O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVyZWdpc3RlckV2ZW50cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuXG4gICAgICAgICAgICBuYW1lOiAnc2hvdycsXG5cbiAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc0NsYXNzKGRvY0VsLCB0aGlzLmNsc1BhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB3aWR0aCh3aW4pIC0gZG9jRWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhkb2MuYm9keSwgJ292ZXJmbG93WScsIHRoaXMuc2Nyb2xsYmFyV2lkdGggJiYgdGhpcy5vdmVybGF5ID8gJ3Njcm9sbCcgOiAnJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jRWwsIHRoaXMuY2xzUGFnZSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbmFtZTogJ2hpZGRlbicsXG5cbiAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBmb3VuZDtcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHJlZi5wcmV2O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHByZXYpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldi5jbHNQYWdlID09PSB0aGlzJDEuY2xzUGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcHJldi5wcmV2O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICF0aGlzLnByZXYgJiYgY3NzKGRvYy5ib2R5LCAnb3ZlcmZsb3dZJywgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIF0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLiRlbC5wYXJlbnROb2RlICE9PSB0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGFwcGVuZCh0aGlzLmNvbnRhaW5lciwgdGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxDb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlTm93KHRoaXMuJGVsLCB0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVOb3codGhpcy4kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRBY3RpdmU6IGZ1bmN0aW9uIGdldEFjdGl2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZUltbWVkaWF0ZTogZnVuY3Rpb24gX3RvZ2dsZUltbWVkaWF0ZShlbCwgc2hvdykge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl90b2dnbGUoZWwsIHNob3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEudHJhbnNpdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlKHRoaXMkMS50cmFuc2l0aW9uRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCByZXNvbHZlLCBmYWxzZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudGFyZ2V0ID09PSB0aGlzJDEudHJhbnNpdGlvbkVsZW1lbnQ7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxudmFyIGV2ZW50cztcblxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudHMoKSB7XG5cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudHMgPSBbXG4gICAgICAgIG9uKGRvY0VsLCAnY2xpY2snLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gcmVmLmRlZmF1bHRQcmV2ZW50ZWQ7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmUgJiYgYWN0aXZlLmJnQ2xvc2UgJiYgIWRlZmF1bHRQcmV2ZW50ZWQgJiYgIXdpdGhpbih0YXJnZXQsIChhY3RpdmUucGFuZWwgfHwgYWN0aXZlLiRlbCkpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG9uKGRvYywgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgYWN0aXZlICYmIGFjdGl2ZS5lc2NDbG9zZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIGRlcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgZXZlbnRzICYmIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh1bmJpbmQpIHsgcmV0dXJuIHVuYmluZCgpOyB9KTtcbiAgICBldmVudHMgPSBudWxsO1xufVxuXG52YXIgUG9zaXRpb24gPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBwb3M6IFN0cmluZyxcbiAgICAgICAgb2Zmc2V0OiBudWxsLFxuICAgICAgICBmbGlwOiBCb29sZWFuLFxuICAgICAgICBjbHNQb3M6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBwb3M6IChcImJvdHRvbS1cIiArICghaXNSdGwgPyAnbGVmdCcgOiAncmlnaHQnKSksXG4gICAgICAgIGZsaXA6IHRydWUsXG4gICAgICAgIG9mZnNldDogZmFsc2UsXG4gICAgICAgIGNsc1BvczogJydcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBwb3M6IGZ1bmN0aW9uIHBvcyhyZWYpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSByZWYucG9zO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvcyArICghaW5jbHVkZXMocG9zLCAnLScpID8gJy1jZW50ZXInIDogJycpKS5zcGxpdCgnLScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpcjogZnVuY3Rpb24gZGlyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFsaWduOiBmdW5jdGlvbiBhbGlnbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc1sxXTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBwb3NpdGlvbkF0OiBmdW5jdGlvbiBwb3NpdGlvbkF0JDEoZWxlbWVudCwgdGFyZ2V0LCBib3VuZGFyeSkge1xuXG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKGVsZW1lbnQsICgodGhpcy5jbHNQb3MpICsgXCItKHRvcHxib3R0b218bGVmdHxyaWdodCkoLVthLXpdKyk/XCIpKTtcbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCB7dG9wOiAnJywgbGVmdDogJyd9KTtcblxuICAgICAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBvZmZzZXQkJDEgPSByZWYub2Zmc2V0O1xuXG4gICAgICAgICAgICBvZmZzZXQkJDEgPSBpc051bWVyaWMob2Zmc2V0JCQxKVxuICAgICAgICAgICAgICAgID8gb2Zmc2V0JCQxXG4gICAgICAgICAgICAgICAgOiAobm9kZSA9ICQob2Zmc2V0JCQxKSlcbiAgICAgICAgICAgICAgICAgICAgPyBvZmZzZXQobm9kZSlbYXhpcyA9PT0gJ3gnID8gJ2xlZnQnIDogJ3RvcCddIC0gb2Zmc2V0KHRhcmdldClbYXhpcyA9PT0gJ3gnID8gJ3JpZ2h0JyA6ICdib3R0b20nXVxuICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgICAgIHZhciBheGlzID0gdGhpcy5nZXRBeGlzKCk7XG4gICAgICAgICAgICB2YXIgcmVmJDEgPSBwb3NpdGlvbkF0KFxuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGF4aXMgPT09ICd4JyA/ICgoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkgKyBcIiBcIiArICh0aGlzLmFsaWduKSkgOiAoKHRoaXMuYWxpZ24pICsgXCIgXCIgKyAoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkpLFxuICAgICAgICAgICAgICAgIGF4aXMgPT09ICd4JyA/ICgodGhpcy5kaXIpICsgXCIgXCIgKyAodGhpcy5hbGlnbikpIDogKCh0aGlzLmFsaWduKSArIFwiIFwiICsgKHRoaXMuZGlyKSksXG4gICAgICAgICAgICAgICAgYXhpcyA9PT0gJ3gnID8gKFwiXCIgKyAodGhpcy5kaXIgPT09ICdsZWZ0JyA/IC1vZmZzZXQkJDEgOiBvZmZzZXQkJDEpKSA6IChcIiBcIiArICh0aGlzLmRpciA9PT0gJ3RvcCcgPyAtb2Zmc2V0JCQxIDogb2Zmc2V0JCQxKSksXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICB0aGlzLmZsaXAsXG4gICAgICAgICAgICAgICAgYm91bmRhcnlcbiAgICAgICAgICAgICkudGFyZ2V0O1xuICAgICAgICAgICAgdmFyIHggPSByZWYkMS54O1xuICAgICAgICAgICAgdmFyIHkgPSByZWYkMS55O1xuXG4gICAgICAgICAgICB0aGlzLmRpciA9IGF4aXMgPT09ICd4JyA/IHggOiB5O1xuICAgICAgICAgICAgdGhpcy5hbGlnbiA9IGF4aXMgPT09ICd4JyA/IHkgOiB4O1xuXG4gICAgICAgICAgICB0b2dnbGVDbGFzcyhlbGVtZW50LCAoKHRoaXMuY2xzUG9zKSArIFwiLVwiICsgKHRoaXMuZGlyKSArIFwiLVwiICsgKHRoaXMuYWxpZ24pKSwgdGhpcy5vZmZzZXQgPT09IGZhbHNlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEF4aXM6IGZ1bmN0aW9uIGdldEF4aXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXIgPT09ICd0b3AnIHx8IHRoaXMuZGlyID09PSAnYm90dG9tJyA/ICd5JyA6ICd4JztcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBtaXhpbiAoVUlraXQpIHtcblxuICAgIFVJa2l0Lm1peGluLmNsYXNzID0gQ2xhc3M7XG4gICAgVUlraXQubWl4aW4uY29udGFpbmVyID0gQ29udGFpbmVyO1xuICAgIFVJa2l0Lm1peGluLm1vZGFsID0gTW9kYWw7XG4gICAgVUlraXQubWl4aW4ucG9zaXRpb24gPSBQb3NpdGlvbjtcbiAgICBVSWtpdC5taXhpbi50b2dnbGFibGUgPSBUb2dnbGFibGU7XG5cbn1cblxuZnVuY3Rpb24gQWNjb3JkaW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdhY2NvcmRpb24nLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIFRvZ2dsYWJsZV0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRhcmdldHM6IFN0cmluZyxcbiAgICAgICAgICAgIGFjdGl2ZTogbnVsbCxcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiBCb29sZWFuLFxuICAgICAgICAgICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgICAgICAgICB0b2dnbGU6IFN0cmluZyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFN0cmluZyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0YXJnZXRzOiAnPiAqJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBhbmltYXRpb246IFt0cnVlXSxcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgY2xzT3BlbjogJ3VrLW9wZW4nLFxuICAgICAgICAgICAgdG9nZ2xlOiAnPiAudWstYWNjb3JkaW9uLXRpdGxlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICc+IC51ay1hY2NvcmRpb24tY29udGVudCcsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnZWFzZSdcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0cyA9IHJlZi50YXJnZXRzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQkKHRhcmdldHMsICRlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy50YXJnZXRzKSArIFwiIFwiICsgKHRoaXMuJHByb3BzLnRvZ2dsZSkpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShpbmRleCgkJCgoKHRoaXMudGFyZ2V0cykgKyBcIiBcIiArICh0aGlzLiRwcm9wcy50b2dnbGUpKSwgdGhpcy4kZWwpLCBlLmN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5pdGVtc1tOdW1iZXIodGhpcy5hY3RpdmUpXTtcbiAgICAgICAgICAgIGlmIChhY3RpdmUgJiYgIWhhc0NsYXNzKGFjdGl2ZSwgdGhpcy5jbHNPcGVuKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGFjdGl2ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdGhpcyQxLl90b2dnbGVJbW1lZGlhdGUoJCh0aGlzJDEuY29udGVudCwgZWwpLCBoYXNDbGFzcyhlbCwgdGhpcyQxLmNsc09wZW4pKTsgfSk7XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAhdGhpcy5jb2xsYXBzaWJsZSAmJiAhaGFzQ2xhc3ModGhpcy5pdGVtcywgdGhpcy5jbHNPcGVuKSAmJiB0aGlzLml0ZW1zWzBdO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGFjdGl2ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUoaXRlbSwgYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChpdGVtLCB0aGlzLml0ZW1zKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gZmlsdGVyKHRoaXMuaXRlbXMsIChcIi5cIiArICh0aGlzLmNsc09wZW4pKSk7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICBpdGVtICYmIFtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCF0aGlzLm11bHRpcGxlICYmICFpbmNsdWRlcyhhY3RpdmUsIGl0ZW0pICYmIGFjdGl2ZSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0l0ZW0gPSBlbCA9PT0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGlzSXRlbSAmJiAhaGFzQ2xhc3MoZWwsIHRoaXMkMS5jbHNPcGVuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZSAmJiBpc0l0ZW0gJiYgIXRoaXMkMS5jb2xsYXBzaWJsZSAmJiBhY3RpdmUubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMkMS5jbHNPcGVuLCBzdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZWwuX3dyYXBwZXIgPyBlbC5fd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCA6ICQodGhpcyQxLmNvbnRlbnQsIGVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5fd3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLl93cmFwcGVyID0gd3JhcEFsbChjb250ZW50LCAnPGRpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLl93cmFwcGVyLCAnaGlkZGVuJywgc3RhdGUgPyAnJyA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuX3RvZ2dsZUltbWVkaWF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGVFbGVtZW50KGVsLl93cmFwcGVyLCBzdGF0ZSwgYW5pbWF0ZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKGVsLCB0aGlzJDEuY2xzT3BlbikgPT09IHN0YXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl90b2dnbGVJbW1lZGlhdGUoY29udGVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuX3dyYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bndyYXAoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gQWxlcnQgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2FsZXJ0Jywge1xuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIG1peGluczogW0NsYXNzLCBUb2dnbGFibGVdLFxuXG4gICAgICAgIGFyZ3M6ICdhbmltYXRpb24nLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjbG9zZTogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogW3RydWVdLFxuICAgICAgICAgICAgc2VsQ2xvc2U6ICcudWstYWxlcnQtY2xvc2UnLFxuICAgICAgICAgICAgZHVyYXRpb246IDE1MCxcbiAgICAgICAgICAgIGhpZGVQcm9wczogYXNzaWduKHtvcGFjaXR5OiAwfSwgVG9nZ2xhYmxlLmRlZmF1bHRzLmhpZGVQcm9wcylcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsQ2xvc2U7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuJGVsKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS4kZGVzdHJveSh0cnVlKTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gQ29yZSAoVUlraXQpIHtcblxuICAgIHJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgc2Nyb2xsID0gMDtcbiAgICAgICAgdmFyIHN0YXJ0ZWQgPSAwO1xuXG4gICAgICAgIG9uKHdpbiwgJ2xvYWQgcmVzaXplJywgVUlraXQudXBkYXRlKTtcbiAgICAgICAgb24od2luLCAnc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuZGlyID0gc2Nyb2xsIDw9IHdpbi5wYWdlWU9mZnNldCA/ICdkb3duJyA6ICd1cCc7XG4gICAgICAgICAgICBlLnNjcm9sbFkgPSBzY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICBVSWtpdC51cGRhdGUoZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9uKGRvYywgJ2FuaW1hdGlvbnN0YXJ0JywgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgIGlmICgoY3NzKHRhcmdldCwgJ2FuaW1hdGlvbk5hbWUnKSB8fCAnJykubWF0Y2goL151ay0uKihsZWZ0fHJpZ2h0KS8pKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRlZCsrO1xuICAgICAgICAgICAgICAgIGRvYy5ib2R5LnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkuc3R5bGUub3ZlcmZsb3dYID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0b01zKGNzcyh0YXJnZXQsICdhbmltYXRpb25EdXJhdGlvbicpKSArIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICghaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjbHMgPSAndWstaG92ZXInO1xuXG4gICAgICAgIG9uKGRvYywgJ3RhcCcsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJCgoXCIuXCIgKyBjbHMpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gIXdpdGhpbih0YXJnZXQsIGVsKSAmJiByZW1vdmVDbGFzcyhlbCwgY2xzKTsgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSWtpdCwgJ2hvdmVyU2VsZWN0b3InLCB7XG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb24oZG9jLCAndGFwJywgc2VsZWN0b3IsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSByZWYuY3VycmVudDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWRkQ2xhc3MoY3VycmVudCwgY2xzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBVSWtpdC5ob3ZlclNlbGVjdG9yID0gJy51ay1hbmltYXRpb24tdG9nZ2xlLCAudWstdHJhbnNpdGlvbi10b2dnbGUsIFt1ay1ob3Zlcl0nO1xuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gQ292ZXIgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2NvdmVyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzLCBVSWtpdC5jb21wb25lbnRzLnZpZGVvLm9wdGlvbnNdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB3aWR0aDogTnVtYmVyLFxuICAgICAgICAgICAgaGVpZ2h0OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgYXV0b211dGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpcy4kZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZShlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIGNzcyhcbiAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCB7d2lkdGg6ICcnLCBoZWlnaHQ6ICcnfSksXG4gICAgICAgICAgICAgICAgICAgIERpbWVuc2lvbnMuY292ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgZWwuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCB8fCBlbC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoICsgKHdpZHRoICUgMiA/IDEgOiAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCArIChoZWlnaHQgJSAyID8gMSA6IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiB7XG5cbiAgICAgICAgICAgIGxvYWRlZG1ldGFkYXRhOiBmdW5jdGlvbiBsb2FkZWRtZXRhZGF0YSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gRHJvcCAoVUlraXQpIHtcblxuICAgIHZhciBhY3RpdmU7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2Ryb3AnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbUG9zaXRpb24sIFRvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ3BvcycsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIHRvZ2dsZTogQm9vbGVhbixcbiAgICAgICAgICAgIGJvdW5kYXJ5OiAncXVlcnknLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogQm9vbGVhbixcbiAgICAgICAgICAgIGRlbGF5U2hvdzogTnVtYmVyLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXG4gICAgICAgICAgICBjbHNEcm9wOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbW9kZTogWydjbGljaycsICdob3ZlciddLFxuICAgICAgICAgICAgdG9nZ2xlOiB0cnVlLFxuICAgICAgICAgICAgYm91bmRhcnk6IHdpbixcbiAgICAgICAgICAgIGJvdW5kYXJ5QWxpZ246IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXlTaG93OiAwLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiA4MDAsXG4gICAgICAgICAgICBjbHNEcm9wOiBmYWxzZSxcbiAgICAgICAgICAgIGhvdmVySWRsZTogMjAwLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbJ3VrLWFuaW1hdGlvbi1mYWRlJ10sXG4gICAgICAgICAgICBjbHM6ICd1ay1vcGVuJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGNsc0Ryb3A6IGZ1bmN0aW9uIGNsc0Ryb3AocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsc0Ryb3AgPSByZWYuY2xzRHJvcDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjbHNEcm9wIHx8IChcInVrLVwiICsgKHRoaXMuJG9wdGlvbnMubmFtZSkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xzUG9zOiBmdW5jdGlvbiBjbHNQb3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xzRHJvcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrZXIgPSBuZXcgTW91c2VUcmFja2VyKCk7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNEcm9wKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcblxuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMuJHByb3BzO1xuICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IHJlZi50b2dnbGU7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSA9IHRvZ2dsZSAmJiBVSWtpdC50b2dnbGUoaXNTdHJpbmcodG9nZ2xlKSA/IHF1ZXJ5KHRvZ2dsZSwgdGhpcy4kZWwpIDogdGhpcy4kZWwucHJldmlvdXNFbGVtZW50U2libGluZywge1xuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy4kZWwsXG4gICAgICAgICAgICAgICAgbW9kZTogdGhpcy5tb2RlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVBcmlhKHRoaXMuJGVsKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiLlwiICsgKHRoaXMuY2xzRHJvcCkgKyBcIi1jbG9zZVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYVtocmVmXj1cIiNcIl0nO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBlLnRhcmdldC5oYXNoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaWQgfHwgIXdpdGhpbihpZCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3Jlc2Nyb2xsJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAndG9nZ2xlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHRvZ2dsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0b2dnbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogcG9pbnRlckVudGVyLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlcyh0aGlzLm1vZGUsICdob3ZlcicpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgYWN0aXZlICE9PSB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhY3RpdmUudG9nZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBpbmNsdWRlcyhhY3RpdmUudG9nZ2xlLm1vZGUsICdob3ZlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhd2l0aGluKGUudGFyZ2V0LCBhY3RpdmUudG9nZ2xlLiRlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICFwb2ludEluUmVjdCh7eDogZS5wYWdlWCwgeTogZS5wYWdlWX0sIG9mZnNldChhY3RpdmUuJGVsKSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLnRvZ2dsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAndG9nZ2xlc2hvdycsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHRvZ2dsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGUgJiYgIWluY2x1ZGVzKHRvZ2dsZS50YXJnZXQsIHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3codG9nZ2xlIHx8IHRoaXMudG9nZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IChcInRvZ2dsZWhpZGUgXCIgKyBwb2ludGVyTGVhdmUpLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlLCB0b2dnbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSB8fCB0b2dnbGUgJiYgIWluY2x1ZGVzKHRvZ2dsZS50YXJnZXQsIHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZSAmJiBpbmNsdWRlcyh0aGlzLnRvZ2dsZS5tb2RlLCAnaG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrZXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLnRvZ2dsZS4kZWwsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLnRvZ2dsZS4kZWwsICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZWhpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJGVsICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGFjdGl2ZSA9PT0gbnVsbCAmJiB3aXRoaW4odGFyZ2V0LCB0aGlzLiRlbCkgJiYgdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMgOiBhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCkgPyBudWxsIDogYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnRvZ2dsZS4kZWwsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLnRvZ2dsZS4kZWwsICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlLiRlbC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICQkKCdhLCBidXR0b24nLCB0aGlzLnRvZ2dsZS4kZWwpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5ibHVyKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrZXIuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgIUFuaW1hdGlvbi5pblByb2dyZXNzKHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyh0b2dnbGUsIGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCBkZWxheSA9PT0gdm9pZCAwICkgZGVsYXkgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc2hvdyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICF0aGlzJDEuaXNUb2dnbGVkKCkgJiYgdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLiRlbCwgdHJ1ZSk7IH07XG4gICAgICAgICAgICAgICAgdmFyIHRyeVNob3cgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZSA9IHRvZ2dsZSB8fCB0aGlzJDEudG9nZ2xlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5jbGVhclRpbWVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbGF5ICYmIGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMkMSAmJiBhY3RpdmUuaXNEZWxheWluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNob3dUaW1lciA9IHNldFRpbWVvdXQodGhpcyQxLnNob3csIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzJDEuaXNQYXJlbnRPZihhY3RpdmUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUuaGlkZVRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUgJiYgIXRoaXMkMS5pc0NoaWxkT2YoYWN0aXZlKSAmJiAhdGhpcyQxLmlzUGFyZW50T2YoYWN0aXZlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChhY3RpdmUgJiYgYWN0aXZlICE9PSBwcmV2ICYmICF0aGlzJDEuaXNDaGlsZE9mKGFjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGF5ICYmIHRoaXMkMS5kZWxheVNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zaG93VGltZXIgPSBzZXRUaW1lb3V0KHNob3csIHRoaXMkMS5kZWxheVNob3cpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdGhpcyQxO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodG9nZ2xlICYmIHRoaXMudG9nZ2xlICYmIHRvZ2dsZS4kZWwgIT09IHRoaXMudG9nZ2xlLiRlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgIG9uY2UodGhpcy4kZWwsICdoaWRlJywgdHJ5U2hvdyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cnlTaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGlkZTogZnVuY3Rpb24gaGlkZShkZWxheSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICggZGVsYXkgPT09IHZvaWQgMCApIGRlbGF5ID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGhpZGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEudG9nZ2xlTm93KHRoaXMkMS4kZWwsIGZhbHNlKTsgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZWxheWluZyA9IHRoaXMudHJhY2tlci5tb3Zlc1RvKHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZWxheSAmJiB0aGlzLmlzRGVsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuaGlkZSwgdGhpcy5ob3ZlcklkbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsYXkgJiYgdGhpcy5kZWxheUhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlVGltZXIgPSBzZXRUaW1lb3V0KGhpZGUsIHRoaXMuZGVsYXlIaWRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xlYXJUaW1lcnM6IGZ1bmN0aW9uIGNsZWFyVGltZXJzKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lcik7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNEZWxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmUgPT09IHRoaXM7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpc0NoaWxkT2Y6IGZ1bmN0aW9uIGlzQ2hpbGRPZihkcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRyb3AgJiYgZHJvcCAhPT0gdGhpcyAmJiB3aXRoaW4odGhpcy4kZWwsIGRyb3AuJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzUGFyZW50T2Y6IGZ1bmN0aW9uIGlzUGFyZW50T2YoZHJvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcm9wICYmIGRyb3AgIT09IHRoaXMgJiYgd2l0aGluKGRyb3AuJGVsLCB0aGlzLiRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwb3NpdGlvbjogZnVuY3Rpb24gcG9zaXRpb24oKSB7XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi0oc3RhY2t8Ym91bmRhcnkpXCIpKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHt0b3A6ICcnLCBsZWZ0OiAnJywgZGlzcGxheTogJ2Jsb2NrJ30pO1xuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi1ib3VuZGFyeVwiKSwgdGhpcy5ib3VuZGFyeUFsaWduKTtcblxuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IG9mZnNldCh0aGlzLmJvdW5kYXJ5KTtcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ25UbyA9IHRoaXMuYm91bmRhcnlBbGlnbiA/IGJvdW5kYXJ5IDogb2Zmc2V0KHRoaXMudG9nZ2xlLiRlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGlnbiA9PT0gJ2p1c3RpZnknKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5nZXRBeGlzKCkgPT09ICd5JyA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCBwcm9wLCBhbGlnblRvW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJGVsLm9mZnNldFdpZHRoID4gTWF0aC5tYXgoYm91bmRhcnkucmlnaHQgLSBhbGlnblRvLmxlZnQsIGFsaWduVG8ucmlnaHQgLSBib3VuZGFyeS5sZWZ0KSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItc3RhY2tcIikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25BdCh0aGlzLiRlbCwgdGhpcy5ib3VuZGFyeUFsaWduID8gdGhpcy5ib3VuZGFyeSA6IHRoaXMudG9nZ2xlLiRlbCwgdGhpcy5ib3VuZGFyeSk7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdkaXNwbGF5JywgJycpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBVSWtpdC5kcm9wLmdldEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFjdGl2ZTsgfTtcblxuICAgIHZhciByZWdpc3RlcmVkO1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJFdmVudCgpIHtcblxuICAgICAgICBpZiAocmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICAgIG9uKGRvY0VsLCAnY2xpY2snLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gcmVmLmRlZmF1bHRQcmV2ZW50ZWQ7XG5cbiAgICAgICAgICAgIHZhciBwcmV2O1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZSAmJiBhY3RpdmUgIT09IHByZXYgJiYgIXdpdGhpbih0YXJnZXQsIGFjdGl2ZS4kZWwpICYmICEoYWN0aXZlLnRvZ2dsZSAmJiB3aXRoaW4odGFyZ2V0LCBhY3RpdmUudG9nZ2xlLiRlbCkpKSB7XG4gICAgICAgICAgICAgICAgcHJldiA9IGFjdGl2ZTtcbiAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBEcm9wZG93biAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZHJvcGRvd24nLCBVSWtpdC5jb21wb25lbnRzLmRyb3AuZXh0ZW5kKHtuYW1lOiAnZHJvcGRvd24nfSkpO1xuXG59XG5cbmZ1bmN0aW9uIEZvcm1DdXN0b20gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2Zvcm0tY3VzdG9tJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBhcmdzOiAndGFyZ2V0JyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGFyZ2V0OiBCb29sZWFuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24gaW5wdXQoXywgJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsSW5wdXQsICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGF0ZTogZnVuY3Rpb24gc3RhdGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbiB0YXJnZXQocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgJiYgKHRhcmdldCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmlucHV0LnBhcmVudE5vZGUgPT09ICRlbFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmlucHV0Lm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgICAgICB8fCBxdWVyeSh0YXJnZXQsICRlbCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSByZWYuaW5wdXQ7XG5cbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0aW9uO1xuXG4gICAgICAgICAgICB0YXJnZXRbaXNJbnB1dCh0YXJnZXQpID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCddID0gaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF1cbiAgICAgICAgICAgICAgICA/IGlucHV0LmZpbGVzWzBdLm5hbWVcbiAgICAgICAgICAgICAgICA6IG1hdGNoZXMoaW5wdXQsICdzZWxlY3QnKSAmJiAob3B0aW9uID0gJCQoJ29wdGlvbicsIGlucHV0KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5zZWxlY3RlZDsgfSlbMF0pXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgIDogaW5wdXQudmFsdWU7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZvY3VzaW4gZm9jdXNvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBzZWxJbnB1dCxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKFwidWstXCIgKyAoaW5jbHVkZXModHlwZSwgJ2ZvY3VzJykgPyAnZm9jdXMnIDogJ2hvdmVyJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGVzKFsnZm9jdXNpbicsICdtb3VzZWVudGVyJ10sIHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBHaWYgKFVJa2l0KSB7XG5cbiAgICAvLyBEZXByZWNhdGVkXG4gICAgVUlraXQuY29tcG9uZW50KCdnaWYnLCB7XG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGludmlldyA9IGlzSW5WaWV3KHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgICAgIGlmICghaW52aWV3IHx8IGRhdGEuaXNJblZpZXcgPT09IGludmlldykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGF0YS5pc0luVmlldyA9IGludmlldztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5zcmMgPSB0aGlzLiRlbC5zcmM7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gR3JpZCAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZ3JpZCcsIFVJa2l0LmNvbXBvbmVudHMubWFyZ2luLmV4dGVuZCh7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIG5hbWU6ICdncmlkJyxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbWFyZ2luOiAndWstZ3JpZC1tYXJnaW4nLFxuICAgICAgICAgICAgY2xzU3RhY2s6ICd1ay1ncmlkLXN0YWNrJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWNrcyA9IHJlZi5zdGFja3M7XG5cblxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc1N0YWNrLCBzdGFja3MpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pKTtcblxufVxuXG5mdW5jdGlvbiBIZWlnaHRNYXRjaCAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnaGVpZ2h0LW1hdGNoJywge1xuXG4gICAgICAgIGFyZ3M6ICd0YXJnZXQnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHJvdzogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6ICc+IConLFxuICAgICAgICAgICAgcm93OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgZWxlbWVudHM6IGZ1bmN0aW9uIGVsZW1lbnRzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGFyZ2V0LCAkZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBsYXN0T2Zmc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy5lbGVtZW50cywgJ21pbkhlaWdodCcsICcnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6ICF0aGlzLnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBbdGhpcy5tYXRjaCh0aGlzLmVsZW1lbnRzKV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5lbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKHJvd3MsIGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdE9mZnNldCAhPT0gZWwub2Zmc2V0VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChbZWxdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzW3Jvd3MubGVuZ3RoIC0gMV0ucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IGVsLm9mZnNldFRvcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3dzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSkubWFwKGZ1bmN0aW9uIChlbGVtZW50cykgeyByZXR1cm4gdGhpcyQxLm1hdGNoKGVsZW1lbnRzKTsgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciByb3dzID0gcmVmLnJvd3M7XG5cblxuICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSByZWYuZWxlbWVudHM7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNzcyhlbGVtZW50cywgJ21pbkhlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChlbGVtZW50cykge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHRzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IDA7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlLCBoaWRkZW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gYXR0cihlbCwgJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuID0gYXR0cihlbCwgJ2hpZGRlbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cihlbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogKChzdHlsZSB8fCAnJykgKyBcIjtkaXNwbGF5OmJsb2NrICFpbXBvcnRhbnQ7XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gTWF0aC5tYXgobWF4LCBlbC5vZmZzZXRIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0cy5wdXNoKGVsLm9mZnNldEhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cihlbCwge3N0eWxlOiBzdHlsZSwgaGlkZGVuOiBoaWRkZW59KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gaGVpZ2h0c1tpXSA8IG1heDsgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge2hlaWdodDogbWF4LCBlbGVtZW50czogZWxlbWVudHN9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBIZWlnaHRWaWV3cG9ydCAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnaGVpZ2h0LXZpZXdwb3J0Jywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBleHBhbmQ6IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXRUb3A6IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXRCb3R0b206IEJvb2xlYW4sXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBleHBhbmQ6IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0VG9wOiBmYWxzZSxcbiAgICAgICAgICAgIG9mZnNldEJvdHRvbTogZmFsc2UsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnYm94U2l6aW5nJywgJ2JvcmRlci1ib3gnKTtcblxuICAgICAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9IGhlaWdodCh3aW4pO1xuICAgICAgICAgICAgICAgIHZhciBtaW5IZWlnaHQsIG9mZnNldFRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBhbmQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtoZWlnaHQ6ICcnLCBtaW5IZWlnaHQ6ICcnfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmYgPSB2aWV3cG9ydCAtIG9mZnNldEhlaWdodChkb2NFbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQgPSBvZmZzZXRIZWlnaHQodGhpcy4kZWwpICsgZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gb2Zmc2V0KHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9IHJlZi50b3A7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvcCA8IHZpZXdwb3J0IC8gMiAmJiB0aGlzLm9mZnNldFRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IHRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9mZnNldEJvdHRvbSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gb2Zmc2V0SGVpZ2h0KHRoaXMuJGVsLm5leHRFbGVtZW50U2libGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc051bWVyaWModGhpcy5vZmZzZXRCb3R0b20pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSAodmlld3BvcnQgLyAxMDApICogdGhpcy5vZmZzZXRCb3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9mZnNldEJvdHRvbSAmJiBlbmRzV2l0aCh0aGlzLm9mZnNldEJvdHRvbSwgJ3B4JykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IHRvRmxvYXQodGhpcy5vZmZzZXRCb3R0b20pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGhpcy5vZmZzZXRCb3R0b20pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSBvZmZzZXRIZWlnaHQocXVlcnkodGhpcy5vZmZzZXRCb3R0b20sIHRoaXMuJGVsKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uIG1vYmlsZSBkZXZpY2VzIChpT1MgYW5kIEFuZHJvaWQpIHdpbmRvdy5pbm5lckhlaWdodCAhPT0gMTAwdmhcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ID0gb2Zmc2V0VG9wID8gKFwiY2FsYygxMDB2aCAtIFwiICsgb2Zmc2V0VG9wICsgXCJweClcIikgOiAnMTAwdmgnO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtaW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge2hlaWdodDogJycsIG1pbkhlaWdodDogbWluSGVpZ2h0fSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSB0aGlzLiRlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0ICYmIHRoaXMubWluSGVpZ2h0ID4gZWxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWluSGVpZ2h0JywgdGhpcy5taW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElFIDExIGZpeCAobWluLWhlaWdodCBvbiBhIGZsZXggY29udGFpbmVyIHdvbid0IGFwcGx5IHRvIGl0cyBmbGV4IGl0ZW1zKVxuICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydCAtIG9mZnNldFRvcCA+PSBlbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdoZWlnaHQnLCBtaW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEhlaWdodChlbCkge1xuICAgICAgICByZXR1cm4gZWwgJiYgZWwub2Zmc2V0SGVpZ2h0IHx8IDA7XG4gICAgfVxuXG59XG5cbnZhciBjbG9zZUljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjE0XFxcIiBoZWlnaHQ9XFxcIjE0XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMTRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgeDE9XFxcIjFcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTNcXFwiIHkyPVxcXCIxM1xcXCIvPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIHgxPVxcXCIxM1xcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMTNcXFwiLz48L3N2Zz5cIjtcblxudmFyIGNsb3NlTGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuNFxcXCIgeDE9XFxcIjFcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTlcXFwiIHkyPVxcXCIxOVxcXCIvPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHgxPVxcXCIxOVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMTlcXFwiLz48L3N2Zz5cIjtcblxudmFyIG1hcmtlciA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cmVjdCB4PVxcXCI5XFxcIiB5PVxcXCI0XFxcIiB3aWR0aD1cXFwiMVxcXCIgaGVpZ2h0PVxcXCIxMVxcXCIvPjxyZWN0IHg9XFxcIjRcXFwiIHk9XFxcIjlcXFwiIHdpZHRoPVxcXCIxMVxcXCIgaGVpZ2h0PVxcXCIxXFxcIi8+PC9zdmc+XCI7XG5cbnZhciBuYXZiYXJUb2dnbGVJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxyZWN0IHk9XFxcIjlcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyXFxcIi8+PHJlY3QgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiLz48cmVjdCB5PVxcXCIxNVxcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiLz48L3N2Zz5cIjtcblxudmFyIG92ZXJsYXlJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCI0MFxcXCIgaGVpZ2h0PVxcXCI0MFxcXCIgdmlld0JveD1cXFwiMCAwIDQwIDQwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxyZWN0IHg9XFxcIjE5XFxcIiB5PVxcXCIwXFxcIiB3aWR0aD1cXFwiMVxcXCIgaGVpZ2h0PVxcXCI0MFxcXCIvPjxyZWN0IHg9XFxcIjBcXFwiIHk9XFxcIjE5XFxcIiB3aWR0aD1cXFwiNDBcXFwiIGhlaWdodD1cXFwiMVxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgcGFnaW5hdGlvbk5leHQgPSBcIjxzdmcgd2lkdGg9XFxcIjdcXFwiIGhlaWdodD1cXFwiMTJcXFwiIHZpZXdCb3g9XFxcIjAgMCA3IDEyXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4yXFxcIiBwb2ludHM9XFxcIjEgMSA2IDYgMSAxMVxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgcGFnaW5hdGlvblByZXZpb3VzID0gXCI8c3ZnIHdpZHRoPVxcXCI3XFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgNyAxMlxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCI2IDEgMSA2IDYgMTFcXFwiLz48L3N2Zz5cIjtcblxudmFyIHNlYXJjaEljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGNpcmNsZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiBjeD1cXFwiOVxcXCIgY3k9XFxcIjlcXFwiIHI9XFxcIjdcXFwiLz48cGF0aCBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiBkPVxcXCJNMTQsMTQgTDE4LDE4IEwxNCwxNCBaXFxcIi8+PC9zdmc+XCI7XG5cbnZhciBzZWFyY2hMYXJnZSA9IFwiPHN2ZyB3aWR0aD1cXFwiNDBcXFwiIGhlaWdodD1cXFwiNDBcXFwiIHZpZXdCb3g9XFxcIjAgMCA0MCA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjhcXFwiIGN4PVxcXCIxNy41XFxcIiBjeT1cXFwiMTcuNVxcXCIgcj1cXFwiMTYuNVxcXCIvPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjhcXFwiIHgxPVxcXCIzOFxcXCIgeTE9XFxcIjM5XFxcIiB4Mj1cXFwiMjlcXFwiIHkyPVxcXCIzMFxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgc2VhcmNoTmF2YmFyID0gXCI8c3ZnIHdpZHRoPVxcXCIyNFxcXCIgaGVpZ2h0PVxcXCIyNFxcXCIgdmlld0JveD1cXFwiMCAwIDI0IDI0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxjaXJjbGUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgY3g9XFxcIjEwLjVcXFwiIGN5PVxcXCIxMC41XFxcIiByPVxcXCI5LjVcXFwiLz48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiB4MT1cXFwiMjNcXFwiIHkxPVxcXCIyM1xcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiMTdcXFwiLz48L3N2Zz5cIjtcblxudmFyIHNsaWRlbmF2TmV4dCA9IFwiPHN2ZyB3aWR0aD1cXFwiMTRweFxcXCIgaGVpZ2h0PVxcXCIyNHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMjRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHBvaW50cz1cXFwiMS4yMjUsMjMgMTIuNzc1LDEyIDEuMjI1LDEgXFxcIi8+PC9zdmc+XCI7XG5cbnZhciBzbGlkZW5hdk5leHRMYXJnZSA9IFwiPHN2ZyB3aWR0aD1cXFwiMjVweFxcXCIgaGVpZ2h0PVxcXCI0MHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMjUgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyXFxcIiBwb2ludHM9XFxcIjQuMDAyLDM4LjU0NyAyMi41MjcsMjAuMDI0IDQsMS41IFxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgc2xpZGVuYXZQcmV2aW91cyA9IFwiPHN2ZyB3aWR0aD1cXFwiMTRweFxcXCIgaGVpZ2h0PVxcXCIyNHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMjRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHBvaW50cz1cXFwiMTIuNzc1LDEgMS4yMjUsMTIgMTIuNzc1LDIzIFxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgc2xpZGVuYXZQcmV2aW91c0xhcmdlID0gXCI8c3ZnIHdpZHRoPVxcXCIyNXB4XFxcIiBoZWlnaHQ9XFxcIjQwcHhcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNSA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjJcXFwiIHBvaW50cz1cXFwiMjAuNTI3LDEuNSAyLDIwLjAyNCAyMC41MjUsMzguNTQ3IFxcXCIvPjwvc3ZnPlwiO1xuXG52YXIgc3Bpbm5lciA9IFwiPHN2ZyB3aWR0aD1cXFwiMzBcXFwiIGhlaWdodD1cXFwiMzBcXFwiIHZpZXdCb3g9XFxcIjAgMCAzMCAzMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgY3g9XFxcIjE1XFxcIiBjeT1cXFwiMTVcXFwiIHI9XFxcIjE0XFxcIi8+PC9zdmc+XCI7XG5cbnZhciB0b3RvcCA9IFwiPHN2ZyB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMTBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxOCAxMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCIxIDkgOSAxIDE3IDkgXFxcIi8+PC9zdmc+XCI7XG5cbmZ1bmN0aW9uIEljb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgcGFyc2VkID0ge307XG4gICAgdmFyIGljb25zID0ge1xuICAgICAgICBzcGlubmVyOiBzcGlubmVyLFxuICAgICAgICB0b3RvcDogdG90b3AsXG4gICAgICAgIG1hcmtlcjogbWFya2VyLFxuICAgICAgICAnY2xvc2UtaWNvbic6IGNsb3NlSWNvbixcbiAgICAgICAgJ2Nsb3NlLWxhcmdlJzogY2xvc2VMYXJnZSxcbiAgICAgICAgJ25hdmJhci10b2dnbGUtaWNvbic6IG5hdmJhclRvZ2dsZUljb24sXG4gICAgICAgICdvdmVybGF5LWljb24nOiBvdmVybGF5SWNvbixcbiAgICAgICAgJ3BhZ2luYXRpb24tbmV4dCc6IHBhZ2luYXRpb25OZXh0LFxuICAgICAgICAncGFnaW5hdGlvbi1wcmV2aW91cyc6IHBhZ2luYXRpb25QcmV2aW91cyxcbiAgICAgICAgJ3NlYXJjaC1pY29uJzogc2VhcmNoSWNvbixcbiAgICAgICAgJ3NlYXJjaC1sYXJnZSc6IHNlYXJjaExhcmdlLFxuICAgICAgICAnc2VhcmNoLW5hdmJhcic6IHNlYXJjaE5hdmJhcixcbiAgICAgICAgJ3NsaWRlbmF2LW5leHQnOiBzbGlkZW5hdk5leHQsXG4gICAgICAgICdzbGlkZW5hdi1uZXh0LWxhcmdlJzogc2xpZGVuYXZOZXh0TGFyZ2UsXG4gICAgICAgICdzbGlkZW5hdi1wcmV2aW91cyc6IHNsaWRlbmF2UHJldmlvdXMsXG4gICAgICAgICdzbGlkZW5hdi1wcmV2aW91cy1sYXJnZSc6IHNsaWRlbmF2UHJldmlvdXNMYXJnZVxuICAgIH07XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2ljb24nLCBVSWtpdC5jb21wb25lbnRzLnN2Zy5leHRlbmQoe1xuXG4gICAgICAgIGF0dHJzOiBbJ2ljb24nLCAncmF0aW8nXSxcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgbmFtZTogJ2ljb24nLFxuXG4gICAgICAgIGFyZ3M6ICdpY29uJyxcblxuICAgICAgICBwcm9wczogWydpY29uJ10sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtleGNsdWRlOiBbJ2lkJywgJ3N0eWxlJywgJ2NsYXNzJywgJ3NyYycsICdpY29uJ119LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWljb24nKTtcblxuICAgICAgICAgICAgaWYgKGlzUnRsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gc3dhcChzd2FwKHRoaXMuaWNvbiwgJ2xlZnQnLCAncmlnaHQnKSwgJ3ByZXZpb3VzJywgJ25leHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGdldFN2ZzogZnVuY3Rpb24gZ2V0U3ZnKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGljb24gPSBnZXRJY29uKHRoaXMuaWNvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdJY29uIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGljb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pKTtcblxuICAgIFtcbiAgICAgICAgJ21hcmtlcicsXG4gICAgICAgICduYXZiYXItdG9nZ2xlLWljb24nLFxuICAgICAgICAnb3ZlcmxheS1pY29uJyxcbiAgICAgICAgJ3BhZ2luYXRpb24tcHJldmlvdXMnLFxuICAgICAgICAncGFnaW5hdGlvbi1uZXh0JyxcbiAgICAgICAgJ3RvdG9wJ1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gcmVnaXN0ZXJDb21wb25lbnQobmFtZSk7IH0pO1xuXG4gICAgW1xuICAgICAgICAnc2xpZGVuYXYtcHJldmlvdXMnLFxuICAgICAgICAnc2xpZGVuYXYtbmV4dCdcbiAgICBdLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHJlZ2lzdGVyQ29tcG9uZW50KG5hbWUsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1zbGlkZW5hdicpO1xuXG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGhpcy4kZWwsICd1ay1zbGlkZW5hdi1sYXJnZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uICs9ICctbGFyZ2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTsgfSk7XG5cbiAgICByZWdpc3RlckNvbXBvbmVudCgnc2VhcmNoLWljb24nLCB7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXNlYXJjaC1pY29uJykgJiYgcGFyZW50cyh0aGlzLiRlbCwgJy51ay1zZWFyY2gtbGFyZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24gPSAnc2VhcmNoLWxhcmdlJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50cyh0aGlzLiRlbCwgJy51ay1zZWFyY2gtbmF2YmFyJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gJ3NlYXJjaC1uYXZiYXInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KCdjbG9zZScsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5pY29uID0gXCJjbG9zZS1cIiArIChoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLWNsb3NlLWxhcmdlJykgPyAnbGFyZ2UnIDogJ2ljb24nKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZWdpc3RlckNvbXBvbmVudCgnc3Bpbm5lcicsIHtcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnN2Zy50aGVuKGZ1bmN0aW9uIChzdmcpIHsgcmV0dXJuIHRoaXMkMS5yYXRpbyAhPT0gMSAmJiBjc3MoJCgnY2lyY2xlJywgc3ZnKSwgJ3N0cm9rZS13aWR0aCcsIDEgLyB0aGlzJDEucmF0aW8pOyB9LCBub29wKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBVSWtpdC5pY29uLmFkZCA9IGZ1bmN0aW9uIChhZGRlZCkge1xuICAgICAgICBPYmplY3Qua2V5cyhhZGRlZCkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWNvbnNbbmFtZV0gPSBhZGRlZFtuYW1lXTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJzZWRbbmFtZV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChVSWtpdC5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGVhY2goVUlraXQuaW5zdGFuY2VzLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC4kb3B0aW9ucy5uYW1lID09PSAnaWNvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LiRyZXNldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KG5hbWUsIG1peGluJCQxKSB7XG5cbiAgICAgICAgVUlraXQuY29tcG9uZW50KG5hbWUsIFVJa2l0LmNvbXBvbmVudHMuaWNvbi5leHRlbmQoe1xuXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuXG4gICAgICAgICAgICBtaXhpbnM6IG1peGluJCQxID8gW21peGluJCQxXSA6IFtdLFxuXG4gICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgIGljb246IG5hbWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SWNvbihpY29uKSB7XG5cbiAgICAgICAgaWYgKCFpY29uc1tpY29uXSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBhcnNlZFtpY29uXSkge1xuICAgICAgICAgICAgcGFyc2VkW2ljb25dID0gJChpY29uc1tpY29uXS50cmltKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFtpY29uXTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gTGVhZGVyIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdsZWFkZXInLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBmaWxsOiBTdHJpbmcsXG4gICAgICAgICAgICBtZWRpYTogJ21lZGlhJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBmaWxsOiAnJyxcbiAgICAgICAgICAgIG1lZGlhOiBmYWxzZSxcbiAgICAgICAgICAgIGNsc1dyYXBwZXI6ICd1ay1sZWFkZXItZmlsbCcsXG4gICAgICAgICAgICBjbHNIaWRlOiAndWstbGVhZGVyLWhpZGUnLFxuICAgICAgICAgICAgYXR0ckZpbGw6ICdkYXRhLWZpbGwnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgZmlsbDogZnVuY3Rpb24gZmlsbChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsbCA9IHJlZi5maWxsO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGwgfHwgZ2V0Q3NzVmFyKCdsZWFkZXItZmlsbCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgYXNzaWduO1xuICAgICAgICAgICAgKGFzc2lnbiA9IHdyYXBJbm5lcih0aGlzLiRlbCwgKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzV3JhcHBlcikgKyBcIlxcXCI+XCIpKSwgdGhpcy53cmFwcGVyID0gYXNzaWduWzBdKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHVud3JhcCh0aGlzLndyYXBwZXIuY2hpbGROb2Rlcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gcmVmLmNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gd2lkdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBNYXRoLmZsb29yKHRoaXMuJGVsLm9mZnNldFdpZHRoIC8gMik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWQ6IGNoYW5nZWQgfHwgcHJldiAhPT0gd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlOiB0aGlzLm1lZGlhICYmICF3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLmNsc0hpZGUsIGRhdGEuaGlkZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyKHRoaXMud3JhcHBlciwgdGhpcy5hdHRyRmlsbCwgbmV3IEFycmF5KGRhdGEud2lkdGgpLmpvaW4odGhpcy5maWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBNYXJnaW4gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ21hcmdpbicsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgbWFyZ2luOiBTdHJpbmcsXG4gICAgICAgICAgICBmaXJzdENvbHVtbjogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBtYXJnaW46ICd1ay1tYXJnaW4tc21hbGwtdG9wJyxcbiAgICAgICAgICAgIGZpcnN0Q29sdW1uOiAndWstZmlyc3QtY29sdW1uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHRoaXMuJGVsLmNoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGggfHwgIWlzVmlzaWJsZSh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucm93cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEuc3RhY2tzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHZhciByb3dzID0gW1tdXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpbSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGltLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gcm93cy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcm93c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3dbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0RGltID0gcm93WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGltLnRvcCA+PSBNYXRoLmZsb29yKGxlZnREaW0uYm90dG9tKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChbZWxdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IoZGltLmJvdHRvbSkgPiBsZWZ0RGltLnRvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5zdGFja3MgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaW0ubGVmdCA8IGxlZnREaW0ubGVmdCAmJiAhaXNSdGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQoZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy51bnNoaWZ0KFtlbF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEucm93cyA9IHJvd3M7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHJlZi5yb3dzO1xuXG5cbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaSkgeyByZXR1cm4gcm93LmZvckVhY2goZnVuY3Rpb24gKGVsLCBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLm1hcmdpbiwgaSAhPT0gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLmZpcnN0Q29sdW1uLCBqID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIE1vZGFsJDEgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ21vZGFsJywge1xuXG4gICAgICAgIG1peGluczogW01vZGFsXSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY2xzUGFnZTogJ3VrLW1vZGFsLXBhZ2UnLFxuICAgICAgICAgICAgY2xzUGFuZWw6ICd1ay1tb2RhbC1kaWFsb2cnLFxuICAgICAgICAgICAgc2VsQ2xvc2U6ICcudWstbW9kYWwtY2xvc2UsIC51ay1tb2RhbC1jbG9zZS1kZWZhdWx0LCAudWstbW9kYWwtY2xvc2Utb3V0c2lkZSwgLnVrLW1vZGFsLWNsb3NlLWZ1bGwnXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGhpcy5wYW5lbCwgJ3VrLW1hcmdpbi1hdXRvLXZlcnRpY2FsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstZmxleCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsKTsgLy8gZm9yY2UgcmVmbG93XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRkZW4nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsICd1ay1mbGV4Jyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ292ZXJmbG93LWF1dG8nLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIG1vZGFsOiBmdW5jdGlvbiBtb2RhbChfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvc2VzdCgkZWwsICcudWstbW9kYWwnKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBhbmVsOiBmdW5jdGlvbiBwYW5lbChfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvc2VzdCgkZWwsICcudWstbW9kYWwtZGlhbG9nJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ21pbkhlaWdodCcsIDE1MCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbCB8fCAhdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBjc3ModGhpcy4kZWwsICdtYXhIZWlnaHQnKTtcblxuICAgICAgICAgICAgICAgIGNzcyhjc3ModGhpcy4kZWwsICdtYXhIZWlnaHQnLCAxNTApLCAnbWF4SGVpZ2h0JywgTWF0aC5tYXgoMTUwLCAxNTAgKyBoZWlnaHQodGhpcy5tb2RhbCkgLSB0aGlzLnBhbmVsLm9mZnNldEhlaWdodCkpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ICE9PSBjc3ModGhpcy4kZWwsICdtYXhIZWlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAncmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0Lm1vZGFsLmRpYWxvZyA9IGZ1bmN0aW9uIChjb250ZW50LCBvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIGRpYWxvZyA9IFVJa2l0Lm1vZGFsKChcIiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbFxcXCI+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWRpYWxvZ1xcXCI+XCIgKyBjb250ZW50ICsgXCI8L2Rpdj4gPC9kaXY+IFwiKSwgb3B0aW9ucyk7XG5cbiAgICAgICAgZGlhbG9nLnNob3coKTtcblxuICAgICAgICBvbihkaWFsb2cuJGVsLCAnaGlkZGVuJywgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgY3VycmVudFRhcmdldCA9IHJlZi5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZGlhbG9nLiRkZXN0cm95KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nO1xuICAgIH07XG5cbiAgICBVSWtpdC5tb2RhbC5hbGVydCA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7YmdDbG9zZTogZmFsc2UsIGVzY0Nsb3NlOiBmYWxzZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gb24oVUlraXQubW9kYWwuZGlhbG9nKChcIiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIj5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5IHVrLW1vZGFsLWNsb3NlXFxcIiBhdXRvZm9jdXM+XCIgKyAob3B0aW9ucy5sYWJlbHMub2spICsgXCI8L2J1dHRvbj4gPC9kaXY+IFwiKSwgb3B0aW9ucykuJGVsLCAnaGlkZScsIHJlc29sdmUpOyB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLmNvbmZpcm0gPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe2JnQ2xvc2U6IGZhbHNlLCBlc2NDbG9zZTogdHJ1ZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICB2YXIgY29uZmlybSA9IFVJa2l0Lm1vZGFsLmRpYWxvZygoXCIgPGZvcm0+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiPlwiICsgKGlzU3RyaW5nKG1lc3NhZ2UpID8gbWVzc2FnZSA6IGh0bWwobWVzc2FnZSkpICsgXCI8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZm9vdGVyIHVrLXRleHQtcmlnaHRcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWRlZmF1bHQgdWstbW9kYWwtY2xvc2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XCIgKyAob3B0aW9ucy5sYWJlbHMuY2FuY2VsKSArIFwiPC9idXR0b24+IDxidXR0b24gY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tcHJpbWFyeVxcXCIgYXV0b2ZvY3VzPlwiICsgKG9wdGlvbnMubGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PiA8L2Zvcm0+IFwiKSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHZhciByZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBvbihjb25maXJtLiRlbCwgJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25maXJtLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb24oY29uZmlybS4kZWwsICdoaWRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLnByb21wdCA9IGZ1bmN0aW9uIChtZXNzYWdlLCB2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe2JnQ2xvc2U6IGZhbHNlLCBlc2NDbG9zZTogdHJ1ZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgdmFyIHByb21wdCA9IFVJa2l0Lm1vZGFsLmRpYWxvZygoXCIgPGZvcm0gY2xhc3M9XFxcInVrLWZvcm0tc3RhY2tlZFxcXCI+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiPiA8bGFiZWw+XCIgKyAoaXNTdHJpbmcobWVzc2FnZSkgPyBtZXNzYWdlIDogaHRtbChtZXNzYWdlKSkgKyBcIjwvbGFiZWw+IDxpbnB1dCBjbGFzcz1cXFwidWstaW5wdXRcXFwiIGF1dG9mb2N1cz4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0IHVrLW1vZGFsLWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlwiICsgKG9wdGlvbnMubGFiZWxzLmNhbmNlbCkgKyBcIjwvYnV0dG9uPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXByaW1hcnlcXFwiPlwiICsgKG9wdGlvbnMubGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PiA8L2Zvcm0+IFwiKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAkKCdpbnB1dCcsIHByb21wdC4kZWwpO1xuXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgb24ocHJvbXB0LiRlbCwgJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByb21wdC5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uKHByb21wdC4kZWwsICdoaWRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVUlraXQubW9kYWwubGFiZWxzID0ge1xuICAgICAgICBvazogJ09rJyxcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJ1xuICAgIH07XG5cbn1cblxuZnVuY3Rpb24gTmF2IChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCduYXYnLCBVSWtpdC5jb21wb25lbnRzLmFjY29yZGlvbi5leHRlbmQoe1xuXG4gICAgICAgIG5hbWU6ICduYXYnLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0YXJnZXRzOiAnPiAudWstcGFyZW50JyxcbiAgICAgICAgICAgIHRvZ2dsZTogJz4gYScsXG4gICAgICAgICAgICBjb250ZW50OiAnPiB1bCdcbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG59XG5cbmZ1bmN0aW9uIE5hdmJhciAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbmF2YmFyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZHJvcGRvd246IFN0cmluZyxcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIGFsaWduOiBTdHJpbmcsXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlcixcbiAgICAgICAgICAgIGJvdW5kYXJ5OiBCb29sZWFuLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogQm9vbGVhbixcbiAgICAgICAgICAgIGNsc0Ryb3A6IFN0cmluZyxcbiAgICAgICAgICAgIGRlbGF5U2hvdzogTnVtYmVyLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXG4gICAgICAgICAgICBkcm9wYmFyOiBCb29sZWFuLFxuICAgICAgICAgICAgZHJvcGJhck1vZGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRyb3BiYXJBbmNob3I6ICdxdWVyeScsXG4gICAgICAgICAgICBkdXJhdGlvbjogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGRyb3Bkb3duOiAnLnVrLW5hdmJhci1uYXYgPiBsaScsXG4gICAgICAgICAgICBhbGlnbjogIWlzUnRsID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGNsc0Ryb3A6ICd1ay1uYXZiYXItZHJvcGRvd24nLFxuICAgICAgICAgICAgbW9kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb2Zmc2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkZWxheVNob3c6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlbGF5SGlkZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZmxpcDogJ3gnLFxuICAgICAgICAgICAgYm91bmRhcnk6IHRydWUsXG4gICAgICAgICAgICBkcm9wYmFyOiBmYWxzZSxcbiAgICAgICAgICAgIGRyb3BiYXJNb2RlOiAnc2xpZGUnLFxuICAgICAgICAgICAgZHJvcGJhckFuY2hvcjogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGJvdW5kYXJ5OiBmdW5jdGlvbiBib3VuZGFyeShyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHJlZi5ib3VuZGFyeTtcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRhcnlBbGlnbiA9IHJlZi5ib3VuZGFyeUFsaWduO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChib3VuZGFyeSA9PT0gdHJ1ZSB8fCBib3VuZGFyeUFsaWduKSA/ICRlbCA6IGJvdW5kYXJ5O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcG9zOiBmdW5jdGlvbiBwb3MocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFsaWduID0gcmVmLmFsaWduO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcImJvdHRvbS1cIiArIGFsaWduKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZUNvbm5lY3Q6IGZ1bmN0aW9uIGJlZm9yZUNvbm5lY3QoKSB7XG5cbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLiRwcm9wcztcbiAgICAgICAgICAgIHZhciBkcm9wYmFyID0gcmVmLmRyb3BiYXI7XG5cbiAgICAgICAgICAgIHRoaXMuZHJvcGJhciA9IGRyb3BiYXIgJiYgKGlzU3RyaW5nKGRyb3BiYXIpICYmIHF1ZXJ5KGRyb3BiYXIsIHRoaXMuJGVsKSB8fCAkKCc8ZGl2PjwvZGl2PicpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJvcGJhcikge1xuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5kcm9wYmFyLCAndWstbmF2YmFyLWRyb3BiYXInKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3BiYXJNb2RlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZHJvcGJhciwgJ3VrLW5hdmJhci1kcm9wYmFyLXNsaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3BiYXIgJiYgcmVtb3ZlKHRoaXMuZHJvcGJhcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgICAgICAgICAgIFVJa2l0LmRyb3AoXG4gICAgICAgICAgICAgICAgJCQoKCh0aGlzLmRyb3Bkb3duKSArIFwiIC5cIiArICh0aGlzLmNsc0Ryb3ApKSwgdGhpcy4kZWwpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICFVSWtpdC5nZXRDb21wb25lbnQoZWwsICdkcm9wJykgJiYgIVVJa2l0LmdldENvbXBvbmVudChlbCwgJ2Ryb3Bkb3duJyk7IH0pLFxuICAgICAgICAgICAgICAgIGFzc2lnbih7fSwgdGhpcy4kcHJvcHMsIHtib3VuZGFyeTogdGhpcy5ib3VuZGFyeSwgcG9zOiB0aGlzLnBvcywgb2Zmc2V0OiB0aGlzLmRyb3BiYXIgfHwgdGhpcy5vZmZzZXR9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ21vdXNlb3ZlcicsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJlZi5jdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlICYmIGFjdGl2ZS50b2dnbGUgJiYgIXdpdGhpbihhY3RpdmUudG9nZ2xlLiRlbCwgY3VycmVudCkgJiYgIWFjdGl2ZS50cmFja2VyLm1vdmVzVG8oYWN0aXZlLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdtb3VzZWxlYXZlJyxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGJhcjtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSAmJiAhbWF0Y2hlcyh0aGlzLmRyb3BiYXIsICc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3Jlc2hvdycsXG5cbiAgICAgICAgICAgICAgICBjYXB0dXJlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BiYXI7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3BiYXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIodGhpcy5kcm9wYmFyQW5jaG9yIHx8IHRoaXMuJGVsLCB0aGlzLmRyb3BiYXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICAgICAgY2FwdHVyZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcm9wYmFyO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKF8sIGRyb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gZHJvcC4kZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNEcm9wICYmIGFkZENsYXNzKCRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItZHJvcGJhclwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJGVsLm9mZnNldEhlaWdodCArIHRvRmxvYXQoY3NzKCRlbCwgJ21hcmdpbi10b3AnKSkgKyB0b0Zsb2F0KGNzcygkZWwsICdtYXJnaW4tYm90dG9tJykpLCAkZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3JlaGlkZScsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGJhcjtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlLCByZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCA9IHJlZi4kZWw7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyh0aGlzLmRyb3BiYXIsICc6aG92ZXInKSAmJiBhY3RpdmUgJiYgYWN0aXZlLiRlbCA9PT0gJGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BiYXI7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoXywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUgfHwgYWN0aXZlICYmIGFjdGl2ZS4kZWwgPT09ICRlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGdldEFjdGl2ZTogZnVuY3Rpb24gZ2V0QWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSBVSWtpdC5kcm9wLmdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmUgJiYgaW5jbHVkZXMoYWN0aXZlLm1vZGUsICdob3ZlcicpICYmIHdpdGhpbihhY3RpdmUudG9nZ2xlLiRlbCwgdGhpcy4kZWwpICYmIGFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zaXRpb25UbzogZnVuY3Rpb24gdHJhbnNpdGlvblRvKG5ld0hlaWdodCwgZWwpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBkcm9wYmFyID0gcmVmLmRyb3BiYXI7XG4gICAgICAgICAgICAgICAgdmFyIG9sZEhlaWdodCA9IGlzVmlzaWJsZShkcm9wYmFyKSA/IGhlaWdodChkcm9wYmFyKSA6IDA7XG5cbiAgICAgICAgICAgICAgICBlbCA9IG9sZEhlaWdodCA8IG5ld0hlaWdodCAmJiBlbDtcblxuICAgICAgICAgICAgICAgIGNzcyhlbCwge2hlaWdodDogb2xkSGVpZ2h0LCBvdmVyZmxvdzogJ2hpZGRlbid9KTtcbiAgICAgICAgICAgICAgICBoZWlnaHQoZHJvcGJhciwgb2xkSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKFtlbCwgZHJvcGJhcl0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydChbZWwsIGRyb3BiYXJdLCB7aGVpZ2h0OiBuZXdIZWlnaHR9LCB0aGlzLmR1cmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gobm9vcClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gY3NzKGVsLCB7aGVpZ2h0OiAnJywgb3ZlcmZsb3c6ICcnfSk7IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbnZhciBzY3JvbGw7XG5cbmZ1bmN0aW9uIE9mZmNhbnZhcyAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnb2ZmY2FudmFzJywge1xuXG4gICAgICAgIG1peGluczogW01vZGFsXSxcblxuICAgICAgICBhcmdzOiAnbW9kZScsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFN0cmluZyxcbiAgICAgICAgICAgIG1vZGU6IFN0cmluZyxcbiAgICAgICAgICAgIGZsaXA6IEJvb2xlYW4sXG4gICAgICAgICAgICBvdmVybGF5OiBCb29sZWFuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcudWstb2ZmY2FudmFzLWNvbnRlbnQnLFxuICAgICAgICAgICAgbW9kZTogJ3NsaWRlJyxcbiAgICAgICAgICAgIGZsaXA6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcmxheTogZmFsc2UsXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstb2ZmY2FudmFzLXBhZ2UnLFxuICAgICAgICAgICAgY2xzQ29udGFpbmVyOiAndWstb2ZmY2FudmFzLWNvbnRhaW5lcicsXG4gICAgICAgICAgICBjbHNQYW5lbDogJ3VrLW9mZmNhbnZhcy1iYXInLFxuICAgICAgICAgICAgY2xzRmxpcDogJ3VrLW9mZmNhbnZhcy1mbGlwJyxcbiAgICAgICAgICAgIGNsc0NvbnRlbnQ6ICd1ay1vZmZjYW52YXMtY29udGVudCcsXG4gICAgICAgICAgICBjbHNDb250ZW50QW5pbWF0aW9uOiAndWstb2ZmY2FudmFzLWNvbnRlbnQtYW5pbWF0aW9uJyxcbiAgICAgICAgICAgIGNsc1NpZGViYXJBbmltYXRpb246ICd1ay1vZmZjYW52YXMtYmFyLWFuaW1hdGlvbicsXG4gICAgICAgICAgICBjbHNNb2RlOiAndWstb2ZmY2FudmFzJyxcbiAgICAgICAgICAgIGNsc092ZXJsYXk6ICd1ay1vZmZjYW52YXMtb3ZlcmxheScsXG4gICAgICAgICAgICBzZWxDbG9zZTogJy51ay1vZmZjYW52YXMtY2xvc2UnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24gY29udGVudChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IHJlZi5jb250ZW50O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY29udGVudCkgfHwgZG9jLmJvZHk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbHNGbGlwOiBmdW5jdGlvbiBjbHNGbGlwKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmbGlwID0gcmVmLmZsaXA7XG4gICAgICAgICAgICAgICAgdmFyIGNsc0ZsaXAgPSByZWYuY2xzRmxpcDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmbGlwID8gY2xzRmxpcCA6ICcnO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xzT3ZlcmxheTogZnVuY3Rpb24gY2xzT3ZlcmxheShyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheSA9IHJlZi5vdmVybGF5O1xuICAgICAgICAgICAgICAgIHZhciBjbHNPdmVybGF5ID0gcmVmLmNsc092ZXJsYXk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmxheSA/IGNsc092ZXJsYXkgOiAnJztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc01vZGU6IGZ1bmN0aW9uIGNsc01vZGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzTW9kZSA9IHJlZi5jbHNNb2RlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjbHNNb2RlICsgXCItXCIgKyBtb2RlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc1NpZGViYXJBbmltYXRpb246IGZ1bmN0aW9uIGNsc1NpZGViYXJBbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzU2lkZWJhckFuaW1hdGlvbiA9IHJlZi5jbHNTaWRlYmFyQW5pbWF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdub25lJyB8fCBtb2RlID09PSAncmV2ZWFsJyA/ICcnIDogY2xzU2lkZWJhckFuaW1hdGlvbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc0NvbnRlbnRBbmltYXRpb246IGZ1bmN0aW9uIGNsc0NvbnRlbnRBbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzQ29udGVudEFuaW1hdGlvbiA9IHJlZi5jbHNDb250ZW50QW5pbWF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgIT09ICdwdXNoJyAmJiBtb2RlICE9PSAncmV2ZWFsJyA/ICcnIDogY2xzQ29udGVudEFuaW1hdGlvbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zaXRpb25FbGVtZW50OiBmdW5jdGlvbiB0cmFuc2l0aW9uRWxlbWVudChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IHJlZi5tb2RlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdyZXZlYWwnID8gdGhpcy5wYW5lbC5wYXJlbnROb2RlIDogdGhpcy5wYW5lbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBY3RpdmUoKSA9PT0gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXkgfHwgdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCh0aGlzLmNvbnRlbnQsIHdpZHRoKHdpbikgLSB0aGlzLnNjcm9sbGJhcldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLmNvbnRlbnQsIGhlaWdodCh3aW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhW2hyZWZePVwiI1wiXSc7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaGFzaCAmJiAkKGN1cnJlbnQuaGFzaCwgdGhpcy5jb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3Jlc2Nyb2xsJyxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5O1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHNjcm9sbCwgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgJiYgdGFyZ2V0ICYmIHRoaXMuaXNUb2dnbGVkKCkgJiYgJCh0YXJnZXQsIHRoaXMuY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2UodGhpcy4kZWwsICdoaWRkZW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzY3JvbGwuc2Nyb2xsVG8odGFyZ2V0KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBzY3JvbGwgfHwge3g6IHdpbi5wYWdlWE9mZnNldCwgeTogd2luLnBhZ2VZT2Zmc2V0fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAncmV2ZWFsJyAmJiAhaGFzQ2xhc3ModGhpcy5wYW5lbCwgdGhpcy5jbHNNb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEFsbCh0aGlzLnBhbmVsLCAnPGRpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGFuZWwucGFyZW50Tm9kZSwgdGhpcy5jbHNNb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNzcyhkb2NFbCwgJ292ZXJmbG93WScsICghdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uIHx8IHRoaXMuZmxpcCkgJiYgdGhpcy5zY3JvbGxiYXJXaWR0aCAmJiB0aGlzLm92ZXJsYXkgPyAnc2Nyb2xsJyA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jLmJvZHksIHRoaXMuY2xzQ29udGFpbmVyLCB0aGlzLmNsc0ZsaXAsIHRoaXMuY2xzT3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodChkb2MuYm9keSk7IC8vIGZvcmNlIHJlZmxvd1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmNvbnRlbnQsIHRoaXMuY2xzQ29udGVudEFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGFuZWwsICgodGhpcy5jbHNTaWRlYmFyQW5pbWF0aW9uKSArIFwiIFwiICsgKHRoaXMubW9kZSAhPT0gJ3JldmVhbCcgPyB0aGlzLmNsc01vZGUgOiAnJykpKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzT3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsKTsgLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuY29udGVudCwgdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ25vbmUnIHx8IGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMgJiYgYWN0aXZlICE9PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy5wYW5lbCwgJ3RyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZGVuJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXZlYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bndyYXAodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0ge3g6IHdpbi5wYWdlWE9mZnNldCwgeTogd2luLnBhZ2VZT2Zmc2V0fTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gcmVmLnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IHt4OiB4LCB5OiB5fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMucGFuZWwsIHRoaXMuY2xzU2lkZWJhckFuaW1hdGlvbiwgdGhpcy5jbHNNb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzT3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvYy5ib2R5LCB0aGlzLmNsc0NvbnRhaW5lciwgdGhpcy5jbHNGbGlwLCB0aGlzLmNsc092ZXJsYXkpO1xuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5zY3JvbGxUb3AgPSBzY3JvbGwueTtcblxuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jRWwsICdvdmVyZmxvdy15JywgJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoKHRoaXMuY29udGVudCwgJycpO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy5jb250ZW50LCAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKHNjcm9sbC54LCBzY3JvbGwueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3dpcGVMZWZ0IHN3aXBlUmlnaHQnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgaXNUb3VjaChlKSAmJiAoZS50eXBlID09PSAnc3dpcGVMZWZ0JyAmJiAhdGhpcy5mbGlwIHx8IGUudHlwZSA9PT0gJ3N3aXBlUmlnaHQnICYmIHRoaXMuZmxpcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gUmVzcG9uc2l2ZSAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgncmVzcG9uc2l2ZScsIHtcblxuICAgICAgICBwcm9wczogWyd3aWR0aCcsICdoZWlnaHQnXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1yZXNwb25zaXZlLXdpZHRoJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmlzaWJsZSh0aGlzLiRlbCkgJiYgdGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICA/IHt3aWR0aDogd2lkdGgodGhpcy4kZWwucGFyZW50Tm9kZSksIGhlaWdodDogdGhpcy5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoZGltKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsLCBEaW1lbnNpb25zLmNvbnRhaW4oe2hlaWdodDogdGhpcy5oZWlnaHQsIHdpZHRoOiB0aGlzLndpZHRofSwgZGltKS5oZWlnaHQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBTY3JvbGwgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3Njcm9sbCcsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZHVyYXRpb246IE51bWJlcixcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzY3JvbGxUbzogZnVuY3Rpb24gc2Nyb2xsVG8oZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgZWwgPSBlbCAmJiAkKGVsKSB8fCBkb2MuYm9keTtcblxuICAgICAgICAgICAgICAgIHZhciBkb2NIZWlnaHQgPSBoZWlnaHQoZG9jKTtcbiAgICAgICAgICAgICAgICB2YXIgd2luSGVpZ2h0ID0gaGVpZ2h0KHdpbik7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gb2Zmc2V0KGVsKS50b3AgLSB0aGlzLm9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICsgd2luSGVpZ2h0ID4gZG9jSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGRvY0hlaWdodCAtIHdpbkhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRyaWdnZXIodGhpcy4kZWwsICdiZWZvcmVzY3JvbGwnLCBbdGhpcywgZWxdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRZID0gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WSA9IHN0YXJ0WSArICh0YXJnZXQgLSBzdGFydFkpICogZWFzZShjbGFtcCgoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIHRoaXMkMS5kdXJhdGlvbikpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbyh3aW4ucGFnZVhPZmZzZXQsIGN1cnJlbnRZKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFkgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzJDEuJGVsLCAnc2Nyb2xsZWQnLCBbdGhpcyQxLCBlbF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgc3RlcCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvKGVzY2FwZSh0aGlzLiRlbC5oYXNoKS5zdWJzdHIoMSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZWFzZShrKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIFNjcm9sbHNweSAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2Nyb2xsc3B5Jywge1xuXG4gICAgICAgIGFyZ3M6ICdjbHMnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjbHM6ICdsaXN0JyxcbiAgICAgICAgICAgIHRhcmdldDogU3RyaW5nLFxuICAgICAgICAgICAgaGlkZGVuOiBCb29sZWFuLFxuICAgICAgICAgICAgb2Zmc2V0VG9wOiBOdW1iZXIsXG4gICAgICAgICAgICBvZmZzZXRMZWZ0OiBOdW1iZXIsXG4gICAgICAgICAgICByZXBlYXQ6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWxheTogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGNsczogW10sXG4gICAgICAgICAgICB0YXJnZXQ6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgb2Zmc2V0VG9wOiAwLFxuICAgICAgICAgICAgb2Zmc2V0TGVmdDogMCxcbiAgICAgICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICAgIGluVmlld0NsYXNzOiAndWstc2Nyb2xsc3B5LWludmlldydcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBlbGVtZW50czogZnVuY3Rpb24gZWxlbWVudHMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPyAkJCh0YXJnZXQsICRlbCkgOiBbJGVsXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGZpbHRlcih0aGlzLmVsZW1lbnRzLCAoXCI6bm90KC5cIiArICh0aGlzLmluVmlld0NsYXNzKSArIFwiKVwiKSksICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKGVscykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIExldCBjaGlsZCBjb21wb25lbnRzIGJlIGFwcGxpZWQgYXQgbGVhc3Qgb25jZSBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIVVJa2l0Ll9pbml0aWFsaXplZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLiRlbWl0KCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbERhdGEgPSBlbHNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWxEYXRhIHx8IGVsRGF0YS5lbCAhPT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xzID0gZGF0YShlbCwgJ3VrLXNjcm9sbHNweS1jbGFzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsRGF0YSA9IHtlbDogZWwsIHRvZ2dsZXM6IGNscyAmJiBjbHMuc3BsaXQoJywnKSB8fCB0aGlzJDEuY2xzfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxEYXRhLnNob3cgPSBpc0luVmlldyhlbCwgdGhpcyQxLm9mZnNldFRvcCwgdGhpcyQxLm9mZnNldExlZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzW2ldID0gZWxEYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDEgPyAxIDogMDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbERhdGEgPSBlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xzID0gZWxEYXRhLnRvZ2dsZXNbaV0gfHwgZWxEYXRhLnRvZ2dsZXNbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbERhdGEuc2hvdyAmJiAhZWxEYXRhLmludmlldyAmJiAhZWxEYXRhLnRpbWVyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCAndmlzaWJpbGl0eScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWwsIHRoaXMkMS5pblZpZXdDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCBjbHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsICdpbnZpZXcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsRGF0YS5pbnZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZWxEYXRhLnRpbWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmRlbGF5ICYmIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsRGF0YS50aW1lciA9IHNldFRpbWVvdXQoc2hvdywgdGhpcyQxLmRlbGF5ICogaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFlbERhdGEuc2hvdyAmJiBlbERhdGEuaW52aWV3ICYmIHRoaXMkMS5yZXBlYXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbERhdGEudGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVsRGF0YS50aW1lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlbERhdGEudGltZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCAndmlzaWJpbGl0eScsIHRoaXMkMS5oaWRkZW4gPyAnaGlkZGVuJyA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlbCwgdGhpcyQxLmluVmlld0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgY2xzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsICdvdXR2aWV3Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxEYXRhLmludmlldyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIFNjcm9sbHNweU5hdiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2Nyb2xsc3B5LW5hdicsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2xzOiBTdHJpbmcsXG4gICAgICAgICAgICBjbG9zZXN0OiBTdHJpbmcsXG4gICAgICAgICAgICBzY3JvbGw6IEJvb2xlYW4sXG4gICAgICAgICAgICBvdmVyZmxvdzogQm9vbGVhbixcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGNsczogJ3VrLWFjdGl2ZScsXG4gICAgICAgICAgICBjbG9zZXN0OiBmYWxzZSxcbiAgICAgICAgICAgIHNjcm9sbDogZmFsc2UsXG4gICAgICAgICAgICBvdmVyZmxvdzogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGxpbmtzOiBmdW5jdGlvbiBsaW5rcyhfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCQoJ2FbaHJlZl49XCIjXCJdJywgJGVsKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5oYXNoOyB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVsZW1lbnRzOiBmdW5jdGlvbiBlbGVtZW50cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZXN0ID8gY2xvc2VzdCh0aGlzLmxpbmtzLCB0aGlzLmNsb3Nlc3QpIDogdGhpcy5saW5rcztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRhcmdldHM6IGZ1bmN0aW9uIHRhcmdldHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkKHRoaXMubGlua3MubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaGFzaDsgfSkuam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJa2l0LnNjcm9sbCh0aGlzLmxpbmtzLCB7b2Zmc2V0OiB0aGlzLm9mZnNldCB8fCAwfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQgKyB0aGlzLm9mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXggPSBoZWlnaHQoZG9jKSAtIGhlaWdodCh3aW4pICsgdGhpcy5vZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldHMuZXZlcnkoZnVuY3Rpb24gKGVsLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBvZmZzZXQoZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9IHJlZi50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IGkgKyAxID09PSB0aGlzJDEudGFyZ2V0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcyQxLm92ZXJmbG93ICYmIChpID09PSAwICYmIHRvcCA+IHNjcm9sbCB8fCBsYXN0ICYmIHRvcCArIGVsLm9mZnNldFRvcCA8IHNjcm9sbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFzdCAmJiBvZmZzZXQodGhpcyQxLnRhcmdldHNbaSArIDFdKS50b3AgPD0gc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHRoaXMkMS50YXJnZXRzLmxlbmd0aCAtIDE7IGogPiBpOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5WaWV3KHRoaXMkMS50YXJnZXRzW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSB0aGlzJDEudGFyZ2V0c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShkYXRhLmFjdGl2ZSA9ICQoZmlsdGVyKHRoaXMkMS5saW5rcywgKFwiW2hyZWY9XFxcIiNcIiArIChlbC5pZCkgKyBcIlxcXCJdXCIpKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHJlZi5hY3RpdmU7XG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5ibHVyKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRzLCB0aGlzLmNscyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2FjdGl2ZScsIFthY3RpdmUsIGFkZENsYXNzKHRoaXMuY2xvc2VzdCA/IGNsb3Nlc3QoYWN0aXZlLCB0aGlzLmNsb3Nlc3QpIDogYWN0aXZlLCB0aGlzLmNscyldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydzY3JvbGwnLCAnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gU3RpY2t5IChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzdGlja3knLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgICAgICBib3R0b206IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlcixcbiAgICAgICAgICAgIGFuaW1hdGlvbjogU3RyaW5nLFxuICAgICAgICAgICAgY2xzQWN0aXZlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRml4ZWQ6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0JlbG93OiBTdHJpbmcsXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoRWxlbWVudDogJ3F1ZXJ5JyxcbiAgICAgICAgICAgIHNob3dPblVwOiBCb29sZWFuLFxuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYScsXG4gICAgICAgICAgICB0YXJnZXQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBib3R0b206IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiAnJyxcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogJ3VrLWFjdGl2ZScsXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogJycsXG4gICAgICAgICAgICBjbHNGaXhlZDogJ3VrLXN0aWNreS1maXhlZCcsXG4gICAgICAgICAgICBjbHNCZWxvdzogJ3VrLXN0aWNreS1iZWxvdycsXG4gICAgICAgICAgICBzZWxUYXJnZXQ6ICcnLFxuICAgICAgICAgICAgd2lkdGhFbGVtZW50OiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dPblVwOiBmYWxzZSxcbiAgICAgICAgICAgIG1lZGlhOiBmYWxzZSxcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IGZ1bmN0aW9uIHNlbFRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxUYXJnZXQgPSByZWYuc2VsVGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbFRhcmdldCAmJiAkKHNlbFRhcmdldCwgJGVsKSB8fCAkZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcblxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICQoJzxkaXYgY2xhc3M9XCJ1ay1zdGlja3ktcGxhY2Vob2xkZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgIHRoaXMud2lkdGhFbGVtZW50ID0gdGhpcy4kcHJvcHMud2lkdGhFbGVtZW50IHx8IHRoaXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnNlbFRhcmdldCwgdGhpcy5jbHNJbmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlbW92ZSh0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy53aWR0aEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIGlmICghKHRoaXMudGFyZ2V0ICYmIGxvY2F0aW9uLmhhc2ggJiYgd2luLnBhZ2VZT2Zmc2V0ID4gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGxvY2F0aW9uLmhhc2gpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZmFzdGRvbS5yZWFkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gb2Zmc2V0KHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSByZWYudG9wO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxUb3AgPSBvZmZzZXQodGhpcyQxLiRlbCkudG9wO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSB0aGlzJDEuJGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxUb3AgKyBlbEhlaWdodCA+PSB0b3AgJiYgZWxUb3AgPD0gdG9wICsgdGFyZ2V0Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKDAsIHRvcCAtIGVsSGVpZ2h0IC0gdGhpcyQxLnRhcmdldCAtIHRoaXMkMS5vZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FjdGl2ZScsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0luYWN0aXZlLCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2luYWN0aXZlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlLCB0aGlzLmNsc0luYWN0aXZlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHJlZi5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dGVySGVpZ2h0ID0gKHRoaXMuaXNBY3RpdmUgPyBwbGFjZWhvbGRlciA6IHRoaXMuJGVsKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHBsYWNlaG9sZGVyLCBhc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgICAgICB7aGVpZ2h0OiBjc3ModGhpcy4kZWwsICdwb3NpdGlvbicpICE9PSAnYWJzb2x1dGUnID8gb3V0ZXJIZWlnaHQgOiAnJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIFsnbWFyZ2luVG9wJywgJ21hcmdpbkJvdHRvbScsICdtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10pXG4gICAgICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghd2l0aGluKHBsYWNlaG9sZGVyLCBkb2NFbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyKHRoaXMuJGVsLCBwbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyKHBsYWNlaG9sZGVyLCAnaGlkZGVuJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLndpZHRoRWxlbWVudCwgJ2hpZGRlbicsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy53aWR0aEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGF0dHIodGhpcy53aWR0aEVsZW1lbnQsICdoaWRkZW4nLCB0aGlzLmlzQWN0aXZlID8gbnVsbCA6ICcnKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcE9mZnNldCA9IG9mZnNldCh0aGlzLmlzQWN0aXZlID8gcGxhY2Vob2xkZXIgOiB0aGlzLiRlbCkudG9wO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbU9mZnNldCA9IHRoaXMudG9wT2Zmc2V0ICsgb3V0ZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHBhcnNlUHJvcCgnYm90dG9tJywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgPSBNYXRoLm1heCh0b0Zsb2F0KHBhcnNlUHJvcCgndG9wJywgdGhpcykpLCB0aGlzLnRvcE9mZnNldCkgLSB0aGlzLm9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b20gPSBib3R0b20gJiYgYm90dG9tIC0gb3V0ZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5hY3RpdmUgPSB0aGlzLm1lZGlhICYmICF3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoXywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxZID0gcmVmLnNjcm9sbFk7IGlmICggc2Nyb2xsWSA9PT0gdm9pZCAwICkgc2Nyb2xsWSA9IHdpbi5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0aGlzLnNjcm9sbCA9IHNjcm9sbFksXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBpc1Zpc2libGUodGhpcy4kZWwpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYsIHJlZiQxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmlzaWJsZSA9IHJlZi52aXNpYmxlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gcmVmLnNjcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCByZWYkMSA9PT0gdm9pZCAwICkgcmVmJDEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZiQxLmRpcjtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPCAwIHx8ICF2aXNpYmxlIHx8IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5zaG93T25VcCAmJiAhZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgc2Nyb2xsIDwgdGhpcy50b3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuc2hvd09uVXAgJiYgKHNjcm9sbCA8PSB0aGlzLnRvcCB8fCBkaXIgPT09ICdkb3duJyB8fCBkaXIgPT09ICd1cCcgJiYgIXRoaXMuaXNBY3RpdmUgJiYgc2Nyb2xsIDw9IHRoaXMuYm90dG9tT2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiAmJiBzY3JvbGwgPiB0aGlzLnRvcE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5vdXQodGhpcy4kZWwsIHRoaXMuYW5pbWF0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5oaWRlKCk7IH0sIG5vb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uaW4odGhpcy4kZWwsIHRoaXMuYW5pbWF0aW9uKS5jYXRjaChub29wKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJ11cblxuICAgICAgICAgICAgfSBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLnBsYWNlaG9sZGVyLCAnaGlkZGVuJywgbnVsbCk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgaGFzQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNGaXhlZCwgdGhpcy5jbHNCZWxvdyk7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7cG9zaXRpb246ICcnLCB0b3A6ICcnLCB3aWR0aDogJyd9KTtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMucGxhY2Vob2xkZXIsICdoaWRkZW4nLCAnJyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMudG9wICE9PSAwIHx8IHRoaXMuc2Nyb2xsID4gdGhpcy50b3A7XG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IE1hdGgubWF4KDAsIHRoaXMub2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvdHRvbSAmJiB0aGlzLnNjcm9sbCA+IHRoaXMuYm90dG9tIC0gdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gdGhpcy5ib3R0b20gLSB0aGlzLnNjcm9sbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogKHRvcCArIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0JlbG93LCB0aGlzLnNjcm9sbCA+IHRoaXMuYm90dG9tT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNGaXhlZCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlUHJvcChwcm9wLCByZWYpIHtcbiAgICAgICAgdmFyICRwcm9wcyA9IHJlZi4kcHJvcHM7XG4gICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xuICAgICAgICB2YXIgcHJvcE9mZnNldCA9IHJlZlsocHJvcCArIFwiT2Zmc2V0XCIpXTtcblxuXG4gICAgICAgIHZhciB2YWx1ZSA9ICRwcm9wc1twcm9wXTtcblxuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOdW1lcmljKHZhbHVlKSkge1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcE9mZnNldCArIHRvRmxvYXQodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLm1hdGNoKC9eLT9cXGQrdmgkLykpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGhlaWdodCh3aW4pICogdG9GbG9hdCh2YWx1ZSkgLyAxMDA7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGVsID0gdmFsdWUgPT09IHRydWUgPyAkZWwucGFyZW50Tm9kZSA6IHF1ZXJ5KHZhbHVlLCAkZWwpO1xuXG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0KGVsKS50b3AgKyBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG52YXIgc3ZncyA9IHt9O1xuXG5mdW5jdGlvbiBTdmcgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3N2ZycsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IFN0cmluZyxcbiAgICAgICAgICAgIGljb246IFN0cmluZyxcbiAgICAgICAgICAgIHNyYzogU3RyaW5nLFxuICAgICAgICAgICAgc3R5bGU6IFN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoOiBOdW1iZXIsXG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlcixcbiAgICAgICAgICAgIHJhdGlvOiBOdW1iZXIsXG4gICAgICAgICAgICAnY2xhc3MnOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgcmF0aW86IDEsXG4gICAgICAgICAgICBpZDogZmFsc2UsXG4gICAgICAgICAgICBleGNsdWRlOiBbJ3NyYyddLFxuICAgICAgICAgICAgJ2NsYXNzJzogJydcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzcyArPSAnIHVrLXN2Zyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiBpbmNsdWRlcyh0aGlzLnNyYywgJyMnKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5zcmMuc3BsaXQoJyMnKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ247XG4gICAgICAgICAgICAgICAgICAgIChhc3NpZ24gPSBwYXJ0cywgdGhpcy5zcmMgPSBhc3NpZ25bMF0sIHRoaXMuaWNvbiA9IGFzc2lnblsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuZ2V0U3ZnKCkudGhlbihmdW5jdGlvbiAoc3ZnKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcoc3ZnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuaWNvbiAmJiBpbmNsdWRlcyhzdmcsICc8c3ltYm9sJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2ZyA9IHBhcnNlU3ltYm9scyhzdmcsIHRoaXMkMS5pY29uKSB8fCBzdmc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbCA9ICQoc3ZnLnN1YnN0cihzdmcuaW5kZXhPZignPHN2ZycpKSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IHN2Zy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1NWRyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBhdHRyKGVsLCAndmlld0JveCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucyA9IGRpbWVuc2lvbnMuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLndpZHRoID0gdGhpcyQxLiRwcm9wcy53aWR0aCB8fCBkaW1lbnNpb25zWzJdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEuaGVpZ2h0ID0gdGhpcyQxLiRwcm9wcy5oZWlnaHQgfHwgZGltZW5zaW9uc1szXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzJDEud2lkdGggKj0gdGhpcyQxLnJhdGlvO1xuICAgICAgICAgICAgICAgIHRoaXMkMS5oZWlnaHQgKj0gdGhpcyQxLnJhdGlvO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzJDEuJG9wdGlvbnMucHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMVtwcm9wXSAmJiAhaW5jbHVkZXModGhpcyQxLmV4Y2x1ZGUsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLCBwcm9wLCB0aGlzJDFbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQXR0cihlbCwgJ2lkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS53aWR0aCAmJiAhdGhpcyQxLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnaGVpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5oZWlnaHQgJiYgIXRoaXMkMS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnd2lkdGgnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMkMS4kZWw7XG4gICAgICAgICAgICAgICAgaWYgKGlzVm9pZEVsZW1lbnQocm9vdCkgfHwgcm9vdC50YWdOYW1lID09PSAnQ0FOVkFTJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dHIocm9vdCwge2hpZGRlbjogdHJ1ZSwgaWQ6IG51bGx9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHJvb3QubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBlbC5pc0VxdWFsTm9kZShuZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBuZXh0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIocm9vdCwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcm9vdC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCAmJiBlbC5pc0VxdWFsTm9kZShsYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBsYXN0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kKHJvb3QsIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcyQxLnN2Z0VsID0gZWw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG5cbiAgICAgICAgICAgIH0sIG5vb3ApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBpZiAoaXNWb2lkRWxlbWVudCh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMuJGVsLCB7aGlkZGVuOiBudWxsLCBpZDogdGhpcy5pZCB8fCBudWxsfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN2Zykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ZnLnRoZW4oZnVuY3Rpb24gKHN2ZykgeyByZXR1cm4gKCF0aGlzJDEuX2Nvbm5lY3RlZCB8fCBzdmcgIT09IHRoaXMkMS5zdmdFbCkgJiYgcmVtb3ZlKHN2Zyk7IH0sIG5vb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuc3ZnRWwgPSBudWxsO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBnZXRTdmc6IGZ1bmN0aW9uIGdldFN2ZygpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNyYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc3Znc1t0aGlzLnNyY10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN2Z3NbdGhpcy5zcmNdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN2Z3NbdGhpcy5zcmNdID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydHNXaXRoKHRoaXMkMS5zcmMsICdkYXRhOicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRlY29kZVVSSUNvbXBvbmVudCh0aGlzJDEuc3JjLnNwbGl0KCcsJylbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWpheCh0aGlzJDEuc3JjKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHsgcmV0dXJuIHJlc29sdmUoeGhyLnJlc3BvbnNlKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoJ1NWRyBub3QgZm91bmQuJyk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc3Znc1t0aGlzLnNyY107XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHZhciBzeW1ib2xSZSA9IC88c3ltYm9sKC4qP2lkPShbJ1wiXSkoLio/KVxcMlteXSo/PFxcLylzeW1ib2w+L2c7XG4gICAgdmFyIHN5bWJvbHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlU3ltYm9scyhzdmcsIGljb24pIHtcblxuICAgICAgICBpZiAoIXN5bWJvbHNbc3ZnXSkge1xuXG4gICAgICAgICAgICBzeW1ib2xzW3N2Z10gPSB7fTtcblxuICAgICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgICAgd2hpbGUgKChtYXRjaCA9IHN5bWJvbFJlLmV4ZWMoc3ZnKSkpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2xzW3N2Z11bbWF0Y2hbM11dID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCJcIiArIChtYXRjaFsxXSkgKyBcInN2Zz5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN5bWJvbHNbc3ZnXVtpY29uXTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gU3dpdGNoZXIgKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3N3aXRjaGVyJywge1xuXG4gICAgICAgIG1peGluczogW1RvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ2Nvbm5lY3QnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjb25uZWN0OiBTdHJpbmcsXG4gICAgICAgICAgICB0b2dnbGU6IFN0cmluZyxcbiAgICAgICAgICAgIGFjdGl2ZTogTnVtYmVyLFxuICAgICAgICAgICAgc3dpcGluZzogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjb25uZWN0OiAnfi51ay1zd2l0Y2hlcicsXG4gICAgICAgICAgICB0b2dnbGU6ICc+IConLFxuICAgICAgICAgICAgYWN0aXZlOiAwLFxuICAgICAgICAgICAgc3dpcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNsczogJ3VrLWFjdGl2ZScsXG4gICAgICAgICAgICBjbHNDb250YWluZXI6ICd1ay1zd2l0Y2hlcicsXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLXN3aXRjaGVyLWl0ZW0nLFxuICAgICAgICAgICAgcXVldWVkOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgY29ubmVjdHM6IGZ1bmN0aW9uIGNvbm5lY3RzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbm5lY3QgPSByZWYuY29ubmVjdDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeUFsbChjb25uZWN0LCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlczogZnVuY3Rpb24gdG9nZ2xlcyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0b2dnbGUgPSByZWYudG9nZ2xlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQkKHRvZ2dsZSwgJGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnRvZ2dsZSkgKyBcIjpub3QoLnVrLWRpc2FibGVkKVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KGUuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdHM7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcIltcIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXSxbZGF0YS1cIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KGRhdGEoZS5jdXJyZW50LCB0aGlzLmF0dHJJdGVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzd2lwZVJpZ2h0IHN3aXBlTGVmdCcsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3dpcGluZztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0cztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXdpbi5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZS50eXBlID09PSAnc3dpcGVMZWZ0JyA/ICduZXh0JyA6ICdwcmV2aW91cycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RzLmZvckVhY2goZnVuY3Rpb24gKGxpc3QpIHsgcmV0dXJuIHRoaXMkMS51cGRhdGVBcmlhKGxpc3QuY2hpbGRyZW4pOyB9KTtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhmaWx0ZXIodGhpcy50b2dnbGVzLCAoXCIuXCIgKyAodGhpcy5jbHMpKSlbMF0gfHwgdGhpcy50b2dnbGVzW3RoaXMuYWN0aXZlXSB8fCB0aGlzLnRvZ2dsZXNbMF0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMudG9nZ2xlcztcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVmLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9ICEhdGhpcy5jb25uZWN0cy5sZW5ndGggJiYgaW5kZXgoZmlsdGVyKHRoaXMuY29ubmVjdHNbMF0uY2hpbGRyZW4sIChcIi5cIiArICh0aGlzLmNscykpKVswXSk7XG4gICAgICAgICAgICAgICAgdmFyIGhhc1ByZXYgPSBwcmV2ID49IDA7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IGl0ZW0gPT09ICdwcmV2aW91cycgPyAtMSA6IDE7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlLCBuZXh0ID0gZ2V0SW5kZXgoaXRlbSwgdGhpcy50b2dnbGVzLCBwcmV2KTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyssIG5leHQgPSAobmV4dCArIGRpciArIGxlbmd0aCkgJSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVzKHRoaXMkMS50b2dnbGVzW25leHRdLCAnLnVrLWRpc2FibGVkLCBbZGlzYWJsZWRdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZSA9IHRoaXMkMS50b2dnbGVzW25leHRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRvZ2dsZSB8fCBwcmV2ID49IDAgJiYgaGFzQ2xhc3ModG9nZ2xlLCB0aGlzLmNscykgfHwgcHJldiA9PT0gbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy50b2dnbGVzLCB0aGlzLmNscyk7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLnRvZ2dsZXMsICdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRvZ2dsZSwgdGhpcy5jbHMpO1xuICAgICAgICAgICAgICAgIGF0dHIodG9nZ2xlLCAnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzUHJldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZU5vdyhsaXN0LmNoaWxkcmVuW25leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGVFbGVtZW50KFtsaXN0LmNoaWxkcmVuW3ByZXZdLCBsaXN0LmNoaWxkcmVuW25leHRdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIFRhYiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndGFiJywgVUlraXQuY29tcG9uZW50cy5zd2l0Y2hlci5leHRlbmQoe1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBuYW1lOiAndGFiJyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYSdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbWVkaWE6IDk2MCxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstdGFiLWl0ZW0nXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgICAgICAgICAgdmFyIGNscyA9IGhhc0NsYXNzKHRoaXMuJGVsLCAndWstdGFiLWxlZnQnKVxuICAgICAgICAgICAgICAgID8gJ3VrLXRhYi1sZWZ0J1xuICAgICAgICAgICAgICAgIDogaGFzQ2xhc3ModGhpcy4kZWwsICd1ay10YWItcmlnaHQnKVxuICAgICAgICAgICAgICAgICAgICA/ICd1ay10YWItcmlnaHQnXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgICAgICBVSWtpdC50b2dnbGUodGhpcy4kZWwsIHtjbHM6IGNscywgbW9kZTogJ21lZGlhJywgbWVkaWE6IHRoaXMubWVkaWF9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG59XG5cbmZ1bmN0aW9uIFRvZ2dsZSAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndG9nZ2xlJywge1xuXG4gICAgICAgIG1peGluczogW1VJa2l0Lm1peGluLnRvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ3RhcmdldCcsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGhyZWY6IFN0cmluZyxcbiAgICAgICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIG1lZGlhOiAnbWVkaWEnXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGhyZWY6IGZhbHNlLFxuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGU6ICdjbGljaycsXG4gICAgICAgICAgICBxdWV1ZWQ6IHRydWUsXG4gICAgICAgICAgICBtZWRpYTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uIHRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBocmVmID0gcmVmLmhyZWY7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBxdWVyeUFsbCh0YXJnZXQgfHwgaHJlZiwgJGVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aCAmJiB0YXJnZXQgfHwgWyRlbF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogKHBvaW50ZXJFbnRlciArIFwiIFwiICsgcG9pbnRlckxlYXZlKSxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZXModGhpcy5tb2RlLCAnaG92ZXInKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKFwidG9nZ2xlXCIgKyAoZS50eXBlID09PSBwb2ludGVyRW50ZXIgPyAnc2hvdycgOiAnaGlkZScpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2NsaWNrJykgfHwgaGFzVG91Y2g7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSAmJiAhaW5jbHVkZXModGhpcy5tb2RlLCAnY2xpY2snKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBiZXR0ZXIgaXNUb2dnbGVkIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdChlLnRhcmdldCwgJ2FbaHJlZj1cIiNcIl0sIGJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAobGluayA9IGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWZdJykpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFpc1Zpc2libGUodGhpcy50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGluay5oYXNoICYmIG1hdGNoZXModGhpcy50YXJnZXQsIGxpbmsuaGFzaClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlKGRvYywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVzKHRoaXMubW9kZSwgJ21lZGlhJykgfHwgIXRoaXMubWVkaWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVkID0gdGhpcy5pc1RvZ2dsZWQodGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICh3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzID8gIXRvZ2dsZWQgOiB0b2dnbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZSh0eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIodGhpcy50YXJnZXQsIHR5cGUgfHwgJ3RvZ2dsZScsIFt0aGlzXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gVmlkZW8gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3ZpZGVvJywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBhdXRvbXV0ZTogQm9vbGVhbixcbiAgICAgICAgICAgIGF1dG9wbGF5OiBCb29sZWFuLFxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhdXRvbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGluVmlldzogZnVuY3Rpb24gaW5WaWV3KHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBhdXRvcGxheSA9IHJlZi5hdXRvcGxheTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhdXRvcGxheSA9PT0gJ2ludmlldyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9tdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubXV0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoXywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMucGxheWVyIHx8ICh0eXBlID09PSAnc2Nyb2xsJyB8fCB0eXBlID09PSAncmVzaXplJykgJiYgIXRoaXMuaW5WaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBpc1Zpc2libGUodGhpcy4kZWwpICYmIGNzcyh0aGlzLiRlbCwgJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5WaWV3OiB0aGlzLmluVmlldyAmJiBpc0luVmlldyh0aGlzLiRlbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpc2libGUgPSByZWYudmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluVmlldyA9IHJlZi5pblZpZXc7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpc2libGUgfHwgdGhpcy5pblZpZXcgJiYgIWluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9wbGF5ID09PSB0cnVlIHx8IHRoaXMuaW5WaWV3ICYmIGluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJywgJ3Njcm9sbCddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gY29yZSAoVUlraXQpIHtcblxuICAgIC8vIGNvcmUgY29tcG9uZW50c1xuICAgIFVJa2l0LnVzZShUb2dnbGUpO1xuICAgIFVJa2l0LnVzZShBY2NvcmRpb24pO1xuICAgIFVJa2l0LnVzZShBbGVydCk7XG4gICAgVUlraXQudXNlKFZpZGVvKTtcbiAgICBVSWtpdC51c2UoQ292ZXIpO1xuICAgIFVJa2l0LnVzZShEcm9wKTtcbiAgICBVSWtpdC51c2UoRHJvcGRvd24pO1xuICAgIFVJa2l0LnVzZShGb3JtQ3VzdG9tKTtcbiAgICBVSWtpdC51c2UoSGVpZ2h0TWF0Y2gpO1xuICAgIFVJa2l0LnVzZShIZWlnaHRWaWV3cG9ydCk7XG4gICAgVUlraXQudXNlKE1hcmdpbik7XG4gICAgVUlraXQudXNlKEdpZik7XG4gICAgVUlraXQudXNlKEdyaWQpO1xuICAgIFVJa2l0LnVzZShMZWFkZXIpO1xuICAgIFVJa2l0LnVzZShNb2RhbCQxKTtcbiAgICBVSWtpdC51c2UoTmF2KTtcbiAgICBVSWtpdC51c2UoTmF2YmFyKTtcbiAgICBVSWtpdC51c2UoT2ZmY2FudmFzKTtcbiAgICBVSWtpdC51c2UoUmVzcG9uc2l2ZSk7XG4gICAgVUlraXQudXNlKFNjcm9sbCk7XG4gICAgVUlraXQudXNlKFNjcm9sbHNweSk7XG4gICAgVUlraXQudXNlKFNjcm9sbHNweU5hdik7XG4gICAgVUlraXQudXNlKFN0aWNreSk7XG4gICAgVUlraXQudXNlKFN2Zyk7XG4gICAgVUlraXQudXNlKEljb24pO1xuICAgIFVJa2l0LnVzZShTd2l0Y2hlcik7XG4gICAgVUlraXQudXNlKFRhYik7XG5cbiAgICAvLyBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgICBVSWtpdC51c2UoQ29yZSk7XG5cbn1cblxuVUlraXQkMi52ZXJzaW9uID0gJzMuMC4wLWJldGEuNDAnO1xuXG5taXhpbihVSWtpdCQyKTtcbmNvcmUoVUlraXQkMik7XG5cbmZ1bmN0aW9uIHBsdWdpbihVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkID0gcmVmLiQ7XG4gICAgdmFyIGRvYyA9IHJlZi5kb2M7XG4gICAgdmFyIGVtcHR5ID0gcmVmLmVtcHR5O1xuICAgIHZhciBodG1sID0gcmVmLmh0bWw7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2NvdW50ZG93bicsIHtcblxuICAgICAgICBtaXhpbnM6IFtVSWtpdC5taXhpbi5jbGFzc10sXG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRhdGU6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc1dyYXBwZXI6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBkYXRlOiAnJyxcbiAgICAgICAgICAgIGNsc1dyYXBwZXI6ICcudWstY291bnRkb3duLSV1bml0JSdcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBkYXRlOiBmdW5jdGlvbiBkYXRlKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gcmVmLmRhdGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wYXJzZShkYXRlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRheXM6IGZ1bmN0aW9uIGRheXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnZGF5cycpLCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaG91cnM6IGZ1bmN0aW9uIGhvdXJzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsc1dyYXBwZXIgPSByZWYuY2xzV3JhcHBlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkKGNsc1dyYXBwZXIucmVwbGFjZSgnJXVuaXQlJywgJ2hvdXJzJyksICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBtaW51dGVzOiBmdW5jdGlvbiBtaW51dGVzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsc1dyYXBwZXIgPSByZWYuY2xzV3JhcHBlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkKGNsc1dyYXBwZXIucmVwbGFjZSgnJXVuaXQlJywgJ21pbnV0ZXMnKSwgJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlY29uZHM6IGZ1bmN0aW9uIHNlY29uZHMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnc2Vjb25kcycpLCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdW5pdHM6IGZ1bmN0aW9uIHVuaXRzKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXS5maWx0ZXIoZnVuY3Rpb24gKHVuaXQpIHsgcmV0dXJuIHRoaXMkMVt1bml0XTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChmdW5jdGlvbiAodW5pdCkgeyByZXR1cm4gZW1wdHkodGhpcyQxW3VuaXRdKTsgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd2aXNpYmlsaXR5Y2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGVsOiBkb2MsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciB0aW1lc3BhbiA9IGdldFRpbWVTcGFuKHRoaXMuZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGltZXNwYW4udG90YWwgPD0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzcGFuLmRheXNcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4uaG91cnNcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4ubWludXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgPSB0aW1lc3Bhbi5zZWNvbmRzXG4gICAgICAgICAgICAgICAgICAgICAgICA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51bml0cy5mb3JFYWNoKGZ1bmN0aW9uICh1bml0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IFN0cmluZyhNYXRoLmZsb29yKHRpbWVzcGFuW3VuaXRdKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLmxlbmd0aCA8IDIgPyAoXCIwXCIgKyBkaWdpdHMpIDogZGlnaXRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXMkMVt1bml0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnRleHRDb250ZW50ICE9PSBkaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5zcGxpdCgnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWdpdHMubGVuZ3RoICE9PSBlbC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sKGVsLCBkaWdpdHMubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuICc8c3Bhbj48L3NwYW4+JzsgfSkuam9pbignJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZGlnaXQsIGkpIHsgcmV0dXJuIGVsLmNoaWxkcmVuW2ldLnRleHRDb250ZW50ID0gZGlnaXQ7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLnVuaXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuJGVtaXQoKTsgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRUaW1lU3BhbihkYXRlKSB7XG5cbiAgICAgICAgdmFyIHRvdGFsID0gZGF0ZSAtIERhdGUubm93KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgIHNlY29uZHM6IHRvdGFsIC8gMTAwMCAlIDYwLFxuICAgICAgICAgICAgbWludXRlczogdG90YWwgLyAxMDAwIC8gNjAgJSA2MCxcbiAgICAgICAgICAgIGhvdXJzOiB0b3RhbCAvIDEwMDAgLyA2MCAvIDYwICUgMjQsXG4gICAgICAgICAgICBkYXlzOiB0b3RhbCAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDEoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBhZGRDbGFzcyA9IHJlZi5hZGRDbGFzcztcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcbiAgICB2YXIgc2Nyb2xsZWRPdmVyID0gcmVmLnNjcm9sbGVkT3ZlcjtcbiAgICB2YXIgc29ydEJ5ID0gcmVmLnNvcnRCeTtcbiAgICB2YXIgdG9GbG9hdCA9IHJlZi50b0Zsb2F0O1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdncmlkLXBhcmFsbGF4JywgVUlraXQuY29tcG9uZW50cy5ncmlkLmV4dGVuZCh7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogU3RyaW5nLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogMTUwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHJlZi50cmFuc2xhdGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWdyaWQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ21hcmdpbkJvdHRvbScsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSByZWYucm93cztcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogcm93cyAmJiByb3dzWzBdICYmIHJvd3NbMF0ubGVuZ3RoIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiByb3dzICYmIHJvd3MubWFwKGZ1bmN0aW9uIChlbGVtZW50cykgeyByZXR1cm4gc29ydEJ5KGVsZW1lbnRzLCAnb2Zmc2V0TGVmdCcpOyB9KVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW5zID0gcmVmLmNvbHVtbnM7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWFyZ2luQm90dG9tJywgY29sdW1ucyA+IDFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmFuc2xhdGUgKyB0b0Zsb2F0KGNzcyhjc3ModGhpcy4kZWwsICdtYXJnaW5Cb3R0b20nLCAnJyksICdtYXJnaW5Cb3R0b20nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJycpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtzY3JvbGxlZDogc2Nyb2xsZWRPdmVyKHRoaXMuJGVsKSAqIHRoaXMudHJhbnNsYXRlfTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHJlZi5yb3dzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1ucyA9IHJlZi5jb2x1bW5zO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsZWQgPSByZWYuc2Nyb2xsZWQ7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvd3MgfHwgY29sdW1ucyA9PT0gMSB8fCAhc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gcm93LmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBjc3MoZWwsICd0cmFuc2Zvcm0nLCAoXCJ0cmFuc2xhdGVZKFwiICsgKGkgJSAyID8gc2Nyb2xsZWQgOiBzY3JvbGxlZCAvIDgpICsgXCJweClcIikpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApOyB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLmNoaWxkcmVuLCAndHJhbnNmb3JtJywgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pKTtcblxuICAgIFVJa2l0LmNvbXBvbmVudHMuZ3JpZFBhcmFsbGF4Lm9wdGlvbnMudXBkYXRlLnVuc2hpZnQoe1xuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbnNQbHVnaW4gKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcblxuICAgIHZhciBBbmltYXRpb25zID0ge1xuXG4gICAgICAgIHNsaWRlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKGRpciAqIC0xMDApfSxcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBbmltYXRpb25zLnRyYW5zbGF0ZWQoY3VycmVudCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQxKHBlcmNlbnQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZShkaXIgKiAtMTAwICogcGVyY2VudCl9LFxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoZGlyICogMTAwICogKDEgLSBwZXJjZW50KSl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zbGF0ZWQ6IGZ1bmN0aW9uIHRyYW5zbGF0ZWQoZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhjc3MoZWwsICd0cmFuc2Zvcm0nKS5zcGxpdCgnLCcpWzRdIC8gZWwub2Zmc2V0V2lkdGgpIHx8IDA7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gQW5pbWF0aW9ucztcblxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUodmFsdWUsIHVuaXQpIHtcbiAgICBpZiAoIHZhbHVlID09PSB2b2lkIDAgKSB2YWx1ZSA9IDA7XG4gICAgaWYgKCB1bml0ID09PSB2b2lkIDAgKSB1bml0ID0gJyUnO1xuXG4gICAgcmV0dXJuIChcInRyYW5zbGF0ZVgoXCIgKyB2YWx1ZSArICh2YWx1ZSA/IHVuaXQgOiAnJykgKyBcIilcIik7IC8vIGN1cnJlbnRseSBub3QgdHJhbnNsYXRlM2QgdG8gc3VwcG9ydCBJRSwgdHJhbnNsYXRlM2Qgd2l0aGluIHRyYW5zbGF0ZTNkIGRvZXMgbm90IHdvcmsgd2hpbGUgdHJhbnNpdGlvbmluZ1xufVxuXG5mdW5jdGlvbiBzY2FsZTNkKHZhbHVlKSB7XG4gICAgcmV0dXJuIChcInNjYWxlM2QoXCIgKyB2YWx1ZSArIFwiLCBcIiArIHZhbHVlICsgXCIsIDEpXCIpO1xufVxuXG5mdW5jdGlvbiBUcmFuc2l0aW9uZXJQbHVnaW4gKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgY3JlYXRlRXZlbnQgPSByZWYuY3JlYXRlRXZlbnQ7XG4gICAgdmFyIGNsYW1wID0gcmVmLmNsYW1wO1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuICAgIHZhciBEZWZlcnJlZCA9IHJlZi5EZWZlcnJlZDtcbiAgICB2YXIgbm9vcCA9IHJlZi5ub29wO1xuICAgIHZhciBQcm9taXNlID0gcmVmLlByb21pc2U7XG4gICAgdmFyIFRyYW5zaXRpb24gPSByZWYuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuXG4gICAgZnVuY3Rpb24gVHJhbnNpdGlvbmVyKHByZXYsIG5leHQsIGRpciwgcmVmKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSByZWYuYW5pbWF0aW9uO1xuICAgICAgICB2YXIgZWFzaW5nID0gcmVmLmVhc2luZztcblxuXG4gICAgICAgIHZhciBwZXJjZW50ID0gYW5pbWF0aW9uLnBlcmNlbnQ7XG4gICAgICAgIHZhciB0cmFuc2xhdGUgPSBhbmltYXRpb24udHJhbnNsYXRlO1xuICAgICAgICB2YXIgc2hvdyA9IGFuaW1hdGlvbi5zaG93OyBpZiAoIHNob3cgPT09IHZvaWQgMCApIHNob3cgPSBub29wO1xuICAgICAgICB2YXIgcHJvcHMgPSBzaG93KGRpcik7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIGRpcjogZGlyLFxuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGR1cmF0aW9uLCBwZXJjZW50LCBsaW5lYXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPT09IHZvaWQgMCApIHBlcmNlbnQgPSAwO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgdGltaW5nID0gbGluZWFyID8gJ2xpbmVhcicgOiBlYXNpbmc7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24gLT0gTWF0aC5yb3VuZChkdXJhdGlvbiAqIGNsYW1wKHBlcmNlbnQsIC0xLCAxKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZShwZXJjZW50KTtcblxuICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUobmV4dCwgJ2l0ZW1pbicsIHtwZXJjZW50OiBwZXJjZW50LCBkdXJhdGlvbjogZHVyYXRpb24sIHRpbWluZzogdGltaW5nLCBkaXI6IGRpcn0pO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUocHJldiwgJ2l0ZW1vdXQnLCB7cGVyY2VudDogMSAtIHBlcmNlbnQsIGR1cmF0aW9uOiBkdXJhdGlvbiwgdGltaW5nOiB0aW1pbmcsIGRpcjogZGlyfSk7XG5cbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQobmV4dCwgcHJvcHNbMV0sIGR1cmF0aW9uLCB0aW1pbmcpLFxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KHByZXYsIHByb3BzWzBdLCBkdXJhdGlvbiwgdGltaW5nKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIG5vb3ApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFuc2l0aW9uLnN0b3AoW25leHQsIHByZXZdKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKFtuZXh0LCBwcmV2XSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoW25leHQsIHByZXZdLCBwcm9wLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9yd2FyZDogZnVuY3Rpb24gZm9yd2FyZChkdXJhdGlvbiwgcGVyY2VudCkge1xuICAgICAgICAgICAgICAgIGlmICggcGVyY2VudCA9PT0gdm9pZCAwICkgcGVyY2VudCA9IHRoaXMucGVyY2VudCgpO1xuXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoW25leHQsIHByZXZdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93KGR1cmF0aW9uLCBwZXJjZW50LCB0cnVlKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkMShwZXJjZW50KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSB0cmFuc2xhdGUocGVyY2VudCwgZGlyKTtcbiAgICAgICAgICAgICAgICBjc3MobmV4dCwgcHJvcHNbMV0pO1xuICAgICAgICAgICAgICAgIGNzcyhwcmV2LCBwcm9wc1swXSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZShuZXh0LCAnaXRlbXRyYW5zbGF0ZWluJywge3BlcmNlbnQ6IHBlcmNlbnQsIGRpcjogZGlyfSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZShwcmV2LCAnaXRlbXRyYW5zbGF0ZW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZGlyOiBkaXJ9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudCQxKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50KHByZXYgfHwgbmV4dCwgbmV4dCwgZGlyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldERpc3RhbmNlOiBmdW5jdGlvbiBnZXREaXN0YW5jZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldi5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZShlbCwgdHlwZSwgZGF0YSkge1xuICAgICAgICB0cmlnZ2VyKGVsLCBjcmVhdGVFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRhdGEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVHJhbnNpdGlvbmVyO1xuXG59XG5cbmZ1bmN0aW9uIEF1dG9wbGF5TWl4aW4gKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgZG9jID0gcmVmLmRvYztcbiAgICB2YXIgcG9pbnRlckRvd24gPSByZWYucG9pbnRlckRvd247XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBhdXRvcGxheTogQm9vbGVhbixcbiAgICAgICAgICAgIGF1dG9wbGF5SW50ZXJ2YWw6IE51bWJlcixcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheUludGVydmFsOiA3MDAwLFxuICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd2aXNpYmlsaXR5Y2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGVsOiBkb2MsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiBwb2ludGVyRG93bixcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnc3RvcEF1dG9wbGF5J1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnbW91c2VlbnRlcicsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b3BsYXk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnbW91c2VsZWF2ZScsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b3BsYXk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIb3ZlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzdGFydEF1dG9wbGF5OiBmdW5jdGlvbiBzdGFydEF1dG9wbGF5KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBdXRvcGxheSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gISh0aGlzJDEuaXNIb3ZlcmluZyAmJiB0aGlzJDEucGF1c2VPbkhvdmVyKSAmJiAhdGhpcyQxLnN0YWNrLmxlbmd0aCAmJiB0aGlzJDEuc2hvdygnbmV4dCcpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheUludGVydmFsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wQXV0b3BsYXk6IGZ1bmN0aW9uIHN0b3BBdXRvcGxheSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBEcmFnTWl4aW4gKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgZG9jID0gcmVmLmRvYztcbiAgICB2YXIgZ2V0UG9zID0gcmVmLmdldFBvcztcbiAgICB2YXIgaW5jbHVkZXMgPSByZWYuaW5jbHVkZXM7XG4gICAgdmFyIGlzUnRsID0gcmVmLmlzUnRsO1xuICAgIHZhciBpc1RvdWNoID0gcmVmLmlzVG91Y2g7XG4gICAgdmFyIG9mZiA9IHJlZi5vZmY7XG4gICAgdmFyIG9uID0gcmVmLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHJlZi5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlck1vdmUgPSByZWYucG9pbnRlck1vdmU7XG4gICAgdmFyIHBvaW50ZXJVcCA9IHJlZi5wb2ludGVyVXA7XG4gICAgdmFyIHByZXZlbnRDbGljayA9IHJlZi5wcmV2ZW50Q2xpY2s7XG4gICAgdmFyIHRyaWdnZXIgPSByZWYudHJpZ2dlcjtcbiAgICB2YXIgd2luID0gcmVmLndpbjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgICAgICBwcmV2ZW50Q2F0Y2g6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIFsnc3RhcnQnLCAnbW92ZScsICdlbmQnXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBmbiA9IHRoaXMkMVtrZXldO1xuICAgICAgICAgICAgICAgIHRoaXMkMVtrZXldID0gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gZ2V0UG9zKGUpLnggKiAoaXNSdGwgPyAtMSA6IDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wcmV2UG9zID0gcG9zICE9PSB0aGlzJDEucG9zID8gdGhpcyQxLnBvcyA6IHRoaXMkMS5wcmV2UG9zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zID0gcG9zO1xuXG4gICAgICAgICAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IHBvaW50ZXJEb3duLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbGlkZXNTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RvdWNoKGUpICYmIGhhc1RleHROb2Rlc09ubHkoZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBlLmJ1dHRvbiA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMubGVuZ3RoIDwgMlxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcmV2ZW50Q2F0Y2hcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZyA9IHRoaXMucG9zO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyYW5zaXRpb25lcikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IHRoaXMuX3RyYW5zaXRpb25lci5wZXJjZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZyArPSB0aGlzLl90cmFuc2l0aW9uZXIuZ2V0RGlzdGFuY2UoKSAqIHRoaXMucGVyY2VudCAqIHRoaXMuZGlyO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lci50cmFuc2xhdGUodGhpcy5wZXJjZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbmVyLmNhbmNlbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1vdmUgPSBvbihkb2MsIHBvaW50ZXJNb3ZlLCB0aGlzLm1vdmUsIHtjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgIG9uKHdpbiwgJ3Njcm9sbCcsIHRoaXMudW5iaW5kTW92ZSk7XG4gICAgICAgICAgICAgICAgb24oZG9jLCBwb2ludGVyVXAsIHRoaXMuZW5kLCB0cnVlKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gbW92ZShlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMucG9zIC0gdGhpcy5kcmFnO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID09PSAwIHx8IHRoaXMucHJldlBvcyA9PT0gdGhpcy5wb3MgfHwgIXRoaXMuZHJhZ2dpbmcgJiYgTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUuY2FuY2VsYWJsZSAmJiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IChkaXN0YW5jZSA8IDAgPyAxIDogLTEpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHJlZi5zbGlkZXM7XG4gICAgICAgICAgICAgICAgdmFyIHJlZiQxID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gcmVmJDEucHJldkluZGV4O1xuICAgICAgICAgICAgICAgIHZhciBkaXMgPSBNYXRoLmFicyhkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXgocHJldkluZGV4ICsgdGhpcy5kaXIsIHByZXZJbmRleCk7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fZ2V0RGlzdGFuY2UocHJldkluZGV4LCBuZXh0SW5kZXgpIHx8IHNsaWRlc1twcmV2SW5kZXhdLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5leHRJbmRleCAhPT0gcHJldkluZGV4ICYmIGRpcyA+IHdpZHRoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmRyYWcgLT0gd2lkdGggKiB0aGlzJDEuZGlyO1xuXG4gICAgICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZGlzIC09IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSB0aGlzJDEuZ2V0SW5kZXgocHJldkluZGV4ICsgdGhpcyQxLmRpciwgcHJldkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzJDEuX2dldERpc3RhbmNlKHByZXZJbmRleCwgbmV4dEluZGV4KSB8fCBzbGlkZXNbcHJldkluZGV4XS5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IGRpcyAvIHdpZHRoO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBzbGlkZXNbcHJldkluZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHNsaWRlc1tuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gdGhpcy5pbmRleCAhPT0gbmV4dEluZGV4O1xuICAgICAgICAgICAgICAgIHZhciBlZGdlID0gcHJldkluZGV4ID09PSBuZXh0SW5kZXg7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzZXQ7XG5cbiAgICAgICAgICAgICAgICBbdGhpcy5pbmRleCwgdGhpcy5wcmV2SW5kZXhdLmZpbHRlcihmdW5jdGlvbiAoaSkgeyByZXR1cm4gIWluY2x1ZGVzKFtuZXh0SW5kZXgsIHByZXZJbmRleF0sIGkpOyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoc2xpZGVzW2ldLCAnaXRlbWhpZGRlbicsIFt0aGlzJDFdKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNldCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wcmV2SW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IHByZXZJbmRleCAmJiB0aGlzLnByZXZJbmRleCAhPT0gcHJldkluZGV4IHx8IHJlc2V0ICYmIGVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihzbGlkZXNbdGhpcy5pbmRleF0sICdpdGVtc2hvd24nLCBbdGhpc10pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkluZGV4ID0gcHJldkluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gbmV4dEluZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgICFlZGdlICYmIHRyaWdnZXIocHJldiwgJ2JlZm9yZWl0ZW1oaWRlJywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihuZXh0LCAnYmVmb3JlaXRlbXNob3cnLCBbdGhpc10pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIChyZXNldCB8fCB0aGlzLmxlbmd0aCA8IDMpICYmIHRoaXMuX3RyYW5zaXRpb25lciAmJiB0aGlzLl90cmFuc2l0aW9uZXIucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uZXIgPSB0aGlzLl90cmFuc2xhdGUoTWF0aC5hYnModGhpcy5wZXJjZW50KSwgcHJldiwgIWVkZ2UgJiYgbmV4dCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAhZWRnZSAmJiB0cmlnZ2VyKHByZXYsICdpdGVtaGlkZScsIFt0aGlzXSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2l0ZW1zaG93JywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gZW5kKCkge1xuXG4gICAgICAgICAgICAgICAgb2ZmKHdpbiwgJ3Njcm9sbCcsIHRoaXMudW5iaW5kTW92ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRNb3ZlKCk7XG4gICAgICAgICAgICAgICAgb2ZmKGRvYywgcG9pbnRlclVwLCB0aGlzLmVuZCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnByZXZJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gMSAtIHRoaXMucGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyICo9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvdyhmYWxzZSwgdGhpcy5pbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlyQ2hhbmdlID0gKGlzUnRsID8gdGhpcy5kaXIgKiAoaXNSdGwgPyAxIDogLTEpIDogdGhpcy5kaXIpIDwgMCA9PT0gdGhpcy5wcmV2UG9zID4gdGhpcy5wb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZGlyQ2hhbmdlID8gdGhpcy5pbmRleCA6IHRoaXMucHJldkluZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gMSAtIHRoaXMucGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHRoaXMuZGlyID4gMCAmJiAhZGlyQ2hhbmdlIHx8IHRoaXMuZGlyIDwgMCAmJiBkaXJDaGFuZ2UgPyAnbmV4dCcgOiAncHJldmlvdXMnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRDbGljaygpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnXG4gICAgICAgICAgICAgICAgICAgID0gdGhpcy5wZXJjZW50XG4gICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYXNUZXh0Tm9kZXNPbmx5KGVsKSB7XG4gICAgICAgIHJldHVybiAhZWwuY2hpbGRyZW4ubGVuZ3RoICYmIGVsLmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBOYXZNaXhpbiAoVUlraXQpIHtcblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkID0gcmVmLiQ7XG4gICAgdmFyICQkID0gcmVmLiQkO1xuICAgIHZhciBkYXRhID0gcmVmLmRhdGE7XG4gICAgdmFyIGh0bWwgPSByZWYuaHRtbDtcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSByZWYudG9nZ2xlQ2xhc3M7XG4gICAgdmFyIHRvTnVtYmVyID0gcmVmLnRvTnVtYmVyO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgc2VsTmF2OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIG5hdjogZnVuY3Rpb24gbmF2KHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbE5hdiA9IHJlZi5zZWxOYXY7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJChzZWxOYXYsICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBuYXZJdGVtU2VsZWN0b3I6IGZ1bmN0aW9uIG5hdkl0ZW1TZWxlY3RvcihyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0ckl0ZW0gPSByZWYuYXR0ckl0ZW07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFwiW1wiICsgYXR0ckl0ZW0gKyBcIl0sW2RhdGEtXCIgKyBhdHRySXRlbSArIFwiXVwiKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG5hdkl0ZW1zOiBmdW5jdGlvbiBuYXZJdGVtcyhfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGhpcy5uYXZJdGVtU2VsZWN0b3IsICRlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdiAmJiB0aGlzLmxlbmd0aCAhPT0gdGhpcy5uYXYuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sKHRoaXMubmF2LCB0aGlzLnNsaWRlcy5tYXAoZnVuY3Rpb24gKF8sIGkpIHsgcmV0dXJuIChcIjxsaSBcIiArICh0aGlzJDEuYXR0ckl0ZW0pICsgXCI9XFxcIlwiICsgaSArIFwiXFxcIj48YSBocmVmPVxcXCIjXFxcIj48L2E+PC9saT5cIik7IH0pLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKCQkKHRoaXMubmF2SXRlbVNlbGVjdG9yLCB0aGlzLiRlbCkuY29uY2F0KHRoaXMubmF2KSwgJ3VrLWhpZGRlbicsICF0aGlzLm1heEluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5hdigpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZJdGVtU2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhkYXRhKGUuY3VycmVudCwgdGhpcy5hdHRySXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93JyxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAndXBkYXRlTmF2J1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHVwZGF0ZU5hdjogZnVuY3Rpb24gdXBkYXRlTmF2KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0VmFsaWRJbmRleCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY21kID0gZGF0YShlbCwgdGhpcyQxLmF0dHJJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLmNsc0FjdGl2ZSwgdG9OdW1iZXIoY21kKSA9PT0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCAndWstaW52aXNpYmxlJywgdGhpcyQxLmZpbml0ZSAmJiAoY21kID09PSAncHJldmlvdXMnICYmIGkgPT09IDAgfHwgY21kID09PSAnbmV4dCcgJiYgaSA+PSB0aGlzJDEubWF4SW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDUoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kNS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkID0gcmVmLiQ7XG4gICAgdmFyIGFzc2lnbiA9IHJlZi5hc3NpZ247XG4gICAgdmFyIGNsYW1wID0gcmVmLmNsYW1wO1xuICAgIHZhciBmYXN0ZG9tID0gcmVmLmZhc3Rkb207XG4gICAgdmFyIGdldEluZGV4ID0gcmVmLmdldEluZGV4O1xuICAgIHZhciBoYXNDbGFzcyA9IHJlZi5oYXNDbGFzcztcbiAgICB2YXIgaXNOdW1iZXIgPSByZWYuaXNOdW1iZXI7XG4gICAgdmFyIGlzUnRsID0gcmVmLmlzUnRsO1xuICAgIHZhciBQcm9taXNlID0gcmVmLlByb21pc2U7XG4gICAgdmFyIHRvTm9kZXMgPSByZWYudG9Ob2RlcztcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuXG4gICAgVUlraXQubWl4aW4uc2xpZGVyID0ge1xuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIG1peGluczogW0F1dG9wbGF5TWl4aW4oVUlraXQpLCBEcmFnTWl4aW4oVUlraXQpLCBOYXZNaXhpbihVSWtpdCldLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjbHNBY3RpdmF0ZWQ6IEJvb2xlYW4sXG4gICAgICAgICAgICBlYXNpbmc6IFN0cmluZyxcbiAgICAgICAgICAgIGluZGV4OiBOdW1iZXIsXG4gICAgICAgICAgICBmaW5pdGU6IEJvb2xlYW4sXG4gICAgICAgICAgICB2ZWxvY2l0eTogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgICAgICAgICAgZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZlbG9jaXR5OiAxLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBzdGFjazogW10sXG4gICAgICAgICAgICBwZXJjZW50OiAwLFxuICAgICAgICAgICAgY2xzQWN0aXZlOiAndWstYWN0aXZlJyxcbiAgICAgICAgICAgIGNsc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICAgICAgICBUcmFuc2l0aW9uZXI6IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbk9wdGlvbnM6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gcmVmLnZlbG9jaXR5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWVkVXAoJGVsLm9mZnNldFdpZHRoIC8gdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiBsZW5ndGgoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxpc3Q6IGZ1bmN0aW9uIGxpc3QocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsTGlzdCA9IHJlZi5zZWxMaXN0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsTGlzdCwgJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG1heEluZGV4OiBmdW5jdGlvbiBtYXhJbmRleCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2xpZGVzU2VsZWN0b3I6IGZ1bmN0aW9uIHNsaWRlc1NlbGVjdG9yKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBzZWxMaXN0ID0gcmVmLnNlbExpc3Q7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHNlbExpc3QgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzbGlkZXM6IGZ1bmN0aW9uIHNsaWRlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9Ob2Rlcyh0aGlzLmxpc3QuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGluZGV4LCBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICggZm9yY2UgPT09IHZvaWQgMCApIGZvcmNlID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nIHx8ICF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWNrID0gcmVmLnN0YWNrO1xuICAgICAgICAgICAgICAgIHZhciBxdWV1ZUluZGV4ID0gZm9yY2UgPyAwIDogc3RhY2subGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKHF1ZXVlSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zaG93KHN0YWNrLnNoaWZ0KCksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHN0YWNrW2ZvcmNlID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmIHN0YWNrLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uZXIuZm9yd2FyZChNYXRoLm1pbih0aGlzLmR1cmF0aW9uLCAyMDApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IGhhc0NsYXNzKHRoaXMuc2xpZGVzLCB0aGlzLmNsc0FjdGl2ZSkgJiYgdGhpcy5zbGlkZXNbcHJldkluZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleChpbmRleCwgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0aGlzLnNsaWRlc1tuZXh0SW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZXYgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZ2V0RGlyZWN0aW9uKGluZGV4LCBwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldkluZGV4ID0gcHJldkluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXh0SW5kZXg7XG5cbiAgICAgICAgICAgICAgICBwcmV2ICYmIHRyaWdnZXIocHJldiwgJ2JlZm9yZWl0ZW1oaWRlJywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRyaWdnZXIobmV4dCwgJ2JlZm9yZWl0ZW1zaG93JywgW3RoaXMsIHByZXZdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5wcmV2SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Nob3cocHJldiwgbmV4dCwgZm9yY2UpLnRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHByZXYgJiYgdHJpZ2dlcihwcmV2LCAnaXRlbWhpZGRlbicsIFt0aGlzJDFdKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihuZXh0LCAnaXRlbXNob3duJywgW3RoaXMkMV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFzdGRvbS53cml0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zaG93KHN0YWNrLnNoaWZ0KCksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5fdHJhbnNpdGlvbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwcmV2ICYmIHRyaWdnZXIocHJldiwgJ2l0ZW1oaWRlJywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyKG5leHQsICdpdGVtc2hvdycsIFt0aGlzXSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SW5kZXg6IGZ1bmN0aW9uIGdldEluZGV4JDEoaW5kZXgsIHByZXYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID09PSB2b2lkIDAgKSBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKCBwcmV2ID09PSB2b2lkIDAgKSBwcmV2ID0gdGhpcy5pbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjbGFtcChnZXRJbmRleChpbmRleCwgdGhpcy5zbGlkZXMsIHByZXYsIHRoaXMuZmluaXRlKSwgMCwgdGhpcy5tYXhJbmRleCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRWYWxpZEluZGV4OiBmdW5jdGlvbiBnZXRWYWxpZEluZGV4KGluZGV4LCBwcmV2SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID09PSB2b2lkIDAgKSBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKCBwcmV2SW5kZXggPT09IHZvaWQgMCApIHByZXZJbmRleCA9IHRoaXMucHJldkluZGV4O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5kZXgoaW5kZXgsIHByZXZJbmRleCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfc2hvdzogZnVuY3Rpb24gX3Nob3cocHJldiwgbmV4dCwgZm9yY2UpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lciA9IHRoaXMuX2dldFRyYW5zaXRpb25lcihcbiAgICAgICAgICAgICAgICAgICAgcHJldixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIsXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGZvcmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXh0Lm9mZnNldFdpZHRoIDwgNjAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2N1YmljLWJlemllcigwLjI1LCAwLjQ2LCAwLjQ1LCAwLjk0KScgLyogZWFzZU91dFF1YWQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKScgLyogZWFzZU91dFF1YXJ0ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmVhc2luZ1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnRyYW5zaXRpb25PcHRpb25zKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmICFwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lci50cmFuc2xhdGUoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5zdGFjaztcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVmLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbmVyW2xlbmd0aCA+IDEgPyAnZm9yd2FyZCcgOiAnc2hvdyddKGxlbmd0aCA+IDEgPyBNYXRoLm1pbih0aGlzLmR1cmF0aW9uLCA3NSArIDc1IC8gKGxlbmd0aCAtIDEpKSA6IHRoaXMuZHVyYXRpb24sIHRoaXMucGVyY2VudCk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9nZXREaXN0YW5jZTogZnVuY3Rpb24gX2dldERpc3RhbmNlKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuX2dldFRyYW5zaXRpb25lcihwcmV2LCBwcmV2ICE9PSBuZXh0ICYmIG5leHQpLmdldERpc3RhbmNlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfdHJhbnNsYXRlOiBmdW5jdGlvbiBfdHJhbnNsYXRlKHBlcmNlbnQsIHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHByZXYgPT09IHZvaWQgMCApIHByZXYgPSB0aGlzLnByZXZJbmRleDtcbiAgICAgICAgICAgICAgICBpZiAoIG5leHQgPT09IHZvaWQgMCApIG5leHQgPSB0aGlzLmluZGV4O1xuXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25lciA9IHRoaXMuX2dldFRyYW5zaXRpb25lcihwcmV2ICE9PSBuZXh0ID8gcHJldiA6IGZhbHNlLCBuZXh0KTtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uZXIudHJhbnNsYXRlKHBlcmNlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uZXI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfZ2V0VHJhbnNpdGlvbmVyOiBmdW5jdGlvbiBfZ2V0VHJhbnNpdGlvbmVyKHByZXYsIG5leHQsIGRpciwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICggcHJldiA9PT0gdm9pZCAwICkgcHJldiA9IHRoaXMucHJldkluZGV4O1xuICAgICAgICAgICAgICAgIGlmICggbmV4dCA9PT0gdm9pZCAwICkgbmV4dCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKCBkaXIgPT09IHZvaWQgMCApIGRpciA9IHRoaXMuZGlyIHx8IDE7XG4gICAgICAgICAgICAgICAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0gdGhpcy50cmFuc2l0aW9uT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5UcmFuc2l0aW9uZXIoXG4gICAgICAgICAgICAgICAgICAgIGlzTnVtYmVyKHByZXYpID8gdGhpcy5zbGlkZXNbcHJldl0gOiBwcmV2LFxuICAgICAgICAgICAgICAgICAgICBpc051bWJlcihuZXh0KSA/IHRoaXMuc2xpZGVzW25leHRdIDogbmV4dCxcbiAgICAgICAgICAgICAgICAgICAgZGlyICogKGlzUnRsID8gLTEgOiAxKSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbihpbmRleCwgcHJldkluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gJ25leHQnXG4gICAgICAgICAgICA/IDFcbiAgICAgICAgICAgIDogaW5kZXggPT09ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgOiBpbmRleCA8IHByZXZJbmRleFxuICAgICAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgICAgIDogMTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gc3BlZWRVcCh4KSB7XG4gICAgcmV0dXJuIC41ICogeCArIDMwMDsgLy8gcGFyYWJvbGEgdGhyb3VnaCAoNDAwLDUwMDsgNjAwLDYwMDsgMTgwMCwxMjAwKVxufVxuXG5mdW5jdGlvbiBwbHVnaW4kNChVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQ0Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUlraXQudXNlKHBsdWdpbiQ1KTtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciBVSWtpdF91dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgYWRkQ2xhc3MgPSBVSWtpdF91dGlsLmFkZENsYXNzO1xuICAgIHZhciBhc3NpZ24gPSBVSWtpdF91dGlsLmFzc2lnbjtcbiAgICB2YXIgZmFzdGRvbSA9IFVJa2l0X3V0aWwuZmFzdGRvbTtcbiAgICB2YXIgaXNOdW1iZXIgPSBVSWtpdF91dGlsLmlzTnVtYmVyO1xuICAgIHZhciByZW1vdmVDbGFzcyA9IFVJa2l0X3V0aWwucmVtb3ZlQ2xhc3M7XG5cbiAgICB2YXIgQW5pbWF0aW9ucyA9IEFuaW1hdGlvbnNQbHVnaW4oVUlraXQpO1xuICAgIHZhciBUcmFuc2l0aW9uZXIgPSBUcmFuc2l0aW9uZXJQbHVnaW4oVUlraXQpO1xuXG4gICAgVUlraXQubWl4aW4uc2xpZGVzaG93ID0ge1xuXG4gICAgICAgIG1peGluczogW21peGluLnNsaWRlcl0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogJ3NsaWRlJyxcbiAgICAgICAgICAgIGNsc0FjdGl2YXRlZDogJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyxcbiAgICAgICAgICAgIEFuaW1hdGlvbnM6IEFuaW1hdGlvbnMsXG4gICAgICAgICAgICBUcmFuc2l0aW9uZXI6IFRyYW5zaXRpb25lclxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGFuaW1hdGlvbjogZnVuY3Rpb24gYW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSByZWYuYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBBbmltYXRpb25zID0gcmVmLkFuaW1hdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKGFuaW1hdGlvbiBpbiBBbmltYXRpb25zID8gQW5pbWF0aW9uc1thbmltYXRpb25dIDogQW5pbWF0aW9ucy5zbGlkZSwge25hbWU6IGFuaW1hdGlvbn0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNpdGlvbk9wdGlvbnM6IGZ1bmN0aW9uIHRyYW5zaXRpb25PcHRpb25zKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbn07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgJ2l0ZW1zaG93IGl0ZW1oaWRlIGl0ZW1zaG93biBpdGVtaGlkZGVuJzogZnVuY3Rpb24gaXRlbXNob3dpdGVtaGlkZWl0ZW1zaG93bml0ZW1oaWRkZW4ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGl0ZW1zaG93OiBmdW5jdGlvbiBpdGVtc2hvdygpIHtcbiAgICAgICAgICAgICAgICBpc051bWJlcih0aGlzLnByZXZJbmRleCkgJiYgZmFzdGRvbS5mbHVzaCgpOyAvLyBpT1MgMTArIHdpbGwgaG9ub3IgdGhlIHZpZGVvLnBsYXkgb25seSBpZiBjYWxsZWQgZnJvbSBhIGdlc3R1cmUgaGFuZGxlclxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYmVmb3JlaXRlbXNob3c6IGZ1bmN0aW9uIGJlZm9yZWl0ZW1zaG93KHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpdGVtc2hvd246IGZ1bmN0aW9uIGl0ZW1zaG93bihyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmF0ZWQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaXRlbWhpZGRlbjogZnVuY3Rpb24gaXRlbWhpZGRlbihyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmUsIHRoaXMuY2xzQWN0aXZhdGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbnNQbHVnaW4kMSAoVUlraXQpIHtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciBVSWtpdF91dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgYXNzaWduID0gVUlraXRfdXRpbC5hc3NpZ247XG4gICAgdmFyIGNzcyA9IFVJa2l0X3V0aWwuY3NzO1xuXG4gICAgcmV0dXJuIGFzc2lnbih7fSwgbWl4aW4uc2xpZGVzaG93LmRlZmF1bHRzLkFuaW1hdGlvbnMsIHtcblxuICAgICAgICBmYWRlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJCQxKHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnR9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogcGVyY2VudH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2NhbGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMil9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiBzY2FsZTNkKDEpfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkJDEocGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMiAqIHBlcmNlbnQpfSxcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxIC0gLjIgKyAuMiAqIHBlcmNlbnQpfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDMoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMy5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJa2l0LnVzZShwbHVnaW4kNCk7XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyICQgPSB1dGlsLiQ7XG4gICAgdmFyIGFkZENsYXNzID0gdXRpbC5hZGRDbGFzcztcbiAgICB2YXIgYWpheCA9IHV0aWwuYWpheDtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGFzc2lnbiA9IHV0aWwuYXNzaWduO1xuICAgIHZhciBhdHRyID0gdXRpbC5hdHRyO1xuICAgIHZhciBjc3MgPSB1dGlsLmNzcztcbiAgICB2YXIgZG9jID0gdXRpbC5kb2M7XG4gICAgdmFyIGdldEltYWdlID0gdXRpbC5nZXRJbWFnZTtcbiAgICB2YXIgaHRtbCA9IHV0aWwuaHRtbDtcbiAgICB2YXIgaW5kZXggPSB1dGlsLmluZGV4O1xuICAgIHZhciBvbiA9IHV0aWwub247XG4gICAgdmFyIHBvaW50ZXJEb3duID0gdXRpbC5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlck1vdmUgPSB1dGlsLnBvaW50ZXJNb3ZlO1xuICAgIHZhciByZW1vdmVDbGFzcyA9IHV0aWwucmVtb3ZlQ2xhc3M7XG4gICAgdmFyIFRyYW5zaXRpb24gPSB1dGlsLlRyYW5zaXRpb247XG4gICAgdmFyIHRyaWdnZXIgPSB1dGlsLnRyaWdnZXI7XG5cbiAgICB2YXIgQW5pbWF0aW9ucyA9IEFuaW1hdGlvbnNQbHVnaW4kMShVSWtpdCk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2xpZ2h0Ym94LXBhbmVsJywge1xuXG4gICAgICAgIG1peGluczogW21peGluLmNvbnRhaW5lciwgbWl4aW4ubW9kYWwsIG1peGluLnRvZ2dsYWJsZSwgbWl4aW4uc2xpZGVzaG93XSxcblxuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBwcmVsb2FkOiAxLFxuICAgICAgICAgICAgdmlkZW9BdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBkZWxheUNvbnRyb2xzOiAzMDAwLFxuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgY2xzOiAndWstb3BlbicsXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstbGlnaHRib3gtcGFnZScsXG4gICAgICAgICAgICBzZWxMaXN0OiAnLnVrLWxpZ2h0Ym94LWl0ZW1zJyxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstbGlnaHRib3gtaXRlbScsXG4gICAgICAgICAgICBzZWxDbG9zZTogJy51ay1jbG9zZS1sYXJnZScsXG4gICAgICAgICAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgdmVsb2NpdHk6IDIsXG4gICAgICAgICAgICBBbmltYXRpb25zOiBBbmltYXRpb25zLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz1cXFwidWstbGlnaHRib3ggdWstb3ZlcmZsb3ctaGlkZGVuXFxcIj4gPHVsIGNsYXNzPVxcXCJ1ay1saWdodGJveC1pdGVtc1xcXCI+PC91bD4gPGRpdiBjbGFzcz1cXFwidWstbGlnaHRib3gtdG9vbGJhciB1ay1wb3NpdGlvbi10b3AgdWstdGV4dC1yaWdodCB1ay10cmFuc2l0aW9uLXNsaWRlLXRvcCB1ay10cmFuc2l0aW9uLW9wYXF1ZVxcXCI+IDxidXR0b24gY2xhc3M9XFxcInVrLWxpZ2h0Ym94LXRvb2xiYXItaWNvbiB1ay1jbG9zZS1sYXJnZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB1ay1jbG9zZT48L2J1dHRvbj4gPC9kaXY+IDxhIGNsYXNzPVxcXCJ1ay1saWdodGJveC1idXR0b24gdWstcG9zaXRpb24tY2VudGVyLWxlZnQgdWstcG9zaXRpb24tbWVkaXVtIHVrLXRyYW5zaXRpb24tZmFkZVxcXCIgaHJlZj1cXFwiI1xcXCIgdWstc2xpZGVuYXYtcHJldmlvdXMgdWstbGlnaHRib3gtaXRlbT1cXFwicHJldmlvdXNcXFwiPjwvYT4gPGEgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWJ1dHRvbiB1ay1wb3NpdGlvbi1jZW50ZXItcmlnaHQgdWstcG9zaXRpb24tbWVkaXVtIHVrLXRyYW5zaXRpb24tZmFkZVxcXCIgaHJlZj1cXFwiI1xcXCIgdWstc2xpZGVuYXYtbmV4dCB1ay1saWdodGJveC1pdGVtPVxcXCJuZXh0XFxcIj48L2E+IDxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LXRvb2xiYXIgdWstbGlnaHRib3gtY2FwdGlvbiB1ay1wb3NpdGlvbi1ib3R0b20gdWstdGV4dC1jZW50ZXIgdWstdHJhbnNpdGlvbi1zbGlkZS1ib3R0b20gdWstdHJhbnNpdGlvbi1vcGFxdWVcXFwiPjwvZGl2PiA8L2Rpdj5cIlxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB0aGlzLiRtb3VudChhcHBlbmQodGhpcy5jb250YWluZXIsIHRoaXMudGVtcGxhdGUpKTtcblxuICAgICAgICAgICAgdGhpcy5jYXB0aW9uID0gJCgnLnVrLWxpZ2h0Ym94LWNhcHRpb24nLCB0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoKSB7IHJldHVybiBhcHBlbmQodGhpcyQxLmxpc3QsICc8bGk+PC9saT4nKTsgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogKHBvaW50ZXJNb3ZlICsgXCIgXCIgKyBwb2ludGVyRG93biArIFwiIGtleWRvd25cIiksXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnc2hvd0NvbnRyb2xzJ1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xpZGVzU2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3duJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnc2hvd0NvbnRyb2xzJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMoKTtcblxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnNsaWRlcywgdGhpcy5jbHNBY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0b3AodGhpcy5zbGlkZXMpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2tleXVwJyxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9nZ2xlZCh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygncHJldmlvdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCduZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3JlaXRlbXNob3cnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudENhdGNoID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVOb3codGhpcy4kZWwsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gQW5pbWF0aW9uc1snc2NhbGUnXTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZS50YXJnZXQsIHRoaXMuY2xzQWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5zcGxpY2UoMSwgMCwgdGhpcy5pbmRleCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtc2hvdycsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGluZGV4KHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IHRoaXMuZ2V0SXRlbShpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcHRpb24gPSByZWYkMS5jYXB0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLmNhcHRpb24sICdkaXNwbGF5JywgY2FwdGlvbiA/ICcnIDogJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCh0aGlzLmNhcHRpb24sIGNhcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHRoaXMucHJlbG9hZDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEubG9hZEl0ZW0odGhpcyQxLmdldEluZGV4KGkgKyBqKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEubG9hZEl0ZW0odGhpcyQxLmdldEluZGV4KGkgLSBqKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93bicsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRDYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1sb2FkJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoXywgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpdGVtLnNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbHQgPSBpdGVtLmFsdDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgJzxzcGFuIHVrLXNwaW5uZXI+PC9zcGFuPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcztcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2ltYWdlJyB8fCBzb3VyY2UubWF0Y2goL1xcLihqcChlKT9nfHBuZ3xnaWZ8c3ZnKSQvaSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW1hZ2Uoc291cmNlKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChpbWcpIHsgcmV0dXJuIHRoaXMkMS5zZXRJdGVtKGl0ZW0sIChcIjxpbWcgd2lkdGg9XFxcIlwiICsgKGltZy53aWR0aCkgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIChpbWcuaGVpZ2h0KSArIFwiXFxcIiBzcmM9XFxcIlwiICsgc291cmNlICsgXCJcXFwiIGFsdD1cXFwiXCIgKyAoYWx0ID8gYWx0IDogJycpICsgXCJcXFwiPlwiKSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNldEVycm9yKGl0ZW0pOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJyB8fCBzb3VyY2UubWF0Y2goL1xcLihtcDR8d2VibXxvZ3YpJC9pKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW8gPSAkKChcIjx2aWRlbyBjb250cm9scyBwbGF5c2lubGluZVwiICsgKGl0ZW0ucG9zdGVyID8gKFwiIHBvc3Rlcj1cXFwiXCIgKyAoaXRlbS5wb3N0ZXIpICsgXCJcXFwiXCIpIDogJycpICsgXCIgdWstdmlkZW89XFxcImF1dG9wbGF5OiBcIiArICh0aGlzLnZpZGVvQXV0b3BsYXkpICsgXCJcXFwiPjwvdmlkZW8+XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIodmlkZW8sICdzcmMnLCBzb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbih2aWRlbywgJ2Vycm9yJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNldEVycm9yKGl0ZW0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uKHZpZGVvLCAnbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cih2aWRlbywge3dpZHRoOiB2aWRlby52aWRlb1dpZHRoLCBoZWlnaHQ6IHZpZGVvLnZpZGVvSGVpZ2h0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNldEl0ZW0oaXRlbSwgdmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWZyYW1lXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2lmcmFtZScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0sIChcIjxpZnJhbWUgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWlmcmFtZVxcXCIgc3JjPVxcXCJcIiArIHNvdXJjZSArIFwiXFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtYXRjaGVzID0gc291cmNlLm1hdGNoKC9cXC9cXC8uKj95b3V0dWJlKC1ub2Nvb2tpZSk/XFwuW2Etel0rXFwvd2F0Y2hcXD92PShbXiZcXHNdKykvKSB8fCBzb3VyY2UubWF0Y2goLygpeW91dHVcXC5iZVxcLyguKikvKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gbWF0Y2hlc1syXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXRJZnJhbWUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggd2lkdGggPT09IHZvaWQgMCApIHdpZHRoID0gNjQwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGVpZ2h0ID09PSB2b2lkIDAgKSBoZWlnaHQgPSA0NTA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyQxLnNldEl0ZW0oaXRlbSwgZ2V0SWZyYW1lKChcIi8vd3d3LnlvdXR1YmVcIiArIChtYXRjaGVzWzFdIHx8ICcnKSArIFwiLmNvbS9lbWJlZC9cIiArIGlkKSwgd2lkdGgsIGhlaWdodCwgdGhpcyQxLnZpZGVvQXV0b3BsYXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEltYWdlKChcIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiICsgaWQgKyBcIi9tYXhyZXNkZWZhdWx0LmpwZ1wiKSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZSBkZWZhdWx0IDQwNCB0aHVtYiwgZmFsbCBiYWNrIHRvIGxvdyByZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCA9PT0gMTIwICYmIGhlaWdodCA9PT0gOTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEltYWdlKChcIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiICsgaWQgKyBcIi8wLmpwZ1wiKSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldElmcmFtZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVmltZW9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgobWF0Y2hlcyA9IHNvdXJjZS5tYXRjaCgvKFxcL1xcLy4qPyl2aW1lb1xcLlthLXpdK1xcLyhbMC05XSspLio/LykpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFqYXgoKFwiLy92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP21heHdpZHRoPTE5MjAmdXJsPVwiICsgKGVuY29kZVVSSShzb3VyY2UpKSksIHtyZXNwb25zZVR5cGU6ICdqc29uJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZl9yZXNwb25zZSA9IHJlZi5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWZfcmVzcG9uc2UuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmX3Jlc3BvbnNlLndpZHRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyQxLnNldEl0ZW0oaXRlbSwgZ2V0SWZyYW1lKChcIi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby9cIiArIChtYXRjaGVzWzJdKSksIHdpZHRoLCBoZWlnaHQsIHRoaXMkMS52aWRlb0F1dG9wbGF5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgbG9hZEl0ZW06IGZ1bmN0aW9uIGxvYWRJdGVtKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA9PT0gdm9pZCAwICkgaW5kZXggPSB0aGlzLmluZGV4O1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaXRlbWxvYWQnLCBbaXRlbV0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SXRlbTogZnVuY3Rpb24gZ2V0SXRlbShpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XSB8fCB7fTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldEl0ZW06IGZ1bmN0aW9uIHNldEl0ZW0oaXRlbSwgY29udGVudCkge1xuICAgICAgICAgICAgICAgIGFzc2lnbihpdGVtLCB7Y29udGVudDogY29udGVudH0pO1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IGh0bWwodGhpcy5zbGlkZXNbdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pXSwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2l0ZW1sb2FkZWQnLCBbdGhpcywgZWxdKTtcbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0RXJyb3I6IGZ1bmN0aW9uIHNldEVycm9yKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgJzxzcGFuIHVrLWljb249XCJpY29uOiBib2x0OyByYXRpbzogMlwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNob3dDb250cm9sczogZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY29udHJvbHNUaW1lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dCh0aGlzLmhpZGVDb250cm9scywgdGhpcy5kZWxheUNvbnRyb2xzKTtcblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlJywgJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGVDb250cm9sczogZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlJywgJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRJZnJhbWUoc3JjLCB3aWR0aCwgaGVpZ2h0LCBhdXRvcGxheSkge1xuICAgICAgICByZXR1cm4gKFwiPGlmcmFtZSBzcmM9XFxcIlwiICsgc3JjICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIHdpZHRoICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBoZWlnaHQgKyBcIlxcXCIgc3R5bGU9XFxcIm1heC13aWR0aDogMTAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDtcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBhbGxvd2Z1bGxzY3JlZW4gdWstdmlkZW89XFxcImF1dG9wbGF5OiBcIiArIGF1dG9wbGF5ICsgXCJcXFwiIHVrLXJlc3BvbnNpdmU+PC9pZnJhbWU+XCIpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBwbHVnaW4kMihVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQyLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUlraXQudXNlKHBsdWdpbiQzKTtcblxuICAgIHZhciB1dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgJCQgPSB1dGlsLiQkO1xuICAgIHZhciBhc3NpZ24gPSB1dGlsLmFzc2lnbjtcbiAgICB2YXIgZGF0YSA9IHV0aWwuZGF0YTtcbiAgICB2YXIgaW5kZXggPSB1dGlsLmluZGV4O1xuICAgIHZhciByZWYgPSBVSWtpdC5jb21wb25lbnRzLmxpZ2h0Ym94UGFuZWw7XG4gICAgdmFyIG9wdGlvbnMgPSByZWYub3B0aW9ucztcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbGlnaHRib3gnLCB7XG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgcHJvcHM6IGFzc2lnbih7dG9nZ2xlOiBTdHJpbmd9LCBvcHRpb25zLnByb3BzKSxcblxuICAgICAgICBkZWZhdWx0czogYXNzaWduKHt0b2dnbGU6ICdhJ30sIE9iamVjdC5rZXlzKG9wdGlvbnMucHJvcHMpLnJlZHVjZShmdW5jdGlvbiAoZGVmYXVsdHMsIGtleSkge1xuICAgICAgICAgICAgZGVmYXVsdHNba2V5XSA9IG9wdGlvbnMuZGVmYXVsdHNba2V5XTtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgfSwge30pKSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0b2dnbGVzOiBmdW5jdGlvbiB0b2dnbGVzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IHJlZi50b2dnbGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodG9nZ2xlLCAkZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMudG9nZ2xlKSArIFwiOm5vdCgudWstZGlzYWJsZWQpXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coaW5kZXgodGhpcy50b2dnbGVzLCBlLmN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGRhdGEpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLiRwcm9wcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLiRlbWl0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbCB8fCBkYXRhLnRvZ2dsZXMgJiYgaXNFcXVhbExpc3QoZGF0YS50b2dnbGVzLCB0aGlzLnRvZ2dsZXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhLnRvZ2dsZXMgPSB0aGlzLnRvZ2dsZXM7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbCA9IHRoaXMucGFuZWwgfHwgVUlraXQubGlnaHRib3hQYW5lbChhc3NpZ24oe30sIHRoaXMuJHByb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnRvZ2dsZXMucmVkdWNlKGZ1bmN0aW9uIChpdGVtcywgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goWydocmVmJywgJ2NhcHRpb24nLCAndHlwZScsICdwb3N0ZXInLCAnYWx0J10ucmVkdWNlKGZ1bmN0aW9uIChvYmosIGF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ciA9PT0gJ2hyZWYnID8gJ3NvdXJjZScgOiBhdHRyXSA9IGRhdGEoZWwsIGF0dHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICB9LCBbXSlcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfZGVzdHJveTogZnVuY3Rpb24gX2Rlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbC4kZGVzdHJveSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhpbmRleCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbC5zaG93KGluZGV4KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVsICYmIHRoaXMucGFuZWwuaGlkZSgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBpc0VxdWFsTGlzdChsaXN0QSwgbGlzdEIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RBLmxlbmd0aCA9PT0gbGlzdEIubGVuZ3RoXG4gICAgICAgICAgICAmJiBsaXN0QS5ldmVyeShmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIGVsICE9PSBsaXN0QltpXTsgfSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQ2KFVJa2l0KSB7XG4gICAgdmFyIG9iajtcblxuXG4gICAgaWYgKHBsdWdpbiQ2Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFwcGVuZCA9IHJlZi5hcHBlbmQ7XG4gICAgdmFyIGNsb3Nlc3QgPSByZWYuY2xvc2VzdDtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcbiAgICB2YXIgZWFjaCA9IHJlZi5lYWNoO1xuICAgIHZhciBwb2ludGVyRW50ZXIgPSByZWYucG9pbnRlckVudGVyO1xuICAgIHZhciBwb2ludGVyTGVhdmUgPSByZWYucG9pbnRlckxlYXZlO1xuICAgIHZhciByZW1vdmUgPSByZWYucmVtb3ZlO1xuICAgIHZhciB0b0Zsb2F0ID0gcmVmLnRvRmxvYXQ7XG4gICAgdmFyIFRyYW5zaXRpb24gPSByZWYuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuICAgIHZhciBjb250YWluZXJzID0ge307XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ25vdGlmaWNhdGlvbicsIHtcblxuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxuXG4gICAgICAgIGFyZ3M6IFsnbWVzc2FnZScsICdzdGF0dXMnXSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgICAgICBzdGF0dXM6ICcnLFxuICAgICAgICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgICAgICAgIGdyb3VwOiBudWxsLFxuICAgICAgICAgICAgcG9zOiAndG9wLWNlbnRlcicsXG4gICAgICAgICAgICBjbHNDbG9zZTogJ3VrLW5vdGlmaWNhdGlvbi1jbG9zZScsXG4gICAgICAgICAgICBjbHNNc2c6ICd1ay1ub3RpZmljYXRpb24tbWVzc2FnZSdcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkKCkge1xuXG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcnNbdGhpcy5wb3NdKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyc1t0aGlzLnBvc10gPSBhcHBlbmQoVUlraXQuY29udGFpbmVyLCAoXCI8ZGl2IGNsYXNzPVxcXCJ1ay1ub3RpZmljYXRpb24gdWstbm90aWZpY2F0aW9uLVwiICsgKHRoaXMucG9zKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gY3NzKGNvbnRhaW5lcnNbdGhpcy5wb3NdLCAnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgICAgICB0aGlzLiRtb3VudChhcHBlbmQoY29udGFpbmVyLFxuICAgICAgICAgICAgICAgIChcIjxkaXYgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzTXNnKSArICh0aGlzLnN0YXR1cyA/IChcIiBcIiArICh0aGlzLmNsc01zZykgKyBcIi1cIiArICh0aGlzLnN0YXR1cykpIDogJycpICsgXCJcXFwiPiA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNDbG9zZSkgKyBcIlxcXCIgZGF0YS11ay1jbG9zZT48L2E+IDxkaXY+XCIgKyAodGhpcy5tZXNzYWdlKSArIFwiPC9kaXY+IDwvZGl2PlwiKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB2YXIgbWFyZ2luQm90dG9tID0gdG9GbG9hdChjc3ModGhpcy4kZWwsICdtYXJnaW5Cb3R0b20nKSk7XG4gICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KFxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge29wYWNpdHk6IDAsIG1hcmdpblRvcDogLXRoaXMuJGVsLm9mZnNldEhlaWdodCwgbWFyZ2luQm90dG9tOiAwfSksXG4gICAgICAgICAgICAgICAge29wYWNpdHk6IDEsIG1hcmdpblRvcDogMCwgbWFyZ2luQm90dG9tOiBtYXJnaW5Cb3R0b219XG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzJDEudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMkMS5jbG9zZSwgdGhpcyQxLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHtcblxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdChlLnRhcmdldCwgJ2FbaHJlZj1cIiNcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBvYmpbcG9pbnRlckVudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2JqW3BvaW50ZXJMZWF2ZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9iaiksXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVGbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMkMS4kZWwsICdjbG9zZScsIFt0aGlzJDFdKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKHRoaXMkMS4kZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyc1t0aGlzJDEucG9zXS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhjb250YWluZXJzW3RoaXMkMS5wb3NdLCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQodGhpcy4kZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC10aGlzLiRlbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZW1vdmVGbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQubm90aWZpY2F0aW9uLmNsb3NlQWxsID0gZnVuY3Rpb24gKGdyb3VwLCBpbW1lZGlhdGUpIHtcbiAgICAgICAgZWFjaChVSWtpdC5pbnN0YW5jZXMsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuJG9wdGlvbnMubmFtZSA9PT0gJ25vdGlmaWNhdGlvbicgJiYgKCFncm91cCB8fCBncm91cCA9PT0gY29tcG9uZW50Lmdyb3VwKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jbG9zZShpbW1lZGlhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQ4KFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDguaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGNzcyA9IHV0aWwuY3NzO1xuICAgIHZhciBEaW1lbnNpb25zID0gdXRpbC5EaW1lbnNpb25zO1xuICAgIHZhciBlYWNoID0gdXRpbC5lYWNoO1xuICAgIHZhciBnZXRJbWFnZSA9IHV0aWwuZ2V0SW1hZ2U7XG4gICAgdmFyIGluY2x1ZGVzID0gdXRpbC5pbmNsdWRlcztcbiAgICB2YXIgaXNOdW1iZXIgPSB1dGlsLmlzTnVtYmVyO1xuICAgIHZhciBpc1VuZGVmaW5lZCA9IHV0aWwuaXNVbmRlZmluZWQ7XG4gICAgdmFyIHRvRmxvYXQgPSB1dGlsLnRvRmxvYXQ7XG4gICAgdmFyIHdpbiA9IHV0aWwud2luO1xuXG4gICAgdmFyIHByb3BzID0gWyd4JywgJ3knLCAnYmd4JywgJ2JneScsICdyb3RhdGUnLCAnc2NhbGUnLCAnY29sb3InLCAnYmFja2dyb3VuZENvbG9yJywgJ2JvcmRlckNvbG9yJywgJ29wYWNpdHknLCAnYmx1cicsICdodWUnLCAnZ3JheXNjYWxlJywgJ2ludmVydCcsICdzYXR1cmF0ZScsICdzZXBpYScsICdmb3BhY2l0eSddO1xuXG4gICAgbWl4aW4ucGFyYWxsYXggPSB7XG5cbiAgICAgICAgcHJvcHM6IHByb3BzLnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIHByb3ApIHtcbiAgICAgICAgICAgIHByb3BzW3Byb3BdID0gJ2xpc3QnO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZWRpYTogJ21lZGlhJ1xuICAgICAgICB9KSxcblxuICAgICAgICBkZWZhdWx0czogcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChkZWZhdWx0cywgcHJvcCkge1xuICAgICAgICAgICAgZGVmYXVsdHNbcHJvcF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1lZGlhOiBmYWxzZVxuICAgICAgICB9KSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBwcm9wczogZnVuY3Rpb24gcHJvcHMkMShwcm9wZXJ0aWVzLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIHByb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQocHJvcGVydGllc1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbG9yID0gcHJvcC5tYXRjaCgvY29sb3IvaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0Nzc1Byb3AgPSBpc0NvbG9yIHx8IHByb3AgPT09ICdvcGFjaXR5JztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zLCBiZ1BvcywgZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBzID0gcHJvcGVydGllc1twcm9wXS5zbGljZSgwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDc3NQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoJGVsLCBwcm9wLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMudW5zaGlmdCgocHJvcCA9PT0gJ3NjYWxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNDc3NQcm9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY3NzKCRlbCwgcHJvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwKSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bml0ID0gaW5jbHVkZXMoc3RlcHMuam9pbignJyksICclJykgPyAnJScgOiAncHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbG9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSAkZWwuc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSByZWYuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHN0ZXBzLm1hcChmdW5jdGlvbiAoc3RlcCkgeyByZXR1cm4gcGFyc2VDb2xvcigkZWwsIHN0ZXApOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzID0gc3RlcHMubWFwKHRvRmxvYXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcC5tYXRjaCgvXmJnLykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKCRlbCwgKFwiYmFja2dyb3VuZC1wb3NpdGlvbi1cIiArIChwcm9wWzJdKSksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnUG9zID0gY3NzKCRlbCwgJ2JhY2tncm91bmRQb3NpdGlvbicpLnNwbGl0KCcgJylbcHJvcFsyXSA9PT0gJ3gnID8gMCA6IDFdOyAvLyBJRSAxMSBjYW4ndCByZWFkIGJhY2tncm91bmQtcG9zaXRpb24tW3h8eV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5jb3ZlcnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbi5hcHBseShNYXRoLCBzdGVwcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHN0ZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG93biA9IHN0ZXBzLmluZGV4T2YobWluKSA8IHN0ZXBzLmluZGV4T2YobWF4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSBtYXggLSBtaW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHN0ZXBzLm1hcChmdW5jdGlvbiAoc3RlcCkgeyByZXR1cm4gc3RlcCAtIChkb3duID8gbWluIDogbWF4KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gKGRvd24gPyAtZGlmZiA6IDApICsgXCJweFwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gYmdQb3M7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb3BzW3Byb3BdID0ge3N0ZXBzOiBzdGVwcywgdW5pdDogdW5pdCwgcG9zOiBwb3MsIGJnUG9zOiBiZ1BvcywgZGlmZjogZGlmZn07XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuXG4gICAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBiZ1Byb3BzOiBmdW5jdGlvbiBiZ1Byb3BzKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnYmd4JywgJ2JneSddLmZpbHRlcihmdW5jdGlvbiAoYmcpIHsgcmV0dXJuIGJnIGluIHRoaXMkMS5wcm9wczsgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb3ZlcnM6IGZ1bmN0aW9uIGNvdmVycyhfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3NzKCRlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSAhPT0gJycgPyBjc3MoJGVsLCAnYmFja2dyb3VuZFNpemUnLCAnJykgOiAkZWwsICdiYWNrZ3JvdW5kU2l6ZScpID09PSAnY292ZXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faW1hZ2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWN0aXZlID0gIXRoaXMubWVkaWEgfHwgd2luLm1hdGNoTWVkaWEodGhpcy5tZWRpYSkubWF0Y2hlcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbWFnZS5kaW1FbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy4kZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLiRlbC5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2ltYWdlJyBpbiBkYXRhIHx8ICF0aGlzLmNvdmVycyB8fCAhdGhpcy5iZ1Byb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNyYyA9IGNzcyh0aGlzLiRlbCwgJ2JhY2tncm91bmRJbWFnZScpLnJlcGxhY2UoL15ub25lfHVybFxcKFtcIiddPyguKz8pW1wiJ10/XFwpJC8sICckMScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkYXRhLmltYWdlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgZ2V0SW1hZ2Uoc3JjKS50aGVuKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaW1hZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGltZy5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBpbWcubmF0dXJhbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiRlbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IHJlZi5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHJlZi5hY3RpdmU7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7YmFja2dyb3VuZFNpemU6ICcnLCBiYWNrZ3JvdW5kUmVwZWF0OiAnJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpbUVsID0gaW1hZ2UuZGltRWw7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoaW1hZ2UsIGRpbUVsKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcyQxLnByb3BzW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmYgPSByZWYuZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZ1BvcyA9IHJlZi5iZ1BvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwcyA9IHJlZi5zdGVwcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gcHJvcCA9PT0gJ2JneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BhbiA9IGRpbVthdHRyXSAtIGRpbUVsW2F0dHJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJnUG9zLm1hdGNoKC8lJHwwcHgvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4gPCBkaWZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGltRWxbYXR0cl0gPSBkaW1bYXR0cl0gKyBkaWZmIC0gc3BhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BhbiA+IGRpZmYpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZ1Bvc0Zsb2F0ID0gcGFyc2VGbG9hdChiZ1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmdQb3NGbG9hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEucHJvcHNbcHJvcF0uc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHN0ZXAgLSAoc3BhbiAtIGRpZmYpIC8gKDEwMCAvIGJnUG9zRmxvYXQpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoaW1hZ2UsIGRpbUVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogKChkaW0ud2lkdGgpICsgXCJweCBcIiArIChkaW0uaGVpZ2h0KSArIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0J1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGVhY2godGhpcy5nZXRDc3MoMCksIGZ1bmN0aW9uIChfLCBwcm9wKSB7IHJldHVybiBjc3ModGhpcyQxLiRlbCwgcHJvcCwgJycpOyB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldENzczogZnVuY3Rpb24gZ2V0Q3NzKHBlcmNlbnQpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IHJlZi5wcm9wcztcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BzKS5yZWR1Y2UoZnVuY3Rpb24gKGNzcywgcHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBwcm9wc1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBzID0gcmVmLnN0ZXBzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdCA9IHJlZi51bml0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gcmVmLnBvcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoc3RlcHMsIHBlcmNlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm1zXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiQxID0gWyd4JywgJ3knXS5tYXAoZnVuY3Rpb24gKGRpcikgeyByZXR1cm4gcHJvcCA9PT0gZGlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsdWUgKyB1bml0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHNbZGlyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRWYWx1ZShwcm9wc1tkaXJdLnN0ZXBzLCBwZXJjZW50KSArIHByb3BzW2Rpcl0udW5pdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYkMVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSByZWYkMVsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBjc3MudHJhbnNmb3JtICs9IFwiIHRyYW5zbGF0ZTNkKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIiwgMClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JvdGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLnRyYW5zZm9ybSArPSBcIiByb3RhdGUoXCIgKyB2YWx1ZSArIFwiZGVnKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy50cmFuc2Zvcm0gKz0gXCIgc2NhbGUoXCIgKyB2YWx1ZSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiZyBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmd5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JneCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzWyhcImJhY2tncm91bmQtcG9zaXRpb24tXCIgKyAocHJvcFsyXSkpXSA9IFwiY2FsYyhcIiArIHBvcyArIFwiICsgXCIgKyAodmFsdWUgKyB1bml0KSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvcmRlckNvbG9yJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYkMiA9IGdldFN0ZXAoc3RlcHMsIHBlcmNlbnQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSByZWYkMlswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZCA9IHJlZiQyWzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHJlZiQyWzJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzW3Byb3BdID0gXCJyZ2JhKFwiICsgKHN0YXJ0Lm1hcChmdW5jdGlvbiAodmFsdWUsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBwICogKGVuZFtpXSAtIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAzID8gdG9GbG9hdCh2YWx1ZSkgOiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsJykpICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENTUyBGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgYmx1cihcIiArIHZhbHVlICsgXCJweClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2h1ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLmZpbHRlciArPSBcIiBodWUtcm90YXRlKFwiICsgdmFsdWUgKyBcImRlZylcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZvcGFjaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuZmlsdGVyICs9IFwiIG9wYWNpdHkoXCIgKyB2YWx1ZSArIFwiJSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyYXlzY2FsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnZlcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2F0dXJhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VwaWEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgXCIgKyBwcm9wICsgXCIoXCIgKyB2YWx1ZSArIFwiJSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjc3M7XG5cbiAgICAgICAgICAgICAgICB9LCB7dHJhbnNmb3JtOiAnJywgZmlsdGVyOiAnJ30pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlQ29sb3IoZWwsIGNvbG9yKSB7XG4gICAgICAgIHJldHVybiBjc3MoY3NzKGVsLCAnY29sb3InLCBjb2xvciksICdjb2xvcicpLnNwbGl0KC9bKCksXS9nKS5zbGljZSgxLCAtMSkuY29uY2F0KDEpLnNsaWNlKDAsIDQpLm1hcChmdW5jdGlvbiAobikgeyByZXR1cm4gdG9GbG9hdChuKTsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RlcChzdGVwcywgcGVyY2VudCkge1xuICAgICAgICB2YXIgY291bnQgPSBzdGVwcy5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKGNvdW50ICogcGVyY2VudCksIGNvdW50IC0gMSk7XG4gICAgICAgIHZhciBzdGVwID0gc3RlcHMuc2xpY2UoaW5kZXgsIGluZGV4ICsgMik7XG5cbiAgICAgICAgc3RlcC5wdXNoKHBlcmNlbnQgPT09IDEgPyAxIDogcGVyY2VudCAlICgxIC8gY291bnQpICogY291bnQpO1xuXG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZhbHVlKHN0ZXBzLCBwZXJjZW50KSB7XG4gICAgICAgIHZhciByZWYgPSBnZXRTdGVwKHN0ZXBzLCBwZXJjZW50KTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gcmVmWzBdO1xuICAgICAgICB2YXIgZW5kID0gcmVmWzFdO1xuICAgICAgICB2YXIgcCA9IHJlZlsyXTtcbiAgICAgICAgcmV0dXJuIChpc051bWJlcihzdGFydClcbiAgICAgICAgICAgID8gc3RhcnQgKyBNYXRoLmFicyhzdGFydCAtIGVuZCkgKiBwICogKHN0YXJ0IDwgZW5kID8gMSA6IC0xKVxuICAgICAgICAgICAgOiArZW5kXG4gICAgICAgICkudG9GaXhlZCgyKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDcoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kNy5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJa2l0LnVzZShwbHVnaW4kOCk7XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGNsYW1wID0gdXRpbC5jbGFtcDtcbiAgICB2YXIgY3NzID0gdXRpbC5jc3M7XG4gICAgdmFyIHNjcm9sbGVkT3ZlciA9IHV0aWwuc2Nyb2xsZWRPdmVyO1xuICAgIHZhciBxdWVyeSA9IHV0aWwucXVlcnk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3BhcmFsbGF4Jywge1xuXG4gICAgICAgIG1peGluczogW21peGluLnBhcmFsbGF4XSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGFyZ2V0OiBTdHJpbmcsXG4gICAgICAgICAgICB2aWV3cG9ydDogTnVtYmVyLFxuICAgICAgICAgICAgZWFzaW5nOiBOdW1iZXIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICB2aWV3cG9ydDogMSxcbiAgICAgICAgICAgIGVhc2luZzogMSxcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uIHRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCAmJiBxdWVyeSh0YXJnZXQsICRlbCkgfHwgJGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcmVmLnBlcmNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXY6IHBlcmNlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiBlYXNlKHNjcm9sbGVkT3Zlcih0aGlzLnRhcmdldCkgLyAodGhpcy52aWV3cG9ydCB8fCAxKSwgdGhpcy5lYXNpbmcpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYsIHJlZiQxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcmVmLnByZXY7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcmVmLnBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSByZWYuYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZiQxLnR5cGU7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gJ3Njcm9sbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gcGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB0aGlzLmdldENzcyhwZXJjZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGVhc2UocGVyY2VudCwgZWFzaW5nKSB7XG4gICAgICAgIHJldHVybiBjbGFtcChwZXJjZW50ICogKDEgLSAoZWFzaW5nIC0gZWFzaW5nICogcGVyY2VudCkpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gU2xpZGVyUmVhY3RpdmUgKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgcmVtb3ZlQ2xhc3MgPSByZWYucmVtb3ZlQ2xhc3M7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoIHx8IHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0VmFsaWRJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5zbGlkZXMsIHRoaXMuY2xzQWN0aXZlLCB0aGlzLmNsc0FjdGl2YXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpbmRleCk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH07XG5cbn1cblxuZnVuY3Rpb24gVHJhbnNpdGlvbmVyUGx1Z2luJDEgKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgYXNzaWduID0gcmVmLmFzc2lnbjtcbiAgICB2YXIgY2xhbXAgPSByZWYuY2xhbXA7XG4gICAgdmFyIGNyZWF0ZUV2ZW50ID0gcmVmLmNyZWF0ZUV2ZW50O1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuICAgIHZhciBEZWZlcnJlZCA9IHJlZi5EZWZlcnJlZDtcbiAgICB2YXIgaW5jbHVkZXMgPSByZWYuaW5jbHVkZXM7XG4gICAgdmFyIGluZGV4ID0gcmVmLmluZGV4O1xuICAgIHZhciBpc1J0bCA9IHJlZi5pc1J0bDtcbiAgICB2YXIgbm9vcCA9IHJlZi5ub29wO1xuICAgIHZhciBzb3J0QnkgPSByZWYuc29ydEJ5O1xuICAgIHZhciB0b05vZGVzID0gcmVmLnRvTm9kZXM7XG4gICAgdmFyIFRyYW5zaXRpb24gPSByZWYuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuXG4gICAgdmFyIFRyYW5zaXRpb25lciA9IGFzc2lnbihmdW5jdGlvbiAocHJldiwgbmV4dCwgZGlyLCByZWYpIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IHJlZi5jZW50ZXI7XG4gICAgICAgIHZhciBlYXNpbmcgPSByZWYuZWFzaW5nO1xuICAgICAgICB2YXIgbGlzdCA9IHJlZi5saXN0O1xuXG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG5cbiAgICAgICAgdmFyIGZyb20gPSBwcmV2XG4gICAgICAgICAgICAgICAgPyBUcmFuc2l0aW9uZXIuZ2V0TGVmdChwcmV2LCBsaXN0LCBjZW50ZXIpXG4gICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uZXIuZ2V0TGVmdChuZXh0LCBsaXN0LCBjZW50ZXIpICsgbmV4dC5vZmZzZXRXaWR0aCAqIGRpcixcbiAgICAgICAgICAgIHRvID0gbmV4dFxuICAgICAgICAgICAgICAgID8gVHJhbnNpdGlvbmVyLmdldExlZnQobmV4dCwgbGlzdCwgY2VudGVyKVxuICAgICAgICAgICAgICAgIDogZnJvbSArIHByZXYub2Zmc2V0V2lkdGggKiBkaXIgKiAoaXNSdGwgPyAtMSA6IDEpO1xuXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIGRpcjogZGlyLFxuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGR1cmF0aW9uLCBwZXJjZW50LCBsaW5lYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPT09IHZvaWQgMCApIHBlcmNlbnQgPSAwO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgdGltaW5nID0gbGluZWFyID8gJ2xpbmVhcicgOiBlYXNpbmc7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24gLT0gTWF0aC5yb3VuZChkdXJhdGlvbiAqIGNsYW1wKHBlcmNlbnQsIC0xLCAxKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZShwZXJjZW50KTtcblxuICAgICAgICAgICAgICAgIHByZXYgJiYgdGhpcy51cGRhdGVUcmFuc2xhdGVzKCk7XG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IHByZXYgPyBwZXJjZW50IDogY2xhbXAocGVyY2VudCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZSh0aGlzLmdldEl0ZW1JbigpLCAnaXRlbWluJywge3BlcmNlbnQ6IHBlcmNlbnQsIGR1cmF0aW9uOiBkdXJhdGlvbiwgdGltaW5nOiB0aW1pbmcsIGRpcjogZGlyfSk7XG4gICAgICAgICAgICAgICAgcHJldiAmJiB0cmlnZ2VyVXBkYXRlKHRoaXMuZ2V0SXRlbUluKHRydWUpLCAnaXRlbW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCB0aW1pbmc6IHRpbWluZywgZGlyOiBkaXJ9KTtcblxuICAgICAgICAgICAgICAgIFRyYW5zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KGxpc3QsIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtdG8gKiAoaXNSdGwgPyAtMSA6IDEpLCAncHgnKX0sIGR1cmF0aW9uLCB0aW1pbmcpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRlZmVycmVkLnJlc29sdmUsIG5vb3ApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYW5zaXRpb24uc3RvcChsaXN0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKGxpc3QpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIGNzcyhsaXN0LCAndHJhbnNmb3JtJywgJycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9yd2FyZDogZnVuY3Rpb24gZm9yd2FyZChkdXJhdGlvbiwgcGVyY2VudCkge1xuICAgICAgICAgICAgICAgIGlmICggcGVyY2VudCA9PT0gdm9pZCAwICkgcGVyY2VudCA9IHRoaXMucGVyY2VudCgpO1xuXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwobGlzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhkdXJhdGlvbiwgcGVyY2VudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQxKHBlcmNlbnQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UoKSAqIGRpciAqIChpc1J0bCA/IC0xIDogMSk7XG5cbiAgICAgICAgICAgICAgICBjc3MobGlzdCwgJ3RyYW5zZm9ybScsIHRyYW5zbGF0ZShjbGFtcChcbiAgICAgICAgICAgICAgICAgICAgLXRvICsgKGRpc3RhbmNlIC0gZGlzdGFuY2UgKiBwZXJjZW50KSxcbiAgICAgICAgICAgICAgICAgICAgLVRyYW5zaXRpb25lci5nZXRXaWR0aChsaXN0KSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgICkgKiAoaXNSdGwgPyAtMSA6IDEpLCAncHgnKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyYW5zbGF0ZXMoKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBjbGFtcChwZXJjZW50LCAtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUodGhpcy5nZXRJdGVtSW4oKSwgJ2l0ZW10cmFuc2xhdGVpbicsIHtwZXJjZW50OiBwZXJjZW50LCBkaXI6IGRpcn0pO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyVXBkYXRlKHRoaXMuZ2V0SXRlbUluKHRydWUpLCAnaXRlbXRyYW5zbGF0ZW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZGlyOiBkaXJ9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKChjc3MobGlzdCwgJ3RyYW5zZm9ybScpLnNwbGl0KCcsJylbNF0gKiAoaXNSdGwgPyAtMSA6IDEpICsgZnJvbSkgLyAodG8gLSBmcm9tKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXREaXN0YW5jZTogZnVuY3Rpb24gZ2V0RGlzdGFuY2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRvIC0gZnJvbSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJdGVtSW46IGZ1bmN0aW9uIGdldEl0ZW1JbihvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIG91dCA9PT0gdm9pZCAwICkgb3V0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVzID0gdGhpcy5nZXRBY3RpdmVzKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFsbCA9IHNvcnRCeShzbGlkZXMobGlzdCksICdvZmZzZXRMZWZ0Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBpbmRleChhbGwsIGFjdGl2ZXNbZGlyICogKG91dCA/IC0xIDogMSkgPiAwID8gYWN0aXZlcy5sZW5ndGggLSAxIDogMF0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIH5pICYmIGFsbFtpICsgKHByZXYgJiYgIW91dCA/IGRpciA6IDApXTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0QWN0aXZlczogZnVuY3Rpb24gZ2V0QWN0aXZlcygpIHtcblxuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gVHJhbnNpdGlvbmVyLmdldExlZnQocHJldiB8fCBuZXh0LCBsaXN0LCBjZW50ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRCeShzbGlkZXMobGlzdCkuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVMZWZ0ID0gVHJhbnNpdGlvbmVyLmdldEVsTGVmdChzbGlkZSwgbGlzdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzbGlkZUxlZnQgPj0gbGVmdCAmJiBzbGlkZUxlZnQgKyBzbGlkZS5vZmZzZXRXaWR0aCA8PSBsaXN0Lm9mZnNldFdpZHRoICsgbGVmdDtcbiAgICAgICAgICAgICAgICB9KSwgJ29mZnNldExlZnQnKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdXBkYXRlVHJhbnNsYXRlczogZnVuY3Rpb24gdXBkYXRlVHJhbnNsYXRlcygpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVzID0gdGhpcy5nZXRBY3RpdmVzKCk7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXMobGlzdCkuZm9yRWFjaChmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQWN0aXZlID0gaW5jbHVkZXMoYWN0aXZlcywgc2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUoc2xpZGUsIChcIml0ZW10cmFuc2xhdGVcIiArIChpc0FjdGl2ZSA/ICdpbicgOiAnb3V0JykpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiBpc0FjdGl2ZSA/IDEgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBzbGlkZS5vZmZzZXRMZWZ0IDw9IG5leHQub2Zmc2V0TGVmdCA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgfSwge1xuXG4gICAgICAgIGdldExlZnQ6IGZ1bmN0aW9uIGdldExlZnQoZWwsIGxpc3QsIGNlbnRlcikge1xuXG4gICAgICAgICAgICB2YXIgbGVmdCA9IHRoaXMuZ2V0RWxMZWZ0KGVsLCBsaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIGNlbnRlclxuICAgICAgICAgICAgICAgID8gbGVmdCAtIHRoaXMuY2VudGVyKGVsLCBsaXN0KVxuICAgICAgICAgICAgICAgIDogTWF0aC5taW4obGVmdCwgdGhpcy5nZXRNYXgobGlzdCkpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TWF4OiBmdW5jdGlvbiBnZXRNYXgobGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIHRoaXMuZ2V0V2lkdGgobGlzdCkgLSBsaXN0Lm9mZnNldFdpZHRoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRXaWR0aDogZnVuY3Rpb24gZ2V0V2lkdGgobGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHNsaWRlcyhsaXN0KS5yZWR1Y2UoZnVuY3Rpb24gKHJpZ2h0LCBlbCkgeyByZXR1cm4gZWwub2Zmc2V0V2lkdGggKyByaWdodDsgfSwgMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TWF4V2lkdGg6IGZ1bmN0aW9uIGdldE1heFdpZHRoKGxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBzbGlkZXMobGlzdCkucmVkdWNlKGZ1bmN0aW9uIChyaWdodCwgZWwpIHsgcmV0dXJuIE1hdGgubWF4KHJpZ2h0LCBlbC5vZmZzZXRXaWR0aCk7IH0sIDApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNlbnRlcjogZnVuY3Rpb24gY2VudGVyKGVsLCBsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5vZmZzZXRXaWR0aCAvIDIgLSBlbC5vZmZzZXRXaWR0aCAvIDI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RWxMZWZ0OiBmdW5jdGlvbiBnZXRFbExlZnQoZWwsIGxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAoZWwub2Zmc2V0TGVmdCArIChpc1J0bCA/IGVsLm9mZnNldFdpZHRoIC0gbGlzdC5vZmZzZXRXaWR0aCA6IDApKSAqIChpc1J0bCA/IC0xIDogMSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZShlbCwgdHlwZSwgZGF0YSkge1xuICAgICAgICB0cmlnZ2VyKGVsLCBjcmVhdGVFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbGlkZXMobGlzdCkge1xuICAgICAgICByZXR1cm4gdG9Ob2RlcyhsaXN0LmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVHJhbnNpdGlvbmVyO1xuXG59XG5cbmZ1bmN0aW9uIFBhcmFsbGF4UGx1Z2luIChVSWtpdCwgcGFyZW50KSB7XG5cbiAgICBVSWtpdC51c2UocGx1Z2luJDgpO1xuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIFVJa2l0X3V0aWwgPSBVSWtpdC51dGlsO1xuICAgIHZhciBjbG9zZXN0ID0gVUlraXRfdXRpbC5jbG9zZXN0O1xuICAgIHZhciBjc3MgPSBVSWtpdF91dGlsLmNzcztcbiAgICB2YXIgZW5kc1dpdGggPSBVSWtpdF91dGlsLmVuZHNXaXRoO1xuICAgIHZhciBub29wID0gVUlraXRfdXRpbC5ub29wO1xuICAgIHZhciBUcmFuc2l0aW9uID0gVUlraXRfdXRpbC5UcmFuc2l0aW9uO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5wYXJhbGxheF0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgaXRlbTogZnVuY3Rpb24gaXRlbSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVyID0gVUlraXQuZ2V0Q29tcG9uZW50KGNsb3Nlc3QodGhpcy4kZWwsIChcIi51ay1cIiArIHBhcmVudCkpLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzbGlkZXIgJiYgY2xvc2VzdCh0aGlzLiRlbCwgc2xpZGVyLnNsaWRlc1NlbGVjdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXNob3duJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoLjUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbWluIGl0ZW1vdXQnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZl9kZXRhaWwgPSByZWYuZGV0YWlsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHJlZl9kZXRhaWwucGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVmX2RldGFpbC5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWluZyA9IHJlZl9kZXRhaWwudGltaW5nO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmX2RldGFpbC5kaXI7XG5cblxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoZ2V0Q3VycmVudCh0eXBlLCBkaXIsIHBlcmNlbnQpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdGFydCh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoaXNJbih0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAuNVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkaXIgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICAgICAgICAgICksIGR1cmF0aW9uLCB0aW1pbmcpLmNhdGNoKG5vb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0cmFuc2l0aW9uY2FuY2VsZWQgdHJhbnNpdGlvbmVuZCcsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW10cmFuc2xhdGVpbiBpdGVtdHJhbnNsYXRlb3V0JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZfZGV0YWlsID0gcmVmLmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSByZWZfZGV0YWlsLnBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXIgPSByZWZfZGV0YWlsLmRpcjtcblxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoZ2V0Q3VycmVudCh0eXBlLCBkaXIsIHBlcmNlbnQpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc0luKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGVuZHNXaXRoKHR5cGUsICdpbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnQodHlwZSwgZGlyLCBwZXJjZW50KSB7XG5cbiAgICAgICAgcGVyY2VudCAvPSAyO1xuXG4gICAgICAgIHJldHVybiAhaXNJbih0eXBlKVxuICAgICAgICAgICAgPyBkaXIgPCAwXG4gICAgICAgICAgICAgICAgPyBwZXJjZW50XG4gICAgICAgICAgICAgICAgOiAxIC0gcGVyY2VudFxuICAgICAgICAgICAgOiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgPyAxIC0gcGVyY2VudFxuICAgICAgICAgICAgICAgIDogcGVyY2VudDtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDkoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kOS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJa2l0LnVzZShwbHVnaW4kNSk7XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgVUlraXRfdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyICQgPSBVSWtpdF91dGlsLiQ7XG4gICAgdmFyICQkID0gVUlraXRfdXRpbC4kJDtcbiAgICB2YXIgYWRkQ2xhc3MgPSBVSWtpdF91dGlsLmFkZENsYXNzO1xuICAgIHZhciBjc3MgPSBVSWtpdF91dGlsLmNzcztcbiAgICB2YXIgZGF0YSA9IFVJa2l0X3V0aWwuZGF0YTtcbiAgICB2YXIgaW5jbHVkZXMgPSBVSWtpdF91dGlsLmluY2x1ZGVzO1xuICAgIHZhciBpc051bWVyaWMgPSBVSWtpdF91dGlsLmlzTnVtZXJpYztcbiAgICB2YXIgaXNVbmRlZmluZWQgPSBVSWtpdF91dGlsLmlzVW5kZWZpbmVkO1xuICAgIHZhciB0b2dnbGVDbGFzcyA9IFVJa2l0X3V0aWwudG9nZ2xlQ2xhc3M7XG4gICAgdmFyIHRvRmxvYXQgPSBVSWtpdF91dGlsLnRvRmxvYXQ7XG4gICAgdmFyIFRyYW5zaXRpb25lciA9IFRyYW5zaXRpb25lclBsdWdpbiQxKFVJa2l0KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2xpZGVyLXBhcmFsbGF4JywgUGFyYWxsYXhQbHVnaW4oVUlraXQsICdzbGlkZXInKSk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3NsaWRlcicsIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jbGFzcywgbWl4aW4uc2xpZGVyLCBTbGlkZXJSZWFjdGl2ZShVSWtpdCldLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgICAgICAgICBzZXRzOiBCb29sZWFuLFxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjZW50ZXI6IGZhbHNlLFxuICAgICAgICAgICAgc2V0czogZmFsc2UsXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLXNsaWRlci1pdGVtJyxcbiAgICAgICAgICAgIHNlbExpc3Q6ICcudWstc2xpZGVyLWl0ZW1zJyxcbiAgICAgICAgICAgIHNlbE5hdjogJy51ay1zbGlkZXItbmF2JyxcbiAgICAgICAgICAgIGNsc0NvbnRhaW5lcjogJ3VrLXNsaWRlci1jb250YWluZXInLFxuICAgICAgICAgICAgVHJhbnNpdGlvbmVyOiBUcmFuc2l0aW9uZXJcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBhdmdXaWR0aDogZnVuY3Rpb24gYXZnV2lkdGgoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYW5zaXRpb25lci5nZXRXaWR0aCh0aGlzLmxpc3QpIC8gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmaW5pdGU6IGZ1bmN0aW9uIGZpbml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmluaXRlID0gcmVmLmZpbml0ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5pdGUgfHwgVHJhbnNpdGlvbmVyLmdldFdpZHRoKHRoaXMubGlzdCkgPCB0aGlzLmxpc3Qub2Zmc2V0V2lkdGggKyBUcmFuc2l0aW9uZXIuZ2V0TWF4V2lkdGgodGhpcy5saXN0KSArIHRoaXMuY2VudGVyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbWF4SW5kZXg6IGZ1bmN0aW9uIG1heEluZGV4KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmluaXRlIHx8IHRoaXMuY2VudGVyICYmICF0aGlzLnNldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0c1t0aGlzLnNldHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuc2xpZGVzLCAnb3JkZXInLCAnJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWF4ID0gVHJhbnNpdGlvbmVyLmdldE1heCh0aGlzLmxpc3QpO1xuICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChUcmFuc2l0aW9uZXIuZ2V0RWxMZWZ0KHRoaXMkMS5saXN0LmNoaWxkcmVuW2ldLCB0aGlzJDEubGlzdCkgPCBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihpICsgMSwgdGhpcyQxLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRzOiBmdW5jdGlvbiBzZXRzKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBzZXRzID0gcmVmLnNldHM7XG5cblxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMubGlzdC5vZmZzZXRXaWR0aCAvICh0aGlzLmNlbnRlciA/IDIgOiAxKTtcblxuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbGVmdENlbnRlciA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZUxlZnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgc2V0cyA9IHNldHMgJiYgdGhpcy5zbGlkZXMucmVkdWNlKGZ1bmN0aW9uIChzZXRzLCBzbGlkZSwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVdpZHRoID0gc2xpZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVJpZ2h0ID0gc2xpZGVMZWZ0ICsgc2xpZGVXaWR0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVSaWdodCA+IGxlZnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEuY2VudGVyICYmIGkgPiB0aGlzJDEubWF4SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gdGhpcyQxLm1heEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVzKHNldHMsIGkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY21wID0gdGhpcyQxLnNsaWRlc1tpICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5jZW50ZXIgJiYgY21wICYmIHNsaWRlV2lkdGggPCBsZWZ0Q2VudGVyIC0gY21wLm9mZnNldFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Q2VudGVyIC09IHNsaWRlV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENlbnRlciA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBzbGlkZUxlZnQgKyB3aWR0aCArICh0aGlzJDEuY2VudGVyID8gc2xpZGVXaWR0aCAvIDIgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlTGVmdCArPSBzbGlkZVdpZHRoO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRzO1xuXG4gICAgICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHMgJiYgc2V0cy5sZW5ndGggJiYgc2V0cztcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNpdGlvbk9wdGlvbnM6IGZ1bmN0aW9uIHRyYW5zaXRpb25PcHRpb25zKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRoaXMubGlzdFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0NvbnRhaW5lciwgISQoKFwiLlwiICsgKHRoaXMuY2xzQ29udGFpbmVyKSksIHRoaXMuJGVsKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgJCQoKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdLFtkYXRhLVwiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdXCIpLCB0aGlzLiRlbCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZGF0YShlbCwgdGhpcyQxLmF0dHJJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLm1heEluZGV4ICYmIHRvZ2dsZUNsYXNzKGVsLCAndWstaGlkZGVuJywgaXNOdW1lcmljKGluZGV4KSAmJiAodGhpcyQxLnNldHMgJiYgIWluY2x1ZGVzKHRoaXMkMS5zZXRzLCB0b0Zsb2F0KGluZGV4KSkgfHwgaW5kZXggPiB0aGlzJDEubWF4SW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czoge1xuXG4gICAgICAgICAgICBiZWZvcmVpdGVtc2hvdzogZnVuY3Rpb24gYmVmb3JlaXRlbXNob3coZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5zZXRzICYmIHRoaXMuc3RhY2subGVuZ3RoIDwgMiAmJiAhaW5jbHVkZXModGhpcy5zZXRzLCB0aGlzLmluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nZXRWYWxpZEluZGV4KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLmFicyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgICAgICAtIHRoaXMucHJldkluZGV4XG4gICAgICAgICAgICAgICAgICAgICsgKHRoaXMuZGlyID4gMCAmJiB0aGlzLmluZGV4IDwgdGhpcy5wcmV2SW5kZXggfHwgdGhpcy5kaXIgPCAwICYmIHRoaXMuaW5kZXggPiB0aGlzLnByZXZJbmRleCA/ICh0aGlzLm1heEluZGV4ICsgMSkgKiB0aGlzLmRpciA6IDApXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnZ2luZyAmJiBkaWZmID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlmZjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc3RhY2suc3BsaWNlKDEsIDAsIHRoaXMkMS5kaXIgPiAwID8gJ25leHQnIDogJ3ByZXZpb3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gc3BlZWRVcCh0aGlzLmF2Z1dpZHRoIC8gdGhpcy52ZWxvY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgKiAoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPCAwIHx8ICF0aGlzLnNsaWRlc1t0aGlzLnByZXZJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVzW3RoaXMuaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNsaWRlc1t0aGlzLnByZXZJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgKS5vZmZzZXRXaWR0aCAvIHRoaXMuYXZnV2lkdGgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyKCk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGl0ZW1zaG93OiBmdW5jdGlvbiBpdGVtc2hvdygpIHtcbiAgICAgICAgICAgICAgICAhaXNVbmRlZmluZWQodGhpcy5wcmV2SW5kZXgpICYmIGFkZENsYXNzKHRoaXMuX2dldFRyYW5zaXRpb25lcigpLmdldEl0ZW1JbigpLCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpdGVtc2hvd246IGZ1bmN0aW9uIGl0ZW1zaG93bigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVzID0gdGhpcy5fZ2V0VHJhbnNpdGlvbmVyKHRoaXMuaW5kZXgpLmdldEFjdGl2ZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSkgeyByZXR1cm4gdG9nZ2xlQ2xhc3Moc2xpZGUsIHRoaXMkMS5jbHNBY3RpdmUsIGluY2x1ZGVzKGFjdGl2ZXMsIHNsaWRlKSk7IH0pO1xuICAgICAgICAgICAgICAgICghdGhpcy5zZXRzIHx8IGluY2x1ZGVzKHRoaXMuc2V0cywgdG9GbG9hdCh0aGlzLmluZGV4KSkpICYmIHRoaXMuc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlKSB7IHJldHVybiB0b2dnbGVDbGFzcyhzbGlkZSwgdGhpcyQxLmNsc0FjdGl2YXRlZCwgaW5jbHVkZXMoYWN0aXZlcywgc2xpZGUpKTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHJlb3JkZXI6IGZ1bmN0aW9uIHJlb3JkZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnNsaWRlcywgJ29yZGVyJywgJycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmRpciA+IDAgJiYgdGhpcy5zbGlkZXNbdGhpcy5wcmV2SW5kZXhdID8gdGhpcy5wcmV2SW5kZXggOiB0aGlzLmluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2xpZGUsIGkpIHsgcmV0dXJuIGNzcyhzbGlkZSwgJ29yZGVyJywgdGhpcyQxLmRpciA+IDAgJiYgaSA8IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICA/IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcyQxLmRpciA8IDAgJiYgaSA+PSB0aGlzJDEuaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICApOyB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zbGlkZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMubGlzdC5vZmZzZXRXaWR0aCAvIDIgLSBuZXh0Lm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgaiA9IDA7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAod2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUluZGV4ID0gdGhpcyQxLmdldEluZGV4KC0taiArIGluZGV4LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHRoaXMkMS5zbGlkZXNbc2xpZGVJbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHNsaWRlLCAnb3JkZXInLCBzbGlkZUluZGV4ID4gaW5kZXggPyAtMiA6IC0xKTtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggLT0gc2xpZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRWYWxpZEluZGV4OiBmdW5jdGlvbiBnZXRWYWxpZEluZGV4KGluZGV4LCBwcmV2SW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID09PSB2b2lkIDAgKSBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKCBwcmV2SW5kZXggPT09IHZvaWQgMCApIHByZXZJbmRleCA9IHRoaXMucHJldkluZGV4O1xuXG5cbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaW5kZXgsIHByZXZJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2V0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHByZXY7XG5cbiAgICAgICAgICAgICAgICBkbyB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKHRoaXMkMS5zZXRzLCBpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzJDEuZ2V0SW5kZXgoaW5kZXggKyB0aGlzJDEuZGlyLCBwcmV2SW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaW5kZXggIT09IHByZXYpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbnNQbHVnaW4kMiAoVUlraXQpIHtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciBVSWtpdF91dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgYXNzaWduID0gVUlraXRfdXRpbC5hc3NpZ247XG4gICAgdmFyIGNzcyA9IFVJa2l0X3V0aWwuY3NzO1xuXG4gICAgdmFyIEFuaW1hdGlvbnMgPSBhc3NpZ24oe30sIG1peGluLnNsaWRlc2hvdy5kZWZhdWx0cy5BbmltYXRpb25zLCB7XG5cbiAgICAgICAgZmFkZToge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJCQxKHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnQsIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgIHt6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzY2FsZToge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IHNjYWxlM2QoMSArIC41KSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAge3pJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxIC0gY3NzKGN1cnJlbnQsICdvcGFjaXR5Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQkMShwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDEgLSBwZXJjZW50LCB0cmFuc2Zvcm06IHNjYWxlM2QoMSArIC41ICogcGVyY2VudCksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgIHt6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBwdWxsOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMzApLCB6SW5kZXg6IC0xfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpLCB6SW5kZXg6IDB9IF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKSwgekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCwgbmV4dCwgZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyAxIC0gQW5pbWF0aW9ucy50cmFuc2xhdGVkKG5leHQpXG4gICAgICAgICAgICAgICAgICAgIDogQW5pbWF0aW9ucy50cmFuc2xhdGVkKGN1cnJlbnQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkMShwZXJjZW50LCBkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMCAqIHBlcmNlbnQpLCB6SW5kZXg6IC0xfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogMH0gXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtcGVyY2VudCAqIDEwMCksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMzAgKiAoMSAtIHBlcmNlbnQpKSwgekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHB1c2g6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDApLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogLTF9IF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwKSwgekluZGV4OiAtMX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKSwgekluZGV4OiAwfVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50LCBuZXh0LCBkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyID4gMFxuICAgICAgICAgICAgICAgICAgICA/IDEgLSBBbmltYXRpb25zLnRyYW5zbGF0ZWQobmV4dClcbiAgICAgICAgICAgICAgICAgICAgOiBBbmltYXRpb25zLnRyYW5zbGF0ZWQoY3VycmVudCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQyKHBlcmNlbnQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKHBlcmNlbnQgKiAxMDApLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0zMCAqICgxIC0gcGVyY2VudCkpLCB6SW5kZXg6IC0xfSBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0zMCAqIHBlcmNlbnQpLCB6SW5kZXg6IC0xfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAgKiAoMSAtIHBlcmNlbnQpKSwgekluZGV4OiAwfVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbnM7XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDEwKFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDEwLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUlraXQudXNlKHBsdWdpbiQ0KTtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciBoZWlnaHQgPSBVSWtpdC51dGlsLmhlaWdodDtcblxuICAgIHZhciBBbmltYXRpb25zID0gQW5pbWF0aW9uc1BsdWdpbiQyKFVJa2l0KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2xpZGVzaG93LXBhcmFsbGF4JywgUGFyYWxsYXhQbHVnaW4oVUlraXQsICdzbGlkZXNob3cnKSk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3NsaWRlc2hvdycsIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jbGFzcywgbWl4aW4uc2xpZGVzaG93LCBTbGlkZXJSZWFjdGl2ZShVSWtpdCldLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICByYXRpbzogU3RyaW5nLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBCb29sZWFuLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBCb29sZWFuLFxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICByYXRpbzogJzE2OjknLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIG1heEhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICBzZWxMaXN0OiAnLnVrLXNsaWRlc2hvdy1pdGVtcycsXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLXNsaWRlc2hvdy1pdGVtJyxcbiAgICAgICAgICAgIHNlbE5hdjogJy51ay1zbGlkZXNob3ctbmF2JyxcbiAgICAgICAgICAgIEFuaW1hdGlvbnM6IEFuaW1hdGlvbnNcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLnJhdGlvLnNwbGl0KCc6JykubWFwKE51bWJlcik7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmWzBdO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWZbMV07XG5cbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgKiB0aGlzLiRlbC5vZmZzZXRXaWR0aCAvIHdpZHRoO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBNYXRoLm1pbih0aGlzLm1heEhlaWdodCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge2hlaWdodDogaGVpZ2h0fTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGd0ID0gcmVmLmhlaWdodDtcblxuICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLmxpc3QsIE1hdGguZmxvb3IoaGd0KSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQxMShVSWtpdCkge1xuICAgIHZhciBvYmo7XG5cblxuICAgIGlmIChwbHVnaW4kMTEuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFkZENsYXNzID0gdXRpbC5hZGRDbGFzcztcbiAgICB2YXIgYWZ0ZXIgPSB1dGlsLmFmdGVyO1xuICAgIHZhciBhc3NpZ24gPSB1dGlsLmFzc2lnbjtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGF0dHIgPSB1dGlsLmF0dHI7XG4gICAgdmFyIGJlZm9yZSA9IHV0aWwuYmVmb3JlO1xuICAgIHZhciBjbG9zZXN0ID0gdXRpbC5jbG9zZXN0O1xuICAgIHZhciBjc3MgPSB1dGlsLmNzcztcbiAgICB2YXIgZG9jID0gdXRpbC5kb2M7XG4gICAgdmFyIGRvY0VsID0gdXRpbC5kb2NFbDtcbiAgICB2YXIgaGVpZ2h0ID0gdXRpbC5oZWlnaHQ7XG4gICAgdmFyIGZhc3Rkb20gPSB1dGlsLmZhc3Rkb207XG4gICAgdmFyIGdldFBvcyA9IHV0aWwuZ2V0UG9zO1xuICAgIHZhciBpbmNsdWRlcyA9IHV0aWwuaW5jbHVkZXM7XG4gICAgdmFyIGluZGV4ID0gdXRpbC5pbmRleDtcbiAgICB2YXIgaXNJbnB1dCA9IHV0aWwuaXNJbnB1dDtcbiAgICB2YXIgbm9vcCA9IHV0aWwubm9vcDtcbiAgICB2YXIgb2Zmc2V0ID0gdXRpbC5vZmZzZXQ7XG4gICAgdmFyIG9mZiA9IHV0aWwub2ZmO1xuICAgIHZhciBvbiA9IHV0aWwub247XG4gICAgdmFyIHBvaW50ZXJEb3duID0gdXRpbC5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlck1vdmUgPSB1dGlsLnBvaW50ZXJNb3ZlO1xuICAgIHZhciBwb2ludGVyVXAgPSB1dGlsLnBvaW50ZXJVcDtcbiAgICB2YXIgcG9zaXRpb24gPSB1dGlsLnBvc2l0aW9uO1xuICAgIHZhciBwcmV2ZW50Q2xpY2sgPSB1dGlsLnByZXZlbnRDbGljaztcbiAgICB2YXIgUHJvbWlzZSA9IHV0aWwuUHJvbWlzZTtcbiAgICB2YXIgcmVtb3ZlID0gdXRpbC5yZW1vdmU7XG4gICAgdmFyIHJlbW92ZUNsYXNzID0gdXRpbC5yZW1vdmVDbGFzcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSB1dGlsLnRvZ2dsZUNsYXNzO1xuICAgIHZhciB0b05vZGVzID0gdXRpbC50b05vZGVzO1xuICAgIHZhciBUcmFuc2l0aW9uID0gdXRpbC5UcmFuc2l0aW9uO1xuICAgIHZhciB0cmlnZ2VyID0gdXRpbC50cmlnZ2VyO1xuICAgIHZhciB3aW4gPSB1dGlsLndpbjtcbiAgICB2YXIgd2l0aGluID0gdXRpbC53aXRoaW47XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3NvcnRhYmxlJywge1xuXG4gICAgICAgIG1peGluczogW21peGluLmNsYXNzXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZ3JvdXA6IFN0cmluZyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogTnVtYmVyLFxuICAgICAgICAgICAgdGhyZXNob2xkOiBOdW1iZXIsXG4gICAgICAgICAgICBjbHNJdGVtOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNQbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRHJhZzogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRHJhZ1N0YXRlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNCYXNlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNOb0RyYWc6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0VtcHR5OiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNDdXN0b206IFN0cmluZyxcbiAgICAgICAgICAgIGhhbmRsZTogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGdyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogMTUwLFxuICAgICAgICAgICAgdGhyZXNob2xkOiA1LFxuICAgICAgICAgICAgY2xzSXRlbTogJ3VrLXNvcnRhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgY2xzUGxhY2Vob2xkZXI6ICd1ay1zb3J0YWJsZS1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBjbHNEcmFnOiAndWstc29ydGFibGUtZHJhZycsXG4gICAgICAgICAgICBjbHNEcmFnU3RhdGU6ICd1ay1kcmFnJyxcbiAgICAgICAgICAgIGNsc0Jhc2U6ICd1ay1zb3J0YWJsZScsXG4gICAgICAgICAgICBjbHNOb0RyYWc6ICd1ay1zb3J0YWJsZS1ub2RyYWcnLFxuICAgICAgICAgICAgY2xzRW1wdHk6ICd1ay1zb3J0YWJsZS1lbXB0eScsXG4gICAgICAgICAgICBjbHNDdXN0b206ICcnLFxuICAgICAgICAgICAgaGFuZGxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgWydpbml0JywgJ3N0YXJ0JywgJ21vdmUnLCAnZW5kJ10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZuID0gdGhpcyQxW2tleV07XG4gICAgICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc2Nyb2xsWSA9IHdpbi5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IGdldFBvcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYueDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSByZWYueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvcyA9IHt4OiB4LCB5OiB5fTtcblxuICAgICAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHt9LCBvYmpbcG9pbnRlckRvd25dID0gJ2luaXQnLCBvYmopLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNFbXB0eSwgIXRoaXMuJGVsLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9mZnNldCh0aGlzLmRyYWcsIHt0b3A6IHRoaXMucG9zLnkgKyB0aGlzLm9yaWdpbi50b3AsIGxlZnQ6IHRoaXMucG9zLnggKyB0aGlzLm9yaWdpbi5sZWZ0fSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gb2Zmc2V0KHRoaXMuZHJhZyk7XG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IHJlZi50b3A7XG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRvcCArIHRoaXMuZHJhZy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbDtcblxuICAgICAgICAgICAgICAgIGlmICh0b3AgPiAwICYmIHRvcCA8IHRoaXMuc2Nyb2xsWSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSB0aGlzLnNjcm9sbFkgLSA1O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm90dG9tIDwgaGVpZ2h0KGRvYykgJiYgYm90dG9tID4gaGVpZ2h0KHdpbikgKyB0aGlzLnNjcm9sbFkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gdGhpcy5zY3JvbGxZICsgNTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY3JvbGwgJiYgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW4uc2Nyb2xsVG8od2luLnNjcm9sbFgsIHNjcm9sbCk7IH0sIDUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gZS5idXR0b247XG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRQcmV2ZW50ZWQgPSBlLmRlZmF1bHRQcmV2ZW50ZWQ7XG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRvTm9kZXModGhpcy4kZWwuY2hpbGRyZW4pLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHdpdGhpbih0YXJnZXQsIGVsKTsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gcmVmWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICB8fCBpc0lucHV0KGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLmhhbmRsZSAmJiAhd2l0aGluKHRhcmdldCwgdGhpcy5oYW5kbGUpXG4gICAgICAgICAgICAgICAgICAgIHx8IGJ1dHRvbiA+IDBcbiAgICAgICAgICAgICAgICAgICAgfHwgd2l0aGluKHRhcmdldCwgKFwiLlwiICsgKHRoaXMuY2xzTm9EcmFnKSkpXG4gICAgICAgICAgICAgICAgICAgIHx8IGRlZmF1bHRQcmV2ZW50ZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hlZCA9IFt0aGlzXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSBhc3NpZ24oe3RhcmdldDogdGFyZ2V0LCBpbmRleDogaW5kZXgocGxhY2Vob2xkZXIpfSwgdGhpcy5wb3MpO1xuXG4gICAgICAgICAgICAgICAgb24oZG9jRWwsIHBvaW50ZXJNb3ZlLCB0aGlzLm1vdmUpO1xuICAgICAgICAgICAgICAgIG9uKGRvY0VsLCBwb2ludGVyVXAsIHRoaXMuZW5kKTtcbiAgICAgICAgICAgICAgICBvbih3aW4sICdzY3JvbGwnLCB0aGlzLnNjcm9sbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoZSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnID0gYXBwZW5kKFVJa2l0LmNvbnRhaW5lciwgdGhpcy5wbGFjZWhvbGRlci5vdXRlckhUTUwucmVwbGFjZSgvXjxsaS9pLCAnPGRpdicpLnJlcGxhY2UoL2xpPiQvaSwgJ2Rpdj4nKSk7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy5kcmFnLCBhc3NpZ24oe1xuICAgICAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMucGxhY2Vob2xkZXIub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wbGFjZWhvbGRlci5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9LCBjc3ModGhpcy5wbGFjZWhvbGRlciwgWydwYWRkaW5nTGVmdCcsICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ1RvcCcsICdwYWRkaW5nQm90dG9tJ10pKSk7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLmRyYWcsICd1ay1uby1ib290JywgJycpO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZHJhZywgdGhpcy5jbHNEcmFnLCB0aGlzLmNsc0N1c3RvbSk7XG5cbiAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy5kcmFnLmZpcnN0RWxlbWVudENoaWxkLCBoZWlnaHQodGhpcy5wbGFjZWhvbGRlci5maXJzdEVsZW1lbnRDaGlsZCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IG9mZnNldCh0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IHJlZi5sZWZ0O1xuICAgICAgICAgICAgICAgIHZhciB0b3AgPSByZWYudG9wO1xuICAgICAgICAgICAgICAgIGFzc2lnbih0aGlzLm9yaWdpbiwge2xlZnQ6IGxlZnQgLSB0aGlzLnBvcy54LCB0b3A6IHRvcCAtIHRoaXMucG9zLnl9KTtcblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGxhY2Vob2xkZXIsIHRoaXMuY2xzUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLmNoaWxkcmVuLCB0aGlzLmNsc0l0ZW0pO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKGRvY0VsLCB0aGlzLmNsc0RyYWdTdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnc3RhcnQnLCBbdGhpcywgdGhpcy5wbGFjZWhvbGRlciwgdGhpcy5kcmFnXSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiBtb3ZlKGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMucG9zLnggLSB0aGlzLm9yaWdpbi54KSA+IHRoaXMudGhyZXNob2xkIHx8IE1hdGguYWJzKHRoaXMucG9zLnkgLSB0aGlzLm9yaWdpbi55KSA+IHRoaXMudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoKTtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnR5cGUgPT09ICdtb3VzZW1vdmUnID8gZS50YXJnZXQgOiBkb2MuZWxlbWVudEZyb21Qb2ludCh0aGlzLnBvcy54IC0gZG9jLmJvZHkuc2Nyb2xsTGVmdCwgdGhpcy5wb3MueSAtIGRvYy5ib2R5LnNjcm9sbFRvcCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc29ydGFibGUgPSBnZXRTb3J0YWJsZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IGdldFNvcnRhYmxlKHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gc29ydGFibGUgIT09IHByZXZpb3VzO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzb3J0YWJsZSB8fCB3aXRoaW4odGFyZ2V0LCB0aGlzLnBsYWNlaG9sZGVyKSB8fCBtb3ZlICYmICghc29ydGFibGUuZ3JvdXAgfHwgc29ydGFibGUuZ3JvdXAgIT09IHByZXZpb3VzLmdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gc29ydGFibGUuJGVsID09PSB0YXJnZXQucGFyZW50Tm9kZSAmJiB0YXJnZXQgfHwgdG9Ob2Rlcyhzb3J0YWJsZS4kZWwuY2hpbGRyZW4pLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gd2l0aGluKHRhcmdldCwgZWxlbWVudCk7IH0pWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMucmVtb3ZlKHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc29ydGFibGUuaW5zZXJ0KHRoaXMucGxhY2Vob2xkZXIsIHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVzKHRoaXMudG91Y2hlZCwgc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hlZC5wdXNoKHNvcnRhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNjcm9sbDogZnVuY3Rpb24gc2Nyb2xsKCkge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbCAhPT0gdGhpcy5zY3JvbGxZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zLnkgKz0gc2Nyb2xsIC0gdGhpcy5zY3JvbGxZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFkgPSBzY3JvbGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uIGVuZChlKSB7XG5cbiAgICAgICAgICAgICAgICBvZmYoZG9jRWwsIHBvaW50ZXJNb3ZlLCB0aGlzLm1vdmUpO1xuICAgICAgICAgICAgICAgIG9mZihkb2NFbCwgcG9pbnRlclVwLCB0aGlzLmVuZCk7XG4gICAgICAgICAgICAgICAgb2ZmKHdpbiwgJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ21vdXNldXAnICYmIHdpdGhpbihlLnRhcmdldCwgJ2FbaHJlZl0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWZdJykuaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV2ZW50Q2xpY2soKTtcblxuICAgICAgICAgICAgICAgIHZhciBzb3J0YWJsZSA9IGdldFNvcnRhYmxlKHRoaXMucGxhY2Vob2xkZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHNvcnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9yaWdpbi5pbmRleCAhPT0gaW5kZXgodGhpcy5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdtb3ZlZCcsIFt0aGlzLCB0aGlzLnBsYWNlaG9sZGVyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHNvcnRhYmxlLiRlbCwgJ2FkZGVkJywgW3NvcnRhYmxlLCB0aGlzLnBsYWNlaG9sZGVyXSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdyZW1vdmVkJywgW3RoaXMsIHRoaXMucGxhY2Vob2xkZXJdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnc3RvcCcsIFt0aGlzXSk7XG5cbiAgICAgICAgICAgICAgICByZW1vdmUodGhpcy5kcmFnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWcgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB0aGlzLnRvdWNoZWQubWFwKGZ1bmN0aW9uIChzb3J0YWJsZSkgeyByZXR1cm4gKChzb3J0YWJsZS5jbHNQbGFjZWhvbGRlcikgKyBcIiBcIiArIChzb3J0YWJsZS5jbHNJdGVtKSk7IH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoZWQuZm9yRWFjaChmdW5jdGlvbiAoc29ydGFibGUpIHsgcmV0dXJuIHJlbW92ZUNsYXNzKHNvcnRhYmxlLiRlbC5jaGlsZHJlbiwgY2xhc3Nlcyk7IH0pO1xuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jRWwsIHRoaXMuY2xzRHJhZ1N0YXRlKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLmNoaWxkcmVuLCB0aGlzLmNsc0l0ZW0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGluc2VydCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd2l0aGluKGVsZW1lbnQsIHRoaXMkMS4kZWwpIHx8IGlzUHJlZGVjZXNzb3IoZWxlbWVudCwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZSh0YXJnZXQsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlcih0YXJnZXQsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQodGhpcyQxLiRlbCwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKGluc2VydCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSQxKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgICAgIGlmICghd2l0aGluKGVsZW1lbnQsIHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmUoZWxlbWVudCk7IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFuaW1hdGU6IGZ1bmN0aW9uIGFuaW1hdGUoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRvTm9kZXModGhpcy4kZWwuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHZhciByZXNldCA9IHtwb3NpdGlvbjogJycsIHdpZHRoOiAnJywgaGVpZ2h0OiAnJywgcG9pbnRlckV2ZW50czogJycsIHRvcDogJycsIGxlZnQ6ICcnLCBib3R0b206ICcnLCByaWdodDogJyd9O1xuXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucHVzaChhc3NpZ24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9LCBwb3NpdGlvbihlbCkpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChUcmFuc2l0aW9uLmNhbmNlbCk7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLmNoaWxkcmVuLCByZXNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kdXBkYXRlKCd1cGRhdGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtaW5IZWlnaHQnLCBoZWlnaHQodGhpcy4kZWwpKTtcblxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBjaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBwb3NpdGlvbihlbCk7IH0pO1xuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGNoaWxkcmVuLm1hcChmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIFRyYW5zaXRpb24uc3RhcnQoY3NzKGVsLCBwcm9wc1tpXSksIHBvc2l0aW9uc1tpXSwgdGhpcyQxLmFuaW1hdGlvbik7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcyQxLiRlbCwgJ21pbkhlaWdodCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZHJlbiwgcmVzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiR1cGRhdGUoJ3VwZGF0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFzdGRvbS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBub29wKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0U29ydGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudCAmJiAoVUlraXQuZ2V0Q29tcG9uZW50KGVsZW1lbnQsICdzb3J0YWJsZScpIHx8IGdldFNvcnRhYmxlKGVsZW1lbnQucGFyZW50Tm9kZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzUHJlZGVjZXNzb3IoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPT09IHRhcmdldC5wYXJlbnROb2RlICYmIGluZGV4KGVsZW1lbnQpID4gaW5kZXgodGFyZ2V0KTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcGx1Z2luJDEyKFVJa2l0KSB7XG4gICAgdmFyIG9iajtcblxuXG4gICAgaWYgKHBsdWdpbiQxMi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGF0dHIgPSB1dGlsLmF0dHI7XG4gICAgdmFyIGRvYyA9IHV0aWwuZG9jO1xuICAgIHZhciBmbGlwUG9zaXRpb24gPSB1dGlsLmZsaXBQb3NpdGlvbjtcbiAgICB2YXIgaGFzQXR0ciA9IHV0aWwuaGFzQXR0cjtcbiAgICB2YXIgaW5jbHVkZXMgPSB1dGlsLmluY2x1ZGVzO1xuICAgIHZhciBpc1RvdWNoID0gdXRpbC5pc1RvdWNoO1xuICAgIHZhciBpc1Zpc2libGUgPSB1dGlsLmlzVmlzaWJsZTtcbiAgICB2YXIgbWF0Y2hlcyA9IHV0aWwubWF0Y2hlcztcbiAgICB2YXIgb24gPSB1dGlsLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHV0aWwucG9pbnRlckRvd247XG4gICAgdmFyIHBvaW50ZXJFbnRlciA9IHV0aWwucG9pbnRlckVudGVyO1xuICAgIHZhciBwb2ludGVyTGVhdmUgPSB1dGlsLnBvaW50ZXJMZWF2ZTtcbiAgICB2YXIgcmVtb3ZlID0gdXRpbC5yZW1vdmU7XG4gICAgdmFyIHdpdGhpbiA9IHV0aWwud2l0aGluO1xuXG4gICAgdmFyIGFjdGl2ZXMgPSBbXTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndG9vbHRpcCcsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBhcmdzOiAndGl0bGUnLFxuXG4gICAgICAgIG1peGluczogW21peGluLmNvbnRhaW5lciwgbWl4aW4udG9nZ2xhYmxlLCBtaXhpbi5wb3NpdGlvbl0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRlbGF5OiBOdW1iZXIsXG4gICAgICAgICAgICB0aXRsZTogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHBvczogJ3RvcCcsXG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogWyd1ay1hbmltYXRpb24tc2NhbGUtdXAnXSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxuICAgICAgICAgICAgY2xzUG9zOiAndWstdG9vbHRpcCdcbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVDb25uZWN0OiBmdW5jdGlvbiBiZWZvcmVDb25uZWN0KCkge1xuICAgICAgICAgICAgdGhpcy5faGFzVGl0bGUgPSBoYXNBdHRyKHRoaXMuJGVsLCAndGl0bGUnKTtcbiAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsIHt0aXRsZTogJycsICdhcmlhLWV4cGFuZGVkJzogZmFsc2V9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgYXR0cih0aGlzLiRlbCwge3RpdGxlOiB0aGlzLl9oYXNUaXRsZSA/IHRoaXMudGl0bGUgOiBudWxsLCAnYXJpYS1leHBhbmRlZCc6IG51bGx9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlcyhhY3RpdmVzLCB0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWN0aXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChhY3RpdmUpIHsgcmV0dXJuIGFjdGl2ZS5oaWRlKCk7IH0pO1xuICAgICAgICAgICAgICAgIGFjdGl2ZXMucHVzaCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3VuYmluZCA9IG9uKGRvYywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuICF3aXRoaW4oZS50YXJnZXQsIHRoaXMkMS4kZWwpICYmIHRoaXMkMS5oaWRlKCk7IH0pO1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcCA9IGFwcGVuZCh0aGlzLmNvbnRhaW5lciwgKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNQb3MpICsgXCJcXFwiIGFyaWEtaGlkZGVuPjxkaXYgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzUG9zKSArIFwiLWlubmVyXFxcIj5cIiArICh0aGlzLnRpdGxlKSArIFwiPC9kaXY+PC9kaXY+XCIpKTtcblxuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsICdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQXQodGhpcy50b29sdGlwLCB0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMuZ2V0QXhpcygpID09PSAneScgPyAoKGZsaXBQb3NpdGlvbih0aGlzLmRpcikpICsgXCItXCIgKyAodGhpcy5hbGlnbikpIDogKCh0aGlzLmFsaWduKSArIFwiLVwiICsgKGZsaXBQb3NpdGlvbih0aGlzLmRpcikpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLnRvb2x0aXAsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5oaWRlVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKHRoaXMkMS4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCAxNTApO1xuXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5kZWxheSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gYWN0aXZlcy5pbmRleE9mKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF+aW5kZXggfHwgbWF0Y2hlcyh0aGlzLiRlbCwgJ2lucHV0JykgJiYgdGhpcy4kZWwgPT09IGRvYy5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3RpdmVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZXIpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5oaWRlVGltZXIpO1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsICdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnRvb2x0aXAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAgJiYgcmVtb3ZlKHRoaXMudG9vbHRpcCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5iaW5kKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogKCBvYmogPSB7fSwgb2JqWyhcImZvY3VzIFwiICsgcG9pbnRlckVudGVyICsgXCIgXCIgKyBwb2ludGVyRG93bildID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSBwb2ludGVyRG93biB8fCAhaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvYmouYmx1ciA9ICdoaWRlJywgb2JqW3BvaW50ZXJMZWF2ZV0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvYmopXG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBwbHVnaW4kMTMoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMTMuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgYWRkQ2xhc3MgPSByZWYuYWRkQ2xhc3M7XG4gICAgdmFyIGFqYXggPSByZWYuYWpheDtcbiAgICB2YXIgbWF0Y2hlcyA9IHJlZi5tYXRjaGVzO1xuICAgIHZhciBub29wID0gcmVmLm5vb3A7XG4gICAgdmFyIG9uID0gcmVmLm9uO1xuICAgIHZhciByZW1vdmVDbGFzcyA9IHJlZi5yZW1vdmVDbGFzcztcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCd1cGxvYWQnLCB7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGFsbG93OiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNEcmFnb3ZlcjogU3RyaW5nLFxuICAgICAgICAgICAgY29uY3VycmVudDogTnVtYmVyLFxuICAgICAgICAgICAgbWF4U2l6ZTogTnVtYmVyLFxuICAgICAgICAgICAgbWltZTogU3RyaW5nLFxuICAgICAgICAgICAgbXNnSW52YWxpZE1pbWU6IFN0cmluZyxcbiAgICAgICAgICAgIG1zZ0ludmFsaWROYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICBtc2dJbnZhbGlkU2l6ZTogU3RyaW5nLFxuICAgICAgICAgICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICBwYXJhbXM6IE9iamVjdCxcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHVybDogU3RyaW5nLFxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhbGxvdzogZmFsc2UsXG4gICAgICAgICAgICBjbHNEcmFnb3ZlcjogJ3VrLWRyYWdvdmVyJyxcbiAgICAgICAgICAgIGNvbmN1cnJlbnQ6IDEsXG4gICAgICAgICAgICBtYXhTaXplOiAwLFxuICAgICAgICAgICAgbWltZTogZmFsc2UsXG4gICAgICAgICAgICBtc2dJbnZhbGlkTWltZTogJ0ludmFsaWQgRmlsZSBUeXBlOiAlcycsXG4gICAgICAgICAgICBtc2dJbnZhbGlkTmFtZTogJ0ludmFsaWQgRmlsZSBOYW1lOiAlcycsXG4gICAgICAgICAgICBtc2dJbnZhbGlkU2l6ZTogJ0ludmFsaWQgRmlsZSBTaXplOiAlcyBCeXRlcyBNYXgnLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGVzW10nLFxuICAgICAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICBhYm9ydDogbm9vcCxcbiAgICAgICAgICAgIGJlZm9yZUFsbDogbm9vcCxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IG5vb3AsXG4gICAgICAgICAgICBjb21wbGV0ZTogbm9vcCxcbiAgICAgICAgICAgIGNvbXBsZXRlQWxsOiBub29wLFxuICAgICAgICAgICAgZXJyb3I6IG5vb3AsXG4gICAgICAgICAgICBmYWlsOiBub29wLFxuICAgICAgICAgICAgbG9hZDogbm9vcCxcbiAgICAgICAgICAgIGxvYWRFbmQ6IG5vb3AsXG4gICAgICAgICAgICBsb2FkU3RhcnQ6IG5vb3AsXG4gICAgICAgICAgICBwcm9ncmVzczogbm9vcFxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czoge1xuXG4gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIGNoYW5nZShlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXMoZS50YXJnZXQsICdpbnB1dFt0eXBlPVwiZmlsZVwiXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQoZS50YXJnZXQuZmlsZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkcm9wOiBmdW5jdGlvbiBkcm9wKGUpIHtcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zZmVyIHx8ICF0cmFuc2Zlci5maWxlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWQodHJhbnNmZXIuZmlsZXMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZ2VudGVyOiBmdW5jdGlvbiBkcmFnZW50ZXIoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZ2xlYXZlOiBmdW5jdGlvbiBkcmFnbGVhdmUoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChmaWxlcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3VwbG9hZCcsIFtmaWxlc10pO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEubWF4U2l6ZSAmJiB0aGlzJDEubWF4U2l6ZSAqIDEwMDAgPCBmaWxlc1tpXS5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuZmFpbCh0aGlzJDEubXNnSW52YWxpZFNpemUucmVwbGFjZSgnJXMnLCB0aGlzJDEuYWxsb3cpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuYWxsb3cgJiYgIW1hdGNoKHRoaXMkMS5hbGxvdywgZmlsZXNbaV0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5mYWlsKHRoaXMkMS5tc2dJbnZhbGlkTmFtZS5yZXBsYWNlKCclcycsIHRoaXMkMS5hbGxvdykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5taW1lICYmICFtYXRjaCh0aGlzJDEubWltZSwgZmlsZXNbaV0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5mYWlsKHRoaXMkMS5tc2dJbnZhbGlkTWltZS5yZXBsYWNlKCclcycsIHRoaXMkMS5taW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlcyA9IFtmaWxlc1swXV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVBbGwodGhpcywgZmlsZXMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNodW5rcyA9IGNodW5rKGZpbGVzLCB0aGlzLmNvbmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHZhciB1cGxvYWQgPSBmdW5jdGlvbiAoZmlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIGRhdGEuYXBwZW5kKHRoaXMkMS5uYW1lLCBmaWxlKTsgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMkMS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKGtleSwgdGhpcyQxLnBhcmFtc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFqYXgodGhpcyQxLnVybCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcyQxLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoZW52KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeGhyID0gZW52LnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIudXBsb2FkICYmIG9uKHhoci51cGxvYWQsICdwcm9ncmVzcycsIHRoaXMkMS5wcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWydsb2FkU3RhcnQnLCAnbG9hZCcsICdsb2FkRW5kJywgJ2Fib3J0J10uZm9yRWFjaChmdW5jdGlvbiAodHlwZSkgeyByZXR1cm4gb24oeGhyLCB0eXBlLnRvTG93ZXJDYXNlKCksIHRoaXMkMVt0eXBlXSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmJlZm9yZVNlbmQoZW52KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmNvbXBsZXRlKHhocik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWQoY2h1bmtzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5jb21wbGV0ZUFsbCh4aHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7IHJldHVybiB0aGlzJDEuZXJyb3IoZS5tZXNzYWdlKTsgfVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHVwbG9hZChjaHVua3Muc2hpZnQoKSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1hdGNoKHBhdHRlcm4sIHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgubWF0Y2gobmV3IFJlZ0V4cCgoXCJeXCIgKyAocGF0dGVybi5yZXBsYWNlKC9cXC8vZywgJ1xcXFwvJykucmVwbGFjZSgvXFwqXFwqL2csICcoXFxcXC9bXlxcXFwvXSspKicpLnJlcGxhY2UoL1xcKi9nLCAnW15cXFxcL10rJykucmVwbGFjZSgvKCg/IVxcXFwpKVxcPy9nLCAnJDEuJykpICsgXCIkXCIpLCAnaScpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaHVuayhmaWxlcywgc2l6ZSkge1xuICAgICAgICB2YXIgY2h1bmtzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IHNpemUpIHtcbiAgICAgICAgICAgIHZhciBjaHVuayA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjaHVuay5wdXNoKGZpbGVzW2kgKyBqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNodW5rcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxufVxuXG5VSWtpdCQyLnVzZShwbHVnaW4pO1xuVUlraXQkMi51c2UocGx1Z2luJDEpO1xuVUlraXQkMi51c2UocGx1Z2luJDIpO1xuVUlraXQkMi51c2UocGx1Z2luJDYpO1xuVUlraXQkMi51c2UocGx1Z2luJDcpO1xuVUlraXQkMi51c2UocGx1Z2luJDkpO1xuVUlraXQkMi51c2UocGx1Z2luJDEwKTtcblVJa2l0JDIudXNlKHBsdWdpbiQxMSk7XG5VSWtpdCQyLnVzZShwbHVnaW4kMTIpO1xuVUlraXQkMi51c2UocGx1Z2luJDEzKTtcblxue1xuICAgIGJvb3QoVUlraXQkMik7XG59XG5cbnJldHVybiBVSWtpdCQyO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdWlraXQvZGlzdC9qcy91aWtpdC5qc1xuLy8gbW9kdWxlIGlkID0gMkVDOFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IER1UjJcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gVzJuVVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIlVJa2l0XCJdID0gcmVxdWlyZShcIi0hLi91aWtpdC5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91aWtpdC9kaXN0L2pzL3Vpa2l0LmpzLWV4cG9zZWRcbi8vIG1vZHVsZSBpZCA9IFlNQ05cbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gbXlwblxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3N0eWxlc2hlZXRzL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IHZOaXpcbi8vIG1vZHVsZSBjaHVua3MgPSAzIl0sInNvdXJjZVJvb3QiOiIifQ==