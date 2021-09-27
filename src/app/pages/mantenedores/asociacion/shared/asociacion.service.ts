import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAsociacion } from '@app/models/backend';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {
  private apiURL: string = environment.backendURL;
  private path: string = 'asociacion/'

  constructor(private http: HttpClient) { }

  asociacionAll(): Observable<IAsociacion[]>{
    return this.http.get<IAsociacion[]>(`${this.apiURL}${this.path}`);
  }

  asociacionCreate(asociacion: IAsociacion): Observable<IAsociacion>{
    return this.http.post<IAsociacion>(`${this.apiURL}${this.path}`, asociacion);
  }

  asociacionDelete(asociacion: IAsociacion): Observable<IAsociacion>{
    return this.http.delete<IAsociacion>(`${this.apiURL}${this.path}${asociacion.id}`);
  }
}
