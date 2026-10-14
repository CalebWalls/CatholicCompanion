import { of, Subject, throwError } from 'rxjs';
import { SaintOfTheDayService } from '../../services/saint-of-the-day.service';
import { SaintOfTheDayComponent } from './saint-of-the-day.component';

describe('Saint of the day', () => {
  let service: jasmine.SpyObj<SaintOfTheDayService>;
  let component: SaintOfTheDayComponent;
  beforeEach(() => {
    service = jasmine.createSpyObj('SaintOfTheDayService', ['getSaints']);
    service.getSaints.and.returnValue(
      of({
        date: '2026-10-14',
        source: 'Vatican News',
        url: 'https://www.vaticannews.va/en/saints/10/14.html',
        saints: [
          {
            name: 'Saint Today',
            url: 'https://www.vaticannews.va/en/saints/10/14.html',
          },
        ],
      }),
    );
    component = new SaintOfTheDayComponent(service);
  });
  afterEach(() => component.ngOnDestroy());

  it('loads automatically and reloads only when the local day changes', () => {
    jasmine.clock().install();
    try {
      jasmine.clock().mockDate(new Date(2026, 9, 14, 12));
      component.ngOnInit();
      jasmine.clock().tick(1);
      expect(service.getSaints).toHaveBeenCalledWith('2026-10-14');
      jasmine.clock().tick(60_000);
      expect(service.getSaints).toHaveBeenCalledTimes(1);
      jasmine.clock().mockDate(new Date(2026, 9, 15, 0, 1));
      jasmine.clock().tick(60_000);
      expect(service.getSaints).toHaveBeenCalledWith('2026-10-15');
      component.ngOnDestroy();
      jasmine.clock().tick(60_000);
      expect(service.getSaints).toHaveBeenCalledTimes(2);
    } finally {
      component.ngOnDestroy();
      jasmine.clock().uninstall();
    }
  });

  it('clears old entries while loading and allows retry after a failure', () => {
    component.load();
    expect(component.response?.saints[0].name).toBe('Saint Today');
    service.getSaints.and.returnValue(throwError(() => new Error('offline')));
    component.load();
    expect(component.response).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.error).toContain('try again');
    const pending = new Subject<any>();
    service.getSaints.and.returnValue(pending);
    component.load();
    expect(component.error).toBe('');
    expect(component.loading).toBeTrue();
  });
});
