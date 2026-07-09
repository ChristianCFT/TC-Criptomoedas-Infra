import { Request, Response } from "express";
import { VisaoGeralService } from "../services/visaoGeral.service";

const visaoGeralService = new VisaoGeralService;


export class VisaoGeralController{

    async getVisaoGeral(req: Request, res: Response){
        try {
            // Pegamos o ID do usuário que o seu auth.middleware colocou no res.locals
            const userId = res.locals.user.id; 
            
            const dados = await visaoGeralService.getDadosTelaInicial(userId);
            
            res.status(200).json(dados);
            
        } catch (error) {
            res.status(500).json({ error: "Erro ao carregar Dados" });
        }

    }
}