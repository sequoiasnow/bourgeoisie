"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
require("glamor/reset");
function addGlobalStyle(tag, rules) {
    glamor_1.css.global(tag, rules);
}
var renderer = function (rule) { return glamor_1.css(rule).toString(); };
var mixins = {
    centerContent: function () { return ({
        justifyContent: 'center',
        alignItems: 'center'
    }); },
    perfectBackgroundImage: function (fixed) {
        if (fixed === void 0) { fixed = false; }
        return ({
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttatchment: fixed ? 'fixed' : 'scroll'
        });
    }
};
exports.default = {
    addGlobalStyle: addGlobalStyle,
    renderer: renderer,
    mixins: mixins
};
