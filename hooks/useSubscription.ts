import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseClient';
import { collection, onSnapshot } from 'firebase/firestore';

export default function useSubscription(uid?: string) {
  const [subscription, setSubscription] = useState<Array<any>>([]);
  useEffect(() => {
    if (!uid) return;
    const subscriptionsCollection = collection(
      db,
      `users/${uid}/subscriptions`
    );
    const unsubscribe = onSnapshot(subscriptionsCollection, (snap) => {
      let subs: Array<any> = [];
      snap.forEach((doc) => {
        subs.push(doc.data());
      });
      setSubscription(subs.filter((s) => s.status === 'active'));
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return subscription;
}
