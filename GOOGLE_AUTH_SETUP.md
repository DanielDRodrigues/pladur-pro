# Configurar Autenticacao Google

Guia para configurar o login com Google em desenvolvimento local.

## 1. Criar o projeto no Google Cloud

1. Abrir https://console.cloud.google.com/
2. Clicar no seletor de projeto, no topo.
3. Clicar em `New Project`.
4. Usar o nome `Pladur Pro`.
5. Clicar em `Create`.

## 2. Configurar o ecra de consentimento

1. Ir a `APIs & Services`.
2. Entrar em `OAuth consent screen`.
3. Escolher `External`.
4. Clicar em `Create`.
5. Preencher:
   - `App name`: `Pladur Pro`
   - `User support email`: o teu email
   - `Developer contact information`: o teu email
6. Guardar e continuar ate ao fim.
7. Se aparecer a opcao `Test users`, adicionar o teu email Google.

## 3. Criar credenciais OAuth

1. Ir a `APIs & Services` -> `Credentials`.
2. Clicar em `Create credentials`.
3. Escolher `OAuth client ID`.
4. Em `Application type`, escolher `Web application`.
5. Nome: `Pladur Pro Local`.
6. Em `Authorized redirect URIs`, adicionar:

```text
http://localhost:3000/api/auth/google/callback
```

7. Clicar em `Create`.
8. Guardar os valores:
   - `Client ID`
   - `Client secret`

## 4. Criar o ficheiro `.env.local`

Na raiz do projeto, criar um ficheiro chamado `.env.local`:

```env
GOOGLE_CLIENT_ID=cola_aqui_o_client_id
GOOGLE_CLIENT_SECRET=cola_aqui_o_client_secret
AUTH_SECRET=cola_aqui_um_secret
```

Para gerar o `AUTH_SECRET`, correr:

```bash
openssl rand -base64 32
```

Colar o resultado em `AUTH_SECRET`.

## 5. Arrancar a app

Dentro do projeto, correr:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Se o Next usar outra porta, por exemplo `3001`, adicionar tambem este redirect URI no Google Cloud:

```text
http://localhost:3001/api/auth/google/callback
```

## 6. Testar

1. Clicar em `Entrar com Google`.
2. Escolher a conta Google.
3. Aceitar o consentimento.
4. Confirmar que voltas a app e que aparece o teu nome/email no topo.
5. Clicar em `Sair` para testar logout.

## Nota

Neste momento a autenticacao funciona com sessao em cookie, mas ainda nao ha base de dados. O login/logout fica pronto; guardar clientes, obras e orcamentos por utilizador sera o passo seguinte.
