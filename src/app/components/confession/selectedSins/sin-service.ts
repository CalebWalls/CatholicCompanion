import { Injectable } from '@angular/core';

interface SavedConfession {
  version: number;
  selectedSins: string[];
  customSins: string[];
  time: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class SinService {
  private readonly storageKey = 'companion.confession';
  private selectedSins: string[] = [];
  private customSins: string[] = [];
  private lastConfessionTime = 0;
  private lastConfessionUnit = '';
  rememberConfession = false;
  storageError = '';

  constructor() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const saved: SavedConfession = JSON.parse(raw);
      if (
        !saved ||
        saved.version !== 1 ||
        !this.validItems(saved.selectedSins) ||
        !this.validItems(saved.customSins) ||
        !Number.isFinite(saved.time) ||
        saved.time < 0 ||
        saved.time > 1000 ||
        !['', 'days', 'weeks', 'months', 'years'].includes(saved.unit)
      ) {
        this.storageError =
          'The saved guide could not be read. Clear it below before starting again.';
        return;
      }
      this.selectedSins = [...saved.selectedSins];
      this.customSins = [...saved.customSins];
      this.lastConfessionTime = saved.time;
      this.lastConfessionUnit = saved.unit;
      this.rememberConfession = true;
    } catch {
      this.storageError =
        'Browser storage could not be read. Your guide may not survive a refresh.';
    }
  }

  private validItems(items: unknown): items is string[] {
    return (
      Array.isArray(items) &&
      items.every(
        (item) =>
          typeof item === 'string' &&
          item.trim().length > 0 &&
          item.length <= 500,
      )
    );
  }

  setRememberConfession(remember: boolean): void {
    this.rememberConfession = remember;
    if (remember) this.save();
    else this.removeSavedGuide();
  }

  private save(): void {
    if (!this.rememberConfession) return;
    try {
      const saved: SavedConfession = {
        version: 1,
        selectedSins: this.selectedSins,
        customSins: this.customSins,
        time: this.lastConfessionTime,
        unit: this.lastConfessionUnit,
      };
      localStorage.setItem(this.storageKey, JSON.stringify(saved));
      this.storageError = '';
    } catch {
      this.storageError =
        'Your latest changes could not be saved. Keep this page open; refreshing may lose them.';
    }
  }

  private removeSavedGuide(): void {
    try {
      localStorage.removeItem(this.storageKey);
      this.storageError = '';
    } catch {
      this.storageError =
        'The saved copy could not be erased. Clear this site’s data in your browser settings.';
    }
  }

  setSelectedSins(sins: string[]): void {
    this.selectedSins = [...sins];
    this.save();
  }
  getSelectedSins(): string[] {
    return [...this.selectedSins];
  }
  setCustomSins(sins: string[]): void {
    this.customSins = [...sins];
    this.save();
  }
  getCustomSins(): string[] {
    return [...this.customSins];
  }

  setLastConfession(time: number, unit: string): void {
    this.lastConfessionTime =
      Number.isFinite(time) && time > 0 ? Math.min(time, 1000) : 0;
    this.lastConfessionUnit = unit;
    this.save();
  }

  getLastConfession(): { time: number; unit: string } {
    return { time: this.lastConfessionTime, unit: this.lastConfessionUnit };
  }

  clear(): void {
    this.selectedSins = [];
    this.customSins = [];
    this.lastConfessionTime = 0;
    this.lastConfessionUnit = '';
    this.rememberConfession = false;
    this.removeSavedGuide();
  }
}
