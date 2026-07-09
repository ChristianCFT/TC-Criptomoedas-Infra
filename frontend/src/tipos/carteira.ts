export interface CreateCarteiraDTO {
    nome: string;
}

export interface AtivoCriptoDTO {
    nome: string;
    simbolo: string;
    imagemUrl: string;
    precoAtual: number;
}

export interface AtivoDTO {
    id: number;
    criptoId: number;
    quantidade: number;
    cripto: AtivoCriptoDTO;
}

export interface CarteiraDTO {
    id: number;
    nome: string;
    saldoTotal: number;
    quantidade: number;
    usuarioId: number;
    ativos?: AtivoDTO[];
}

