import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) res.status(401).json({ error: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};
