import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService, Person, PersonReport } from '../../people-analyzer/people.service';
import { RocksService, Rock, RockStatus } from '../../vision-map/rocks.service';

@Component({
  selector: 'app-weekly-meeting-detail',
  imports: [FormsModule],
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
        <p class="quarter-label">{{ quarterLabel }}</p>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            @for (rock of quarterRocks; track rock.id) {
              <tr (click)="openRock(rock)">
                <td>{{ rock.title }}</td>
                <td><span [class]="'status-badge ' + statusClass(rock.status)">{{ rock.status }}</span></td>
                <td>{{ rock.owner }}</td>
              </tr>
            }
            @if (!quarterRocks.length) {
              <tr class="empty-row"><td colspan="3">No rocks for this quarter.</td></tr>
            }
          </tbody>
        </table>
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

    @if (showRockPopup) {
      <div class="modal-overlay" (click)="closeRockPopup()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>Rock Detail</h2>
          <div class="form-field">
            <label>Title</label>
            <p class="detail-value">{{ draftRock.title }}</p>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Year</label>
              <p class="detail-value">{{ draftRock.year }}</p>
            </div>
            <div class="form-field">
              <label>Quarter</label>
              <p class="detail-value">Q{{ draftRock.quarter }}</p>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Status</label>
              <select [(ngModel)]="draftRock.status">
                <option value="not begun">Not Begun</option>
                <option value="on track">On Track</option>
                <option value="off track">Off Track</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </div>
            <div class="form-field">
              <label>Owner</label>
              <p class="detail-value">{{ draftRock.owner }}</p>
            </div>
          </div>
          <div class="form-field">
            <label>Description</label>
            <p class="detail-value pre-wrap">{{ draftRock.description || '—' }}</p>
          </div>
          <div class="form-field">
            <label>Notes</label>
            <textarea [(ngModel)]="draftRock.notes" rows="3" placeholder="Additional notes..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="save-btn" (click)="saveRock()">💾 Save</button>
            <button class="close-btn" (click)="closeRockPopup()">✕ Close</button>
          </div>
        </div>
      </div>
    }
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
    .quarter-label { font-size: .9rem; color: #7c5cbf; font-weight: 600; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; cursor: pointer; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #f5f3ff; }
    tbody td { padding: 12px 16px; color: #333; font-size: .95rem; }
    .empty-row td { color: #aaa; font-style: italic; text-align: center; }
    .status-badge {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      font-size: .82rem; font-weight: 600; text-transform: capitalize;
    }
    .status-completed { background: #e8f5e9; color: #2e7d32; }
    .status-on-track { background: #e3f2fd; color: #1565c0; }
    .status-off-track { background: #fff3e0; color: #e65100; }
    .status-abandoned { background: #fce4ec; color: #b71c1c; }
    .status-not-begun { background: #f5f5f5; color: #757575; }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .modal {
      background: #fff; border-radius: 14px; padding: 32px;
      width: 100%; max-width: 520px; box-shadow: 0 8px 32px rgba(0,0,0,.18);
      max-height: 90vh; overflow-y: auto;
    }
    .modal h2 { font-size: 1.4rem; font-weight: 800; color: #1e1e2e; margin-bottom: 20px; }
    .form-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
    .form-field label { font-size: .9rem; font-weight: 700; color: #4a4a6a; }
    .form-field select {
      padding: 8px 10px; border: 2px solid #d6ccf5; border-radius: 8px;
      font-size: .95rem; font-family: inherit; color: #1e1e2e; background: #faf9ff;
    }
    .form-field select:focus { outline: none; border-color: #7c5cbf; }
    .form-field textarea {
      padding: 8px 10px; border: 2px solid #d6ccf5; border-radius: 8px;
      font-size: .95rem; font-family: inherit; color: #1e1e2e; background: #faf9ff;
      resize: vertical; transition: border-color .15s;
    }
    .form-field textarea:focus { outline: none; border-color: #7c5cbf; }
    .form-row { display: flex; gap: 16px; }
    .form-row .form-field { flex: 1; }
    .detail-value { font-size: .95rem; color: #333; margin: 0; }
    .detail-value.pre-wrap { white-space: pre-wrap; }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
    .save-btn {
      padding: 10px 24px; background: #4caf7d; color: #fff;
      border: none; border-radius: 8px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .save-btn:hover { background: #388e5a; }
    .close-btn {
      padding: 10px 20px; background: #f5f3ff; color: #7c5cbf;
      border: 1px solid #d6ccf5; border-radius: 8px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .close-btn:hover { background: #ede8ff; }
  `]
})
export class WeeklyMeetingDetail {
  meetingName: string;
  private meetingDate: string;

  showRockPopup = false;
  draftRock: Rock = this.emptyRock();

  get people(): Person[] {
    return this.peopleService.people;
  }

  get quarterRocks(): Rock[] {
    const { year, quarter } = this.meetingQuarter();
    return this.rocksService.getForQuarter(year, quarter);
  }

  get quarterLabel(): string {
    const { year, quarter } = this.meetingQuarter();
    return `Q${quarter} ${year}`;
  }

  constructor(private router: Router, private peopleService: PeopleService, private rocksService: RocksService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state ?? (window.history.state as { name?: string; date?: string });
    this.meetingName = (state as { name?: string })?.name || 'Weekly Meeting Detail';
    this.meetingDate = (state as { date?: string })?.date || '';
  }

  private meetingQuarter(): { year: number; quarter: 1 | 2 | 3 | 4 } {
    const d = this.meetingDate ? new Date(this.meetingDate) : new Date();
    return { year: d.getFullYear(), quarter: (Math.floor(d.getMonth() / 3) + 1) as 1 | 2 | 3 | 4 };
  }

  private emptyRock(): Rock {
    return { id: 0, title: '', year: new Date().getFullYear(), quarter: 1, status: 'not begun', owner: '', description: '', notes: '' };
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

  openRock(rock: Rock): void {
    this.draftRock = { ...rock };
    this.showRockPopup = true;
  }

  saveRock(): void {
    this.rocksService.update({ ...this.draftRock });
    this.showRockPopup = false;
  }

  closeRockPopup(): void {
    this.showRockPopup = false;
  }

  statusClass(status: RockStatus): string {
    return 'status-' + status.replace(/\s+/g, '-');
  }
}
