import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-wrap" [class.centered]="centered">
      <span *ngIf="badge" class="section-badge">{{ badge }}</span>
      <h2 class="section-heading">{{ title }}</h2>
      <p *ngIf="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </div>
  `,
  styles: [`
    .section-title-wrap {
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &.centered {
        text-align: center;
        align-items: center;
      }
    }
    .section-badge {
      display: inline-block;
      padding: 4px 14px;
      background-color: rgba(217, 162, 27, 0.15);
      color: #0B2A5B;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border-radius: 9999px;
      border: 1px solid rgba(217, 162, 27, 0.3);
      width: fit-content;
    }
    .section-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      color: #0B2A5B;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }
    }
    .section-subtitle {
      font-size: 1.05rem;
      color: #667085;
      max-width: 650px;
      line-height: 1.6;
    }
  `]
})
export class SectionTitleComponent {
  @Input() badge?: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() centered = true;
}
