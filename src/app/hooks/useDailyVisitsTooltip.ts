import { useState, useEffect } from 'react';
import { TooltipState } from './useDateTooltip';

interface UseDailyVisitsTooltipParams {
  parsedData: Record<string, string[]> | null;
}

interface UseDailyVisitsTooltipReturn {
  tooltipState: TooltipState;
  handleCellClick: (
    event: React.MouseEvent<HTMLTableCellElement>,
    date: string
  ) => void;
}

/**
 * Custom hook to manage daily visits tooltip state and interactions
 */
export function useDailyVisitsTooltip({
  parsedData,
}: UseDailyVisitsTooltipParams): UseDailyVisitsTooltipReturn {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    visible: false,
    userName: '',
    dates: [],
    position: { x: 0, y: 0 },
    showBelow: false,
  });

  const [clickedDate, setClickedDate] = useState<string | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('td[data-daily-visit-count]') &&
        !target.closest('[data-tooltip]')
      ) {
        setClickedDate(null);
        setTooltipState((prev) => ({ ...prev, visible: false, showBelow: false }));
      }
    };

    if (clickedDate) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [clickedDate]);

  const handleCellClick = (
    event: React.MouseEvent<HTMLTableCellElement>,
    date: string
  ) => {
    event.stopPropagation();
    if (!parsedData) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    // Estimate tooltip height
    const estimatedTooltipHeight = 400;

    // Check if tooltip would overflow at the top
    const spaceAbove = rect.top;
    const showBelow = spaceAbove < estimatedTooltipHeight;

    // Toggle if clicking the same date, otherwise show new date
    if (clickedDate === date) {
      setClickedDate(null);
      setTooltipState((prev) => ({ ...prev, visible: false, showBelow: false }));
    } else {
      setClickedDate(date);
      setTooltipState({
        visible: true,
        userName: date,
        dates: [date],
        position: { x, y },
        showBelow,
      });
    }
  };

  return {
    tooltipState,
    handleCellClick,
  };
}

