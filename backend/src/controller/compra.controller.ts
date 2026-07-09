import { Request, Response } from "express";
import { CompraService } from "../services/compra.service";
import { AuthPayload } from "../tipos/auth.payload";

const compraService = new CompraService();

export class CompraController {
  async comprar(req: Request, res: Response) {
    try {
      const { carteiraId, criptoId, valorCompraBrl } = req.body;
      const user = res.locals.user as AuthPayload;

      // Validação básica de segurança
      if (!carteiraId || !criptoId || !valorCompraBrl || valorCompraBrl <= 0) {
        return res.status(400).json({ message: "Dados inválidos para a compra." });
      }

      const ativoAtualizado = await compraService.comprarCripto(user.id,Number(carteiraId),Number(criptoId),Number(valorCompraBrl));

      res.status(200).json({
        message: "Compra realizada com sucesso!",
        ativo: ativoAtualizado
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao realizar compra." });
    }
  }
}