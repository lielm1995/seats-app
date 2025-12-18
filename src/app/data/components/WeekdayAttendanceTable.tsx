'use client';

import { Fragment, useMemo } from 'react';
import { getAverageWeekdayAttendance } from '../../utils/weekdayAttendanceUtils';
import { SortableTableHeader } from './SortableTableHeader';
import { SortableTable } from './SortableTable';
import { useWeekdayAttendanceSort } from '../../hooks/useWeekdayAttendanceSort';

interface WeekdayAttendanceTableProps {
  parsedData: Record<string, string[]> | null;
}

export function WeekdayAttendanceTable({
  parsedData,
}: WeekdayAttendanceTableProps) {
  const weekdayAttendance = useMemo(
    () => getAverageWeekdayAttendance(parsedData),
    [parsedData]
  );

  const { sortedAttendance, handleSort } = useWeekdayAttendanceSort({
    weekdayAttendance,
  });

  const colgroup = () => [
    <col key="weekday" />, // Weekday - takes remaining space
    <col key="average" style={{ width: '200px' }} />, // Average attendance
  ];

  const header = () => (
    <>
      <SortableTableHeader
        field="weekday"
        label="Day of Week"
        onSort={(field) => handleSort(field as 'weekday' | 'average')}
      />
      <SortableTableHeader
        field="average"
        label="Average Attendance"
        onSort={(field) => handleSort(field as 'weekday' | 'average')}
      />
    </>
  );

  const rows = () =>
    sortedAttendance.map(([weekday, average]) => (
      <Fragment key={weekday}>
        <td className="px-4 py-2 text-sm text-gray-900">{weekday}</td>
        <td className="px-4 py-2 text-sm text-gray-900">
          {average.toFixed(2)}
        </td>
      </Fragment>
    ));

  return (
    <SortableTable
      id="weekday-attendance-table"
      colgroup={colgroup}
      header={header}
      rows={rows}
      isEmpty={!parsedData || weekdayAttendance.length === 0}
      emptyMessage="No weekday attendance data available"
    />
  );
}

