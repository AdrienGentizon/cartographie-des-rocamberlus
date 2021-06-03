import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';

import { auth } from '../../utils/firebase';

export type User = firebase.User;

export interface UserContextType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signInAnonymously: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useAuth = () => useContext(UserContext) as UserContextType;

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<User | null> => {
    // I wonder if this should be on the backend side rather than on the frontend
    try {
      const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!emailPattern.test(email)) throw new Error('Invalid email');
      if (password !== passwordConfirmation)
        throw new Error('Password and confirmation mismatch');
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setUser(user);
      return user;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    await signOut();
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    setUser(user);
    return user;
  };

  const signInAnonymously = async (): Promise<User | null> => {
    await signOut();
    const { user } = await auth.signInAnonymously();
    setUser(user);
    return user;
  };

  const signOut = async (): Promise<void> => {
    return await auth.signOut();
  };

  const value: UserContextType = {
    user,
    signUp,
    signIn,
    signInAnonymously,
    signOut,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      return setUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
