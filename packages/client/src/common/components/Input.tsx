import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};
export const Input = ({ placeholder, onChange, error, register }: InputProps) => {
  return (
    <>
      <input
        className={`${
          error
            ? 'border border-red-600'
            : 'border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
        } bg-gray-50 my-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
        placeholder={placeholder}
        onChange={onChange}
        {...register}
      />
      {error && <p className="mt-[-3px] text-sm lg:text-xs text-red-600 dark:text-red-500">{error}</p>}
    </>
  );
};
