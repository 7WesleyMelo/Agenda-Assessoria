<?php

namespace Database\Seeders;

use App\Models\User;
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
    }
}
