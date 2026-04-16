import { Injectable, computed, signal } from '@angular/core';
import { RespostaLogin } from '../../modelos/autenticacao.model';
import { Usuario } from '../../modelos/usuario.model';

const CHAVE_TOKEN = 'agenda.assessoria.token';
const CHAVE_USUARIO = 'agenda.assessoria.usuario';

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private readonly tokenState = signal<string | null>(localStorage.getItem(CHAVE_TOKEN));
  private readonly usuarioState = signal<Usuario | null>(this.obterUsuarioPersistido());

  readonly token = computed(() => this.tokenState());
  readonly usuario = computed(() => this.usuarioState());
  readonly autenticado = computed(() => !!this.tokenState() && !!this.usuarioState());

  iniciarSessao(resposta: RespostaLogin): void {
    this.tokenState.set(resposta.access_token);
    this.definirUsuario(resposta.usuario);

    localStorage.setItem(CHAVE_TOKEN, resposta.access_token);
  }

  definirUsuario(usuario: Usuario): void {
    this.usuarioState.set(usuario);
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
  }

  encerrarSessao(): void {
    this.tokenState.set(null);
    this.usuarioState.set(null);

    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
  }

  private obterUsuarioPersistido(): Usuario | null {
    const conteudo = localStorage.getItem(CHAVE_USUARIO);

    if (!conteudo) {
      return null;
    }

    try {
      return JSON.parse(conteudo) as Usuario;
    } catch {
      localStorage.removeItem(CHAVE_USUARIO);
      return null;
    }
  }
}
