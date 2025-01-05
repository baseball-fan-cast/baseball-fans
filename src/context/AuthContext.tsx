/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useState, useMemo } from 'react';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: any;
  token: any;
  setUser: (newState: any) => void;
  setToken: (newState: any) => void;
};

const initialValue = {
  authenticated: false,
  user: {},
  token: localStorage.getItem('ACCESS_TOKEN'),
  setAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const value = useMemo(() => {
    return {
      user,
      setUser,
      token,
      setToken,
      authenticated,
      setAuthenticated
    };
  }, [user, setUser, token, setToken, authenticated, setAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
