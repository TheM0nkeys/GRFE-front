export interface Funcionario {
  id: number;
  nome: string;
  matricula: string;
  email: string | null;
  especialidades: string[];
}

export interface FuncionarioRequest {
  nome: string;
  matricula: string;
  email?: string;
  especialidadeIds: number[];
}
