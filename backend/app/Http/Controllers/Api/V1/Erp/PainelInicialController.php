<?php

namespace App\Http\Controllers\Api\V1\Erp;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\PainelInicialResource;
use App\Services\PainelInicial\PainelInicialService;
use Illuminate\Http\Request;

class PainelInicialController extends Controller
{
    public function __construct(
        private readonly PainelInicialService $painelInicialService
    ) {}

    public function __invoke(Request $request): PainelInicialResource
    {
        return new PainelInicialResource(
            $this->painelInicialService->montar($request->user())
        );
    }
}
