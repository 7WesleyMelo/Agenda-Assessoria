<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'nome' => 'Agenda Assessoria API',
        'status' => 'online',
        'documentacao' => '/api/v1/saude',
    ]);
});
