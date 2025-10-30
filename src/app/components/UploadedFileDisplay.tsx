import { formatFileSize } from '../utils/fileUtils';

interface UploadedFileDisplayProps {
  fileName: string;
  fileSize: number;
  hasParsedData: boolean;
  onShowData: () => void;
  onDelete: () => void;
}

export function UploadedFileDisplay({
  fileName,
  fileSize,
  hasParsedData,
  onShowData,
  onDelete,
}: UploadedFileDisplayProps) {
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
            {fileName}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            {formatFileSize(fileSize)}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onShowData}
          disabled={!hasParsedData}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer rounded-md transition-colors"
        >
          Show data
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 cursor-pointer rounded-md transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
