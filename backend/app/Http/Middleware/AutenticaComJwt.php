<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\Autenticacao\JwtService;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AutenticaComJwt
{
    public function __construct(
        private readonly JwtService $jwtService
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return $this->naoAutorizado($request, 'Token de acesso não informado.');
        }

        $payload = $this->jwtService->decodificar($token);

        if (! $payload || empty($payload['sub'])) {
            return $this->naoAutorizado($request, 'Token de acesso inválido ou expirado.');
        }

        $usuario = User::query()->find($payload['sub']);

        if (! $usuario) {
            return $this->naoAutorizado($request, 'Usuário do token não encontrado.');
        }

        if (! $usuario->ativo) {
            return $this->naoAutorizado($request, 'Usuário do token está inativo.');
        }

        $request->setUserResolver(static fn (): User => $usuario);

        return $next($request);
    }

    private function naoAutorizado(Request $request, string $mensagem): JsonResponse
    {
        return response()->json([
            'message' => $mensagem,
            'request_id' => $request->attributes->get('request_id'),
        ], Response::HTTP_UNAUTHORIZED);
    }
}
