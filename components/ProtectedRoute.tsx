import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from './context/Authentication';
import Spinner from './Spinner';
import GetAccessToDashboard from './dashboard/GetAccessToDashboard';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading, subscription } = useAuth();
  const router = useRouter();

  switch (true) {
    case loading:
      return (
        <div className="flex items-center w-full h-full justify-center">
          <Spinner className="w-8 h-8 text-decode3" />
        </div>
      );
    case !user:
      router.push('/signin');
      return null;

    case user && !subscription && !loading:
      return <GetAccessToDashboard />;

    case !!user && !!subscription:
      return <>{children}</>;

    default:
      return null;
  }
};

export default ProtectedRoute;
