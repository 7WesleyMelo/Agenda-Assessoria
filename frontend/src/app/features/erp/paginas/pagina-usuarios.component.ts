import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { Usuario } from '../../../core/modelos/usuario.model';
import { PayloadSalvarUsuario, UsuariosApiService } from '../servicos/usuarios-api.service';

@Component({
  selector: 'app-pagina-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pagina-usuarios.component.html',
  styleUrl: './pagina-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaUsuariosComponent implements OnInit {
  private static readonly ITENS_POR_PAGINA = 6;

  private readonly formBuilder = inject(FormBuilder);
  private readonly usuariosApiService = inject(UsuariosApiService);
  private readonly sessaoService = inject(SessaoService);

  protected readonly carregando = signal(true);
  protected readonly salvando = signal(false);
  protected readonly usuarios = signal<Usuario[]>([]);
  protected readonly mensagemErro = signal<string | null>(null);
  protected readonly usuarioEmEdicao = signal<Usuario | null>(null);
  protected readonly termoBusca = signal('');
  protected readonly paginaAtual = signal(1);
  protected readonly usuarioPendenteExclusao = signal<Usuario | null>(null);

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
    cargo: ['', [Validators.required, Validators.minLength(3)]],
    ativo: [true, [Validators.required]],
    password: [''],
  });

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  protected carregarUsuarios(): void {
    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.usuariosApiService.listar().subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios);
        this.paginaAtual.set(1);
        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro.set(erro.error?.message ?? 'Nao foi possivel carregar os usuarios.');
        this.carregando.set(false);
      },
    });
  }

  protected iniciarCadastro(): void {
    this.usuarioEmEdicao.set(null);
    this.formulario.reset({
      nome: '',
      email: '',
      cargo: '',
      ativo: true,
      password: '',
    });
    this.mensagemErro.set(null);
  }

  protected editar(usuario: Usuario): void {
    this.usuarioEmEdicao.set(usuario);
    this.formulario.reset({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      ativo: usuario.ativo,
      password: '',
    });
    this.mensagemErro.set(null);
  }

  protected salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    this.mensagemErro.set(null);

    const payload = this.montarPayload();
    const usuarioEdicao = this.usuarioEmEdicao();

    const requisicao = usuarioEdicao
      ? this.usuariosApiService.atualizar(usuarioEdicao.id, payload)
      : this.usuariosApiService.criar(payload);

    requisicao.subscribe({
      next: (usuario) => {
        if (this.sessaoService.usuario()?.id === usuario.id) {
          this.sessaoService.definirUsuario(usuario);
        }

        this.salvando.set(false);
        this.iniciarCadastro();
        this.carregarUsuarios();
      },
      error: (erro: HttpErrorResponse) => {
        this.salvando.set(false);
        this.mensagemErro.set(
          erro.error?.message ??
            erro.error?.errors?.usuario?.[0] ??
            'Nao foi possivel salvar o usuario.'
        );
      },
    });
  }

  protected solicitarExclusao(usuario: Usuario): void {
    this.usuarioPendenteExclusao.set(usuario);
  }

  protected confirmarExclusao(): void {
    const usuario = this.usuarioPendenteExclusao();

    if (!usuario) {
      return;
    }

    this.mensagemErro.set(null);

    this.usuariosApiService.excluir(usuario.id).subscribe({
      next: () => {
        this.usuarioPendenteExclusao.set(null);
        this.carregarUsuarios();
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro.set(
          erro.error?.message ??
            erro.error?.errors?.usuario?.[0] ??
            'Nao foi possivel excluir o usuario.'
        );
      },
    });
  }

  protected cancelarExclusao(): void {
    this.usuarioPendenteExclusao.set(null);
  }

  protected cancelarEdicao(): void {
    this.iniciarCadastro();
  }

  protected atualizarBusca(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.termoBusca.set(valor);
    this.paginaAtual.set(1);
  }

  protected irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) {
      return;
    }

    this.paginaAtual.set(pagina);
  }

  private montarPayload(): PayloadSalvarUsuario {
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
