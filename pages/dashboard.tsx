import React, { ReactElement, ReactNode, useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useAuth } from '../components/context/Authentication';
import StripePortalButton from '../components/StripePortalButton';
import Spinner from '../components/Spinner';
import Link from 'next/link';
import DashboardData from '../components/DashboardData';
import { Background } from '../styles/Layout.styled';
import TopBar from '../components/dashboard/TopBar';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500">
        {footer}
      </div>
    </div>
  );
}

const Dashboard = () => {
  const { loading: isLoading, subscription } = useAuth();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.price?.currency,
      minimumFractionDigits: 0
    }).format((subscription?.price?.unit_amount || 0) / 100);

  return (
    <>
      <TopBar
        setShowPaymentDetails={setShowPaymentDetails}
        showPaymentDetails={showPaymentDetails}
      />
      <Background>
        <div>
          <div className="">
            {showPaymentDetails && (
              <div className="p-4">
                <Card
                  title="Your Plan"
                  description={
                    subscription
                      ? `You are currently on the ${subscription?.price?.interval} plan.`
                      : ''
                  }
                  footer={
                    <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                      <p className="pb-4 sm:pb-0">
                        Manage your subscription on Stripe.
                      </p>
                      <StripePortalButton className="px-4 text-black font-medium" />
                    </div>
                  }
                >
                  <div className="text-xl mt-8 mb-4 font-semibold">
                    {isLoading ? (
                      <div className="h-12 mb-6">
                        <Spinner className="text-decode3" />
                      </div>
                    ) : subscription ? (
                      `${subscriptionPrice}/${subscription?.price?.interval}`
                    ) : (
                      <Link href="/">
                        <a>Choose your plan</a>
                      </Link>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
          <DashboardData />
        </div>
      </Background>
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
