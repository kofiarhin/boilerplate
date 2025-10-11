import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext({
  user: null,
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = ({ email } = {}) => {
    setUser({ id: 'local-user', email: email || 'user@example.com' });
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isSignedIn: Boolean(user),
      signIn,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
