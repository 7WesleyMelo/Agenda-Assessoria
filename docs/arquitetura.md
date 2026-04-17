# Arquitetura

## Visão Geral

O projeto foi estruturado como monorepo para concentrar backend, frontend, infraestrutura local e documentação em um único repositório.

Estrutura principal:

- `backend/`: API RESTful em Laravel
- `frontend/`: aplicação Angular
- `infra/`: Dockerfiles, scripts de entrada e suporte operacional
- `docs/`: documentação funcional, técnica e de avaliação

## Objetivo Arquitetural

As decisões do projeto foram orientadas por quatro objetivos:

1. Entregar um fluxo ponta a ponta real de ERP.
2. Manter clareza de responsabilidade entre camadas.
3. Reduzir atrito para o avaliador executar e validar o sistema.
4. Demonstrar maturidade técnica sem complexidade desnecessária.

## Diretrizes Arquiteturais

- API versionada desde o início em `api/v1`
- controllers enxutos no backend
- regras de negócio concentradas em serviços
- validação de entrada em camada dedicada
- serialização de saída em resources
- frontend organizado por funcionalidades
- componentes compartilhados reaproveitáveis para UI
- PostgreSQL como banco relacional principal
- Docker Compose como topologia local única

## Backend

### Estrutura

```text
backend/app/
  Http/
    Controllers/
    Middleware/
    Requests/
    Resources/
  Models/
  Services/
  Support/
```

### Separação de responsabilidades

- `Controllers`: recebem a requisição e orquestram a resposta
- `Requests`: validam payloads
- `Services`: concentram regras de negócio e casos de uso
- `Resources`: definem o contrato de saída da API
- `Middleware`: autenticam, autorizam e tratam preocupação transversal
- `Support`: centraliza valores fixos e artefatos de domínio simples

### Motivo da estrutura

Essa divisão permite manter o backend legível, fácil de evoluir e com baixa mistura entre HTTP, regra de negócio e serialização.

### Decisões pragmáticas

- não foi criada camada de repositório genérico sobre o Eloquent
- não foi usada clean architecture rígida além do necessário
- interfaces foram evitadas onde não havia ponto real de variação

Essas escolhas foram feitas para evitar abstração sem ganho proporcional.

## Frontend

### Estrutura

```text
frontend/src/app/
  core/
  shared/
  features/
```

### Responsabilidades

- `core/`: autenticação, guards, interceptors, configuração da API e serviços transversais
- `shared/`: base reutilizável de UI e componentes de apoio
- `features/`: telas, componentes e serviços ligados ao domínio do ERP

### Organização por feature

O frontend foi estruturado por funcionalidade para facilitar:

- leitura do fluxo
- manutenção por contexto
- reutilização sem acoplamento excessivo
- crescimento futuro sem centralizar tudo em uma pasta genérica

### Componentização

Os principais blocos do ERP foram extraídos em componentes específicos e, posteriormente, em componentes compartilhados de UI:

- `card`
- `drawer`
- `modal`
- `badge`
- `alerta`
- `estado vazio`
- `campo`

### Motivo da base compartilhada

Isso demonstra visão de escala e consistência visual. O objetivo foi evitar repetição estrutural entre páginas e mostrar maturidade de frontend além da montagem de telas isoladas.

## Integração Backend + Frontend

### Contrato

O frontend consome a API Laravel via endpoints versionados em `api/v1`.

Padrões adotados:

- payload de erro consistente
- `request_id` nas respostas de erro
- `X-Request-Id` para rastreabilidade
- autenticação por token Bearer

### Fluxo principal

1. usuário faz login no frontend
2. backend valida credenciais e gera JWT
3. frontend persiste a sessão e redireciona para o ERP
4. frontend consome painel inicial autenticado
5. módulo de usuários consome CRUD protegido por autenticação e autorização

## Banco de Dados

### Escolha do PostgreSQL

O PostgreSQL foi escolhido por:

- boa aderência a aplicações corporativas
- consistência relacional
- integração sólida com Laravel
- adequação ao cenário de ERP administrativo

### Modelagem

A modelagem atual prioriza o fluxo de autenticação e usuários, com campos claros e regras de negócio básicas refletidas em validação e persistência.

## Infraestrutura Local

### Serviços

O `docker-compose.yml` sobe três serviços:

- `db`
- `api`
- `web`

### Motivo

Essa topologia simples reduz atrito de setup e facilita a validação ponta a ponta sem depender de instalação manual do stack local.

### Bootstrap automático

Na inicialização do backend, o container executa:

- `composer install`, quando necessário
- `php artisan migrate --force`
- `php artisan db:seed --class=UsuarioAdministradorSeeder --force`

Isso foi definido para garantir que o avaliador consiga subir e usar o projeto sem descobrir comandos extras.

## Segurança e Observabilidade

### Medidas implementadas

- autenticação JWT
- rate limit no login
- bloqueio de usuário inativo
- autorização por cargo no módulo de usuários
- respostas de erro padronizadas
- `request_id` para rastreabilidade
- health check com validação real do banco

### Motivo

Essas medidas atacam diretamente os pontos que mais pesam em percepção de robustez em um teste técnico sênior.

## Testabilidade

### Backend

A suíte cobre:

- login válido e inválido
- payload inválido
- rate limit
- painel autenticado
- health check
- CRUD de usuários
- regra de não excluir usuário autenticado
- autorização por cargo

### Frontend

A suíte cobre:

- fluxo de login
- tela de usuários
- estado vazio
- modal compartilhado
- acessibilidade básica em pontos críticos

## Decisões que não foram tomadas

Para manter pragmatismo, o projeto deliberadamente não adotou:

- UUID para todas as entidades
- microserviços
- repositórios genéricos
- event sourcing
- arquitetura excessivamente abstrata

## Conclusão

A arquitetura foi pensada para equilibrar:

- clareza
- manutenção
- experiência de avaliação
- qualidade percebida
- simplicidade operacional

O valor principal da solução está na coerência entre as escolhas técnicas e o escopo do problema.
