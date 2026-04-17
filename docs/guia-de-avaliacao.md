# Guia de Avaliação

## Objetivo

Este guia concentra o caminho mais curto para executar o projeto e validar os fluxos entregues sem atrito.

## Pré-requisitos

- Docker Desktop em execução
- portas `4200`, `5432` e `8000` livres no host

## Subida rápida

1. Copie `.env.example` para `.env` na raiz do projeto, se necessário.
2. Execute:

```bash
docker compose up --build -d
```

3. Aguarde a subida dos serviços `db`, `api` e `web`.

## Observação sobre os arquivos `.env`

Para avaliar o projeto:

- é necessário criar manualmente apenas o `.env` da raiz
- o arquivo `backend/.env` é gerado automaticamente na primeira subida do container da API, se ainda não existir

4. Aguarde a preparação automática do backend, que executa:

```bash
php artisan migrate --force
php artisan db:seed --class=UsuarioAdministradorSeeder --force
```

Não é necessário rodar seed manualmente para usar a credencial inicial.

## Endereços

- Frontend: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:8000/api/v1`
- Health check: `http://127.0.0.1:8000/api/v1/saude`

## Credencial inicial

- E-mail: `admin@agendaassessoria.com.br`
- Senha: `123456`

## Fluxos sugeridos para validação

### 1. Login

- Acesse a tela inicial do frontend.
- Entre com a credencial inicial.
- Confirme o redirecionamento para o painel principal do ERP.

### 2. Painel inicial

- Verifique o carregamento do dashboard autenticado.
- Confirme a exibição de indicadores, atalhos e menu lateral principal.

### 3. Gestão de usuários

- Acesse a área de usuários pelo menu lateral.
- Cadastre um novo usuário.
- Edite o usuário criado.
- Exclua o usuário criado.
- Tente excluir o próprio usuário autenticado para validar a regra de proteção.

### 4. Regra de autorização

- O módulo de usuários é restrito a perfis com cargo `Administrador`.
- Essa proteção foi implementada no backend e validada por teste automatizado.

## Comandos de qualidade

### Backend

```bash
docker compose exec api composer lint
docker compose exec api composer test
```

### Frontend

```bash
docker compose exec web npm run lint
docker compose exec web npm run test:ci
docker compose exec web npm run build
```

## Itens técnicos entregues

- autenticação JWT
- rate limit no endpoint de login
- respostas da API com `request_id`
- header `X-Request-Id` para rastreabilidade
- health check com verificação real do banco
- autorização por cargo no módulo de usuários
- testes automatizados no backend e no frontend
