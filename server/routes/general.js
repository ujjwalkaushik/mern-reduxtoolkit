import express from "express";
import { getUser, getDashboardStats, downloadUserStats } from "../controllers/general.js";

const router = express.Router();


router.get("/users/stats", downloadUserStats)
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;