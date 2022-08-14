import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from './context/Authentication';
import Spinner from './Spinner';
import useSubscription from '../hooks/useSubscription';
import GetAccessToDashboard from './dashboard/GetAccessToDashboard';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { isSubscribed, loading: checkingSubscriber } = useSubscription(
    user?.uid
  );
  const router = useRouter();

  switch (true) {
    case loading:
    case checkingSubscriber:
      return (
        <div className="flex items-center w-full h-full justify-center">
          <Spinner className="w-8 h-8 text-decode3" />
        </div>
      );
    case !user:
      router.push('/signin');
      return null;

    case user && !isSubscribed && !checkingSubscriber:
      return <GetAccessToDashboard />;

    case !!user && isSubscribed:
      return <>{children}</>;

    default:
      return null;
  }
};

export default ProtectedRoute;
