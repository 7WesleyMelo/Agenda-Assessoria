# Arquitetura

## Estrutura Geral

O projeto será organizado como monorepo com quatro áreas principais:

- `backend/`: API Laravel
- `frontend/`: aplicação Angular
- `infra/`: Docker, scripts e configurações de ambiente
- `docs/`: decisões técnicas, contratos e guias de entrega

## Diretrizes Arquiteturais

- Usar Laravel como API RESTful versionada desde o início.
- Manter controllers enxutos e delegar casos de uso para camadas de aplicação.
- Organizar o backend por contexto funcional com separação clara entre entrada HTTP, aplicação, domínio e infraestrutura.
- Estruturar o Angular por funcionalidade, evitando concentrar toda reutilização em uma pasta `shared` genérica.
- Centralizar configuração transversal no frontend em uma camada `core`.
- Tratar PostgreSQL como parte ativa da integridade do sistema, com constraints, índices e naming previsíveis.
- Executar toda a stack local por Docker Compose com topologia simples.

## Limites de Abstração

- Aplicar SOLID com pragmatismo.
- Criar interfaces apenas quando houver ponto real de variação, substituição ou isolamento de dependência.
- Evitar clean architecture excessivamente rígida para um escopo de teste técnico.
- Evitar repositórios genéricos sem ganho claro sobre o Eloquent.

## Convenções Iniciais

- API versionada em `api/v1`.
- Resposta padronizada para sucesso e erro.
- Validação de entrada sempre via camada dedicada.
- Componentes de UI sem regra de negócio pesada.
- Rotas e módulos do frontend definidos por funcionalidade.
