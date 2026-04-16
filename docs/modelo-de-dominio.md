# Modelo de Dominio

## Objetivo

Este documento registra o domínio inicial da solução antes da modelagem física no banco e antes da implementação detalhada dos endpoints.

## Itens a Definir Antes da Implementação Completa

- Entidades centrais do negócio
- Relacionamentos entre entidades
- Regras de negócio obrigatórias
- Campos obrigatórios e opcionais
- Fluxos principais da aplicação
- Operações críticas que exigem auditoria

## Diretrizes de Modelagem

- Modelar primeiro o dominio, depois as tabelas.
- Nomear tabelas e colunas de forma consistente e previsivel.
- Usar constraints no banco para regras criticas.
- Planejar seeds mínimos para ambiente local e testes.
- Definir índices com base em acesso esperado, não por hábito.

## Observações

O modelo detalhado será refinado assim que o escopo funcional final do teste estiver fechado.
