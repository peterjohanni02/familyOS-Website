import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  template: `
    <div class="hero">
      <span class="section-icon">🏠</span>
      <h1>Dashboard</h1>
      <p>Welcome back{{ userName ? ', ' + userName : '' }}! You're signed in to Family Atlas.</p>
    </div>
  `,
  styles: [`
    .hero { text-align: center; }
    .section-icon { font-size: 4rem; margin-bottom: 20px; display: block; }
    h1 {
      font-size: 2.8rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; margin-bottom: 10px;
    }
    p { font-size: 1.05rem; color: #666; }
  `]
})
export class Dashboard {
  get userName(): string {
    return this.auth.currentUser?.firstName || '';
  }

  constructor(private auth: AuthService) {}
}
