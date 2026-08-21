import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Title, Meta]
    });
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update document title and description meta tag', () => {
    service.updateSeo({
      title: 'Somnath Dwarka Pilgrimage',
      description: 'Sacred 5 day tour package'
    });

    expect(titleService.getTitle()).toContain('Somnath Dwarka Pilgrimage');
    const descTag = metaService.getTag('name="description"');
    expect(descTag?.content).toBe('Sacred 5 day tour package');
  });

  it('should update OpenGraph meta tags', () => {
    service.updateSeo({
      title: 'Test Title',
      ogImage: 'https://example.com/test.jpg'
    });

    const ogTitle = metaService.getTag('property="og:title"');
    const ogImage = metaService.getTag('property="og:image"');

    expect(ogTitle?.content).toContain('Test Title');
    expect(ogImage?.content).toBe('https://example.com/test.jpg');
  });
});
