import { Half1Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';

import { useOnClickOutside } from '../../common/hooks/useOnClickOutside';
import { ROUTES } from '../../config/routes';
import { NavHeader } from './components/NavHeader';
import { NavLink } from './components/NavLink';
import { SubLink } from './components/SubLink';
import { SubLinkGroup } from './components/SubLinkGroup';
import { ToggleNavButton } from './components/ToggleNavButton';
import { useNavigationContext } from './NavigationContext';

export const SideNav = () => {
  const { sideNavOpen, closeSideNav } = useNavigationContext();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, closeSideNav, true);

  return (
    <div className="flex flex-col justify-between w-64" ref={ref}>
      <nav
        className={`fixed left-0 top-0 z-[1035] flex flex-col h-full w-60 ${
          sideNavOpen ? 'translate-x-0' : '-translate-x-full'
        } transition overflow-auto bg-primary-200 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-secondary-800`}
      >
        <NavHeader />
        <div className="flex flex-col justify-between h-full">
          <ul className="relative m-0 list-none px-[0.2rem]">
            <NavLink text="Generate Team" to={ROUTES.generateTeam} isInverse={true} Icon={Half1Icon} />
            <SubLinkGroup text="Players">
              <SubLink text="List" to={ROUTES.players} />
              <SubLink text="Add +" to={ROUTES.playersNew} />
            </SubLinkGroup>
          </ul>
          <div>
            <hr className="border-gray-300" />
            <ul className="relative m-0 list-none px-[0.2rem]">
              <NavLink text="About" to={ROUTES.about} Icon={InfoCircledIcon} />
            </ul>
          </div>
        </div>
      </nav>
      <ToggleNavButton />
    </div>
  );
};
