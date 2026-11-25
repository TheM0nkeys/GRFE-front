export interface ApiError {
  timestamp: string;
  status: number;
  mensagem: string;
  detalhes: string[] | null;
}
