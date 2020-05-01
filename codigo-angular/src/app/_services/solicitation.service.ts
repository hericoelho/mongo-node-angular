import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/solicitations`);
  }

  get(id) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/solicitations/${id}`);
  }

  register(solicitation) {
    return this.http.post(`${environment.apiUrl}/api/solicitations`, solicitation);
  }

  put(id, solicitation) {
    return this.http.put<any[]>(`${environment.apiUrl}/api/solicitations/${id}`, solicitation);
  }

  delete(id) {
    return this.http.delete(`${environment.apiUrl}/api/solicitations/${id}`);
  }
}
