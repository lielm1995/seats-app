interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableHeader({
  children,
  className = '',
  onClick,
}: TableHeaderProps) {
  return (
    <th
      className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </th>
  );
}
