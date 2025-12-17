'use client';

import { ReactNode, useState } from 'react';
import { TableActionsHeader } from './TableActionsHeader';
import { TableHeader } from './TableHeader';
import { useTableMinimize } from '../../hooks/useTableMinimize';

export interface SortableTableProps {
  id: string;
  colgroup: () => ReactNode;
  header: () => ReactNode;
  rows: () => ReactNode[];
  tooltip?: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

/**
 * Generic sortable table component with minimize and print functionality
 * Provides the table structure, minimize, and print features
 * Individual tables handle their own sorting and data logic
 */
export function SortableTable({
  id,
  colgroup,
  header,
  rows,
  tooltip,
  emptyMessage = 'No data available',
  isEmpty = false,
}: SortableTableProps) {
  const { isMinimized, toggleMinimize } = useTableMinimize();
  const [showRowNumbers, setShowRowNumbers] = useState(false);

  if (isEmpty) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-lg">
        <table
          id={id}
          className="min-w-full divide-y divide-gray-200 table-fixed"
        >
          <colgroup>
            {showRowNumbers && <col style={{ width: '60px' }} />}
            {colgroup()}
            <col className="no-print" style={{ width: '96px' }} />
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              {showRowNumbers && <TableHeader>#</TableHeader>}
              {header()}
              <TableActionsHeader
                isMinimized={isMinimized}
                onToggleMinimize={toggleMinimize}
                tableId={id}
                showRowNumbers={showRowNumbers}
                onToggleRowNumbers={() => setShowRowNumbers((prev) => !prev)}
              />
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-100 bg-white ${
              isMinimized ? 'hidden' : ''
            }`}
          >
            {rows().map((rowCells, index) => (
              <tr key={index}>
                {showRowNumbers && (
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {index + 1}
                  </td>
                )}
                {rowCells}
                <td className="w-12 px-0 py-2 no-print"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tooltip}
    </div>
  );
}
