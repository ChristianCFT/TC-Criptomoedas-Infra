import "./tabelaMercado.css"
import LinhaMercado from './LinhaMercado';

export default function TabelaMercado({ mercadoGlobal }) {
    return (
        <section id="secao-tabela-ativos-mercado">
            <table id="tabela-ativos">
                
                <thead>
                    <tr>
                        <th>Criptomoeda</th>
                        <th>Preço Atual</th>
                        <th>Variação (24h)</th>
                        <th>Cap. de Mercado</th>
                    </tr>
                </thead>

                <tbody>
                    {mercadoGlobal?.map((cripto) => (
                        <LinhaMercado 
                            key={cripto.id}
                            nome={cripto.nome}
                            sigla={cripto.simbolo}
                            preco={cripto.precoAtual}
                            variacao24h={cripto.variacao24h || 0} 
                            marketCap={cripto.marketCap || 0}
                            imagemUrl={cripto.imagemUrl}
                        />
                    ))}
                </tbody>

            </table>
        </section>
    );
}