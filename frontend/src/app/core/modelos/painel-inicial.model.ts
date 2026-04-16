import { Usuario } from './usuario.model';

export interface IndicadorPainel {
  titulo: string;
  valor: string | number;
  variacao: string;
}

export interface ItemMenuPrincipal {
  rotulo: string;
  icone: string;
  rota: string;
}

export interface AtalhoPainel {
  titulo: string;
  descricao: string;
}

export interface PainelInicial {
  saudacao: string;
  usuario: Usuario;
  indicadores: IndicadorPainel[];
  menu_principal: ItemMenuPrincipal[];
  atalhos: AtalhoPainel[];
}
