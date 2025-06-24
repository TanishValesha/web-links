"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controller/authController");
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.loginUser);
router.get("/logout", authController_1.logoutUser);
router.get("/me", authController_1.checkStatus);
exports.default = router;
