# Arquitetura

## Estrutura Geral

O projeto sera organizado como monorepo com quatro areas principais:

- `backend/`: API Laravel
- `frontend/`: aplicacao Angular
- `infra/`: Docker, scripts e configuracoes de ambiente
- `docs/`: decisoes tecnicas, contratos e guias de entrega

## Diretrizes Arquiteturais

- Usar Laravel como API RESTful versionada desde o inicio.
- Manter controllers enxutos e delegar casos de uso para camadas de aplicacao.
- Organizar o backend por contexto funcional com separacao clara entre entrada HTTP, aplicacao, dominio e infraestrutura.
- Estruturar o Angular por funcionalidade, evitando concentrar toda reutilizacao em uma pasta `shared` generica.
- Centralizar configuracao transversal no frontend em uma camada `core`.
- Tratar PostgreSQL como parte ativa da integridade do sistema, com constraints, indices e naming previsiveis.
- Executar toda a stack local por Docker Compose com topologia simples.

## Limites de Abstracao

- Aplicar SOLID com pragmatismo.
- Criar interfaces apenas quando houver ponto real de variacao, substituicao ou isolamento de dependencia.
- Evitar clean architecture excessivamente rigida para um escopo de teste tecnico.
- Evitar repositarios genericos sem ganho claro sobre o Eloquent.

## Convencoes Iniciais

- API versionada em `api/v1`.
- Resposta padronizada para sucesso e erro.
- Validacao de entrada sempre via camada dedicada.
- Componentes de UI sem regra de negocio pesada.
- Rotas e modulos do frontend definidos por funcionalidade.
