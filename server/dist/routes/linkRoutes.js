"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const linkController_1 = require("../controller/linkController");
router.post("/", linkController_1.saveLink);
router.post("/fetch", linkController_1.prefetchLink);
router.get("/", linkController_1.getLinks);
router.get("/:id", linkController_1.getLinkById);
router.delete("/:id", linkController_1.deleteLink);
exports.default = router;
