import { useState, useCallback } from 'react';
import { useCSVData } from '../context/CSVDataContext';
import { parseCSVForDateAndUser } from '../utils/csvParser';
import { isValidCSVFile } from '../utils/fileUtils';

interface UseFileUploadReturn {
  uploadedFile: File | null;
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { setParsedData, clearData } = useCSVData();

  const handleFile = useCallback(
    (file: File) => {
      // Prevent uploading if there's already a file
      if (uploadedFile) {
        return;
      }

      // Validate file type - CSV only
      if (!isValidCSVFile(file)) {
        alert('Please upload only CSV files');
        return;
      }

      setUploadedFile(file);

      // Parse file with papaparse
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        console.log('File uploaded:', file.name);
        console.log('File size:', file.size, 'bytes');
        console.log('File type:', file.type);

        // Parse CSV and extract Date/User columns
        parseCSVForDateAndUser(content)
          .then((usersDateMap) => {
            setParsedData(usersDateMap);
          })
          .catch((error) => {
            console.error('CSV parsing failed:', error);
            alert(error.message);
            setUploadedFile(null);
          });

        if (onFileUpload) {
          onFileUpload(file);
        }
      };
      reader.readAsText(file);
    },
    [onFileUpload, uploadedFile, setParsedData]
  );

  const handleDelete = useCallback(() => {
    setUploadedFile(null);
    clearData();
  }, [clearData]);

  return {
    uploadedFile,
    isDragOver,
    setIsDragOver,
    handleFile,
    handleDelete,
  };
}
