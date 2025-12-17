'use client';

import { useState } from 'react';
import { SortableTableHeader } from './SortableTableHeader';
import { TableHeader } from './TableHeader';
import { TableActionsHeader } from './TableActionsHeader';
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
      <div className="overflow-x-auto rounded-lg">
        <table
          id="user-visits-table"
          className="min-w-full divide-y divide-gray-200 table-fixed"
        >
          <colgroup>
            {showRowNumbers && <col style={{ width: '60px' }} />}
            <col /> {/* Name - takes remaining space */}
            <col style={{ width: '250px' }} />{' '}
            {/* Visits count - fits content */}
            <col className="no-print" style={{ width: '96px' }} />{' '}
            {/* Print + Arrow buttons */}
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              {showRowNumbers && <TableHeader>#</TableHeader>}
              <SortableTableHeader
                field="name"
                label="Name"
                onSort={(field) => onSort(field as 'name' | 'count')}
              />
              <SortableTableHeader
                field="count"
                label="Visits count"
                onSort={(field) => onSort(field as 'name' | 'count')}
              />
              <TableActionsHeader
                isMinimized={isMinimized}
                onToggleMinimize={toggleMinimize}
                tableId="user-visits-table"
              />
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
