export interface RelatorioAcionamentos {
  periodoInicio: string;
  periodoFim: string;
  totalAcionamentos: number;
  porEspecialidade: Record<string, number>;
  porPlantonista: Record<string, number>;
  porDivisao: Record<string, number>;
  porDepartamento: Record<string, number>;
}
