import { CompanionService, localDateKey } from './companion.service';
import { IntentionsComponent } from '../components/intentions/intentions.component';

describe('Companion browser storage', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('stores plan progress for its local calendar day and resets on another day', () => {
    const service = new CompanionService();
    const day = new Date(2026, 9, 14, 23, 30);
    service.savePlan(day, ['pray', 'love']);
    expect(service.getPlan(day)).toEqual(['pray', 'love']);
    expect(service.getPlan(new Date(2026, 9, 15))).toEqual([]);
    expect(localDateKey(day)).toBe('2026-10-14');
  });

  it('does not save intentions without an explicit choice', () => {
    const service = new CompanionService();
    service.addIntention('For my family', false);
    expect(service.intentions.length).toBe(1);
    expect(new CompanionService().intentions).toEqual([]);
    service.saveIntentions();
    expect(new CompanionService().intentions[0].text).toBe('For my family');
    service.forgetStoredIntentions();
    expect(new CompanionService().intentions).toEqual([]);
    expect(service.intentions.length).toBe(1);
  });

  it('keeps the saving choice when leaving and returning to intentions', () => {
    const service = new CompanionService();
    const firstVisit = new IntentionsComponent(service);
    firstVisit.text = 'For a friend';
    firstVisit.add();
    const returnVisit = new IntentionsComponent(service);
    expect(returnVisit.save).toBeFalse();
    returnVisit.text = 'For my family';
    returnVisit.add();
    expect(new CompanionService().intentions).toEqual([]);
    returnVisit.save = true;
    returnVisit.changeStorage();
    expect(new IntentionsComponent(service).save).toBeTrue();
  });

  it('ignores malformed saved data and survives unavailable storage', () => {
    localStorage.setItem('companion.intentions', '{}');
    expect(new CompanionService().intentions).toEqual([]);
    localStorage.setItem('companion.intentions', '[null, {"text":"invalid"}]');
    expect(new CompanionService().intentions).toEqual([]);
    spyOn(localStorage, 'setItem').and.throwError('Unavailable');
    const service = new CompanionService();
    service.addIntention('A prayer', true);
    expect(service.storageAvailable).toBeFalse();
    expect(service.intentions.length).toBe(1);
  });
});
