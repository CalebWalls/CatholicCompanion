import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GetReadings } from 'src/app/store/daily-reflections/daily-relflections.actions';
import { selectDailyReflections } from 'src/app/store/daily-reflections/daily-relflections.selector';
import { DailyReadingsResponse } from 'src/app/store/models/daily-readings-response';

@Component({
  selector: 'daily-readings',
  templateUrl: './daily-readings.component.html',
  styleUrls: ['./daily-readings.component.css']
})
export class DailyReadingsComponent implements OnInit {
    date = new Date();
    public dailyReadingsResponse$: Observable<DailyReadingsResponse | null> | undefined;

  constructor(private store: Store<AppState>, private router: Router) { }

  navigateHome() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    const date = new Date();
    const formattedDate = date.toISOString();
    this.store.dispatch(GetReadings({ request: { date: formattedDate } }));
    this.dailyReadingsResponse$ = this.store.select(selectDailyReflections).pipe(
      tap(state => console.log('Selected state:', state.dailyReadingsResponse)),
      map(readings => readings?.dailyReadingsResponse)
    );
    this.getDate(new Date());
  }  

  getDate(date: Date){
    
  }
}
