# INVITATION

<p align="center">
<img width="300" height="300" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/180589510/510539221-75236ff1-559b-46f7-811e-5e76ec03301b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T035526Z&X-Amz-Expires=300&X-Amz-Signature=42a68e52a5a5b8660b826cb5748af8e192d38fcdf73c0cda9a9850469570c148&X-Amz-SignedHeaders=host" />
</p>

# 📨 Sistema de Gerenciamento e Convite de Convidados

Sistema web completo para gerenciamento de convidados e envio automatizado de convites personalizados via e-mail. O sistema permite cadastrar convidados, enviar e-mails com links de confirmação ou recusa de presença, e rastrear o status de cada convidado de forma organizada e eficiente.

## 🎯 Objetivo

Este projeto foi desenvolvido para automatizar o processo de convites e confirmação de presença em eventos. Através de uma interface administrativa, é possível:

- Cadastrar e gerenciar convidados
- Enviar e-mails personalizados em massa para todos os convidados pendentes
- Receber confirmações ou recusas de presença através de links únicos nos e-mails
- Visualizar o status de cada convidado (pendente, confirmado, ausente)

---

## 🛠️ Tecnologias Utilizadas

### Core

- **[Next.js 16.0.1](https://nextjs.org/)** — Framework React para aplicações full-stack com SSR/SSG
- **[React 19.2.0](https://react.dev/)** — Biblioteca para construção de interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipagem estática para maior segurança e produtividade

### Backend & Banco de Dados

- **[Mongoose 8.19.3](https://mongoosejs.com/)** — ODM (Object Data Modeling) para MongoDB
- **[MongoDB](https://www.mongodb.com/)** — Banco de dados NoSQL para armazenamento de dados

### E-mail

- **[Nodemailer 7.0.10](https://nodemailer.com/)** — Biblioteca para envio de e-mails via SMTP

### UI & Estilização

- **[Bulma CSS](https://bulma.io/)** — Framework CSS baseado em Flexbox
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Framework utilitário para estilização
- **[React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** — Notificações toast para feedback ao usuário

### Validação & Qualidade

- **[Zod 4.1.12](https://zod.dev/)** — Validação e tipagem de dados com schema validation
- **[ESLint 9](https://eslint.org/)** — Linter para manter padrões de código

---

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/invitation
# Ou para MongoDB Atlas: mongodb+srv://usuario:senha@cluster.mongodb.net/invitation

# Configuração de E-mail (Gmail)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-gmail

# URL do Site (atualizar sempre que reiniciar o ngrok)
NEXT_PUBLIC_SITE_URL=https://seu-link-ngrok.ngrok.io

# Autenticação Básica (opcional)
BASIC_USER=admin
BASIC_PASS=12345
```

### ⚠️ Importante sobre NGROK_URL

O **`NEXT_PUBLIC_SITE_URL`** deve ser atualizado **toda vez que o ngrok for iniciado novamente**, pois o link muda a cada execução. Este link é usado para gerar os links de confirmação/recusa nos e-mails enviados aos convidados.

---

## 📧 Configuração da API de E-mail

### Arquivo: `src/app/api/send-invites/configEmail.ts`

Este arquivo contém a função que configura o template HTML dos e-mails enviados. Você pode personalizar:

- **Título do e-mail**: Definido na variável `title`
- **Mensagem HTML**: Customize o template em `msgHtml` para incluir informações do evento (data, hora, local)
- **Links de ação**: Os links de confirmação e recusa são gerados automaticamente

Exemplo de personalização:

```typescript
const { title, msgHtml } = configEmail(guest.name, confirmLink, declineLink, {
  data: "15 de Dezembro de 2024",
  hora: "19:00",
  local: "Local do Evento, Rua Exemplo, 123",
});
```

### Configuração do Gmail

Para usar o Gmail como servidor SMTP, você precisa:

1. Ativar a verificação em duas etapas na sua conta Google
2. Gerar uma **Senha de App** específica:
   - Acesse: [Conta Google > Segurança](https://myaccount.google.com/security)
   - Vá em "Verificação em duas etapas" > "Senhas de app"
   - Gere uma nova senha de app para "E-mail"
   - Use essa senha no `EMAIL_PASS` do `.env`

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

- **Node.js 18+** instalado
- **MongoDB** em execução (local ou remoto)
- Conta Gmail configurada com senha de app
- **ngrok** instalado (para expor localhost em desenvolvimento)

### Passo a Passo

#### 1. Instalar Dependências

```bash
npm install
```

ou

```bash
yarn install
```

#### 2. Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto com as variáveis mencionadas na seção anterior.

#### 3. Iniciar o ngrok

Em um terminal separado, inicie o ngrok para expor a porta 3000:

```bash
ngrok http 3000
```

Copie a URL HTTPS fornecida pelo ngrok (ex: `https://abc123.ngrok.io`) e atualize a variável `NEXT_PUBLIC_SITE_URL` no arquivo `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://abc123.ngrok.io
```

> ⚠️ **Lembre-se**: Sempre que reiniciar o ngrok, a URL muda. Atualize o `.env` com a nova URL.

#### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

#### 5. Acessar a Aplicação

- **Página Principal (Admin)**: `http://localhost:3000` — Requer autenticação básica (configurada no `.env`)
- **Link Público de Confirmação**: `https://seu-ngrok.ngrok.io/confirmar/[id]` — Acessado pelos convidados via links nos e-mails

---

## 🔄 Fluxo de Uso

### 1. Cadastro de Convidados

1. Acesse a página principal (protegida por autenticação básica)
2. Cadastre os convidados através da interface, informando nome e e-mail
3. Por padrão, os convidados são criados com status `"pendente"`

### 2. Envio de Convites

1. Após cadastrar os convidados, acione o envio de convites através da API
2. O sistema busca todos os convidados com status `"pendente"`
3. Para cada convidado, um e-mail personalizado é enviado contendo:
   - Mensagem de boas-vindas personalizada com o nome do convidado
   - Informações do evento (data, hora, local — se configuradas)
   - Link para **Confirmar Presença** (botão verde)
   - Link para **Recusar Presença** (botão vermelho)

### 3. Confirmação de Presença

1. O convidado recebe o e-mail e clica em um dos links
2. O link contém um identificador único do convidado + um sufixo (`t` para confirmar, `f` para recusar)
3. Ao acessar o link, o sistema:
   - Atualiza o status do convidado no banco de dados (`"confirmado"` ou `"ausente"`)
   - Exibe uma página de confirmação com mensagem personalizada

### 4. Acompanhamento

- O administrador pode visualizar a lista de todos os convidados e seus respectivos status
- O status é atualizado em tempo real conforme os convidados respondem

---

## 📁 Estrutura do Projeto

```
invitation/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── guest/           # API para CRUD de convidados
│   │   │   └── send-invites/    # API para envio de e-mails e confirmação
│   │   ├── confirmar/           # Página pública de confirmação de presença
│   │   └── page.tsx             # Página principal (admin)
│   ├── components/              # Componentes React reutilizáveis
│   ├── db/
│   │   └── connection.ts       # Configuração de conexão com MongoDB
│   ├── lib/
│   │   └── mailer.ts            # Configuração do Nodemailer
│   ├── model/
│   │   ├── Guest.ts             # Modelo Mongoose para convidados
│   │   └── guestValidation.ts   # Schema Zod para validação
│   └── middleware.ts            # Middleware de autenticação básica
├── public/                      # Arquivos estáticos
└── .env                         # Variáveis de ambiente (não versionado)
```

---

## 🔒 Boas Práticas e Observações

### ⚠️ Segurança

- **NUNCA** faça commit do arquivo `.env` no repositório Git
- Mantenha o `.env` no `.gitignore` para evitar exposição de credenciais
- Use variáveis de ambiente diferentes para desenvolvimento e produção
- Para produção, considere usar serviços de gerenciamento de secrets (AWS Secrets Manager, Vercel Environment Variables, etc.)

### 📧 E-mail em Ambiente Local

- **Recomendado**: Use contas de e-mail de teste para desenvolvimento
- Gmail oferece limites de envio diários — monitore para evitar bloqueios
- Considere usar serviços como [Mailtrap](https://mailtrap.io/) ou [MailHog](https://github.com/mailhog/MailHog) para testes locais
- Em produção, considere serviços profissionais como SendGrid, AWS SES ou Resend

### 🗄️ Banco de Dados

- Para desenvolvimento local, você pode usar MongoDB local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)
- Certifique-se de que a conexão com o banco está funcionando antes de iniciar o servidor

### 🔗 ngrok e Desenvolvimento

- O ngrok é necessário apenas para desenvolvimento local, pois os links dos e-mails precisam ser acessíveis publicamente
- Em produção, use um domínio real configurado no `NEXT_PUBLIC_SITE_URL`
- Alternativas ao ngrok: [localtunnel](https://localtunnel.github.io/www/), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento na porta 3000

# Produção
npm run build        # Gera a build de produção
npm run start        # Inicia o servidor de produção

# Qualidade de Código
npm run lint         # Executa o ESLint para verificar problemas no código
```

---

## 🎨 Recursos Implementados

- ✅ Interface administrativa com autenticação básica
- ✅ CRUD completo de convidados
- ✅ Validação de dados com Zod
- ✅ Envio de e-mails personalizados em massa
- ✅ Links únicos para confirmação/recusa de presença
- ✅ Página de confirmação responsiva
- ✅ Toast notifications para feedback ao usuário
- ✅ Design moderno com Bulma CSS e Tailwind

---

## 📄 Licença

Este projeto está sob licença MIT. Sinta-se livre para usar, modificar e distribuir conforme necessário.

---

## 👨‍💻 Desenvolvido com

Este projeto foi desenvolvido como uma solução completa para gerenciamento de convites e confirmação de presença em eventos, utilizando as melhores práticas de desenvolvimento web moderno.

---

**Desenvolvido com ❤️ para facilitar a organização de eventos e celebrações especiais.**
