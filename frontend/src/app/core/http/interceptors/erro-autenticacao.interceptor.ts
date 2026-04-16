import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessaoService } from '../../autenticacao/estado/sessao.service';

export const erroAutenticacaoInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const sessaoService = inject(SessaoService);

  return next(request).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 401) {
        sessaoService.encerrarSessao();
        void router.navigate(['/login']);
      }

      return throwError(() => erro);
    })
  );
};
