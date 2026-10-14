import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { localDateKey } from '../../services/companion.service';
import {
  SaintOfTheDayResponse,
  SaintOfTheDayService,
} from '../../services/saint-of-the-day.service';

@Component({
  selector: 'app-saint-of-the-day',
  templateUrl: './saint-of-the-day.component.html',
  styleUrls: ['./saint-of-the-day.component.css'],
})
export class SaintOfTheDayComponent implements OnInit, OnDestroy {
  response: SaintOfTheDayResponse | null = null;
  loading = false;
  error = '';
  date = new Date();
  private loadedDate = '';
  private clockSubscription?: Subscription;
  private requestSubscription?: Subscription;

  constructor(private saints: SaintOfTheDayService) {}

  ngOnInit(): void {
    this.clockSubscription = timer(0, 60_000).subscribe(() => {
      if (localDateKey(new Date()) !== this.loadedDate) this.load();
    });
  }

  load(): void {
    this.requestSubscription?.unsubscribe();
    this.date = new Date();
    this.loadedDate = localDateKey(this.date);
    this.loading = true;
    this.error = '';
    this.response = null;
    this.requestSubscription = this.saints
      .getSaints(this.loadedDate)
      .subscribe({
        next: (response) => {
          this.response = response;
          this.error = response.error || '';
          this.loading = false;
        },
        error: () => {
          this.error = 'The saints could not be loaded. Please try again.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.clockSubscription?.unsubscribe();
    this.requestSubscription?.unsubscribe();
  }
}
