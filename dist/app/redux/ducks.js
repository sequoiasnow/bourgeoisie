"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ducks_1 = require("../core/ducks");
var redux_1 = require("redux");
exports.default = redux_1.combineReducers({
    core: ducks_1.default
});
