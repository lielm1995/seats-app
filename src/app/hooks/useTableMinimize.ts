import { useState } from 'react';

interface UseTableMinimizeReturn {
  isMinimized: boolean;
  toggleMinimize: () => void;
}

/**
 * Hook for managing table minimize/expand state
 */
export function useTableMinimize(): UseTableMinimizeReturn {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return {
    isMinimized,
    toggleMinimize,
  };
}

