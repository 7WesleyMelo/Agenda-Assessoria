export const cargosUsuario = ['Administrador', 'Gestor', 'Operador'] as const;

export type CargoUsuario = (typeof cargosUsuario)[number];
