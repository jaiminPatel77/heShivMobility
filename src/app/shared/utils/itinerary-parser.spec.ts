import { parseItinerary } from './itinerary-parser';

describe('parseItinerary Utility', () => {

  it('should parse a 3-day Markdown itinerary correctly', () => {
    const markdown = `
## Tour Overview
Experience pure devotion and spiritual solace on our Panch Jyotirlinga Mahayatra.

### Day 1 — Saturday, 29 August 2026
- Departure from Vadodara at 9:00 PM
- Overnight journey towards Saputara

### Day 2 — Sunday, 30 August 2026
- Early morning arrival at Saputara
- Visit Saputara Sunrise Point
- Tea and breakfast

### Day 3 — Monday, 31 August 2026
- Trimbakeshwar Darshan
- Return journey
`;

    const result = parseItinerary(markdown);

    expect(result.hasItinerary).toBeTrue();
    expect(result.overviewText).toContain('Experience pure devotion');
    expect(result.days.length).toBe(3);

    expect(result.days[0].dayHeaderMain).toBe('Day 1');
    expect(result.days[0].dayHeaderSub).toBe('Saturday, 29 August 2026');
    expect(result.days[0].activities).toEqual([
      'Departure from Vadodara at 9:00 PM',
      'Overnight journey towards Saputara'
    ]);

    expect(result.days[1].dayHeaderMain).toBe('Day 2');
    expect(result.days[1].activities.length).toBe(3);

    expect(result.days[2].dayHeaderMain).toBe('Day 3');
  });

  it('should parse a 7-day Markdown itinerary correctly', () => {
    let markdown = '## Tour Overview\nGujarat Special Tour Package.\n\n';
    for (let i = 1; i <= 7; i++) {
      markdown += `### Day ${i} — Tour Activity Day ${i}\n- Sightseeing item ${i}A\n- Sightseeing item ${i}B\n\n`;
    }

    const result = parseItinerary(markdown);

    expect(result.hasItinerary).toBeTrue();
    expect(result.days.length).toBe(7);
    expect(result.days[6].dayHeaderMain).toBe('Day 7');
    expect(result.days[6].activities).toEqual([
      'Sightseeing item 7A',
      'Sightseeing item 7B'
    ]);
  });

  it('should gracefully handle descriptions without Day headings', () => {
    const plainDescription = 'Experience pure devotion and spiritual solace with our popular Somnath & Dwarka Sacred Pilgrimage package. Designed specially for families and elders.';

    const result = parseItinerary(plainDescription);

    expect(result.hasItinerary).toBeFalse();
    expect(result.overviewText).toBe(plainDescription);
    expect(result.days).toEqual([]);
  });

  it('should support different day heading formats', () => {
    const markdownFormat1 = '### Day 1\n- Arrival in Ahmedabad';
    const markdownFormat2 = '### Day 1 — Arrival & Departure\n- Arrival at Airport';
    const markdownFormat3 = '### Day 1: City Tour\n- Morning sightseeing';

    const r1 = parseItinerary(markdownFormat1);
    expect(r1.days[0].dayHeaderMain).toBe('Day 1');
    expect(r1.days[0].dayHeaderSub).toBeUndefined();

    const r2 = parseItinerary(markdownFormat2);
    expect(r2.days[0].dayHeaderMain).toBe('Day 1');
    expect(r2.days[0].dayHeaderSub).toBe('Arrival & Departure');

    const r3 = parseItinerary(markdownFormat3);
    expect(r3.days[0].dayHeaderMain).toBe('Day 1');
    expect(r3.days[0].dayHeaderSub).toBe('City Tour');
  });

  it('should handle long activity text without breaking', () => {
    const longText = 'Very long activity description detailing every single stop, monument visit, tea break, and photo stop along the picturesque route from Vadodara to Saputara via Surat highway.';
    const markdown = `### Day 1\n- ${longText}`;

    const result = parseItinerary(markdown);
    expect(result.days[0].activities[0]).toBe(longText);
  });

  it('should handle null, undefined, or empty description gracefully', () => {
    expect(parseItinerary(null)).toEqual({ hasItinerary: false, overviewText: '', days: [] });
    expect(parseItinerary(undefined)).toEqual({ hasItinerary: false, overviewText: '', days: [] });
    expect(parseItinerary('   ')).toEqual({ hasItinerary: false, overviewText: '', days: [] });
  });
});
