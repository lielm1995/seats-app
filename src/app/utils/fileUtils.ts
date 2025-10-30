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
