// liturgical-calendar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liturgical-calendar',
  templateUrl: './liturgical-calendar.component.html',
  styleUrls: ['./liturgical-calendar.component.css']
})
export class LiturgicalCalendarComponent {
  menuVisible = false;

  constructor(private router: Router) 
  { 
  } // Inject Router

  ngOnInit() {
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  openInNewWindow() {
    window.open('https://bible.usccb.org/daily-bible-reading', '_blank', 'height=600,width=800');
  }

  navigateToConfession() { // New function
    this.router.navigate(['/confession']);
  }
  navigateToLiturgicalCalendar() { // New function
    this.router.navigate(['/liturgical-calendar']);
  }
  // You can add any properties or methods you need here
}
