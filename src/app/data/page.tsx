'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCSVData } from '../context/CSVDataContext';
import { useTableFilters } from '../hooks/useTableFilters';
import { SearchInput } from './components/SearchInput';
import { FilterControls } from './components/FilterControls';
import { DataTable } from './components/DataTable';
import { EmptyState } from './components/EmptyState';
import { Checkbox } from './components/Checkbox';

export default function DataPage() {
  const { parsedData } = useCSVData();
  const [showRowNumbers, setShowRowNumbers] = useState(false);
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
        <div className="flex items-center gap-4 mb-6 no-print">
          <Link
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-3xl font-semibold">
            HoneyBook Attendance Statistics
          </h1>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4 no-print">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <div className="flex justify-between items-end">
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
            parsedData={parsedData}
          />
        )}
      </div>
    </div>
  );
}
