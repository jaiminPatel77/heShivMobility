import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { BUSINESS_INFO } from '../config/business-info';

export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  schema?: object | object[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  updateSeo(config: SeoMetadata = {}): void {
    const title = config.title
      ? `${config.title} | ${BUSINESS_INFO.companyName}`
      : `${BUSINESS_INFO.companyName} — ${BUSINESS_INFO.tagline} | ${BUSINESS_INFO.supportingText}`;
    
    const description = config.description ||
      `${BUSINESS_INFO.companyName}: Premium travel agency specializing in Pilgrimage, Family Tours, Group Tours, and Spiritual Journeys across Gujarat and India.`;

    const ogImage = config.ogImage || `${BUSINESS_INFO.websiteUrl}/assets/images/og-default.jpg`;
    const canonical = config.canonicalUrl || (this.document.location ? this.document.location.href : BUSINESS_INFO.websiteUrl);

    // Title & Meta Tags
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Robots
    if (config.noIndex) {
      this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // OpenGraph Meta
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: ogImage });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: BUSINESS_INFO.companyName });
    this.metaService.updateTag({ property: 'og:url', content: canonical });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: ogImage });

    // Canonical link
    this.setCanonicalUrl(canonical);

    // Schema JSON-LD
    if (config.schema) {
      this.setJsonLdSchema(config.schema);
    } else {
      this.setDefaultOrganizationSchema();
    }
  }

  private setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLdSchema(schema: object | object[]): void {
    let script: HTMLScriptElement | null = this.document.querySelector("script[type='application/ld+json']");
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  private setDefaultOrganizationSchema(): void {
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: BUSINESS_INFO.companyName,
      description: BUSINESS_INFO.tagline,
      url: BUSINESS_INFO.websiteUrl,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS_INFO.address,
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      },
      sameAs: [
        BUSINESS_INFO.instagram,
        BUSINESS_INFO.facebook,
        BUSINESS_INFO.youtube
      ]
    };
    this.setJsonLdSchema(orgSchema);
  }
}
