import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cargosUsuario } from '../../../core/modelos/cargo-usuario.model';
import { Usuario } from '../../../core/modelos/usuario.model';
import { CabecalhoUsuariosComponent } from '../componentes/cabecalho-usuarios.component';
import { DrawerUsuarioFormularioComponent } from '../componentes/drawer-usuario-formulario.component';
import { ModalExclusaoUsuarioComponent } from '../componentes/modal-exclusao-usuario.component';
import { TabelaUsuariosComponent } from '../componentes/tabela-usuarios.component';
import { UsuariosFacade } from '../servicos/usuarios.facade';
import { UiAlertaComponent } from '../../../shared/ui/alerta/ui-alerta.component';

@Component({
  selector: 'app-pagina-usuarios',
  standalone: true,
  imports: [
    CabecalhoUsuariosComponent,
    TabelaUsuariosComponent,
    DrawerUsuarioFormularioComponent,
    ModalExclusaoUsuarioComponent,
    UiAlertaComponent,
  ],
  providers: [UsuariosFacade],
  templateUrl: './pagina-usuarios.component.html',
  styleUrl: './pagina-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaUsuariosComponent implements OnInit {
  private static readonly ITENS_POR_PAGINA = 6;

  private readonly formBuilder = inject(FormBuilder);
  private readonly usuariosFacade = inject(UsuariosFacade);

  protected readonly carregando = this.usuariosFacade.carregando;
  protected readonly salvando = this.usuariosFacade.salvando;
  protected readonly excluindo = this.usuariosFacade.excluindo;
  protected readonly usuarios = this.usuariosFacade.usuarios;
  protected readonly mensagemErro = this.usuariosFacade.mensagemErro;
  protected readonly mensagemErroExclusao = this.usuariosFacade.mensagemErroExclusao;
  protected readonly usuarioEmEdicao = signal<Usuario | null>(null);
  protected readonly termoBusca = signal('');
  protected readonly paginaAtual = signal(1);
  protected readonly usuarioPendenteExclusao = signal<Usuario | null>(null);
  protected readonly formularioAberto = signal(false);
  protected readonly cargosDisponiveis = cargosUsuario;

  protected readonly usuariosFiltrados = computed(() => {
    const termo = this.termoBusca().trim().toLowerCase();

    if (termo === '') {
      return this.usuarios();
    }

    return this.usuarios().filter((usuario) =>
      [usuario.nome, usuario.email, usuario.cargo].some((valor) =>
        valor.toLowerCase().includes(termo)
      )
    );
  });

  protected readonly totalPaginas = computed(() => {
    const total = Math.ceil(
      this.usuariosFiltrados().length / PaginaUsuariosComponent.ITENS_POR_PAGINA
    );

    return Math.max(total, 1);
  });

  protected readonly usuariosPaginados = computed(() => {
    const pagina = Math.min(this.paginaAtual(), this.totalPaginas());
    const inicio = (pagina - 1) * PaginaUsuariosComponent.ITENS_POR_PAGINA;
    const fim = inicio + PaginaUsuariosComponent.ITENS_POR_PAGINA;

    return this.usuariosFiltrados().slice(inicio, fim);
  });

  protected readonly formulario = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cargo: ['Administrador', [Validators.required]],
    ativo: [true, [Validators.required]],
    password: [''],
  });

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  protected carregarUsuarios(): void {
    this.usuariosFacade.carregar();
    this.paginaAtual.set(1);
  }

  protected iniciarCadastro(): void {
    this.usuarioEmEdicao.set(null);
    this.formularioAberto.set(true);
    this.formulario.reset({
      nome: '',
      email: '',
      cargo: 'Administrador',
      ativo: true,
      password: '',
    });
    this.usuariosFacade.limparErroPrincipal();
  }

  protected editar(usuario: Usuario): void {
    this.usuarioEmEdicao.set(usuario);
    this.formularioAberto.set(true);
    this.formulario.reset({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      ativo: usuario.ativo,
      password: '',
    });
    this.usuariosFacade.limparErroPrincipal();
  }

  protected salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = this.montarPayload();
    const usuarioEdicao = this.usuarioEmEdicao();
    this.usuariosFacade.salvar(usuarioEdicao?.id ?? null, payload, true, () => {
      this.fecharFormulario();
    });
  }

  protected solicitarExclusao(usuario: Usuario): void {
    this.usuarioPendenteExclusao.set(usuario);
    this.usuariosFacade.limparErroExclusao();
  }

  protected confirmarExclusao(): void {
    const usuario = this.usuarioPendenteExclusao();

    if (!usuario) {
      return;
    }

    this.usuariosFacade.excluir(usuario.id);
  }

  protected cancelarExclusao(): void {
    this.usuarioPendenteExclusao.set(null);
    this.usuariosFacade.limparErroExclusao();
  }

  protected fecharFormulario(): void {
    this.formularioAberto.set(false);
    this.usuarioEmEdicao.set(null);
    this.formulario.reset({
      nome: '',
      email: '',
      cargo: 'Administrador',
      ativo: true,
      password: '',
    });
    this.usuariosFacade.limparErroPrincipal();
  }

  protected atualizarBusca(valor: string): void {
    this.termoBusca.set(valor);
    this.paginaAtual.set(1);
  }

  protected irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) {
      return;
    }

    this.paginaAtual.set(pagina);
  }

  private montarPayload() {
    const valor = this.formulario.getRawValue();
    const usuarioEdicao = this.usuarioEmEdicao();

    return {
      nome: valor.nome,
      email: valor.email,
      cargo: valor.cargo,
      ativo: valor.ativo,
      password: valor.password.trim() === '' && usuarioEdicao ? null : valor.password,
    };
  }
}
