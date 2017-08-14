"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("app/redux");
var ducks_1 = require("./ducks");
var ducks_2 = require("../theme/ducks");
exports.joinStyles = function () {
    var styles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        styles[_i] = arguments[_i];
    }
    return function (theme) {
        return styles.filter(function (s) { return s; }).reduce(function (total, style) { return (__assign({}, total, (Array.isArray(style) ? exports.joinStyles(style)(theme)
            : (typeof style == 'object' ? style : style(theme))))); }, {});
    };
};
exports.withStyle = function () {
    var styles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        styles[_i] = arguments[_i];
    }
    return exports.joinStyles.apply(void 0, styles.map(function (s) { return Array.isArray(s) ? exports.joinStyles.apply(void 0, s) : s; }));
};
var reduce = function (props, hook) {
    return Object.keys(props).reduce(function (style, prop) {
        var v = props[prop];
        if (typeof v !== 'string' && typeof v !== 'number')
            return style;
        return __assign({}, style, (_a = {}, _a[prop] = hook(prop, v), _a));
        var _a;
    }, {});
};
function hookForRules(rules, func) {
    return function (rule, value) {
        if (rules.indexOf(rule) != -1) {
            return _a = {}, _a[rule] = func(value), _a;
        }
        return null;
        var _a;
    };
}
exports.hookForRules = hookForRules;
function customReturnHook(rule, func) {
    return function (r, value) {
        if (r == rule) {
            return func(value);
        }
        return null;
    };
}
exports.customReturnHook = customReturnHook;
function createPreprocessor() {
    var hooks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        hooks[_i] = arguments[_i];
    }
    return function (styles) { return Object.keys(styles).reduce(function (styleAccumulator, rule) {
        var value = styles[rule];
        if (typeof value == 'undefined')
            return styleAccumulator;
        if (typeof value == 'number' || typeof value == 'string') {
            var newRules = hooks.map(function (hook) { return hook(rule, value); })
                .filter(function (h) { return h; }).reduce(function (total, hRuleVal) { return (__assign({}, total, hRuleVal)); }, (_a = {}, _a[rule] = value, _a));
            return __assign({}, styleAccumulator, newRules);
        }
        return __assign({}, styleAccumulator, (_b = {}, _b[rule] = value, _b));
        var _a, _b;
    }, {}); };
}
exports.createPreprocessor = createPreprocessor;
function createPreprocessorTheme() {
    var hooks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        hooks[_i] = arguments[_i];
    }
    return function (theme) { return createPreprocessor.apply(void 0, hooks.map(function (hook) { return hook(theme); })); };
}
exports.createPreprocessorTheme = createPreprocessorTheme;
function withRenderer(Comp) {
    return redux_1.connect(function (state) { return (__assign({}, ducks_1.getStyleState(state), { theme: ducks_2.getTheme(state) })); })(Comp);
}
exports.withRenderer = withRenderer;
