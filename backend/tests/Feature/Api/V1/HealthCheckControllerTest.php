<?php

namespace Tests\Feature\Api\V1;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HealthCheckControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_retorna_status_da_api_e_dependencia_do_banco(): void
    {
        $response = $this->getJson('/api/v1/saude');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'status',
                'servico',
                'versao',
                'ambiente',
                'timestamp',
                'dependencias' => ['banco'],
            ])
            ->assertJson([
                'status' => 'ok',
                'dependencias' => [
                    'banco' => 'ok',
                ],
            ])
            ->assertHeader('X-Request-Id');
    }
}
