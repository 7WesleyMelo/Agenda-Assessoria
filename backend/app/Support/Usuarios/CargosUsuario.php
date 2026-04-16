<?php

namespace App\Support\Usuarios;

class CargosUsuario
{
    /**
     * @return array<int, string>
     */
    public static function todos(): array
    {
        return [
            'Administrador',
            'Gestor',
            'Operador',
        ];
    }
}
