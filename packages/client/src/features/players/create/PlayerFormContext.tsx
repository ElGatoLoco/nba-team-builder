import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useMemo } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import type { UseFormRegister } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddPlayerInput, playerSchema } from '../../../../../server/src/modules/api/schemas/addPlayer.schema';
import { tRPCClient } from '../../../common/tRPCClient';
import { Children } from '../../../common/types';
import { toTitleCase } from '../../../common/utils/toTitleCase';

type PlayerFormContext = {
  formFields: FormField[];
  addPlayer: (e: React.SyntheticEvent) => Promise<void>;
  register: UseFormRegister<AddPlayerInput>;
  errors: FieldErrors<AddPlayerInput>;
  submitDisabled: boolean;
};
const PlayerFormContext = createContext({} as PlayerFormContext);

const initialFormData: AddPlayerInput = {
  name: '',
  position: '',
  height: 0,
  weight: 0,
  college: '',
  yearStart: 0,
  yearEnd: 0,
  born: 0,
  birthCity: '',
  birthState: '',
};

type FormField = {
  name: keyof AddPlayerInput;
  placeholder: string;
};

type Props = {
  children: Children;
};
export const PlayerFormContextProvider = ({ children }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<AddPlayerInput>({
    resolver: zodResolver(playerSchema),
    reValidateMode: 'onChange',
  });

  const submitDisabled = useMemo(() => {
    return !isValid && isSubmitted;
  }, [isSubmitted, isValid]);

  const formFields = useMemo(() => {
    return Object.entries(initialFormData).map(([key, val]) => {
      return { name: key as keyof AddPlayerInput, val, placeholder: toTitleCase(key) };
    });
  }, []);

  const addPlayer = handleSubmit(async (d) => {
    try {
      await tRPCClient.addPlayer.mutate(d);
      toast.success('Player added successfully.', { position: 'top-right' });
    } catch (e) {
      toast.error('Player add failed.', { position: 'top-right' });
    } finally {
      reset();
    }
  });

  return (
    <PlayerFormContext.Provider value={{ formFields, register, errors, submitDisabled, addPlayer }}>
      {children}
    </PlayerFormContext.Provider>
  );
};

export const usePlayerFormContext = () => {
  return useContext(PlayerFormContext);
};
