type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  disabled?: boolean;
};
export const Button = ({ type, text, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full h-12 dark:text-gray-900 whitespace-nowrap text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 dark:bg-gray-200 dark:hover:bg-gray-100 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-slate-400 dark:disabled:bg-slate-400"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
