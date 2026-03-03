import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksIssues } from './tasks-issues';

describe('TasksIssues', () => {
  let component: TasksIssues;
  let fixture: ComponentFixture<TasksIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksIssues],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksIssues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
