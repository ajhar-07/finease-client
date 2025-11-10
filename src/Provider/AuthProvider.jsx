import React, { Children } from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext';

const Gprovider= new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
const LoginwithGoogle=()=>{
 return signInWithPopup(auth,Gprovider)
}

const UserRegister=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

const UserLogin=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}




const Logout=()=>{
    return signOut(auth)
}



useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



    const AuthInfo={
     user,
     loading,
     UserRegister,
     UserLogin,
     LoginwithGoogle,
     Logout

    }
    return (
       <AuthContext value={AuthInfo}>
    {children}
       </AuthContext>
    );
};

export default AuthProvider;