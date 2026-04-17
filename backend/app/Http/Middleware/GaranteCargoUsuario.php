<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GaranteCargoUsuario
{
    public function handle(Request $request, Closure $next, string ...$cargosPermitidos): Response
    {
        $usuario = $request->user();

        if (! $usuario || ! in_array($usuario->cargo, $cargosPermitidos, true)) {
            return $this->proibido($request);
        }

        return $next($request);
    }

    private function proibido(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Você não tem permissão para executar esta ação.',
            'request_id' => $request->attributes->get('request_id'),
        ], Response::HTTP_FORBIDDEN);
    }
}
