import { useMemo, useState } from 'react';

type FilterType = 'all' | 'less' | 'greater';
type SortField = 'name' | 'count';
type SortOrder = 'asc' | 'desc';

export type UserDataEntry = [string, number];

interface UseTableFiltersParams {
  data: Record<string, string[]> | null;
}

interface UseTableFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  countThreshold: number;
  setCountThreshold: (threshold: number) => void;
  handleSort: (field: SortField) => void;
  processedEntries: UserDataEntry[];
}

/**
 * Custom hook for managing table filtering and sorting logic
 */
export function useTableFilters({
  data,
}: UseTableFiltersParams): UseTableFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [countThreshold, setCountThreshold] = useState(16);
  const [sortField, setSortField] = useState<SortField>('count');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  const processedEntries = useMemo(() => {
    if (!data) return [];

    let filtered = Object.entries(data).map(([userName, visits]) => [
      userName,
      visits.length,
    ]) as UserDataEntry[];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(([userName]) =>
        userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by count threshold
    if (filterType !== 'all') {
      filtered = filtered.filter(([, visitCount]) => {
        if (filterType === 'less') {
          return visitCount <= countThreshold;
        } else if (filterType === 'greater') {
          return visitCount >= countThreshold;
        }
        return true;
      });
    }

    // Sort the filtered results
    return filtered.sort((entryA, entryB) => {
      const [userNameA, visitCountA] = entryA;
      const [userNameB, visitCountB] = entryB;

      if (sortField === 'name') {
        const comparison = userNameA.localeCompare(userNameB);
        return sortOrder === 'asc' ? comparison : -comparison;
      } else {
        const comparison = visitCountA - visitCountB;
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });
  }, [data, searchTerm, filterType, countThreshold, sortField, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    countThreshold,
    setCountThreshold,
    handleSort,
    processedEntries,
  };
}
