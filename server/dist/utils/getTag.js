"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
const getTags = (url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const prompt = `Categorize the following webpage: ${url}
into {IMAGE, VIDEO, NEWS, BLOG, MUSIC, SOCIAL_MEDIA_POST}
- Return a JSON array of tags that best describe the content of the page.
- Only respond with a raw JSON array like ["BLOG", "NEWS"]
- Include extra tags if they are relevant, but do not include irrelevant tags.
- Highy recommend using more tags than specified
`;
        const response = yield groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
        });
        const content = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "[]";
        try {
            const tags = JSON.parse(content);
            if (Array.isArray(tags))
                return tags;
        }
        catch (err) {
            console.warn("AI response wasn't valid JSON:", content);
        }
        return ["BLOG"]; // fallback default
    }
    catch (error) {
        console.error("Error getting tags:", error);
        return ["BLOG"]; // fallback default
    }
});
exports.getTags = getTags;
