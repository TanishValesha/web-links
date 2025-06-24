import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ogs from "open-graph-scraper";
import { extractDomain } from "../utils/extractDomain";
import { summarizeURL } from "../utils/summarizeURL";
import { getTags } from "../utils/getTag";
import { AuthRequest } from "../types/types";

const prisma = new PrismaClient();

export const saveLink = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
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
    const isExisting = await prisma.link.findFirst({
      where: { url: url },
    });

    if (isExisting) {
      res.status(409).json({ message: "Link already saved/exists" });
      return;
    }

    const link = await prisma.link.create({
      data: {
        url,
        title,
        image,
        domain,
        tags,
        summary,
        userId: req.userId!,
      },
    });

    res.status(201).json(link);
  } catch (err: any) {
    console.error("Prisma createLink error:", err);
    res
      .status(500)
      .json({ error: "Failed to save link", details: err?.message || err });
  }
};

export const prefetchLink = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
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
    const { result } = await ogs({ url });
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    const title = result.ogTitle || "Untitled";
    const image =
      Array.isArray(result.ogImage) && result.ogImage.length > 0
        ? result.ogImage[0].url
        : null;
    const domain = extractDomain(url);
    const tags = await getTags(url);
    const summary = await summarizeURL(url);

    res.status(200).json({
      url,
      title,
      image,
      domain,
      tags,
      summary,
      userId: req.userId!,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to prefetch link", details: error });
  }
};

export const getLinks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const links = await prisma.link.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(links);
  } catch (err) {
    console.error("Prisma getLinks error:", err);
    res.status(500).json({ error: "Failed to retrieve links", details: err });
  }
};

export const getLinkById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const link = await prisma.link.findFirst({
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
  } catch (err) {
    console.error("Prisma getLinkById error:", err);
    res.status(500).json({ error: "Failed to retrieve link", details: err });
  }
};

export const deleteLink = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    await prisma.link.delete({
      where: { id: req.params.id },
    });
    res.status(204).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Delete link error:", error);
    res.status(404).json({ error: "Link not found or already deleted" });
  }
};
