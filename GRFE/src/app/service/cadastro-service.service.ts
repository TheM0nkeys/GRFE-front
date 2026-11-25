import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento, DepartamentoRequest } from '../models/departamento';
import { Divisao, DivisaoRequest } from '../models/divisao';
import { Especialidade, EspecialidadeRequest } from '../models/especialidade';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class CadastroService {
  private readonly apiUrl = API_BASE_URL;

  constructor(private readonly http: HttpClient) {}

  listarDivisoes(): Observable<Divisao[]> {
    return this.http.get<Divisao[]>(`${this.apiUrl}/divisoes`);
  }

  obterDivisao(id: number): Observable<Divisao> {
    return this.http.get<Divisao>(`${this.apiUrl}/divisoes/${id}`);
  }

  criarDivisao(dados: DivisaoRequest): Observable<Divisao> {
    return this.http.post<Divisao>(`${this.apiUrl}/divisoes`, dados);
  }

  atualizarDivisao(id: number, dados: DivisaoRequest): Observable<Divisao> {
    return this.http.put<Divisao>(`${this.apiUrl}/divisoes/${id}`, dados);
  }

  excluirDivisao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/divisoes/${id}`);
  }

  listarDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamentos`);
  }

  obterDepartamento(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/departamentos/${id}`);
  }

  criarDepartamento(dados: DepartamentoRequest): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiUrl}/departamentos`, dados);
  }

  atualizarDepartamento(id: number, dados: DepartamentoRequest): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/departamentos/${id}`, dados);
  }

  excluirDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/departamentos/${id}`);
  }

  listarEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.apiUrl}/especialidades`);
  }

  obterEspecialidade(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${this.apiUrl}/especialidades/${id}`);
  }

  criarEspecialidade(dados: EspecialidadeRequest): Observable<Especialidade> {
    return this.http.post<Especialidade>(`${this.apiUrl}/especialidades`, dados);
  }

  atualizarEspecialidade(id: number, dados: EspecialidadeRequest): Observable<Especialidade> {
    return this.http.put<Especialidade>(`${this.apiUrl}/especialidades/${id}`, dados);
  }

  excluirEspecialidade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/especialidades/${id}`);
  }
}
