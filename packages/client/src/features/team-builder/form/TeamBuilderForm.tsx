import { Button } from '../../../common/components/Button';
import { Input } from '../../../common/components/Input';
import { useTeamBuilderContext } from '../TeamBuilderContext';

export const TeamBuilderForm = () => {
  const { generateTeam, register, errors, submitDisabled } = useTeamBuilderContext();

  return (
    <form className="flex justify-center mt-8" onSubmit={generateTeam}>
      <div className="flex flex-col md:flex-row justify-between w-96 h-16">
        <div className="w-full md:w-2/3 md:mr-2 flex flex-col">
          <Input register={register('pts')} placeholder="Target Team Points" error={errors?.pts?.message} />
        </div>
        <div className="w-full mt-4 md:mt-0 md:w-1/3 flex justify-center items-center my-2">
          <Button type="submit" text="Generate Team" disabled={submitDisabled} />
        </div>
      </div>
    </form>
  );
};
