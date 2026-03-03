import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  template: `
    <app-sidebar />
    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      min-height: 100vh;
    }
    .main-content {
      margin-left: 220px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }
    @media (max-width: 640px) {
      .main-content {
        margin-left: 60px;
      }
    }
  `]
})
export class App {}
