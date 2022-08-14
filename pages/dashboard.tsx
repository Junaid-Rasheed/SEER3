import React, { ReactElement } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useAuth } from '../components/context/Authentication';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="px-10">
      <div className="p-10 mt-10 bg-slate-900">
        <h3 className="heading">
          Hi <span className="text-decode3">{user?.displayName}</span>!<br />{' '}
          Welcome to VIP program
        </h3>
        <div className="mt-10">Content is updating...</div>
      </div>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
