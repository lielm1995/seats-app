'use client';

import { PrintButton } from './PrintButton';

interface TableActionsHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export function TableActionsHeader({
  isMinimized,
  onToggleMinimize,
}: TableActionsHeaderProps) {
  return (
    <th className="px-0 py-3 text-left no-print">
      <div className="flex items-center gap-2 justify-end pr-2">
        <PrintButton />
        <button
          onClick={onToggleMinimize}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors cursor-pointer"
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
