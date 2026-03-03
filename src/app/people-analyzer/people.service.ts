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
      name: 'John',
      reports: [{ id: 1, date: '2026-03-01', spiritual: 7, mental: 8, academic: 6, behavioral: 9, notes: '' }],
    },
    {
      id: 2,
      name: 'Jane',
      reports: [{ id: 2, date: '2026-03-01', spiritual: 8, mental: 7, academic: 9, behavioral: 8, notes: '' }],
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
