import '../TabelaAtivos/linhaAtivo.css';

export default function LinhaMercadoCompra({ nome, sigla, preco, variacao24h, marketCap, imagemUrl, abrirModal }) {
    
    const corVariacao = variacao24h >= 0 ? "cor-positiva" : "cor-negativa";
    const sinal = variacao24h > 0 ? "+" : "";

    return (
        <tr className="linha-ativo">
            <td className="coluna-cripto">
                <div className="ativo-cripto">
                    <img src={imagemUrl} alt={`Logo ${nome}`} />
                    
                    <div className="info-cripto">
                        <p className="p-nome-moeda">{nome}</p>
                        <p className="p-sigla-moeda">{sigla}</p>
                    </div>
                </div>
            </td>
            
            <td className="coluna-preco">{Number(preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}</td>
            
            <td className={corVariacao}>
                {sinal}{Number(variacao24h).toFixed(2)}%
            </td>
            
            <td className="coluna-marketcap">
                {Number(marketCap).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </td>

            <td className="coluna-acoes">
                <button className="btn-comprar" onClick={abrirModal}>
                    Comprar
                </button>
            </td>
        </tr>
    );
}