import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { from } = location.state || { from: { pathname: "/" } };
  const login = useCallback(() => {
    if (!email || !password) return setError('Missing email/password');
    if (error) setError('');
    auth.login({ email, password }, () => {
      history.replace(from);
    })
    .catch(err => setError(err.message));
  }, [error, auth, email, password, history, from]);

  return (
    <div>
      <h2>Connect with an existing account</h2>
      <label>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="grid">
        <button type="button" tabIndex={-1} className="outline" onClick={() => history.push('/register')}>Register</button>
        <button type="submit" onClick={login}>Log in</button>
      </div>
    </div>
  );
}
