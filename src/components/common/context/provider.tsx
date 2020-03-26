import React, { useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";

type AuthState = {
  authState: {
    isLogged: boolean;
    user: any;
  };
  setAuth: any;
};

export const AuthContext = React.createContext<AuthState>({
  authState: {
    isLogged: false,
    user: null
  },
  setAuth: () => {}
});

export const AuthProvider = AuthContext.Provider;


type ProviderProps = {
  children: React.ReactNode
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [authState, setAuth] = useState(useContext(AuthContext).authState);

  const fetchData = useCallback(async () => {
    let TokenInCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // set Authorization header
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TokenInCookie;

    let currentUser = await axios.get(`/api/v1/users/me`);
    setAuth({
      isLogged: true,
      user: currentUser,
    });
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <AuthProvider value={{ authState, setAuth }}>
      { children }
    </AuthProvider>
  );
};
