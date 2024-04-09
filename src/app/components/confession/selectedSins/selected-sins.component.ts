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

  constructor(private router: Router, private sinService: SinService) { } // Inject the service

  navigateHome() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.selectedSins = this.sinService.getSelectedSins(); // Get the selected sins from the service
  }
}
