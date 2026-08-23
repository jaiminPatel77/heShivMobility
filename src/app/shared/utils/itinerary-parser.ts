/**
 * Structure of an individual day's itinerary item.
 */
export interface ItineraryDay {
  dayNumber?: number;
  dayTitle: string;
  dayHeaderMain: string;     // e.g. "Day 1"
  dayHeaderSub?: string;      // e.g. "Saturday, 29 August 2026" or "Arrival & Departure"
  activities: string[];
  descriptionText?: string;
}

/**
 * Parsed output of a Markdown description field.
 */
export interface ParsedItinerary {
  hasItinerary: boolean;
  overviewText: string;
  days: ItineraryDay[];
}

/**
 * Parses a Markdown description into a structured Tour Overview and Day-wise Itinerary.
 *
 * Supports headings such as:
 * - ### Day 1 — Saturday, 29 August 2026
 * - ### Day 1: Arrival & Hotel Check-in
 * - ### Day 1
 * - Day 1 — Saturday, 29 August 2026
 *
 * @param description Raw Markdown description string
 * @returns ParsedItinerary object
 */
export function parseItinerary(description: string | null | undefined): ParsedItinerary {
  if (!description || typeof description !== 'string' || !description.trim()) {
    return {
      hasItinerary: false,
      overviewText: '',
      days: []
    };
  }

  const lines = description.split(/\r?\n/);
  const days: ItineraryDay[] = [];
  const overviewLines: string[] = [];

  let currentDay: ItineraryDay | null = null;
  let inOverview = true;

  // Regex to detect Day headings (e.g. "### Day 1", "## Day 1 — Saturday", "Day 1:")
  const dayHeaderRegex = /^(?:#{1,4}\s*)?(Day\s*\d+.*)$/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip standalone "# Tour Overview" or "## Tour Overview" header lines
    if (/^#{1,4}\s*(Tour\s+Overview|Overview)\s*$/i.test(line)) {
      continue;
    }

    const dayMatch = line.match(dayHeaderRegex);

    if (dayMatch) {
      // Switched into Day section
      inOverview = false;

      // Save previous day if any
      if (currentDay) {
        days.push(currentDay);
      }

      const fullTitle = dayMatch[1].replace(/[*#]/g, '').trim();
      const { main, sub, num } = parseDayTitleParts(fullTitle);

      currentDay = {
        dayNumber: num,
        dayTitle: fullTitle,
        dayHeaderMain: main,
        dayHeaderSub: sub,
        activities: [],
        descriptionText: ''
      };
      continue;
    }

    if (inOverview) {
      if (line.length > 0) {
        overviewLines.push(rawLine);
      }
    } else if (currentDay) {
      // Check if bullet point (supports -, *, +, •, 1., 2., or leading checkmarks)
      const bulletMatch = line.match(/^(?:[-*+•]|\d+\.)\s+(.+)$/);
      if (bulletMatch) {
        // Strip any leading checkmark or bullet symbol if present in input string
        const activity = bulletMatch[1].replace(/^[✓\u2713\u2714•\-+]\s*/, '').trim();
        if (activity) {
          currentDay.activities.push(activity);
        }
      } else if (line.length > 0) {
        // Additional paragraph text under current day
        if (currentDay.descriptionText) {
          currentDay.descriptionText += '\n' + line;
        } else {
          currentDay.descriptionText = line;
        }
      }
    }
  }

  // Push last day
  if (currentDay) {
    days.push(currentDay);
  }

  const overviewText = overviewLines.join('\n').trim();

  return {
    hasItinerary: days.length > 0,
    overviewText: overviewText || (days.length === 0 ? description.trim() : ''),
    days
  };
}

/**
 * Helper to split a day title into main part ("Day 1") and subtitle ("Saturday, 29 August 2026" or "Arrival")
 */
export function parseDayTitleParts(title: string): { main: string; sub?: string; num?: number } {
  // Extract day number
  const numMatch = title.match(/Day\s*(\d+)/i);
  const num = numMatch ? parseInt(numMatch[1], 10) : undefined;

  // Split by em-dash (—), en-dash (–), hyphen (-), or colon (:)
  const splitMatch = title.split(/\s*(?:[\u2014\u2013]|-|:)\s*/);

  if (splitMatch.length >= 2) {
    const main = splitMatch[0].trim();
    const sub = splitMatch.slice(1).join(' — ').trim();
    return { main, sub, num };
  }

  // Fallback: If formatted like "Day 1Saturday, 29 August 2026" without explicit delimiter
  const regexFallback = /^(Day\s*\d+)\s*(.*)$/i;
  const match = title.match(regexFallback);
  if (match) {
    const main = match[1].trim();
    const sub = match[2].replace(/^[\s\u2014\u2013\-:]+/, '').trim();
    return { main, sub: sub || undefined, num };
  }

  return { main: title.trim(), num };
}
