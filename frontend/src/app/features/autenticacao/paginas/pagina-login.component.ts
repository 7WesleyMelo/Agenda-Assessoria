import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { AutenticacaoApiService } from '../servicos/autenticacao-api.service';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaLoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly autenticacaoApiService = inject(AutenticacaoApiService);
  private readonly sessaoService = inject(SessaoService);

  protected readonly carregando = signal(false);
  protected readonly mensagemErro = signal<string | null>(null);

  protected readonly formulario = this.formBuilder.nonNullable.group({
    email: ['admin@agendaassessoria.com.br', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  protected entrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.autenticacaoApiService
      .autenticar(this.formulario.getRawValue())
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe({
        next: (resposta) => {
          this.sessaoService.iniciarSessao(resposta);
          void this.router.navigate(['/erp']);
        },
        error: (erro: HttpErrorResponse) => {
          this.mensagemErro.set(erro.error?.message ?? 'Não foi possível autenticar.');
        },
      });
  }
}
