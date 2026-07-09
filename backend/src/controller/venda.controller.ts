import { Request, Response } from "express";
import { VendaService } from "../services/venda.service";
import { AuthPayload } from "../tipos/auth.payload";

const vendaService = new VendaService();

export class VendaController {
    async vender(req: Request, res: Response) {
        try {
            const { carteiraId, criptoId, quantidade } = req.body;
            
            const user = res.locals.user as AuthPayload;

            // Validação de segurança
            if (!carteiraId || !criptoId || !quantidade || quantidade <= 0) {
                return res.status(400).json({ message: "Dados inválidos. A quantidade deve ser maior que zero." });
            }

            const resultado = await vendaService.venderCripto(user.id,Number(carteiraId),Number(criptoId),Number(quantidade));

            return res.status(200).json({
                message: "Venda realizada com sucesso!",
                detalhes: resultado
            });

        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Erro interno ao tentar realizar a venda."
            });
        }
    }
}