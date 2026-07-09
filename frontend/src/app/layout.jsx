import "../styles/global.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "TC Criptomoedas",
  description: "Projeto de criptomoedas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}