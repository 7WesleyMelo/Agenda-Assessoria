import { Routes } from '@angular/router';
import { authGuard } from './core/autenticacao/guards/auth.guard';
import { guestGuard } from './core/autenticacao/guards/guest.guard';
import { LayoutErpComponent } from './features/erp/layouts/layout-erp.component';
import { PaginaPlaceholderComponent } from './features/erp/paginas/pagina-placeholder.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/autenticacao/paginas/pagina-login.component').then(
        (module) => module.PaginaLoginComponent
      ),
    title: 'Login | Agenda Assessoria',
  },
  {
    path: 'erp',
    canActivate: [authGuard],
    component: LayoutErpComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/erp/paginas/pagina-painel-inicial-erp.component').then(
            (module) => module.PaginaPainelInicialErpComponent
          ),
        title: 'Painel Inicial | Agenda Assessoria',
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/autenticacao/paginas/pagina-perfil.component').then(
            (module) => module.PaginaPerfilComponent
          ),
        title: 'Perfil | Agenda Assessoria',
      },
      {
        path: 'cadastros',
        loadComponent: () =>
          import('./features/erp/paginas/pagina-cadastros.component').then(
            (module) => module.PaginaCadastrosComponent
          ),
        title: 'Cadastros | Agenda Assessoria',
      },
      {
        path: 'cadastros/usuarios',
        loadComponent: () =>
          import('./features/erp/paginas/pagina-usuarios.component').then(
            (module) => module.PaginaUsuariosComponent
          ),
        title: 'Usuários | Agenda Assessoria',
      },
      {
        path: 'financeiro',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Financeiro',
          descricao: 'Área reservada para fluxo de caixa, contas a pagar e contas a receber.',
        },
        title: 'Financeiro | Agenda Assessoria',
      },
      {
        path: 'relatorios',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Relatórios',
          descricao: 'Área reservada para visões gerenciais e indicadores do ERP.',
        },
        title: 'Relatórios | Agenda Assessoria',
      },
      {
        path: 'configuracoes',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Configurações',
          descricao: 'Área reservada para parâmetros operacionais, perfis e preferências do sistema.',
        },
        title: 'Configurações | Agenda Assessoria',
      },
    ],
  },
];
