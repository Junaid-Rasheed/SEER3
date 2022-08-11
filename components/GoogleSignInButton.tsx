import React from 'react';
import GoogleIcon from './icons/GoogleIcon';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../utils/firebaseClient';
import { collection, doc, setDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

const GoogleSignInButton = () => {
  function handleSignin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const collectionRef = collection(db, 'users');

        await setDoc(doc(collectionRef, user.uid), {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <button
      className="w-full border border-white px-3 py-3 text-white grid grid-cols-[auto,1fr]"
      onClick={handleSignin}
    >
      <GoogleIcon className="w-6 h-6" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
