import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-grid" [style.grid-template-columns]="'repeat(' + columns + ', 1fr)'">
      <div *ngFor="let item of items" class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line title"></div>
          <div class="skeleton-line text"></div>
          <div class="skeleton-line text"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-grid {
      display: grid;
      gap: 24px;
      width: 100%;
      @media (max-width: 768px) {
        grid-template-columns: 1fr !important;
      }
    }
    .skeleton-card {
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .skeleton-image {
      height: 200px;
      background: linear-gradient(90deg, #f0f3f8 25%, #e2e8f0 50%, #f0f3f8 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    .skeleton-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .skeleton-line {
      height: 14px;
      border-radius: 4px;
      background: linear-gradient(90deg, #f0f3f8 25%, #e2e8f0 50%, #f0f3f8 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;

      &.short { width: 30%; }
      &.title { width: 75%; height: 20px; }
      &.text { width: 90%; }
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() count = 3;
  @Input() columns = 3;

  get items(): number[] {
    return Array.from({ length: this.count });
  }
}
