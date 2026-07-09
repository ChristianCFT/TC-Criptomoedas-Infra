import { CarteiraDTO } from "./carteira";

export interface DashboardDTO {
    nome: string;
    patrimonioTotal: number;
    quantidadeCarteiras: number;
    carteiras: CarteiraDTO[];
}