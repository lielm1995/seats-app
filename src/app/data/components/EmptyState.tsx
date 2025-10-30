interface EmptyStateProps {
  hasNoData: boolean;
}

export function EmptyState({ hasNoData }: EmptyStateProps) {
  if (hasNoData) {
    return <p className="text-white">No data available.</p>;
  }
  return (
    <p className="text-white">
      No results match your search and filter criteria.
    </p>
  );
}
