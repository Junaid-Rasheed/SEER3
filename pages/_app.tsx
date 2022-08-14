import '../styles/globals.css';
import '../public/nprogress.css';
import { useRouter } from 'next/router';
import useRoutingProgressBar from '../hooks/useRoutingProgressBar';
import { AuthProvider } from '../components/context/Authentication';
import { AppPropsWithLayout } from '../model/layout-types';
import ProtectedRoute from '../components/ProtectedRoute';

const protectedRoutes = ['/dashboard'];

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useRoutingProgressBar();
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
}

export default MyApp;
