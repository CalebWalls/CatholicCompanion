import { fakeAsync, tick } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { GetReadings } from './daily-relflections.actions';
import { DailyReflectionsEffects } from './daily-relflections.effect';
import { DailyReflectionsService } from './daily-relflections.service';

describe('Readings navigation requests', () => {
  it('only requests the final date when quickly stepping through days', fakeAsync(() => {
    const actions = new Subject<Action>();
    const service = jasmine.createSpyObj<DailyReflectionsService>('Service', [
      'dailyReadings',
    ]);
    service.dailyReadings.and.returnValue(of({ readingSets: [] }));
    const effects = new DailyReflectionsEffects(new Actions(actions), service);
    const subscription = effects.dailyReadings$.subscribe();

    for (let day = 10; day <= 20; day++) {
      actions.next(GetReadings({ request: { date: `2026-11-${day}` } }));
      tick(100);
    }
    expect(service.dailyReadings).not.toHaveBeenCalled();
    tick(150);
    expect(service.dailyReadings).toHaveBeenCalledOnceWith({
      date: '2026-11-20',
    });
    subscription.unsubscribe();
  }));
});
