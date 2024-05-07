import { Component, OnInit } from '@angular/core';
import { SinService } from './sin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-sins',
  templateUrl: './selected-sins.component.html',
  styleUrls: ['./selected-sins.component.css']
})
export class SelectedSinsComponent implements OnInit {
  selectedSins: string[] = [];
  lastConfessionTime: number = 0;
  lastConfessionUnit: string = '';

  constructor(private router: Router, private sinService: SinService) { } // Inject the service

  navigateHome() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.selectedSins = this.sinService.getSelectedSins();
    
    const lastConfession = this.sinService.getLastConfession(); // Get the last confession time from the service
    this.lastConfessionTime = lastConfession.time;
    this.lastConfessionUnit = lastConfession.unit;
  // Get the selected sins from the service
  }

  getFormattedUnit() {
    return this.lastConfessionTime === 1 ? this.lastConfessionUnit.slice(0, -1) : this.lastConfessionUnit;
  }
  
}
