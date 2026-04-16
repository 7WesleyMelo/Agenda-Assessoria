import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-cadastros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagina-cadastros.component.html',
  styleUrl: './pagina-cadastros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaCadastrosComponent {
  protected readonly modulos = [
    {
      titulo: 'Usuários',
      descricao: 'Gerencie acesso, cargo e status dos usuários internos do ERP.',
      rota: '/erp/cadastros/usuarios',
    },
    {
      titulo: 'Clientes',
      descricao: 'Espaço reservado para o cadastro dos clientes atendidos pelo ERP.',
      rota: '/erp/cadastros',
    },
    {
      titulo: 'Fornecedores',
      descricao: 'Espaço reservado para o cadastro dos fornecedores da operação.',
      rota: '/erp/cadastros',
    },
  ];
}
