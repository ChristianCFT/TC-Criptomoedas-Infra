import "../../../styles/global.css";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Inicial from "../../../pages/Inicial/Inicial";
import { me } from "../../../services/auth.services";
import { getDashboard } from "../../../services/dashboard.services";
import { buscarPerfil } from "../../../services/usuario.services";

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/");
    }

    const cookieHeader = cookieStore.toString();

    const dashboard = await getDashboard(cookieHeader);
    const usuario = await me(cookieHeader);
    const usuarioPerfil = await buscarPerfil(cookieHeader);

    return (
        <Inicial
            dashboard={dashboard}
            usuario={usuario}
            saldoBrl={usuarioPerfil.saldoBrl}
        />
    );
}