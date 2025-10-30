type FilterType = 'all' | 'less' | 'greater';

interface FilterControlsProps {
  filterType: FilterType;
  onFilterTypeChange: (type: FilterType) => void;
  countThreshold: number;
  onCountThresholdChange: (threshold: number) => void;
}

export function FilterControls({
  filterType,
  onFilterTypeChange,
  countThreshold,
  onCountThresholdChange,
}: FilterControlsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        Filter by office visit count
      </label>
      <div className="flex items-center space-x-6">
        <FilterRadioOption
          id="filter-all"
          value="all"
          label="Show all"
          checked={filterType === 'all'}
          onChange={() => onFilterTypeChange('all')}
        />
        <FilterRadioOption
          id="filter-less"
          value="less"
          label="Less than"
          checked={filterType === 'less'}
          onChange={() => onFilterTypeChange('less')}
        />
        <FilterRadioOption
          id="filter-greater"
          value="greater"
          label="Greater than"
          checked={filterType === 'greater'}
          onChange={() => onFilterTypeChange('greater')}
        />
        {(filterType === 'less' || filterType === 'greater') && (
          <input
            type="number"
            value={countThreshold}
            onChange={(e) => onCountThresholdChange(Number(e.target.value))}
            min="1"
            max="30"
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    </div>
  );
}

interface FilterRadioOptionProps {
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

function FilterRadioOption({
  id,
  value,
  label,
  checked,
  onChange,
}: FilterRadioOptionProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        name="filter"
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor={id} className="text-sm text-white">
        {label}
      </label>
    </div>
  );
}
