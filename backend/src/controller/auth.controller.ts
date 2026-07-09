import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {

    async create(req: Request, res: Response){
        try{
            const { nome, email, senha } = req.body;
            const user = await authService.create(nome, email, senha)
            res.json(user);
        } catch(error){
            res.status(400).json({
                message: 
                error instanceof Error
                ? error.message
                : "Erro ao criar usuário!"
            })
        }
    }

    async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const resposta = await authService.login(email, senha);
            res.cookie("token", resposta.token,{
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })

            res.json({
                sucess:true,
                message: "login realizado com sucesso!"
            })


        } catch(error){
            res.status(400).json({
                message: 
                error instanceof Error
                ? error.message
                : "Erro ao criar usuário!"
            })
        }
    }

    async logout(req: Request, res: Response){
        res.clearCookie("token");
        res.json({
            sucess:true,
            message: "logout realizado com sucesso!"
        })
    }

    async me(req: Request, res: Response) {
        res.json(res.locals.user);
    }
}