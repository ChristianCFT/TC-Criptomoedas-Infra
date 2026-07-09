import LinhaAtivo from './LinhaAtivo';
import './tabelaAtivos.css'

export default function TabelaAtivos({ativos}) {
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
                        />
                    ))}
                </tbody>
            </table>
        </section>
    );
}