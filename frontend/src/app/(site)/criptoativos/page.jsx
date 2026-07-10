import { cookies } from "next/headers";
import Criptoativos from "../../../screens/Criptoativos/Criptoativos";
import { listarMoedas } from "../../../services/moeda.services";

export default async function Page() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    console.log("Cookie Header: ", cookieHeader);

    const moedas = await listarMoedas(cookieHeader);

    console.log("moedas", moedas);

    return <Criptoativos moedas={moedas}/>;
}