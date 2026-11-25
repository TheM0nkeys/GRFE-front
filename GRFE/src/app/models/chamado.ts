export type StatusChamado = 'ABERTO' | 'EM_ANDAMENTO' | 'FECHADO';

export interface Chamado {
  id: number;
  dataHoraAcionamento: string;
  especialidadeId: number;
  especialidadeNome: string;
  plantonistaId: number;
  plantonistaNome: string;
  usuarioResponsavelId: number;
  usuarioResponsavelNome: string;
  motivo: string;
  numeroIncidente: string | null;
  status: StatusChamado;
}

export interface ChamadoRequest {
  dataHoraAcionamento: string;
  especialidadeId: number;
  plantonistaId: number;
  usuarioResponsavelId: number;
  motivo: string;
  numeroIncidente?: string;
  status: StatusChamado;
}

export interface HistoricoAcionamento {
  id: number;
  dataHora: string;
  autorId: number;
  autorNome: string;
  comentario: string;
}

export interface HistoricoAcionamentoRequest {
  dataHora: string;
  autorId: number;
  comentario: string;
}

export interface FiltrosChamados {
  status?: StatusChamado;
  especialidadeId?: number;
  plantonistaId?: number;
  divisaoId?: number;
  departamentoId?: number;
  dataInicio?: string;
  dataFim?: string;
}
