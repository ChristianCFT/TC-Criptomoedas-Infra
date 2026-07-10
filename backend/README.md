# Backend - TC Criptomoedas

## Configuração

### 1. Criar o arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` e adicione:

```env id="0p6qjp"
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=sua_chave_secreta
PORT=3001
```

### 2. Gerar a chave JWT

A variável `JWT_SECRET` é utilizada para assinar e validar os tokens de autenticação.

Uma forma simples de gerar uma chave aleatória de **64 caracteres** é executar o seguinte comando no terminal:

```bash id="kjf86n"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

O comando irá gerar uma chave hexadecimal com **64 caracteres**. Copie o valor gerado e substitua `sua_chave_secreta` no arquivo `.env`:

```env id="rrlbha"
JWT_SECRET=cole_aqui_a_chave_de_64_caracteres
```

## Instalação

Instale as dependências:

```bash id="wkcpxd"
npm install
```

## Banco de Dados

Gere o Prisma Client:

```bash id="u0s0e4"
npx prisma generate
```

Crie o banco de dados e sincronize o schema do Prisma:

```bash id="5r0t0e"
npx prisma db push
```

Caso queira visualizar o banco de dados pelo Prisma Studio:

```bash id="1jwsrn"
npx prisma studio
```

## Execução

Inicie o servidor de desenvolvimento:

```bash id="2cx93m"
npm run dev
```

O servidor estará disponível em:

```id="v2ikzw"
http://localhost:3001
```
