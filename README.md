# 🚀 TC Criptomoedas - Infraestrutura

Repositório responsável pela infraestrutura da aplicação **TC Criptomoedas**, contendo as configurações necessárias para executar o sistema em um servidor Linux.

---

# 👥 Desenvolvedores

* **Christian Ferreira Toledo**
* **Thiago Santos Fonseca Amaral**

> Trabalho desenvolvido para a disciplina de **Programação Web**.
---
## 🌐 Aplicação Online

**Frontend:** https://eyes-default-thou-stats.trycloudflare.com
---

# 📖 Sobre o Projeto

Este repositório reúne a infraestrutura utilizada para hospedar o sistema **TC Criptomoedas**.

Atualmente, a aplicação é executada em um **Ubuntu Server**, onde o frontend e o backend são iniciados diretamente no servidor. O **Nginx** atua como proxy reverso, direcionando as requisições para cada serviço da aplicação.

Para permitir o acesso externo de forma segura, sem a necessidade de abrir portas no roteador, foi utilizado o **Cloudflare Quick Tunnel**, estabelecendo um túnel entre o servidor e a internet.

---

# 🛠️ Tecnologias Utilizadas

* Ubuntu Server
* Nginx
* Cloudflare Quick Tunnel
* Node.js
* Next.js

---

# 🏗️ Arquitetura

A infraestrutura segue a arquitetura abaixo:

```text
                           Usuário
                              │
                              ▼
                   Cloudflare Quick Tunnel
                              │
                              ▼
                    Ubuntu Server (Linux)
                              │
                              ▼
                    Nginx (Proxy Reverso)
                     ┌────────┴────────┐
                     ▼                 ▼
            Frontend (Next.js)   Backend (Node.js)

-------------------------------------------------------------

                       Desenvolvedores
                              │
                              ▼
                        Tailscale VPN
                              │
                              ▼
                  Acesso remoto ao Ubuntu Server
```

---

# 🌐 Proxy Reverso

O **Nginx** é responsável por:

* Direcionar as requisições para o frontend.
* Encaminhar as chamadas da API para o backend.
* Centralizar o acesso à aplicação.
* Facilitar futuras implantações em produção.

---

# ☁️ Cloudflare Quick Tunnel

O acesso externo à aplicação é realizado utilizando o **Cloudflare Quick Tunnel**, que permite:

* Disponibilizar a aplicação na internet sem abrir portas no roteador.
* Criar uma conexão segura entre o servidor e a Cloudflare.
* Facilitar demonstrações e testes remotos.

---

# ▶️ Execução

Para iniciar o backend:

```bash
npm run dev
```

Para iniciar o frontend:

```bash
npm run dev
```

Após iniciar ambos os serviços, o acesso externo pode ser disponibilizado através do **Cloudflare Quick Tunnel**, enquanto o **Nginx** gerencia o encaminhamento das requisições.

---

# 🎯 Objetivos

Esta infraestrutura foi desenvolvida com os seguintes objetivos:

* Hospedar a aplicação em um servidor Linux.
* Centralizar o acesso utilizando Nginx.
* Permitir acesso remoto de forma segura.
* Facilitar a implantação e manutenção do ambiente.
* Servir como base para futuras evoluções da infraestrutura.

---

# 🚀 Próximas Evoluções

Como evolução da infraestrutura, estão previstos:

* Containerização da aplicação utilizando Docker.
* Orquestração dos serviços com Docker Compose.
* Automatização do processo de implantação.
* Utilização de domínio personalizado.
* Configuração de HTTPS em ambiente de produção.

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos como parte da disciplina de **Programação Web**.
