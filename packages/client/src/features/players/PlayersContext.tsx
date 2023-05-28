import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PlayerResponse } from '../../../../server/src/modules/api/queries/getPlayers';
import { useDebounce } from '../../common/hooks/useDebounce';
import { tRPCClient } from '../../common/tRPCClient';
import { Children } from '../../common/types';

const BATCH_SIZE = 25;
const LOADING_DEBOUNCE_IN_MS = 300;
const FILTER_DEBOUNCE_IN_MS = 300;

type DeletePlayer = (id: PlayerResponse[number]['id'], name: PlayerResponse[number]['name']) => () => Promise<void>;
type PlayersContext = {
  players: PlayerResponse;
  fetchPlayers: (loadMore?: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
  hasMore: boolean;
  filterByName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deletePlayer: DeletePlayer;
};
const PlayersContext = createContext({} as PlayersContext);

type Props = {
  children: Children;
};
export const PlayersContextProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<PlayerResponse>([]);
  // Fix for known react-infinite-scroller issue
  // https://github.com/danbovey/react-infinite-scroller/issues/143
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const isLoading = useDebounce(isFetching, LOADING_DEBOUNCE_IN_MS);
  const debouncedNameFilter = useDebounce(nameFilter, FILTER_DEBOUNCE_IN_MS);

  const fetchPlayers = useCallback(
    async (loadMore?: boolean) => {
      setIsFetching(true);
      const [newPlayers, count] = await tRPCClient.getPlayers.query({
        limit: BATCH_SIZE,
        skip: !loadMore ? 0 : players.length,
        nameFilter: debouncedNameFilter,
      });

      setIsFetching(false);
      setHasMore(count > players.length + newPlayers.length);
      setPlayers(!loadMore ? newPlayers : (prevPlayers) => [...prevPlayers, ...newPlayers]);
    },
    [debouncedNameFilter, players.length],
  );

  const filterByName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  }, []);

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameFilter]);

  const deletePlayer: DeletePlayer = useCallback(
    (id, name) => async () => {
      try {
        await tRPCClient.deletePlayer.mutate({ id });
        setPlayers((players) => players.filter((ply) => ply.id !== id));
        toast.success(`${name} successfully deleted`, { position: 'top-right' });
      } catch (e) {
        toast.error('Player deletion failed :(.', { position: 'top-right' });
      }
    },
    [],
  );

  return (
    <PlayersContext.Provider
      value={{ players, fetchPlayers, isLoading, isFetching, hasMore, filterByName, deletePlayer }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  return useContext(PlayersContext);
};
