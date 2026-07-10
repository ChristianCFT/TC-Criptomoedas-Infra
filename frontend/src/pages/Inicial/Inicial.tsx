import moeda from "../../assets/images/moeda.jpg";
import carteiraImg from "../../assets/images/carteira.jpg";
import ListaCarteiras from '../../components/ListaCarteiras/ListaCarteiras';
import "./inicial.css";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { me } from "../../services/auth.services";
import ModalCarteira from "../../components/ModalCarteira/ModalCarteira";
import { getDashboard } from "../../services/dashboard.services";
import { buscarPerfil } from "../../services/usuario.services";
import SaldoConta from "../../components/SaldoConta/SaldoConta";


async function Inicial(){

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if(!token){
        redirect("/");
    }

    const cookieHeader = cookieStore.toString();
    const dashboard = await getDashboard(cookieHeader);
    const usuario = await me(cookieHeader);
    const usuarioPerfil = await buscarPerfil(cookieHeader);
    const { saldoBrl } = usuarioPerfil;

    return (    
        <>
            <header className="header-inicial">
                <div className="header-texto">
                    <h1>
                        Olá, <span>{usuario.nome}</span>!
                    </h1>

                    <p>Bem-vindo de volta a TC Criptomoedas.</p>
                </div>
                <SaldoConta valor={saldoBrl}/>

            </header>

            <main className="main-inicial">
                <div className="area-informacoes">
                    <div id="patrimonio">
                        <img src={moeda.src} alt="Imagem Moeda" />
                        <div>
                            <p className="title">Patrimônio total</p>
                            <p className="valor"><span>{dashboard.patrimonioTotal.toLocaleString("pt-BR", {style: "currency",currency: "BRL"})}</span></p>
                        </div>
                    </div>

                    <div id="qtd-carteira">
                        <img src={carteiraImg.src} alt="Imagem Carteira" />
                        <div>
                            <p className="title">Carteiras</p>
                            <p className="valor">{dashboard.quantidadeCarteiras}</p>
                        </div>
                    </div>
                </div>

                <div className="area-carteiras">
                    <div className="criar-carteira">
                        <div>
                            <h2>Minhas carteiras</h2>
                            <p>Acesse e gerencie suas carteiras.</p>
                        </div>

                        <ModalCarteira />

                    </div>
                    
                    
                    <ListaCarteiras carteiras={dashboard.carteiras} />
                    
                </div> 
            </main> 
        </>
    );
}

export default Inicial;