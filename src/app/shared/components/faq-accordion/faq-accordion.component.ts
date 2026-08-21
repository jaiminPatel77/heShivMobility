import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faq } from '../../../core/models/faq.model';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq-accordion-list">
      <div
        *ngFor="let item of faqs; let i = index"
        class="faq-item"
        [class.open]="openIndex() === i">
        <button
          class="faq-question"
          (click)="toggleIndex(i)"
          [attr.aria-expanded]="openIndex() === i"
          [attr.aria-controls]="'faq-ans-' + i"
          [id]="'faq-head-' + i">
          <span class="q-text">{{ item.question }}</span>
          <span class="q-icon" aria-hidden="true">{{ openIndex() === i ? '−' : '+' }}</span>
        </button>
        <div
          [id]="'faq-ans-' + i"
          class="faq-answer"
          role="region"
          [attr.aria-labelledby]="'faq-head-' + i"
          *ngIf="openIndex() === i">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    .faq-accordion-list {
      display: flex;
      flex-direction: column;
      gap: $spacing-3;
      width: 100%;
    }

    .faq-item {
      background: $color-white;
      border: 1px solid $color-border;
      border-radius: $radius-md;
      overflow: hidden;
      transition: all $transition-fast;

      &.open {
        border-color: $color-gold;
        box-shadow: $shadow-md;
      }
    }

    .faq-question {
      width: 100%;
      padding: $spacing-4 $spacing-6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      background: none;
      border: none;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      color: $color-primary-navy;
      cursor: pointer;

      &:hover {
        color: $color-royal-blue;
      }
    }

    .q-icon {
      font-size: 1.5rem;
      color: $color-gold;
      font-weight: $font-weight-bold;
      line-height: 1;
    }

    .faq-answer {
      padding: 0 $spacing-6 $spacing-6 $spacing-6;
      color: $color-dark-text;
      font-size: $font-size-base;
      line-height: 1.6;
      border-top: 1px solid $color-border-light;
      padding-top: $spacing-3;
    }
  `]
})
export class FaqAccordionComponent {
  @Input({ required: true }) faqs: Faq[] = [];
  openIndex = signal<number | null>(0);

  toggleIndex(index: number) {
    this.openIndex.update(current => (current === index ? null : index));
  }
}
