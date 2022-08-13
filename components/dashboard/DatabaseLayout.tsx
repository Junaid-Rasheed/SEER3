import React, { ReactNode } from 'react';
import TopBar from './TopBar';
import Menus from './Menus';

const DatabaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-full grid grid-cols-[100%] grid-rows-[auto,auto,1fr] bg-black">
      <TopBar />
      <Menus />
      <div className="text-white">{children}</div>
    </main>
  );
};

export default DatabaseLayout;
