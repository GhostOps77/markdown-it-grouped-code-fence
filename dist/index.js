"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupedCodeFencePlugin = groupedCodeFencePlugin;
var types_1 = require("./types");
var TokenCollector_1 = require("./TokenCollector");
var utils_1 = require("./utils");
function groupedCodeFence(config, state) {
    var tokenCollector = new TokenCollector_1.TokenCollector(config);
    var maxIndex = state.tokens.length - 1;
    var prevGroupScope = null;
    state.tokens.forEach(function (token, index) {
        var isEnd = index === maxIndex;
        var _a = (0, utils_1.filterTokenInfo)(token.info), currentGroupScope = _a.scope, title = _a.title;
        if (prevGroupScope === currentGroupScope) {
            var isInCurrentGroup = currentGroupScope !== null;
            if (isInCurrentGroup) {
                tokenCollector.addTokenIntoCurrentGroup(token, title, isEnd);
            }
            else {
                tokenCollector.addToken(token);
            }
        }
        else {
            var currentTokenIsNotGroup = currentGroupScope === null;
            if (currentTokenIsNotGroup) {
                tokenCollector.closeCurrentGroup(token.level);
                tokenCollector.addToken(token);
            }
            else {
                var prevGroupNeedToBeClosed = prevGroupScope !== null;
                tokenCollector.startNewGroup(token.level, prevGroupNeedToBeClosed);
                tokenCollector.addTokenIntoCurrentGroup(token, title, isEnd);
            }
        }
        prevGroupScope = currentGroupScope;
    });
    state.tokens = tokenCollector.getTokens();
}
function groupedCodeFencePlugin(config) {
    return function (md) {
        return md.core.ruler.push(types_1.RULE_NAME, groupedCodeFence.bind(null, config));
    };
}
