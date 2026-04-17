<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

class HealthCheckController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $banco = 'ok';
        $status = 'ok';

        try {
            DB::connection()->getPdo();
        } catch (Throwable) {
            $banco = 'falha';
            $status = 'degradado';
        }

        $statusHttp = $banco === 'ok' ? 200 : 503;

        return response()->json([
            'status' => $status,
            'servico' => 'agenda-assessoria-api',
            'versao' => 'v1',
            'ambiente' => config('app.env'),
            'timestamp' => now()->toIso8601String(),
            'dependencias' => [
                'banco' => $banco,
            ],
        ], $statusHttp);
    }
}
