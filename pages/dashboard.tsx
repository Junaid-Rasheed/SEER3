import React, { ReactElement } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const Dashboard = () => {
  return <div>Dashboard</div>;
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
