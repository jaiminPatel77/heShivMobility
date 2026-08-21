import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a routerLink="/">Home</a>
        </li>
        <li *ngFor="let item of items; let last = last" class="breadcrumb-item" [class.active]="last">
          <span class="separator">/</span>
          <a *ngIf="item.url && !last" [routerLink]="item.url">{{ item.label }}</a>
          <span *ngIf="!item.url || last">{{ item.label }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      padding: 16px 0;
      font-size: 0.875rem;
    }
    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      gap: 8px;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #667085;

      a {
        color: #164A91;
        font-weight: 500;
        &:hover { text-decoration: underline; color: #0B2A5B; }
      }

      &.active span {
        color: #172033;
        font-weight: 600;
      }
    }
    .separator { color: #94a3b8; }
  `]
})
export class BreadcrumbComponent {
  @Input({ required: true }) items: BreadcrumbItem[] = [];
}
