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
var lib_1 = require("../style/lib");
var lib_2 = require("../style/lib");
var emulateReactNativeInBrowser = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
};
var rhythmHook = function (theme) { return lib_1.hookForRules([
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
], function (val) { return (typeof (val == 'number') ?
    theme.typography.rhythm(val) : val); }); };
var colorHook = function (theme) { return lib_1.hookForRules([
    'color',
    'borderColor',
    'borderBottomColor',
    'borderTopColor',
    'borderLeftColor',
    'borderRightColor',
    'backgroundColor',
    'textDecorationColor',
    'outlineColor',
], function (val) { return (typeof val == 'string') ? (theme.colors[val] || val) : val; }); };
var computeFontSizeAndLineHeightHook = function (_a) {
    var typography = _a.typography;
    return lib_1.customReturnHook('fontSize', function (size) {
        var numSize = typeof size == 'number' ? size : parseInt(size, 10);
        var fontSize = typography.fontSize(numSize);
        var lines = Math.ceil(fontSize / typography.lineHeight);
        var lineHeight = (lines * typography.lineHeight) + 'px';
        return { fontSize: fontSize, lineHeight: lineHeight };
    });
};
var preprocessor = lib_1.createPreprocessorTheme(rhythmHook, colorHook, computeFontSizeAndLineHeightHook);
function createBox(as, changeProps) {
    return lib_2.withRenderer(function (props) {
        var newProps = changeProps ? changeProps(props) : props;
        var _a = newProps, theme = _a.theme, renderer = _a.renderer, mixins = _a.mixins, addGlobalStyle = _a.addGlobalStyle, css = _a.css, _b = _a.emulateReactNative, emulateReactNative = _b === void 0 ? true : _b, margin = _a.margin, marginHorizontal = _a.marginHorizontal, marginVertical = _a.marginVertical, _c = _a.marginBottom, marginBottom = _c === void 0 ? marginVertical : _c, _d = _a.marginLeft, marginLeft = _d === void 0 ? marginHorizontal : _d, _e = _a.marginRight, marginRight = _e === void 0 ? marginHorizontal : _e, _f = _a.marginTop, marginTop = _f === void 0 ? marginVertical : _f, padding = _a.padding, paddingHorizontal = _a.paddingHorizontal, paddingVertical = _a.paddingVertical, _g = _a.paddingBottom, paddingBottom = _g === void 0 ? paddingVertical : _g, _h = _a.paddingLeft, paddingLeft = _h === void 0 ? paddingHorizontal : _h, _j = _a.paddingRight, paddingRight = _j === void 0 ? paddingHorizontal : _j, _k = _a.paddingTop, paddingTop = _k === void 0 ? paddingVertical : _k, bottom = _a.bottom, height = _a.height, left = _a.left, maxHeight = _a.maxHeight, maxWidth = _a.maxWidth, minHeight = _a.minHeight, minWidth = _a.minWidth, right = _a.right, top = _a.top, width = _a.width, alignItems = _a.alignItems, alignSelf = _a.alignSelf, flex = _a.flex, flexBasis = _a.flexBasis, flexDirection = _a.flexDirection, flexGrow = _a.flexGrow, flexShrink = _a.flexShrink, flexWrap = _a.flexWrap, justifyContent = _a.justifyContent, backgroundColor = _a.backgroundColor, opacity = _a.opacity, overflow = _a.overflow, position = _a.position, zIndex = _a.zIndex, borderStyle = _a.borderStyle, borderWidth = _a.borderWidth, borderBottomWidth = _a.borderBottomWidth, borderLeftWidth = _a.borderLeftWidth, borderRightWidth = _a.borderRightWidth, borderTopWidth = _a.borderTopWidth, borderRadius = _a.borderRadius, borderBottomLeftRadius = _a.borderBottomLeftRadius, borderBottomRightRadius = _a.borderBottomRightRadius, borderTopLeftRadius = _a.borderTopLeftRadius, borderTopRightRadius = _a.borderTopRightRadius, color = _a.color, borderColor = _a.borderColor, borderBottomColor = _a.borderBottomColor, borderLeftColor = _a.borderLeftColor, borderRightColor = _a.borderRightColor, borderTopColor = _a.borderTopColor, restProps = __rest(_a, ["theme", "renderer", "mixins", "addGlobalStyle", "css", "emulateReactNative", "margin", "marginHorizontal", "marginVertical", "marginBottom", "marginLeft", "marginRight", "marginTop", "padding", "paddingHorizontal", "paddingVertical", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "bottom", "height", "left", "maxHeight", "maxWidth", "minHeight", "minWidth", "right", "top", "width", "alignItems", "alignSelf", "flex", "flexBasis", "flexDirection", "flexGrow", "flexShrink", "flexWrap", "justifyContent", "backgroundColor", "opacity", "overflow", "position", "zIndex", "borderStyle", "borderWidth", "borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius", "color", "borderColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"]);
        var propStyles = {
            margin: margin,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            padding: padding,
            paddingBottom: paddingBottom,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            paddingTop: paddingTop,
            bottom: bottom,
            height: height,
            left: left,
            maxHeight: maxHeight,
            maxWidth: maxWidth,
            minHeight: minHeight,
            minWidth: minWidth,
            right: right,
            top: top,
            width: width,
            alignSelf: alignSelf,
            flex: flex,
            flexBasis: flexBasis,
            flexDirection: flexDirection,
            flexGrow: flexGrow,
            flexShrink: flexShrink,
            flexWrap: flexWrap,
            justifyContent: justifyContent,
            backgroundColor: backgroundColor,
            opacity: opacity,
            overflow: overflow,
            position: position,
            zIndex: zIndex,
            borderStyle: borderStyle,
            borderWidth: borderWidth,
            borderBottomWidth: borderBottomWidth,
            borderLeftWidth: borderLeftWidth,
            borderRightWidth: borderRightWidth,
            borderTopWidth: borderTopWidth,
            borderRadius: borderRadius,
            borderBottomLeftRadius: borderBottomLeftRadius,
            borderBottomRightRadius: borderBottomRightRadius,
            borderTopLeftRadius: borderTopLeftRadius,
            borderTopRightRadius: borderTopRightRadius,
            color: color,
            borderColor: borderColor,
            borderBottomColor: borderBottomColor,
            borderLeftColor: borderLeftColor,
            borderRightColor: borderRightColor,
            borderTopColor: borderTopColor,
        };
        var styles = lib_1.withStyle(css, propStyles)(theme);
        var className = renderer(preprocessor(theme)(styles));
        return React.createElement(as, __assign({}, restProps, { className: className }));
    });
}
exports.createBox = createBox;
exports.default = createBox('div');
