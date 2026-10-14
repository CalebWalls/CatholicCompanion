import { StoreModule } from '@ngrx/store';
import { reducer } from './store/daily-reflections/daily-relflections.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DailyReflectionsService } from './store/daily-reflections/daily-relflections.service';
import { EffectsModule } from '@ngrx/effects';
import { DailyReflectionsEffects } from './store/daily-reflections/daily-relflections.effect';
import { AppRoutingModule } from './app.routing.module';
import { ConfessionComponent } from './components/confession/confession.component';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LiturgicalCalendarComponent } from './components/liturgicalCalendar/liturgical-calendar.component';
import { MenuButtonComponent } from './components/menuButton/menu-button.component';
import { SelectedSinsComponent } from './components/confession/selectedSins/selected-sins.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LiturgicalDateComponent } from './components/liturgicalDate/liturgicalDate.component';
import { DailyReadingsComponent } from './components/daily-readings/daily-readings.component';
import { IconComponent } from './components/icon/icon.component';
import { PrayerComponent } from './components/prayer/prayer.component';
import { IntentionsComponent } from './components/intentions/intentions.component';
import { SaintOfTheDayComponent } from './components/saint-of-the-day/saint-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuButtonComponent,
    LiturgicalCalendarComponent,
    SelectedSinsComponent,
    LiturgicalDateComponent,
    ConfessionComponent,
    DailyReadingsComponent,
    IconComponent,
    PrayerComponent,
    IntentionsComponent,
    SaintOfTheDayComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ dailyReflections: reducer }),
    EffectsModule.forRoot([DailyReflectionsEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    DailyReflectionsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
