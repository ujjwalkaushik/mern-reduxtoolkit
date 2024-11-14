import express from "express";
import {
  getUser,
  getDashboardStats,
  downloadUserStats,
  postImageUpload,
  getImage,
} from "../controllers/general.js";

const router = express.Router();

router.get("/users/stats", downloadUserStats);
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.post("/image-upload", postImageUpload);
router.get("/image/:userId", getImage);

export default router;
