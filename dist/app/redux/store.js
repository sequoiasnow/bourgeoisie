"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var ducks_1 = require("./ducks");
exports.default = redux_1.createStore(ducks_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
