# Frontend

Aplicação Angular do ERP Agenda Assessoria, estruturada por funcionalidades e integrada à API Laravel.

## Fluxos implementados

- tela de login integrada com JWT
- carregamento do painel inicial autenticado
- layout principal do ERP com menu lateral
- menu de perfil com ações de perfil e saída
- gestão de usuários com tabela, busca, paginação, drawer lateral e modal de exclusão

## Estrutura principal

```text
src/app/
  core/
  shared/
  features/
```

## Padrões adotados

- organização por feature
- camada compartilhada de UI para componentes reutilizáveis
- fachada para orquestração da tela de usuários
- componentes standalone
- testes dos fluxos críticos e componentes compartilhados principais

## Execução local

Com Docker Compose em execução, a aplicação fica disponível em:

- Frontend: `http://127.0.0.1:4200`

A configuração base da API está centralizada em:

- `src/app/core/configuracao/api.config.ts`

## Comandos úteis

```bash
docker compose exec web npm run lint
docker compose exec web npm run test:ci
docker compose exec web npm run build
docker compose exec web npm run format
docker compose exec web npm run format:check
```

## Qualidade

O frontend já inclui:

- validação estática com TypeScript
- verificação de formatação padronizada
- testes dos fluxos principais de login e gestão de usuários
- testes de componentes compartilhados críticos
- melhorias de acessibilidade em modal, drawer, menu do usuário e formulários
