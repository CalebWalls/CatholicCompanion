import { SinService } from './sin-service';
import { examinationItems } from '../examination-items';

describe('Confession browser storage', () => {
  const key = 'companion.confession';
  beforeEach(() => localStorage.removeItem(key));
  afterEach(() => localStorage.removeItem(key));

  it('does not save sensitive items without opting in', () => {
    const service = new SinService();
    service.setSelectedSins([examinationItems[0]]);
    service.setCustomSins(['A private note']);
    expect(localStorage.getItem(key)).toBeNull();
    expect(new SinService().getCustomSins()).toEqual([]);
  });

  it('restores the guide and subsequent edits after a refresh', () => {
    const service = new SinService();
    service.setSelectedSins([examinationItems[0]]);
    service.setRememberConfession(true);
    service.setCustomSins(['My own words']);
    service.setLastConfession(3, 'weeks');
    const restored = new SinService();
    expect(restored.rememberConfession).toBeTrue();
    expect(restored.getSelectedSins()).toEqual([examinationItems[0]]);
    expect(restored.getCustomSins()).toEqual(['My own words']);
    expect(restored.getLastConfession()).toEqual({ time: 3, unit: 'weeks' });
    restored.setCustomSins([]);
    expect(new SinService().getCustomSins()).toEqual([]);
  });

  it('remembers the saving choice even for an empty guide', () => {
    const service = new SinService();
    service.setRememberConfession(true);
    expect(new SinService().rememberConfession).toBeTrue();
  });

  it('removes the saved copy when disabled but keeps the current guide', () => {
    const service = new SinService();
    service.setRememberConfession(true);
    service.setCustomSins(['A private note']);
    service.setRememberConfession(false);
    expect(service.getCustomSins()).toEqual(['A private note']);
    service.setCustomSins(['Another note']);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('clears both saved and current data without affecting intentions', () => {
    localStorage.setItem('companion.intentions', 'keep');
    const service = new SinService();
    service.setRememberConfession(true);
    service.setCustomSins(['A private note']);
    service.setLastConfession(1, 'years');
    service.clear();
    expect(service.getCustomSins()).toEqual([]);
    expect(service.getLastConfession().time).toBe(0);
    expect(service.rememberConfession).toBeFalse();
    expect(localStorage.getItem(key)).toBeNull();
    expect(new SinService().getCustomSins()).toEqual([]);
    expect(localStorage.getItem('companion.intentions')).toBe('keep');
    localStorage.removeItem('companion.intentions');
  });

  it('rejects malformed saved data without crashing', () => {
    localStorage.setItem(key, '{broken');
    expect(new SinService().storageError).toBeTruthy();
    localStorage.setItem(
      key,
      JSON.stringify({
        version: 1,
        selectedSins: [42],
        customSins: [],
        time: 1,
        unit: 'days',
      }),
    );
    const service = new SinService();
    expect(service.getSelectedSins()).toEqual([]);
    expect(service.rememberConfession).toBeFalse();
    expect(service.storageError).toBeTruthy();
    service.clear();
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('keeps the current guide and reports save and erase failures', () => {
    const service = new SinService();
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage unavailable');
    service.setRememberConfession(true);
    service.setCustomSins(['A private note']);
    expect(service.getCustomSins()).toEqual(['A private note']);
    expect(service.storageError).toContain('could not be saved');
    const remove = spyOn(Storage.prototype, 'removeItem').and.throwError(
      'Storage unavailable',
    );
    service.clear();
    expect(service.getCustomSins()).toEqual([]);
    expect(service.storageError).toContain('could not be erased');
    remove.and.callThrough();
  });
});
