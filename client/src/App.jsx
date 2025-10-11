import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './auth/auth-context.jsx';
import { BASE_URL } from './constants/constants';
import './App.styles.scss';

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/health`);
      if (!res.ok) {
        throw new Error('Internal Server Error');
      }
      return res.json();
    },
  });

  const { isSignedIn, signIn, signOut, user } = useAuth();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email');
      signIn({ email });
      event.currentTarget.reset();
    },
    [signIn]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to fetch data</p>;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        {isSignedIn ? (
          <>
            <span>{user.email}</span>
            <button type="button" className="auth-button" onClick={signOut}>
              Logout
            </button>
          </>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="email@example.com"
              required
            />
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        )}
      </header>
      <h1>Hello World</h1>
      <p className="status-message">Health: {data.data.message}</p>
    </div>
  );
};

export default App;
