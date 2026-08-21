import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state-box">
      <div class="empty-icon">🔍</div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .empty-state-box {
      text-align: center;
      padding: 48px 24px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px dashed #cbd5e1;
      max-width: 500px;
      margin: 32px auto;
    }
    .empty-icon { font-size: 3rem; margin-bottom: 12px; }
    .empty-title { font-size: 1.25rem; color: #0B2A5B; font-weight: 700; }
    .empty-message { color: #667085; font-size: 0.95rem; margin-top: 6px; }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'No content available';
  @Input() message = 'We could not find any items matching your criteria.';
}
