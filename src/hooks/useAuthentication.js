import { app } from "../Firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

export const useAuthentication = () => {
  
  const auth = getAuth(app);

  const createUser = async (data) => {

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.userName
      })

      return user
      
    } catch (error) {}
  };

  const logout = () => {
    signOut(auth)
  }

  const login = async (data) => {
    try {
      await signInWithEmailAndPassword (auth, data.email, data.password)

    } catch (error) {
      
    }
  } 

  return { auth, createUser, login, logout };
};
