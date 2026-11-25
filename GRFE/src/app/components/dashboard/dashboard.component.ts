import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiError } from '../../models/api-error';
import { RelatorioAcionamentos } from '../../models/relatorio';
import { RelatorioService } from '../../service/relatorio.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  relatorio: RelatorioAcionamentos | null = null;
  carregando = false;
  erro = '';

  constructor(private readonly relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  carregarRelatorio(): void {
    this.carregando = true;
    this.erro = '';
    this.relatorioService.obterMensal().subscribe({
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
