import { Router } from "express";
import { UsuarioController } from "../controller/usuario.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

const usuarioController = new UsuarioController;

router.use(authMiddleware)
router.get("/perfil",usuarioController.findPerfil);
router.post("/saldo",usuarioController.adicionarSaldo)

export {router as usuarioRoutes}