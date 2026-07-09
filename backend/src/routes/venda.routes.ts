import { Router } from "express";
import { VendaController } from "../controller/venda.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const vendaController = new VendaController();

router.use(authMiddleware);
router.post("/", vendaController.vender);

export { router as vendaRoutes };