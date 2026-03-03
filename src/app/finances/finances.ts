import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

interface BudgetCategory {
  id: number;
  category: string;
  budget: number;
  spent: number;
}

interface Asset {
  name: string;
  value: number;
}

interface Debt {
  name: string;
  balance: number;
  interestRate: string;
}

@Component({
  selector: 'app-finances',
  imports: [CurrencyPipe],
  template: `
    <div class="page-content">
      <div class="page-header">
        <span class="section-icon">💰</span>
        <h1>Finances</h1>
        <p>Monitor your family's financial health.</p>
      </div>

      <!-- At a Glance -->
      <section class="fin-section">
        <h2 class="fin-section-title">At a Glance</h2>
      </section>

      <!-- Budget -->
      <section class="fin-section budget-section">
        <h2 class="fin-section-title">Budget</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Amount Left</th>
            </tr>
          </thead>
          <tbody>
            @for (row of budgetCategories; track row.id) {
              <tr (click)="openCategoryPopup(row)">
                <td>{{ row.category }}</td>
                <td>{{ row.budget | currency }}</td>
                <td>{{ row.spent | currency }}</td>
                <td [class.over-budget]="row.budget - row.spent < 0">{{ row.budget - row.spent | currency }}</td>
              </tr>
            }
          </tbody>
        </table>
        <button class="edit-budget-btn" (click)="goToBudgetDetail()">Edit Budget</button>
      </section>

      <!-- Balance Sheet -->
      <section class="fin-section">
        <h2 class="fin-section-title">Balance Sheet</h2>

        <h3 class="subsection-title">Assets</h3>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            @for (asset of assets; track asset.name) {
              <tr>
                <td>{{ asset.name }}</td>
                <td>{{ asset.value | currency }}</td>
              </tr>
            }
          </tbody>
        </table>

        <h3 class="subsection-title subsection-title-spaced">Debt Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Debt</th>
              <th>Balance</th>
              <th>Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            @for (debt of debts; track debt.name) {
              <tr>
                <td>{{ debt.name }}</td>
                <td>{{ debt.balance | currency }}</td>
                <td>{{ debt.interestRate }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
    </div>

    <!-- Budget Category Detail Popup -->
    @if (showCategoryPopup()) {
      <div class="popup-overlay" (click)="onOverlayClick($event)" role="dialog" aria-modal="true">
        <div class="popup">
          <div class="popup-header">
            <h2>Budget Category</h2>
            <button class="close-btn" (click)="closeCategoryPopup()" aria-label="Close">✕</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .page-content { width: 100%; max-width: 900px; }
    .page-header { margin-bottom: 32px; }
    .section-icon { font-size: 2.5rem; display: block; margin-bottom: 8px; }
    h1 {
      font-size: 2.4rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p { font-size: 1.05rem; color: #666; margin-top: 6px; }

    .fin-section { margin-bottom: 40px; }
    .fin-section-title {
      font-size: 1.6rem; font-weight: 700; color: #4a4a6a;
      border-bottom: 2px solid #7c5cbf; padding-bottom: 8px; margin-bottom: 20px;
    }
    .subsection-title { font-size: 1.1rem; font-weight: 700; color: #1e1e2e; margin-bottom: 12px; }
    .subsection-title-spaced { margin-top: 28px; }

    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    thead th { background: #f5f3ff; color: #7c5cbf; font-weight: 700; padding: 12px 16px; text-align: left; font-size: .92rem; text-transform: uppercase; letter-spacing: .05em; }
    tbody tr { border-bottom: 1px solid #f0f0f8; transition: background .15s; }
    tbody tr:last-child { border-bottom: none; }
    tbody td { padding: 12px 16px; color: #333; font-size: .95rem; }
    .budget-section tbody tr { cursor: pointer; }
    .budget-section tbody tr:hover { background: #f5f3ff; }
    .over-budget { color: #d32f2f; font-weight: 600; }

    .edit-budget-btn {
      margin-top: 12px; padding: 8px 18px; background: #7c5cbf; color: #fff;
      border: none; border-radius: 6px; font-size: .95rem; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .edit-budget-btn:hover { background: #5a3fa0; }

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
    .popup-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 8px;
    }
    .popup-header h2 { font-size: 1.25rem; font-weight: 700; color: #1e1e2e; }
    .close-btn {
      background: none; border: none; font-size: 1.1rem; color: #888;
      cursor: pointer; padding: 4px 8px; border-radius: 6px;
      transition: background .15s, color .15s; line-height: 1;
    }
    .close-btn:hover { background: #f0f0f8; color: #1e1e2e; }
  `]
})
export class Finances {
  budgetCategories: BudgetCategory[] = [
    { id: 1, category: 'Housing',        budget: 2200, spent: 2200 },
    { id: 2, category: 'Food',           budget: 1400, spent: 1280 },
    { id: 3, category: 'Transportation', budget: 700,  spent: 650  },
    { id: 4, category: 'Entertainment',  budget: 350,  spent: 390  },
    { id: 5, category: 'Healthcare',     budget: 500,  spent: 310  },
    { id: 6, category: 'Clothing',       budget: 300,  spent: 275  },
    { id: 7, category: 'Education',      budget: 400,  spent: 360  },
    { id: 8, category: 'Utilities',      budget: 280,  spent: 255  },
  ];

  assets: Asset[] = [
    { name: 'Primary Home',      value: 520000 },
    { name: 'Checking Account',  value: 18500  },
    { name: 'Savings Account',   value: 52000  },
    { name: 'Retirement (401k)', value: 138000 },
    { name: 'Vehicle 1',         value: 32000  },
    { name: 'Vehicle 2',         value: 21000  },
    { name: 'College Fund (529)',value: 24000  },
  ];

  debts: Debt[] = [
    { name: 'Mortgage',      balance: 398000, interestRate: '3.75%' },
    { name: 'Car Loan 1',    balance: 24000,  interestRate: '5.4%'  },
    { name: 'Car Loan 2',    balance: 11500,  interestRate: '6.1%'  },
    { name: 'Credit Card',   balance: 3200,   interestRate: '19.99%'},
    { name: 'Student Loan',  balance: 15000,  interestRate: '4.5%'  },
  ];

  readonly showCategoryPopup = signal(false);
  selectedCategory: BudgetCategory | null = null;

  constructor(private router: Router) {}

  openCategoryPopup(category: BudgetCategory): void {
    this.selectedCategory = category;
    this.showCategoryPopup.set(true);
  }

  closeCategoryPopup(): void {
    this.showCategoryPopup.set(false);
    this.selectedCategory = null;
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
      this.closeCategoryPopup();
    }
  }

  goToBudgetDetail(): void {
    this.router.navigate(['/finances/budget']);
  }
}

