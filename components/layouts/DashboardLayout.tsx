import React, { ReactNode, useMemo, useState } from 'react';
import { Global, css, ThemeProvider } from '@emotion/react';
import {
  createTheme,
  colors,
  CssBaseline,
  responsiveFontSizes
} from '@mui/material';

import TopBar from '../dashboard/TopBar';
import { ColorModeContext } from '../../service/colormode.service';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        {' '}
        <TopBar />
        <div className="text-white">{children}</div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DashboardLayout;
