import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SaintOfTheDayResponse {
  date: string;
  source: string;
  url: string;
  saints: { name: string; summary?: string; url: string }[];
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class SaintOfTheDayService {
  constructor(private http: HttpClient) {}

  getSaints(date: string): Observable<SaintOfTheDayResponse> {
    return this.http.post<SaintOfTheDayResponse>(
      `${environment.apiBaseUrl}/DailyUpdates/SaintOfTheDay`,
      { date },
    );
  }
}
