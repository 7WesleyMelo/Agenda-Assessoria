<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PainelInicialResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'saudacao' => $this['saudacao'],
            'usuario' => new UsuarioResource($this['usuario']),
            'indicadores' => $this['indicadores'],
            'menu_principal' => $this['menu_principal'],
            'atalhos' => $this['atalhos'],
        ];
    }
}
