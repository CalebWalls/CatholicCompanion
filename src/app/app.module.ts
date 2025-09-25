import { StoreModule } from '@ngrx/store';
import { reducer } from './store/daily-reflections/daily-relflections.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { LiturgicalCalendarComponent } from './components/liturgicalCalendar/liturgical-calendar.component';
import { MenuButtonComponent } from './components/menuButton/menu-button.component';
import { SelectedSinsComponent } from './components/confession/selectedSins/selected-sins.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LiturgicalDateComponent } from './components/liturgicalDate/liturgicalDate.component';
import { DailyReadingsComponent } from './components/daily-readings/daily-readings.component';
import { GptComponent } from './components/gpt/gpt.component';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  providers: [
    DailyReflectionsService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppComponent,
    ConfessionComponent,
    DailyReadingsComponent,
    LiturgicalCalendarComponent,
    MenuButtonComponent,
    SelectedSinsComponent,
    LiturgicalDateComponent,
    GptComponent,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ dailyReflections: reducer }),
    EffectsModule.forRoot([DailyReflectionsEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    TextFieldModule,
    HomeComponent
  ]
})

export class AppModule { }
