import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../core/configuracao/api.config';
import { Usuario } from '../../../core/modelos/usuario.model';

export interface PayloadSalvarUsuario {
  nome: string;
  email: string;
  cargo: string;
  ativo: boolean;
  password: string | null;
}

@Injectable({ providedIn: 'root' })
export class UsuariosApiService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${apiConfig.urlBase}/usuarios`);
  }

  criar(payload: PayloadSalvarUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${apiConfig.urlBase}/usuarios`, payload);
  }

  atualizar(id: number, payload: PayloadSalvarUsuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${apiConfig.urlBase}/usuarios/${id}`, payload);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${apiConfig.urlBase}/usuarios/${id}`);
  }
}
