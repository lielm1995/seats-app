'use client';

import { Fragment } from 'react';
import { SortableTableHeader } from './SortableTableHeader';
import { SortableTable } from './SortableTable';
import { DateListTooltip } from './DateListTooltip';
import { UserDataEntry } from '../../hooks/useTableFilters';
import { useDateTooltip } from '../../hooks/useDateTooltip';

interface DataTableProps {
  entries: UserDataEntry[];
  onSort: (field: 'name' | 'count') => void;
  parsedData: Record<string, string[]> | null;
}

export function DataTable({ entries, onSort, parsedData }: DataTableProps) {
  const { tooltipState, handleCellClick } = useDateTooltip({ parsedData });

  const colgroup = () => [
    <col key="name" />, // Name - takes remaining space
    <col key="count" style={{ width: '250px' }} />, // Visits count - fits content
  ];

  const header = () => (
    <>
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
    </>
  );

  const rows = () =>
    entries.map(([userName, visitCount]) => (
      <Fragment key={userName}>
        <td className="px-4 py-2 text-sm text-foreground">{userName}</td>
        <td
          data-visit-count
          className="px-4 py-2 text-sm text-foreground cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => handleCellClick(e, userName)}
        >
          {visitCount}
        </td>
      </Fragment>
    ));

  return (
    <SortableTable
      id="user-visits-table"
      colgroup={colgroup}
      header={header}
      rows={rows}
      tooltip={<DateListTooltip tooltipState={tooltipState} />}
      isEmpty={entries.length === 0}
    />
  );
}
