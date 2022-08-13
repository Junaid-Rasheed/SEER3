import React from 'react';
import { HeaderLogo } from '../icons/Logos';
import AuthBadge from '../AuthBadge';
import StripePortalButton from '../StripePortalButton';
import { useAuth } from '../context/Authentication';

const TopBar = () => {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between px-8 sticky top-0 h-14 border-b border-[#4B4B4B]">
      <HeaderLogo className="h-10" />
      <div className="flex items-center gap-x-5">
        {user && <AuthBadge user={user} />}
        <StripePortalButton />
      </div>
    </div>
  );
};

export default TopBar;
