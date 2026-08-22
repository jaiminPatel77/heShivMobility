import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {
  private readonly defaultGoogleImageSize = 's1000';
  private readonly fallbackPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230B2A5B"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23F2C14E">HeShiv Mobility Travel</text></svg>`;

  /**
   * Normalizes image URLs including Google Drive viewer URLs, Googleusercontent direct URLs,
   * standard web image links, and provides safe fallback for empty/invalid inputs.
   *
   * @param source Raw image URL from CMS or data source
   * @param size Optional Googleusercontent image dimension (defaults to 's1000')
   * @returns Working direct image URL or branded fallback SVG
   */
  getImageUrl(source: string | null | undefined, size: string = this.defaultGoogleImageSize): string {
    if (!source || typeof source !== 'string' || !source.trim()) {
      return this.fallbackPlaceholder;
    }

    const url = source.trim();

    // Check for Google Drive URL and extract file ID
    if (url.includes('drive.google.com')) {
      const fileId = this.extractGoogleDriveFileId(url);
      if (fileId) {
        const formattedSize = size.startsWith('s') || size.startsWith('w') ? size : `s${size}`;
        return `https://lh3.googleusercontent.com/d/${fileId}=${formattedSize}`;
      }
      // Malformed Google Drive URL structure without /file/d/ID
      return this.fallbackPlaceholder;
    }

    // Keep direct Googleusercontent URLs
    if (url.startsWith('https://lh3.googleusercontent.com/')) {
      return url;
    }

    // Check for valid standard web URL or local asset
    if (this.isValidHttpImageUrl(url)) {
      return url;
    }

    return this.fallbackPlaceholder;
  }

  /**
   * Extracts Google Drive file ID from a Drive viewer URL.
   * Supports: /file/d/FILE_ID/view, /file/d/FILE_ID/view?usp=drive_link, etc.
   */
  public extractGoogleDriveFileId(url: string): string | null {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/\/file\/d\/([^/?]+)/);
    return match?.[1] ?? null;
  }

  /**
   * Validates standard HTTP/HTTPS URLs or local asset paths without relying on file extension.
   */
  public isValidHttpImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    return (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:image/') ||
      trimmed.startsWith('assets/') ||
      trimmed.startsWith('/')
    );
  }

  /**
   * Alias for getImageUrl to maintain backwards compatibility across components.
   */
  processImageUrl(url: string | null | undefined): string {
    return this.getImageUrl(url);
  }

  /**
   * Returns the branded SVG placeholder image.
   */
  getFallbackImage(): string {
    return this.fallbackPlaceholder;
  }

  /**
   * Handles image loading errors on <img> elements by substituting with fallback placeholder.
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement && imgElement.src !== this.fallbackPlaceholder) {
      imgElement.src = this.fallbackPlaceholder;
    }
  }
}
