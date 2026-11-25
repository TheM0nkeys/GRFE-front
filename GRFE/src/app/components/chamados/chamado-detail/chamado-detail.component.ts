import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { ApiError } from '../../../models/api-error';
import { Chamado, HistoricoAcionamento } from '../../../models/chamado';
import { ChamadoService } from '../../../service/chamado.service';

@Component({
  selector: 'app-chamado-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamado-detail.component.html',
  styleUrl: './chamado-detail.component.scss'
})
export class ChamadoDetailComponent implements OnInit {
  chamado: Chamado | null = null;
  historico: HistoricoAcionamento[] = [];
  carregando = false;
  erro = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly chamadoService: ChamadoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((parametros) => {
        const id = Number(parametros.get('id'));
        this.carregando = true;
        this.erro = '';
        return forkJoin({
          chamado: this.chamadoService.obter(id),
          historico: this.chamadoService.listarHistorico(id)
        });
      })
    ).subscribe({
      next: ({ chamado, historico }) => {
        this.chamado = chamado;
        this.historico = historico;
        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => this.mostrarErro(error)
    });
  }

  private mostrarErro(error: HttpErrorResponse): void {
    const apiError = error.error as Partial<ApiError> | null;
    this.erro = apiError?.mensagem ?? error.message;
    this.carregando = false;
  }
}
