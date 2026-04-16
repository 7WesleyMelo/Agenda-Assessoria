import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../core/configuracao/api.config';
import { RespostaLogin } from '../../../core/modelos/autenticacao.model';
import { Usuario } from '../../../core/modelos/usuario.model';

interface CredenciaisLogin {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AutenticacaoApiService {
  private readonly http = inject(HttpClient);

  autenticar(payload: CredenciaisLogin): Observable<RespostaLogin> {
    return this.http.post<RespostaLogin>(`${apiConfig.urlBase}/auth/login`, payload);
  }

  obterPerfil(): Observable<{ usuario: Usuario }> {
    return this.http.get<{ usuario: Usuario }>(`${apiConfig.urlBase}/auth/perfil`);
  }
}
