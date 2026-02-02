'use client';

import { getUsersForDate } from '../../utils/dailyVisitsUtils';
import { formatDateWithDayOfWeek } from '../../utils/dateUtils';
import { TooltipState } from '../../hooks/useDateTooltip';

interface NamesListTooltipProps {
  tooltipState: TooltipState;
  parsedData: Record<string, string[]> | null;
}

export function NamesListTooltip({
  tooltipState,
  parsedData,
}: NamesListTooltipProps) {
  const { visible, userName, dates, position, showBelow } = tooltipState;

  if (!visible || !dates[0] || !parsedData) return null;

  const date = dates[0]; // For daily visits, we only have one date
  const users = getUsersForDate(parsedData, date);

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
      className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 max-h-[600px] overflow-y-auto min-w-[300px]"
      style={tooltipStyle}
    >
      <div className="font-semibold text-sm mb-2 text-foreground">
        {formatDateWithDayOfWeek(date)} - {users.length}{' '}
        {users.length === 1 ? 'visitor' : 'visitors'}
      </div>
      <div className="space-y-1">
        {users.map((user, index) => (
          <div
            key={`${user}-${index}`}
            className="text-sm text-foreground py-1"
          >
            {user}
          </div>
        ))}
      </div>
    </div>
  );
}
