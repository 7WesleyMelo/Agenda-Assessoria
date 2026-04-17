# Infraestrutura Local

## Objetivo

Este documento descreve a infraestrutura local usada para executar o projeto, a função de cada serviço e as decisões adotadas para simplificar o bootstrap do ambiente.

## Orquestração

A execução local do projeto é feita via `docker-compose.yml`.

Essa escolha foi feita para:

- padronizar o ambiente
- evitar dependência de setup manual
- reduzir divergência entre máquinas
- facilitar a avaliação ponta a ponta

## Serviços

### `db`

Banco PostgreSQL do projeto.

Responsabilidades:

- armazenar dados do backend
- responder ao health check do banco
- persistir dados por volume local

### `api`

Container do backend Laravel.

Responsabilidades:

- instalar dependências do Composer, quando necessário
- garantir `.env` e chaves mínimas
- executar migrations
- executar seed automática do administrador e usuários de demonstração
- servir a API em `0.0.0.0:8000`

### `web`

Container do frontend Angular.

Responsabilidades:

- instalar e reaproveitar dependências de frontend
- servir a aplicação em `0.0.0.0:4200`
- consumir a API local

## Dependências entre serviços

- `api` depende de `db` saudável
- `web` depende do serviço `api` iniciado

Essa ordem foi adotada para reduzir falhas de inicialização do ambiente.

## Volumes

Volumes relevantes:

- persistência do Postgres
- cache do Composer
- `vendor` do backend
- `node_modules` do frontend
- cache do Angular
- cache do npm

## Motivo dos volumes

O uso desses volumes melhora a experiência local porque:

- evita reinstalações completas desnecessárias
- acelera novas subidas do ambiente
- preserva dados do banco

## Script de entrada do backend

O backend usa um script de entrada dedicado:

- `infra/scripts/backend/entrada.sh`

Esse script executa:

1. instalação de dependências, se necessário
2. cópia do `.env`, quando ausente
3. geração de `APP_KEY`, quando necessário
4. geração de `JWT_SECRET`, quando necessário
5. migrations
6. seed automática
7. inicialização do servidor Laravel

## Motivo da seed automática

A seed automática foi adotada para:

- reduzir atrito para o avaliador
- garantir credencial funcional logo após a subida
- evitar dependência de passo manual escondido

Essa seed é idempotente, pois usa atualização previsível dos registros principais.

## Portas expostas

- frontend: `4200`
- api: `8000`
- banco: `5432`

## Credencial inicial

Após subir o ambiente:

- e-mail: `admin@agendaassessoria.com.br`
- senha: `123456`

## Como subir o ambiente

```bash
docker compose up --build
```

## Como validar a infraestrutura

### API

```bash
http://127.0.0.1:8000/api/v1/saude
```

### Frontend

```bash
http://127.0.0.1:4200
```

## Por que não foi adotada infraestrutura mais complexa

Não foi introduzido:

- reverse proxy dedicado
- cluster de containers
- filas adicionais
- cache distribuído
- observabilidade externa

Esses elementos não seriam proporcionais ao escopo atual do teste técnico.

## Conclusão

A infraestrutura local foi desenhada para equilibrar:

- simplicidade operacional
- previsibilidade
- reprodutibilidade
- boa experiência de avaliação
