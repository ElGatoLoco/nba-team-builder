import { MoonIcon } from '@radix-ui/react-icons';

import { useThemeContext } from './ThemeContext';

export const ThemeToggler = () => {
  const { theme, toggleTheme, colors } = useThemeContext();

  return (
    <MoonIcon
      onClick={toggleTheme}
      className="self-center cursor-pointer w-8 h-8 mr-4"
      color={colors.primary[theme === 'dark' ? 200 : 700]}
    />
  );
};
