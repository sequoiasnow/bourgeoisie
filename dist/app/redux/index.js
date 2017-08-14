"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
function connect(mapStateToProps, mapDispatchToProps) {
    return function componentImplementation(component) {
        return react_redux_1.connect(mapStateToProps, mapDispatchToProps || (function () { return ({}); }))(component);
    };
}
exports.connect = connect;
