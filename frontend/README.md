# Frontend

Aplicação Angular do ERP Agenda Assessoria, estruturada por funcionalidades e integrada à API Laravel.

## Fluxos implementados

- tela de login integrada com JWT
- carregamento do painel inicial autenticado
- layout principal do ERP com menu lateral
- perfil no topo com ações de perfil e saída
- gestão de usuários com tabela, busca, paginação, drawer lateral e modal de exclusão

## Estrutura principal

```text
src/app/
  core/
  features/
```

## Execução local

Com Docker Compose em execução, a aplicação fica disponível em `http://127.0.0.1:4200`.

A configuração atual da API está centralizada em `src/app/core/configuracao/api.config.ts`.

## Comandos úteis

```bash
npm run lint
npm run format
npm run format:check
npm run test:ci
npm run build
```

## Estratégia de qualidade

- verificação estática com TypeScript
- verificação de formatação padronizada para arquivos do frontend
- testes prioritários cobrindo login e gestão de usuários
