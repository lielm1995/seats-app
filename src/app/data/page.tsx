'use client';

import { useState } from 'react';
import { useCSVData } from '../context/CSVDataContext';
import { useTableFilters } from '../hooks/useTableFilters';
import { SearchInput } from './components/SearchInput';
import { FilterControls } from './components/FilterControls';
import { DataTable } from './components/DataTable';
import { EmptyState } from './components/EmptyState';
import { Checkbox } from './components/Checkbox';

export default function DataPage() {
  const { parsedData } = useCSVData();
  const [showRowNumbers, setShowRowNumbers] = useState(true);
  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    countThreshold,
    setCountThreshold,
    handleSort,
    processedEntries,
  } = useTableFilters({ data: parsedData });

  const hasNoData = !parsedData || Object.keys(parsedData).length === 0;
  const hasNoResults = processedEntries.length === 0;
  console.log('processedEntries', processedEntries);
  console.log('parsedData', parsedData);

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">Data parsed page</h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <div className="flex justify-between">
            <FilterControls
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              countThreshold={countThreshold}
              onCountThresholdChange={setCountThreshold}
            />

            <Checkbox
              id="show-row-numbers"
              checked={showRowNumbers}
              onChange={setShowRowNumbers}
              label="Show row numbers"
              className="self-end"
            />
          </div>
        </div>

        {hasNoData || hasNoResults ? (
          <EmptyState hasNoData={hasNoData} />
        ) : (
          <DataTable
            entries={processedEntries}
            onSort={handleSort}
            showRowNumbers={showRowNumbers}
          />
        )}
      </div>
    </div>
  );
}
