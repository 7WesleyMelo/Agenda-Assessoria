import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Usuario } from '../../../core/modelos/usuario.model';

@Component({
  selector: 'app-tabela-usuarios',
  standalone: true,
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabelaUsuariosComponent {
  readonly carregando = input(false);
  readonly usuarios = input.required<Usuario[]>();
  readonly paginaAtual = input.required<number>();
  readonly totalPaginas = input.required<number>();

  readonly editar = output<Usuario>();
  readonly excluir = output<Usuario>();
  readonly paginaAlterada = output<number>();

  protected readonly possuiUsuarios = computed(() => this.usuarios().length > 0);

  protected obterIniciais(nome: string): string {
    return nome
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() ?? '')
      .join('');
  }

  protected solicitarEdicao(usuario: Usuario): void {
    this.editar.emit(usuario);
  }

  protected solicitarExclusao(usuario: Usuario): void {
    this.excluir.emit(usuario);
  }

  protected irParaPagina(pagina: number): void {
    this.paginaAlterada.emit(pagina);
  }
}
