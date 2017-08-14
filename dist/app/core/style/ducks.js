"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function getRenderer(state) {
    return state.core.style.renderer;
}
exports.getRenderer = getRenderer;
function getMixins(state) {
    return state.core.style.mixins;
}
exports.getMixins = getMixins;
function getAddGlobalStyle(state) {
    return state.core.style.addGlobalStyle;
}
exports.getAddGlobalStyle = getAddGlobalStyle;
function getStyleState(state) {
    return state.core.style;
}
exports.getStyleState = getStyleState;
function default_1(state) {
    if (state === void 0) { state = index_1.default; }
    return state;
}
exports.default = default_1;
