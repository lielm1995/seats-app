'use client';

import { Fragment, useMemo, useState } from 'react';
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
  const [includeLowAttendanceDays, setIncludeLowAttendanceDays] =
    useState(false);

  const weekdayAttendance = useMemo(
    () => getAverageWeekdayAttendance(parsedData, includeLowAttendanceDays),
    [parsedData, includeLowAttendanceDays]
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
    <div>
      <div className="flex items-center justify-between mb-4 no-print">
        <h2 className="text-xl font-semibold">Average Weekday Attendance</h2>
        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input
            type="checkbox"
            checked={includeLowAttendanceDays}
            onChange={(e) => setIncludeLowAttendanceDays(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Include outliers</span>
        </label>
      </div>
      <SortableTable
        id="weekday-attendance-table"
        colgroup={colgroup}
        header={header}
        rows={rows}
        isEmpty={!parsedData || weekdayAttendance.length === 0}
        emptyMessage="No weekday attendance data available"
      />
    </div>
  );
}
