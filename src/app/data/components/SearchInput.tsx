interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-foreground mb-2"
      >
        Search by name
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter name to search..."
        className="w-full max-w-md px-3 py-2 bg-background text-foreground border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
    </div>
  );
}
