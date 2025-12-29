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
exports.TokenCollector = void 0;
var List_1 = require("./List");
var utils_1 = require("./utils");
var id_1 = require("./id");
var types_1 = require("./types");
var makeOpenToken = (0, utils_1.tokenMaker)({
    type: types_1.TOKEN_TYPE,
    tag: 'div',
    nesting: types_1.Nesting.open,
});
var makeCloseToken = (0, utils_1.tokenMaker)({
    type: types_1.TOKEN_TYPE,
    tag: 'div',
    nesting: types_1.Nesting.close,
});
var TokenCollector = (function () {
    function TokenCollector(config) {
        this.config = config;
        this.tokens = [];
        this.currentGroupID = -1;
        this.currentGroupIndex = -1;
        this.list = null;
    }
    Object.defineProperty(TokenCollector.prototype, "isGroupClosed", {
        get: function () {
            var isGroupClosed = this.currentGroupIndex === -1 || this.list === null;
            if (isGroupClosed &&
                (this.currentGroupIndex !== -1 || this.list !== null)) {
                throw new Error('if Group is closed, currentGroupIndex must be `-1` and list must be `null`.');
            }
            return isGroupClosed;
        },
        enumerable: false,
        configurable: true
    });
    TokenCollector.prototype.addToken = function (token) {
        this.tokens.push(token);
    };
    TokenCollector.prototype.addTokenIntoCurrentGroup = function (token, title, closeGroupAfterAddingToken) {
        if (this.isGroupClosed) {
            throw new Error('Current is no Group exist.');
        }
        var inputID = (0, utils_1.getInputID)(this.currentGroupID, this.list.count);
        var inputName = (0, utils_1.getInputName)(this.currentGroupID);
        var fenceRadioToken = (0, utils_1.makeRadioToken)({
            level: token.level + 1,
            attrs: {
                id: (0, utils_1.getInputID)(this.currentGroupID, this.list.count),
                name: (0, utils_1.getInputName)(this.currentGroupID),
                checked: this.list.isEmptyList,
                className: this.config.className.fenceRadio,
            },
        });
        var fenceToken = (0, utils_1.makeNestedToken)({ token: token, nestLevel: 1 });
        this.list.add({ title: title, inputID: inputID, inputName: inputName });
        this.tokens.push(fenceRadioToken, fenceToken);
        if (closeGroupAfterAddingToken) {
            this.closeCurrentGroup(token.level);
        }
    };
    TokenCollector.prototype.startNewGroup = function (level, closePreviousBeforeStartANewOne) {
        if (closePreviousBeforeStartANewOne) {
            this.closeCurrentGroup(level);
        }
        if (!this.isGroupClosed) {
            throw new Error('Start a new Group before close the previous one is invalid');
        }
        this.currentGroupID = (0, id_1.getAndIncreaseID)();
        this.currentGroupIndex = this.tokens.length;
        this.list = new List_1.List(this.config.className, level + 1);
        this.tokens.push(makeOpenToken({
            level: level,
            attrs: [['class', this.config.className.container]],
        }));
    };
    TokenCollector.prototype.closeCurrentGroup = function (level) {
        var _a;
        if (this.isGroupClosed) {
            throw new Error('Closing a non-existing Group is invalid.');
        }
        (_a = this.tokens).splice.apply(_a, __spreadArray([this.currentGroupIndex + 1, 0], this.list.tokens, false));
        this.list = null;
        this.currentGroupIndex = -1;
        this.tokens.push(makeCloseToken({ level: level }));
    };
    TokenCollector.prototype.getTokens = function () {
        if (this.isGroupClosed) {
            return this.tokens.slice(0);
        }
        else {
            throw new Error('You can not get the tokens, because current Group is not closed.');
        }
    };
    return TokenCollector;
}());
exports.TokenCollector = TokenCollector;
