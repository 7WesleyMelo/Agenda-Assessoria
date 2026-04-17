<?php

namespace Tests\Feature\Api\V1\Usuarios;

use App\Models\User;
use App\Services\Autenticacao\JwtService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsuarioControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_usuarios(): void
    {
        [, $token] = $this->autenticarComoAdministrador();

        User::factory()->count(2)->create();

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/v1/usuarios');

        $response
            ->assertOk()
            ->assertJsonCount(3)
            ->assertJsonStructure([
                '*' => ['id', 'nome', 'email', 'cargo', 'ativo'],
            ]);
    }

    public function test_cria_usuario(): void
    {
        [, $token] = $this->autenticarComoAdministrador();

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/v1/usuarios', [
                'nome' => 'Maria Operadora',
                'email' => 'maria@agendaassessoria.com.br',
                'cargo' => 'Operador',
                'ativo' => true,
                'password' => '123456',
            ]);

        $response
            ->assertCreated()
            ->assertJson([
                'nome' => 'Maria Operadora',
                'email' => 'maria@agendaassessoria.com.br',
                'cargo' => 'Operador',
                'ativo' => true,
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'maria@agendaassessoria.com.br',
        ]);
    }

    public function test_atualiza_usuario(): void
    {
        [, $token] = $this->autenticarComoAdministrador();
        $usuario = User::factory()->create([
            'name' => 'Maria Operadora',
            'cargo' => 'Operador',
            'ativo' => true,
        ]);

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->putJson("/api/v1/usuarios/{$usuario->id}", [
                'nome' => 'Maria Gestora',
                'email' => $usuario->email,
                'cargo' => 'Gestor',
                'ativo' => false,
                'password' => null,
            ]);

        $response
            ->assertOk()
            ->assertJson([
                'nome' => 'Maria Gestora',
                'cargo' => 'Gestor',
                'ativo' => false,
            ]);
    }

    public function test_exclui_usuario_diferente_do_autenticado(): void
    {
        [, $token] = $this->autenticarComoAdministrador();
        $usuario = User::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->deleteJson("/api/v1/usuarios/{$usuario->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('users', [
            'id' => $usuario->id,
        ]);
    }

    public function test_nao_permite_excluir_usuario_autenticado(): void
    {
        [$usuarioAutenticado, $token] = $this->autenticarComoAdministrador();

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->deleteJson("/api/v1/usuarios/{$usuarioAutenticado->id}");

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['usuario']);
    }

    public function test_bloqueia_crud_de_usuarios_para_cargo_sem_permissao(): void
    {
        $usuario = User::factory()->create([
            'cargo' => 'Operador',
            'ativo' => true,
        ]);

        $token = app(JwtService::class)->gerarToken($usuario);

        $response = $this->withHeader('Authorization', 'Bearer '.$token['token'])
            ->getJson('/api/v1/usuarios');

        $response
            ->assertForbidden()
            ->assertJson([
                'message' => 'Você não tem permissão para executar esta ação.',
            ])
            ->assertJsonStructure([
                'message',
                'request_id',
            ]);
    }

    /**
     * @return array{0:User,1:string}
     */
    private function autenticarComoAdministrador(): array
    {
        $usuario = User::factory()->create([
            'name' => 'Administrador ERP',
            'email' => 'admin@agendaassessoria.com.br',
            'cargo' => 'Administrador',
            'ativo' => true,
            'password' => '123456',
        ]);

        $token = app(JwtService::class)->gerarToken($usuario);

        return [$usuario, $token['token']];
    }
}
