import { createContext, useCallback, useContext, useState } from 'react';

import { Children } from '../../common/types';

type NavigationContext = {
  sideNavOpen: boolean;
  toggleSideNav: () => void;
  closeSideNav: () => void;
};
const NavigationContext = createContext({} as NavigationContext);

type Props = {
  children: Children;
};
export const NavigationContextProvider = ({ children }: Props) => {
  const [sideNavOpen, setSidenavOpen] = useState(true);

  const toggleSideNav = useCallback(() => {
    setSidenavOpen((isOpen) => !isOpen);
  }, []);

  const closeSideNav = useCallback(() => {
    setSidenavOpen(false);
  }, []);

  return (
    <NavigationContext.Provider value={{ sideNavOpen, toggleSideNav, closeSideNav }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  return useContext(NavigationContext);
};
