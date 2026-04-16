<?php

namespace App\Services\PainelInicial;

use App\Models\User;

class PainelInicialService
{
    /**
     * @return array<string, mixed>
     */
    public function montar(User $usuario): array
    {
        return [
            'saudacao' => "Bem-vindo de volta, {$usuario->name}.",
            'usuario' => $usuario,
            'indicadores' => [
                [
                    'titulo' => 'Pedidos em aberto',
                    'valor' => 18,
                    'variacao' => '+12%',
                ],
                [
                    'titulo' => 'Contas a receber hoje',
                    'valor' => 'R$ 28.400,00',
                    'variacao' => '+4%',
                ],
                [
                    'titulo' => 'Ordens em andamento',
                    'valor' => 7,
                    'variacao' => '-1%',
                ],
                [
                    'titulo' => 'Clientes ativos',
                    'valor' => 126,
                    'variacao' => '+9%',
                ],
            ],
            'menu_principal' => [
                ['rotulo' => 'Painel inicial', 'icone' => 'dashboard', 'rota' => '/erp'],
                ['rotulo' => 'Cadastros', 'icone' => 'inventory', 'rota' => '/erp/cadastros'],
                ['rotulo' => 'Financeiro', 'icone' => 'payments', 'rota' => '/erp/financeiro'],
                ['rotulo' => 'Relatórios', 'icone' => 'assessment', 'rota' => '/erp/relatorios'],
                ['rotulo' => 'Configurações', 'icone' => 'settings', 'rota' => '/erp/configuracoes'],
            ],
            'atalhos' => [
                ['titulo' => 'Novo cliente', 'descricao' => 'Cadastrar um novo cliente no ERP.'],
                ['titulo' => 'Nova ordem', 'descricao' => 'Registrar uma nova ordem operacional.'],
                ['titulo' => 'Fechamento financeiro', 'descricao' => 'Acompanhar o caixa e os recebimentos do dia.'],
            ],
        ];
    }
}
