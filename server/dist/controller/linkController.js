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
exports.deleteLink = exports.getLinkById = exports.getLinks = exports.prefetchLink = exports.saveLink = void 0;
const client_1 = require("@prisma/client");
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const extractDomain_1 = require("../utils/extractDomain");
const summarizeURL_1 = require("../utils/summarizeURL");
const getTag_1 = require("../utils/getTag");
const prisma = new client_1.PrismaClient();
const saveLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, title, image, domain, tags, summary } = req.body;
    if (!url || !title || !image || !domain || !tags || !summary) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    if (!req.userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const isExisting = yield prisma.link.findFirst({
            where: { url: url },
        });
        if (isExisting) {
            res.status(409).json({ message: "Link already saved/exists" });
            return;
        }
        const link = yield prisma.link.create({
            data: {
                url,
                title,
                image,
                domain,
                tags,
                summary,
                userId: req.userId,
            },
        });
        res.status(201).json(link);
    }
    catch (err) {
        console.error("Prisma createLink error:", err);
        res
            .status(500)
            .json({ error: "Failed to save link", details: (err === null || err === void 0 ? void 0 : err.message) || err });
    }
});
exports.saveLink = saveLink;
const prefetchLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: "URL is required" });
        return;
    }
    if (!req.userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const { result } = yield (0, open_graph_scraper_1.default)({ url });
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        const title = result.ogTitle || "Untitled";
        const image = Array.isArray(result.ogImage) && result.ogImage.length > 0
            ? result.ogImage[0].url
            : null;
        const domain = (0, extractDomain_1.extractDomain)(url);
        const tags = yield (0, getTag_1.getTags)(url);
        const summary = yield (0, summarizeURL_1.summarizeURL)(url);
        res.status(200).json({
            url,
            title,
            image,
            domain,
            tags,
            summary,
            userId: req.userId,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to prefetch link", details: error });
    }
});
exports.prefetchLink = prefetchLink;
const getLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const links = yield prisma.link.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(links);
    }
    catch (err) {
        console.error("Prisma getLinks error:", err);
        res.status(500).json({ error: "Failed to retrieve links", details: err });
    }
});
exports.getLinks = getLinks;
const getLinkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = yield prisma.link.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },
        });
        if (!link) {
            res.status(404).json({ error: "Link not found" });
            return;
        }
        res.json(link);
    }
    catch (err) {
        console.error("Prisma getLinkById error:", err);
        res.status(500).json({ error: "Failed to retrieve link", details: err });
    }
});
exports.getLinkById = getLinkById;
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.link.delete({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: "Link deleted successfully" });
    }
    catch (error) {
        console.error("Delete link error:", error);
        res.status(404).json({ error: "Link not found or already deleted" });
    }
});
exports.deleteLink = deleteLink;
