import { useTeamBuilderContext } from '../TeamBuilderContext';

const isLast = (arrLength: number, idx: number) => arrLength - 1 === idx;
const isFirst = (idx: number) => idx === 0;

export const PlayersList = () => {
  const { isLoading, teamData, pointsTarget } = useTeamBuilderContext();

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-96">
          <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-12 md:mt-0">
            {teamData?.players.map((player, idx) => (
              <li
                key={player}
                className={`w-full px-4 py-2 ${
                  isLast(teamData.players.length, idx)
                    ? 'rounded-b-lg'
                    : 'border-b border-gray-200 dark:border-gray-600'
                } ${isFirst(idx) ? 'rounded-t-lg' : ''}`}
              >
                {player}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="mt-2 lg:mt-4 text-xl md:text-3xl text-center text-secondary-700 dark:text-secondary-200">
        {teamData
          ? `Best Team Total Points: ${teamData.totalPoints?.toLocaleString()}`
          : isLoading
          ? 'Generating...'
          : 'Go ahead and generate your team!'}
      </h2>
      {pointsTarget && (
        <h2 className="mt-2 lg:mt-4 text-xl md:text-3xl text-center text-secondary-700 dark:text-secondary-200">
          Target Points: {pointsTarget.toLocaleString()}
        </h2>
      )}
    </>
  );
};
