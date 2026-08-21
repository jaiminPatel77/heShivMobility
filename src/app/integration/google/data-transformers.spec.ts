import {
  slugify,
  parseBoolean,
  parseNumber,
  parseArray,
  parseString,
  transformPackageRow,
  transformBlogRow
} from './data-transformers';

describe('Google Sheets Data Transformers', () => {
  describe('slugify', () => {
    it('should generate URL-friendly slug from title', () => {
      expect(slugify('Somnath & Dwarka Spiritual Tour!')).toBe('somnath-dwarka-spiritual-tour');
      expect(slugify('Statue of Unity 2-Day Package')).toBe('statue-of-unity-2-day-package');
    });
  });

  describe('parseBoolean', () => {
    it('should parse "TRUE", "1", "YES" and true to true', () => {
      expect(parseBoolean('TRUE')).toBeTrue();
      expect(parseBoolean('true')).toBeTrue();
      expect(parseBoolean('1')).toBeTrue();
      expect(parseBoolean('YES')).toBeTrue();
      expect(parseBoolean(true)).toBeTrue();
    });

    it('should parse "FALSE", "0", "NO" and false to false', () => {
      expect(parseBoolean('FALSE')).toBeFalse();
      expect(parseBoolean('0')).toBeFalse();
      expect(parseBoolean(false)).toBeFalse();
    });

    it('should fallback gracefully for invalid or empty boolean values', () => {
      expect(parseBoolean(null, true)).toBeTrue();
      expect(parseBoolean(undefined, false)).toBeFalse();
      expect(parseBoolean('invalid-value', false)).toBeFalse();
    });
  });

  describe('parseNumber', () => {
    it('should parse numbers and numeric strings correctly', () => {
      expect(parseNumber(9999)).toBe(9999);
      expect(parseNumber('14999')).toBe(14999);
      expect(parseNumber('₹14,999')).toBe(14999);
    });

    it('should return safe fallback for invalid numbers', () => {
      expect(parseNumber('invalid', 100)).toBe(100);
      expect(parseNumber(null, 50)).toBe(50);
    });
  });

  describe('transformPackageRow with Auto-Generated Fields', () => {
    it('should auto-generate Slug, MetaTitle, and MetaDescription if left empty by business owner', () => {
      const minimalRow = {
        Title: 'Kutch Rann Utsav Special',
        ShortDescription: '3 Days White Desert Tour Package',
        Price: '12999'
      };

      const transformed = transformPackageRow(minimalRow);
      expect(transformed.slug).toBe('kutch-rann-utsav-special');
      expect(transformed.metaTitle).toBe('Kutch Rann Utsav Special | Heshiv Mobility');
      expect(transformed.metaDescription).toBe('3 Days White Desert Tour Package');
      expect(transformed.packageId).toBe('pkg-kutch-rann-utsav-special');
      expect(transformed.featured).toBeTrue();
    });
  });
});
