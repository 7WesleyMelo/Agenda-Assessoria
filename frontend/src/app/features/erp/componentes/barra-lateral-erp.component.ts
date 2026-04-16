import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface ItemMenuErp {
  rota: string;
  rotulo: string;
  icone: string;
  exato?: boolean;
}

@Component({
  selector: 'app-barra-lateral-erp',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-lateral-erp.component.html',
  styleUrl: './barra-lateral-erp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarraLateralErpComponent {
  protected readonly itensMenu: ItemMenuErp[] = [
    { rota: '/erp', rotulo: 'Painel inicial', icone: 'painel', exato: true },
    { rota: '/erp/cadastros', rotulo: 'Cadastros', icone: 'cadastros' },
    { rota: '/erp/financeiro', rotulo: 'Financeiro', icone: 'financeiro' },
    { rota: '/erp/relatorios', rotulo: 'Relatórios', icone: 'relatorios' },
    { rota: '/erp/configuracoes', rotulo: 'Configurações', icone: 'configuracoes' },
  ];
}
