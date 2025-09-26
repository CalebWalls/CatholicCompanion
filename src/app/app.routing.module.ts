// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfessionComponent } from './components/confession/confession.component';
import { HomeComponent } from './components/home/home.component';
import { LiturgicalCalendarComponent } from './components/liturgicalCalendar/liturgical-calendar.component';
import { SelectedSinsComponent } from './components/confession/selectedSins/selected-sins.component';
import { DailyReadingsComponent } from './components/daily-readings/daily-readings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confession', component: ConfessionComponent },
  { path: 'liturgical-calendar', component: LiturgicalCalendarComponent },
  { path: 'selected-sins', component: SelectedSinsComponent },
  { path: 'daily-readings', component: DailyReadingsComponent }
  // more routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
