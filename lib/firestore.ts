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
import { Price, Subscription } from '../model/payment';
import type { DocumentReference } from '@firebase/firestore';

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

export function getFireStoreDoc<T>(field: DocumentReference<T>) {
  return getDoc(field).then((res) => res.data());
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
      if (rs.length) {
        const price = await getFireStoreDoc<Price>(rs[0].price);
        resolve({
          id: rs[0].id,
          status: rs[0].status,
          current_period_start: rs[0].current_period_start,
          current_period_end: rs[0].current_period_end,
          price
        });
      } else {
        resolve(null);
      }
    } catch (err) {
      resolve(null);
    }
  });
}
