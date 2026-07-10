import LinhaAtivo from './LinhaAtivo';
import './tabelaAtivos.css'
import { useState } from "react";
import ModalComprarMoeda from "../ModalComprarMoeda/ModalComprarMoeda";
import ModalVenderMoeda from '../ModalVenderMoeda/ModalVenderMoeda';

export default function TabelaAtivos({ativos, carteiraId}) {
    const [modalAberto, setModalAberto] = useState(false);
    const [criptoSelecionada, setCriptoSelecionada] = useState(null);

    const [modalVendaAberto, setModalVendaAberto] = useState(false);
    const [criptoSelecionadaVenda, setCriptoSelecionadaVenda] = useState(null);

    return (
        <section id="secao-tabela-ativos">
            <table id="tabela-ativos">
                <thead>
                    <tr>
                        <th>Criptomoeda</th>
                        <th>Quantidade</th>
                        <th>Preço Atual</th>
                        <th>Valor Total</th>
                        <th id="th-acoes">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* O map percorre a lista e cria uma LinhaAtivo para cada moeda */}
                    {ativos?.map((ativo) => (
                        <LinhaAtivo 
                            key={ativo.id}
                            nome={ativo.nome}
                            sigla={ativo.simbolo}
                            preco={ativo.precoAtual}
                            imagem={ativo.imagemUrl}
                            quantidade={ativo.quantidade}
                            total={ativo.valorTotal}
                            abrirModal={() => {
                                setCriptoSelecionada(ativo);
                                setModalAberto(true);
                            }}
                            abrirModalVenda={() => {
                                setCriptoSelecionadaVenda(ativo);
                                setModalVendaAberto(true);
                            }}
                        />
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <ModalComprarMoeda
                    fechar={() => setModalAberto(false)}
                    cripto={criptoSelecionada}
                    carteiraId={carteiraId}
                />
            )}    

            {modalVendaAberto && (
                <ModalVenderMoeda
                    fechar={() => setModalVendaAberto(false)}
                    cripto={criptoSelecionadaVenda}
                    carteiraId={carteiraId}
                />
            )}
        </section>
    );
}