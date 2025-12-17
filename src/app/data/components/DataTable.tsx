'use client';

import { useState } from 'react';
import { SortableTableHeader } from './SortableTableHeader';
import { TableHeader } from './TableHeader';
import { PrintButton } from './PrintButton';
import { DateListTooltip } from './DateListTooltip';
import { UserDataEntry } from '../../hooks/useTableFilters';
import { useDateTooltip } from '../../hooks/useDateTooltip';

interface DataTableProps {
  entries: UserDataEntry[];
  onSort: (field: 'name' | 'count') => void;
  showRowNumbers: boolean;
  parsedData: Record<string, string[]> | null;
}

export function DataTable({
  entries,
  onSort,
  showRowNumbers,
  parsedData,
}: DataTableProps) {
  const { tooltipState, handleCellClick } = useDateTooltip({ parsedData });
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div>
      <div className="mb-4 flex justify-start no-print">
        <PrintButton />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <colgroup>
            {showRowNumbers && <col style={{ width: '60px' }} />}
            <col /> {/* Name - takes remaining space */}
            <col style={{ width: '250px' }} />{' '}
            {/* Visits count - fits content */}
            <col className="no-print" style={{ width: '48px' }} />{' '}
            {/* Arrow - minimum */}
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              {showRowNumbers && <TableHeader>#</TableHeader>}
              <SortableTableHeader field="name" label="Name" onSort={onSort} />
              <SortableTableHeader
                field="count"
                label="Visits count"
                onSort={onSort}
              />
              <th className="w-12 px-0 py-3 text-left no-print">
                <button
                  onClick={toggleMinimize}
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
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-100 bg-white ${
              isMinimized ? 'hidden' : ''
            }`}
          >
            {entries.map(([userName, visitCount], index) => (
              <tr key={userName}>
                {showRowNumbers && (
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {index + 1}
                  </td>
                )}
                <td className="px-4 py-2 text-sm text-gray-900">{userName}</td>
                <td
                  data-visit-count
                  className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleCellClick(e, userName)}
                >
                  {visitCount}
                </td>
                <td className="w-12 px-0 py-2 no-print"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DateListTooltip tooltipState={tooltipState} />
    </div>
  );
}
