import { ThemeToggler } from '../../theming/ThemeToggler';

const nbaLogo = '/nba-logo.png';

export const NavHeader = () => {
  return (
    <div className="mt-6">
      <div id="header-content" className="pl-4">
        <div className="flex justify-between align-middle mb-6 pr-8">
          <img src={nbaLogo} alt="Avatar" className="rounded-full align-middle max-w-[50px] ml-3" />
          <ThemeToggler />
        </div>
      </div>
      <hr className="border-gray-300" />
    </div>
  );
};
