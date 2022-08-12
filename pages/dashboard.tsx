import React from 'react';
import Layout from '../components/Layout';
import StripePortalButton from '../components/StripePortalButton';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10">
        <h3 className="heading text-center">Dashboard</h3>
        <div>
          <StripePortalButton />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
