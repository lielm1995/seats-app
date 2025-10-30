'use client';

import { useState } from 'react';
import { useCSVData } from '../context/CSVDataContext';

type SortField = 'name' | 'count';
type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'less' | 'greater';

export default function DataPage() {
  const { parsedData } = useCSVData();
  const [sortField, setSortField] = useState<SortField>('count');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [countThreshold, setCountThreshold] = useState(18);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  const getFilteredAndSortedEntries = () => {
    if (!parsedData) return [];

    let filtered = Object.entries(parsedData);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by count threshold
    if (filterType !== 'all') {
      filtered = filtered.filter(([, dates]) => {
        const count = dates.length;
        if (filterType === 'less') {
          return count <= countThreshold;
        } else if (filterType === 'greater') {
          return count >= countThreshold;
        }
        return true;
      });
    }

    // Sort the filtered results
    return filtered.sort((a, b) => {
      const [nameA, datesA] = a;
      const [nameB, datesB] = b;

      if (sortField === 'name') {
        const comparison = nameA.localeCompare(nameB);
        return sortOrder === 'asc' ? comparison : -comparison;
      } else {
        const comparison = datesA.length - datesB.length;
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">Data parsed page</h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Input */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-white mb-2"
            >
              Search by name
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter name to search..."
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Count Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Filter by office visit count
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filter-all"
                  name="filter"
                  value="all"
                  checked={filterType === 'all'}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="filter-all" className="text-sm text-white">
                  Show all
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filter-less"
                  name="filter"
                  value="less"
                  checked={filterType === 'less'}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="filter-less" className="text-sm text-white">
                  Less than
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="filter-greater"
                  name="filter"
                  value="greater"
                  checked={filterType === 'greater'}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="filter-greater" className="text-sm text-white">
                  Greater than
                </label>
              </div>
              {(filterType === 'less' || filterType === 'greater') && (
                <input
                  type="number"
                  value={countThreshold}
                  onChange={(e) => setCountThreshold(Number(e.target.value))}
                  min="1"
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          </div>
        </div>

        {!parsedData || Object.keys(parsedData).length === 0 ? (
          <p className="text-gray-600">No data available.</p>
        ) : getFilteredAndSortedEntries().length === 0 ? (
          <p className="text-gray-600">
            No results match your search and filter criteria.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <div className="flex flex-col">
                        {sortField === 'name' ? (
                          <span className="text-xs text-blue-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        ) : (
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('count')}
                  >
                    <div className="flex items-center gap-2">
                      Came to the office count
                      <div className="flex flex-col">
                        {sortField === 'count' ? (
                          <span className="text-xs text-blue-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        ) : (
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {getFilteredAndSortedEntries().map(([name, dates]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 text-sm text-gray-900">{name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {dates.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
