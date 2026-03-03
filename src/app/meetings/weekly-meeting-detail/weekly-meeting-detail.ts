import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService, Person, PersonReport } from '../../people-analyzer/people.service';

@Component({
  selector: 'app-weekly-meeting-detail',
  imports: [],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-btn" (click)="goBack()">← Back</button>
        <h1>{{ meetingName }}</h1>
      </div>

      <div class="section-block">
        <h2>💑 Couple Check-In</h2>
        <div class="checkin-boxes">
          <div class="checkin-box">
            <label class="checkin-label" for="checkin-him">Him</label>
            <textarea id="checkin-him" class="checkin-textarea" placeholder="Notes..."></textarea>
          </div>
          <div class="checkin-box">
            <label class="checkin-label" for="checkin-her">Her</label>
            <textarea id="checkin-her" class="checkin-textarea" placeholder="Notes..."></textarea>
          </div>
        </div>
      </div>

      <div class="section-block">
        <h2>📊 Scorecard Fillout / Review</h2>
      </div>

      <div class="section-block">
        <h2>🔍 Family Analyser</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Spiritual</th>
              <th>Mental</th>
              <th>Academic</th>
              <th>Behavioral</th>
            </tr>
          </thead>
          <tbody>
            @for (person of people; track person.id) {
              <tr (click)="goToPersonDetail(person.id)">
                <td>{{ person.name }}</td>
                <td>{{ latestScore(person, 'spiritual') }}</td>
                <td>{{ latestScore(person, 'mental') }}</td>
                <td>{{ latestScore(person, 'academic') }}</td>
                <td>{{ latestScore(person, 'behavioral') }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="section-block">
        <h2>🪨 Rocks Review</h2>
      </div>

      <div class="section-block">
        <h2>📰 Headlines</h2>
      </div>

      <div class="section-block">
        <h2>💰 Finances</h2>
      </div>

      <div class="section-block">
        <h2>✅ Tasks</h2>
      </div>

      <div class="section-block">
        <h2>💡 IDS</h2>
      </div>

      <div class="section-block">
        <h2>🏁 Conclude</h2>
      </div>

      <div class="section-block">
        <h2>📆 Quarterly and Annual Meetings</h2>
      </div>
    </div>
  `,
  styles: [`
    .page-content { width: 100%; max-width: 900px; }
    .page-header { margin-bottom: 32px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    h1 {
      font-size: 2.2rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .back-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; background: #f5f3ff; color: #7c5cbf;
      border-radius: 8px; font-weight: 600; font-size: .92rem;
      border: 1px solid #d6ccf5; cursor: pointer;
      transition: background .15s, color .15s;
    }
    .back-btn:hover { background: #ede8ff; }
    .section-block { margin-bottom: 36px; }
    .section-block h2 {
      font-size: 1.3rem; font-weight: 700; color: #1e1e2e;
      border-bottom: 2px solid #e0e0f0; padding-bottom: 10px; margin-bottom: 16px;
    }
    .checkin-boxes { display: flex; gap: 24px; }
    .checkin-box { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .checkin-label { font-size: 1rem; font-weight: 700; color: #7c5cbf; }
    .checkin-textarea {
      width: 100%; height: 180px; padding: 12px; font-size: 1rem;
      border: 2px solid #d6ccf5; border-radius: 10px; resize: vertical;
      font-family: inherit; color: #1e1e2e; background: #faf9ff;
      transition: border-color .15s;
      box-sizing: border-box;
    }
    .checkin-textarea:focus { outline: none; border-color: #7c5cbf; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; cursor: pointer; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #f5f3ff; }
    tbody td { padding: 12px 16px; color: #333; font-size: .95rem; }
  `]
})
export class WeeklyMeetingDetail {
  meetingName: string;

  get people(): Person[] {
    return this.peopleService.people;
  }

  constructor(private router: Router, private peopleService: PeopleService) {
    const nav = this.router.getCurrentNavigation();
    const name = nav?.extras?.state?.['name'] ?? (window.history.state as { name?: string })?.name;
    this.meetingName = name || 'Weekly Meeting Detail';
  }

  latestScore(person: Person, field: keyof PersonReport): string {
    const r = person.reports?.at(-1);
    return r ? `${r[field]}/10` : '—';
  }

  goToPersonDetail(id: number): void {
    this.router.navigate(['/people-analyzer/person', id]);
  }

  goBack(): void {
    this.router.navigate(['/meetings']);
  }
}
