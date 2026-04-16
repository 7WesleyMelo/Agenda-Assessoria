<?php

namespace App\Http\Controllers\Api\V1\Autenticacao;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\UsuarioResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PerfilController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return response()->json([
            'usuario' => new UsuarioResource($request->user()),
        ]);
    }
}
