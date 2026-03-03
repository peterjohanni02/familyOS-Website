import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person, PersonReport } from '../people.service';

@Component({
  selector: 'app-person-detail',
  imports: [FormsModule],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-btn" (click)="goBack()">← Back</button>
        @if (isNew) {
          <input class="name-input-header" [(ngModel)]="person.name" placeholder="Enter name" />
        } @else {
          <h1>{{ person.name }}</h1>
        }
      </div>

      @if (latestReport) {
        <div class="section-block">
          <h2>📊 Current Status</h2>
          <div class="current-status">
            <div class="status-scores">
              <div class="status-score">
                <span class="status-label">🙏 Spiritual</span>
                <span class="status-value">{{ latestReport.spiritual }}/10</span>
              </div>
              <div class="status-score">
                <span class="status-label">🧠 Mental</span>
                <span class="status-value">{{ latestReport.mental }}/10</span>
              </div>
              <div class="status-score">
                <span class="status-label">📚 Academic/Work</span>
                <span class="status-value">{{ latestReport.academic }}/10</span>
              </div>
              <div class="status-score">
                <span class="status-label">🎯 Behavioral</span>
                <span class="status-value">{{ latestReport.behavioral }}/10</span>
              </div>
            </div>
            @if (latestReport.notes) {
              <div class="status-notes">
                <span class="status-notes-label">Notes:</span>
                <p>{{ latestReport.notes }}</p>
              </div>
            }
          </div>
        </div>
      }

      <div class="section-block">
        <h2>📋 Reports</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Spiritual</th>
              <th>Mental</th>
              <th>Academic/Work</th>
              <th>Behavioral</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            @for (report of person.reports; track report.id) {
              <tr (click)="openReport(report)">
                <td>{{ report.date }}</td>
                <td>{{ report.spiritual }}/10</td>
                <td>{{ report.mental }}/10</td>
                <td>{{ report.academic }}/10</td>
                <td>{{ report.behavioral }}/10</td>
                <td class="notes-cell">{{ report.notes }}</td>
              </tr>
            }
          </tbody>
        </table>
        <button class="add-btn" (click)="openNewReport()">+ New Report</button>
      </div>
    </div>

    @if (showPopup) {
      <div class="modal-overlay" (click)="closePopup()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>{{ editingReport ? 'Edit Report' : 'New Report' }}</h2>
          <div class="scales">
            <div class="scale-row">
              <span class="scale-label">🙏 Spiritual</span>
              <input type="range" min="1" max="10" [(ngModel)]="draftReport.spiritual" class="scale-slider" />
              <span class="scale-value">{{ draftReport.spiritual }}</span>
            </div>
            <div class="scale-row">
              <span class="scale-label">🧠 Mental</span>
              <input type="range" min="1" max="10" [(ngModel)]="draftReport.mental" class="scale-slider" />
              <span class="scale-value">{{ draftReport.mental }}</span>
            </div>
            <div class="scale-row">
              <span class="scale-label">📚 Academic/Work</span>
              <input type="range" min="1" max="10" [(ngModel)]="draftReport.academic" class="scale-slider" />
              <span class="scale-value">{{ draftReport.academic }}</span>
            </div>
            <div class="scale-row">
              <span class="scale-label">🎯 Behavioral</span>
              <input type="range" min="1" max="10" [(ngModel)]="draftReport.behavioral" class="scale-slider" />
              <span class="scale-value">{{ draftReport.behavioral }}</span>
            </div>
          </div>
          <div class="notes-section">
            <label class="notes-label">Notes</label>
            <textarea [(ngModel)]="draftReport.notes" class="notes-textarea" placeholder="Write notes..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="save-btn" (click)="saveReport()">💾 Save</button>
            <button class="close-btn" (click)="closePopup()">✕ Close</button>
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
    .name-input-header {
      font-size: 2rem; font-weight: 800; padding: 4px 12px;
      border: 2px solid #d6ccf5; border-radius: 8px; font-family: inherit;
      color: #1e1e2e; background: #faf9ff; transition: border-color .15s;
      max-width: 340px;
    }
    .name-input-header:focus { outline: none; border-color: #7c5cbf; }
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
    .current-status { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .status-scores { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 12px; }
    .status-score { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 110px; }
    .status-label { font-size: .85rem; font-weight: 600; color: #4a4a6a; }
    .status-value { font-size: 1.4rem; font-weight: 800; color: #7c5cbf; }
    .status-notes { margin-top: 8px; }
    .status-notes-label { font-weight: 700; color: #4a4a6a; font-size: .92rem; }
    .status-notes p { margin: 4px 0 0; color: #333; font-size: .95rem; white-space: pre-wrap; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; cursor: pointer; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #f5f3ff; }
    tbody td { padding: 10px 16px; color: #333; font-size: .95rem; }
    .notes-cell { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .add-btn {
      margin-top: 12px; padding: 8px 18px; background: #7c5cbf; color: #fff;
      border: none; border-radius: 6px; font-size: .95rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .add-btn:hover { background: #5a3fa0; }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .modal {
      background: #fff; border-radius: 14px; padding: 32px;
      width: 100%; max-width: 480px; box-shadow: 0 8px 32px rgba(0,0,0,.18);
    }
    .modal h2 { font-size: 1.4rem; font-weight: 800; color: #1e1e2e; margin-bottom: 24px; }
    .scales { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
    .scale-row { display: flex; align-items: center; gap: 16px; }
    .scale-label { width: 140px; font-size: 1rem; font-weight: 600; color: #4a4a6a; flex-shrink: 0; }
    .scale-slider { flex: 1; accent-color: #7c5cbf; height: 6px; cursor: pointer; }
    .scale-value {
      width: 36px; text-align: center; font-size: 1.1rem; font-weight: 700;
      color: #7c5cbf; background: #f5f3ff; border-radius: 6px; padding: 2px 4px;
      flex-shrink: 0;
    }
    .notes-section { margin-bottom: 24px; }
    .notes-label { display: block; font-size: 1rem; font-weight: 700; color: #7c5cbf; margin-bottom: 8px; }
    .notes-textarea {
      width: 100%; min-height: 100px; padding: 10px 12px; font-size: .95rem;
      border: 2px solid #d6ccf5; border-radius: 8px; resize: vertical;
      font-family: inherit; color: #1e1e2e; background: #faf9ff;
      transition: border-color .15s; box-sizing: border-box;
    }
    .notes-textarea:focus { outline: none; border-color: #7c5cbf; }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
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
export class PersonDetail implements OnInit {
  person: Person = { id: 0, name: '', reports: [] };
  isNew = false;
  showPopup = false;
  editingReport: PersonReport | null = null;
  draftReport: PersonReport = { id: 0, date: '', spiritual: 5, mental: 5, academic: 5, behavioral: 5, notes: '' };
  private backUrl = '/people-analyzer';

  get latestReport(): PersonReport | null {
    if (!this.person.reports.length) return null;
    return this.person.reports[this.person.reports.length - 1];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
  ) {
    const nav = this.router.getCurrentNavigation();
    const url = nav?.extras?.state?.['backUrl'] ?? (window.history.state as { backUrl?: string })?.backUrl;
    if (url) {
      this.backUrl = url;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.person = { id: Date.now(), name: '', reports: [] };
    } else {
      const found = this.peopleService.getById(Number(id));
      if (found) {
        this.person = { ...found, reports: found.reports.map(r => ({ ...r })) };
      } else {
        this.router.navigate(['/people-analyzer']);
      }
    }
  }

  openNewReport(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.editingReport = null;
    this.draftReport = { id: Date.now(), date: today, spiritual: 5, mental: 5, academic: 5, behavioral: 5, notes: '' };
    this.showPopup = true;
  }

  openReport(report: PersonReport): void {
    this.editingReport = report;
    this.draftReport = { ...report };
    this.showPopup = true;
  }

  saveReport(): void {
    if (this.isNew && !this.person.name.trim()) {
      alert('Please enter a name before saving a report.');
      return;
    }
    if (this.editingReport) {
      this.person = {
        ...this.person,
        reports: this.person.reports.map(r => (r.id === this.draftReport.id ? { ...this.draftReport } : r)),
      };
    } else {
      this.person = { ...this.person, reports: [...this.person.reports, { ...this.draftReport }] };
    }
    if (this.isNew) {
      this.peopleService.add(this.person);
      this.isNew = false;
      this.router.navigate(['/people-analyzer/person', this.person.id], { replaceUrl: true });
    } else {
      this.peopleService.update(this.person);
    }
    this.showPopup = false;
    this.editingReport = null;
  }

  closePopup(): void {
    this.showPopup = false;
    this.editingReport = null;
  }

  goBack(): void {
    this.router.navigateByUrl(this.backUrl);
  }
}
