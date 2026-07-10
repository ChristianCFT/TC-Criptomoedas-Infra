import { cookies } from "next/headers";
import CriptoativosCompra from "../../../../screens/CriptoativosCompra/CriptoativosCompra";
import { listarMoedas } from "../../../../services/moeda.services";

export default async function Page({ searchParams }) {

    const params = await searchParams;
    const carteiraId = Number(params.carteiraId);

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const moedas = await listarMoedas(cookieHeader);

    return (
        <CriptoativosCompra
            moedas={moedas}
            carteiraId={carteiraId}
        />
    );
}