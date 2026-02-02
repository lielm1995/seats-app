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
  formatDateWithDayOfWeek: (date: string) => string,
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

/**
 * Escapes a cell value for CSV (wraps in quotes if needed, escapes double quotes)
 */
function escapeCSVCell(value: string): string {
  const str = String(value).trim();
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports an HTML table to CSV (Excel-compatible) and triggers download.
 * Reads the table by id: includes header row and data rows, excludes the actions column.
 * @param tableId - id of the table element
 * @param filename - optional filename without extension (defaults to table id)
 */
export function exportTableToCSV(tableId: string, filename?: string): void {
  const table = document.getElementById(tableId) as HTMLTableElement | null;
  if (!table || table.tagName !== 'TABLE') return;

  const thead = table.querySelector('thead tr');
  const tbodyRows = table.querySelectorAll('tbody tr');
  if (!thead) return;

  const headerCells = thead.querySelectorAll('th');
  // Skip last column (actions) - it has no-print or is empty
  const headerTexts: string[] = [];
  headerCells.forEach((th) => {
    if (th.classList.contains('no-print')) return;
    const text = th.textContent?.trim() ?? '';
    if (text) headerTexts.push(text);
  });

  const rows: string[][] = [headerTexts];

  tbodyRows.forEach((tr) => {
    const cells = tr.querySelectorAll('td');
    const row: string[] = [];
    cells.forEach((td) => {
      if (td.classList.contains('no-print')) return;
      row.push(td.textContent?.trim() ?? '');
    });
    if (row.length > 0) rows.push(row);
  });

  const csvContent = rows
    .map((row) => row.map(escapeCSVCell).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename ?? tableId}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
