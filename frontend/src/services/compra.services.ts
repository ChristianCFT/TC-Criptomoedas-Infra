import { CompraDTO } from "../tipos/compra";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function comprarCriptomoeda(dados: CompraDTO): Promise<any> {
    const response = await fetch(`${API_URL}/compras`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao processar a compra.");
    }
    
    return response.json();
}