import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SinService } from './selectedSins/sin-service';

@Component({
  selector: 'app-home',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.css']
})
export class ConfessionComponent {
  sins = ['I have put entertainment before God', 'I practiced the occult', 'I have used the Lord\'s name in vein']; // Replace with your sins
  selectedSins: string[] = [];
  sinChecked: boolean[] = [];

  constructor(private router: Router, private sinService: SinService) { 
    this.sinChecked = new Array(this.sins.length).fill(false);
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  onSinClick(index: number) {
    this.sinChecked[index] = !this.sinChecked[index];
    if (this.sinChecked[index]) {
      this.selectedSins.push(this.sins[index]);
    } else {
      this.selectedSins = this.selectedSins.filter(sin => sin !== this.sins[index]);
    }
  }

  onSinChange(index: number, event: any) {
    if (!event.target.checked) {
      this.sinChecked[index] = false;
      this.selectedSins = this.selectedSins.filter(sin => sin !== this.sins[index]);
    }
  }
  

  onSubmit() {
    this.sinService.setSelectedSins(this.selectedSins); // Set the selected sins
    this.router.navigate(['/selected-sins']); // Navigate to the new component
  }
}
