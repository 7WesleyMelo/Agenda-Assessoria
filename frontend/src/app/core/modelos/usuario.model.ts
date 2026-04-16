import { CargoUsuario } from './cargo-usuario.model';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: CargoUsuario;
  ativo: boolean;
}
