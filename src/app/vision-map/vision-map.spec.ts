import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { VisionMap } from './vision-map';

describe('VisionMap', () => {
  let component: VisionMap;
  let fixture: ComponentFixture<VisionMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionMap, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Defining the Goal" section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Defining the Goal');
  });

  it('should render "The Path to Get There" section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('The Path to Get There');
  });

  it('should render Mission Statement, Vision Statement, and Values subsections', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mission Statement');
    expect(compiled.textContent).toContain('Vision Statement');
    expect(compiled.textContent).toContain('Values');
  });

  it('should render 10 Year Target, 3 Year Picture, 1 Year Plan, Quarterly Rocks subsections', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('10 Year Target');
    expect(compiled.textContent).toContain('3 Year Picture');
    expect(compiled.textContent).toContain('1 Year Plan');
    expect(compiled.textContent).toContain('Quarterly Rocks');
  });

  it('should start with one empty value row', () => {
    expect(component.values.length).toBe(1);
    expect(component.values[0].phrase).toBe('');
    expect(component.values[0].explanation).toBe('');
  });

  it('should add a new value row when addValue() is called', () => {
    component.addValue();
    expect(component.values.length).toBe(2);
  });

  it('should call save methods without errors when invoked', () => {
    expect(() => component.saveMission()).not.toThrow();
    expect(() => component.saveVision()).not.toThrow();
    expect(() => component.saveValues()).not.toThrow();
    expect(() => component.saveTenYear()).not.toThrow();
    expect(() => component.saveThreeYear()).not.toThrow();
    expect(() => component.saveOneYear()).not.toThrow();
    expect(() => component.saveQuarterlyRocks()).not.toThrow();
  });
});
