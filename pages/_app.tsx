import { useMemo, useState } from 'react';
import { LicenseInfo } from '@mui/x-license-pro';
import { Global, css, ThemeProvider } from '@emotion/react';
import {
  createTheme,
  colors,
  CssBaseline,
  responsiveFontSizes
} from '@mui/material';

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
import materialKey from '../key/licenseKey.json';
import { ColorModeContext } from '../service/colormode.service';

const protectedRoutes = ['/dashboard'];

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      }
    }),
    []
  );
  const theme = useMemo(() => {
    if (typeof window !== 'undefined') localStorage.setItem('themeMode', mode);
    let theme = createTheme({
      palette: {
        mode,
        primary: {
          dark: colors.red[100],
          light: colors.amber[100],
          main: '#4D77FF',
          contrastText: colors.lime[100]
        }
      }
    });
    theme = responsiveFontSizes(theme);
    return theme;
  }, [mode]);

  const GlobalStyles = () => {
    return (
      <Global
        styles={css`
          body {
            background-color: ${theme.palette.mode === 'light'
              ? '#fff'
              : '#000'};
          }
          html,
          body,
          #root {
            height: 100vh;
          }
        `}
      />
    );
  };
  useRoutingProgressBar();
  const [isVisible] = useShowLoadingScreen(3700);
  const router = useRouter();

  if (isVisible) return <Loading />;

  const getLayout = Component.getLayout ?? ((page) => page);
  LicenseInfo.setLicenseKey(materialKey.key);

  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          {getLayout(
            protectedRoutes.includes(router.pathname) ? (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            ) : (
              <Component {...pageProps} />
            )
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default MyApp;
