import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const authController = new AuthController();

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/create", authController.create);
router.get("/me", authMiddleware, authController.me);

export {router as authRoutes};