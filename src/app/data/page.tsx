'use client';

import { useEffect } from 'react';
import { useCSVData } from '../context/CSVDataContext';

export default function DataPage() {
  const { parsedData } = useCSVData();

  useEffect(() => {
    if (parsedData) {
      console.log('Parsed data:', parsedData);
    }
  }, [parsedData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Data parsed page</h1>
      </div>
    </div>
  );
}
