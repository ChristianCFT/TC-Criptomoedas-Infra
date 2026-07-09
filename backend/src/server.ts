import { app } from "./app";
import { atualizarCriptomoedasNoBanco } from "./providers/apiMoedas";


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

    atualizarCriptomoedasNoBanco();

    //Tempo que que demora pra atualizar o banco de criptomoedas
    //const tempo = 10 * 60 * 1000;
    //setInterval(async () => {
    //    console.log("Iniciando atualização criptomoedas...");
    //    await atualizarCriptomoedasNoBanco();
    //}, tempo);
});

