import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escala, EscalaRequest } from '../models/Escala';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class EscalaService {
  private readonly apiUrl = `${API_BASE_URL}/escalas`;

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Escala[]> {
    return this.http.get<Escala[]>(this.apiUrl);
  }

  obter(id: number): Observable<Escala> {
    return this.http.get<Escala>(`${this.apiUrl}/${id}`);
  }

  criar(dados: EscalaRequest): Observable<Escala> {
    return this.http.post<Escala>(this.apiUrl, dados);
  }

  atualizar(id: number, dados: EscalaRequest): Observable<Escala> {
    return this.http.put<Escala>(`${this.apiUrl}/${id}`, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
