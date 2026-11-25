export interface ServiceNowIncidentRequest {
  short_description: string;
  description: string;
  impact: string | number;
  urgency: string | number;
}

export interface ServiceNowIncident {
  sys_id: string;
  number: string;
  short_description: string;
  description: string;
  impact: string;
  urgency: string;
  state: string;
}

export interface ServiceNowIncidentResponse {
  result: ServiceNowIncident;
}
