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
        <p class="vm-display-text">{{ missionStatement || 'No mission statement set.' }}</p>
        @if (editingMission) {
          <textarea class="vm-edit-textarea" [(ngModel)]="missionDraft" rows="6" placeholder="Enter your family's mission statement..."></textarea>
          <button class="save-btn" (click)="saveMission()">Save</button>
        }
        <button class="edit-btn" (click)="startEditMission()">Edit</button>
      </div>

      <div class="vm-card">
        <h3>Vision Statement</h3>
        <p class="vm-display-text">{{ visionStatement || 'No vision statement set.' }}</p>
        @if (editingVision) {
          <textarea class="vm-edit-textarea" [(ngModel)]="visionDraft" rows="6" placeholder="Enter your family's vision statement..."></textarea>
          <button class="save-btn" (click)="saveVision()">Save</button>
        }
        <button class="edit-btn" (click)="startEditVision()">Edit</button>
      </div>

      <div class="vm-card">
        <h3>Values</h3>
        <div class="values-display">
          @if (hasValues()) {
            @for (value of values; track $index) {
              @if (value.phrase) {
                <div class="value-item">
                  <strong>{{ value.phrase }}</strong>
                  @if (value.explanation) {
                    <p>{{ value.explanation }}</p>
                  }
                </div>
              }
            }
          } @else {
            <p class="vm-display-text">No values defined.</p>
          }
        </div>
        @if (editingValues) {
          <table class="values-table">
            <thead>
              <tr>
                <th>Value</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              @for (value of valuesDraft; track $index) {
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
        }
        <button class="edit-btn" (click)="startEditValues()">Edit</button>
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
    .vm-section { margin-bottom: 40px; }
    .vm-section-title {
      font-size: 1.6rem; font-weight: 700; color: #4a4a6a;
      border-bottom: 2px solid #7c5cbf; padding-bottom: 8px; margin-bottom: 20px;
    }
    .vm-card {
      background: #fff; border-radius: 12px; padding: 24px 24px 56px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 20px;
      position: relative;
    }
    h3 { font-size: 1.1rem; font-weight: 700; color: #333; margin-bottom: 12px; }
    .vm-display-text {
      font-size: 0.95rem; color: #555; line-height: 1.6;
      white-space: pre-wrap; min-height: 1.6em;
    }
    .vm-edit-textarea {
      width: 100%; resize: vertical; padding: 12px; font-size: 0.95rem;
      border: 1px solid #ddd; border-radius: 8px; font-family: inherit;
      color: #333; background: #fafafa; margin-top: 12px; display: block;
    }
    .vm-edit-textarea:focus { outline: none; border-color: #7c5cbf; background: #fff; }
    textarea {
      width: 100%; resize: vertical; padding: 12px; font-size: 0.95rem;
      border: 1px solid #ddd; border-radius: 8px; font-family: inherit;
      color: #333; background: #fafafa;
    }
    textarea:focus { outline: none; border-color: #7c5cbf; background: #fff; }
    .save-btn {
      margin-top: 12px; padding: 8px 22px; background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff; border: none; border-radius: 8px; font-size: 0.9rem;
      font-weight: 600; cursor: pointer; transition: opacity 0.2s; display: inline-block;
    }
    .save-btn:hover { opacity: 0.88; }
    .edit-btn {
      position: absolute; bottom: 16px; right: 16px;
      padding: 6px 18px; background: #fff; color: #7c5cbf;
      border: 2px solid #7c5cbf; border-radius: 8px; font-size: 0.85rem;
      font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s;
    }
    .edit-btn:hover { background: #7c5cbf; color: #fff; }
    .values-display { margin-bottom: 8px; }
    .value-item {
      padding: 8px 0; border-bottom: 1px solid #f0f0f0; margin-bottom: 4px;
    }
    .value-item strong { font-size: 0.95rem; color: #333; }
    .value-item p { font-size: 0.9rem; color: #666; margin-top: 4px; }
    .values-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; margin-top: 12px; }
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
  missionStatement = 'The Johnson family exists to honor God, love one another deeply, and make a lasting positive impact on our community and the world. We commit to growing together in faith, character, and purpose — raising children who are confident, compassionate, and capable of leading lives of significance.';
  missionDraft = '';
  editingMission = false;

  visionStatement = 'By 2036, the Johnson family will be debt-free, thriving financially, and deeply connected in faith and relationship. Our children will be confident, well-educated adults with strong character and clear purpose. We will own our home outright, give generously to causes we believe in, and take one major family adventure every year.';
  visionDraft = '';
  editingVision = false;

  values: Value[] = [
    { phrase: 'Faith First',       explanation: 'We anchor every decision in our faith and trust God with our family\'s story.' },
    { phrase: 'Intentional Love',  explanation: 'We choose to love each other on purpose — through words, time, and service.' },
    { phrase: 'Grow Every Day',    explanation: 'We never stop learning. Every family member pursues growth in mind, body, and spirit.' },
    { phrase: 'Do Hard Things',    explanation: 'We embrace challenge and discomfort as the path to strength and resilience.' },
    { phrase: 'Serve Others',      explanation: 'We look for ways to give back and use our blessings to bless those around us.' },
  ];
  valuesDraft: Value[] = [];
  editingValues = false;

  tenYearTarget = '— All children are college-educated or in purposeful careers with strong character.\n— Home is paid off; net worth exceeds $1.5M.\n— James and Sarah are financially independent and giving 20%+ of income annually.\n— The family takes one international trip together each year.\n— Each child has a personal faith life, strong relationships, and a clear sense of calling.';
  threeYearPicture = '— Car loans fully paid off.\n— 529 accounts funded at $50K+ per child.\n— Ethan accepted to and enrolled in college.\n— Lily leading a school leadership role.\n— Noah in a competitive sports program.\n— Ava reading and performing at 2 grade levels above average.\n— Family emergency fund at 6 months of expenses ($48K).';
  oneYearPlan = '— Pay off both car loans.\n— Increase retirement contributions to 15% of income.\n— Complete family vision map refresh each quarter.\n— Host one family service project per quarter.\n— Ethan completes SAT prep and applies to 5 colleges.\n— Family completes one 5-day vacation together.';
  quarterlyRocks = 'Q1 2026:\n1. James — Complete budget overhaul and open new savings sub-accounts.\n2. Sarah — Research and book family summer vacation.\n3. Ethan — Score 1300+ on practice SAT.\n4. Lily — Read 3 books from the family reading list.\n5. Noah — Finish soccer season with strong attendance.\n6. Ava — Complete phonics level 3 workbook.';

  hasValues(): boolean {
    return this.values.some(v => v.phrase.trim() !== '');
  }

  startEditMission(): void {
    this.missionDraft = this.missionStatement;
    this.editingMission = true;
  }

  saveMission(): void {
    this.missionStatement = this.missionDraft;
    this.editingMission = false;
  }

  startEditVision(): void {
    this.visionDraft = this.visionStatement;
    this.editingVision = true;
  }

  saveVision(): void {
    this.visionStatement = this.visionDraft;
    this.editingVision = false;
  }

  startEditValues(): void {
    // Value is a flat object so spread copy is sufficient
    this.valuesDraft = this.values.map(v => ({ ...v }));
    this.editingValues = true;
  }

  addValue(): void {
    if (this.editingValues) {
      this.valuesDraft.push({ phrase: '', explanation: '' });
    }
  }

  saveValues(): void {
    this.values = this.valuesDraft.map(v => ({ ...v }));
    this.editingValues = false;
  }

  saveTenYear(): void { /* persist tenYearTarget */ }
  saveThreeYear(): void { /* persist threeYearPicture */ }
  saveOneYear(): void { /* persist oneYearPlan */ }
  saveQuarterlyRocks(): void { /* persist quarterlyRocks */ }
}
