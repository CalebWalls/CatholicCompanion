import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SinService {
  private selectedSins: string[] = [];
  private customSins: string[] = [];
  private lastConfessionTime = 0;
  private lastConfessionUnit = '';

  setSelectedSins(sins: string[]): void {
    this.selectedSins = [...sins];
  }
  getSelectedSins(): string[] {
    return [...this.selectedSins];
  }
  setCustomSins(sins: string[]): void {
    this.customSins = [...sins];
  }
  getCustomSins(): string[] {
    return [...this.customSins];
  }

  setLastConfession(time: number, unit: string): void {
    this.lastConfessionTime = Number.isFinite(time) && time > 0 ? time : 0;
    this.lastConfessionUnit = unit;
  }

  getLastConfession(): { time: number; unit: string } {
    return { time: this.lastConfessionTime, unit: this.lastConfessionUnit };
  }

  clear(): void {
    this.selectedSins = [];
    this.customSins = [];
    this.lastConfessionTime = 0;
    this.lastConfessionUnit = '';
  }
}
