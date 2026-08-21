import { TestBed } from '@angular/core/testing';
import { ImageUrlService } from './image-url.service';

describe('ImageUrlService', () => {
  let service: ImageUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return fallback SVG placeholder for null or empty URL', () => {
    const resultNull = service.processImageUrl(null);
    const resultEmpty = service.processImageUrl('   ');
    expect(resultNull).toContain('data:image/svg+xml');
    expect(resultEmpty).toContain('data:image/svg+xml');
  });

  it('should transform Google Drive file view link into direct image link', () => {
    const driveUrl = 'https://drive.google.com/file/d/1ABCXYZ12345/view?usp=sharing';
    const transformed = service.processImageUrl(driveUrl);
    expect(transformed).toBe('https://lh3.googleusercontent.com/d/1ABCXYZ12345=w1200');
  });

  it('should return plain URL if already direct or standard CDN link', () => {
    const standardUrl = 'https://images.unsplash.com/photo-12345?auto=format';
    expect(service.processImageUrl(standardUrl)).toBe(standardUrl);
  });
});
