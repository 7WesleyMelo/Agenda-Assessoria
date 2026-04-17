import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-ui-drawer',
  standalone: true,
  templateUrl: './ui-drawer.component.html',
  styleUrl: './ui-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDrawerComponent {
  readonly aberto = input.required<boolean>();
  readonly ariaLabel = input('Painel lateral');
  readonly fechar = output<void>();

  protected solicitarFechamento(): void {
    this.fechar.emit();
  }

  @HostListener('document:keydown.escape')
  protected fecharAoPressionarEsc(): void {
    if (this.aberto()) {
      this.solicitarFechamento();
    }
  }
}
