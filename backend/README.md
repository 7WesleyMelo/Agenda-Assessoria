# Backend

API RESTful do projeto Agenda Assessoria, construída com Laravel 12 e organizada por contexto funcional.

## Objetivo

Disponibilizar a camada de autenticação, dados e regras de negócio do fluxo inicial do ERP, com foco em previsibilidade de contrato, segurança básica e testabilidade.

## Fluxos implementados

- autenticação por JWT
- obtenção do perfil autenticado
- carregamento do painel inicial do ERP
- CRUD de usuários
- proteção para impedir exclusão do usuário autenticado
- autorização por cargo no módulo de usuários
- health check com verificação real do banco

## Estrutura principal

```text
app/
  Http/
    Controllers/
    Middleware/
    Requests/
    Resources/
  Models/
  Services/
  Support/
database/
  factories/
  migrations/
  seeders/
routes/
tests/
```

## Endpoints atuais

### Públicos

- `GET /api/v1/saude`
- `POST /api/v1/auth/login`

### Autenticados

- `GET /api/v1/auth/perfil`
- `GET /api/v1/erp/painel-inicial`

### Autenticados e restritos a Administrador

- `GET /api/v1/usuarios`
- `POST /api/v1/usuarios`
- `PUT /api/v1/usuarios/{id}`
- `DELETE /api/v1/usuarios/{id}`

## Padrões técnicos adotados

- validação de entrada com `FormRequest`
- serialização de saída com `JsonResource`
- serviços dedicados para autenticação, painel inicial e usuários
- middleware próprio para autenticação JWT
- middleware de autorização por cargo para o módulo administrativo
- respostas de erro padronizadas com `request_id`

## Execução local

Com Docker Compose em execução:

- API: `http://127.0.0.1:8000/api/v1`
- Health check: `http://127.0.0.1:8000/api/v1/saude`

Para subir o ambiente completo:

```bash
docker compose up --build -d
```

## Sobre o arquivo `backend/.env`

O backend usa seu próprio arquivo de ambiente, separado do `.env` da raiz.

Regra atual do projeto:

- o `.env` da raiz é usado pelo `docker compose`
- o `backend/.env` é usado pela aplicação Laravel

Na inicialização do container `api`, o arquivo `backend/.env` é gerado automaticamente a partir de `backend/.env.example`, caso ainda não exista.

Na sequência, o backend executa automaticamente:

```bash
php artisan migrate --force
php artisan db:seed --class=UsuarioAdministradorSeeder --force
```

Isso garante que o usuário administrador esteja disponível sem ação manual do avaliador.

## Comandos úteis

```bash
docker compose exec api composer lint
docker compose exec api composer format
docker compose exec api composer test
docker compose exec api php artisan migrate
docker compose exec api php artisan db:seed --class=UsuarioAdministradorSeeder
```

## Banco e variáveis de ambiente

Quando a API roda dentro do Docker, a conexão PostgreSQL usa o host `db`. Fora do container, a aplicação respeita `DB_HOST` definido no `.env`.

Variáveis mais relevantes:

- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

## Credencial inicial

- E-mail: `admin@agendaassessoria.com.br`
- Senha: `123456`

## Qualidade

Estado atual de validação:

- lint do backend passando
- testes automatizados do backend passando
- cobertura dos principais fluxos de login, painel inicial, saúde e usuários
