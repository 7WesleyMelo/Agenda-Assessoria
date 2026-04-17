# Plano de Entrega

## Fase 1

- Inicializar a estrutura do monorepo
- Definir documentos técnicos base
- Preparar `.gitignore` para manter artefatos locais fora do repositório

Status: concluída

## Fase 2

- Subir Docker Compose com `api`, `web` e `db`
- Inicializar Laravel em `backend/`
- Inicializar Angular em `frontend/`
- Definir envs e fluxo de inicialização local

Status: concluída

## Fase 3

- Implementar o primeiro fluxo funcional ponta a ponta
- Criar migrations, seeds e contrato inicial da API
- Implementar autenticação e proteções básicas

Status: concluída

## Fase 4

- Adicionar testes prioritários no backend e frontend
- Configurar lint, formatação e pipeline inicial
- Refinar documentação de execução e decisões técnicas

Status: concluída

Entregas consolidadas nesta fase:

- testes de backend para autenticação, painel inicial e usuários
- testes prioritários de frontend para login e gestão de usuários
- scripts de lint e formatação para backend e frontend
- pipeline inicial de validação com GitHub Actions
- atualização dos READMEs do monorepo, backend e frontend

## Fase 5

- Revisar segurança, tratamento de erro, observabilidade e acabamento final
- Validar experiência de execução para avaliadores
- Organizar histórico de commits e marco final de entrega

Status: concluída

Entregas consolidadas nesta fase:

- rate limit no endpoint de login
- padronização de respostas de erro da API com `request_id`
- rastreabilidade mínima por requisição com header `X-Request-Id`
- health check com validação real da dependência de banco
- bloqueio de acesso com token de usuário inativo
- guia de avaliação para execução e validação dos fluxos principais
- autorização por cargo no módulo de usuários
- revisão final da documentação de entrega
