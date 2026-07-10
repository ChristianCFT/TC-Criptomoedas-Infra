"use client"
import { useEffect, useState } from "react";
import SaldoConta from "../../components/SaldoConta/SaldoConta";
import TabelaMercadoCompra from "../../components/TabelaMercadoCompra/TabelaMercadoCompra";
import { buscarPerfil } from "../../services/usuario.services";
import { MoedaDTO } from "../../tipos/moeda";
import { buscarCarteiraPorId } from "../../services/carteiras.services";
import "./criptoativosCompra.css" 

interface CriptoativosProps{
    moedas: MoedaDTO[],
    carteiraId: number,
}

function CriptoativosCompra({ moedas, carteiraId }: CriptoativosProps) {
    const [saldoBrl, setSaldoBrl] = useState<number>(0);
    const [nomeCarteira,setNomeCarteira] = useState<string>("Carteira");

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const usuarioPerfil = await buscarPerfil(); 
                const carteiraDados = await buscarCarteiraPorId(Number(carteiraId));
                if (usuarioPerfil && carteiraDados) {

                    if (usuarioPerfil.saldoBrl !== undefined) {
                        setSaldoBrl(usuarioPerfil.saldoBrl);
                    }
                    if(carteiraDados.nome)
                        setNomeCarteira(carteiraDados.nome)
                }
            } catch (error) {
                console.error("Erro ao buscar o perfil:", error);
            }
        }
        carregarPerfil();
    }, []);

    return(
        <>
            <header className="header-criptoativos-compra">
                <div className="header-texto-compra">
                    <h1><span>{nomeCarteira}</span></h1>
                    <p>Faça a escolha do ativo que falta na sua carteira.</p>
                </div>
                <SaldoConta valor={saldoBrl}/>
            </header>
            

            <main className="main-criptoativos-compra">
                <div id="mercado-moeda-global-compra">
                    <TabelaMercadoCompra mercadoGlobalCompra={moedas} carteiraId={carteiraId}/>
                </div>
            </main>
        </>
    );
}

export default CriptoativosCompra;