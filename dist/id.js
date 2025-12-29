"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetID = resetID;
exports.getAndIncreaseID = getAndIncreaseID;
var id = 0;
function resetID() {
    id = 0;
}
function getAndIncreaseID() {
    id += 1;
    return id;
}
