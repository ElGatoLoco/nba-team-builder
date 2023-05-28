import { PlayersList } from '../features/team-builder/components/PlayersList';
import { TeamBuilderForm } from '../features/team-builder/form/TeamBuilderForm';
import { TeamBuilderContextProvider } from '../features/team-builder/TeamBuilderContext';

export const Home = () => {
  return (
    <TeamBuilderContextProvider>
      <h1 className="mt-0 font-bold lg:mt-6 text-2xl md:text-4xl text-center text-secondary-700 dark:text-secondary-200">
        NBA Team Builder
      </h1>
      <TeamBuilderForm />
      <PlayersList />
    </TeamBuilderContextProvider>
  );
};
