import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="isVisible()"
      (click)="scrollToTop()"
      class="scroll-top-btn"
      aria-label="Scroll back to top of page">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `,
  styles: [`
    .scroll-top-btn {
      position: fixed;
      bottom: 164px;
      right: 31px;
      width: 44px;
      height: 44px;
      background-color: #0B2A5B;
      color: #D9A21B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(11, 42, 91, 0.25);
      border: 2px solid #D9A21B;
      z-index: 1010;
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        background-color: #164A91;
      }

      .icon {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class ScrollToTopComponent {
  isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isVisible.set(window.scrollY > 300);
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
