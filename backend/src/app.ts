import express from "express";
import cors from "cors";
import { usuarioRoutes } from "./routes/usuario.routes";
import { carteiraRoutes } from "./routes/carteira.routes";
import { authRoutes } from "./routes/auth.routes";
import { visaoGeralRoutes } from "./routes/visaoGeral.routes";
import cookieParser from "cookie-parser";
import { compraRoutes } from "./routes/compra.routes";
import { vendaRoutes } from "./routes/venda.routes";
import { moedaRoutes } from "./routes/moeda.routes";



const app = express();

app.use(cors({
    origin: ["http://localhost:3000",
    "http://100.66.135.111"
    ],
    credentials: true,
}));
app.use(express.json());

app.use(cookieParser());
app.use("/usuarios",usuarioRoutes);
app.use("/carteiras",carteiraRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard",visaoGeralRoutes);
app.use("/compras",compraRoutes);
app.use("/vendas",vendaRoutes);
app.use("/moedas",moedaRoutes)

export { app };