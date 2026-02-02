interface TablePrintButtonProps {
  tableId: string;
  className?: string;
}

export function TablePrintButton({
  tableId,
  className = '',
}: TablePrintButtonProps) {
  const handlePrint = () => {
    // Hide all other sections
    const allSections = document.querySelectorAll('section');
    const targetTable = document.getElementById(tableId);
    const targetSection = targetTable?.closest('section');

    allSections.forEach((section) => {
      if (section !== targetSection) {
        section.classList.add('no-print');
      }
    });

    // Print
    window.print();

    // Restore visibility after printing
    setTimeout(() => {
      allSections.forEach((section) => {
        if (section !== targetSection) {
          section.classList.remove('no-print');
        }
      });
    }, 100);
  };

  return (
    <button
      onClick={handlePrint}
      className={`p-1 text-foreground hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer ${className}`}
      title="Print this table"
      aria-label="Print this table"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
    </button>
  );
}
