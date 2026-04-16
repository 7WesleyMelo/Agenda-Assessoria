# Backend

API RESTful do projeto Agenda Assessoria, construída com Laravel 12 e organizada por contexto funcional.

## Fluxos implementados

- autenticação por JWT
- obtenção do perfil autenticado
- carregamento do painel inicial do ERP
- CRUD de usuários
- proteção para impedir exclusão do usuário autenticado

## Estrutura principal

```text
app/
  Http/
  Models/
  Services/
  Support/
database/
  migrations/
  seeders/
routes/
tests/
```

## Endpoints atuais

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/perfil`
- `GET /api/v1/erp/painel-inicial`
- `GET /api/v1/usuarios`
- `POST /api/v1/usuarios`
- `PUT /api/v1/usuarios/{id}`
- `DELETE /api/v1/usuarios/{id}`

## Comandos úteis

```bash
composer lint
composer format
composer test
php artisan db:seed
```

## Banco e Docker

Quando a API roda dentro do Docker, a conexão PostgreSQL usa o serviço `db` automaticamente. Fora do container, a aplicação continua respeitando `DB_HOST` definido no `.env`.

## Credencial inicial

- e-mail: `admin@agendaassessoria.com.br`
- senha: `123456`
