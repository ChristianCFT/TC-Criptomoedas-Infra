import { prisma } from "../prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export class AuthService{
    async create(nome: string, email: string, senha: string){

        const isUserCreated = await prisma.usuario.findUnique({
            where:{
                email,
            }
        });

        if(isUserCreated)
        {
            throw new Error("Usuário já existente!");
        }

        const senhaHashed = await bcrypt.hash(senha,10);

        const dados = {
            nome,
            email,
            senha: senhaHashed
        }

        const user = await prisma.usuario.create({
            data: dados,
        });

        return {
            id: user.id,
            nome: user.nome,
            email:user.email
        }
    }

    async login(email: string, senha: string){

        const User = await prisma.usuario.findUnique({
            where:{
                email,
            }
        });

        if(!User)
        {
            throw new Error("Usuário ou senha inválido!");
        }

        const senhaMatch = await bcrypt.compare(senha, User.senha);

        if(!senhaMatch){
            throw new Error("Usuário ou senha inválido!")
        }

        const token = jwt.sign({
            id: User.id,
            nome: User.nome,
            email: User.email
        },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d"
            }
        );

        return {
            token,
            user: {
                id: User.id,
                nome: User.nome,
                email: User.email
            }
        }
    }
}