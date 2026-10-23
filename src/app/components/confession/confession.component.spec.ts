import { Router } from '@angular/router';
import { ConfessionComponent } from './confession.component';
import { SinService } from './selectedSins/sin-service';
import { examinationItems } from './examination-items';

describe('Confession preparation', () => {
  let service: SinService;
  let component: ConfessionComponent;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    localStorage.removeItem('companion.confession');
    service = new SinService();
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new ConfessionComponent(router, service);
  });

  afterEach(() => localStorage.removeItem('companion.confession'));

  it('saves time changes before review and clears saved preparation', () => {
    service.setRememberConfession(true);
    component.lastConfessionTime = 4;
    component.lastConfessionUnit = 'days';
    component.saveLastConfession();
    expect(new SinService().getLastConfession()).toEqual({
      time: 4,
      unit: 'days',
    });
    component.toggle(examinationItems[0]);
    component.clear();
    expect(component.selectedSins).toEqual([]);
    expect(new SinService().getSelectedSins()).toEqual([]);
    expect(service.rememberConfession).toBeFalse();
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
    const all = component.categories.flatMap((category) =>
      category.groups.flatMap((group) => group.items),
    );
    expect(all.length).toBe(examinationItems.length);
    expect([...all].sort()).toEqual([...examinationItems].sort());
  });

  it('separates the source mortal and venial sections without changing saved prompts', () => {
    const [mortal, venial] = component.categories;
    expect(mortal.title).toBe('Mortal sins');
    expect(venial.title).toBe('Venial sins and imperfections');
    expect(mortal.groups.flatMap((group) => group.items)).toEqual(
      examinationItems.slice(0, 124),
    );
    expect(venial.groups.flatMap((group) => group.items)).toEqual(
      examinationItems.slice(124),
    );
    component.toggle('Adultery');
    component.toggle('Failure to pray on a daily basis');
    expect(service.getSelectedSins()).toEqual([
      'Adultery',
      'Failure to pray on a daily basis',
    ]);
  });

  it('places Sunday, family, life, and chastity prompts under the source commandments', () => {
    const groups = component.categories[0].groups;
    expect(groups[2].items).toEqual([
      'Missing Mass on Sunday or a Holy Day of Obligation without a serious reason',
      'Doing unnecessary work on Sunday for a long period of time, i.e., more than several hours',
      'Intentional failure to fast or abstain on appointed days',
      'Requiring employees to work on Sunday in nonessential occupations',
    ]);
    expect(groups[3].items[0]).toBe('Serious failure to care for aged parents');
    expect(groups[3].items[7]).toBe(
      'Failure to carry out the last will of deceased parents',
    );
    expect(groups[4].items[0]).toBe('Murder, homicide or manslaughter');
    expect(groups[4].items[22]).toBe(
      'Intentionally placing temptation before the weak',
    );
    expect(groups[5].items[0]).toBe('Adultery');
    expect(groups[5].items[28]).toBe('Transvestitism or cross dressing');
  });

  it('searches both categories without losing selected items', () => {
    component.toggle('Cursing thoughtlessly');
    component.search = '  PRAYER  ';
    const matches = component.categories.map((category) =>
      category.groups.flatMap((group) => component.filteredItems(group.items)),
    );
    expect(matches[0]).toEqual([]);
    expect(matches[1]).toContain('Being willfully distracted at Mass or in prayer');
    expect(component.selectedSins).toEqual(['Cursing thoughtlessly']);
    component.search = 'no such reflection prompt';
    expect(component.filteredItems(examinationItems)).toEqual([]);
    component.search = '';
    expect(component.filteredItems(examinationItems)).toEqual(examinationItems);
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
