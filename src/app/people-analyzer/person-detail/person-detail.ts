import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../people.service';

@Component({
  selector: 'app-person-detail',
  imports: [FormsModule],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-btn" (click)="goBack()">← Back</button>
        <h1>{{ isNew ? 'New Person' : (person.name || 'Person Detail') }}</h1>
      </div>

      <div class="section-block">
        <label class="field-label">Name</label>
        <input class="name-input" [(ngModel)]="person.name" placeholder="Enter name" />
      </div>

      <div class="section-block">
        <h2>📝 Notes</h2>
        <table>
          <thead>
            <tr>
              <th class="col-date">Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            @for (note of person.notes; track note.id) {
              <tr>
                <td class="col-date"><input type="date" [(ngModel)]="note.date" class="date-input" /></td>
                <td><textarea [(ngModel)]="note.note" class="note-textarea" placeholder="Write a note..."></textarea></td>
              </tr>
            }
          </tbody>
        </table>
        <button class="add-btn" (click)="addNote()">+ Add Note</button>
      </div>

      <div class="section-block">
        <h2>📊 Health Scores</h2>
        <div class="scales">
          <div class="scale-row">
            <span class="scale-label">🙏 Spiritual</span>
            <input type="range" min="1" max="10" [(ngModel)]="person.spiritual" class="scale-slider" />
            <span class="scale-value">{{ person.spiritual }}</span>
          </div>
          <div class="scale-row">
            <span class="scale-label">🧠 Mental</span>
            <input type="range" min="1" max="10" [(ngModel)]="person.mental" class="scale-slider" />
            <span class="scale-value">{{ person.mental }}</span>
          </div>
          <div class="scale-row">
            <span class="scale-label">📚 Academic</span>
            <input type="range" min="1" max="10" [(ngModel)]="person.academic" class="scale-slider" />
            <span class="scale-value">{{ person.academic }}</span>
          </div>
          <div class="scale-row">
            <span class="scale-label">🎯 Behavioral</span>
            <input type="range" min="1" max="10" [(ngModel)]="person.behavioral" class="scale-slider" />
            <span class="scale-value">{{ person.behavioral }}</span>
          </div>
        </div>
      </div>

      <button class="save-btn" (click)="save()">💾 Save</button>
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
    .field-label { font-size: 1rem; font-weight: 700; color: #7c5cbf; display: block; margin-bottom: 8px; }
    .name-input {
      width: 100%; max-width: 400px; padding: 10px 14px; font-size: 1rem;
      border: 2px solid #d6ccf5; border-radius: 8px; font-family: inherit;
      color: #1e1e2e; background: #faf9ff; transition: border-color .15s;
      box-sizing: border-box;
    }
    .name-input:focus { outline: none; border-color: #7c5cbf; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; }
    tbody tr:last-child { border-bottom: none; }
    tbody td { padding: 8px 12px; color: #333; font-size: .95rem; vertical-align: top; }
    .col-date { width: 160px; }
    .date-input {
      width: 100%; padding: 6px 8px; border: 1px solid #d6ccf5;
      border-radius: 6px; font-size: .93rem; font-family: inherit;
      background: #faf9ff; box-sizing: border-box;
    }
    .date-input:focus { outline: none; border-color: #7c5cbf; }
    .note-textarea {
      width: 100%; min-height: 80px; padding: 8px 10px; font-size: .95rem;
      border: 1px solid #d6ccf5; border-radius: 6px; resize: vertical;
      font-family: inherit; color: #1e1e2e; background: #faf9ff;
      transition: border-color .15s; box-sizing: border-box;
    }
    .note-textarea:focus { outline: none; border-color: #7c5cbf; }
    .add-btn {
      margin-top: 12px; padding: 8px 18px; background: #7c5cbf; color: #fff;
      border: none; border-radius: 6px; font-size: .95rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .add-btn:hover { background: #5a3fa0; }
    .scales { display: flex; flex-direction: column; gap: 20px; }
    .scale-row { display: flex; align-items: center; gap: 16px; }
    .scale-label { width: 130px; font-size: 1rem; font-weight: 600; color: #4a4a6a; flex-shrink: 0; }
    .scale-slider { flex: 1; accent-color: #7c5cbf; height: 6px; cursor: pointer; }
    .scale-value {
      width: 36px; text-align: center; font-size: 1.1rem; font-weight: 700;
      color: #7c5cbf; background: #f5f3ff; border-radius: 6px; padding: 2px 4px;
      flex-shrink: 0;
    }
    .save-btn {
      padding: 10px 28px; background: #4caf7d; color: #fff;
      border: none; border-radius: 8px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .save-btn:hover { background: #388e5a; }
  `]
})
export class PersonDetail implements OnInit {
  person: Person = { id: 0, name: '', spiritual: 5, mental: 5, academic: 5, behavioral: 5, notes: [] };
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.person = { id: Date.now(), name: '', spiritual: 5, mental: 5, academic: 5, behavioral: 5, notes: [] };
    } else {
      const found = this.peopleService.getById(Number(id));
      if (found) {
        this.person = { ...found, notes: found.notes.map(n => ({ ...n })) };
      } else {
        this.router.navigate(['/people-analyzer']);
      }
    }
  }

  addNote(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.person = {
      ...this.person,
      notes: [...this.person.notes, { id: Date.now(), date: today, note: '' }],
    };
  }

  save(): void {
    if (!this.person.name.trim()) {
      alert('Please enter a name before saving.');
      return;
    }
    if (this.isNew) {
      this.peopleService.add(this.person);
    } else {
      this.peopleService.update(this.person);
    }
    this.router.navigate(['/people-analyzer']);
  }

  goBack(): void {
    this.router.navigate(['/people-analyzer']);
  }
}
