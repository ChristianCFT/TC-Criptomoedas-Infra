import { cookies } from "next/dist/server/request/cookies";
import Carteira from "../../../../screens/Carteira/Carteira";
import { buscarCarteiraPorId } from "../../../../services/carteiras.services";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
    
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const carteira = await buscarCarteiraPorId(Number(id), cookieHeader);

    return <Carteira carteira={carteira} />;
}