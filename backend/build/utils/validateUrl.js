"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
function validateUrl(url) {
    const urlRegex = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    return urlRegex.test(url);
}
exports.validateUrl = validateUrl;
