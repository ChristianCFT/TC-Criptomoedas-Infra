import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { AuthPayload } from "../tipos/auth.payload";

const usuarioService = new UsuarioService()

export class UsuarioController{
    
    async findPerfil(req: Request, res: Response) {
        try {
            const user = res.locals.user as AuthPayload; 
            const usuario = await usuarioService.findUsuarioById(user.id);

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const { senha, ...dadosSeguros } = usuario;

            res.status(200).json(dadosSeguros);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar perfil do usuário." });
        }
    }
    
    async adicionarSaldo(req: Request, res: Response) {
        try {
            const { saldo } = req.body; 
            const valor = Number(saldo);
            const user = res.locals.user as AuthPayload; 

            if (!valor || valor <= 0) {
                return res.status(400).json({ message: "O valor deve ser maior que zero." });
            }

            const usuario = await usuarioService.adicionarSaldo(user.id, valor);

            res.status(200).json({
                message: "Saldo adicionado com sucesso!",
                saldoAtual: usuario.saldoBrl
            });

        } catch (error) {
            console.error("ERRO DETALHADO AO ADICIONAR SALDO:", error);
            res.status(500).json({ message: "Erro ao adicionar saldo." });
        }
    }
}
