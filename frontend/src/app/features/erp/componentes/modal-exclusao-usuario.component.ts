import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Usuario } from '../../../core/modelos/usuario.model';
import { UiModalComponent } from '../../../shared/ui/modal/ui-modal.component';

@Component({
  selector: 'app-modal-exclusao-usuario',
  standalone: true,
  imports: [UiModalComponent],
  templateUrl: './modal-exclusao-usuario.component.html',
  styleUrl: './modal-exclusao-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExclusaoUsuarioComponent {
  readonly usuario = input<Usuario | null>(null);
  readonly excluindo = input(false);
  readonly mensagemErro = input<string | null>(null);

  readonly confirmar = output<void>();
  readonly cancelar = output<void>();

  protected cancelarModal(): void {
    this.cancelar.emit();
  }

  protected confirmarExclusao(): void {
    this.confirmar.emit();
  }
}
