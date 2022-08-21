import '../styles/globals.css';
import '../public/nprogress.css';
import SEO from '../next-seo.config';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import useRoutingProgressBar from '../hooks/useRoutingProgressBar';
import { AuthProvider } from '../components/context/Authentication';
import { AppPropsWithLayout } from '../model/layout-types';
import ProtectedRoute from '../components/ProtectedRoute';
import useShowLoadingScreen from '../hooks/useShowLoadingScreen';
import Loading from '../components/Loading';

const protectedRoutes = ['/dashboard'];

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useRoutingProgressBar();
  const [isVisible] = useShowLoadingScreen(3700);
  const router = useRouter();

  if (isVisible) return <Loading />;

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      {getLayout(
        protectedRoutes.includes(router.pathname) ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )
      )}
    </AuthProvider>
  );
}

export default MyApp;
