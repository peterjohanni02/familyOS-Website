import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  notes: string;
  status: string;
  priority: string;
}

export interface Issue {
  id: string;
  text: string;
}

const STAGES = [
  { id: 'future',      label: 'Future' },
  { id: 'assigned',    label: 'Assigned' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'roadblocked', label: 'Roadblocked' },
  { id: 'completed',   label: 'Completed' },
];

const PRIORITIES = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];

const PRIORITY_CLASS: Record<string, string> = {
  'Today':        'badge-today',
  'This Week':    'badge-week',
  'This Month':   'badge-month',
  'This Quarter': 'badge-quarter',
  'This Year':    'badge-year',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

@Component({
  selector: 'app-tasks-issues',
  imports: [FormsModule, NgClass],
  template: `
    <div class="page-content">

      <!-- Page header -->
      <div class="page-header">
        <span class="section-icon">✅</span>
        <div>
          <h1>Tasks &amp; Issues</h1>
          <p>Track what needs to get done.</p>
        </div>
      </div>

      <!-- ── Tasks Section ── -->
      <section class="section">
        <div class="section-header">
          <h2>Tasks</h2>
          <button class="btn-primary" (click)="openTaskPopup(null)">+ Create New Task</button>
        </div>
        <div class="kanban-scroll">
          @for (stage of stages; track stage.id) {
            <div class="kanban-col" [attr.data-stage]="stage.id">
              <div class="kanban-col-header">
                <span class="kanban-col-title">{{ stage.label }}</span>
                <span class="kanban-col-count">{{ tasksForStage(stage.id).length }}</span>
              </div>
              <div class="kanban-cards"
                [class.drop-target]="dragOverStage() === stage.id"
                (dragover)="onColumnDragOver($event)"
                (drop)="onColumnDrop($event, stage.id)"
                (dragenter)="onColumnDragEnter($event, stage.id)"
                (dragleave)="onColumnDragLeave($event)">
                @if (tasksForStage(stage.id).length === 0) {
                  <div class="empty-state">No tasks</div>
                }
                @for (task of tasksForStage(stage.id); track task.id) {
                  <div class="kanban-card"
                    draggable="true"
                    [class.dragging]="draggingTaskId() === task.id"
                    (dragstart)="onCardDragStart($event, task.id)"
                    (dragend)="onCardDragEnd()"
                    (click)="openTaskPopup(task.id)"
                    tabindex="0" role="button" [attr.aria-label]="task.title">
                    <div class="kanban-card-title">{{ task.title }}</div>
                    <div class="kanban-card-meta">
                      @if (task.priority) {
                        <span class="badge" [ngClass]="priorityClass(task.priority)">{{ task.priority }}</span>
                      }
                      @if (task.assignee) {
                        <span class="badge badge-assignee">{{ task.assignee }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ── Issues Section ── -->
      <section class="section">
        <div class="section-header">
          <h2>Issues List</h2>
          <button class="btn-primary" (click)="addIssue()">+ Add Issue</button>
        </div>
        <div class="issues-list">
          @if (issues().length === 0 && editingIssueIndex() !== -2) {
            <div class="empty-state">No issues yet. Click "+ Add Issue" to add one.</div>
          }
          @for (issue of issues(); track issue.id; let i = $index) {
            <div class="issue-item">
              <span class="issue-drag-handle">⠿</span>
              @if (i === editingIssueIndex()) {
                <input class="issue-input" [(ngModel)]="issueEditText"
                  (keydown.enter)="saveIssueEdit(i)"
                  (keydown.escape)="cancelIssueEdit()"
                  #issueEditEl />
                <div class="issue-actions">
                  <button class="btn-primary" (click)="saveIssueEdit(i)">Save</button>
                  <button class="btn-secondary" (click)="cancelIssueEdit()">Cancel</button>
                </div>
              } @else {
                <span class="issue-text">{{ issue.text }}</span>
                <div class="issue-actions">
                  <button class="btn-icon" (click)="moveIssue(i, -1)" [disabled]="i === 0" title="Move up">▲</button>
                  <button class="btn-icon" (click)="moveIssue(i, 1)"  [disabled]="i === issues().length - 1" title="Move down">▼</button>
                  <button class="btn-icon" (click)="startEditIssue(i)" title="Edit">✏️</button>
                  <button class="btn-icon delete" (click)="deleteIssue(i)" title="Delete">🗑️</button>
                </div>
              }
            </div>
          }
          @if (editingIssueIndex() === -2) {
            <div class="issue-item">
              <span class="issue-drag-handle">⠿</span>
              <input class="issue-input" [(ngModel)]="newIssueText" placeholder="Enter issue description..."
                (keydown.enter)="saveNewIssue()"
                (keydown.escape)="cancelNewIssue()" />
              <div class="issue-actions">
                <button class="btn-primary" (click)="saveNewIssue()">Add</button>
                <button class="btn-secondary" (click)="cancelNewIssue()">Cancel</button>
              </div>
            </div>
          }
        </div>
      </section>

    </div>

    <!-- ── Task Detail Popup ── -->
    @if (showTaskPopup()) {
      <div class="popup-overlay" (click)="onOverlayClick($event)" role="dialog" aria-modal="true">
        <div class="popup">
          <h2>{{ editingTaskId() ? 'Edit Task' : 'New Task' }}</h2>
          <div class="form-group">
            <label for="task-title">Title</label>
            <input id="task-title" type="text" class="form-control" [(ngModel)]="popupTitle" placeholder="Enter task title" />
          </div>
          <div class="form-group">
            <label for="task-assignee">Assignee</label>
            <input id="task-assignee" type="text" class="form-control" [(ngModel)]="popupAssignee" placeholder="Who is responsible?" />
          </div>
          <div class="form-group">
            <label for="task-notes">Notes</label>
            <textarea id="task-notes" class="form-control" [(ngModel)]="popupNotes" placeholder="Add any notes or details..."></textarea>
          </div>
          <div class="form-group">
            <label for="task-status">Status</label>
            <select id="task-status" class="form-control" [(ngModel)]="popupStatus">
              @for (stage of stages; track stage.id) {
                <option [value]="stage.id">{{ stage.label }}</option>
              }
            </select>
          </div>
          <div class="form-group">
            <label for="task-priority">Priority</label>
            <select id="task-priority" class="form-control" [(ngModel)]="popupPriority">
              @for (p of priorities; track p) {
                <option [value]="p">{{ p }}</option>
              }
            </select>
          </div>
          <div class="popup-actions">
            <button class="btn-secondary" (click)="closeTaskPopup()">Close</button>
            <button class="btn-primary" (click)="saveTask()">Save</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }

    .page-content { padding: 32px 40px; }

    .page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
    .page-header .section-icon { font-size: 2.5rem; }
    .page-header h1 {
      font-size: 2rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; margin-bottom: 4px;
    }
    .page-header p { color: #666; font-size: 0.95rem; }

    .section {
      background: #fff; border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,.07);
      margin-bottom: 32px; overflow: hidden;
    }
    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px; border-bottom: 1px solid #eee;
    }
    .section-header h2 { font-size: 1.2rem; font-weight: 700; color: #1e1e2e; }

    .btn-primary {
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff; border: none; border-radius: 8px;
      padding: 8px 16px; font-size: 0.88rem; font-weight: 600;
      cursor: pointer; transition: opacity .15s;
    }
    .btn-primary:hover { opacity: 0.85; }
    .btn-secondary {
      background: #f0f2f5; color: #444; border: none;
      border-radius: 8px; padding: 8px 16px;
      font-size: 0.88rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .btn-secondary:hover { background: #e2e5ea; }

    .kanban-scroll {
      display: flex; overflow-x: auto; padding: 20px 24px; gap: 16px;
      scrollbar-width: thin; scrollbar-color: #ddd #f0f2f5;
    }
    .kanban-col { min-width: 230px; max-width: 230px; flex-shrink: 0; }
    .kanban-col-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .kanban-col-title {
      font-size: 0.82rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px; color: #555;
    }
    .kanban-col-count {
      background: #f0f2f5; color: #888;
      border-radius: 999px; padding: 1px 8px;
      font-size: 0.72rem; font-weight: 600;
    }
    .kanban-col[data-stage="future"]      .kanban-col-title { color: #7c5cbf; }
    .kanban-col[data-stage="assigned"]    .kanban-col-title { color: #1565c0; }
    .kanban-col[data-stage="in-progress"] .kanban-col-title { color: #e65100; }
    .kanban-col[data-stage="roadblocked"] .kanban-col-title { color: #d32f2f; }
    .kanban-col[data-stage="completed"]   .kanban-col-title { color: #2e7d32; }

    .kanban-cards { display: flex; flex-direction: column; gap: 10px; min-height: 60px; border-radius: 8px; transition: background .15s, outline .15s; }
    .kanban-cards.drop-target { background: rgba(124,92,191,.08); outline: 2px dashed #7c5cbf; }
    .kanban-card {
      background: #f8f9fc; border: 1px solid #e8eaed;
      border-radius: 10px; padding: 12px 14px;
      cursor: grab; transition: box-shadow .15s, border-color .15s, opacity .15s;
    }
    .kanban-card:hover { box-shadow: 0 3px 12px rgba(0,0,0,.1); border-color: #c8cdd6; }
    .kanban-card.dragging { opacity: 0.4; cursor: grabbing; }
    .kanban-card-title { font-size: 0.88rem; font-weight: 600; color: #1e1e2e; margin-bottom: 6px; }
    .kanban-card-meta { display: flex; gap: 6px; flex-wrap: wrap; }

    .badge { font-size: 0.7rem; font-weight: 600; padding: 2px 7px; border-radius: 999px; }
    .badge-today    { background: #fde8e8; color: #d32f2f; }
    .badge-week     { background: #fff3e0; color: #e65100; }
    .badge-month    { background: #e8f5e9; color: #2e7d32; }
    .badge-quarter  { background: #e3f2fd; color: #1565c0; }
    .badge-year     { background: #f3e5f5; color: #6a1b9a; }
    .badge-assignee { background: #ede7f6; color: #4527a0; }

    .issues-list { padding: 16px 24px; }
    .issue-item {
      display: flex; align-items: center; gap: 10px;
      padding: 11px 14px; background: #f8f9fc;
      border: 1px solid #e8eaed; border-radius: 10px; margin-bottom: 10px;
    }
    .issue-drag-handle { color: #bbb; font-size: 1rem; flex-shrink: 0; line-height: 1; }
    .issue-text { flex: 1; font-size: 0.92rem; color: #1e1e2e; }
    .issue-input {
      flex: 1; font-size: 0.92rem; color: #1e1e2e;
      border: 1px solid #c8cdd6; border-radius: 6px;
      padding: 5px 9px; font-family: inherit; outline: none;
    }
    .issue-input:focus { border-color: #7c5cbf; }
    .issue-actions { display: flex; gap: 4px; flex-shrink: 0; }
    .btn-icon {
      background: none; border: none; cursor: pointer;
      font-size: 0.95rem; padding: 4px 6px;
      border-radius: 6px; transition: background .15s; color: #666; line-height: 1;
    }
    .btn-icon:hover { background: #e8eaed; }
    .btn-icon:disabled { opacity: 0.3; cursor: default; pointer-events: none; }
    .btn-icon.delete:hover { background: #fde8e8; color: #d32f2f; }

    .popup-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.4);
      z-index: 200; display: flex; align-items: center;
      justify-content: center; padding: 20px;
    }
    .popup {
      background: #fff; border-radius: 16px; padding: 28px 32px;
      width: 100%; max-width: 480px;
      box-shadow: 0 20px 60px rgba(0,0,0,.15);
    }
    .popup h2 { font-size: 1.25rem; font-weight: 700; color: #1e1e2e; margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label {
      display: block; font-size: 0.78rem; font-weight: 700;
      color: #555; margin-bottom: 5px;
      text-transform: uppercase; letter-spacing: .3px;
    }
    .form-control {
      width: 100%; border: 1px solid #dde1e8; border-radius: 8px;
      padding: 9px 12px; font-size: 0.92rem; font-family: inherit;
      color: #1e1e2e; background: #fafafa; outline: none;
      transition: border-color .15s;
    }
    .form-control:focus { border-color: #7c5cbf; background: #fff; }
    textarea.form-control { resize: vertical; min-height: 80px; }
    .popup-actions {
      display: flex; gap: 10px; justify-content: flex-end;
      margin-top: 22px; padding-top: 18px; border-top: 1px solid #eee;
    }
    .empty-state { text-align: center; padding: 20px; color: #aaa; font-size: 0.88rem; }
  `]
})
export class TasksIssues {
  readonly stages = STAGES;
  readonly priorities = PRIORITIES;

  private _tasks = signal<Task[]>(loadFromStorage<Task[]>('familyos-tasks', []));
  readonly issues = signal<Issue[]>(loadFromStorage<Issue[]>('familyos-issues', []));

  readonly showTaskPopup = signal(false);
  readonly editingTaskId = signal<string | null>(null);

  readonly draggingTaskId = signal<string | null>(null);
  readonly dragOverStage  = signal<string | null>(null);

  popupTitle    = '';
  popupAssignee = '';
  popupNotes    = '';
  popupStatus   = 'future';
  popupPriority = 'This Week';

  readonly editingIssueIndex = signal(-1);
  issueEditText = '';
  newIssueText  = '';

  tasksForStage(stageId: string): Task[] {
    return this._tasks().filter(t => t.status === stageId);
  }

  priorityClass(priority: string): string {
    return PRIORITY_CLASS[priority] ?? '';
  }

  onCardDragStart(event: DragEvent, taskId: string): void {
    this.draggingTaskId.set(taskId);
    event.dataTransfer?.setData('text/plain', taskId);
  }

  onCardDragEnd(): void {
    this.draggingTaskId.set(null);
    this.dragOverStage.set(null);
  }

  onColumnDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onColumnDragEnter(event: DragEvent, stageId: string): void {
    event.preventDefault();
    this.dragOverStage.set(stageId);
  }

  onColumnDragLeave(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target.contains(event.relatedTarget as Node)) {
      this.dragOverStage.set(null);
    }
  }

  onColumnDrop(event: DragEvent, stageId: string): void {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text/plain') ?? this.draggingTaskId();
    if (taskId) {
      this._tasks.update(ts => ts.map(t => t.id === taskId ? { ...t, status: stageId } : t));
      localStorage.setItem('familyos-tasks', JSON.stringify(this._tasks()));
    }
    this.draggingTaskId.set(null);
    this.dragOverStage.set(null);
  }

  openTaskPopup(taskId: string | null): void {
    this.editingTaskId.set(taskId);
    if (taskId) {
      const task = this._tasks().find(t => t.id === taskId);
      if (task) {
        this.popupTitle    = task.title;
        this.popupAssignee = task.assignee;
        this.popupNotes    = task.notes;
        this.popupStatus   = task.status;
        this.popupPriority = task.priority;
      }
    } else {
      this.popupTitle    = '';
      this.popupAssignee = '';
      this.popupNotes    = '';
      this.popupStatus   = 'future';
      this.popupPriority = 'This Week';
    }
    this.showTaskPopup.set(true);
  }

  closeTaskPopup(): void {
    this.showTaskPopup.set(false);
    this.editingTaskId.set(null);
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
      this.closeTaskPopup();
    }
  }

  saveTask(): void {
    const title = this.popupTitle.trim();
    if (!title) return;
    const taskData = {
      title,
      assignee: this.popupAssignee.trim(),
      notes:    this.popupNotes.trim(),
      status:   this.popupStatus,
      priority: this.popupPriority,
    };
    const id = this.editingTaskId();
    if (id) {
      this._tasks.update(ts => ts.map(t => t.id === id ? { ...t, ...taskData } : t));
    } else {
      this._tasks.update(ts => [...ts, { id: Date.now().toString(), ...taskData }]);
    }
    localStorage.setItem('familyos-tasks', JSON.stringify(this._tasks()));
    this.closeTaskPopup();
  }

  addIssue(): void {
    this.newIssueText = '';
    this.editingIssueIndex.set(-2);
  }

  startEditIssue(i: number): void {
    this.issueEditText = this.issues()[i].text;
    this.editingIssueIndex.set(i);
  }

  saveIssueEdit(i: number): void {
    const text = this.issueEditText.trim();
    if (text) {
      this.issues.update(list => list.map((iss, idx) => idx === i ? { ...iss, text } : iss));
      localStorage.setItem('familyos-issues', JSON.stringify(this.issues()));
    }
    this.editingIssueIndex.set(-1);
  }

  cancelIssueEdit(): void {
    this.editingIssueIndex.set(-1);
  }

  saveNewIssue(): void {
    const text = this.newIssueText.trim();
    if (text) {
      this.issues.update(list => [...list, { id: Date.now().toString(), text }]);
      localStorage.setItem('familyos-issues', JSON.stringify(this.issues()));
    }
    this.editingIssueIndex.set(-1);
  }

  cancelNewIssue(): void {
    this.editingIssueIndex.set(-1);
  }

  deleteIssue(i: number): void {
    this.issues.update(list => list.filter((_, idx) => idx !== i));
    localStorage.setItem('familyos-issues', JSON.stringify(this.issues()));
    if (this.editingIssueIndex() === i) this.editingIssueIndex.set(-1);
  }

  moveIssue(i: number, direction: number): void {
    const j = i + direction;
    const list = [...this.issues()];
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    this.issues.set(list);
    localStorage.setItem('familyos-issues', JSON.stringify(list));
  }
}
