import Papa from 'papaparse';

/**
 * Parses CSV content and extracts only Date and User columns
 * @param content - Raw CSV content as string
 * @returns Promise that resolves to array of [Date, User] tuples
 */
export function parseCSVForDateAndUser(
  content: string
): Promise<Record<string, string[]>> {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      skipEmptyLines: true,
      complete: (result: Papa.ParseResult<string[]>) => {
        // console.log('Parsed data:', result.data);

        const data = result.data as string[][];

        // First row contains headers: Date, Door, Device, User, Event
        if (data.length === 0) {
          console.error('CSV file is empty');
          reject(new Error('CSV file is empty'));
          return;
        }

        const [headers, ...rows] = data;

        // Find indices of Date and User columns
        const dateIndex = headers.findIndex(
          (col) => col.trim().toLowerCase() === 'date'
        );
        const userIndex = headers.findIndex(
          (col) => col.trim().toLowerCase() === 'user'
        );

        if (dateIndex === -1 || userIndex === -1) {
          console.error('Required columns (Date, User) not found in CSV');
          reject(new Error('CSV must contain "Date" and "User" columns'));
          return;
        }

        // Extract only Date and User columns from all rows
        const filteredData: [string, string][] = rows
          .filter((row) => row && row[dateIndex] && row[userIndex])
          .map((row) => {
            const date = row[dateIndex].split(' ')[0];
            const user = row[userIndex];
            return [date, user];
          });

        const usersDateMap = filteredData.reduce((acc, [date, user]) => {
          // remove "(" and ")" and any numbers from user name
          const userName = user.replace(/[()0-9]/g, '').trim();
          if (!acc[userName]) {
            acc[userName] = [];
          }
          if (acc[userName].includes(date)) {
            return acc;
          }
          acc[userName].push(date);
          return acc;
        }, {} as Record<string, string[]>);

        resolve(usersDateMap);
      },
    });
  });
}
