# Infraestrutura Local

## Objetivo

Toda a stack do projeto sera executada com Docker Compose, mantendo ambiente local previsivel e proximo do pipeline.

## Topologia Inicial

- `api`: container do Laravel
- `web`: container do Angular
- `db`: container do PostgreSQL

## Diretrizes

- Fixar versoes de runtime e imagens.
- Expor apenas as portas necessarias ao host.
- Usar comunicacao interna por nome de servico.
- Persistir apenas estado real, principalmente banco de dados e arquivos necessarios da aplicacao.
- Definir healthchecks para banco e API.
- Documentar um fluxo unico de bootstrap para toda a equipe avaliadora conseguir rodar a stack.

## Estado Atual

Ja foram adicionados:

- `docker-compose.yml`
- Dockerfiles do backend e frontend
- exemplos de variaveis de ambiente
- scripts iniciais de entrada dos containers

## Arquivos Criados

- `docker-compose.yml`: define os servicos `api`, `web` e `db`
- `infra/docker/backend/Dockerfile`: imagem base do backend
- `infra/docker/frontend/Dockerfile`: imagem base do frontend
- `infra/scripts/backend/entrada.sh`: fluxo inicial do container Laravel
- `infra/scripts/frontend/entrada.sh`: fluxo inicial do container Angular
- `.env.example`: variaveis padrao do ambiente local

## Como Subir a Stack

1. Copiar `.env.example` para `.env`.
2. Executar `docker compose up --build`.
3. Inicializar Laravel em `backend/` e Angular em `frontend/`.
4. Reiniciar os servicos apos o bootstrap das aplicacoes.

## Observacao

Enquanto `backend/` e `frontend/` ainda nao tiverem suas aplicacoes criadas, os containers `api` e `web` permanecem ativos em modo de espera. Isso permite estabilizar a infraestrutura antes do bootstrap completo da stack.
