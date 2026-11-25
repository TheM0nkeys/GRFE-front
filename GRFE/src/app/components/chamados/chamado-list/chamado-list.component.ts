import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ApiError } from '../../../models/api-error';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../service/chamado.service';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.scss'
})
export class ChamadoListComponent implements OnInit {
  chamados: Chamado[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.carregarChamados();
  }

  carregarChamados(): void {
    this.carregando = true;
    this.erro = '';
    this.chamadoService.listar().subscribe({
      next: (chamados) => {
        this.chamados = chamados;
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
