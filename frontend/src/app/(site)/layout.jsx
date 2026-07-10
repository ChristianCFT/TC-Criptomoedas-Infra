import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LayoutGrid from "../../components/LayoutGrid/LayoutGrid";

export default async function SiteLayout({ children }) {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/");
    }
    
    return (
        <LayoutGrid>
            {children}
        </LayoutGrid>
    );
}