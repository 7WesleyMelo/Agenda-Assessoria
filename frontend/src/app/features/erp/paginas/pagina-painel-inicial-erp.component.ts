import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { PainelInicial } from '../../../core/modelos/painel-inicial.model';
import { PainelInicialApiService } from '../servicos/painel-inicial-api.service';

@Component({
  selector: 'app-pagina-painel-inicial-erp',
  standalone: true,
  templateUrl: './pagina-painel-inicial-erp.component.html',
  styleUrl: './pagina-painel-inicial-erp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaPainelInicialErpComponent implements OnInit {
  private readonly painelInicialApiService = inject(PainelInicialApiService);

  protected readonly carregando = signal(true);
  protected readonly mensagemErro = signal<string | null>(null);
  protected readonly painel = signal<PainelInicial | null>(null);

  ngOnInit(): void {
    this.carregar();
  }

  protected carregar(): void {
    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.painelInicialApiService.obterPainelInicial().subscribe({
      next: (painel) => {
        this.painel.set(painel);
        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro.set(erro.error?.message ?? 'Não foi possível carregar o painel inicial.');
        this.carregando.set(false);
      },
    });
  }
}
