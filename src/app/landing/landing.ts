import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  template: `
    <div class="landing">
      <div class="hero-card">
        <h1>Family Atlas</h1>
        <p class="lorem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus lacinia
          odio vitae vestibulum vestibulum. Donec in efficitur leo, in commodo odio. Sed non
          mauris vitae erat consequat auctor eu in elit. Proin a libero at nisi consectetur
          dapibus. Integer tincidunt diam id nisl eleifend, at lacinia odio sollicitudin.
          Fusce vehicula dui non purus porta, nec volutpat metus varius. Quisque faucibus
          neque eget felis tempor, in semper sapien luctus.
        </p>
        <div class="btn-group">
          <button class="btn btn-outline" (click)="goToLogin()">Login</button>
          <button class="btn btn-primary" (click)="goToSignup()">Sign Up</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f0ff 0%, #e8f4fd 100%);
      padding: 24px;
    }
    .hero-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 40px rgba(124,92,191,.15);
      padding: 56px 48px;
      max-width: 560px;
      width: 100%;
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 24px;
    }
    .lorem {
      color: #555;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 36px;
    }
    .btn-group {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    .btn {
      padding: 12px 36px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      border: 2px solid #7c5cbf;
      transition: background .2s, color .2s;
    }
    .btn-outline {
      background: transparent;
      color: #7c5cbf;
    }
    .btn-outline:hover {
      background: #f5f0ff;
    }
    .btn-primary {
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      color: #fff;
      border-color: transparent;
    }
    .btn-primary:hover {
      opacity: .9;
    }
  `]
})
export class Landing {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
