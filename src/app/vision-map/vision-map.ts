import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Value {
  phrase: string;
  explanation: string;
}

@Component({
  selector: 'app-vision-map',
  imports: [FormsModule],
  template: `
    <div class="page-header">
      <span class="section-icon">🗺️</span>
      <h1>Vision Map</h1>
    </div>

    <div class="vm-section">
      <h2 class="vm-section-title">Defining the Goal</h2>

      <div class="vm-card">
        <h3>Mission Statement</h3>
        <textarea [(ngModel)]="missionStatement" rows="6" placeholder="Enter your family's mission statement..."></textarea>
        <button class="save-btn" (click)="saveMission()">Save</button>
      </div>

      <div class="vm-card">
        <h3>Vision Statement</h3>
        <textarea [(ngModel)]="visionStatement" rows="6" placeholder="Enter your family's vision statement..."></textarea>
        <button class="save-btn" (click)="saveVision()">Save</button>
      </div>

      <div class="vm-card">
        <h3>Values</h3>
        <table class="values-table">
          <thead>
            <tr>
              <th>Value</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            @for (value of values; track $index) {
              <tr>
                <td><input type="text" [(ngModel)]="value.phrase" placeholder="Enter value..." /></td>
                <td><textarea [(ngModel)]="value.explanation" rows="3" placeholder="Explain this value..."></textarea></td>
              </tr>
            }
          </tbody>
        </table>
        <div class="table-actions">
          <button class="add-btn" (click)="addValue()">Add Value</button>
          <button class="save-btn" (click)="saveValues()">Save Values</button>
        </div>
      </div>
    </div>

    <div class="vm-section">
      <h2 class="vm-section-title">The Path to Get There</h2>

      <div class="vm-card">
        <h3>10 Year Target</h3>
        <textarea [(ngModel)]="tenYearTarget" rows="6" placeholder="Describe your 10 year target..."></textarea>
        <button class="save-btn" (click)="saveTenYear()">Save</button>
      </div>

      <div class="vm-card">
        <h3>3 Year Picture</h3>
        <textarea [(ngModel)]="threeYearPicture" rows="6" placeholder="Describe your 3 year picture..."></textarea>
        <button class="save-btn" (click)="saveThreeYear()">Save</button>
      </div>

      <div class="vm-card">
        <h3>1 Year Plan</h3>
        <textarea [(ngModel)]="oneYearPlan" rows="6" placeholder="Describe your 1 year plan..."></textarea>
        <button class="save-btn" (click)="saveOneYear()">Save</button>
      </div>

      <div class="vm-card">
        <h3>Quarterly Rocks</h3>
        <textarea [(ngModel)]="quarterlyRocks" rows="6" placeholder="List your quarterly rocks..."></textarea>
        <button class="save-btn" (click)="saveQuarterlyRocks()">Save</button>
      </div>
    </div>
  `,
  styles: [`
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
    .vm-section { margin-bottom: 40px; }
    .vm-section-title {
      font-size: 1.6rem; font-weight: 700; color: #4a4a6a;
      border-bottom: 2px solid #7c5cbf; padding-bottom: 8px; margin-bottom: 20px;
    }
    .vm-card {
      background: #fff; border-radius: 12px; padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 20px;
    }
    h3 { font-size: 1.1rem; font-weight: 700; color: #333; margin-bottom: 12px; }
    textarea {
      width: 100%; resize: vertical; padding: 12px; font-size: 0.95rem;
      border: 1px solid #ddd; border-radius: 8px; font-family: inherit;
      color: #333; background: #fafafa;
    }
    textarea:focus { outline: none; border-color: #7c5cbf; background: #fff; }
    .save-btn {
      margin-top: 12px; padding: 8px 22px; background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff; border: none; border-radius: 8px; font-size: 0.9rem;
      font-weight: 600; cursor: pointer; transition: opacity 0.2s;
    }
    .save-btn:hover { opacity: 0.88; }
    .values-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .values-table th {
      text-align: left; padding: 8px 12px; font-size: 0.85rem;
      color: #666; border-bottom: 2px solid #eee; background: #f7f7fb;
    }
    .values-table td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
    .values-table input[type="text"] {
      width: 100%; padding: 8px 10px; border: 1px solid #ddd;
      border-radius: 6px; font-size: 0.9rem; font-family: inherit; background: #fafafa;
    }
    .values-table input[type="text"]:focus { outline: none; border-color: #7c5cbf; background: #fff; }
    .values-table textarea { min-height: 64px; }
    .table-actions { display: flex; gap: 12px; align-items: center; }
    .add-btn {
      padding: 8px 22px; background: #fff; color: #7c5cbf;
      border: 2px solid #7c5cbf; border-radius: 8px; font-size: 0.9rem;
      font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s;
    }
    .add-btn:hover { background: #7c5cbf; color: #fff; }
  `]
})
export class VisionMap {
  missionStatement = '';
  visionStatement = '';
  values: Value[] = [{ phrase: '', explanation: '' }];
  tenYearTarget = '';
  threeYearPicture = '';
  oneYearPlan = '';
  quarterlyRocks = '';

  addValue(): void {
    this.values.push({ phrase: '', explanation: '' });
  }

  saveMission(): void { /* persist missionStatement */ }
  saveVision(): void { /* persist visionStatement */ }
  saveValues(): void { /* persist values */ }
  saveTenYear(): void { /* persist tenYearTarget */ }
  saveThreeYear(): void { /* persist threeYearPicture */ }
  saveOneYear(): void { /* persist oneYearPlan */ }
  saveQuarterlyRocks(): void { /* persist quarterlyRocks */ }
}
