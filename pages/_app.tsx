import '../styles/globals.css';
import '../public/nprogress.css';
import type { AppProps } from 'next/app';
import useRoutingProgressBar from '../hooks/useRoutingProgressBar';
import { AuthProvider } from '../components/context/Authentication';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

const protectedRoutes = ['/dashboard'];

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useRoutingProgressBar();
  const router = useRouter();

  return (
    <AuthProvider>
      {protectedRoutes.includes(router.pathname) ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}

export default MyApp;
