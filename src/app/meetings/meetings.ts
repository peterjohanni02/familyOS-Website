import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface WeeklyMeeting {
  id: number;
  name: string;
  date: string;
  summary: string;
}

interface QuarterlyMeeting {
  id: number;
  name: string;
  date: string;
  location: string;
  summary: string;
}

@Component({
  selector: 'app-meetings',
  imports: [FormsModule],
  template: `
    <div class="page-content">
      <div class="page-header">
        <span class="section-icon">📅</span>
        <h1>Meetings</h1>
        <p>Schedule and review family meetings.</p>
      </div>

      <!-- Scorecard -->
      <div class="section-block">
        <h2>📊 Scorecard</h2>
      </div>

      <!-- Weekly / Monthly Meetings -->
      <div class="section-block">
        <h2>🗓️ Weekly / Monthly Meetings</h2>
        <table>
          <thead>
            <tr>
              <th>Meeting Name</th>
              <th>Date</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            @for (meeting of weeklyMeetings; track meeting.id) {
              @if (meeting.id !== newWeeklyMeeting?.id) {
                <tr (click)="goToWeeklyDetail(meeting.id)">
                  <td>{{ meeting.name }}</td>
                  <td>{{ meeting.date }}</td>
                  <td>{{ meeting.summary }}</td>
                </tr>
              } @else {
                <tr class="new-row">
                  <td><input [(ngModel)]="meeting.name" placeholder="Meeting Name" (click)="$event.stopPropagation()" /></td>
                  <td><input [(ngModel)]="meeting.date" type="date" (click)="$event.stopPropagation()" /></td>
                  <td><input [(ngModel)]="meeting.summary" placeholder="Summary" (click)="$event.stopPropagation()" /></td>
                  <td><button class="save-btn" (click)="saveWeeklyMeeting(); $event.stopPropagation()">Save</button></td>
                </tr>
              }
            }
          </tbody>
        </table>
        <button class="add-btn" (click)="addWeeklyMeeting()">+ New Meeting</button>
      </div>

      <!-- Quarterly / Annual Meetings -->
      <div class="section-block">
        <h2>📆 Quarterly / Annual Meetings</h2>
        <table>
          <thead>
            <tr>
              <th>Meeting Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            @for (meeting of quarterlyMeetings; track meeting.id) {
              @if (meeting.id !== newQuarterlyMeeting?.id) {
                <tr (click)="goToQuarterlyDetail(meeting.id)">
                  <td>{{ meeting.name }}</td>
                  <td>{{ meeting.date }}</td>
                  <td>{{ meeting.location }}</td>
                  <td>{{ meeting.summary }}</td>
                </tr>
              } @else {
                <tr class="new-row">
                  <td><input [(ngModel)]="meeting.name" placeholder="Meeting Name" (click)="$event.stopPropagation()" /></td>
                  <td><input [(ngModel)]="meeting.date" type="date" (click)="$event.stopPropagation()" /></td>
                  <td><input [(ngModel)]="meeting.location" placeholder="Location" (click)="$event.stopPropagation()" /></td>
                  <td><input [(ngModel)]="meeting.summary" placeholder="Summary" (click)="$event.stopPropagation()" /></td>
                  <td><button class="save-btn" (click)="saveQuarterlyMeeting(); $event.stopPropagation()">Save</button></td>
                </tr>
              }
            }
          </tbody>
        </table>
        <button class="add-btn" (click)="addQuarterlyMeeting()">+ New Meeting</button>
      </div>
    </div>
  `,
  styles: [`
    .page-content { width: 100%; max-width: 900px; }
    .page-header { margin-bottom: 32px; }
    .section-icon { font-size: 2.5rem; display: block; margin-bottom: 8px; }
    h1 {
      font-size: 2.4rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p { font-size: 1.05rem; color: #666; margin-top: 6px; }
    .section-block { margin-bottom: 40px; }
    .section-block h2 {
      font-size: 1.4rem; font-weight: 700; color: #1e1e2e;
      border-bottom: 2px solid #e0e0f0; padding-bottom: 10px; margin-bottom: 20px;
    }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; cursor: pointer; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #f5f3ff; }
    tbody td { padding: 12px 16px; color: #333; font-size: .95rem; }
    .add-btn {
      margin-top: 12px; padding: 8px 18px; background: #7c5cbf; color: #fff;
      border: none; border-radius: 6px; font-size: .95rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .add-btn:hover { background: #5a3fa0; }
    .new-row td { padding: 6px 12px; }
    .new-row input {
      width: 100%; padding: 6px 8px; border: 1px solid #c4b5f0;
      border-radius: 4px; font-size: .93rem; outline: none;
      box-sizing: border-box;
    }
    .new-row input:focus { border-color: #7c5cbf; }
    .save-btn {
      padding: 5px 14px; background: #4caf7d; color: #fff;
      border: none; border-radius: 4px; font-size: .88rem; font-weight: 600;
      cursor: pointer; transition: background .15s; white-space: nowrap;
    }
    .save-btn:hover { background: #388e5a; }
  `]
})
export class Meetings {
  weeklyMeetings: WeeklyMeeting[] = [
    { id: 1, name: 'Weekly Family Check-In', date: '2025-01-06', summary: 'Reviewed goals and upcoming tasks for the week.' },
    { id: 2, name: 'Monthly Review', date: '2025-01-31', summary: 'Assessed monthly progress on rocks and finances.' },
  ];

  quarterlyMeetings: QuarterlyMeeting[] = [
    { id: 1, name: 'Q1 Family Planning', date: '2025-01-15', location: 'Living Room', summary: 'Set quarterly rocks and reviewed annual vision.' },
    { id: 2, name: 'Annual Family Retreat', date: '2025-12-27', location: 'Mountain Cabin', summary: 'Year-in-review and goal setting for next year.' },
  ];

  newWeeklyMeeting: WeeklyMeeting | null = null;
  newQuarterlyMeeting: QuarterlyMeeting | null = null;

  constructor(private router: Router) {}

  addWeeklyMeeting(): void {
    if (this.newWeeklyMeeting) return;
    const nextId = Date.now();
    this.newWeeklyMeeting = { id: nextId, name: '', date: '', summary: '' };
    this.weeklyMeetings = [...this.weeklyMeetings, this.newWeeklyMeeting];
  }

  addQuarterlyMeeting(): void {
    if (this.newQuarterlyMeeting) return;
    const nextId = Date.now();
    this.newQuarterlyMeeting = { id: nextId, name: '', date: '', location: '', summary: '' };
    this.quarterlyMeetings = [...this.quarterlyMeetings, this.newQuarterlyMeeting];
  }

  saveWeeklyMeeting(): void {
    this.newWeeklyMeeting = null;
  }

  saveQuarterlyMeeting(): void {
    this.newQuarterlyMeeting = null;
  }

  goToWeeklyDetail(id: number): void {
    this.router.navigate(['/meetings/weekly', id]);
  }

  goToQuarterlyDetail(id: number): void {
    this.router.navigate(['/meetings/quarterly', id]);
  }
}
