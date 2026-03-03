import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService, Person, PersonReport } from './people.service';

type ScoreKey = 'spiritual' | 'mental' | 'academic' | 'behavioral';

@Component({
  selector: 'app-people-analyzer',
  imports: [],
  template: `
    <div class="page-header">
      <span class="section-icon">🧠</span>
      <h1>People Analyzer</h1>
    </div>

    <section class="pa-section">
      <h2 class="pa-section-title">At a Glance</h2>
      <div class="glance-row">
        @for (cat of categories; track cat.key) {
          <div class="glance-box">
            <div class="glance-header">{{ cat.label }}</div>
            <div class="glance-avg">{{ avg(cat.key) }}</div>
            <div class="glance-names red">
              @for (name of below(cat.key); track name) {
                <span>{{ name }}</span>
              }
            </div>
            <div class="glance-names green">
              @for (name of top(cat.key); track name) {
                <span>{{ name }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <section class="pa-section">
      <h2 class="pa-section-title">Individual Assessments</h2>
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
            <tr (click)="goToDetail(person.id)">
              <td>{{ person.name }}</td>
              <td>{{ latestScore(person, 'spiritual') }}</td>
              <td>{{ latestScore(person, 'mental') }}</td>
              <td>{{ latestScore(person, 'academic') }}</td>
              <td>{{ latestScore(person, 'behavioral') }}</td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .page-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .section-icon { font-size: 4rem; margin-bottom: 20px; display: block; }
    h1 {
      font-size: 2.8rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; margin-bottom: 10px;
    }
    .pa-section { margin-bottom: 40px; }
    .pa-section-title {
      font-size: 1.6rem; font-weight: 700; color: #4a4a6a;
      border-bottom: 2px solid #7c5cbf; padding-bottom: 8px; margin-bottom: 20px;
    }
    .glance-row {
      display: flex; gap: 16px; flex-wrap: wrap;
    }
    .glance-box {
      flex: 1 1 0; min-width: 160px;
      background: #fff; border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
      padding: 20px 16px; text-align: center;
    }
    .glance-header {
      font-size: 1rem; font-weight: 700; color: #7c5cbf;
      text-transform: uppercase; letter-spacing: .05em; margin-bottom: 8px;
    }
    .glance-avg {
      font-size: 3rem; font-weight: 800; color: #4a4a6a; line-height: 1; margin-bottom: 10px;
    }
    .glance-names { display: flex; flex-direction: column; gap: 2px; font-size: .88rem; font-weight: 600; min-height: 18px; }
    .glance-names.red { color: #d32f2f; }
    .glance-names.green { color: #2e7d32; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; cursor: pointer; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #f5f3ff; }
    tbody td { padding: 12px 16px; color: #333; font-size: .95rem; }
  `]
})
export class PeopleAnalyzer {
  readonly categories: { key: ScoreKey; label: string }[] = [
    { key: 'spiritual', label: 'Spiritual' },
    { key: 'mental', label: 'Mental' },
    { key: 'academic', label: 'Academic' },
    { key: 'behavioral', label: 'Behavioral' },
  ];

  get people(): Person[] {
    return this.peopleService.people;
  }

  constructor(private router: Router, private peopleService: PeopleService) {}

  avg(key: ScoreKey): string {
    const vals = this.people.map(p => p.reports.at(-1)?.[key] ?? 0);
    if (!vals.length) return '—';
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }

  below(key: ScoreKey): string[] {
    return this.people.filter(p => (p.reports.at(-1)?.[key] ?? 0) <= 4).map(p => p.name);
  }

  latestScore(person: Person, field: keyof PersonReport): string {
    const r = person.reports.at(-1);
    return r ? `${r[field]}/10` : '—';
  }

  top(key: ScoreKey): string[] {
    return this.people.filter(p => (p.reports.at(-1)?.[key] ?? 0) >= 9).map(p => p.name);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/people-analyzer/person', id]);
  }
}
