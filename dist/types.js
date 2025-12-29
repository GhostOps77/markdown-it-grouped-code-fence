"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nesting = exports.TOKEN_TYPE = exports.RULE_NAME = void 0;
exports.RULE_NAME = 'GROUPED_CODE_FENCE';
exports.TOKEN_TYPE = "".concat(exports.RULE_NAME, "_TYPE");
var Nesting;
(function (Nesting) {
    Nesting[Nesting["open"] = 1] = "open";
    Nesting[Nesting["close"] = -1] = "close";
    Nesting[Nesting["selfClose"] = 0] = "selfClose";
})(Nesting || (exports.Nesting = Nesting = {}));
