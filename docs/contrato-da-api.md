# Contrato da API

## Premissas

- API RESTful em Laravel
- Versionamento desde o inicio em `api/v1`
- Payloads consistentes entre backend e frontend
- Tratamento padronizado de erros

## Diretrizes

- Endpoints devem usar nomenclatura previsivel e sem ambiguidade.
- Requests devem ser validados antes de chegar a regras de negocio.
- Responses devem ser serializados por uma camada dedicada.
- Erros de validacao, autenticacao, autorizacao, dominio e infraestrutura devem ter formatos distintos, mas consistentes.
- Paginacao, filtros e ordenacao devem seguir um contrato unico.

## Itens a Detalhar na Fase Seguinte

- Recursos principais da API
- Contrato de autenticacao
- Estrutura exata de erro
- Estrutura de paginacao
- Campos expostos por recurso
