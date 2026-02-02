'use client';

import { Fragment, useMemo } from 'react';
import { getDailyVisits } from '../../utils/dailyVisitsUtils';
import { formatDateWithDayOfWeek } from '../../utils/dateUtils';
import { SortableTableHeader } from './SortableTableHeader';
import { SortableTable } from './SortableTable';
import { NamesListTooltip } from './NamesListTooltip';
import { useDailyVisitsTooltip } from '../../hooks/useDailyVisitsTooltip';
import { useDailyVisitsSort } from '../../hooks/useDailyVisitsSort';

interface DailyVisitsTableProps {
  parsedData: Record<string, string[]> | null;
}

export function DailyVisitsTable({ parsedData }: DailyVisitsTableProps) {
  const { tooltipState, handleCellClick } = useDailyVisitsTooltip({
    parsedData,
  });

  const dailyVisits = useMemo(() => getDailyVisits(parsedData), [parsedData]);

  const { sortedVisits, handleSort } = useDailyVisitsSort({
    dailyVisits,
  });

  const colgroup = () => [
    <col key="date" />, // Date - takes remaining space
    <col key="count" style={{ width: '150px' }} />, // Visit count
  ];

  const header = () => (
    <>
      <SortableTableHeader
        field="date"
        label="Date"
        onSort={(field) => handleSort(field as 'date' | 'count' | 'name')}
      />
      <SortableTableHeader
        field="count"
        label="Visit count"
        onSort={(field) => handleSort(field as 'date' | 'count' | 'name')}
      />
    </>
  );

  const rows = () =>
    sortedVisits.map(([date, visitCount]) => (
      <Fragment key={date}>
        <td className="px-4 py-2 text-sm text-foreground">
          {formatDateWithDayOfWeek(date)}
        </td>
        <td
          data-daily-visit-count
          className="px-4 py-2 text-sm text-foreground cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => handleCellClick(e, date)}
        >
          {visitCount}
        </td>
      </Fragment>
    ));

  return (
    <SortableTable
      id="daily-visits-table"
      colgroup={colgroup}
      header={header}
      rows={rows}
      tooltip={
        <NamesListTooltip tooltipState={tooltipState} parsedData={parsedData} />
      }
      isEmpty={!parsedData || dailyVisits.length === 0}
      emptyMessage="No daily visit data available"
    />
  );
}
