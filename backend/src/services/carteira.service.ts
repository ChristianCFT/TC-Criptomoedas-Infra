import { prisma } from "../prisma/client";

export class CarteiraService {

    async createCarteira(dados: {nome: string}, usuarioId: number) {

        const carteira = await prisma.carteira.create({
            data: {
                ...dados,
                usuarioId,
            }
        });
        return carteira;

    }

    async findById(id: number, usuarioId: number) {
        const carteira = await prisma.carteira.findFirst({
        where: {
            id: id,
            usuarioId: usuarioId, 
        },
        include: {
            ativos: {
            include: {
                cripto: true, 
            },
            },
        },
        });

        if (!carteira) {
        throw new Error("Carteira não encontrada.");
        }

        let saldoTotal = 0;

        const ativosFormatados = carteira.ativos.map((ativo) => {
        const valorTotalAtivo = ativo.quantidade * ativo.cripto.precoAtual;
        
        saldoTotal += valorTotalAtivo;

        // Monta o objeto bonitinho
        return {
            id: ativo.cripto.id,
            nome: ativo.cripto.nome,
            simbolo: ativo.cripto.simbolo,
            imagemUrl: ativo.cripto.imagemUrl, 
            quantidade: ativo.quantidade,
            precoAtual: ativo.cripto.precoAtual,
            valorTotal: valorTotalAtivo,
        };
        });

        // Retorna o Pacote Completo
        return {
        id: carteira.id,
        nome: carteira.nome,
        saldoTotal: saldoTotal,
        quantidadeCriptos: carteira.ativos.length,
        ativos: ativosFormatados,
        };
    }

   // Encontre a sua função de deletar no service e substitua por esta lógica:

    async deleteCarteira(carteiraId: number, usuarioId: number) {
        const temMoeda = await prisma.carteiraCripto.findFirst({
            where: { carteiraId: carteiraId }
        });

        if (temMoeda) {
            throw new Error("CARTEIRA_NAO_VAZIA");
        }

        await prisma.carteira.delete({
            where: {
                id: carteiraId,
                usuarioId: usuarioId 
            }
        });
    }

}