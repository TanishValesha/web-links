import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import linkRoutes from "./routes/linkRoutes";
import { protect } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://web-links-khaki.vercel.app"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

const apiCheck = (req: Request, res: Response) => {
  res.json({
    message: "API is running",
  });
};

app.get("/", apiCheck);

app.use("/api/auth", authRoutes);
app.use("/api/link", protect, linkRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
