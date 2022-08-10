import '../styles/globals.css';
import '../public/nprogress.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// import useRoutingProgressBar from '../hooks/useRoutingProgressBar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // useRoutingProgressBar();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
