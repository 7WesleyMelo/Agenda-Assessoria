<?php

namespace Database\Seeders;

use App\Models\User;
use App\Support\Usuarios\CargosUsuario;
use Illuminate\Database\Seeder;

class UsuarioAdministradorSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@agendaassessoria.com.br'],
            [
                'name' => 'Administrador ERP',
                'cargo' => 'Administrador',
                'ativo' => true,
                'password' => '123456',
            ]
        );

        $cargos = CargosUsuario::todos();

        foreach (range(1, 20) as $indice) {
            $cargo = $cargos[($indice - 1) % count($cargos)];

            User::query()->updateOrCreate(
                ['email' => sprintf('usuario%02d@agendaassessoria.com.br', $indice)],
                [
                    'name' => sprintf('Usuário %02d', $indice),
                    'cargo' => $cargo,
                    'ativo' => true,
                    'password' => '123456',
                ]
            );
        }
    }
}
