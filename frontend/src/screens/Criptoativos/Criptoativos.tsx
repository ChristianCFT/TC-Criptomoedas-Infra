"use client"
import "./criptoativos.css"
import TabelaMercado from "../../components/TabelaMercado/TabelaMercado";
import { MoedaDTO } from "../../tipos/moeda";
import SaldoConta from "../../components/SaldoConta/SaldoConta";
import { useEffect, useState } from "react";
import { buscarPerfil } from "../../services/usuario.services";

interface CriptoativosProps{
        moedas: MoedaDTO[],
    }

function Criptoativos({moedas}: CriptoativosProps) {

    const [saldoBrl, setSaldoBrl] = useState<number>(0);
    const [nomeUsuario, setNomeUsuario] = useState<string>("Investidor");

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const usuarioPerfil = await buscarPerfil(); 
                if (usuarioPerfil) {

                    if (usuarioPerfil.saldoBrl !== undefined) {
                        setSaldoBrl(usuarioPerfil.saldoBrl);
                        carregarPerfil();
                    }
                    if (usuarioPerfil.nome) {
                        setNomeUsuario(usuarioPerfil.nome);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar o perfil:", error);
            }
        }
        
        carregarPerfil();
    }, []);

    return(
        <>
            <header className="header-criptoativos">
                <div className="header-texto">
                    <h1>Olá, <span>{nomeUsuario}</span>!</h1>
                    <p>Acesse o mercado de criptomoedas e acompanhe as principais movimentações.</p>
                </div>
                <SaldoConta valor={saldoBrl}/>
            </header>

            <main className="main-criptoativos">
                <div id="mercado-moeda-global">
                    <TabelaMercado mercadoGlobal={moedas}/>
                </div>
            </main>
        </>
    );
}

export default Criptoativos;