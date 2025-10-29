'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CSVDataContextType {
  parsedData: string[][] | null;
  setParsedData: (data: string[][] | null) => void;
  clearData: () => void;
}

const CSVDataContext = createContext<CSVDataContextType | undefined>(undefined);

export function CSVDataProvider({ children }: { children: ReactNode }) {
  const [parsedData, setParsedDataState] = useState<string[][] | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('parsedCSVData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setParsedDataState(data);
      } catch (error) {
        console.error('Failed to parse stored CSV data:', error);
        localStorage.removeItem('parsedCSVData');
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  const setParsedData = (data: string[][] | null) => {
    setParsedDataState(data);
    if (data) {
      localStorage.setItem('parsedCSVData', JSON.stringify(data));
    } else {
      localStorage.removeItem('parsedCSVData');
    }
  };

  const clearData = () => {
    setParsedDataState(null);
    localStorage.removeItem('parsedCSVData');
  };

  return (
    <CSVDataContext.Provider value={{ parsedData, setParsedData, clearData }}>
      {children}
    </CSVDataContext.Provider>
  );
}

export function useCSVData() {
  const context = useContext(CSVDataContext);
  if (context === undefined) {
    throw new Error('useCSVData must be used within a CSVDataProvider');
  }
  return context;
}
