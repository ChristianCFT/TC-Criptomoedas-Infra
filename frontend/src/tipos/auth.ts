export interface CreateUserDTO {
    nome: string;
    email: string;
    senha: string;
}

export interface loginDTO{
    email: string;
    senha: string;
}

export interface loginResponse{
    token: string;
    user:{
        id: number;
        nome: string;
        email: string;
    }
}
