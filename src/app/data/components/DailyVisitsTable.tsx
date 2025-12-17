'use client';

import { useMemo, useState } from 'react';
import { getDailyVisits } from '../../utils/dailyVisitsUtils';
import { formatDateWithDayOfWeek } from '../../utils/dateUtils';
import { SortableTableHeader } from './SortableTableHeader';
import { TableActionsHeader } from './TableActionsHeader';
import { NamesListTooltip } from './NamesListTooltip';
import { useDailyVisitsTooltip } from '../../hooks/useDailyVisitsTooltip';

interface DailyVisitsTableProps {
  parsedData: Record<string, string[]> | null;
}

type SortField = 'date' | 'count';
type SortOrder = 'asc' | 'desc';

export function DailyVisitsTable({ parsedData }: DailyVisitsTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [isMinimized, setIsMinimized] = useState(false);
  const { tooltipState, handleCellClick } = useDailyVisitsTooltip({
    parsedData,
  });

  const dailyVisits = useMemo(() => getDailyVisits(parsedData), [parsedData]);

  const handleSort = (field: 'date' | 'count' | 'name') => {
    const sortFieldTyped = field as SortField;
    if (sortField === sortFieldTyped) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(sortFieldTyped);
      setSortOrder(sortFieldTyped === 'date' ? 'asc' : 'desc');
    }
  };

  const sortedVisits = useMemo(() => {
    return [...dailyVisits].sort(([dateA, countA], [dateB, countB]) => {
      if (sortField === 'date') {
        const dateObjA = new Date(dateA);
        const dateObjB = new Date(dateB);
        const comparison = dateObjA.getTime() - dateObjB.getTime();
        return sortOrder === 'asc' ? comparison : -comparison;
      } else {
        const comparison = countA - countB;
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });
  }, [dailyVisits, sortField, sortOrder]);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  if (!parsedData || dailyVisits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No daily visit data available
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-lg">
        <table
          id="daily-visits-table"
          className="min-w-full divide-y divide-gray-200 table-fixed"
        >
          <colgroup>
            <col /> {/* Date - takes remaining space */}
            <col style={{ width: '150px' }} /> {/* Visit count */}
            <col className="no-print" style={{ width: '96px' }} />{' '}
            {/* Print + Arrow buttons */}
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              <SortableTableHeader
                field="date"
                label="Date"
                onSort={handleSort}
              />
              <SortableTableHeader
                field="count"
                label="Visit count"
                onSort={handleSort}
              />
              <TableActionsHeader
                isMinimized={isMinimized}
                onToggleMinimize={toggleMinimize}
                tableId="daily-visits-table"
              />
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-100 bg-white ${
              isMinimized ? 'hidden' : ''
            }`}
          >
            {sortedVisits.map(([date, visitCount]) => (
              <tr key={date}>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {formatDateWithDayOfWeek(date)}
                </td>
                <td
                  data-daily-visit-count
                  className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleCellClick(e, date)}
                >
                  {visitCount}
                </td>
                <td className="w-12 px-0 py-2 no-print"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NamesListTooltip tooltipState={tooltipState} parsedData={parsedData} />
    </div>
  );
}
