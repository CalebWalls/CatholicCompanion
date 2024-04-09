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

  navigateHome() { // New function
    this.router.navigate(['']);
  }
  // You can add any properties or methods you need here
}
