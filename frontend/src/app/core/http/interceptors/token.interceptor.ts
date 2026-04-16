import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessaoService } from '../../autenticacao/estado/sessao.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const sessaoService = inject(SessaoService);
  const token = sessaoService.token();

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
