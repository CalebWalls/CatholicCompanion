import { Router } from '@angular/router';
import { ConfessionComponent } from './confession.component';
import { SinService } from './selectedSins/sin-service';
import { examinationItems } from './examination-items';

describe('Confession preparation', () => {
  let service: SinService;
  let component: ConfessionComponent;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    service = new SinService();
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new ConfessionComponent(router, service);
  });

  it('adds, trims, edits, and removes a personal item without changing checklist selections', () => {
    component.toggle(examinationItems[45]);
    component.customText = '  A personal concern  ';
    component.saveCustom();
    expect(service.getCustomSins()).toEqual(['A personal concern']);
    component.editCustom(0);
    component.customText = 'Updated concern';
    component.saveCustom();
    expect(service.getCustomSins()).toEqual(['Updated concern']);
    expect(service.getSelectedSins()).toEqual([examinationItems[45]]);
    component.removeCustom(0);
    expect(service.getCustomSins()).toEqual([]);
    expect(service.getSelectedSins()).toEqual([examinationItems[45]]);
  });

  it('rejects empty and oversized personal items', () => {
    component.customText = '  ';
    component.saveCustom();
    expect(component.customError).toBeTruthy();
    component.customText = 'x'.repeat(501);
    component.saveCustom();
    expect(service.getCustomSins()).toEqual([]);
  });

  it('restores both kinds of items when returning from the guide', () => {
    service.setSelectedSins([examinationItems[192]]);
    service.setCustomSins(['Something I want to discuss']);
    const restored = new ConfessionComponent(router, service);
    expect(restored.selectedSins).toEqual([examinationItems[192]]);
    expect(restored.customSins).toEqual(['Something I want to discuss']);
    restored.toggle(examinationItems[192]);
    expect(service.getSelectedSins()).toEqual([]);
  });

  it('keeps all existing prompts available exactly once', () => {
    const all = component.groups.flatMap((group) => group.items);
    expect(all.length).toBe(examinationItems.length);
    expect([...all].sort()).toEqual([...examinationItems].sort());
  });

  it('includes custom items in review and clears all private state', () => {
    component.customText = 'My own words';
    component.saveCustom();
    component.lastConfessionTime = 2;
    component.lastConfessionUnit = 'weeks';
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/selected-sins']);
    expect(service.getLastConfession()).toEqual({ time: 2, unit: 'weeks' });
    service.clear();
    expect(service.getCustomSins()).toEqual([]);
    expect(service.getSelectedSins()).toEqual([]);
    expect(service.getLastConfession().time).toBe(0);
  });
});
