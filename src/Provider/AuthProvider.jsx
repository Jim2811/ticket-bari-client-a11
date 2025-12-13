import React, { useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import auth from '../firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () =>{
       return signInWithPopup(auth, googleProvider)
    }
    const userData = {
        user,
        setUser,
        userLoading,
        googleSignIn,
    }
    return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;