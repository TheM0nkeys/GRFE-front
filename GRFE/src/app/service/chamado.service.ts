import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Chamado,
  ChamadoRequest,
  FiltrosChamados,
  HistoricoAcionamento,
  HistoricoAcionamentoRequest,
  StatusChamado
} from '../models/chamado';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class ChamadoService {
  private readonly apiUrl = `${API_BASE_URL}/chamados`;

  constructor(private readonly http: HttpClient) {}

  listar(filtros: FiltrosChamados = {}): Observable<Chamado[]> {
    let parametros = new HttpParams();
    Object.entries(filtros).forEach(([campo, valor]) => {
      if (valor !== undefined && valor !== null && valor !== '') {
        parametros = parametros.set(campo, String(valor));
      }
    });

    return this.http.get<Chamado[]>(this.apiUrl, { params: parametros });
  }

  obter(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  criar(dados: ChamadoRequest): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, dados);
  }

  atualizar(id: number, dados: ChamadoRequest): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/${id}`, dados);
  }

  atualizarStatus(id: number, status: StatusChamado): Observable<Chamado> {
    return this.http.patch<Chamado>(`${this.apiUrl}/${id}/status`, null, {
      params: { status }
    });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarHistorico(id: number): Observable<HistoricoAcionamento[]> {
    return this.http.get<HistoricoAcionamento[]>(`${this.apiUrl}/${id}/historico`);
  }

  adicionarHistorico(
    id: number,
    dados: HistoricoAcionamentoRequest
  ): Observable<HistoricoAcionamento> {
    return this.http.post<HistoricoAcionamento>(`${this.apiUrl}/${id}/historico`, dados);
  }
}
