import { Router } from "express";
import { CarteiraController } from "../controller/carteira.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

const carteiraController = new CarteiraController

router.use(authMiddleware)
router.post("/",carteiraController.create);
router.delete("/:id",carteiraController.delete);
router.get("/:id", carteiraController.findById);

export {router as carteiraRoutes}