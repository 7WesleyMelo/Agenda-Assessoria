import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModalComponent {
  readonly aberto = input.required<boolean>();
  readonly ariaLabel = input('Janela modal');
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
