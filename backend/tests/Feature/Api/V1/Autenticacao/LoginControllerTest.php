<?php

namespace Tests\Feature\Api\V1\Autenticacao;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_realiza_login_com_credenciais_validas(): void
    {
        User::factory()->create([
            'name' => 'Administrador ERP',
            'email' => 'admin@agendaassessoria.com.br',
            'cargo' => 'Administrador',
            'ativo' => true,
            'password' => '123456',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@agendaassessoria.com.br',
            'password' => '123456',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
                'usuario' => ['id', 'nome', 'email', 'cargo'],
            ]);
    }

    public function test_nao_realiza_login_com_credenciais_invalidas(): void
    {
        User::factory()->create([
            'email' => 'admin@agendaassessoria.com.br',
            'ativo' => true,
            'password' => '123456',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@agendaassessoria.com.br',
            'password' => 'senha-invalida',
        ]);

        $response
            ->assertUnauthorized()
            ->assertJson([
                'message' => 'Credenciais inválidas.',
            ]);
    }
}
