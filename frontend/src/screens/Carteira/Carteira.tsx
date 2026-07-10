"use client";
import { useState, useEffect } from 'react';
import moeda from "../../assets/images/moeda.jpg"
import carteiraIMG from "../../assets/images/carteira.jpg";
import TabelaAtivos from "../../components/TabelaAtivos/TabelaAtivos";
import "./carteira.css"
import { CarteiraDTO } from '../../tipos/carteira';
import { useRouter } from 'next/navigation';
import { buscarPerfil } from '../../services/usuario.services';
import SaldoConta from '../../components/SaldoConta/SaldoConta';

interface CarteiraProps {
    carteira: CarteiraDTO;
}

function Carteira({ carteira }: CarteiraProps) {

    console.log("Carteira recebida:", carteira);

    if (!carteira) {
        throw new Error("Carteira é undefined");
    }

    const router = useRouter();
    const [saldoBrl, setSaldoBrl] = useState<number>(0);

    useEffect(() => {
        async function carregarSaldo() {
            try {
                const usuarioPerfil = await buscarPerfil(); 
                if (usuarioPerfil && usuarioPerfil.saldoBrl !== undefined) {
                    setSaldoBrl(usuarioPerfil.saldoBrl);
                    carregarSaldo();
                }
            } catch (error) {
                console.error("Erro ao buscar o saldo do perfil:", error);
            }
        }
        
        carregarSaldo();
    }, []);

    return (
        <>
            {/* Cabeçalho */}
            <header className="header-carteira">
                <div className="header-texto">
                    <h1>
                        <span>{carteira.nome}</span>
                    </h1>
                    <p>Gerencie seus ativos e acompanhe seu desempenho</p>
                </div>
                <SaldoConta valor={saldoBrl}/>
            </header>

            {/* Principal */}
            <main className="main-carteira">

                {/* Resumo */}
                <section id="resumo-carteira">

                    <div className="card-resumo">
                        <img 
                            src={moeda.src} 
                            alt="Moeda" 
                        />
                        <div>
                            <h3 className="title-card-resumo">
                                SALDO TOTAL DA CARTEIRA
                            </h3>
                            <p className="valor-card-resumo">
                                <span>{Number(carteira.saldoTotal ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>
                            </p>
                        </div>
                    </div>

                    <div className="card-resumo">
                        <img 
                            src={carteiraIMG.src} 
                            alt="Carteira" 
                        />
                        <div>
                            <h3 className="title-card-resumo">
                                QUANTIDADE DE CRIPTOMOEDAS
                            </h3>

                            <p className="valor-card-resumo">
                                <span>{carteira.ativos?.length || 0}</span>
                            </p>
                            <p id="p-dif">
                                Ativos diferentes
                            </p>
                        </div>
                    </div>

                </section>

                {/* Ativos */}
                <section id="ativos">

                    {/* Cabeçalho ativos */}
                    <section id="cabecalho-ativos">
                        <div className="conteudo-cabecalho">
                            <h2>
                                Seus Ativos
                            </h2>
                            <p>
                                Veja suas criptomoedas e gerencie suas posições
                            </p>
                        </div>

                        <div className="acoes-cabecalho">
                            <button 
                                id="btn-comprar-cripto" 
                                onClick={() => router.push(`/criptoativos/comprar?carteiraId=${carteira.id}`)}
                            >
                                Comprar Criptomoeda
                            </button>
                        </div>
                    </section>

                    {/* Tabela */}
                    <TabelaAtivos ativos={carteira.ativos} carteiraId={carteira.id}/>
                    

                </section>

            </main>
        </>
    );
}

export default Carteira;