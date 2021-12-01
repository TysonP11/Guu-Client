import React, { useState, createContext, useEffect } from "react";
import * as firebase from "firebase";

import {
  loadUserRequest,
  loginRequestLocal,
  registerRequestLocal,
} from "./authentication.service";
import { navigate } from "../../infrastructure/navigation/RootNavigation";
import setAuthToken from "../../utils/setAuthToken";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) {
      // don't do anything
      return;
    }
    setTimeout(() => setError(null), 5000);
  }, [error]);

  const loadUser = (token) => {
    setIsLoading(true);
    loadUserRequest(token)
      .then((u) => {
        console.log(u);
        setUser(u);
        setAuthToken(token);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });
  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequestLocal(email, password)
      .then((res) => {
        loadUser(res.token);

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const onLogout = () => {
    setUser(null);
  };

  const onRegister = (
    firstName,
    lastName,
    email,
    password,
    repeatedPassword,
    username
  ) => {
    setIsLoading(true);

    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    registerRequestLocal(firstName, lastName, email, password, username)
      .then((u) => {
        setError(u);
        navigate("Login");
        setIsLoading(false);
      })
      .catch((e) => {
        if (e) {
          console.log(e);
          setIsLoading(false);
          setError(e.response.data.error);
        }
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
