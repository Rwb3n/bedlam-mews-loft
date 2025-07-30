import MobileNavigation from './MobileNavigation';
// import DesktopNavigation from './DesktopNavigation'; // Now rendered in sidebar

export default function Header() {
  return (
    <>
      <MobileNavigation />
      {/* DesktopNavigation now rendered in ContentZone sidebar */}
    </>
  );
}