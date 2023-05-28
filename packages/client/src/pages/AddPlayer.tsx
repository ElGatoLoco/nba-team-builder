import { PlayerForm } from '../features/players/create/PlayerForm';
import { PlayerFormContextProvider } from '../features/players/create/PlayerFormContext';

export const AddPlayer = () => {
  return (
    <PlayerFormContextProvider>
      <h1 className="mt-0 lg:mt-6 text-2xl md:text-3xl xl:4xl text-center text-secondary-700 dark:text-secondary-200">
        Add New Player
      </h1>
      <PlayerForm />
    </PlayerFormContextProvider>
  );
};
