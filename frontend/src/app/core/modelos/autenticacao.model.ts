import { Usuario } from './usuario.model';

export interface RespostaLogin {
  access_token: string;
  token_type: string;
  expires_in: number;
  usuario: Usuario;
}
