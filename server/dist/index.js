"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const linkRoutes_1 = __importDefault(require("./routes/linkRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://web-links-khaki.vercel.app"],
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT || 3000;
const apiCheck = (req, res) => {
    res.json({
        message: "API is running",
    });
};
app.get("/", apiCheck);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/link", authMiddleware_1.protect, linkRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
