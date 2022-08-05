import React from 'react';
import { signIn } from 'next-auth/react';
import GoogleIcon from './icons/GoogleIcon';

const GoogleSignInButton = () => {
  return (
    <button
      className="w-full border border-white px-3 py-3 text-white flex items-center space-x-2"
      onClick={() => signIn('google')}
    >
      <GoogleIcon className="w-6 h-6" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
