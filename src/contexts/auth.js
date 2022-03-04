import React, { useState, useCallback, createContext } from "react";
import t from "prop-types";
import {
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
  getAuth,
} from "firebase/auth";
// eslint-disable-next-line
import FirebaseApp from "../services/firebase";

export const AuthContext = createContext();

function Auth({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  const login = useCallback(() => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  }, []);

  const logout = useCallback(() => {
    signOut(auth).then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: t.node.isRequired,
};

const auth = getAuth();

export default Auth;
