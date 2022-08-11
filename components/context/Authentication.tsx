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
import { auth } from '../../utils/firebaseClient';
import { ICredentials, IUser } from '../../model/auth';

export type AuthType = {
  user: IUser | null;
  login?: (credentials: ICredentials) => Promise<any>;
  signup?: (credentials: ICredentials) => Promise<any>;
  logout?: () => void;
};

const AuthContext = createContext<AuthType>({ user: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          emailVerified: currentUser.emailVerified
        });
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
        logout
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
