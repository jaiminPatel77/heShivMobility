import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {
  private readonly fallbackPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230B2A5B"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23F2C14E">Heshiv Mobility Travel</text></svg>`;

  processImageUrl(url: string | null | undefined): string {
    if (!url || !url.trim()) {
      return this.fallbackPlaceholder;
    }

    const trimmedUrl = url.trim();

    // If Google Drive view link, format to direct view link
    if (trimmedUrl.includes('drive.google.com/file/d/')) {
      const match = trimmedUrl.match(/\/file\/d\/([^\/]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}=w1200`;
      }
    }

    return trimmedUrl;
  }

  getFallbackImage(): string {
    return this.fallbackPlaceholder;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement && imgElement.src !== this.fallbackPlaceholder) {
      imgElement.src = this.fallbackPlaceholder;
    }
  }
}
