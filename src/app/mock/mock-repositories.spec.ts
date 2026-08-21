import { MockPackageRepository, MockBlogRepository, MockEnquiryRepository } from './mock-repositories';

describe('Mock Repositories', () => {
  let packageRepo: MockPackageRepository;
  let blogRepo: MockBlogRepository;
  let enquiryRepo: MockEnquiryRepository;

  beforeEach(() => {
    packageRepo = new MockPackageRepository();
    blogRepo = new MockBlogRepository();
    enquiryRepo = new MockEnquiryRepository();
  });

  it('should return active packages from getPackages()', (done) => {
    packageRepo.getPackages().subscribe(packages => {
      expect(packages.length).toBeGreaterThan(0);
      expect(packages.every(p => p.active)).toBeTrue();
      done();
    });
  });

  it('should return correct package when searching by valid slug', (done) => {
    packageRepo.getPackageBySlug('somnath-dwarka-spiritual-tour').subscribe(pkg => {
      expect(pkg).not.toBeNull();
      expect(pkg?.title).toContain('Somnath');
      done();
    });
  });

  it('should return null when searching for invalid slug', (done) => {
    packageRepo.getPackageBySlug('invalid-non-existent-slug').subscribe(pkg => {
      expect(pkg).toBeNull();
      done();
    });
  });

  it('should return blogs list from getBlogs()', (done) => {
    blogRepo.getBlogs().subscribe(blogs => {
      expect(blogs.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should process enquiry submission successfully', (done) => {
    const mockData = {
      fullName: 'Test Pilgrim',
      phone: '9726333195',
      email: 'test@example.com',
      message: 'Looking for a 3-day family tour package to Somnath and Dwarka.'
    };

    enquiryRepo.submitEnquiry(mockData).subscribe(res => {
      expect(res.success).toBeTrue();
      expect(res.enquiryId).toContain('ENQ-MOCK');
      done();
    });
  });

  it('should block enquiry submission if honeypot is populated', (done) => {
    const spamData = {
      fullName: 'Spam Bot',
      phone: '0000000000',
      email: 'bot@spam.com',
      message: 'Spam text',
      honeypot: 'http://spam-link.com'
    };

    enquiryRepo.submitEnquiry(spamData).subscribe(res => {
      expect(res.success).toBeFalse();
      expect(res.message).toContain('Spam');
      done();
    });
  });
});
