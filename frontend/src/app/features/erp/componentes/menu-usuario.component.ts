import { ChangeDetectionStrategy, Component, HostListener, computed, inject, output, signal } from '@angular/core';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { AvatarUsuarioComponent } from './avatar-usuario.component';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [AvatarUsuarioComponent],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuUsuarioComponent {
  private readonly sessaoService = inject(SessaoService);
  protected readonly menuId = 'menu-usuario-dropdown';

  readonly perfil = output<void>();
  readonly sair = output<void>();

  protected readonly dropdownAberto = signal(false);
  protected readonly usuario = computed(() => this.sessaoService.usuario());

  protected alternarDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAberto.update((aberto) => !aberto);
  }

  protected abrirPerfil(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAberto.set(false);
    this.perfil.emit();
  }

  protected solicitarSaida(): void {
    this.dropdownAberto.set(false);
    this.sair.emit();
  }

  @HostListener('document:click')
  protected fecharDropdown(): void {
    this.dropdownAberto.set(false);
  }

  @HostListener('document:keydown.escape')
  protected fecharDropdownAoPressionarEsc(): void {
    this.dropdownAberto.set(false);
  }
}
