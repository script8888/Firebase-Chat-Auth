import { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import AuthService from '../services/AuthService';

export default function AuthStateChanged({ children }) {
  const setUser = useStoreActions((action) => action.auth.setUserData);
  const setLoggedIn = useStoreActions((action) => action.auth.setLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.waitForUser((user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return children;
}
