import { Link } from 'react-router-dom';

import { ValueOf } from '../../../common/types';
import { ROUTES } from '../../../config/routes';

type Props = {
  text: string;
  to: ValueOf<typeof ROUTES>;
};
export const SubLink = ({ text, to }: Props) => {
  return (
    <li className="relative">
      <Link
        to={to}
        className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-12 pr-6 text-[0.78rem] text-primary-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-primary-200 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
      >
        {text}
      </Link>
    </li>
  );
};
