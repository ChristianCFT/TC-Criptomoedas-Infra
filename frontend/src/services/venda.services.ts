import { VendaDTO } from "../tipos/venda";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function venderCriptomoeda(dados: VendaDTO): Promise<any> {
    const response = await fetch(`${API_URL}/vendas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao processar a venda.");
    }
    
    return response.json();
}