# Infraestrutura Local

## Objetivo

Toda a stack do projeto será executada com Docker Compose, mantendo ambiente local previsível e próximo do pipeline.

## Topologia Inicial

- `api`: container do Laravel
- `web`: container do Angular
- `db`: container do PostgreSQL

## Diretrizes

- Fixar versões de runtime e imagens.
- Expor apenas as portas necessárias ao host.
- Usar comunicação interna por nome de serviço.
- Persistir apenas estado real, principalmente banco de dados e arquivos necessários da aplicação.
- Definir healthchecks para banco e API.
- Documentar um fluxo único de bootstrap para toda a equipe avaliadora conseguir rodar a stack.

## Estado Atual

Já foram adicionados:

- `docker-compose.yml`
- Dockerfiles do backend e frontend
- exemplos de variáveis de ambiente
- scripts iniciais de entrada dos containers

## Arquivos Criados

- `docker-compose.yml`: define os serviços `api`, `web` e `db`
- `infra/docker/backend/Dockerfile`: imagem base do backend
- `infra/docker/frontend/Dockerfile`: imagem base do frontend
- `infra/scripts/backend/entrada.sh`: fluxo inicial do container Laravel
- `infra/scripts/frontend/entrada.sh`: fluxo inicial do container Angular
- `.env.example`: variáveis padrão do ambiente local

## Como Subir a Stack

1. Copiar `.env.example` para `.env`.
2. Executar `docker compose up --build`.
3. Inicializar Laravel em `backend/` e Angular em `frontend/`.
4. Reiniciar os serviços após o bootstrap das aplicações.

## Otimizações de Subida

- O backend usa volume dedicado para `vendor` e cache do Composer.
- O frontend usa volume dedicado para `node_modules`, cache do npm e cache do Angular.
- As dependências só são reinstaladas quando `composer.lock` ou `package-lock.json` mudarem.
- Isso reduz significativamente o tempo de subida depois da primeira inicialização da stack.

## Observação

Enquanto `backend/` e `frontend/` ainda não tiverem suas aplicações criadas, os containers `api` e `web` permanecem ativos em modo de espera. Isso permite estabilizar a infraestrutura antes do bootstrap completo da stack.
