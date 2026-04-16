# Contrato da API

## Premissas

- API RESTful em Laravel
- Versionamento desde o início em `api/v1`
- Payloads consistentes entre backend e frontend
- Tratamento padronizado de erros

## Diretrizes

- Endpoints usam nomenclatura previsível e sem ambiguidade.
- Requests são validados antes de chegar às regras de negócio.
- Responses são serializados por camada dedicada.
- Erros de validação, autenticação, rate limit, recurso inexistente e falha interna seguem formato consistente.
- Toda resposta da API inclui o header `X-Request-Id` para rastreabilidade.

## Estrutura de erro

### Validação

```json
{
  "message": "Os dados enviados são inválidos.",
  "errors": {
    "campo": [
      "Mensagem de validação"
    ]
  },
  "request_id": "uuid-da-requisicao"
}
```

### Autenticação, rate limit, recurso inexistente e falha interna

```json
{
  "message": "Mensagem padronizada do erro",
  "request_id": "uuid-da-requisicao"
}
```

## Recursos atuais

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/perfil`
- `GET /api/v1/erp/painel-inicial`
- `GET /api/v1/usuarios`
- `POST /api/v1/usuarios`
- `PUT /api/v1/usuarios/{id}`
- `DELETE /api/v1/usuarios/{id}`
- `GET /api/v1/saude`

## Observabilidade mínima

- Header `X-Request-Id` em todas as respostas
- Campo `request_id` nos erros da API
- Health check com verificação real do banco
