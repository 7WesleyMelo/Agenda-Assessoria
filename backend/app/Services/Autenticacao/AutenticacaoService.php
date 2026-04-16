<?php

namespace App\Services\Autenticacao;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

class AutenticacaoService
{
    public function __construct(
        private readonly JwtService $jwtService
    ) {}

    /**
     * @return array{access_token:string, expires_in:int, usuario:User}
     */
    public function autenticar(string $email, string $senha): array
    {
        $usuario = User::query()
            ->where('email', $email)
            ->where('ativo', true)
            ->first();

        if (! $usuario || ! Hash::check($senha, $usuario->password)) {
            throw new AuthenticationException('Credenciais inválidas.');
        }

        $token = $this->jwtService->gerarToken($usuario);

        return [
            'access_token' => $token['token'],
            'expires_in' => $token['expires_in'],
            'usuario' => $usuario,
        ];
    }
}
