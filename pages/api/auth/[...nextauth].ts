import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { auth, firebaseConfig } from '../../../utils/firebaseClient';
import { signInWithEmailAndPassword } from '@firebase/auth';

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
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  adapter: FirestoreAdapter({
    ...firebaseConfig
  }),
  session: {
    strategy: 'jwt'
  }
});
