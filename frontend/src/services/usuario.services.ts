import { SaldoDTO, UsuarioDTO } from "../tipos/usuario";

const API_URL =
    typeof window === "undefined"
        ? process.env.API_URL
        : process.env.NEXT_PUBLIC_API_URL;

export async function buscarPerfil(cookie?: string): Promise<UsuarioDTO> {
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
        method: "GET",
        headers: {
            Cookie: cookie ?? "",
        },
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erro ao carregar os dados do usuário.");
    
    return response.json();
}

export async function adicionarSaldo(dados: SaldoDTO): Promise<any> {
    const response = await fetch(`${API_URL}/usuarios/saldo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao adicionar saldo.");
    }
    
    return response.json();
}