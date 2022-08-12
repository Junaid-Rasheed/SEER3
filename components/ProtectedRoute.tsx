import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from './context/Authentication';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/signin');
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="flex items-center w-full h-full justify-center">
        <Spinner className="w-8 h-8 text-decode3" />
      </div>
    );
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
