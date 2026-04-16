<?php

namespace App\Services\Autenticacao;

use App\Models\User;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Throwable;

class JwtService
{
    private const ALGORITMO = 'HS256';

    /**
     * @return array{token:string, expires_in:int}
     */
    public function gerarToken(User $usuario): array
    {
        $agora = now();
        $expiracaoEmSegundos = (int) config('jwt.ttl');

        $payload = [
            'iss' => config('app.url'),
            'sub' => $usuario->id,
            'iat' => $agora->timestamp,
            'exp' => $agora->copy()->addSeconds($expiracaoEmSegundos)->timestamp,
        ];

        return [
            'token' => JWT::encode($payload, $this->chaveSecreta(), self::ALGORITMO),
            'expires_in' => $expiracaoEmSegundos,
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function decodificar(string $token): ?array
    {
        try {
            $decodificado = JWT::decode($token, new Key($this->chaveSecreta(), self::ALGORITMO));

            return (array) $decodificado;
        } catch (ExpiredException|Throwable) {
            return null;
        }
    }

    private function chaveSecreta(): string
    {
        $chaveConfigurada = (string) config('jwt.secret');

        if ($chaveConfigurada !== '') {
            return $chaveConfigurada;
        }

        return hash('sha256', (string) config('app.key'));
    }
}
