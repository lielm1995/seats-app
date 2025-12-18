'use client';

import Link from 'next/link';
import { useCSVData } from '../context/CSVDataContext';
import { useTableFilters } from '../hooks/useTableFilters';
import { SearchInput } from './components/SearchInput';
import { FilterControls } from './components/FilterControls';
import { DataTable } from './components/DataTable';
import { DailyVisitsTable } from './components/DailyVisitsTable';
import { WeekdayAttendanceTable } from './components/WeekdayAttendanceTable';
import { EmptyState } from './components/EmptyState';
export default function DataPage() {
  const { parsedData } = useCSVData();
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

        {/* Section with filters and table */}
        <section className="border border-neutral-800 rounded-lg p-6">
          {/* Search and Filter Controls */}
          <div className="mb-6 space-y-4 no-print">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <FilterControls
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              countThreshold={countThreshold}
              onCountThresholdChange={setCountThreshold}
            />
          </div>

          {hasNoData || hasNoResults ? (
            <EmptyState hasNoData={hasNoData} />
          ) : (
            <DataTable
              entries={processedEntries}
              onSort={handleSort}
              parsedData={parsedData}
            />
          )}
        </section>

        {/* Daily Visits Section */}
        <section className="border border-neutral-800 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Daily Visits</h2>
          <DailyVisitsTable parsedData={parsedData} />
        </section>

        {/* Weekday Attendance Section */}
        <section className="border border-neutral-800 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Average Weekday Attendance
          </h2>
          <WeekdayAttendanceTable parsedData={parsedData} />
        </section>
      </div>
    </div>
  );
}
