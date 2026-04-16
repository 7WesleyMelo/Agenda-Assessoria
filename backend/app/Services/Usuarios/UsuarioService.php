<?php

namespace App\Services\Usuarios;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class UsuarioService
{
    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): User
    {
        return User::query()->create([
            'name' => $dados['nome'],
            'email' => $dados['email'],
            'cargo' => $dados['cargo'],
            'ativo' => $dados['ativo'],
            'password' => $dados['password'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(User $usuario, array $dados): User
    {
        $usuario->fill([
            'name' => $dados['nome'],
            'email' => $dados['email'],
            'cargo' => $dados['cargo'],
            'ativo' => $dados['ativo'],
        ]);

        if (! empty($dados['password'])) {
            $usuario->password = $dados['password'];
        }

        $usuario->save();

        return $usuario->refresh();
    }

    public function excluir(User $usuario, User $usuarioAutenticado): void
    {
        if ($usuario->is($usuarioAutenticado)) {
            throw ValidationException::withMessages([
                'usuario' => 'Não é permitido excluir o usuário autenticado.',
            ]);
        }

        $usuario->delete();
    }
}
