import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiError } from '../../../models/api-error';
import { RelatorioAcionamentos } from '../../../models/relatorio';
import { RelatorioService } from '../../../service/relatorio.service';

type TipoRelatorio = 'semanal' | 'mensal' | 'periodo';

@Component({
  selector: 'app-relatorio-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio-dashboard.component.html',
  styleUrl: './relatorio-dashboard.component.scss'
})
export class RelatorioDashboardComponent {
  relatorio: RelatorioAcionamentos | null = null;
  tipoRelatorio: TipoRelatorio = 'semanal';
  dataInicio = '';
  dataFim = '';
  carregando = false;
  erro = '';

  constructor(private readonly relatorioService: RelatorioService) {}

  carregar(tipoRelatorio: TipoRelatorio): void {
    this.tipoRelatorio = tipoRelatorio;
    this.erro = '';
    this.carregando = true;

    const requisicao = tipoRelatorio === 'semanal'
      ? this.relatorioService.obterSemanal()
      : tipoRelatorio === 'mensal'
        ? this.relatorioService.obterMensal()
        : this.relatorioService.obterPorPeriodo(this.dataInicio, this.dataFim);

    requisicao.subscribe({
      next: (relatorio) => {
        this.relatorio = relatorio;
        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as Partial<ApiError> | null;
        this.erro = apiError?.mensagem ?? error.message;
        this.carregando = false;
      }
    });
  }
}
