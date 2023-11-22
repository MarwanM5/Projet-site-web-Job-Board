// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

/**
 * Creates an authentication provider component.
 *
 * @param {Object} children - The child elements to be rendered within the provider.
 * @return {JSX.Element} The authentication provider component.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));

  /**
   * Sets the `isLoggedIn` state to `true`.
   */
  const loginC = () => {
    setIsLoggedIn(true);
  };

  /**
   * Logs out the user by setting isLoggedIn to false.
   */
  const logoutC = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginC, logoutC }}>
      {children}
    </AuthContext.Provider>
  );
};
