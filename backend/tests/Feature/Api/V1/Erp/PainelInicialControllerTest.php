<?php

namespace Tests\Feature\Api\V1\Erp;

use App\Models\User;
use App\Services\Autenticacao\JwtService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PainelInicialControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_retorna_painel_inicial_para_usuario_autenticado(): void
    {
        $usuario = User::factory()->create([
            'name' => 'Administrador ERP',
            'cargo' => 'Administrador',
            'ativo' => true,
        ]);

        $token = app(JwtService::class)->gerarToken($usuario);

        $response = $this->withHeader('Authorization', 'Bearer '.$token['token'])
            ->getJson('/api/v1/erp/painel-inicial');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'saudacao',
                'usuario' => ['id', 'nome', 'email', 'cargo'],
                'indicadores',
                'menu_principal',
                'atalhos',
            ]);
    }

    public function test_bloqueia_painel_inicial_sem_token(): void
    {
        $response = $this->getJson('/api/v1/erp/painel-inicial');

        $response
            ->assertUnauthorized()
            ->assertJson([
                'message' => 'Token de acesso não informado.',
            ])
            ->assertJsonStructure([
                'message',
                'request_id',
            ]);
    }

    public function test_bloqueia_painel_inicial_com_usuario_inativo_no_token(): void
    {
        $usuario = User::factory()->create([
            'name' => 'Administrador ERP',
            'cargo' => 'Administrador',
            'ativo' => false,
        ]);

        $token = app(JwtService::class)->gerarToken($usuario);

        $response = $this->withHeader('Authorization', 'Bearer '.$token['token'])
            ->getJson('/api/v1/erp/painel-inicial');

        $response
            ->assertUnauthorized()
            ->assertJson([
                'message' => 'Usuário do token está inativo.',
            ]);
    }
}
