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
        path: 'cadastros',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Cadastros',
          descricao: 'Area reservada para produtos, clientes, fornecedores e demais registros base do ERP.',
        },
        title: 'Cadastros | Agenda Assessoria',
      },
      {
        path: 'financeiro',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Financeiro',
          descricao: 'Area reservada para fluxo de caixa, contas a pagar e contas a receber.',
        },
        title: 'Financeiro | Agenda Assessoria',
      },
      {
        path: 'relatorios',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Relatorios',
          descricao: 'Area reservada para visoes gerenciais e indicadores do ERP.',
        },
        title: 'Relatorios | Agenda Assessoria',
      },
      {
        path: 'configuracoes',
        component: PaginaPlaceholderComponent,
        data: {
          titulo: 'Configuracoes',
          descricao: 'Area reservada para parametros operacionais, perfis e preferencias do sistema.',
        },
        title: 'Configuracoes | Agenda Assessoria',
      },
    ],
  },
];
