import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FamilyMember } from './auth.service';

@Component({
  selector: 'app-register-family',
  imports: [FormsModule],
  template: `
    <div class="reg-page">
      <div class="reg-card">
        <h1>Family Atlas</h1>
        <h2>Register Your Family</h2>

        <section class="section">
          <h3>My Family</h3>
          <p class="section-desc">Add the people in your family.</p>
          @for (member of familyMembers; track $index) {
            <div class="member-row">
              <div class="form-group">
                <label>Name</label>
                <input type="text" [(ngModel)]="member.name"
                  [name]="'name_' + $index" placeholder="Full name" />
              </div>
              <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" [(ngModel)]="member.dob"
                  [name]="'dob_' + $index" />
              </div>
              <div class="form-group">
                <label>Role</label>
                <select [(ngModel)]="member.role" [name]="'role_' + $index">
                  <option value="">Select role</option>
                  <option value="husband">Husband</option>
                  <option value="wife">Wife</option>
                  <option value="daughter">Daughter</option>
                  <option value="son">Son</option>
                </select>
              </div>
              <button type="button" class="remove-btn" (click)="removeMember($index)"
                title="Remove member">✕</button>
            </div>
          }
          <button type="button" class="btn btn-outline add-btn" (click)="addMember()">
            + Add Family Member
          </button>
        </section>

        <section class="section action-section">
          <button class="btn btn-secondary" (click)="goToVisionBoard()">
            🗺️ Vision Board Test
          </button>
          <button class="btn btn-primary" (click)="goToDashboard()">
            🏠 Go to Dashboard
          </button>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .reg-page {
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      background: linear-gradient(135deg, #f5f0ff 0%, #e8f4fd 100%);
      padding: 40px 24px;
    }
    .reg-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 40px rgba(124,92,191,.15);
      padding: 48px 40px;
      max-width: 680px;
      width: 100%;
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 4px;
      text-align: center;
    }
    h2 {
      font-size: 1.3rem;
      color: #444;
      margin: 0 0 32px;
      text-align: center;
      font-weight: 500;
    }
    .section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 6px;
    }
    .section-desc {
      font-size: .88rem;
      color: #888;
      margin-bottom: 16px;
    }
    .member-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr auto;
      gap: 10px;
      align-items: end;
      margin-bottom: 12px;
      background: #f9f5ff;
      padding: 14px;
      border-radius: 10px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: .82rem;
      font-weight: 600;
      color: #555;
    }
    input, select {
      padding: 9px 12px;
      border: 1.5px solid #ddd;
      border-radius: 7px;
      font-size: .9rem;
      box-sizing: border-box;
      transition: border-color .2s;
    }
    input:focus, select:focus {
      outline: none;
      border-color: #7c5cbf;
    }
    .remove-btn {
      padding: 9px 12px;
      border: 1.5px solid #fca5a5;
      border-radius: 7px;
      background: #fff0f0;
      color: #e53935;
      cursor: pointer;
      font-size: .88rem;
      font-weight: 600;
      transition: background .2s;
    }
    .remove-btn:hover { background: #fca5a5; }
    .add-btn {
      margin-top: 4px;
      font-size: .9rem;
      padding: 9px 20px;
    }
    .action-section {
      display: flex;
      gap: 16px;
      border-bottom: none;
      margin-bottom: 0;
    }
    .btn {
      flex: 1;
      padding: 13px 20px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity .2s;
    }
    .btn-outline {
      border: 1.5px solid #7c5cbf;
      background: transparent;
      color: #7c5cbf;
    }
    .btn-primary {
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff;
    }
    .btn-secondary {
      background: linear-gradient(135deg, #4a90d9, #0eadcf);
      color: #fff;
    }
    .btn:hover { opacity: .88; }
    @media (max-width: 600px) {
      .member-row { grid-template-columns: 1fr 1fr; }
      .action-section { flex-direction: column; }
    }
  `]
})
export class RegisterFamily {
  familyMembers: FamilyMember[] = [{ name: '', dob: '', role: '' }];

  constructor(private auth: AuthService, private router: Router) {}

  addMember(): void {
    this.familyMembers.push({ name: '', dob: '', role: '' });
  }

  removeMember(index: number): void {
    this.familyMembers.splice(index, 1);
  }

  saveFamilyMembers(): void {
    const user = this.auth.currentUser;
    if (user) {
      user.familyMembers = this.familyMembers.filter(m => m.name.trim());
      this.auth.updateUser(user);
    }
  }

  goToVisionBoard(): void {
    this.saveFamilyMembers();
    this.router.navigate(['/vision-map']);
  }

  goToDashboard(): void {
    this.saveFamilyMembers();
    this.router.navigate(['/dashboard']);
  }
}
