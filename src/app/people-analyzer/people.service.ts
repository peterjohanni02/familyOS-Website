import { Injectable } from '@angular/core';

export interface PersonReport {
  id: number;
  date: string;
  spiritual: number;
  mental: number;
  academic: number;
  behavioral: number;
  notes: string;
}

export interface Person {
  id: number;
  name: string;
  reports: PersonReport[];
}

@Injectable({ providedIn: 'root' })
export class PeopleService {
  people: Person[] = [
    {
      id: 1,
      name: 'James',
      reports: [
        { id: 1, date: '2026-01-06', spiritual: 8, mental: 7, academic: 0, behavioral: 8, notes: 'Solid week, led family devotional.' },
        { id: 2, date: '2026-02-03', spiritual: 9, mental: 8, academic: 0, behavioral: 9, notes: 'Great attitude and intentionality.' },
        { id: 3, date: '2026-03-03', spiritual: 8, mental: 9, academic: 0, behavioral: 8, notes: 'Focused on leadership development.' },
      ],
    },
    {
      id: 2,
      name: 'Sarah',
      reports: [
        { id: 4, date: '2026-01-06', spiritual: 9, mental: 8, academic: 0, behavioral: 9, notes: 'Encouraging and present this week.' },
        { id: 5, date: '2026-02-03', spiritual: 9, mental: 7, academic: 0, behavioral: 9, notes: 'Managing stress well overall.' },
        { id: 6, date: '2026-03-03', spiritual: 10, mental: 8, academic: 0, behavioral: 10, notes: 'Exceptional week of connection.' },
      ],
    },
    {
      id: 3,
      name: 'Ethan',
      reports: [
        { id: 7, date: '2026-01-06', spiritual: 7, mental: 6, academic: 8, behavioral: 7, notes: 'Staying on top of schoolwork.' },
        { id: 8, date: '2026-02-03', spiritual: 6, mental: 7, academic: 9, behavioral: 6, notes: 'Grades improving; some attitude issues.' },
        { id: 9, date: '2026-03-03', spiritual: 7, mental: 8, academic: 8, behavioral: 8, notes: 'Positive week, good with siblings.' },
      ],
    },
    {
      id: 4,
      name: 'Lily',
      reports: [
        { id: 10, date: '2026-01-06', spiritual: 8, mental: 8, academic: 9, behavioral: 8, notes: 'Excellent academic focus.' },
        { id: 11, date: '2026-02-03', spiritual: 8, mental: 7, academic: 8, behavioral: 9, notes: 'Helpful around the house.' },
        { id: 12, date: '2026-03-03', spiritual: 9, mental: 8, academic: 9, behavioral: 9, notes: 'Strong week on all fronts.' },
      ],
    },
    {
      id: 5,
      name: 'Noah',
      reports: [
        { id: 13, date: '2026-01-06', spiritual: 7, mental: 7, academic: 7, behavioral: 6, notes: 'Working on listening skills.' },
        { id: 14, date: '2026-02-03', spiritual: 7, mental: 8, academic: 7, behavioral: 7, notes: 'Good progress with behavior.' },
        { id: 15, date: '2026-03-03', spiritual: 8, mental: 7, academic: 8, behavioral: 8, notes: 'Showed great kindness to Ava.' },
      ],
    },
    {
      id: 6,
      name: 'Ava',
      reports: [
        { id: 16, date: '2026-01-06', spiritual: 9, mental: 8, academic: 8, behavioral: 9, notes: 'Very joyful and creative.' },
        { id: 17, date: '2026-02-03', spiritual: 9, mental: 9, academic: 8, behavioral: 9, notes: 'Reading ahead in school.' },
        { id: 18, date: '2026-03-03', spiritual: 10, mental: 9, academic: 9, behavioral: 10, notes: 'Outstanding week all around.' },
      ],
    },
  ];

  getById(id: number): Person | undefined {
    return this.people.find(p => p.id === id);
  }

  add(person: Person): void {
    this.people = [...this.people, person];
  }

  update(person: Person): void {
    this.people = this.people.map(p => (p.id === person.id ? person : p));
  }
}
