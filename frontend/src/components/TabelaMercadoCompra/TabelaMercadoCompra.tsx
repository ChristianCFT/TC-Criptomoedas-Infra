import { useState } from 'react';
import '../TabelaAtivos/tabelaAtivos.css';
import LinhaMercadoCompra from './LinhaMercadoCompra';
import ModalComprarMoeda from '../ModalComprarMoeda/ModalComprarMoeda';

export default function TabelaMercadoCompra({ mercadoGlobalCompra, carteiraId }) {

    const [modalAberto, setModalAberto] = useState(false);
    const [criptoSelecionada, setCriptoSelecionada] = useState(null);

    return (
        <section id="secao-tabela-ativos">
            <table id="tabela-ativos">
                
                <thead>
                    <tr>
                        <th>Criptomoeda</th>
                        <th>Preço Atual</th>
                        <th>Variação (24h)</th>
                        <th>Cap. de Mercado</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {mercadoGlobalCompra?.map((cripto) => (
                        <LinhaMercadoCompra 
                            key={cripto.id}
                            nome={cripto.nome}
                            sigla={cripto.simbolo}
                            preco={cripto.precoAtual}
                            variacao24h={cripto.variacao24h || 0} 
                            marketCap={cripto.marketCap || 0}
                            imagemUrl={cripto.imagemUrl}
                            abrirModal={() => {

                                setCriptoSelecionada(cripto);

                                setModalAberto(true);

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
        </section>
    );
}