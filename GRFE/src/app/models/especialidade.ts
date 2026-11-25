export interface Especialidade {
  id: number;
  nome: string;
  descricao: string | null;
  divisaoId: number;
  divisaoNome: string;
  departamentoId: number;
  departamentoNome: string;
}

export interface EspecialidadeRequest {
  nome: string;
  descricao?: string;
  divisaoId: number;
  departamentoId: number;
}
