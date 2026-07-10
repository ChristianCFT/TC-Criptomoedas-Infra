"use client";

import { useState } from "react";
import "./modalVenderMoeda.css";
import { venderCriptomoeda } from "../../services/venda.services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ModalVenderMoedaProps {
    fechar: () => void;
    cripto: any;
    carteiraId: number;
}

function ModalVenderMoeda({ fechar , cripto, carteiraId}: ModalVenderMoedaProps) {

    const [quantidade, setQuantidade] = useState("");
    const router = useRouter();

    function preencherMaximo() {
        if (cripto && cripto.quantidade) {
            setQuantidade(String(cripto.quantidade));
        }
    }

    async function venderMoeda() {
    
        if (quantidade.trim() === "") {
            toast.error("Digite a quantidade da moeda");
            return;
        }

        const quantidadeConvertida = Number(quantidade);

        if (quantidadeConvertida <= 0) {
            toast.error("A quantidade deve ser maior que zero!");
            return; 
        }

        try {
            await venderCriptomoeda({
                carteiraId: carteiraId,
                criptoId: cripto.id,
                quantidade: quantidadeConvertida
            });

            toast.success("Venda realizada com sucesso");
            setQuantidade("");
            fechar();
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Erro ao vender moeda");
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

                    <div className="input-group">
                        <input
                            id="quantidadeVenda"
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Quantidade"
                        />
                        
                        <button 
                            type="button" 
                            className="btn-maximo"
                            onClick={preencherMaximo}
                        >
                            Máximo
                        </button>
                    </div>

                    <span className="saldo-disponivel">
                        Saldo disponível: {cripto?.quantidade}
                    </span>
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