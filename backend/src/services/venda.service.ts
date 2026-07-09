import { prisma } from "../prisma/client";

export class VendaService {
    async venderCripto(usuarioId: number, carteiraId: number, criptoId: number, quantidadeVenda: number) {
        //Verifica se a carteira existe e pertence ao usuário
        const carteira = await prisma.carteira.findFirst({
            where: { id: carteiraId, usuarioId }
        });
        
        if (!carteira) {
            throw new Error("Carteira não encontrada ou não pertence ao usuário.");
        }

        //Busca o ativo na carteira usando a restrição única e inclui o preço atual
        const ativo = await prisma.carteiraCripto.findUnique({
            where: {
                carteiraId_criptoId: { carteiraId, criptoId }
            },
            include: { cripto: true }
        });

        if (!ativo) {
            throw new Error("Você não possui esta criptomoeda nesta carteira.");
        }

        if (ativo.quantidade < quantidadeVenda) {
            throw new Error("Você não tem quantidade suficiente para realizar esta venda.");
        }

        //Calcula o valor em Reais que o usuário vai receber
        const valorRecebido = quantidadeVenda * ativo.cripto.precoAtual;

        //Executa a transação 
        return await prisma.$transaction(async (tx) => {
            //Adiciona o saldo em Reais na conta do usuário
            const usuarioAtualizado = await tx.usuario.update({
                where: { id: usuarioId },
                data: { saldoBrl: { increment: valorRecebido } }
            });

            //Se ele vender tudo, deletamos o registro para limpar a tela
            if (ativo.quantidade === quantidadeVenda) {
                await tx.carteiraCripto.delete({
                    where: { id: ativo.id }
                });
            } else {
                //Se sobrar moeda, apenas subtraímos a quantidade vendida
                await tx.carteiraCripto.update({
                    where: { id: ativo.id },
                    data: { quantidade: { decrement: quantidadeVenda } }
                });
            }

            return {
                saldoAtualizado: usuarioAtualizado.saldoBrl,
                valorDaVenda: valorRecebido
            };
        });
    }
}