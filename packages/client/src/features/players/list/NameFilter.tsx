import { Input } from '../../../common/components/Input';
import { usePlayersContext } from '../PlayersContext';

export const NameFilter = () => {
  const { filterByName } = usePlayersContext();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-6 lg:w-1/2">
        <Input placeholder="Filter By Name" onChange={filterByName} />
      </div>
    </div>
  );
};
