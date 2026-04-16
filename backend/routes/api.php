<?php

use App\Http\Controllers\Api\V1\Autenticacao\LoginController;
use App\Http\Controllers\Api\V1\Autenticacao\PerfilController;
use App\Http\Controllers\Api\V1\Erp\PainelInicialController;
use App\Http\Controllers\Api\V1\HealthCheckController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/saude', HealthCheckController::class);
    Route::post('/auth/login', LoginController::class);

    Route::middleware('jwt.auth')->group(function (): void {
        Route::get('/auth/perfil', PerfilController::class);
        Route::get('/erp/painel-inicial', PainelInicialController::class);
    });
});
