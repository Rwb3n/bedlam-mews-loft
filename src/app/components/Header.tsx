import MobileNavigation from './MobileNavigation';
import DesktopSidebarNavigation from './DesktopSidebarNavigation';

export default function Header() {
  return (
    <>
      <MobileNavigation />
      <DesktopSidebarNavigation />
    </>
  );
}