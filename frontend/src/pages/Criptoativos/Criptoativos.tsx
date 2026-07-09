import "./criptoativos.css"
import TabelaMercado from "../../components/TabelaMercado/TabelaMercado";
import { MoedaDTO } from "../../tipos/moeda";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { me } from "../../services/auth.services";

interface CriptoativosProps{
        moedas: MoedaDTO[],
    }

async function Criptoativos({moedas}: CriptoativosProps) {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    if(!token){
        redirect("/");
    }
    
    const cookieHeader = cookieStore.toString();
    const usuario = await me(cookieHeader);

    return(
        <>
            <header className="header-criptoativos">
                <h1>Olá, <span>{usuario.nome}</span>!</h1>
                <p>Acesse o mercado de criptomoedas e acompanhe as principais movimentações.</p>
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