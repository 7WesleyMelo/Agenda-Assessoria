# Agenda Assessoria

Projeto de teste tecnico estruturado como monorepo, com backend em Laravel, frontend em Angular, banco PostgreSQL e ambiente local executado via Docker.

## Objetivo

Entregar uma aplicacao com arquitetura clara, API RESTful consistente, frontend componentizado e ambiente reprodutivel, priorizando qualidade de codigo, clareza de decisao tecnica e facilidade de execucao.

## Stack

- Backend: Laravel API
- Frontend: Angular
- Banco de dados: PostgreSQL
- Infra local: Docker Compose

## Estrutura do Repositorio

```text
backend/
frontend/
infra/
docs/
```

## Padrao de Idioma

- Toda a documentacao do projeto sera escrita em pt-BR.
- Nomes descritivos exibidos ao avaliador devem priorizar pt-BR.
- Mensagens de commit devem usar descricao em pt-BR.
- Termos tecnicos consolidados do ecossistema podem ser mantidos quando forem o padrao da ferramenta.

## Estado Atual

Este repositorio foi inicializado com a estrutura base, a documentacao tecnica inicial e a stack Docker local. O bootstrap de Laravel e Angular sera feito nas proximas etapas.

## Principios de Implementacao

- Controllers finos e regras de negocio fora da camada HTTP
- Organizacao por contexto funcional sempre que isso reduzir acoplamento
- Componentizacao forte no frontend, com separacao clara entre pages, components e services
- Regras criticas protegidas tanto na aplicacao quanto no banco
- Ambiente local e CI guiados pela mesma estrategia de execucao

## Proximos Passos

1. Definir o escopo funcional final e o modelo de dominio inicial.
2. Subir o monorepo com Laravel, Angular e Docker.
3. Implementar os primeiros fluxos com testes e contrato da API.
4. Refinar seguranca, observabilidade e pipeline.
