import React, { useEffect, useState } from 'react';

export const RootContext = React.createContext();

export default ({ children }) => {

  const prevAuth = window.localStorage.getItem('auth') || false;
  const prevUser = JSON.parse(window.localStorage.getItem('user')) || null;

  const [authToken, setAuthToken] = useState(prevAuth);
  const [currentUser, setCurrentUser] = useState(prevUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      if (!authToken) localStorage.clear();
      else
        window.localStorage.setItem('auth', authToken);
      if (!currentUser) localStorage.clear();
      else
        window.localStorage.setItem('user', JSON.stringify(currentUser));
    },
    [authToken, currentUser]
  );

  const defaultContext = {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
    isLoading,
    setIsLoading
  };
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};