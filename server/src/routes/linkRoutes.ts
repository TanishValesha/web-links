import express from "express";
const router = express.Router();
import {
  saveLink,
  getLinks,
  getLinkById,
  deleteLink,
  prefetchLink,
} from "../controller/linkController";

router.post("/", saveLink);
router.post("/fetch", prefetchLink);
router.get("/", getLinks);
router.get("/:id", getLinkById);
router.delete("/:id", deleteLink);

export default router;
