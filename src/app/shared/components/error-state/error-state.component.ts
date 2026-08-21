import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-state-box">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">{{ title }}</h3>
      <p class="error-message">{{ message }}</p>
      <button *ngIf="showRetry" (click)="retry.emit()" class="btn btn-primary btn-sm">
        Try Again
      </button>
    </div>
  `,
  styles: [`
    .error-state-box {
      text-align: center;
      padding: 40px 24px;
      background: #fff5f5;
      border-radius: 16px;
      border: 1px solid #fecaca;
      max-width: 500px;
      margin: 32px auto;
    }
    .error-icon { font-size: 2.5rem; margin-bottom: 8px; }
    .error-title { font-size: 1.2rem; color: #991b1b; font-weight: 700; }
    .error-message { color: #7f1d1d; font-size: 0.9rem; margin: 8px 0 16px; }
    .btn-sm { font-size: 0.875rem; padding: 8px 20px; }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Unable to load content';
  @Input() message = 'Something went wrong while fetching data. Please try again.';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();
}
