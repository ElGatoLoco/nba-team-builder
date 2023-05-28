export const TableHeader = () => {
  return (
    <thead className="text-xs uppercase sticky top-0 bg-gray-200 border-gray-100 text-gray-600 dark:text-gray-400">
      <tr>
        <th scope="col" className="pl-3 py-1">
          Name
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Position
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Height
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Weight
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Year Start
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Year End
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Born
        </th>
        <th scope="col" className="px-1 py-1 whitespace-nowrap text-center">
          Birth City
        </th>
        <th scope="col" className="px-6 py-3 whitespace-nowrap text-center">
          Birth State
        </th>
        <th className="px-6 py-3 whitespace-nowrap text-center text-red-600">Delete</th>
      </tr>
    </thead>
  );
};
