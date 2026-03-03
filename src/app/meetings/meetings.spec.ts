import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meetings } from './meetings';

describe('Meetings', () => {
  let component: Meetings;
  let fixture: ComponentFixture<Meetings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meetings],
    }).compileComponents();

    fixture = TestBed.createComponent(Meetings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new weekly meeting row when addWeeklyMeeting is called', () => {
    const initialCount = component.weeklyMeetings.length;
    component.addWeeklyMeeting();
    expect(component.weeklyMeetings.length).toBe(initialCount + 1);
    const newMeeting = component.weeklyMeetings[component.weeklyMeetings.length - 1];
    expect(newMeeting.name).toBe('');
    expect(newMeeting.date).toBe('');
    expect(newMeeting.summary).toBe('');
  });

  it('should add a new quarterly meeting row when addQuarterlyMeeting is called', () => {
    const initialCount = component.quarterlyMeetings.length;
    component.addQuarterlyMeeting();
    expect(component.quarterlyMeetings.length).toBe(initialCount + 1);
    const newMeeting = component.quarterlyMeetings[component.quarterlyMeetings.length - 1];
    expect(newMeeting.name).toBe('');
    expect(newMeeting.date).toBe('');
    expect(newMeeting.location).toBe('');
    expect(newMeeting.summary).toBe('');
  });

  it('should render the "+ New Meeting" buttons', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button.add-btn');
    expect(buttons.length).toBe(2);
    buttons.forEach(btn => expect(btn.textContent?.trim()).toBe('+ New Meeting'));
  });
});
