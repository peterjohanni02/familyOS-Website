import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from './auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1>Family Atlas</h1>
        <h2>Create Account</h2>
        <form (ngSubmit)="onSubmit()" #signupForm="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" [(ngModel)]="form.email"
              placeholder="Enter your email" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input id="firstName" type="text" name="firstName" [(ngModel)]="form.firstName"
                placeholder="First name" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input id="lastName" type="text" name="lastName" [(ngModel)]="form.lastName"
                placeholder="Last name" required />
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" [(ngModel)]="form.password"
              placeholder="Create a password" required />
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input id="dob" type="date" name="dob" [(ngModel)]="form.dob" required />
          </div>
          <div class="form-group">
            <label>Role</label>
            <div class="role-group">
              @for (r of roles; track r.value) {
                <label class="role-label" [class.selected]="form.role === r.value">
                  <input type="radio" name="role" [value]="r.value" [(ngModel)]="form.role" required />
                  {{ r.label }}
                </label>
              }
            </div>
          </div>

          <div class="family-options">
            <p class="family-label">Family Setup</p>
            <div class="option-row">
              <button type="button" class="option-btn"
                [class.active]="familyOption === 'code'"
                (click)="familyOption = 'code'">
                Enter Family Invite Code
              </button>
              <button type="button" class="option-btn"
                [class.active]="familyOption === 'register'"
                (click)="familyOption = 'register'">
                Register Your Family
              </button>
            </div>

            @if (familyOption === 'code') {
              <div class="family-section">
                <label for="inviteCode">Invite Code</label>
                <input id="inviteCode" type="text" name="inviteCode" [(ngModel)]="form.familyInviteCode"
                  placeholder="Enter your family invite code" />
                <button type="button" class="btn btn-sm" (click)="applyCode()">Enter</button>
              </div>
            }

            @if (familyOption === 'register') {
              <div class="family-section">
                <div class="form-group">
                  <label for="familyName">Family Name</label>
                  <input id="familyName" type="text" name="familyName" [(ngModel)]="form.familyName"
                    placeholder="Enter your family name" />
                </div>
                <div class="form-group">
                  <label for="spouseEmail">Spouse Invite Email</label>
                  <input id="spouseEmail" type="email" name="spouseEmail"
                    [(ngModel)]="form.spouseInviteEmail"
                    placeholder="Spouse's email address" />
                </div>
              </div>
            }
          </div>

          @if (errorMsg) {
            <p class="error">{{ errorMsg }}</p>
          }
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p class="switch-link">Already have an account? <a (click)="goToLogin()">Login</a></p>
        <p class="switch-link"><a (click)="goHome()">← Back to Home</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f0ff 0%, #e8f4fd 100%);
      padding: 24px;
    }
    .auth-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 40px rgba(124,92,191,.15);
      padding: 48px 40px;
      max-width: 520px;
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
      margin: 0 0 24px;
      text-align: center;
      font-weight: 500;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    label {
      display: block;
      font-size: .88rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 5px;
    }
    input[type="text"], input[type="email"], input[type="password"], input[type="date"] {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      font-size: .93rem;
      box-sizing: border-box;
      transition: border-color .2s;
    }
    input:focus {
      outline: none;
      border-color: #7c5cbf;
    }
    .role-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .role-label {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
      font-size: .88rem;
      color: #555;
      transition: border-color .2s, background .2s;
      font-weight: 500;
      margin-bottom: 0;
    }
    .role-label.selected {
      border-color: #7c5cbf;
      background: #f5f0ff;
      color: #7c5cbf;
    }
    .role-label input[type="radio"] {
      display: none;
    }
    .family-options {
      margin-bottom: 16px;
      border-top: 1px solid #eee;
      padding-top: 16px;
    }
    .family-label {
      font-size: .88rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }
    .option-row {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }
    .option-btn {
      flex: 1;
      padding: 10px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      background: transparent;
      font-size: .88rem;
      font-weight: 600;
      cursor: pointer;
      color: #555;
      transition: border-color .2s, background .2s;
    }
    .option-btn.active {
      border-color: #7c5cbf;
      background: #f5f0ff;
      color: #7c5cbf;
    }
    .family-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .family-section label {
      font-size: .88rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0;
    }
    .family-section input {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      font-size: .93rem;
      box-sizing: border-box;
    }
    .btn-sm {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: .88rem;
      font-weight: 600;
      cursor: pointer;
      border: 1.5px solid #7c5cbf;
      background: transparent;
      color: #7c5cbf;
      align-self: flex-start;
    }
    .error {
      color: #e53935;
      font-size: .88rem;
      margin-bottom: 12px;
    }
    .btn {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff;
      margin-top: 8px;
    }
    .btn-primary:hover { opacity: .9; }
    .switch-link {
      text-align: center;
      margin-top: 12px;
      font-size: .9rem;
      color: #666;
    }
    .switch-link a {
      color: #7c5cbf;
      cursor: pointer;
      font-weight: 600;
      text-decoration: none;
    }
    .switch-link a:hover { text-decoration: underline; }
  `]
})
export class Signup {
  form: UserProfile = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    dob: '',
    role: '',
    familyName: '',
    spouseInviteEmail: '',
    familyInviteCode: '',
  };

  roles = [
    { value: 'husband', label: 'Husband' },
    { value: 'wife', label: 'Wife' },
    { value: 'daughter', label: 'Daughter' },
    { value: 'son', label: 'Son' },
  ];

  familyOption: 'code' | 'register' | null = null;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  applyCode(): void {
    // Code applied, just keep it in the model
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (!this.form.email || !this.form.firstName || !this.form.lastName ||
        !this.form.password || !this.form.dob || !this.form.role) {
      this.errorMsg = 'Please fill in all required fields.';
      return;
    }
    this.auth.register(this.form);
    this.router.navigate(['/register-family']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
