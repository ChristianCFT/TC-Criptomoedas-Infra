import { prisma } from "../prisma/client";

// const IDS = [
//     "bitcoin",
//     "ethereum",
//     "tether",
//     "ripple",
//     "binancecoin",
//     "solana",
//     "usd-coin",
//     "dogecoin",
//     "cardano",
//     "tron",
//     "avalanche-2",
//     "chainlink",
//     "stellar",
//     "hedera-hashgraph",
//     "sui",
//     "shiba-inu",
//     "bitcoin-cash",
//     "litecoin",
//     "polkadot",
//     "uniswap",
//     "near",
//     "aptos",
//     "internet-computer",
//     "ethereum-classic",
//     "vechain",
//     "filecoin",
//     "algorand",
//     "cosmos",
//     "monero",
//     "arbitrum"
// ];

// const URL =`https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${IDS.join(",")}&sparkline=false`;

const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=1&sparkline=false"

export interface CoinGeckoCoin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;                  
}

// Função que busca os dados na API
async function buscarCriptomoedas(): Promise<CoinGeckoCoin[]> {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const moedas: CoinGeckoCoin[] = await response.json();
        return moedas;
    } catch (error) {
        console.error("Erro ao consultar CoinGecko:", error);
        throw error;
    }
}

// Função que pega os dados e salva no Banco de Dados
export async function atualizarCriptomoedasNoBanco() {
    try {
        console.log("Buscando cotações atualizadas na CoinGecko...");
        const moedas = await buscarCriptomoedas();

        console.log(`Encontradas ${moedas.length} moedas. Atualizando banco de dados...`);

        for (const moeda of moedas) {
            
            await prisma.criptomoeda.upsert({
                where: { 
                    simbolo: moeda.symbol.toUpperCase()
                },
                update: {
                    precoAtual: moeda.current_price,
                    imagemUrl: moeda.image,
                    variacao24h: moeda.price_change_percentage_24h || 0, 
                    marketCap: moeda.market_cap || 0                    
                },
                create: {
                    nome: moeda.name,
                    simbolo: moeda.symbol.toUpperCase(),
                    precoAtual: moeda.current_price,
                    imagemUrl: moeda.image,
                    variacao24h: moeda.price_change_percentage_24h || 0,
                    marketCap: moeda.market_cap || 0                    
                }
            });
        }

        console.log("Todas as criptomoedas foram sincronizadas com sucesso!");

    } catch (error) {
        console.error("Erro ao salvar criptomoedas no banco de dados:", error);
    }
}