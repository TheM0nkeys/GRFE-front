export type RoleUsuario = 'ROLE_ADMIN' | 'ROLE_USUARIO';

export interface LoginRequest {
  login: string;
  senha: string;
}

export interface Usuario {
  login: string;
  role: RoleUsuario;
}

export interface LoginResponse extends Usuario {
  token: string;
}
