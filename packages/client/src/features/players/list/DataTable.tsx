import { useRef } from 'react';

import { Spinner } from '../../../common/components/Spinner';
import { usePlayersContext } from '../PlayersContext';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const DataTable = () => {
  const ref = useRef<HTMLTableElement>(null);
  const { isLoading } = usePlayersContext();

  return (
    <>
      {isLoading && <Spinner />}
      <div ref={ref} className="rounded-lg border border-gray-500 dark:border-none relative overflow-auto my-6 md:mx-6">
        <table className="w-full text-sm text-left text-gray-800 overflow-auto">
          <TableHeader />
          <TableBody scrollRef={ref} />
        </table>
      </div>
    </>
  );
};
