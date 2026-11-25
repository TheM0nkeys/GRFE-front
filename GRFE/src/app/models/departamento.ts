export interface Departamento {
  id: number;
  nome: string;
  divisaoId: number;
  divisaoNome: string;
}

export interface DepartamentoRequest {
  nome: string;
  divisaoId: number;
}
