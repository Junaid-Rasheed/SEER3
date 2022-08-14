import {
  collection,
  doc,
  getDoc,
  setDoc,
  where,
  query,
  getDocs
} from 'firebase/firestore';
import { db } from './firebaseClient';
import { IUser } from '../model/auth';
import { Collections } from './collections';
import { Subscription } from '../model/payment';

export function getStripeCustomerIdByUserId(uid: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = docSnap.data();
        resolve(user.stripeId);
      } else {
        // doc.data() will be undefined in this case
        reject({ message: 'No such document!' });
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function addUserByGoogleSignIn(user: IUser): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (!user.uid) {
      reject({ message: 'useId is not existing' });
    }
    try {
      const userRef = doc(db, Collections.USERS, user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const newUser = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        };
        await setDoc(userRef, newUser);
      }
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

export function getSubscription(uid: string): Promise<Subscription | null> {
  if (!uid) {
    return Promise.resolve(null);
  }
  const q = query(
    collection(db, `users/${uid}/subscriptions`),
    where('status', '==', 'active')
  );
  return new Promise(async (resolve) => {
    try {
      const querySnapshot = await getDocs(q);
      const rs: Array<any> = [];
      querySnapshot.forEach((doc) => {
        rs.push(doc.data());
      });
      resolve(rs.length ? rs[0] : null);
    } catch (err) {
      resolve(null);
    }
  });
}
