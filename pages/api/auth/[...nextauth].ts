import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { auth } from '../../../firebase/firebaseClient';
import { signInWithEmailAndPassword } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDLVo_qBmDyunTMZL7HCqTkPgE1ZZju5lY',
  authDomain: 'testing-e67ac.firebaseapp.com',
  databaseURL: 'https://testing-e67ac.firebaseio.com',
  projectId: 'testing-e67ac',
  storageBucket: 'testing-e67ac.appspot.com',
  messagingSenderId: '734808594155',
  appId: '1:734808594155:web:fe91542e991ffbb9'
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials?.email || '',
            credentials?.password || ''
          );

          return {
            email: userCredential.user.email,
            emailVerified: userCredential.user.emailVerified
          };
        } catch (err) {
          console.log('err', err);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || ''
    })
  ],
  adapter: FirestoreAdapter({
    ...firebaseConfig
  }),
  session: {
    strategy: 'jwt'
  }
});
