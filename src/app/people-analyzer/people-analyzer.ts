import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService, Person, PersonReport } from './people.service';

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
      <button class="add-btn" (click)="addPerson()">+ New Person</button>
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
  `]
})
export class PeopleAnalyzer {
  get people(): Person[] {
    return this.peopleService.people;
  }

  constructor(private router: Router, private peopleService: PeopleService) {}

  latestScore(person: Person, field: keyof PersonReport): string {
    const r = person.reports.at(-1);
    return r ? `${r[field]}/10` : '—';
  }

  goToDetail(id: number): void {
    this.router.navigate(['/people-analyzer/person', id]);
  }

  addPerson(): void {
    this.router.navigate(['/people-analyzer/person', 'new']);
  }
}
