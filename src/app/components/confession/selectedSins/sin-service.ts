import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinService {
  private selectedSins: string[] = [];
  private lastConfessionTime: number = 0;
  private lastConfessionUnit: string = '';

  constructor() { }

  setSelectedSins(sins: string[]) {
    this.selectedSins = sins;
  }

  getSelectedSins() {
    return this.selectedSins;
  }

  setLastConfession(time: number, unit: string) {
    this.lastConfessionTime = time;
    this.lastConfessionUnit = unit;
  }

  // And this method to get the last confession time
  getLastConfession() {
    return { time: this.lastConfessionTime, unit: this.lastConfessionUnit };
  }
}
