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

  it('should show Edit buttons for Mission, Vision, and Values cards', () => {
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('.edit-btn');
    expect(buttons.length).toBe(3);
  });

  it('should not show edit textarea for mission statement by default', () => {
    fixture.detectChanges();
    expect(component.editingMission).toBeFalsy();
  });

  it('should show mission edit textarea when startEditMission() is called', () => {
    component.missionStatement = 'Test mission';
    component.startEditMission();
    expect(component.editingMission).toBeTruthy();
    expect(component.missionDraft).toBe('Test mission');
  });

  it('should save mission and hide editor when saveMission() is called', () => {
    component.startEditMission();
    component.missionDraft = 'Updated mission';
    component.saveMission();
    expect(component.missionStatement).toBe('Updated mission');
    expect(component.editingMission).toBeFalsy();
  });

  it('should show vision edit textarea when startEditVision() is called', () => {
    component.visionStatement = 'Test vision';
    component.startEditVision();
    expect(component.editingVision).toBeTruthy();
    expect(component.visionDraft).toBe('Test vision');
  });

  it('should save vision and hide editor when saveVision() is called', () => {
    component.startEditVision();
    component.visionDraft = 'Updated vision';
    component.saveVision();
    expect(component.visionStatement).toBe('Updated vision');
    expect(component.editingVision).toBeFalsy();
  });

  it('should populate valuesDraft from values when startEditValues() is called', () => {
    component.values = [{ phrase: 'Integrity', explanation: 'Being honest' }];
    component.startEditValues();
    expect(component.editingValues).toBeTruthy();
    expect(component.valuesDraft.length).toBe(1);
    expect(component.valuesDraft[0].phrase).toBe('Integrity');
  });

  it('should add a new draft value row when addValue() is called during editing', () => {
    component.startEditValues();
    component.addValue();
    expect(component.valuesDraft.length).toBe(2);
  });

  it('should not add to valuesDraft when addValue() is called outside edit mode', () => {
    component.addValue();
    expect(component.valuesDraft.length).toBe(0);
  });

  it('should save values and hide editor when saveValues() is called', () => {
    component.startEditValues();
    component.valuesDraft = [{ phrase: 'Love', explanation: 'Family first' }];
    component.saveValues();
    expect(component.values[0].phrase).toBe('Love');
    expect(component.editingValues).toBeFalsy();
  });

  it('should correctly report hasValues() based on phrase content', () => {
    component.values = [{ phrase: '', explanation: '' }];
    expect(component.hasValues()).toBeFalsy();
    component.values = [{ phrase: 'Integrity', explanation: '' }];
    expect(component.hasValues()).toBeTruthy();
  });

  it('should call save methods without errors when invoked', () => {
    expect(() => component.saveTenYear()).not.toThrow();
    expect(() => component.saveThreeYear()).not.toThrow();
    expect(() => component.saveOneYear()).not.toThrow();
    expect(() => component.saveQuarterlyRocks()).not.toThrow();
  });
});
