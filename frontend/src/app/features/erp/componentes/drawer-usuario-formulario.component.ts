import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { cargosUsuario, CargoUsuario } from '../../../core/modelos/cargo-usuario.model';
import { UiCampoComponent } from '../../../shared/ui/campo/ui-campo.component';
import { UiDrawerComponent } from '../../../shared/ui/drawer/ui-drawer.component';

@Component({
  selector: 'app-drawer-usuario-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, UiDrawerComponent, UiCampoComponent],
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

  protected campoInvalido(nomeCampo: string): boolean {
    const campo = this.formulario().get(nomeCampo);

    return !!campo && campo.invalid && (campo.touched || campo.dirty);
  }

  protected mensagemErro(nomeCampo: string): string | null {
    const campo = this.formulario().get(nomeCampo);

    if (!campo || !this.campoInvalido(nomeCampo)) {
      return null;
    }

    return this.obterMensagemErro(nomeCampo, campo);
  }

  private obterMensagemErro(nomeCampo: string, campo: AbstractControl): string | null {
    if (campo.hasError('required')) {
      return `Preencha o campo ${this.rotuloCampo(nomeCampo)}.`;
    }

    if (campo.hasError('email')) {
      return 'Informe um e-mail válido.';
    }

    if (campo.hasError('minlength')) {
      if (nomeCampo === 'nome') {
        return 'O nome deve ter pelo menos 3 caracteres.';
      }

      if (nomeCampo === 'password') {
        return 'A senha deve ter pelo menos 6 caracteres.';
      }
    }

    return null;
  }

  private rotuloCampo(nomeCampo: string): string {
    switch (nomeCampo) {
      case 'nome':
        return 'Nome';
      case 'email':
        return 'E-mail';
      case 'cargo':
        return 'Cargo';
      case 'password':
        return this.emEdicao() ? 'Nova senha' : 'Senha inicial';
      default:
        return nomeCampo;
    }
  }
}
