import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent {
  title = 'Catholic Companion';
  menuVisible = false;
  today = new Date();

  constructor(private router: Router) 
  { 
  } // Inject Router

  ngOnInit() {
    this.today = new Date();
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
  navigateHome() { // New function
    this.router.navigate(['']);
  }
}
