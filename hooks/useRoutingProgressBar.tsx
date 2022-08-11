import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false });

export default function useRoutingProgressBar() {
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);
}
