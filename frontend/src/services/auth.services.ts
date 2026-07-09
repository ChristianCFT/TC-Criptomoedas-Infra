import { CreateUserDTO, loginDTO, loginResponse } from "../tipos/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function create(dados: CreateUserDTO): Promise<void> {

    const response = await fetch(`${API_URL}/auth/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
    });

    if(!response.ok){
        throw new Error("Erro ao criar usuário");
    }
}

export async function login(dados: loginDTO) : Promise<loginResponse>{

    const response = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if(!response.ok){
        throw new Error("Erro ao logar com o usuário");
    }

    return response.json();
}

export async function logout() : Promise<void>{

    const response = await fetch (`${API_URL}/auth/logout`,{
        method: "POST",
        credentials: "include",
    }); 

    if(!response.ok){
        throw new Error("Erro ao fazer logout do usuário");
    }

};

export async function me(cookieHeader: string) {

    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Cookie: cookieHeader,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
    }

    return response.json();
}