import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1>Family Atlas</h1>
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              [(ngModel)]="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              [(ngModel)]="password"
              placeholder="Enter your password"
              required
            />
          </div>
          @if (errorMsg) {
            <p class="error">{{ errorMsg }}</p>
          }
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p class="switch-link">Don't have an account? <a (click)="goToSignup()">Sign Up</a></p>
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
      max-width: 420px;
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
      margin: 0 0 28px;
      text-align: center;
      font-weight: 500;
    }
    .form-group {
      margin-bottom: 18px;
    }
    label {
      display: block;
      font-size: .9rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 6px;
    }
    input {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      font-size: .95rem;
      box-sizing: border-box;
      transition: border-color .2s;
    }
    input:focus {
      outline: none;
      border-color: #7c5cbf;
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
      margin-top: 16px;
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
export class Login {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMsg = '';
    const success = this.auth.login(this.email.trim(), this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Invalid email or password. Please try again.';
    }
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
