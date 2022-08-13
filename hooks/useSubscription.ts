import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebaseClient';
import { collection, onSnapshot } from 'firebase/firestore';
import { ISubscription } from '../model/payment';

export default function useSubscription() {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  useEffect(() => {
    if (!auth?.currentUser?.uid) {
      setLoading(false);
      return;
    }
    const subscriptionsCollection = collection(
      db,
      `users/${auth.currentUser.uid}/subscriptions`
    );
    const unsubscribe = onSnapshot(subscriptionsCollection, (snap) => {
      let subs: Array<any> = [];
      snap.forEach((doc) => {
        subs.push(doc.data());
      });
      setLoading(false);
      setSubscription(subs.filter((s) => s.status === 'active')?.[0]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isSubscribed: !!subscription,
    loading
  };
}
