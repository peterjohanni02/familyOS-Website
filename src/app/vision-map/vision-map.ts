import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RocksService, Rock, RockStatus } from './rocks.service';

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

      <div class="vm-card rocks-card">
        <h3>Quarterly Rocks</h3>
        <table class="rocks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Quarter</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            @for (rock of rocks; track rock.id) {
              <tr (click)="openRock(rock)">
                <td>{{ rock.title }}</td>
                <td>{{ rock.year }}</td>
                <td>Q{{ rock.quarter }}</td>
                <td><span [class]="'status-badge ' + statusClass(rock.status)">{{ rock.status }}</span></td>
                <td>{{ rock.owner }}</td>
              </tr>
            }
            @if (!rocks.length) {
              <tr class="empty-row"><td colspan="5">No rocks yet. Add one below.</td></tr>
            }
          </tbody>
        </table>
        <button class="add-btn" (click)="openNewRock()">+ New Rock</button>
      </div>
    </div>

    @if (showRockPopup) {
      <div class="modal-overlay" (click)="closeRockPopup()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>{{ editingRock ? 'Edit Rock' : 'New Rock' }}</h2>
          <div class="form-field">
            <label>Title</label>
            <input type="text" [(ngModel)]="draftRock.title" placeholder="Rock title..." />
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Year</label>
              <input type="number" [(ngModel)]="draftRock.year" placeholder="2025" />
            </div>
            <div class="form-field">
              <label>Quarter</label>
              <select [(ngModel)]="draftRock.quarter">
                <option [ngValue]="1">Q1</option>
                <option [ngValue]="2">Q2</option>
                <option [ngValue]="3">Q3</option>
                <option [ngValue]="4">Q4</option>
              </select>
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
              <input type="text" [(ngModel)]="draftRock.owner" placeholder="Owner..." />
            </div>
          </div>
          <div class="form-field">
            <label>Description</label>
            <textarea [(ngModel)]="draftRock.description" rows="3" placeholder="Describe this rock..."></textarea>
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
      padding: 8px 22px; background: #7c5cbf; color: #fff;
      border: none; border-radius: 8px; font-size: 0.9rem;
      font-weight: 600; cursor: pointer; transition: background 0.2s;
    }
    .add-btn:hover { background: #5a3fa0; }
    .rocks-card { padding-bottom: 24px; }
    .rocks-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; margin-top: 12px; }
    .rocks-table th {
      text-align: left; padding: 8px 12px; font-size: 0.85rem;
      color: #666; border-bottom: 2px solid #eee; background: #f7f7fb;
    }
    .rocks-table td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: middle; font-size: .95rem; color: #333; }
    .rocks-table tbody tr { cursor: pointer; transition: background .15s; }
    .rocks-table tbody tr:hover { background: #f5f3ff; }
    .rocks-table tbody tr:last-child { border-bottom: none; }
    .empty-row td { color: #aaa; font-style: italic; text-align: center; padding: 16px; }
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
    .form-field input[type="text"], .form-field input[type="number"], .form-field select {
      padding: 8px 10px; border: 2px solid #d6ccf5; border-radius: 8px;
      font-size: .95rem; font-family: inherit; color: #1e1e2e; background: #faf9ff;
      transition: border-color .15s;
    }
    .form-field input[type="text"]:focus,
    .form-field input[type="number"]:focus,
    .form-field select:focus { outline: none; border-color: #7c5cbf; }
    .form-field textarea {
      padding: 8px 10px; border: 2px solid #d6ccf5; border-radius: 8px;
      font-size: .95rem; font-family: inherit; color: #1e1e2e; background: #faf9ff;
      resize: vertical; transition: border-color .15s;
    }
    .form-field textarea:focus { outline: none; border-color: #7c5cbf; }
    .form-row { display: flex; gap: 16px; }
    .form-row .form-field { flex: 1; }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
    .close-btn {
      padding: 10px 20px; background: #f5f3ff; color: #7c5cbf;
      border: 1px solid #d6ccf5; border-radius: 8px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .close-btn:hover { background: #ede8ff; }
  `]
})
export class VisionMap {
  missionStatement = '';
  missionDraft = '';
  editingMission = false;

  visionStatement = '';
  visionDraft = '';
  editingVision = false;

  values: Value[] = [{ phrase: '', explanation: '' }];
  valuesDraft: Value[] = [];
  editingValues = false;

  tenYearTarget = '';
  threeYearPicture = '';
  oneYearPlan = '';

  showRockPopup = false;
  editingRock: Rock | null = null;
  draftRock: Rock = this.emptyRock();

  get rocks(): Rock[] {
    return this.rocksService.rocks;
  }

  constructor(private rocksService: RocksService) {}

  private emptyRock(): Rock {
    const now = new Date();
    const quarter = (Math.floor(now.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
    return { id: 0, title: '', year: now.getFullYear(), quarter, status: 'not begun', owner: '', description: '', notes: '' };
  }

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

  openNewRock(): void {
    this.editingRock = null;
    this.draftRock = this.emptyRock();
    this.draftRock.id = Date.now();
    this.showRockPopup = true;
  }

  openRock(rock: Rock): void {
    this.editingRock = rock;
    this.draftRock = { ...rock };
    this.showRockPopup = true;
  }

  saveRock(): void {
    if (this.editingRock) {
      this.rocksService.update({ ...this.draftRock });
    } else {
      this.rocksService.add({ ...this.draftRock });
    }
    this.showRockPopup = false;
    this.editingRock = null;
  }

  closeRockPopup(): void {
    this.showRockPopup = false;
    this.editingRock = null;
  }

  statusClass(status: RockStatus): string {
    return 'status-' + status.replace(/\s+/g, '-');
  }
}
