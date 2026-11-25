import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../../models/api-error';
import { Escala } from '../../../models/Escala';
import { EscalaService } from '../../../service/escala.service';

@Component({
  selector: 'app-escala-comum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escala-comum.component.html',
  styleUrl: './escala-comum.component.scss'
})
export class EscalaComumComponent {
  escalas: Escala[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly escalaService: EscalaService) {}

  ngOnInit(): void {
    this.carregarEscalas();
  }

  carregarEscalas(): void {
    this.carregando = true;
    this.erro = '';
    this.escalaService.listar().subscribe({
      next: (escalas) => {
        this.escalas = escalas;
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
