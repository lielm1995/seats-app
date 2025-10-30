import { SortableTableHeader } from './SortableTableHeader';

type UserDataEntry = [string, string[]];

interface DataTableProps {
  entries: UserDataEntry[];
  onSort: (field: 'name' | 'count') => void;
}

export function DataTable({ entries, onSort }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableTableHeader field="name" label="Name" onSort={onSort} />
            <SortableTableHeader
              field="count"
              label="Came to the office count"
              onSort={onSort}
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {entries.map(([userName, dates]) => (
            <tr key={userName}>
              <td className="px-4 py-2 text-sm text-gray-900">{userName}</td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {dates.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
