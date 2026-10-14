import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, IconComponent],
    }).compileComponents();
  });

  it('exposes the companion tools through labelled navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const navigation = fixture.nativeElement.querySelector('nav');
    expect(navigation.getAttribute('aria-label')).toBe('Main navigation');
    expect(navigation.querySelectorAll('a').length).toBe(6);
    expect(navigation.textContent).toContain('Prepare for confession');
    expect(navigation.textContent).toContain('My intentions');
  });
});
