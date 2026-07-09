import { MoedaDTO } from "../tipos/moeda";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listarMoedas(cookie?: string): Promise<MoedaDTO[]> {
    const response = await fetch(`${API_URL}/moedas`, {
        method: "GET",
        headers: {
            Cookie: cookie ?? "",
        },
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erro ao carregar o mercado de criptomoedas.");
    
    return response.json();
}