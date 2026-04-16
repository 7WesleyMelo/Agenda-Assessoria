# Guia de Avaliação

## Objetivo

Este guia concentra o caminho mais curto para um avaliador executar o projeto e validar os fluxos entregues.

## Pré-requisitos

- Docker Desktop em execução
- Portas `4200`, `5432` e `8001` livres no host

## Subida rápida

1. Copiar `.env.example` para `.env` na raiz do projeto.
2. Executar `docker compose up --build`.
3. Aguardar a conclusão da subida dos serviços `db`, `api` e `web`.

## Endereços

- Frontend: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:8001/api/v1`
- Health check: `http://127.0.0.1:8001/api/v1/saude`

## Credencial inicial

- E-mail: `admin@agendaassessoria.com.br`
- Senha: `123456`

## Fluxos para validação

### 1. Login

- Acessar a tela inicial do frontend
- Entrar com a credencial inicial
- Confirmar redirecionamento para o painel principal do ERP

### 2. Painel inicial

- Verificar carregamento do dashboard autenticado
- Confirmar exibição de atalhos e menu lateral principal

### 3. Gestão de usuários

- Abrir o menu de cadastros
- Acessar a tela de usuários
- Criar um novo usuário
- Editar o usuário criado
- Excluir o usuário criado
- Tentar excluir o próprio usuário autenticado para validar a regra de proteção

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

## Itens de acabamento técnico

- Login com rate limit para reduzir brute force
- Respostas da API com `request_id` para rastreabilidade
- Health check com verificação real do banco
- Pipeline inicial de validação em GitHub Actions
