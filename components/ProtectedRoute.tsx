import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from './context/Authentication';
import UpgradeVip from './UpgradeVip';
import PageLoader from './PageLoader';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, subscription, loading, loadingSubscription } = useAuth();
  const router = useRouter();

  switch (true) {
    case loading:
      return <PageLoader />;

    case !user:
      router.push('/signin');
      return null;

    case loadingSubscription:
      return <PageLoader />;

    case !subscription:
      return <UpgradeVip />;

    case !!subscription:
      return <>{children}</>;

    default:
      return null;
  }
};

export default ProtectedRoute;
