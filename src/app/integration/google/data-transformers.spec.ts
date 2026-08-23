import {
  slugify,
  parseBoolean,
  parseNumber,
  parseArray,
  parseString,
  parseDateString,
  parsePriceInfo,
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

  describe('parseDateString', () => {
    it('should format ISO timestamp string to Indian date format (DD-MM-YYYY)', () => {
      const result = parseDateString('2026-04-08T18:30:00.000Z');
      expect(result).toBe('09-04-2026');
    });

    it('should preserve plain text formatted strings as-is without altering them', () => {
      expect(parseDateString('29-08-2026 09:00 PM')).toBe('29-08-2026 09:00 PM');
      expect(parseDateString('2026-04-09')).toBe('2026-04-09');
    });

    it('should return fallback for null or empty input', () => {
      expect(parseDateString(null)).toBe('');
      expect(parseDateString(undefined)).toBe('');
      expect(parseDateString('')).toBe('');
    });
  });

  describe('parsePriceInfo', () => {
    it('should parse single numeric prices correctly', () => {
      const res = parsePriceInfo('8999');
      expect(res.startingPrice).toBe(8999);
      expect(res.priceTiers).toEqual([]);
    });

    it('should parse multi-tier prices with pipe delimiter (Above Sofa | Below Sofa)', () => {
      const input = 'Above Sofa: 6999 | Below Sofa: 7999';
      const res = parsePriceInfo(input);

      expect(res.startingPrice).toBe(6999);
      expect(res.priceTiers.length).toBe(2);
      expect(res.priceTiers[0]).toEqual({
        label: 'Above Sofa',
        price: 6999,
        formattedPrice: '₹6,999'
      });
      expect(res.priceTiers[1]).toEqual({
        label: 'Below Sofa',
        price: 7999,
        formattedPrice: '₹7,999'
      });
    });

    it('should parse multi-tier prices with slash delimiter and rupee symbols', () => {
      const input = 'Above Sofa: ₹6,999 / Below Sofa: ₹7,999';
      const res = parsePriceInfo(input);

      expect(res.startingPrice).toBe(6999);
      expect(res.priceTiers.length).toBe(2);
    });

    it('should return 0 startingPrice for invalid or empty input', () => {
      expect(parsePriceInfo(null).startingPrice).toBe(0);
      expect(parsePriceInfo(undefined).startingPrice).toBe(0);
      expect(parsePriceInfo('').startingPrice).toBe(0);
    });
  });
});
