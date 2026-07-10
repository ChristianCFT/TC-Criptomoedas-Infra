
import './linhaAtivo.css'

function LinhaAtivo({ imagem, nome, sigla, quantidade, preco, total, abrirModal, abrirModalVenda}) {
    return (
        <tr className="linha-ativo">
            <td className="coluna-cripto">
                <div className="ativo-cripto">
                    <img src={imagem} alt={nome} />
                    <div className="info-cripto">
                        <p className="p-nome-moeda">{nome}</p>
                        <p className="p-sigla-moeda">{sigla}</p>
                    </div>
                </div>
            </td>
            <td className="coluna-quantidade">{Number(quantidade).toFixed(4)}</td>
            <td className="coluna-preco">{Number(preco ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
            <td className="coluna-valor-total">{Number(total ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
            <td className="coluna-acoes">
                <div className="acoes-ativo">
                    <button className="btn-comprar" onClick={abrirModal}>Comprar</button>
                    <button className="btn-vender" onClick={abrirModalVenda}>Vender</button>
                </div>
            </td>
        </tr>
    );
}

export default LinhaAtivo