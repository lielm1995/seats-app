/**
 * Formats a date string to include the day of week
 * @param dateString - Date string in format YYYY-MM-DD or similar
 * @returns Formatted string like "2024-01-15 (Monday)"
 */
export function formatDateWithDayOfWeek(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    return `${formattedDate} (${dayOfWeek})`;
  } catch (error) {
    return dateString;
  }
}

/**
 * Sorts date strings in ascending order
 */
export function sortDates(dates: string[]): string[] {
  return [...dates].sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
}

