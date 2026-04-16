import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { cargosUsuario, CargoUsuario } from '../../../core/modelos/cargo-usuario.model';

@Component({
  selector: 'app-drawer-usuario-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drawer-usuario-formulario.component.html',
  styleUrl: './drawer-usuario-formulario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerUsuarioFormularioComponent {
  readonly aberto = input.required<boolean>();
  readonly emEdicao = input(false);
  readonly salvando = input(false);
  readonly formulario = input.required<FormGroup>();
  readonly cargosDisponiveis = input<readonly CargoUsuario[]>(cargosUsuario);

  readonly fechar = output<void>();
  readonly salvar = output<void>();

  protected fecharDrawer(): void {
    this.fechar.emit();
  }

  protected submeterFormulario(): void {
    this.salvar.emit();
  }
}
