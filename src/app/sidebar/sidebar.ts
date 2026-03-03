import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <a routerLink="/" class="sidebar-logo">
        <div class="logo-icon">🏠</div>
        <div class="logo-text">familyOS<span>Home</span></div>
      </a>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <span class="nav-icon">🏠</span><span>Home</span>
        </a>
        <a routerLink="/vision-map" routerLinkActive="active">
          <span class="nav-icon">🗺️</span><span>Vision Map</span>
        </a>
        <a routerLink="/meetings" routerLinkActive="active">
          <span class="nav-icon">📅</span><span>Meetings</span>
        </a>
        <a routerLink="/tasks-issues" routerLinkActive="active">
          <span class="nav-icon">✅</span><span>Tasks &amp; Issues</span>
        </a>
        <a routerLink="/calendar" routerLinkActive="active">
          <span class="nav-icon">📆</span><span>Calendar</span>
        </a>
        <a routerLink="/finances" routerLinkActive="active">
          <span class="nav-icon">💰</span><span>Finances</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active">
          <span class="nav-icon">👤</span><span>Profile and Family</span>
        </a>
        <a routerLink="/people-analyzer" routerLinkActive="active">
          <span class="nav-icon">🧠</span><span>People Analyzer</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      min-height: 100vh;
      background: #1e1e2e;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
      box-shadow: 2px 0 12px rgba(0,0,0,.25);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 24px 20px 20px;
      text-decoration: none;
      color: #fff;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .sidebar-logo .logo-icon {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .sidebar-logo .logo-text {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: .3px;
      line-height: 1.2;
    }
    .sidebar-logo .logo-text span {
      display: block;
      font-size: .7rem;
      font-weight: 400;
      color: rgba(255,255,255,.5);
    }
    nav {
      flex: 1;
      padding: 12px 0;
    }
    nav a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      text-decoration: none;
      color: rgba(255,255,255,.65);
      font-size: .93rem;
      font-weight: 500;
      border-left: 3px solid transparent;
      transition: background .15s, color .15s, border-color .15s;
    }
    nav a:hover {
      background: rgba(255,255,255,.07);
      color: #fff;
    }
    nav a.active {
      background: rgba(124,92,191,.18);
      color: #c2aaff;
      border-left-color: #7c5cbf;
    }
    .nav-icon {
      font-size: 1.15rem;
      width: 22px;
      text-align: center;
      flex-shrink: 0;
    }
    @media (max-width: 640px) {
      .sidebar {
        width: 60px;
      }
      .sidebar-logo .logo-text,
      nav a span:last-child {
        display: none;
      }
      nav a {
        justify-content: center;
        padding: 14px;
        gap: 0;
      }
      .sidebar-logo {
        justify-content: center;
        padding: 18px 10px;
      }
    }
  `]
})
export class Sidebar {}
