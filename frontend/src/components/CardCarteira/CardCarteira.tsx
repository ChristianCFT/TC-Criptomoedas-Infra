"use client";
import React from 'react';
import './cardCarteira.css';
import CarteiraImg from "../../../src/assets/images/carteira.jpg";
import { useRouter } from 'next/navigation';
import { remove } from '../../services/carteiras.services';
import { toast } from 'sonner';

function CardCarteira({ id, titulo, saldo }) {

    const router = useRouter();

    async function excluirCarteira(e) {
    e.stopPropagation();

    try {
        await remove(id);

        toast.success("Carteira excluída com sucesso!");

        router.refresh();
    } catch (error) {
        toast.error("Erro ao excluir carteira.");
    }
}

    return (
        <div className="card-carteira">
            <div className="card-header">
                <div className='info-carteira'>
                    <img src={CarteiraImg.src} alt='Carteira' />
                    <h3 className="titulo-carteira">{titulo}</h3>
                </div>

                <div className='excluir-carteira'>
                    <button
                        className='btn-excluir-carteira'
                        onClick={excluirCarteira}
                    >
                        ×
                    </button>
                </div>

            </div>

            <div className="info-saldo">
                <p className="titulo-saldo">Saldo total</p>
                <p className="saldo">
                    <span className="valor-saldo">
                        {Number(saldo ?? 0).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </span>
                </p>
            </div>

            <button
                className="btn-ver-carteira"
                onClick={() => router.push(`/carteira/${id}`)}
            >
                Ver carteira
            </button>
        </div>
    );
};

export default CardCarteira;