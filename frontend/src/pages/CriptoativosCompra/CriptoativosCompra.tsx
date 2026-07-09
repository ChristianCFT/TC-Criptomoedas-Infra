"use client"

import TabelaMercadoCompra from "../../components/TabelaMercadoCompra/TabelaMercadoCompra";
import { MoedaDTO } from "../../tipos/moeda";
import "../Criptoativos/criptoativos.css"

interface CriptoativosProps{
    moedas: MoedaDTO[],
    carteiraId: number,
}

function CriptoativosCompra({ moedas, carteiraId }: CriptoativosProps) {

    
    return(
        <>
            <header className="header-criptoativos">
                <h1>Olá, <span>Usuário</span>!</h1>
                <p>Faça a escolha do ativo que falta na sua carteira.</p>
            </header>

            <main className="main-criptoativos">
                <div id="mercado-moeda-global">
                    <TabelaMercadoCompra mercadoGlobalCompra={moedas} carteiraId={carteiraId}/>
                </div>
            </main>
        </>
    );
}

export default CriptoativosCompra;