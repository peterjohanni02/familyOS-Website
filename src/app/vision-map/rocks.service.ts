import { Injectable } from '@angular/core';

export type RockStatus = 'completed' | 'on track' | 'off track' | 'abandoned' | 'not begun';

export interface Rock {
  id: number;
  title: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  status: RockStatus;
  owner: string;
  description: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class RocksService {
  rocks: Rock[] = [];

  add(rock: Rock): void {
    this.rocks = [...this.rocks, rock];
  }

  update(rock: Rock): void {
    this.rocks = this.rocks.map(r => (r.id === rock.id ? rock : r));
  }

  getForQuarter(year: number, quarter: 1 | 2 | 3 | 4): Rock[] {
    return this.rocks.filter(r => r.year === year && r.quarter === quarter);
  }
}
