import { Request, Response } from "express";
import { CarteiraService } from "../services/carteira.service";
import { AuthPayload } from "../tipos/auth.payload";


const carteiraService = new CarteiraService;

export class CarteiraController{

    async create(req: Request, res: Response){

        const dados = req.body;
        const user = res.locals.user as AuthPayload;
        const carteira = await carteiraService.createCarteira(dados, user.id);
        
        res.status(201).json(carteira)
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            
            const user = res.locals.user as AuthPayload;

            const carteiraDetalhada = await carteiraService.findById(id, user.id);
            res.status(200).json(carteiraDetalhada);
        
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Erro ao buscar a carteira",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = res.locals.user as AuthPayload;

            await carteiraService.deleteCarteira(id, user.id);

            res.status(204).send();

        } catch (error) {
            res.status(404).json({ error: "Carteira não encontrada." });
        }
    }

}