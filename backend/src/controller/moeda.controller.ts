import { Request, Response } from "express";
import { MoedaService } from "../services/moeda.service";

const moedaService = new MoedaService();

export class MoedaController {
    async findAll(req: Request, res: Response) {
        try {
            const moedas = await moedaService.findAll();
            return res.status(200).json(moedas);
        } catch (error) {
            console.error("Erro ao buscar criptomoedas:", error);
            return res.status(500).json({ message: "Erro interno ao buscar as moedas globais." });
        }
    }
}