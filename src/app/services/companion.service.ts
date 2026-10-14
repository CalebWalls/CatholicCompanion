import { Injectable } from '@angular/core';

export function localDateKey(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export interface Intention {
  id: string;
  text: string;
  created: string;
  answered: boolean;
}

@Injectable({ providedIn: 'root' })
export class CompanionService {
  private readonly planKey = 'companion.daily-plan';
  private readonly intentionsKey = 'companion.intentions';
  storageAvailable = true;
  rememberIntentions = false;
  intentions: Intention[] = [];

  constructor() {
    const saved = this.read<unknown>(this.intentionsKey, []);
    this.intentions = (Array.isArray(saved) ? saved : []).filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.created === 'string' &&
        typeof item.answered === 'boolean',
    );
    this.rememberIntentions = this.intentions.length > 0;
  }

  getPlan(date: Date): string[] {
    const plan = this.read<{ date: string; done: string[] } | null>(
      this.planKey,
      null,
    );
    return plan?.date === localDateKey(date) && Array.isArray(plan.done)
      ? plan.done
      : [];
  }

  savePlan(date: Date, done: string[]): void {
    this.write(this.planKey, { date: localDateKey(date), done });
  }

  addIntention(text: string, save: boolean): void {
    this.intentions = [
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        created: new Date().toISOString(),
        answered: false,
      },
      ...this.intentions,
    ];
    if (save) {
      this.write(this.intentionsKey, this.intentions);
    }
  }

  saveIntentions(): void {
    this.rememberIntentions = true;
    this.write(this.intentionsKey, this.intentions);
  }

  forgetStoredIntentions(): void {
    this.rememberIntentions = false;
    this.write(this.intentionsKey, []);
  }

  clearIntentions(): void {
    this.intentions = [];
    this.write(this.intentionsKey, []);
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      this.storageAvailable = false;
      return fallback;
    }
  }

  private write(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      this.storageAvailable = false;
    }
  }
}
