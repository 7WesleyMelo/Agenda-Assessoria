# Estrategia de Commits

## Objetivo

Manter um histórico que mostre raciocínio técnico, evolução incremental e qualidade de execução.

## Convenção

Usar commits pequenos e semânticos, com prefixos técnicos padrão e descrição em pt-BR:

- `chore`
- `docs`
- `feat`
- `fix`
- `refactor`
- `test`
- `ci`

## Sequência Recomendada Inicial

1. `chore: inicializa estrutura do monorepo e documentos de planejamento`
2. `chore: adiciona estrutura base do docker para desenvolvimento local`
3. `feat: inicializa aplicação laravel da api`
4. `feat: inicializa aplicação angular do frontend`
5. `feat: configura integracao com postgres e contratos de ambiente`
6. `feat: implementa primeiro fluxo funcional ponta a ponta`
7. `test: adiciona cobertura de backend e frontend para o primeiro fluxo`
8. `ci: adiciona pipeline de validação para docker backend e frontend`

## Regras

- Não juntar múltiplas responsabilidades em um único commit.
- Não usar mensagens vagas como `ajustes`, `fixes`, `update`.
- Evitar subir experimentos quebrados na `main`.
- Fazer commits por marco técnico compreensível.

## Padronização Local do Git

- Configurar o terminal e o Git para UTF-8 antes de criar commits com acentos.
- Usar `.gitattributes` para manter finais de linha consistentes no repositório.
- Preferir `LF` em arquivos de código, configuração e documentação.
- Se uma mensagem de commit sair com acentuação corrompida, corrigir imediatamente com `git commit --amend`.
