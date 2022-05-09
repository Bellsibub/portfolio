import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from 'services/config';

// hooks
import { useAuth } from 'hooks/useAuth';

export const useLogout = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuth();

  const logout = async () => {
    setError(null);
    setLoading(true);

    // sign out the user
    try {
      await signOut(auth);
      
      // dispatch the signout action
      dispatch({ type: 'SIGNOUT' });

      if (!cancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message || error);
        setLoading(false);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { logout, error, loading };
};
