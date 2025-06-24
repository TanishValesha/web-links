import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  checkStatus,
} from "../controller/authController";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", checkStatus);

export default router;
