/**
 * Processes parsed data to get average weekday attendance
 * Calculates the average number of unique visitors per weekday
 * @param parsedData - Record of userName -> dates array
 * @returns Array of [weekdayName, averageAttendance] tuples
 */
export function getAverageWeekdayAttendance(
  parsedData: Record<string, string[]> | null
): [string, number][] {
  if (!parsedData) return [];

  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Map weekday index (0-6) to arrays of visit counts for each occurrence
  const weekdayToCounts = new Map<number, number[]>();

  // First, get all unique dates and their visit counts
  const dateToUsers = new Map<string, Set<string>>();

  // Iterate through each user and their dates
  Object.entries(parsedData).forEach(([userName, dates]) => {
    dates.forEach((date) => {
      if (!dateToUsers.has(date)) {
        dateToUsers.set(date, new Set());
      }
      dateToUsers.get(date)!.add(userName);
    });
  });

  // Group visit counts by weekday
  dateToUsers.forEach((users, date) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return; // Skip invalid dates
    }

    const weekdayIndex = dateObj.getDay();
    const visitCount = users.size;

    if (!weekdayToCounts.has(weekdayIndex)) {
      weekdayToCounts.set(weekdayIndex, []);
    }
    weekdayToCounts.get(weekdayIndex)!.push(visitCount);
  });

  // Calculate average for each weekday
  const weekdayAverages: [string, number][] = weekdayNames
    .map((weekdayName, index) => {
      const counts = weekdayToCounts.get(index) || [];
      if (counts.length === 0) {
        return [weekdayName, 0] as [string, number];
      }

      const sum = counts.reduce((acc, count) => acc + count, 0);
      const average = sum / counts.length;
      return [weekdayName, Math.round(average * 100) / 100] as [string, number]; // Round to 2 decimal places
    })
    .filter(([, average]) => average > 0); // Only include weekdays with data

  return weekdayAverages;
}
