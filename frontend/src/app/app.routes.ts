import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/inicio/paginas/pagina-inicial.component').then(
        (module) => module.PaginaInicialComponent
      ),
    title: 'Agenda Assessoria',
  },
];
