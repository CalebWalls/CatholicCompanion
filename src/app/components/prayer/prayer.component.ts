import { Component, OnDestroy } from '@angular/core';
import {
  MysterySet,
  mysteries,
  rosarySteps,
  suggestedMysteries,
} from './rosary';

@Component({
  selector: 'app-prayer',
  templateUrl: './prayer.component.html',
  styleUrls: ['./prayer.component.css'],
})
export class PrayerComponent implements OnDestroy {
  sets: MysterySet[] = ['Joyful', 'Sorrowful', 'Glorious', 'Luminous'];
  set = suggestedMysteries(new Date().getDay());
  mysteries = mysteries;
  steps = rosarySteps(this.set);
  index = 0;
  started = false;
  finished = false;
  beads = Array.from({ length: 10 }, (_, i) => i + 1);
  minutes = 2;
  remaining = 120;
  running = false;
  timerFinished = false;
  private interval?: ReturnType<typeof setInterval>;
  private endTime = 0;

  get current() {
    return this.steps[this.index];
  }
  get timerDisplay(): string {
    return (
      Math.floor(this.remaining / 60) +
      ':' +
      String(this.remaining % 60).padStart(2, '0')
    );
  }

  selectSet(): void {
    this.steps = rosarySteps(this.set);
    this.index = 0;
    this.started = false;
    this.finished = false;
  }

  next(): void {
    if (this.index < this.steps.length - 1) {
      this.index++;
    } else {
      this.finished = true;
    }
  }

  resetTimer(): void {
    this.pauseTimer();
    this.remaining = Number(this.minutes) * 60;
    this.timerFinished = false;
  }

  startTimer(): void {
    if (this.running) {
      return;
    }
    if (this.remaining === 0) {
      this.resetTimer();
    }
    this.running = true;
    this.timerFinished = false;
    this.endTime = Date.now() + this.remaining * 1000;
    this.interval = setInterval(() => {
      this.remaining = Math.max(
        0,
        Math.ceil((this.endTime - Date.now()) / 1000),
      );
      if (this.remaining === 0) {
        this.pauseTimer();
        this.timerFinished = true;
      }
    }, 250);
  }

  pauseTimer(): void {
    if (this.running) {
      this.remaining = Math.max(
        0,
        Math.ceil((this.endTime - Date.now()) / 1000),
      );
    }
    clearInterval(this.interval);
    this.running = false;
  }

  ngOnDestroy(): void {
    this.pauseTimer();
  }
}
