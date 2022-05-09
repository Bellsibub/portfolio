import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from 'services/config';
import { useLocation, useNavigate } from 'react-router-dom';

// hooks
import { useAuth } from 'hooks/useAuth';

export const useLogin = () => {
  const { dispatch } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/';

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    // login the user
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) throw new Error('Could not login user');

      // dispatch the login action and redirect page
      dispatch({ type: 'LOGIN', payload: res.user });
      navigate(from, { replace: true });

      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message || error);
      setLoading(false);
      console.error(error);
    }
  };

  return { login, error, loading };
};
