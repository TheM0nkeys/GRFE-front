import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioAcionamentos } from '../models/relatorio';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  private readonly apiUrl = `${API_BASE_URL}/relatorios`;

  constructor(private readonly http: HttpClient) {}

  obterSemanal(): Observable<RelatorioAcionamentos> {
    return this.http.get<RelatorioAcionamentos>(`${this.apiUrl}/semanal`);
  }

  obterMensal(): Observable<RelatorioAcionamentos> {
    return this.http.get<RelatorioAcionamentos>(`${this.apiUrl}/mensal`);
  }

  obterPorPeriodo(dataInicio: string, dataFim: string): Observable<RelatorioAcionamentos> {
    const parametros = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);
    return this.http.get<RelatorioAcionamentos>(this.apiUrl, { params: parametros });
  }
}
