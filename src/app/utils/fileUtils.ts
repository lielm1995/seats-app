/**
 * Formats file size in bytes to human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted string (KB, MB, or GB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/**
 * Validates if a file is a CSV file
 * @param file - File object to validate
 * @returns true if file is valid CSV, false otherwise
 */
export function isValidCSVFile(file: File): boolean {
  const allowedTypes = ['text/csv', 'application/csv'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(file.type) || fileExtension === 'csv';
}

/**
 * Truncates a filename if it's longer than 20 characters (including extension)
 * Shows first 10 characters + "..." + last 10 characters (which includes extension)
 * @param fileName - Full filename including extension
 * @returns Truncated filename if longer than 20 chars, otherwise original filename
 */
export function truncateFileName(fileName: string): string {
  if (fileName.length > 26) {
    return `${fileName.slice(0, 13)}...${fileName.slice(-13)}`;
  }
  return fileName;
}

/**
 * Exports dates list as a text file
 * @param dates - Array of date strings
 * @param userName - Name of the user
 * @param formatDateWithDayOfWeek - Function to format dates with day of week
 */
export function exportDatesToFile(
  dates: string[],
  userName: string,
  formatDateWithDayOfWeek: (date: string) => string
): void {
  const sortedDates = [...dates].sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const content = [
    `${userName} - ${dates.length} ${dates.length === 1 ? 'visit' : 'visits'}`,
    '',
    ...sortedDates.map((date) => formatDateWithDayOfWeek(date)),
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${userName.replace(/[^a-z0-9]/gi, '_')}_attendance_dates.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
