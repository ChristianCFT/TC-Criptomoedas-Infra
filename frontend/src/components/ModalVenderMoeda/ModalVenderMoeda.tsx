"use client";

import { useState } from "react";
import "./modalVenderMoeda.css";
import { venderCriptomoeda } from "../../services/venda.services";
import { useRouter } from "next/navigation";

interface ModalVenderMoedaProps {
    fechar: () => void;
    cripto: any,
    carteiraId: number,
}

function ModalVenderMoeda({ fechar , cripto, carteiraId}: ModalVenderMoedaProps) {

    const [quantidade, setQuantidade] = useState("");
    const router = useRouter();

    async function venderMoeda() {

        if (quantidade.trim() === "") {
            alert("Digite a quantidade da moeda.");
            return;
        }

        try {

            await venderCriptomoeda({
                carteiraId: carteiraId,
                criptoId: cripto.id,
                quantidade: Number(quantidade)
            });

            setQuantidade("");
            fechar();
            router.refresh();

        } catch (error) {

            console.error(error);
            alert("Erro ao vender moeda.");

        }

    }

    return (
        <div className="overlay">

            <div className="modal-venda">

                <div className="modal-header">

                    <h2>Vender {cripto?.nome}</h2>

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