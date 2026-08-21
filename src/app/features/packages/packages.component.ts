import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { PACKAGE_REPOSITORY } from '../../core/repositories/repository.tokens';
import { PackageRepository } from '../../core/repositories/package.repository';
import { Package } from '../../core/models/package.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    PackageCardComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesPageComponent implements OnInit {
  private packageRepo: PackageRepository = inject(PACKAGE_REPOSITORY);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);

  packages = signal<Package[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');

  categories = computed(() => {
    const set = new Set<string>();
    set.add('All');
    this.packages().forEach(p => set.add(p.category));
    return Array.from(set);
  });

  filteredPackages = computed(() => {
    let result = this.packages();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'All') {
      result = result.filter(p => p.category === cat);
    }

    if (query) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.destination.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
      );
    }

    return result;
  });

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Gujarat Pilgrimage & Family Tour Packages',
      description: 'Explore curated Gujarat pilgrimage tours to Somnath, Dwarka, Statue of Unity, and Rann of Kutch.'
    });

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory.set(params['category']);
      }
    });

    this.loadPackages();
  }

  loadPackages() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.packageRepo.getPackages().subscribe({
      next: (data) => {
        this.packages.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
