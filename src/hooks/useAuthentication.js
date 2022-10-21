import { app } from "../Firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

import { useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const auth = getAuth(app);

  const createUser = async (data) => {

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.userName
      })

      setLoading(false);

      return user
      
    } catch (error) {

      console.log(error.message);

      let errorMessage 
      
      if(error.message.includes("Password")){
        errorMessage = "Senha deve conter pelo menos 6 caracteres."
      } else if("email-already") {
        errorMessage = "Usuário já cadastrado."
      } else {
        errorMessage = "Ocorreu um erro! Tente mais tarde."
      }

      setLoading(false);
      setError(errorMessage);
    }
  };

  const logout = () => {
    signOut(auth)
  }

  const login = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword (auth, data.email, data.password)

      setLoading(false);
    } catch (error) {

      console.log(error.message);

      let errorMessage 

      if(error.message.includes("user-not-found")){
        errorMessage = "Usuário não encontrado."
      } else if ("wrong-password") {
        errorMessage = "Dados incorretos!"
      } else {
        errorMessage = "Ocorreu um erro!"
      }

      setError(errorMessage);
      setLoading(false);
    }
  } 

  return { auth, createUser, login, logout, loading, error };
};
