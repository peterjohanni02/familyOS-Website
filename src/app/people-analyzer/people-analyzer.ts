import { Component } from '@angular/core';

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
      <div class="pa-card">
        <p class="pa-placeholder">An overview of your family members will appear here.</p>
      </div>
    </section>

    <section class="pa-section">
      <h2 class="pa-section-title">Individual Assessments</h2>
      <div class="pa-card">
        <p class="pa-placeholder">Individual assessments for each family member will appear here.</p>
      </div>
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
    .pa-card {
      background: #fff; border-radius: 12px; padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .pa-placeholder { font-size: 0.95rem; color: #888; }
  `]
})
export class PeopleAnalyzer {}
