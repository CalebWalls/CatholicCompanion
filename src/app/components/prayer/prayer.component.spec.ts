import { fakeAsync, tick } from '@angular/core/testing';
import { PrayerComponent } from './prayer.component';
import { rosarySteps, suggestedMysteries } from './rosary';

describe('Prayer room', () => {
  it('includes all five decades, introductory prayers, and closing prayers', () => {
    const steps = rosarySteps('Glorious');
    expect(steps.filter((step) => step.bead).length).toBe(50);
    expect(
      new Set(steps.filter((step) => step.mystery).map((step) => step.mystery))
        .size,
    ).toBe(5);
    expect(steps[0].title).toBe('The Sign of the Cross');
    expect(steps[steps.length - 1].title).toBe('The Sign of the Cross');
    expect(suggestedMysteries(4)).toBe('Luminous');
  });

  it('resets the guide when choosing a different mystery set', () => {
    const prayer = new PrayerComponent();
    prayer.started = true;
    prayer.index = 20;
    prayer.set = 'Joyful';
    prayer.selectSet();
    expect(prayer.index).toBe(0);
    expect(prayer.started).toBeFalse();
    expect(prayer.steps[7].mystery).toBe('The Annunciation');
  });

  it('pauses, resumes, and finishes the timer without duplicate intervals', fakeAsync(() => {
    const prayer = new PrayerComponent();
    prayer.startTimer();
    prayer.startTimer();
    tick(1000);
    expect(prayer.remaining).toBe(119);
    prayer.pauseTimer();
    tick(5000);
    expect(prayer.remaining).toBe(119);
    prayer.startTimer();
    tick(119000);
    expect(prayer.remaining).toBe(0);
    expect(prayer.timerFinished).toBeTrue();
    expect(prayer.running).toBeFalse();
    prayer.ngOnDestroy();
  }));
});
