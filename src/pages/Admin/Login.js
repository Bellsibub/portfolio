import { useState } from 'react';

// hooks
import { useLogin } from 'hooks/useLogin';

const Login = () => {
  const { login, error, loading } = useLogin();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
