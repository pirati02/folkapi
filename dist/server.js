/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./context/database.js":
/*!*****************************!*\
  !*** ./context/database.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar {\n  Client,\n  Pool\n} = __webpack_require__(/*! pg */ \"pg\");\n\nvar dbConfig = __webpack_require__(/*! ./db-config */ \"./context/db-config.js\");\n\nclass Database {\n  constructor() {\n    this.connected = false;\n    this.client = new Client({\n      user: dbConfig.user,\n      password: dbConfig.password,\n      database: dbConfig.database,\n      host: dbConfig.host,\n      port: dbConfig.port\n    });\n    this.client.on(\"disconnect\", function (ended) {\n      this.connected = false;\n      console.log(\"client disconnected\");\n    });\n    this.client.on(\"connect\", function (ended) {\n      this.connected = true;\n      console.log(\"client connected\");\n    });\n  }\n\n  all(text) {\n    var _arguments = arguments,\n        _this = this;\n\n    return _asyncToGenerator(function* () {\n      var values = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : [];\n      yield _this.reconnect();\n      return yield _this.client.query(text, values);\n    })();\n  }\n\n  get(text) {\n    var _arguments2 = arguments,\n        _this2 = this;\n\n    return _asyncToGenerator(function* () {\n      var values = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : [];\n      yield _this2.reconnect();\n      return yield _this2.client.query(text, values);\n    })();\n  }\n\n  reconnect() {\n    var _this3 = this;\n\n    return _asyncToGenerator(function* () {\n      if (!_this3.connected) {\n        _this3.connected = true;\n        yield _this3.client.connect();\n      }\n    })();\n  }\n\n}\n\nmodule.exports = Database;\n\n//# sourceURL=webpack://folkapi/./context/database.js?");

/***/ }),

/***/ "./context/db-config.js":
/*!******************************!*\
  !*** ./context/db-config.js ***!
  \******************************/
/***/ ((module) => {

eval("module.exports = {\n  host: 'postgresql-62266-0.cloudclusters.net',\n  port: 11156,\n  database: 'Folk',\n  user: 'admin',\n  password: 'FolkappPass2021.'\n};\n\n//# sourceURL=webpack://folkapi/./context/db-config.js?");

/***/ }),

/***/ "./entity/ensemble.js":
/*!****************************!*\
  !*** ./entity/ensemble.js ***!
  \****************************/
/***/ ((module) => {

eval("class Ensemble {\n  constructor(id, name, artistType) {\n    this.id = id;\n    this.name = name;\n    this.artistType = artistType;\n  }\n\n}\n\nmodule.exports = Ensemble;\n\n//# sourceURL=webpack://folkapi/./entity/ensemble.js?");

/***/ }),

/***/ "./entity/search.result.js":
/*!*********************************!*\
  !*** ./entity/search.result.js ***!
  \*********************************/
/***/ ((module) => {

eval("class SearchResult {\n  constructor(id, name, entityType, parentId) {\n    this.id = id;\n    this.name = name;\n    this.entityType = entityType;\n    this.parentId = parentId;\n  }\n\n}\n\nmodule.exports = SearchResult;\n\n//# sourceURL=webpack://folkapi/./entity/search.result.js?");

/***/ }),

/***/ "./entity/song.js":
/*!************************!*\
  !*** ./entity/song.js ***!
  \************************/
/***/ ((module) => {

eval("class Song {\n  constructor(id, name, songType, ensembleId, path, ensembleName) {\n    this.id = id;\n    this.name = name;\n    this.songType = songType;\n    this.ensembleId = ensembleId;\n    this.path = path;\n    this.ensembleName = ensembleName;\n  }\n\n}\n\nmodule.exports = Song;\n\n//# sourceURL=webpack://folkapi/./entity/song.js?");

/***/ }),

/***/ "./routes/folkapi/folkapi-service.js":
/*!*******************************************!*\
  !*** ./routes/folkapi/folkapi-service.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ensemble = __webpack_require__(/*! ../../entity/ensemble */ \"./entity/ensemble.js\");\n\nvar Song = __webpack_require__(/*! ../../entity/song */ \"./entity/song.js\");\n\nclass FolkApiService {\n  constructor(appDao) {\n    this.dao = appDao;\n  }\n\n  ensembles() {\n    return this.dao.all(\"SELECT * FROM \\\"Ensembles\\\" WHERE \\\"ArtistType\\\" = $1\", [1]).then((_ref) => {\n      var {\n        rows\n      } = _ref;\n      return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType));\n    }).catch(console.log);\n  }\n\n  oldRecordings() {\n    return this.dao.all(\"SELECT * FROM \\\"Ensembles\\\" WHERE \\\"ArtistType\\\" = $1\", [2]).then((_ref2) => {\n      var {\n        rows\n      } = _ref2;\n      return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType));\n    }).catch(console.log);\n  }\n\n  ensemble(id) {\n    return this.dao.all(\"SELECT * FROM \\\"Ensembles\\\" WHERE \\\"Id\\\" = $1\", [id]).then((_ref3) => {\n      var {\n        rows\n      } = _ref3;\n      return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))[0];\n    }).catch(console.log);\n  }\n\n  songsByEnsembleId(artistId) {\n    return this.dao.all(\"SELECT * FROM \\\"Songs\\\" WHERE \\\"EnsembleId\\\" = $1 and \\\"SongType\\\" = $2\", [artistId, 0]).then((_ref4) => {\n      var {\n        rows\n      } = _ref4;\n      return rows.filter(item => item.IsDeleted === \"0\").map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path));\n    }).catch(console.log);\n  }\n\n  chantsByEnsembleId(artistId) {\n    return this.dao.all(\"SELECT * FROM \\\"Songs\\\" WHERE \\\"EnsembleId\\\" = $1 and \\\"SongType\\\" = $2\", [artistId, 1]).then((_ref5) => {\n      var {\n        rows\n      } = _ref5;\n      return rows.filter(item => item.IsDeleted === \"0\").map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path));\n    }).catch(console.log);\n  }\n\n}\n\nmodule.exports = FolkApiService;\n\n//# sourceURL=webpack://folkapi/./routes/folkapi/folkapi-service.js?");

/***/ }),

/***/ "./routes/folkapi/route.js":
/*!*********************************!*\
  !*** ./routes/folkapi/route.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar Database = __webpack_require__(/*! ../../context/database */ \"./context/database.js\");\n\nvar FolkApiService = __webpack_require__(/*! ./folkapi-service */ \"./routes/folkapi/folkapi-service.js\");\n\nvar folkapiService = new FolkApiService(new Database());\nrouter.get(\"/ensembles\", /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(function* (req, res) {\n    var ensembles = yield folkapiService.ensembles();\n    res.send(ensembles);\n  });\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\nrouter.get(\"/old-recordings\", /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(function* (req, res) {\n    var ensembles = yield folkapiService.oldRecordings();\n    res.send(ensembles);\n  });\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}());\nrouter.get(\"/ensemble/:id\", /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator(function* (req, res) {\n    var id = req.params.id;\n    var ensemble = yield folkapiService.ensemble(id);\n    res.send(ensemble);\n  });\n\n  return function (_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}());\nrouter.get(\"/songs/:id\", /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator(function* (req, res) {\n    var id = req.params.id;\n    var songs = yield folkapiService.songsByEnsembleId(id);\n    var chants = yield folkapiService.chantsByEnsembleId(id);\n    res.send({\n      songs,\n      chants\n    });\n  });\n\n  return function (_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}());\nrouter.get(\"/song/:id\", /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator(function* (req, res) {\n    var id = req.params.id;\n    var song = yield folkapiService.songById(id);\n    if (song == null) res.status(404).send('Not found');\n    res.send(song);\n  });\n\n  return function (_x9, _x10) {\n    return _ref5.apply(this, arguments);\n  };\n}());\nrouter.get(\"/songdata/:id\", /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator(function* (req, res) {\n    var id = req.params.id;\n    var song = yield folkapiService.songData(id);\n    if (song == null) res.status(404).send('Not found');\n    var file = Buffer.from(song.Data).toString('base64');\n    res.json({\n      file: file\n    });\n  });\n\n  return function (_x11, _x12) {\n    return _ref6.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n\n//# sourceURL=webpack://folkapi/./routes/folkapi/route.js?");

/***/ }),

/***/ "./routes/search/route.js":
/*!********************************!*\
  !*** ./routes/search/route.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar Database = __webpack_require__(/*! ../../context/database */ \"./context/database.js\");\n\nvar SearchService = __webpack_require__(/*! ./search-service */ \"./routes/search/search-service.js\");\n\nvar searchService = new SearchService(new Database());\nrouter.get(\"/term/:term\", /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(function* (req, res) {\n    var term = req.params.term;\n    var ensembles = yield searchService.searchEnsembles(term);\n    var songs = yield searchService.searchSong(term);\n    res.send({\n      ensembles,\n      songs\n    });\n  });\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n\n//# sourceURL=webpack://folkapi/./routes/search/route.js?");

/***/ }),

/***/ "./routes/search/search-service.js":
/*!*****************************************!*\
  !*** ./routes/search/search-service.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var SearchResult = __webpack_require__(/*! ../../entity/search.result */ \"./entity/search.result.js\");\n\nvar Ensemble = __webpack_require__(/*! ../../entity/ensemble */ \"./entity/ensemble.js\");\n\nvar Song = __webpack_require__(/*! ../../entity/song */ \"./entity/song.js\");\n\nclass SearchService {\n  constructor(appDao) {\n    this.dao = appDao;\n  }\n\n  searchEnsembles(term) {\n    return this.dao.all(\"SELECT * FROM \\\"Ensembles\\\" WHERE \\\"Name\\\" like $1\", ['%' + term + '%']).then((_ref) => {\n      var {\n        rows\n      } = _ref;\n      return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType));\n    }).catch(console.log);\n  }\n\n  searchSong(term) {\n    return this.dao.all(\"SELECT songs.*, ensembles.\\\"Name\\\" as \\\"EnsembleName\\\"  FROM \\\"Songs\\\" songs  \\n                   JOIN \\\"Ensembles\\\" ensembles ON songs.\\\"EnsembleId\\\" = ensembles.\\\"Id\\\"\\n                WHERE songs.\\\"Title\\\" like $1\", ['%' + term + '%']).then((_ref2) => {\n      var {\n        rows\n      } = _ref2;\n      console.log(rows);\n      return rows.map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path, item.EnsembleName));\n    }).catch(console.log);\n  }\n\n}\n\nmodule.exports = SearchService;\n\n//# sourceURL=webpack://folkapi/./routes/search/search-service.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var createError = __webpack_require__(/*! http-errors */ \"http-errors\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar folkapiRoute = __webpack_require__(/*! ./routes/folkapi/route */ \"./routes/folkapi/route.js\");\n\nvar searchApiRoute = __webpack_require__(/*! ./routes/search/route */ \"./routes/search/route.js\");\n\nvar {\n  env\n} = __webpack_require__(/*! process */ \"process\");\n\nvar server = express();\nserver.use(logger('dev'));\nserver.use(express.json());\nserver.use(express.urlencoded({\n  extended: false\n}));\nserver.use(cookieParser());\nserver.use('/folkapi', folkapiRoute);\nserver.use('/search', searchApiRoute); // catch 404 and forward to error handler\n\nserver.use(function (req, res, next) {\n  next(createError(404));\n});\nserver.use(function (err, req, res, next) {\n  // set locals, only providing error in development\n  res.locals.message = err.message;\n  res.locals.error = req.app.get('env') === 'development' ? err : {};\n  res.status(err.status || 500);\n  res.send('error');\n});\nvar port = process.env.PORT || 3000;\nserver.listen(port, () => {\n  console.log(\"listening on \".concat(port));\n});\nmodule.exports = server;\n\n//# sourceURL=webpack://folkapi/./server.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cookie-parser\");;\n\n//# sourceURL=webpack://folkapi/external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://folkapi/external_%22express%22?");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"http-errors\");;\n\n//# sourceURL=webpack://folkapi/external_%22http-errors%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"morgan\");;\n\n//# sourceURL=webpack://folkapi/external_%22morgan%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"pg\");;\n\n//# sourceURL=webpack://folkapi/external_%22pg%22?");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"process\");;\n\n//# sourceURL=webpack://folkapi/external_%22process%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./server.js");
/******/ })()
;