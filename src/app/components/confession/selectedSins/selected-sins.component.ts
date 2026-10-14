import { Component } from '@angular/core';
import { SinService } from './sin-service';

@Component({
  selector: 'app-selected-sins',
  templateUrl: './selected-sins.component.html',
  styleUrls: ['./selected-sins.component.css'],
})
export class SelectedSinsComponent {
  selectedSins = this.sinService.getSelectedSins();
  customSins = this.sinService.getCustomSins();
  lastConfession = this.sinService.getLastConfession();
  confirmClear = false;
  constructor(private sinService: SinService) {}

  get unit(): string {
    return this.lastConfession.time === 1
      ? this.lastConfession.unit.slice(0, -1)
      : this.lastConfession.unit;
  }

  clear(): void {
    this.sinService.clear();
    this.selectedSins = [];
    this.customSins = [];
    this.lastConfession = this.sinService.getLastConfession();
    this.confirmClear = false;
  }
}
