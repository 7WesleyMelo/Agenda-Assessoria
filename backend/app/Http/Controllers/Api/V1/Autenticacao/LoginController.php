<?php

namespace App\Http\Controllers\Api\V1\Autenticacao;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Autenticacao\LoginRequest;
use App\Http\Resources\Api\V1\UsuarioResource;
use App\Services\Autenticacao\AutenticacaoService;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    public function __construct(
        private readonly AutenticacaoService $autenticacaoService
    ) {}

    public function __invoke(LoginRequest $request): JsonResponse
    {
        $resultado = $this->autenticacaoService->autenticar(
            $request->string('email')->toString(),
            $request->string('password')->toString(),
        );

        return response()->json([
            'access_token' => $resultado['access_token'],
            'token_type' => 'Bearer',
            'expires_in' => $resultado['expires_in'],
            'usuario' => new UsuarioResource($resultado['usuario']),
        ]);
    }
}
