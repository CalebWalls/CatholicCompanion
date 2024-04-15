import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateRequest } from '../models/date-request';
import { DateResponse } from '../models/date-response';


@Injectable({
  providedIn: 'any'
})
export class DailyReflectionsService {
  private baseUrl = environment.apiBaseUrl;
  private loginUrl = `${this.baseUrl}/DailyUpdates/LiturgicalDate`;

  constructor(private http: HttpClient) {}

  liturgicalCalendar(request : DateRequest): Observable<DateResponse> {
    return this.http.post<DateResponse>(this.loginUrl,  request );
  }
}
