export const featuresDescription = [
  'Access to 7600+ active investors',
  'Discover new trends and products',
  'Save hundreds of hours in research',
  'Analyze recent investment activity',
  'Conduct market research',
  'Find investment opportunities'
];

export const firebaseAuthError: Record<
  'signInWithPopUp' | 'signUp',
  Record<string, string>
> = {
  signInWithPopUp: {
    'auth/user-not-found': 'User not found, please register new account',
    'auth/expired-action-code': 'Action code has expired.',
    'auth/user-disabled': 'User has been disabled',
    'auth/invalid-action-code':
      'The code is malformed or has already been used.'
  },
  signUp: {
    'auth/email-already-in-use': 'Email is already in use',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/operation-not-allowed': 'Email or password accounts are not enabled',
    'auth/weak-password': 'The password is not strong enough.'
  }
};
