import { Component } from '@angular/core';
import { CompanionService, Intention } from '../../services/companion.service';

@Component({
  selector: 'app-intentions',
  templateUrl: './intentions.component.html',
  styleUrls: ['./intentions.component.css'],
})
export class IntentionsComponent {
  text = '';
  status = '';
  confirmClear = false;
  filter: 'all' | 'active' | 'answered' = 'all';
  constructor(public companion: CompanionService) {}

  get save(): boolean {
    return this.companion.rememberIntentions;
  }

  set save(value: boolean) {
    this.companion.rememberIntentions = value;
  }

  get visibleIntentions(): Intention[] {
    return this.companion.intentions.filter(
      (item) =>
        this.filter === 'all' ||
        (this.filter === 'answered' ? item.answered : !item.answered),
    );
  }

  add(): void {
    if (!this.text.trim() || this.text.trim().length > 500) {
      return;
    }
    this.companion.addIntention(this.text, this.save);
    this.text = '';
    this.status =
      this.save && this.companion.storageAvailable
        ? 'Intention saved on this browser.'
        : 'Intention added for this visit.';
  }

  changeStorage(): void {
    if (this.save) {
      this.companion.saveIntentions();
    } else {
      this.companion.forgetStoredIntentions();
    }
    this.status = this.save
      ? 'Browser saving enabled.'
      : 'Saved copies removed. Intentions remain for this visit.';
  }

  toggle(item: Intention): void {
    item.answered = !item.answered;
    if (this.save) {
      this.companion.saveIntentions();
    }
    this.status = item.answered
      ? 'Moved to gratitude.'
      : 'Returned to your prayers.';
  }

  remove(id: string): void {
    this.companion.intentions = this.companion.intentions.filter(
      (item) => item.id !== id,
    );
    if (this.save) {
      this.companion.saveIntentions();
    }
    this.status = 'Intention removed.';
  }

  clear(): void {
    this.companion.clearIntentions();
    this.confirmClear = false;
    this.status = 'All intentions cleared.';
  }
}
