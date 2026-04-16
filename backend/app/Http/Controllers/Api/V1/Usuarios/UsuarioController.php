<?php

namespace App\Http\Controllers\Api\V1\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Usuarios\SalvarUsuarioRequest;
use App\Http\Resources\Api\V1\UsuarioResource;
use App\Models\User;
use App\Services\Usuarios\UsuarioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends Controller
{
    public function __construct(
        private readonly UsuarioService $usuarioService
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $usuarios = User::query()
            ->orderBy('name')
            ->get();

        return UsuarioResource::collection($usuarios);
    }

    public function store(SalvarUsuarioRequest $request): UsuarioResource
    {
        $usuario = $this->usuarioService->criar($request->validated());

        return new UsuarioResource($usuario);
    }

    public function update(SalvarUsuarioRequest $request, User $usuario): UsuarioResource
    {
        $usuario = $this->usuarioService->atualizar($usuario, $request->validated());

        return new UsuarioResource($usuario);
    }

    public function destroy(Request $request, User $usuario): JsonResponse
    {
        $this->usuarioService->excluir($usuario, $request->user());

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
