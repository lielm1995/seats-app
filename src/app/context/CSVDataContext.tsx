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

    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setParsedDataState(data);
      } catch (error) {
        console.error('Failed to parse stored CSV data:', error);
        localStorage.removeItem('parsedCSVData');
      }
    }

    if (storedMetadata) {
      try {
        const metadata = JSON.parse(storedMetadata);
        setFileMetadataState(metadata);
      } catch (error) {
        console.error('Failed to parse stored file metadata:', error);
        localStorage.removeItem('csvFileMetadata');
      }
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
