/**
 * Destination summary helper for package cards.
 * Splits a destination string (delimited by • or ,) into a compact summary.
 */

export interface DestinationSummary {
  visible: string[];
  remainingCount: number;
}

/**
 * Parses a destination string and returns a summary with a limited number of visible items.
 * @param destination Raw destination string (e.g. "Saputara • Trimbakeshwar • Nashik • ...")
 * @param maxVisible Maximum number of destinations to show (default: 3)
 */
export function getDestinationSummary(destination: string | null | undefined, maxVisible = 3): DestinationSummary {
  if (!destination || typeof destination !== 'string' || !destination.trim()) {
    return { visible: [], remainingCount: 0 };
  }

  // Split by bullet (•), comma, or pipe (|)
  const parts = destination
    .split(/[•,|]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (parts.length <= maxVisible) {
    return { visible: parts, remainingCount: 0 };
  }

  return {
    visible: parts.slice(0, maxVisible),
    remainingCount: parts.length - maxVisible
  };
}

/**
 * Formats a DestinationSummary into a display string.
 * Example: "Saputara • Trimbakeshwar • Nashik +7 more"
 */
export function formatDestinationSummary(summary: DestinationSummary): string {
  if (summary.visible.length === 0) return '';
  const base = summary.visible.join(' • ');
  if (summary.remainingCount > 0) {
    return `${base} +${summary.remainingCount} more`;
  }
  return base;
}
