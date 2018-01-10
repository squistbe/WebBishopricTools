import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

const AUTH_API = '/api/auth';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.isLoggedIn = this.isAuthenticated();
  }

  collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  setToken(token): void {
    localStorage.setItem('token', token);
  }

  getUserInfo(): any {
    const token = this.getToken();

    if (token) {
      return decode(token);
    }
  }

  getRoot(): string {
    return environment.production ? 'https://lds-bishopric-tools.herokuapp.com' : '';
  }

  createAccount(details): Observable<any> {
    return this.http.post(`${this.getRoot()}${AUTH_API}/register`, details);
  }

  login(credentials): Observable<any> {
    return this.http.post(`${this.getRoot()}${AUTH_API}/login`, credentials);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.setToken('');
  }

}
