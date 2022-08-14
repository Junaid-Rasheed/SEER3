import React, { ReactNode } from 'react';
import TopBar from '../dashboard/TopBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-full grid grid-cols-[100%] grid-rows-[auto,1fr] bg-black">
      <TopBar />
      <div className="text-white">{children}</div>
    </main>
  );
};

export default DashboardLayout;
