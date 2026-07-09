"use client";
import { useState } from "react";
import { create } from "../../services/carteiras.services";
import { useRouter } from "next/navigation";
import "./modalCarteira.css"

function ModalCarteira(){

    const [aberto, setAberto] = useState(false);
    const [nomeCarteira, setNomeCarteira] = useState("");
    const router = useRouter();

    async function criarCarteira() {

        if (nomeCarteira.trim() === "") {
            alert("Digite um nome para a carteira.");
            return;
        }

        try {

            await create({
                nome: nomeCarteira
            });

            setNomeCarteira("");
            setAberto(false);
            router.refresh();

        } catch (error) {
            console.error(error);
            alert("Erro ao criar carteira.");
        }
    }

    return(
        <>
            <button id="criarCarteira" onClick={() => setAberto(true)}>
                + Criar carteira
            </button>

            {aberto && (
                <div id="overlay" className="overlay">

                <div className="modal-carteira">

                    <div className="modal-header">

                        <h2>Criar carteira</h2>

                        <button
                            id="fecharModal"
                            className="btn-fechar"
                            onClick={() => setAberto(false)}
                        >
                            ✕
                        </button>


                    </div>

                    <div className="modal-body">

                        <label htmlFor="nomeCarteira">
                            Nome da carteira
                        </label>

                        <input
                            type="text"
                            id="nomeCarteira"
                            value={nomeCarteira}
                            onChange={(e) => setNomeCarteira(e.target.value)}
                            placeholder="Nome da carteira"
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            id="cancelar"
                            className="btn-cancelar"
                            onClick={() => setAberto(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            id="criar"
                            className="btn-criar"
                            onClick={() => criarCarteira()}
                        >
                            Criar carteira
                        </button>

                    </div>

                </div>

                </div>
            )}    
        </>
    );
}

export default ModalCarteira;