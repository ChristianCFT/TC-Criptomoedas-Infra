import { Router } from "express";
import { MoedaController } from "../controller/moeda.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const moedaController = new MoedaController();

router.use(authMiddleware);
router.get("/", moedaController.findAll);

export { router as moedaRoutes };