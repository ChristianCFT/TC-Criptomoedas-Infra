import { Router } from "express";
import { CompraController } from "../controller/compra.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const compraController = new CompraController();

router.use(authMiddleware);
router.post("/", compraController.comprar);

export { router as compraRoutes };