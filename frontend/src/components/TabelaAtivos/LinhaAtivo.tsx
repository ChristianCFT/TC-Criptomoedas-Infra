
import './linhaAtivo.css'

function LinhaAtivo({ imagem, nome, sigla, quantidade, preco, total }) {
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
            <td className="coluna-preco">R$ {Number(preco).toFixed(2)}</td>
            <td className="coluna-valor-total">R$ {Number(total).toFixed(2)}</td>
            <td className="coluna-acoes">
                <div className="acoes-ativo">
                    <button className="btn-comprar">Comprar</button>
                    <button className="btn-vender">Vender</button>
                </div>
            </td>
        </tr>
    );
}

export default LinhaAtivo