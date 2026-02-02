'use client';

import { exportTableToCSV } from '../../utils/fileUtils';

interface TableExportButtonProps {
  tableId: string;
  filename?: string;
}

export function TableExportButton({
  tableId,
  filename,
}: TableExportButtonProps) {
  return (
    <button
      onClick={() => exportTableToCSV(tableId, filename)}
      className="p-1 text-foreground hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer"
      title="Export to Excel (.xls)"
      aria-label="Export to Excel"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    </button>
  );
}
