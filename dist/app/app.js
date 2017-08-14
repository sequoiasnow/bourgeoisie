"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var store_1 = require("./redux/store");
var hello_1 = require("./hello");
exports.default = function () { return (React.createElement(react_redux_1.Provider, { store: store_1.default },
    React.createElement(hello_1.default, null))); };
