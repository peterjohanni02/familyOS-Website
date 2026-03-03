import { Component } from '@angular/core';
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
  imports: [],
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
              <tr (click)="goToWeeklyDetail(meeting.id)">
                <td>{{ meeting.name }}</td>
                <td>{{ meeting.date }}</td>
                <td>{{ meeting.summary }}</td>
              </tr>
            }
          </tbody>
        </table>
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
              <tr (click)="goToQuarterlyDetail(meeting.id)">
                <td>{{ meeting.name }}</td>
                <td>{{ meeting.date }}</td>
                <td>{{ meeting.location }}</td>
                <td>{{ meeting.summary }}</td>
              </tr>
            }
          </tbody>
        </table>
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

  constructor(private router: Router) {}

  goToWeeklyDetail(id: number): void {
    this.router.navigate(['/meetings/weekly', id]);
  }

  goToQuarterlyDetail(id: number): void {
    this.router.navigate(['/meetings/quarterly', id]);
  }
}
