import { Outlet } from 'react-router-dom';

import { useNavigationContext } from '../../features/navigation/NavigationContext';
import { SideNav } from '../../features/navigation/SideNav';

export const Layout = () => {
  const { sideNavOpen } = useNavigationContext();

  return (
    <div className="dark:bg-secondary-800 h-screen overflow-hidden">
      <SideNav />
      <div
        className={`${
          sideNavOpen ? 'lg:translate-x-[130px]' : 'lg:translate-x-0'
        } transition p-5 h-screen flex align-middle`}
      >
        <div
          className={`w-full ${
            sideNavOpen ? 'lg:w-[calc(100%-260px)] lg:translate-x-[130px]' : 'w-full lg:translate-x-0'
          } flex flex-col p-2 md:p-8 md:mt-0`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
