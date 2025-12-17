'use client';

import { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCSVData } from '../context/CSVDataContext';
import { useFileUpload } from '../hooks/useFileUpload';
import { UploadArea } from './UploadArea';
import { UploadedFileDisplay } from './UploadedFileDisplay';

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const { parsedData, fileMetadata } = useCSVData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { isDragOver, setIsDragOver, handleFile, handleDelete } =
    useFileUpload(onFileUpload);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (parsedData) {
        return;
      }
      e.preventDefault();
      setIsDragOver(true);
    },
    [parsedData, setIsDragOver]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    },
    [setIsDragOver]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (parsedData) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile, parsedData, setIsDragOver]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parsedData) {
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    if (parsedData) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleShowData = () => {
    if (parsedData) {
      router.push('/data');
    }
  };

  const handleRemove = () => {
    handleDelete();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (parsedData && fileMetadata) {
    return (
      <UploadedFileDisplay
        fileName={fileMetadata.name}
        fileSize={fileMetadata.size}
        hasParsedData={!!parsedData}
        onShowData={handleShowData}
        onDelete={handleRemove}
      />
    );
  }

  return (
    <>
      <UploadArea
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
}
