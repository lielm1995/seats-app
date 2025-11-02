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
