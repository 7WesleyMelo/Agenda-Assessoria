<?php

use App\Http\Middleware\AdicionaRequestId;
use App\Http\Middleware\AutenticaComJwt;
use App\Http\Middleware\GaranteCargoUsuario;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(AdicionaRequestId::class);

        $middleware->alias([
            'jwt.auth' => AutenticaComJwt::class,
            'cargo' => GaranteCargoUsuario::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (ValidationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Os dados enviados são inválidos.',
                'errors' => $exception->errors(),
                'request_id' => $request->attributes->get('request_id'),
            ], 422);
        });

        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => $exception->getMessage(),
                'request_id' => $request->attributes->get('request_id'),
            ], 401);
        });

        $exceptions->render(function (TooManyRequestsHttpException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Muitas tentativas realizadas. Aguarde um minuto antes de tentar novamente.',
                'request_id' => $request->attributes->get('request_id'),
            ], 429);
        });

        $exceptions->render(function (NotFoundHttpException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Recurso não encontrado.',
                'request_id' => $request->attributes->get('request_id'),
            ], 404);
        });

        $exceptions->render(function (Throwable $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            report($exception);

            return response()->json([
                'message' => 'Ocorreu um erro interno ao processar a requisição.',
                'request_id' => $request->attributes->get('request_id'),
            ], 500);
        });
    })->create();
