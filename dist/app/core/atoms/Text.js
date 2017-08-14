"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = require("./Box");
var lib_1 = require("../style/lib");
function createTextComponent(withStyles) {
    return Box_1.createBox('span', function (props) {
        var align = props.align, bold = props.bold, color = props.color, decoration = props.decoration, fontFamily = props.fontFamily, italic = props.italic, lineHeight = props.lineHeight, _a = props.size, size = _a === void 0 ? 0 : _a, css = props.css, restProps = __rest(props, ["align", "bold", "color", "decoration", "fontFamily", "italic", "lineHeight", "size", "css"]);
        var addedStyles = withStyles ? withStyles(props) : {};
        return __assign({ css: lib_1.withStyle(addedStyles, css, function (theme) { return (__assign({ color: color || theme.text.color, fontFamily: fontFamily }, (align ? { textAlign: align } : null), (bold ? { fontWeight: 'bold' } : null), (decoration ? { textDecoration: decoration } : null), (italic ? { fontStyle: 'italic' } : null), (lineHeight ? { lineHeight: lineHeight } : null), { fontSize: size })); }), emulateReactNative: false }, restProps);
    });
}
exports.createTextComponent = createTextComponent;
exports.default = createTextComponent();
