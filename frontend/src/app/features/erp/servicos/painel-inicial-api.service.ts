import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../core/configuracao/api.config';
import { PainelInicial } from '../../../core/modelos/painel-inicial.model';

@Injectable({ providedIn: 'root' })
export class PainelInicialApiService {
  private readonly http = inject(HttpClient);

  obterPainelInicial(): Observable<PainelInicial> {
    return this.http.get<PainelInicial>(`${apiConfig.urlBase}/erp/painel-inicial`);
  }
}
