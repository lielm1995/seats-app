import { useMemo, useState } from 'react';

export type WeekdayAttendanceSortField = 'weekday' | 'average';
type SortOrder = 'asc' | 'desc';

export type WeekdayAttendance = [string, number]; // [weekdayName, averageAttendance]

interface UseWeekdayAttendanceSortParams {
  weekdayAttendance: WeekdayAttendance[];
}

interface UseWeekdayAttendanceSortReturn {
  sortField: WeekdayAttendanceSortField;
  sortOrder: SortOrder;
  sortedAttendance: WeekdayAttendance[];
  handleSort: (field: WeekdayAttendanceSortField) => void;
}

const weekdayOrder = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Hook for sorting weekday attendance table
 */
export function useWeekdayAttendanceSort({
  weekdayAttendance,
}: UseWeekdayAttendanceSortParams): UseWeekdayAttendanceSortReturn {
  const [sortField, setSortField] =
    useState<WeekdayAttendanceSortField>('weekday');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: WeekdayAttendanceSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'weekday' ? 'asc' : 'desc');
    }
  };

  const sortedAttendance = useMemo(() => {
    return [...weekdayAttendance].sort(
      ([weekdayA, averageA], [weekdayB, averageB]) => {
        if (sortField === 'weekday') {
          const indexA = weekdayOrder.indexOf(weekdayA);
          const indexB = weekdayOrder.indexOf(weekdayB);
          const comparison = indexA - indexB;
          return sortOrder === 'asc' ? comparison : -comparison;
        } else {
          const comparison = averageA - averageB;
          return sortOrder === 'asc' ? comparison : -comparison;
        }
      }
    );
  }, [weekdayAttendance, sortField, sortOrder]);

  return {
    sortField,
    sortOrder,
    sortedAttendance,
    handleSort,
  };
}
