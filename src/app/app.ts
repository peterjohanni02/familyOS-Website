import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const NO_SIDEBAR_ROUTES = ['/', '/login', '/signup', '/register-family'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  template: `
    @if (showSidebar) {
      <app-sidebar />
    }
    <main [class.main-content]="showSidebar" [class.full-content]="!showSidebar">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      min-height: 100vh;
      width: 100%;
    }
    .main-content {
      margin-left: 220px;
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 40px;
      min-width: 0;
    }
    .full-content {
      flex: 1;
      min-width: 0;
      padding: 0;
    }
    @media (max-width: 640px) {
      .main-content {
        margin-left: 60px;
      }
    }
  `]
})
export class App implements OnDestroy {
  showSidebar = false;
  private routerSub: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.showSidebar = !NO_SIDEBAR_ROUTES.includes(e.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}

