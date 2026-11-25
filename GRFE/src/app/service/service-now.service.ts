import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ServiceNowIncidentRequest,
  ServiceNowIncidentResponse
} from '../models/servicenow';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class ServiceNowService {
  private readonly apiUrl = `${API_BASE_URL}/integracao/servicenow/incidentes`;

  constructor(private readonly http: HttpClient) {}

  criarIncidente(dados: ServiceNowIncidentRequest): Observable<ServiceNowIncidentResponse> {
    return this.http.post<ServiceNowIncidentResponse>(this.apiUrl, dados);
  }

  atualizarIncidente(
    sysId: string,
    dados: ServiceNowIncidentRequest
  ): Observable<ServiceNowIncidentResponse> {
    return this.http.patch<ServiceNowIncidentResponse>(
      `${this.apiUrl}/${encodeURIComponent(sysId)}`,
      dados
    );
  }
}
