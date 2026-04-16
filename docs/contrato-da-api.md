# Contrato da API

## Premissas

- API RESTful em Laravel
- Versionamento desde o início em `api/v1`
- Payloads consistentes entre backend e frontend
- Tratamento padronizado de erros

## Diretrizes

- Endpoints devem usar nomenclatura previsivel e sem ambiguidade.
- Requests devem ser validados antes de chegar a regras de negócio.
- Responses devem ser serializados por uma camada dedicada.
- Erros de validação, autenticação, autorização, domínio e infraestrutura devem ter formatos distintos, mas consistentes.
- Paginação, filtros e ordenação devem seguir um contrato único.

## Itens a Detalhar na Fase Seguinte

- Recursos principais da API
- Contrato de autenticação
- Estrutura exata de erro
- Estrutura de paginação
- Campos expostos por recurso
