# Pipeline e Validação

## Objetivo

Este documento descreve como a automação de qualidade do projeto foi organizada e quais garantias ela oferece para backend e frontend.

## Arquivo da pipeline

Pipeline atual:

- `.github/workflows/validacao.yml`

## Eventos que disparam a pipeline

- `push` na branch `main`
- `pull_request`

## Estratégia geral

A pipeline foi separada em dois jobs independentes:

- `backend`
- `frontend`

Essa separação facilita leitura do resultado, isola falhas por stack e deixa claro para o avaliador que os dois lados do sistema possuem validação própria.

## Job do Backend

### Etapas executadas

1. checkout do repositório
2. configuração do PHP 8.2
3. instalação de dependências do Composer
4. preparação do ambiente Laravel
5. execução do lint
6. execução dos testes

### Comandos principais

```bash
composer install --no-interaction --prefer-dist
cp .env.example .env
php artisan key:generate --ansi
composer lint
composer test
```

### O que essa validação garante

- padrão de código consistente
- aplicação Laravel inicializando corretamente
- comportamento crítico da API coberto por testes

## Job do Frontend

### Etapas executadas

1. checkout do repositório
2. configuração do Node.js 22
3. instalação de dependências com cache
4. configuração do Chrome
5. execução do lint
6. execução dos testes
7. geração do build

### Comandos principais

```bash
npm ci
npm run lint
npm run test:ci
npm run build
```

### O que essa validação garante

- tipagem e consistência do código Angular
- testes dos fluxos críticos
- compilação final da aplicação

## Por que a pipeline foi feita assim

### Simplicidade

O objetivo não foi criar uma CI sofisticada demais, e sim uma pipeline objetiva, legível e suficiente para validar o que realmente importa no teste técnico.

### Cobertura útil

As etapas escolhidas priorizam:

- lint
- testes
- build

Esses três pontos costumam fornecer a melhor relação custo-benefício em projetos desse porte.

### Legibilidade para o avaliador

Um avaliador técnico entende rapidamente o valor dessa pipeline porque ela deixa explícito:

- o que é validado no backend
- o que é validado no frontend
- que o projeto tem um mínimo de governança de qualidade

## O que a pipeline não tenta resolver

Para manter pragmatismo, a pipeline atual não adiciona:

- análise estática avançada de segurança
- cobertura de testes com gates
- deploy automatizado
- ambientes temporários de preview

Isso foi uma escolha consciente para não inflar complexidade além do escopo do teste.

## Como defender essa decisão

Se perguntado por que a pipeline é enxuta, a resposta técnica adequada é:

> A pipeline foi dimensionada para o objetivo do projeto. Ela valida as garantias mais importantes para o teste técnico sem criar sobrecarga operacional artificial.

## Comandos equivalentes locais

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

## Conclusão

A pipeline atual demonstra cuidado com qualidade, separação de responsabilidades e previsibilidade de validação, com escopo coerente para um teste técnico sênior.
