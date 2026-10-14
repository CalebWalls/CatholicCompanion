import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }

  today = new Date();
  links = [
    { path: '/', label: 'Today', icon: 'sun' },
    { path: '/daily-readings', label: 'Daily readings', icon: 'book' },
    { path: '/prayer', label: 'Prayer room', icon: 'spark' },
    {
      path: '/liturgical-calendar',
      label: 'Liturgical calendar',
      icon: 'calendar',
    },
    { path: '/confession', label: 'Prepare for confession', icon: 'heart' },
    { path: '/intentions', label: 'My intentions', icon: 'leaf' },
  ];
}
