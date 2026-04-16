# Agenda Assessoria

Projeto de teste técnico estruturado como monorepo, com backend em Laravel, frontend em Angular, banco PostgreSQL e ambiente local executado via Docker.

## Objetivo

Entregar uma aplicação com arquitetura clara, API RESTful consistente, frontend componentizado e ambiente reproduzível, priorizando qualidade de código, clareza de decisão técnica e facilidade de execução.

## Stack

- Backend: Laravel API
- Frontend: Angular
- Banco de dados: PostgreSQL
- Infra local: Docker Compose

## Estrutura do Repositório

```text
backend/
frontend/
infra/
docs/
```

## Padrao de Idioma

- Toda a documentação do projeto será escrita em pt-BR.
- Nomes descritivos exibidos ao avaliador devem priorizar pt-BR.
- Mensagens de commit devem usar descrição em pt-BR.
- Termos técnicos consolidados do ecossistema podem ser mantidos quando forem o padrão da ferramenta.

## Estado Atual

Este repositório foi inicializado com a estrutura base, a documentação técnica inicial e a stack Docker local. O bootstrap de Laravel e Angular será feito nas próximas etapas.

## Princípios de Implementação

- Controllers finos e regras de negócio fora da camada HTTP
- Organização por contexto funcional sempre que isso reduzir acoplamento
- Componentização forte no frontend, com separação clara entre pages, components e services
- Regras críticas protegidas tanto na aplicação quanto no banco
- Ambiente local e CI guiados pela mesma estratégia de execução

## Próximos Passos

1. Definir o escopo funcional final e o modelo de domínio inicial.
2. Subir o monorepo com Laravel, Angular e Docker.
3. Implementar os primeiros fluxos com testes e contrato da API.
4. Refinar segurança, observabilidade e pipeline.
