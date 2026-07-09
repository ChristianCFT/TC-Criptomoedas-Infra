"use client";

import { useState } from "react";
import "./modalVenderMoeda.css";

interface ModalVenderMoedaProps {
    fechar: () => void;
}

function ModalVenderMoeda({ fechar }: ModalVenderMoedaProps) {

    const [quantidade, setQuantidade] = useState("");

    async function venderMoeda() {

        if (quantidade.trim() === "") {
            alert("Digite a quantidade da moeda.");
            return;
        }

        try {

            // Aqui ficará a chamada da API
            console.log("Vender moeda:", quantidade);

            setQuantidade("");
            fechar();

        } catch (error) {

            console.error(error);
            alert("Erro ao vender moeda.");

        }

    }

    return (
        <div className="overlay">

            <div className="modal-venda">

                <div className="modal-header">

                    <h2>Vender moeda</h2>

                    <button
                        className="btn-fechar"
                        onClick={fechar}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <label htmlFor="quantidadeVenda">
                        Quantidade da moeda
                    </label>

                    <input
                        id="quantidadeVenda"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        placeholder="Quantidade"
                    />

                </div>

                <div className="modal-footer">

                    <button
                        className="btn-cancelar"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-confirmar"
                        onClick={venderMoeda}
                    >
                        Vender
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ModalVenderMoeda;