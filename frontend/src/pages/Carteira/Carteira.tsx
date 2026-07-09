"use client";
import React from 'react';
import moeda from "../../assets/images/moeda.jpg"
import carteiraIMG from "../../assets/images/carteira.jpg";
import TabelaAtivos from "../../components/TabelaAtivos/TabelaAtivos";
import "./carteira.css"
import { CarteiraDTO } from '../../tipos/carteira';
import { useRouter } from 'next/navigation';

interface CarteiraProps {
    carteira: CarteiraDTO;
}

function Carteira({ carteira }: CarteiraProps) {

    const router = useRouter();

    return (
        <>
            {/* Cabeçalho */}
            <header className="header-carteira">
                <h1>
                    <span>{carteira.nome}</span>
                </h1>
                <p>
                    Gerencie seus ativos e acompanhe seu desempenho
                </p>
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
                    <TabelaAtivos ativos={carteira.ativos} />
                    

                </section>

            </main>
        </>
    );
}

export default Carteira;