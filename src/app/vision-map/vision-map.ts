import { Component } from '@angular/core';

@Component({
  selector: 'app-vision-map',
  imports: [],
  template: `
    <div class="hero">
      <span class="section-icon">🗺️</span>
      <h1>Vision Map</h1>
      <p>Plan your family's future together.</p>
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
export class VisionMap {}
