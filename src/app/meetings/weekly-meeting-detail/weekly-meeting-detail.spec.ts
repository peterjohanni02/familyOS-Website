import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { WeeklyMeetingDetail } from './weekly-meeting-detail';

describe('WeeklyMeetingDetail', () => {
  let component: WeeklyMeetingDetail;
  let fixture: ComponentFixture<WeeklyMeetingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyMeetingDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyMeetingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two save buttons (top and bottom)', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button.save-btn');
    expect(buttons.length).toBe(2);
    buttons.forEach(btn => expect(btn.textContent?.trim()).toBe('💾 Save'));
  });

  it('should call saveMeeting when a save button is clicked', () => {
    vi.spyOn(component, 'saveMeeting');
    const saveBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.save-btn');
    saveBtn.click();
    expect(component.saveMeeting).toHaveBeenCalled();
  });
});
