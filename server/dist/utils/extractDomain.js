"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDomain = extractDomain;
function extractDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    }
    catch (_a) {
        return "unknown";
    }
}
