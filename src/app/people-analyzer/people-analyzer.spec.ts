import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAnalyzer } from './people-analyzer';

describe('PeopleAnalyzer', () => {
  let component: PeopleAnalyzer;
  let fixture: ComponentFixture<PeopleAnalyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleAnalyzer],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleAnalyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('People Analyzer');
  });

  it('should display "At a Glance" section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('At a Glance');
  });

  it('should display "Individual Assessments" section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Individual Assessments');
  });
});
