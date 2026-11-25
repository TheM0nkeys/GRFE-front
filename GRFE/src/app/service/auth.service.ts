import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/usuario';
import { API_BASE_URL } from './api.config';

const TOKEN_STORAGE_KEY = 'grfe.auth.token';
const ROLE_STORAGE_KEY = 'grfe.auth.role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/login`, dados)
      .pipe(tap((resposta) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, resposta.token);
        localStorage.setItem(ROLE_STORAGE_KEY, resposta.role);
      }));
  }

  obterToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  obterRole(): string | null {
    return localStorage.getItem(ROLE_STORAGE_KEY);
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  ehAdmin(): boolean {
    return this.obterRole() === 'ROLE_ADMIN';
  }

  limparToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
}
