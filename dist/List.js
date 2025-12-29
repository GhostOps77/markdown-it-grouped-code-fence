"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var types_1 = require("./types");
var utils_1 = require("./utils");
var List = (function () {
    function List(className, level) {
        this.className = className;
        this.level = level;
        this.listChildLevel = this.level + 2;
        this.listLevel = this.level + 1;
        this.openToken = (0, utils_1.makeToken)({
            type: 'bullet_list_open',
            tag: 'ul',
            nesting: types_1.Nesting.open,
            level: this.level,
            attrs: [['class', this.className.navigationBar]],
        });
        this.closeToken = (0, utils_1.makeToken)({
            type: 'bullet_list_close',
            tag: 'ul',
            nesting: types_1.Nesting.close,
            level: this.level,
        });
        this.makeListToken = (0, utils_1.tokenMaker)({
            type: 'list_item',
            nesting: types_1.Nesting.selfClose,
            tag: 'li',
            level: this.listLevel,
        });
        this.listTokens = [];
    }
    Object.defineProperty(List.prototype, "isEmptyList", {
        get: function () {
            return this.count === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "count", {
        get: function () {
            return this.listTokens.length;
        },
        enumerable: false,
        configurable: true
    });
    List.prototype.add = function (_a) {
        var _b;
        var inputID = _a.inputID, inputName = _a.inputName, title = _a.title;
        (_b = this.listTokens).push.apply(_b, __spreadArray(__spreadArray([this.makeListToken({ nesting: types_1.Nesting.open })], (0, utils_1.makeLabelTokens)({
            inputID: inputID,
            inputName: inputName,
            labelText: title,
            level: this.listChildLevel,
            radioClassName: this.className.labelRadio,
            isCheckedByDefault: this.isEmptyList,
        }), false), [this.makeListToken({ nesting: types_1.Nesting.close })], false));
    };
    Object.defineProperty(List.prototype, "tokens", {
        get: function () {
            return __spreadArray(__spreadArray([this.openToken], this.listTokens, true), [this.closeToken], false);
        },
        enumerable: false,
        configurable: true
    });
    return List;
}());
exports.List = List;
