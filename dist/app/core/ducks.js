"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var ducks_1 = require("./style/ducks");
var ducks_2 = require("./theme/ducks");
exports.default = redux_1.combineReducers({
    style: ducks_1.default,
    theme: ducks_2.default,
});
