import LayoutGrid from "../../components/LayoutGrid/LayoutGrid";

export default function SiteLayout({ children }) {
    return (
        <LayoutGrid>
            {children}
        </LayoutGrid>
    );
}