import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
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
  protected readonly dropdownAberto = signal(false);

  protected readonly iniciaisUsuario = computed(() => {
    const nome = this.sessaoService.usuario()?.nome?.trim() ?? '';

    if (!nome) {
      return 'AA';
    }

    return nome
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() ?? '')
      .join('');
  });

  protected readonly avatarUsuario = computed(() => {
    const iniciais = this.iniciaisUsuario();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
        <defs>
          <linearGradient id="fundo" x1="10" y1="10" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop stop-color="#C46A2A"/>
            <stop offset="1" stop-color="#1F6F5F"/>
          </linearGradient>
        </defs>
        <rect width="96" height="96" rx="48" fill="url(#fundo)"/>
        <circle cx="48" cy="36" r="17" fill="#F7EEE1" fill-opacity="0.95"/>
        <path d="M22 81c3.6-15.4 14.9-23 26-23s22.4 7.6 26 23" fill="#F7EEE1" fill-opacity="0.95"/>
        <text x="48" y="86" text-anchor="middle" fill="#173647" font-size="14" font-weight="800" font-family="Arial, sans-serif">${iniciais}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  });

  protected alternarDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAberto.update((aberto) => !aberto);
  }

  protected abrirPerfil(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAberto.set(false);
    void this.router.navigate(['/erp/perfil']);
  }

  protected sair(): void {
    this.dropdownAberto.set(false);
    this.sessaoService.encerrarSessao();
    void this.router.navigate(['/login']);
  }

  @HostListener('document:click')
  protected fecharDropdown(): void {
    this.dropdownAberto.set(false);
  }
}
