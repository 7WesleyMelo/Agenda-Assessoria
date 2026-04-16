import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-avatar-usuario',
  standalone: true,
  template: `
    <span class="avatar" [class.avatar--grande]="grande()" [attr.aria-label]="rotuloAria()">
      {{ iniciais() }}
    </span>
  `,
  styleUrl: './avatar-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarUsuarioComponent {
  readonly nome = input<string | null>(null);
  readonly grande = input(false);

  protected readonly iniciais = computed(() => {
    const nome = this.nome()?.trim() ?? '';

    if (!nome) {
      return 'AA';
    }

    return nome
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() ?? '')
      .join('');
  });

  protected readonly rotuloAria = computed(() => {
    const nome = this.nome()?.trim();

    return nome ? `Avatar do usuário ${nome}` : 'Avatar do usuário';
  });
}
