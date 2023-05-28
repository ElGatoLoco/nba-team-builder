import { DataTable } from '../features/players/list/DataTable';
import { NameFilter } from '../features/players/list/NameFilter';
import { PlayersContextProvider } from '../features/players/PlayersContext';

export const Players = () => {
  return (
    <PlayersContextProvider>
      <NameFilter />
      <DataTable />
    </PlayersContextProvider>
  );
};
