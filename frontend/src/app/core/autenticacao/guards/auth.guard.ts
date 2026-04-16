import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessaoService } from '../estado/sessao.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessaoService = inject(SessaoService);

  if (sessaoService.autenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
