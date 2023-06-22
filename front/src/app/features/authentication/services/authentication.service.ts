import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationResponse, User } from '../interfaces';

@Injectable()
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  public authenticate(user: User): Observable<AuthenticationResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}auth/login`, user, {
      headers: headers,
    });
  }
}
