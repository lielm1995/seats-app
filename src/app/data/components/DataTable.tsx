'use client';

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

  return (
    <div>
      <div className="mb-4 flex justify-start no-print">
        <PrintButton />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {showRowNumbers && <TableHeader>#</TableHeader>}
              <SortableTableHeader field="name" label="Name" onSort={onSort} />
              <SortableTableHeader
                field="count"
                label="Visits count"
                onSort={onSort}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DateListTooltip tooltipState={tooltipState} />
    </div>
  );
}
