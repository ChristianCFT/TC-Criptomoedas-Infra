import { DashboardDTO } from "../tipos/dashboard";

const API_URL =
    typeof window === "undefined"
        ? process.env.API_URL
        : process.env.NEXT_PUBLIC_API_URL;

export async function getDashboard(cookie?: string): Promise<DashboardDTO> {
    const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: {
            Cookie: cookie ?? "",
        },
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erro ao carregar os dados do dashboard.");
    
    return response.json();
}