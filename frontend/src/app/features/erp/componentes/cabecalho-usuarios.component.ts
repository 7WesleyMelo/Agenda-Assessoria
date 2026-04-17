import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UiCardComponent } from '../../../shared/ui/card/ui-card.component';

@Component({
  selector: 'app-cabecalho-usuarios',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './cabecalho-usuarios.component.html',
  styleUrl: './cabecalho-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabecalhoUsuariosComponent {
  readonly totalRegistros = input.required<number>();
  readonly termoBusca = input('');
  readonly novoUsuario = output<void>();
  readonly buscaAlterada = output<string>();

  protected atualizarBusca(event: Event): void {
    this.buscaAlterada.emit((event.target as HTMLInputElement).value);
  }

  protected emitirNovoUsuario(): void {
    this.novoUsuario.emit();
  }
}
