# Agenda Assessoria

Teste técnico estruturado como monorepo, com API RESTful em Laravel, frontend em Angular, PostgreSQL e execução local por Docker Compose.

## Escopo atual

O projeto já entrega o primeiro fluxo funcional ponta a ponta do ERP:

- login com JWT
- carregamento do painel inicial autenticado
- shell principal com menu lateral
- gestão de usuários com listagem, cadastro, edição e exclusão
- bloqueio da exclusão do próprio usuário autenticado

## Stack

- Backend: Laravel 12 com PHP 8.2
- Frontend: Angular 20
- Banco de dados: PostgreSQL 16
- Infra local: Docker Compose

## Estrutura do repositório

```text
backend/
frontend/
infra/
docs/
```

## Padrão de idioma

- Toda a documentação do projeto deve permanecer em pt-BR.
- Textos visíveis ao avaliador devem priorizar pt-BR.
- Mensagens de commit devem usar descrição em pt-BR.
- Termos técnicos consolidados podem permanecer no idioma padrão da ferramenta.

## Como executar

1. Copie `.env.example` para `.env` na raiz do projeto, caso ainda não exista.
2. Suba os serviços com `docker compose up --build`.
3. Acesse o frontend em `http://127.0.0.1:4200`.
4. A API ficará disponível em `http://127.0.0.1:8001/api/v1`.

Credencial inicial semeada no backend:

- e-mail: `admin@agendaassessoria.com.br`
- senha: `123456`

## Qualidade e validação

- Backend: `composer lint`, `composer test`
- Frontend: `npm run lint`, `npm run test:ci`, `npm run build`
- Pipeline inicial: GitHub Actions em `.github/workflows/validacao.yml`

## Documentação relacionada

- `docs/arquitetura.md`
- `docs/contrato-da-api.md`
- `docs/guia-de-avaliacao.md`
- `docs/modelo-de-dominio.md`
- `docs/plano-de-entrega.md`
- `docs/estrategia-de-commits.md`
