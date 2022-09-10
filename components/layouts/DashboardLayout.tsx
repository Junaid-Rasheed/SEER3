import React, { ReactNode } from 'react';
import TopBar from '../dashboard/TopBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopBar />
      <div className="text-white">{children}</div>
    </>
  );
};

export default DashboardLayout;
