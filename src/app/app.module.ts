import { StoreModule } from '@ngrx/store';
import { reducer } from './store/login/login.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginService } from './store/login/login.service';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login/login.effect';
import { AppRoutingModule } from './app.routing.module';
import { ConfessionComponent } from './components/confession/confession.component';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LiturgicalCalendarComponent } from './components/liturgicalCalendar/liturgical-calendar.component';
import { MenuButtonComponent } from './components/menuButton/menu-button.component';


@NgModule({
  providers: [
    LoginService
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuButtonComponent,
    LiturgicalCalendarComponent,
    ConfessionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ login: reducer }),
    EffectsModule.forRoot([LoginEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
