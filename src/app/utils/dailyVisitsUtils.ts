/**
 * Processes parsed data to get daily visit counts
 * Groups by date and counts unique visitors per day
 * @param parsedData - Record of userName -> dates array
 * @returns Array of [date, visitCount] tuples sorted by date
 */
export function getDailyVisits(
  parsedData: Record<string, string[]> | null
): [string, number][] {
  if (!parsedData) return [];

  // Reverse the data structure: date -> Set of unique users
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

  // Convert to array of [date, count] tuples and sort by date
  const dailyVisits: [string, number][] = Array.from(dateToUsers.entries())
    .map(([date, users]) => [date, users.size] as [string, number])
    .sort(([dateA], [dateB]) => {
      const dateObjA = new Date(dateA);
      const dateObjB = new Date(dateB);
      return dateObjA.getTime() - dateObjB.getTime();
    });

  return dailyVisits;
}

/**
 * Gets the list of unique users who visited on a specific date
 * @param parsedData - Record of userName -> dates array
 * @param date - Date string to get users for
 * @returns Array of user names who visited on that date
 */
export function getUsersForDate(
  parsedData: Record<string, string[]> | null,
  date: string
): string[] {
  if (!parsedData) return [];

  const users: string[] = [];
  Object.entries(parsedData).forEach(([userName, dates]) => {
    if (dates.includes(date)) {
      users.push(userName);
    }
  });

  return users.sort();
}

