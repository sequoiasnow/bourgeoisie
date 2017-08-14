"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var themes_1 = require("./themes");
var CHANGE_THEME = 'app/core/theme/CHANGE_THEME';
var initialState = themes_1.default['simple-light'];
function getTheme(state) {
    return state.core.theme;
}
exports.getTheme = getTheme;
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type == CHANGE_THEME) {
        if (themes_1.default[action.name]) {
            return themes_1.default[action.name];
        }
    }
    return state;
}
exports.default = default_1;
