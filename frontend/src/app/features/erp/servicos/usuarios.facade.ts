import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { Usuario } from '../../../core/modelos/usuario.model';
import { PayloadSalvarUsuario, UsuariosApiService } from './usuarios-api.service';

@Injectable()
export class UsuariosFacade {
  private readonly usuariosApiService = inject(UsuariosApiService);
  private readonly sessaoService = inject(SessaoService);

  private readonly usuariosState = signal<Usuario[]>([]);
  private readonly carregandoState = signal(true);
  private readonly salvandoState = signal(false);
  private readonly excluindoState = signal(false);
  private readonly mensagemErroState = signal<string | null>(null);
  private readonly mensagemErroExclusaoState = signal<string | null>(null);

  readonly usuarios = computed(() => this.usuariosState());
  readonly carregando = computed(() => this.carregandoState());
  readonly salvando = computed(() => this.salvandoState());
  readonly excluindo = computed(() => this.excluindoState());
  readonly mensagemErro = computed(() => this.mensagemErroState());
  readonly mensagemErroExclusao = computed(() => this.mensagemErroExclusaoState());

  carregar(): void {
    this.carregandoState.set(true);
    this.mensagemErroState.set(null);

    this.usuariosApiService.listar().subscribe({
      next: (usuarios) => {
        this.usuariosState.set(usuarios);
        this.carregandoState.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErroState.set(
          erro.error?.message ?? 'Não foi possível carregar os usuários.'
        );
        this.carregandoState.set(false);
      },
    });
  }

  salvar(
    usuarioId: number | null,
    payload: PayloadSalvarUsuario,
    atualizarSessao: boolean,
    onSuccess?: () => void
  ): void {
    this.salvandoState.set(true);
    this.mensagemErroState.set(null);

    const requisicao = usuarioId
      ? this.usuariosApiService.atualizar(usuarioId, payload)
      : this.usuariosApiService.criar(payload);

    requisicao.subscribe({
      next: (usuario) => {
        if (atualizarSessao && this.sessaoService.usuario()?.id === usuario.id) {
          this.sessaoService.definirUsuario(usuario);
        }

        this.salvandoState.set(false);
        onSuccess?.();
        this.carregar();
      },
      error: (erro: HttpErrorResponse) => {
        this.salvandoState.set(false);
        this.mensagemErroState.set(
          erro.error?.message ??
            erro.error?.errors?.usuario?.[0] ??
            'Não foi possível salvar o usuário.'
        );
      },
    });
  }

  excluir(usuarioId: number): void {
    this.excluindoState.set(true);
    this.mensagemErroExclusaoState.set(null);

    this.usuariosApiService.excluir(usuarioId).subscribe({
      next: () => {
        this.excluindoState.set(false);
        this.mensagemErroExclusaoState.set(null);
        this.carregar();
      },
      error: (erro: HttpErrorResponse) => {
        this.excluindoState.set(false);
        this.mensagemErroExclusaoState.set(
          erro.error?.message ??
            erro.error?.errors?.usuario?.[0] ??
            'Não foi possível excluir o usuário.'
        );
      },
    });
  }

  limparErroPrincipal(): void {
    this.mensagemErroState.set(null);
  }

  limparErroExclusao(): void {
    this.mensagemErroExclusaoState.set(null);
    this.excluindoState.set(false);
  }
}
