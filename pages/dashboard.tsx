import React from 'react';
import type { ReactElement } from 'react';
import StripePortalButton from '../components/StripePortalButton';
import { NextPageWithLayout } from '../model/layout-types';
import DatabaseLayout from '../components/dashboard/DatabaseLayout';

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h3 className="heading text-center">Dashboard</h3>
      <div>
        <StripePortalButton />
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DatabaseLayout>{page}</DatabaseLayout>;
};

export default Dashboard;
