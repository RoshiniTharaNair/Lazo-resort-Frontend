"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from 'rizzui';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

export default function GlobalDrawer() {
  const { isOpen, view, placement, customSize, closeDrawer } = useDrawer();
  const pathname = usePathname();

  // Map custom sizes to string values with px
  const sizeMapping: { [key: string]: string } = {
    sm: '300px', // Set small size in pixels
    md: '500px', // Set medium size in pixels
    lg: '700px', // Set large size in pixels
    xl: '900px', // Set extra-large size in pixels
  };

  // Get the mapped size or undefined if it doesn't match any keys
  const stringSize = customSize ? sizeMapping[customSize] : undefined;

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      customSize={stringSize} // Use the string size here
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
