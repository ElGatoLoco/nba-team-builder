import { Link } from 'react-router-dom';

import { RadixIcon, ValueOf } from '../../../common/types';
import { ROUTES } from '../../../config/routes';

type Props = {
  text: string;
  to: ValueOf<typeof ROUTES>;
  isInverse?: boolean;
  Icon: RadixIcon;
};
export const NavLink = ({ text, to, isInverse, Icon }: Props) => {
  return (
    <li className="relative">
      <Link
        to={to}
        className={`${
          isInverse
            ? 'm-2 text-secondary-200 dark:text-secondary-700 active:text-secondary-100 focus:text-secondary-100 dark:active:text-secondary-600 dark:focus:text-secondary-600 bg-secondary-700 dark:bg-secondary-200 hover:bg-secondary-600 dark:hover:bg-secondary-100 active:bg-secondary-800 dark:active:bg-secondary-300 '
            : 'text-secondary-700 dark:text-secondary-200'
        } group flex h-12 cursor-pointer items-center truncate rounded-[5px] p-4 text-[0.875rem] outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none`}
      >
        <Icon className="w-4 mr-3" />
        {text}
      </Link>
    </li>
  );
};
