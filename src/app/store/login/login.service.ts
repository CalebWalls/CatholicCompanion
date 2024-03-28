import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class LoginService {
  private baseUrl = environment.apiBaseUrl;
  private loginUrl = `${this.baseUrl}/User/login`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post(this.loginUrl, { username, password }, { responseType: 'text' });
  }
}
