import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private options: any;
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.options = {
      headers: new HttpHeaders(this.headers),
    };
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/register`,
      {
        name,
        email,
        password,
      },
      this.options
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/login`,
      {
        email,
        password,
      },
      this.options
    );
  }

  logout(accessToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        ...this.headers,
        Authorization: 'Bearer ' + accessToken,
      }),
    };
    return this.http.post(`${environment.apiUrl}/logout`, null, options);
  }
}
