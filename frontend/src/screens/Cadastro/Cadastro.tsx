"use client"
import logo from "../../assets/logos/logo-2.jpeg"
import "./cadastro.css"
import { cadastroSchema } from "../../schemas/cadastro.schema";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { create } from "../../services/auth.services";
import { refresh } from "next/cache";

function Cadastro(){
    const router = useRouter();
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) =>{
        
        e.preventDefault();

        //validar os campos do formulário
        const result = cadastroSchema.safeParse({
            nome,
            email, 
            senha, 
            confirmarSenha
        });

        //Se der ruim
        if(!result.success){
            toast.error(result.error.issues[0].message);
            return;
        }

        //mandar para o servidor
        try{
            await create({
                nome,
                email,
                senha
            });
            toast.success("Cadastro realizado com sucesso!");
            router.push("/");
            router.refresh();
        }catch(error){
            toast.error("Usuário ou senha inválidos");
        }
    }

    return(
        <main className="main-cadastro">
            <div className="layout-midia">
                <img src={logo.src} alt="LogoCT" />
            </div>

            <div className="layout-form">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>Cadastre-se</h2>
                    <div id="campos">

                        <div className="bloco-campo">
                            <label className="label-cadastro" htmlFor="nome">Nome Completo</label>
                            <input className="input-cadastro" type="text" name="nome" id="nome" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome Completo"/>
                        </div>

                        <div className="bloco-campo">
                            <label className="label-cadastro" htmlFor="email">E-mail</label>
                            <input className="input-cadastro" type="email" name="email" id="email"  
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            />
                        </div>

                        <div className="bloco-campo">
                            <label  className="label-cadastro" htmlFor="senha">Senha</label>
                            <input  className="input-cadastro" type="password" name="senha" id="senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"/>
                        </div>

                        <div className="bloco-campo">
                            <label  className="label-cadastro" htmlFor="confirmar-senha">Confirmar Senha</label>
                            <input  className="input-cadastro" type="password" name="confirmar-senha" id="confirmar-senha" 
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Confirmar Senha"/>
                        </div>

                    </div>
                    <p id="p-termos">Ao continuar, você concorda com os <a href="#">Termos de Uso</a> e <a href="">Política de Privacidade.</a></p>
                    <button type="submit" id="btn-add">Cadastrar</button>
                </form>
            </div>
        
        </main>
    );
}

export default Cadastro