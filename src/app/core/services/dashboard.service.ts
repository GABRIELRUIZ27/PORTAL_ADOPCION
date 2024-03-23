import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estadistica } from 'src/app/models/estadistica';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  route = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  getTotalPerritosEdad() {
    return this.http.get<Estadistica[]>(`${this.route}/total-perritos-por-edad`);
  }

  getTotalPerritosGenero() {
    return this.http.get<Estadistica[]>(`${this.route}/total-perritos-por-genero`);
  }

  getTotalPerritosTamaño() {
    return this.http.get<Estadistica[]>(`${this.route}/total-perritos-por-tamaño`);
  }

}
