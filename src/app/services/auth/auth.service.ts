import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICredenciales, IUser, IUserResponse } from '@app/models/backend';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.backendURL;
  private key: string = environment.token;
  private path: string = 'usuario/';
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLoggedOn(): boolean{
    return this.isLogged.value;
  }

  login(login: ICredenciales): Observable<IUserResponse> {
    return this.http
      .post<IUserResponse>(`${this.apiURL}${this.path}login`, login)
      .pipe(
        map((user: IUserResponse) => {
          this.setToken(user.token);
          this.isLogged.next(true);
          return user;
        }),
        catchError((error) => this.handlerError(error))
      );
  }

  registrar(usuario: IUser): Observable<IUserResponse> {
    return this.http
      .post<IUserResponse>(`${this.apiURL}${this.path}registrar`, usuario)
      .pipe(
        map((user: IUserResponse) => {
          this.setToken(user.token);
          this.isLogged.next(true);
          return user;
        }),
        catchError((error) => this.handlerError(error))
      );
  }

  logout() {
    localStorage.removeItem(this.key);
    this.isLogged.next(false);
    this.router.navigate(['/auth/login/']);
  }

  private setToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  public checkToken(): boolean {
    const token = localStorage.getItem(this.key);
    if (token != null) {
      const isExpire = helper.isTokenExpired(token);
      if (isExpire) {
        this.logout();
        return false;
      } else {
        this.isLogged.next(true);
        return true;
      }
    }
    return false;
  }

  private handlerError(err: any): Observable<never> {
    let errorMesage = 'A ocurrido un error!';
    if (err) {
      errorMesage = `Error: Codigo ${err.message}`;
    }
    window.alert(errorMesage);
    return throwError(errorMesage);
  }
}
