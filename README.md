# Agenda Assessoria

Teste técnico estruturado como monorepo, com API RESTful em Laravel, frontend em Angular, PostgreSQL e execução local por Docker Compose.

## Visão geral

O projeto entrega um fluxo funcional ponta a ponta de um ERP, com foco em organização arquitetural, qualidade técnica e experiência de avaliação.

Escopo implementado:

- autenticação com JWT
- carregamento do painel inicial autenticado
- shell principal do ERP com menu lateral
- gestão de usuários com listagem, busca, paginação, cadastro, edição e exclusão
- bloqueio da exclusão do próprio usuário autenticado
- autorização por cargo para acesso ao módulo de usuários
- padronização de erros com `request_id`
- testes automatizados no backend e no frontend

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

- Toda a documentação do projeto permanece em pt-BR.
- Textos visíveis ao avaliador priorizam pt-BR.
- Mensagens de commit seguem descrição em pt-BR.
- Termos técnicos consolidados podem permanecer no idioma padrão da ferramenta.

## Como executar

1. Garanta que Docker Desktop esteja em execução.
2. Confirme que as portas `4200`, `5432` e `8000` estejam livres no host.
3. Copie `.env.example` para `.env` na raiz do projeto, caso ainda não exista.
4. Suba os serviços com:

```bash
docker compose up --build
```

5. Aguarde a preparação automática do backend.

Na subida do container da API, o projeto executa automaticamente:

- `composer install`, quando necessário
- `php artisan migrate --force`
- `php artisan db:seed --class=UsuarioAdministradorSeeder --force`

6. Acesse:

- Frontend: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:8000/api/v1`
- Health check: `http://127.0.0.1:8000/api/v1/saude`

## Credencial inicial

Após a subida do ambiente, a credencial abaixo já estará disponível sem necessidade de seed manual:

- E-mail: `admin@agendaassessoria.com.br`
- Senha: `123456`

## Serviços do Docker

O `docker-compose.yml` sobe três serviços principais:

- `db`: banco PostgreSQL
- `api`: aplicação Laravel
- `web`: aplicação Angular

## Comandos de validação

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

## Pontos de atenção para avaliação

- O módulo de usuários exige autenticação e permissão de cargo `Administrador`.
- As respostas de erro da API retornam `request_id` para rastreabilidade.
- O header `X-Request-Id` é incluído nas respostas da API.
- O endpoint de login possui rate limit.
- O endpoint de saúde valida a conectividade real com o banco.

## Documentação relacionada

- [backend/README.md](backend/README.md)
- [frontend/README.md](frontend/README.md)
- [docs/arquitetura.md](docs/arquitetura.md)
- [docs/contrato-da-api.md](docs/contrato-da-api.md)
- [docs/guia-de-avaliacao.md](docs/guia-de-avaliacao.md)
- [docs/modelo-de-dominio.md](docs/modelo-de-dominio.md)
- [docs/plano-de-entrega.md](docs/plano-de-entrega.md)
- [docs/estrategia-de-commits.md](docs/estrategia-de-commits.md)
