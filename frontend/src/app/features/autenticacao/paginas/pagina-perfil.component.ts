import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { Usuario } from '../../../core/modelos/usuario.model';
import { AutenticacaoApiService } from '../servicos/autenticacao-api.service';

@Component({
  selector: 'app-pagina-perfil',
  standalone: true,
  templateUrl: './pagina-perfil.component.html',
  styleUrl: './pagina-perfil.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaPerfilComponent implements OnInit {
  private readonly autenticacaoApiService = inject(AutenticacaoApiService);
  private readonly sessaoService = inject(SessaoService);

  protected readonly carregando = signal(true);
  protected readonly mensagemErro = signal<string | null>(null);
  protected readonly usuario = signal<Usuario | null>(this.sessaoService.usuario());

  ngOnInit(): void {
    this.carregarPerfil();
  }

  protected carregarPerfil(): void {
    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.autenticacaoApiService.obterPerfil().subscribe({
      next: ({ usuario }) => {
        this.usuario.set(usuario);
        this.sessaoService.definirUsuario(usuario);
        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro.set(erro.error?.message ?? 'Nao foi possivel carregar o perfil do usuario.');
        this.carregando.set(false);
      },
    });
  }
}
