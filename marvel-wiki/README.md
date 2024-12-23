# How to Run - Marvel API Project

## Configuração das Chaves da API Marvel

Para que o projeto funcione corretamente, você precisa configurar as chaves da API da Marvel. Siga as instruções abaixo:

1. Acesse o site da [Marvel Developer](https://developer.marvel.com/).
2. Crie uma conta ou faça login.
3. Na seção "My Developer Account", você encontrará duas chaves: **Public Key** e **Private Key**.
4. Vá até o arquivo `/services/marvelApi.js`.

> Substitua `publicKey` e `privateKey` pelas suas chaves reais.

---

## Rodando o Projeto Localmente

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone o repositório do projeto:

```
git clone https://github.com/f360-dev/contabil-frontend-jr-teste.git
```

3. Acesse a pasta do projeto:

```
cd marvel-wiki
```

4. Instale as dependências:

```
npm install
```

5. Execute o projeto em modo de desenvolvimento:

```
npm run dev
```

6. Acesse o projeto em seu navegador no endereço:

```
http://localhost:5173
```