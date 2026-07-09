import { prisma } from "../prisma/client";

export class MoedaService {
    async findAll() {
        const moedas = await prisma.criptomoeda.findMany();
        return moedas;
    }
}