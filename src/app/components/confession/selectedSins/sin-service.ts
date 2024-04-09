import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinService {
  private selectedSins: string[] = [];

  constructor() { }

  setSelectedSins(sins: string[]) {
    this.selectedSins = sins;
  }

  getSelectedSins() {
    return this.selectedSins;
  }
}
