import { RadixIcon } from '../../../common/types';

type Props = {
  text: string;
  onClick: () => void;
  Icon: RadixIcon;
};
export const NavButton = ({ text, onClick, Icon }: Props) => {
  return (
    <li className="relative">
      <button
        onClick={onClick}
        className={`group w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] p-4 text-[0.875rem] text-secondary-700 dark:text-secondary-200 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-secondary-600 hover:outline-none focus:bg-primary-400/10 focus:text-secondary-600 focus:outline-none active:bg-primary-400/10 active:outline-none active:text-secondary-600 motion-reduce:transition-none dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10`}
      >
        <Icon className="w-4 mr-3" />
        {text}
      </button>
    </li>
  );
};
