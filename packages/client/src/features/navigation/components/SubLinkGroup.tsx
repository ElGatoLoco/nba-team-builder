import { ChevronDownIcon, ChevronUpIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';

import { Children } from '../../../common/types';

type Props = {
  text: string;
  children: Children;
};
export const SubLinkGroup = ({ text, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSubitems = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, []);

  return (
    <li className="relative">
      <button
        onClick={toggleSubitems}
        className={`group w-full flex justify-between h-12 cursor-pointer items-center truncate rounded-[5px] p-4 text-[0.875rem] text-secondary-700 dark:text-secondary-200 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-secondary-600 hover:outline-none focus:bg-primary-400/10 focus:text-secondary-600 focus:outline-none active:bg-primary-400/10 active:outline-none active:text-secondary-600 motion-reduce:transition-none dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10`}
      >
        <span className="flex ">
          <ListBulletIcon className="self-center w-4 mr-3" />
          <span>{text}</span>
        </span>
        {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      <ul className={`${isExpanded ? 'h-auto' : 'hidden'} relative m-0 list-none p-0`}>{children}</ul>
    </li>
  );
};
