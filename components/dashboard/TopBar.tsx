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

interface MenuProps {
  setShowPaymentDetails?: any;
  showPaymentDetails?: boolean;
}

const TopBar = ({ setShowPaymentDetails, showPaymentDetails }: MenuProps) => {
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
    <div className="flex items-center justify-between px-2 sm:px-8 sticky bg-black top-0 h-14 border-b border-[#4B4B4B] z-20">
      <Link href="/dashboard">
        <a className="w-[100px] sm:w-[150px] h-[30px] md:w-[180px] md:h-[40px] relative ml-2 ">
          <HeaderLogo className="w-full h-full" />
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
                <img
                  src={darkMode.src}
                  alt="dark mode"
                  onClick={() => handleSwitchChange()}
                  className="pointer w-[80px] h-[35px] sm:w-[100px] sm:h-[45px]"
                />
              )}
              {themeMode === 'light' && (
                <img
                  src={lightMode.src}
                  alt="light mode"
                  onClick={() => handleSwitchChange()}
                  className="pointer w-[80px] h-[35px] sm:w-[100px] sm:h-[45px]"
                />
              )}
            </Box>
          )}
        {user && (
          <AuthBadge
            user={user}
            setShowPaymentDetails={setShowPaymentDetails}
            showPaymentDetails={showPaymentDetails}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
