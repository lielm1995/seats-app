'use client';

import { formatDateWithDayOfWeek, sortDates } from '../../utils/dateUtils';
import { exportDatesToFile } from '../../utils/fileUtils';
import { TooltipState } from '../../hooks/useDateTooltip';

interface DateListTooltipProps {
  tooltipState: TooltipState;
}

export function DateListTooltip({ tooltipState }: DateListTooltipProps) {
  const { visible, userName, dates, position, showBelow } = tooltipState;

  if (!visible || dates.length === 0) return null;

  const sortedDates = sortDates(dates);

  const handleExport = () => {
    exportDatesToFile(dates, userName, formatDateWithDayOfWeek);
  };

  // Position tooltip above or below based on showBelow flag
  const tooltipStyle = showBelow
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
        marginTop: '8px',
      }
    : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-8px',
      };

  return (
    <div
      data-tooltip
      className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-h-[600px] overflow-y-auto min-w-[300px]"
      style={tooltipStyle}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-sm text-gray-800">
          {userName} - {dates.length} {dates.length === 1 ? 'visit' : 'visits'}
        </div>
        <button
          onClick={handleExport}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          title="Export to file"
          aria-label="Export to file"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-1">
        {sortedDates.map((date, index) => (
          <div key={`${date}-${index}`} className="text-sm text-gray-700 py-1">
            {formatDateWithDayOfWeek(date)}
          </div>
        ))}
      </div>
    </div>
  );
}
