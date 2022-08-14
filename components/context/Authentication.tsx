import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@firebase/auth';
import { auth } from '../../lib/firebaseClient';
import { ICredentials, IUser } from '../../model/auth';
import { getSubscription } from '../../lib/firestore';
import { Subscription } from '../../model/payment';

export type AuthType = {
  user: IUser | null;
  login?: (credentials: ICredentials) => Promise<any>;
  signup?: (credentials: ICredentials) => Promise<any>;
  logout?: () => void;
  loading?: boolean;
  subscription: Subscription | null;
};

const AuthContext = createContext<AuthType>({ user: null, subscription: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          emailVerified: currentUser.emailVerified
        });
        const sub = await getSubscription(currentUser.uid);
        console.log(sub);
        setSubscription(sub);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signup = ({ email, password }: ICredentials) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = ({ email, password }: ICredentials) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        subscription
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
