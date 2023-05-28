import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

import { useNavigationContext } from '../NavigationContext';

export const ToggleNavButton = () => {
  const { sideNavOpen, toggleSideNav } = useNavigationContext();

  return (
    <button
      onClick={toggleSideNav}
      className={`${
        sideNavOpen ? 'translate-x-0' : '-translate-x-[14rem] pl-12 md:pl-8'
      } transition self-end absolute z-[1036] rounded-full mt-4 px-3 py-5 bg-primary-200 dark:bg-secondary-200 text-secondary-700 dark:text-secondary-700`}
    >
      {sideNavOpen ? <DoubleArrowLeftIcon /> : <DoubleArrowRightIcon />}
      <div></div>
    </button>
  );
};
