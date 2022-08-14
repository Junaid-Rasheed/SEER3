import { useEffect, useState } from 'react';
import { db } from '../lib/firebaseClient';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ISubscription } from '../model/payment';

export default function useSubscription(uid?: string) {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  useEffect(() => {
    if (!uid) {
      return;
    }
    const q = query(
      collection(db, `users/${uid}/subscriptions`),
      where('status', '==', 'active')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let subs: Array<any> = [];
      querySnapshot.forEach((doc) => {
        subs.push(doc.data());
      });
      setSubscription(subs.length ? subs[0] : null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return {
    isSubscribed: !!subscription,
    loading,
    subscription
  };
}
