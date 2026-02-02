'use client';

import { PrintButton } from './PrintButton';
import { TablePrintButton } from './TablePrintButton';

interface TableActionsHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  tableId?: string;
  showRowNumbers?: boolean;
  onToggleRowNumbers?: () => void;
}

export function TableActionsHeader({
  isMinimized,
  onToggleMinimize,
  tableId,
  showRowNumbers,
  onToggleRowNumbers,
}: TableActionsHeaderProps) {
  return (
    <th className="px-0 py-3 text-left no-print">
      <div className="flex items-center gap-2 justify-end pr-2">
        {tableId ? <TablePrintButton tableId={tableId} /> : <PrintButton />}
        {onToggleRowNumbers && (
          <button
            onClick={onToggleRowNumbers}
            className={`p-1 rounded transition-colors cursor-pointer ${
              showRowNumbers
                ? 'text-foreground bg-gray-200 dark:bg-gray-600'
                : 'text-foreground hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={showRowNumbers ? 'Hide row numbers' : 'Show row numbers'}
            aria-label={
              showRowNumbers ? 'Hide row numbers' : 'Show row numbers'
            }
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
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        )}
        <button
          onClick={onToggleMinimize}
          className="p-1 text-foreground hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer"
          title={isMinimized ? 'Expand table' : 'Minimize table'}
          aria-label={isMinimized ? 'Expand table' : 'Minimize table'}
        >
          {isMinimized ? (
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
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
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </button>
      </div>
    </th>
  );
}
