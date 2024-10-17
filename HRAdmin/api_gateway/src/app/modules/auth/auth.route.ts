import express from "express";
import { authController } from "./auth.controller";
const router = express.Router();

router.post("/create-user", authController.createUser);
router.post("/login", authController.longInUser);
router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;
