import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import EmailProvider from 'next-auth/providers/email';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { firebaseConfig } from '../../../utils/firebaseClient';
// import { signInWithEmailAndPassword } from '@firebase/auth';

export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email' },
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   async authorize(credentials) {
    //     try {
    //       const userCredential = await signInWithEmailAndPassword(
    //         auth,
    //         credentials?.email || '',
    //         credentials?.password || ''
    //       );
    //
    //       return {
    //         email: userCredential.user.email,
    //         emailVerified: userCredential.user.emailVerified
    //       };
    //     } catch (err) {
    //       console.log('err', err);
    //       return null;
    //     }
    //   }
    // }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
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
    strategy: 'database'
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async jwt({ token, account, user }) {
    //   return token;
    // },
    async session({ session, token, user }) {
      if (user) {
        // @ts-ignore
        session.user.uid = user.id;
      }
      return session;
    }
  }
});
