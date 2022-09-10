import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { HeaderLogo } from '../icons/Logos';
import AuthBadge from '../AuthBadge';
import { useAuth } from '../context/Authentication';
import { ColorModeContext } from '../../service/colormode.service';
import darkMode from '../../public/assets/desktop/darkmode.png';
import lightMode from '../../public/assets/desktop/lightmode.png';

const TopBar = () => {
  const { user } = useAuth();
  const colorMode = useContext(ColorModeContext);
  const [themeMode, setThemeMode] = useState('');
  const newThemeMode =
    (typeof window !== 'undefined' && localStorage.getItem('themeMode')) || '';

  useEffect(() => {
    setThemeMode(newThemeMode);
  }, [newThemeMode]);

  const handleSwitchChange = () => {
    colorMode.toggleColorMode();
  };
  return (
    <div className="flex items-center justify-between px-8 sticky bg-black top-0 h-14 border-b border-[#4B4B4B] z-20">
      <Link href="/dashboard">
        <a>
          <HeaderLogo className="h-10" />
        </a>
      </Link>
      <div className="flex items-center gap-x-5">
        {typeof window !== 'undefined' &&
          window.location.pathname !== '/pricing' && (
            <Box
              sx={{
                flexGrow: 0,
                marginRight: { xs: '10px', md: '1rem' },
                marginTop: '4px'
              }}
            >
              {themeMode === 'dark' && (
                <Image
                  src={darkMode}
                  alt="dark mode"
                  width="100px"
                  height="45px"
                  onClick={() => handleSwitchChange()}
                  style={{ cursor: 'pointer' }}
                />
              )}
              {themeMode === 'light' && (
                <Image
                  src={lightMode}
                  alt="light mode"
                  width="100px"
                  height="45px"
                  onClick={() => handleSwitchChange()}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </Box>
          )}
        {user && <AuthBadge user={user} />}
      </div>
    </div>
  );
};

export default TopBar;
