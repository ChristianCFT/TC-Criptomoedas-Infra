import "./saldoConta.css"

export default function SaldoConta({ valor }) {
    return (
        <div className="saldo-conta">
            <p className="saldo-label">Saldo da conta</p>
            <span className="saldo-valor">
                {valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </span>
        </div>
    );
}