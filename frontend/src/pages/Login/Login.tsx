"use client"
import logo from "../../assets/logos/logo-2.jpeg";
import "./login.css"
import { loginSchema } from "../../schemas/login.schema";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth.services";

function Login(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) =>{
        
        e.preventDefault();

        console.log("CLICOU NO BOTÃO");

        //validar os campos do formulário
        const result = loginSchema.safeParse({
            email, 
            senha,
        });

        //Se der ruim
        if(!result.success){
            toast.error(result.error.issues[0].message);
            return;
        }

        //mandar para o servidor
        try{
            await login({
                email,
                senha
            });
            toast.success("Login realizado com sucesso!");
            router.push("/inicio");
            router.refresh();
            
        }catch(error){
            toast.error("Usuário ou senha inválidos");
        }
    }

    return (
        <>
            <header className="header-login">
                <img id="logo-img" src={logo.src} alt="LogoCT" />
            </header>

            <main className="main-login">

                <form onSubmit={handleSubmit}>

                    <div className="container-principal" >

                        <div id="acessar">
                            <p>Acessar Conta</p>
                        </div>

                        <div className="inputs">
                            <label className="label-login" htmlFor="email">E-mail</label>
                            <input className="input-login" type="email" id="email" placeholder="E-mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="label-login" htmlFor="senha">Senha</label>
                            <input className="input-login" type="password" id="senha" placeholder="Senha" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                        <a id="esqueci-senha" href="#">Esqueci minha senha</a>

                        <button className="btn-login" type="submit" id="btn-acessar">ACESSAR CONTA</button>

                    </div>

                    <button id="cadastrar" type="button" onClick={() => router.push("/cadastro")}>CADASTRE-SE AGORA MESMO</button>

                </form>

            </main>
        </>
    );
}

export default Login;