type SortField = 'name' | 'count';

interface SortableTableHeaderProps {
  field: SortField;
  label: string;
  onSort: (field: SortField) => void;
}

export function SortableTableHeader({
  field,
  label,
  onSort,
}: SortableTableHeaderProps) {
  return (
    <th
      className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        <SortIcon />
      </div>
    </th>
  );
}

function SortIcon() {
  return (
    <div className="flex flex-col">
      <svg
        className="w-3 h-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </div>
  );
}
