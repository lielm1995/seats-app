import { useMemo, useState } from 'react';

export type DailyVisitsSortField = 'date' | 'count';
type SortOrder = 'asc' | 'desc';

export type DailyVisit = [string, number]; // [date, count]

interface UseDailyVisitsSortParams {
  dailyVisits: DailyVisit[];
}

interface UseDailyVisitsSortReturn {
  sortField: DailyVisitsSortField;
  sortOrder: SortOrder;
  sortedVisits: DailyVisit[];
  handleSort: (field: DailyVisitsSortField | 'name') => void;
}

/**
 * Hook for sorting daily visits table
 */
export function useDailyVisitsSort({
  dailyVisits,
}: UseDailyVisitsSortParams): UseDailyVisitsSortReturn {
  const [sortField, setSortField] = useState<DailyVisitsSortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: DailyVisitsSortField | 'name') => {
    const sortFieldTyped = field as DailyVisitsSortField;
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

  return {
    sortField,
    sortOrder,
    sortedVisits,
    handleSort,
  };
}
