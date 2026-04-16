import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { BarraLateralErpComponent } from '../componentes/barra-lateral-erp.component';
import { MenuUsuarioComponent } from '../componentes/menu-usuario.component';

@Component({
  selector: 'app-layout-erp',
  standalone: true,
  imports: [RouterOutlet, BarraLateralErpComponent, MenuUsuarioComponent],
  templateUrl: './layout-erp.component.html',
  styleUrl: './layout-erp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutErpComponent {
  private readonly router = inject(Router);
  protected readonly sessaoService = inject(SessaoService);

  protected abrirPerfil(): void {
    void this.router.navigate(['/erp/perfil']);
  }

  protected sair(): void {
    this.sessaoService.encerrarSessao();
    void this.router.navigate(['/login']);
  }
}
