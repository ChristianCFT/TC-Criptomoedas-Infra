import { prisma } from "../prisma/client";


export class VisaoGeralService {
    
    async getDadosTelaInicial(usuarioId: number) {

        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId },
            include: {
                carteiras: {
                    include: {
                        ativos: {
                            include: {
                                cripto: true // Traz o precoAtual e simbolo da moeda
                            }
                        }
                    }
                }
            }
        });

        if (!usuario) {
        throw new Error("Usuário não encontrado");
    }


        let patrimonioGlobal = 0;

        const carteirasFormatadas = usuario.carteiras.map(carteira => {

            let saldoDestaCarteira = 0;

            carteira.ativos.forEach(ativo => {

                const valorDestaMoeda = ativo.quantidade * ativo.cripto.precoAtual;
                saldoDestaCarteira += valorDestaMoeda;
            });

            patrimonioGlobal += saldoDestaCarteira;

            return {
                id: carteira.id,
                nome: carteira.nome,
                saldoTotal: saldoDestaCarteira
           };

        });

        return {
            nome: usuario.nome,
            patrimonioTotal: patrimonioGlobal,
            quantidadeCarteiras: carteirasFormatadas.length,
            carteiras: carteirasFormatadas
        };

    }
}