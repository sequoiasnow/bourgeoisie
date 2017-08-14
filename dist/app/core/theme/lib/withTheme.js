"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("app/redux");
var ducks_1 = require("../ducks");
function withTheme(Comp) {
    return redux_1.connect(function (state) { return ({
        theme: ducks_1.getTheme(state)
    }); })(Comp);
}
exports.withTheme = withTheme;
