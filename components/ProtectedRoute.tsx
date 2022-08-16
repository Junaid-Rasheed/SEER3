import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from './context/Authentication';
import Spinner from './Spinner';
import UpgradeVip from './UpgradeVip';

const PageLoader = () => (
  <div className="flex items-center w-full h-full justify-center">
    <Spinner className="w-8 h-8 text-decode3" />
  </div>
);

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
