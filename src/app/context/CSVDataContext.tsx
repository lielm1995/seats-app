'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Data structure: [Date, User] tuples
interface FileMetadata {
  name: string;
  size: number;
}

interface CSVDataContextType {
  parsedData: Record<string, string[]> | null;
  fileMetadata: FileMetadata | null;
  setParsedData: (
    data: Record<string, string[]>,
    metadata: FileMetadata
  ) => void;
  clearData: () => void;
}

const CSVDataContext = createContext<CSVDataContextType | undefined>(undefined);

export function CSVDataProvider({ children }: { children: ReactNode }) {
  const [parsedData, setParsedDataState] = useState<Record<
    string,
    string[]
  > | null>(null);
  const [fileMetadata, setFileMetadataState] = useState<FileMetadata | null>(
    null
  );

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('parsedCSVData');
    const storedMetadata = localStorage.getItem('csvFileMetadata');

    // Only load if both exist, otherwise remove both
    if (storedData && storedMetadata) {
      try {
        const data = JSON.parse(storedData);
        const metadata = JSON.parse(storedMetadata);
        setParsedDataState(data);
        setFileMetadataState(metadata);
      } catch (error) {
        console.error('Failed to parse stored CSV data or metadata:', error);
        localStorage.removeItem('parsedCSVData');
        localStorage.removeItem('csvFileMetadata');
      }
    } else {
      // If one is missing, remove both to keep them in sync
      localStorage.removeItem('parsedCSVData');
      localStorage.removeItem('csvFileMetadata');
    }
  }, []);

  // Save to localStorage whenever data changes
  const setParsedData = (
    data: Record<string, string[]>,
    metadata: FileMetadata
  ) => {
    setParsedDataState(data);
    setFileMetadataState(metadata);
    localStorage.setItem('parsedCSVData', JSON.stringify(data));
    localStorage.setItem('csvFileMetadata', JSON.stringify(metadata));
  };

  const clearData = () => {
    setParsedDataState(null);
    setFileMetadataState(null);
    localStorage.removeItem('parsedCSVData');
    localStorage.removeItem('csvFileMetadata');
  };

  return (
    <CSVDataContext.Provider
      value={{ parsedData, fileMetadata, setParsedData, clearData }}
    >
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
