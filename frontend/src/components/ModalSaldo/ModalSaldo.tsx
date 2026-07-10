"use client";

import { useState } from "react";
import "./modalSaldo.css";
import boleto from "../../assets/images/boleto.png";
import cartao from "../../assets/images/cartao de credito.png";
import pix from "../../assets/images/pix.png";
import { adicionarSaldo } from "../../services/usuario.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function ModalSaldo({ fechar }) {

    const [valor, setValor] = useState("");
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const router = useRouter();

    async function adicionarSaldoUsuario() {

        if (valor.trim() === "") {
            toast.error("Digite um valor.");
            return;
        }

        if (metodoPagamento === "") {
            toast.error("Selecione um método de pagamento.");
            return;
        }

        await adicionarSaldo({
            saldo: Number(valor),
        });

        toast.success("Saldo adicionado com sucesso!");

        setValor("");
        setMetodoPagamento("");
        fechar();

        router.refresh();
    }

    return (
        <div className="overlay">

            <div className="modal-saldo">

                <div className="modal-header">

                    <h2>Adicionar saldo</h2>

                    <button
                        className="btn-fechar"
                        onClick={fechar}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <label>Valor</label>

                    <input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Digite o valor"
                    />

                    <label className="titulo-metodo">
                        Método de pagamento
                    </label>

                    <div className="metodos">

                        <label className="opcao">

                            <input
                                type="radio"
                                name="pagamento"
                                value="pix"
                                checked={metodoPagamento === "pix"}
                                onChange={(e) => setMetodoPagamento(e.target.value)}
                            />

                            <img src={pix.src} alt="PIX" className="icone-pagamento"/>

                            <span>PIX</span>

                        </label>

                        <label className="opcao">

                            <input
                                type="radio"
                                name="pagamento"
                                value="cartao"
                                checked={metodoPagamento === "cartao"}
                                onChange={(e) => setMetodoPagamento(e.target.value)}
                            />

                            <img src={cartao.src} alt="Cartão" className="icone-pagamento"/>

                            <span>Cartão de Crédito</span>

                        </label>

                        <label className="opcao">

                            <input
                                type="radio"
                                name="pagamento"
                                value="boleto"
                                checked={metodoPagamento === "boleto"}
                                onChange={(e) => setMetodoPagamento(e.target.value)}
                            />

                            <img src={boleto.src} alt="Boleto" className="icone-pagamento"/>

                            <span>Boleto Bancário</span>

                        </label>

                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        className="btn-cancelar"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-adicionar"
                        onClick={adicionarSaldoUsuario}
                    >
                        Adicionar saldo
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ModalSaldo;