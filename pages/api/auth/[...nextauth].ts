import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
// import { firebaseConfig } from '../../../firebase/firebaseClient';

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
        username: { label: 'Username', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log('credentials', credentials);
        const user = { id: 1, name: 'chris', email: 'chris@email.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
  })
});
