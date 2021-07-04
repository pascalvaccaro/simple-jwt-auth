import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export const RegisterPage = () => {
  const history = useHistory();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const signin = useCallback(() => {
    if (!email || !password || !firstName || !lastName) return setError('Please fill all fields');
    if (error) setError('');
    auth.signin({ email, password, firstName, lastName }, () => {
      history.push('/login');
    })
    .catch(err => setError(err.message));
  }, [auth, email, password, firstName, lastName, history, error]);

  return (
    <div>
      <h2>Register with a new account</h2>
      <label for="firstname">
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <label>
        First Name
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="grid">
        <button tabIndex={-1} type="button" className="outline" onClick={() => history.push('/login')}>Login</button>
        <button type="submit" onClick={signin}>Register</button>
      </div>
    </div>
  );
}
