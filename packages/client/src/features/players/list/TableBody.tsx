import { RefObject } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { usePlayersContext } from '../PlayersContext';

type Props = {
  scrollRef: RefObject<HTMLTableElement>;
};
export const TableBody = ({ scrollRef }: Props) => {
  const { players, fetchPlayers, isFetching, hasMore, deletePlayer } = usePlayersContext();

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => fetchPlayers(true)}
      initialLoad={false}
      hasMore={!isFetching && hasMore}
      element="tbody"
      getScrollParent={() => scrollRef.current}
      useWindow={false}
    >
      {players.map((player) => {
        return (
          <tr key={player.id} className="border-b bg-gray-50">
            <td className="px-3 min-w-[180px] py-2">{player.name}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.position || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.height || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.weight || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.yearStart || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.yearEnd || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.born || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.birthCity || '-'}</td>
            <td className="px-3 py-2 whitespace-nowrap text-center">{player.birthState || '-'}</td>
            <td
              className="px-3 py-2 whitespace-nowrap text-center text-red-600 font-bold cursor-pointer"
              onClick={deletePlayer(player.id, player.name)}
            >
              X
            </td>
          </tr>
        );
      })}
    </InfiniteScroll>
  );
};
