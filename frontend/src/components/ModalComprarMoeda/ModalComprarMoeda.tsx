"use client";

import { useState } from "react";
import "./modalComprarMoeda.css";
import { comprarCriptomoeda } from "../../services/compra.services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ModalComprarMoedaProps {
    fechar: () => void;
    cripto: any;
    carteiraId: number;
}

function ModalComprarMoeda({ fechar, cripto , carteiraId}: ModalComprarMoedaProps) {

    console.log("Carteira:", carteiraId);
    console.log("Cripto:", cripto);
    const [valor, setValor] = useState("");
    const router = useRouter();

    async function comprarMoeda() {
        
        if (valor.trim() === "") {
            toast.error("Digite o valor da compra.");
            return;
        }

        const valorConvertido = Number(valor);

        if (valorConvertido <= 0) {
            toast.error("O valor da compra deve ser maior que zero!");
            return;
        }

        try {
            await comprarCriptomoeda({
                carteiraId: carteiraId,
                criptoId: cripto.id,
                valorCompraBrl: valorConvertido
            });

            toast.success("Compra realizada com sucesso!");
            setValor("");
            fechar();
            router.refresh();

        } catch (error: any) {
            console.log("Aviso: Compra barrada pelo backend.", error.response?.data);
            const mensagemDoBackend = 
                error.response?.data?.message || 
                error.response?.data?.error || 
                error.message || 
                "Erro ao comprar moeda.";

            toast.error(mensagemDoBackend);
        }
    }

    return (
        <div className="overlay">

            <div className="modal-compra">

                <div className="modal-header">

                    <h2>Comprar {cripto?.nome}</h2>

                    <button
                        className="btn-fechar"
                        onClick={fechar}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <label htmlFor="valorCompra">
                        Valor da compra (R$)
                    </label>

                    <input
                        id="valorCompra"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="R$ "
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
                        onClick={comprarMoeda}
                    >
                        Comprar
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ModalComprarMoeda;