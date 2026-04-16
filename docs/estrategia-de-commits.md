# Estrategia de Commits

## Objetivo

Manter um historico que mostre raciocinio tecnico, evolucao incremental e qualidade de execucao.

## Convencao

Usar commits pequenos e semanticos, com prefixos tecnicos padrao e descricao em pt-BR:

- `chore`
- `docs`
- `feat`
- `fix`
- `refactor`
- `test`
- `ci`

## Sequencia Recomendada Inicial

1. `chore: inicializa estrutura do monorepo e documentos de planejamento`
2. `chore: adiciona estrutura base do docker para desenvolvimento local`
3. `feat: inicializa aplicacao laravel da api`
4. `feat: inicializa aplicacao angular do frontend`
5. `feat: configura integracao com postgres e contratos de ambiente`
6. `feat: implementa primeiro fluxo funcional ponta a ponta`
7. `test: adiciona cobertura de backend e frontend para o primeiro fluxo`
8. `ci: adiciona pipeline de validacao para docker backend e frontend`

## Regras

- Nao juntar multiplas responsabilidades em um unico commit.
- Nao usar mensagens vagas como `ajustes`, `fixes`, `update`.
- Evitar subir experimentos quebrados na `main`.
- Fazer commits por marco tecnico compreensivel.

## Padronizacao Local do Git

- Configurar o terminal e o Git para UTF-8 antes de criar commits com acentos.
- Usar `.gitattributes` para manter finais de linha consistentes no repositorio.
- Preferir `LF` em arquivos de codigo, configuracao e documentacao.
- Se uma mensagem de commit sair com acentuacao corrompida, corrigir imediatamente com `git commit --amend`.
