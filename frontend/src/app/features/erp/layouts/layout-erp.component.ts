import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';

@Component({
  selector: 'app-layout-erp',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-erp.component.html',
  styleUrl: './layout-erp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutErpComponent {
  private readonly router = inject(Router);
  protected readonly sessaoService = inject(SessaoService);

  protected sair(): void {
    this.sessaoService.encerrarSessao();
    void this.router.navigate(['/login']);
  }
}
