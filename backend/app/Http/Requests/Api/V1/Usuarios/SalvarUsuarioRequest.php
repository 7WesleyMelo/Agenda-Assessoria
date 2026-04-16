<?php

namespace App\Http\Requests\Api\V1\Usuarios;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Support\Usuarios\CargosUsuario;

class SalvarUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $usuario = $this->route('usuario');
        $usuarioId = $usuario?->id;

        return [
            'nome' => ['required', 'string', 'min:3', 'max:120'],
            'email' => [
                'required',
                'email',
                'max:160',
                Rule::unique('users', 'email')->ignore($usuarioId),
            ],
            'cargo' => ['required', 'string', Rule::in(CargosUsuario::todos())],
            'ativo' => ['required', 'boolean'],
            'password' => [
                Rule::requiredIf($usuarioId === null),
                'nullable',
                'string',
                'min:6',
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'nome' => 'nome',
            'email' => 'e-mail',
            'cargo' => 'cargo',
            'ativo' => 'status',
            'password' => 'senha',
        ];
    }
}
