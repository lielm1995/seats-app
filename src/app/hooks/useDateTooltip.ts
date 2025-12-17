import { useState, useEffect } from 'react';

export interface TooltipState {
  visible: boolean;
  userName: string;
  dates: string[];
  position: { x: number; y: number };
  showBelow: boolean;
}

interface UseDateTooltipParams {
  parsedData: Record<string, string[]> | null;
}

interface UseDateTooltipReturn {
  tooltipState: TooltipState;
  handleCellClick: (
    event: React.MouseEvent<HTMLTableCellElement>,
    userName: string
  ) => void;
}

/**
 * Custom hook to manage date tooltip state and interactions
 */
export function useDateTooltip({
  parsedData,
}: UseDateTooltipParams): UseDateTooltipReturn {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    visible: false,
    userName: '',
    dates: [],
    position: { x: 0, y: 0 },
    showBelow: false,
  });

  const [clickedUserName, setClickedUserName] = useState<string | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('td[data-visit-count]') &&
        !target.closest('[data-tooltip]')
      ) {
        setClickedUserName(null);
        setTooltipState((prev) => ({ ...prev, visible: false, showBelow: false }));
      }
    };

    if (clickedUserName) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [clickedUserName]);

  const handleCellClick = (
    event: React.MouseEvent<HTMLTableCellElement>,
    userName: string
  ) => {
    event.stopPropagation();
    if (!parsedData || !parsedData[userName]) return;

    const dates = parsedData[userName];
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    // Estimate tooltip height (header + dates + padding)
    // Approx 60px header + 30px per date item + padding
    const estimatedTooltipHeight = Math.min(
      600, // max height
      60 + dates.length * 30 + 32 // header + dates + padding
    );

    // Check if tooltip would overflow at the top
    // If there's not enough space above, show below instead
    const spaceAbove = rect.top;
    const showBelow = spaceAbove < estimatedTooltipHeight;

    // Toggle if clicking the same user, otherwise show new user
    if (clickedUserName === userName) {
      setClickedUserName(null);
      setTooltipState((prev) => ({ ...prev, visible: false, showBelow: false }));
    } else {
      setClickedUserName(userName);
      setTooltipState({
        visible: true,
        userName,
        dates,
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

