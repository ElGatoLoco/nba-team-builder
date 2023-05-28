import { Button } from '../../../common/components/Button';
import { Input } from '../../../common/components/Input';
import { usePlayerFormContext } from './PlayerFormContext';

export const PlayerForm = () => {
  const { formFields, errors, submitDisabled, register, addPlayer } = usePlayerFormContext();

  return (
    <div className="flex justify-center mt-4 overflow-auto">
      <form className="w-full lg:w-1/2 lg:min-w-[720px]" onSubmit={addPlayer}>
        <div className="mb-4 flex flex-wrap">
          {formFields.map(({ name, placeholder }) => (
            <div className="w-full md:w-1/2 md:odd:pr-4 mb-2" key={name}>
              <Input register={register(name)} placeholder={placeholder} error={errors[name]?.message} />
            </div>
          ))}
        </div>
        <Button type="submit" text="Save" disabled={submitDisabled} />
      </form>
    </div>
  );
};
