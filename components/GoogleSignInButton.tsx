import React from 'react';
import GoogleIcon from './icons/GoogleIcon';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebaseClient';
import Button from './Button';
import { addUserByGoogleSignIn } from '../lib/firestore';

const provider = new GoogleAuthProvider();

const GoogleSignInButton = () => {
  function handleSignin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        await addUserByGoogleSignIn(user);
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <Button
      className="bg-black hover:bg-black hover:border-decode3 hover:text-decode3 w-full border border-white px-3 py-3 text-white grid grid-cols-[auto,1fr]"
      onClick={handleSignin}
    >
      <GoogleIcon className="w-6 h-6" />
      <span className="uppercase">Sign in with Google</span>
    </Button>
  );
};

export default GoogleSignInButton;
