'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { useCSVData } from '../context/CSVDataContext';

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { parsedData, setParsedData, clearData } = useCSVData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      // Show in GB for files >= 1GB
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (bytes >= 1024 * 1024) {
      // Show in MB for files >= 1MB
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    // Show in KB for files < 1MB
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const handleFile = useCallback(
    (file: File) => {
      // Prevent uploading if there's already a file
      if (uploadedFile) {
        return;
      }

      // Validate file type - CSV only
      const allowedTypes = ['text/csv', 'application/csv'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidType =
        allowedTypes.includes(file.type) || fileExtension === 'csv';

      if (!isValidType) {
        alert('Please upload only CSV files');
        return;
      }

      setUploadedFile(file);

      // Parse file with papaparse
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log('File uploaded:', file.name);
        console.log('File size:', file.size, 'bytes');
        console.log('File type:', file.type);

        // Parse CSV with papaparse
        Papa.parse(content, {
          skipEmptyLines: true,
          skipFirstNLines: 1,
          complete: (result) => {
            console.log('Parsed result:', result);
            console.log('Parsed data:', result.data);
            console.log('Parse errors:', result.errors);
            console.log('Parse meta:', result.meta);

            // Store parsed data in state
            setParsedData(result.data as string[][]);
          },
        });

        if (onFileUpload) {
          onFileUpload(file);
        }
      };
      reader.readAsText(file);
    },
    [onFileUpload, uploadedFile, setParsedData]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      // Prevent drag over if there's already a file
      if (uploadedFile) {
        return;
      }
      e.preventDefault();
      setIsDragOver(true);
    },
    [uploadedFile]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      // Prevent drop if there's already a file
      if (uploadedFile) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile, uploadedFile]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent file input if there's already a file
    if (uploadedFile) {
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    // Prevent clicking if there's already a file
    if (uploadedFile) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    setUploadedFile(null);
    clearData();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleShowData = () => {
    if (parsedData) {
      router.push('/data');
    }
  };

  if (uploadedFile) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">
              {uploadedFile.name}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleShowData}
            disabled={!parsedData}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            Show data
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-md transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Drop your file here
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          or click to browse
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Supports CSV files only
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
