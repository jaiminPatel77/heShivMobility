import { getDestinationSummary, formatDestinationSummary } from './destination-summary';

describe('getDestinationSummary', () => {

  it('should return 3 visible and 7 remaining for 10 destinations', () => {
    const input = 'Saputara • Trimbakeshwar • Nashik • Bhimashankar • Parli Vaijnath • Aundha Nagnath • Grishneshwar • Ajanta–Ellora • Shani Shingnapur • Shirdi';
    const result = getDestinationSummary(input);
    expect(result.visible.length).toBe(3);
    expect(result.visible).toEqual(['Saputara', 'Trimbakeshwar', 'Nashik']);
    expect(result.remainingCount).toBe(7);
  });

  it('should return 3 visible and 0 remaining for exactly 3 destinations', () => {
    const input = 'Somnath • Dwarka • Porbandar';
    const result = getDestinationSummary(input);
    expect(result.visible.length).toBe(3);
    expect(result.visible).toEqual(['Somnath', 'Dwarka', 'Porbandar']);
    expect(result.remainingCount).toBe(0);
  });

  it('should return 2 visible and 0 remaining for 2 destinations', () => {
    const input = 'Gir National Park • Somnath';
    const result = getDestinationSummary(input);
    expect(result.visible.length).toBe(2);
    expect(result.remainingCount).toBe(0);
  });

  it('should return 1 visible and 0 remaining for a single destination', () => {
    const input = 'Kevadia';
    const result = getDestinationSummary(input);
    expect(result.visible.length).toBe(1);
    expect(result.visible).toEqual(['Kevadia']);
    expect(result.remainingCount).toBe(0);
  });

  it('should handle empty or null destination gracefully', () => {
    expect(getDestinationSummary('')).toEqual({ visible: [], remainingCount: 0 });
    expect(getDestinationSummary(null)).toEqual({ visible: [], remainingCount: 0 });
    expect(getDestinationSummary(undefined)).toEqual({ visible: [], remainingCount: 0 });
    expect(getDestinationSummary('   ')).toEqual({ visible: [], remainingCount: 0 });
  });

  it('should support comma-separated destinations', () => {
    const input = 'Delhi, Agra, Jaipur, Udaipur, Jodhpur';
    const result = getDestinationSummary(input);
    expect(result.visible).toEqual(['Delhi', 'Agra', 'Jaipur']);
    expect(result.remainingCount).toBe(2);
  });

  it('should support custom maxVisible parameter', () => {
    const input = 'A • B • C • D • E';
    const result = getDestinationSummary(input, 2);
    expect(result.visible).toEqual(['A', 'B']);
    expect(result.remainingCount).toBe(3);
  });
});

describe('formatDestinationSummary', () => {

  it('should format summary with remaining count', () => {
    const summary = { visible: ['Saputara', 'Trimbakeshwar', 'Nashik'], remainingCount: 7 };
    expect(formatDestinationSummary(summary)).toBe('Saputara • Trimbakeshwar • Nashik +7 more');
  });

  it('should format summary without remaining count', () => {
    const summary = { visible: ['Somnath', 'Dwarka'], remainingCount: 0 };
    expect(formatDestinationSummary(summary)).toBe('Somnath • Dwarka');
  });

  it('should return empty string for empty visible array', () => {
    const summary = { visible: [], remainingCount: 0 };
    expect(formatDestinationSummary(summary)).toBe('');
  });
});
