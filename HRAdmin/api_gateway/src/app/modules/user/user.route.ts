import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/get-users", userController.getUserController);
router.patch("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

export const userRoutes = router;
