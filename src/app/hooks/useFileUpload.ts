import { useState, useCallback } from 'react';
import { useCSVData } from '../context/CSVDataContext';
import { parseCSVForDateAndUser } from '../utils/csvParser';
import { isValidCSVFile } from '../utils/fileUtils';

interface UseFileUploadReturn {
  isDragOver: boolean;
  setIsDragOver: (isDragOver: boolean) => void;
  handleFile: (file: File) => void;
  handleDelete: () => void;
}

/**
 * Custom hook for managing file upload logic
 */
export function useFileUpload(
  onFileUpload?: (file: File) => void
): UseFileUploadReturn {
  const [isDragOver, setIsDragOver] = useState(false);
  const { parsedData, setParsedData, clearData } = useCSVData();

  const handleFile = useCallback(
    (file: File) => {
      // Prevent uploading if there's already parsed data
      if (parsedData) {
        return;
      }

      // Validate file type - CSV only
      if (!isValidCSVFile(file)) {
        alert('Please upload only CSV files');
        return;
      }

      // Parse file with papaparse
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;

        // Parse CSV and extract Date/User columns
        parseCSVForDateAndUser(content)
          .then((usersDateMap) => {
            setParsedData(usersDateMap, {
              name: file.name,
              size: file.size,
            });
          })
          .catch((error) => {
            console.error('CSV parsing failed:', error);
            alert(error.message);
          });

        if (onFileUpload) {
          onFileUpload(file);
        }
      };
      reader.readAsText(file);
    },
    [onFileUpload, parsedData, setParsedData]
  );

  const handleDelete = useCallback(() => {
    clearData();
  }, [clearData]);

  return {
    isDragOver,
    setIsDragOver,
    handleFile,
    handleDelete,
  };
}
