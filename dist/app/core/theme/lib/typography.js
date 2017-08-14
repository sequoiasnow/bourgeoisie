"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scale = {
    step0: 1,
    step1: 15 / 16,
    step2: 8 / 9,
    step3: 5 / 6,
    step4: 4 / 5,
    step5: 3 / 4,
    step6: 1 / Math.SQRT2,
    step7: 2 / 3,
    step8: 5 / 8,
    step9: 3 / 5,
    step10: 9 / 16,
    step11: 8 / 15,
    step12: 1 / 2,
    step13: 2 / 5,
    step14: 3 / 8,
    step15: 1 / 3,
    step16: 1 / 4,
};
var typography = function (_a) {
    var f = _a.fontSize, fontSizeScale = _a.fontSizeScale, lineHeight = _a.lineHeight;
    return ({
        fontSize: function (level) { return Array.apply(null, { length: Math.abs(level) }).reduce(function (size) {
            var scaleRatio = typeof fontSizeScale === 'string'
                ? scale[fontSizeScale]
                : fontSizeScale;
            return level > 0 ? size * (1 / scaleRatio) : size / (1 / scaleRatio);
        }, f); },
        lineHeight: lineHeight,
        rhythm: function (ratio) { return lineHeight * ratio; }
    });
};
exports.default = typography;
