"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTokenInfo = void 0;
exports.makeToken = makeToken;
exports.makeNestedToken = makeNestedToken;
exports.tokenMaker = tokenMaker;
exports.getInputID = getInputID;
exports.getInputName = getInputName;
exports.makeRadioToken = makeRadioToken;
exports.makeLabelTokens = makeLabelTokens;
var token_mjs_1 = __importDefault(require("markdown-it/lib/token.mjs"));
var types_1 = require("./types");
var GROUP_REGEX = / \[([^\[\]]*)]/;
var LANGUAGE_REGEX = /^[^ ]+/;
function filterGroupResult(info) {
    var regexResult = GROUP_REGEX.exec(info);
    if (regexResult) {
        var _a = (regexResult[1] || '').split('-'), scope = _a[0], title = _a[1];
        return { scope: scope, title: title };
    }
    return { scope: null, title: null };
}
var filterTokenInfo = function (info) {
    var languageResult = LANGUAGE_REGEX.exec(info);
    var language = (languageResult && languageResult[0]) || '';
    var _a = filterGroupResult(info), scope = _a.scope, title = _a.title;
    return { scope: scope, title: title || language };
};
exports.filterTokenInfo = filterTokenInfo;
function makeToken(_a) {
    var type = _a.type, tag = _a.tag, nesting = _a.nesting, restValue = __rest(_a, ["type", "tag", "nesting"]);
    return Object.assign(new token_mjs_1.default(type, tag, nesting), restValue);
}
function makeNestedToken(_a) {
    var token = _a.token, nestLevel = _a.nestLevel;
    return Object.assign(Object.create(token_mjs_1.default.prototype), token, {
        level: token.level + nestLevel,
    });
}
function tokenMaker(defaultTokenValue) {
    return function (tokenValue) {
        return makeToken(__assign(__assign({}, defaultTokenValue), tokenValue));
    };
}
function getInputID(groupID, listCount) {
    return "group-".concat(groupID, "-").concat(listCount);
}
function getInputName(groupID) {
    return "group-".concat(groupID);
}
function makeRadioToken(_a) {
    var level = _a.level, _b = _a.attrs, id = _b.id, name = _b.name, className = _b.className, checked = _b.checked;
    var attrs = [
        ['type', 'radio'],
        ['style', 'display: none;'],
        ['class', className],
        ['id', id],
        ['name', name],
    ];
    if (checked) {
        attrs.push(['checked', '']);
    }
    return makeToken({
        level: level,
        attrs: attrs,
        type: 'radio_input',
        tag: 'input',
        nesting: types_1.Nesting.selfClose,
    });
}
function makeLabelTokens(_a) {
    var inputID = _a.inputID, inputName = _a.inputName, labelText = _a.labelText, level = _a.level, radioClassName = _a.radioClassName, isCheckedByDefault = _a.isCheckedByDefault;
    return [
        makeRadioToken({
            level: level,
            attrs: {
                id: "label-".concat(inputID),
                name: "label-".concat(inputName),
                className: radioClassName,
                checked: isCheckedByDefault,
            },
        }),
        makeToken({
            type: 'label_item_open',
            tag: 'label',
            nesting: types_1.Nesting.open,
            level: level,
            attrs: [
                ['for', inputID],
                ['onclick', 'this.previousElementSibling.click()'],
            ],
        }),
        makeToken({
            type: 'text',
            tag: '',
            nesting: types_1.Nesting.selfClose,
            content: labelText,
            level: level + 1,
        }),
        makeToken({
            type: 'label_item_close',
            tag: 'label',
            level: level,
            nesting: types_1.Nesting.close,
        }),
    ];
}
