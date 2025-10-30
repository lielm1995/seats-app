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
  const { parsedData } = useCSVData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { uploadedFile, isDragOver, setIsDragOver, handleFile, handleDelete } =
    useFileUpload(onFileUpload);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (uploadedFile) {
        return;
      }
      e.preventDefault();
      setIsDragOver(true);
    },
    [uploadedFile, setIsDragOver]
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

      if (uploadedFile) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile, uploadedFile, setIsDragOver]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadedFile) {
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    if (uploadedFile) {
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

  if (uploadedFile) {
    return (
      <UploadedFileDisplay
        fileName={uploadedFile.name}
        fileSize={uploadedFile.size}
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
