import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useMemo, useState } from 'react';
import { FieldErrors, UseFormRegister, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { GenerateTeamInput, generateTeamSchema } from '../../../../server/src/modules/api/schemas/generateTeam.schema';
import { tRPCClient } from '../../common/tRPCClient';
import { Children } from '../../common/types';

type TeamData = {
  players: string[];
  totalPoints: number;
};
type TeamBuilderContext = {
  isLoading: boolean;
  teamData: TeamData | null;
  pointsTarget: number | null;
  generateTeam: (e: React.SyntheticEvent) => Promise<void>;
  register: UseFormRegister<GenerateTeamInput>;
  errors: FieldErrors<GenerateTeamInput>;
  submitDisabled: boolean;
};
const TeamBuilderContext = createContext({} as TeamBuilderContext);

type Props = {
  children: Children;
};
export const TeamBuilderContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [pointsTarget, setPointsTarget] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<GenerateTeamInput>({
    resolver: zodResolver(generateTeamSchema),
    reValidateMode: 'onChange',
  });

  const submitDisabled = useMemo(() => {
    return !isValid && isSubmitted;
  }, [isSubmitted, isValid]);

  const generateTeam = handleSubmit(async ({ pts }) => {
    setIsLoading(true);
    setTeamData(null);
    setPointsTarget(null);

    try {
      const teamData = await tRPCClient.generateTeam.query({ pts });
      const players = teamData.team.map((player) => `${player.position} - ${player.name}`);
      setTeamData({ players, totalPoints: teamData.totalPoints });
      setPointsTarget(pts);
    } catch (e) {
      toast.error('Team generation failed :(.', { position: 'top-right' });
      setIsLoading(false);
    } finally {
      reset();
    }
  });

  return (
    <TeamBuilderContext.Provider
      value={{ isLoading, teamData, pointsTarget, generateTeam, errors, register, submitDisabled }}
    >
      {children}
    </TeamBuilderContext.Provider>
  );
};

export const useTeamBuilderContext = () => {
  return useContext(TeamBuilderContext);
};
