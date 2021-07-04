import React from 'react';
import { useFetch } from '../hooks/fetch';

export const Home = () => {
  const { result, error } = useFetch('/');

  return result ? (
    <div>
      <h2>Welcome home, {result.user.firstName}!</h2>
      <p>Below is your profile information:</p>
      <pre>{JSON.stringify(result.user, null, 2)}</pre>
    </div>
  ) : error ? (
    <div className="error">
      <p>Something wrong happened</p>
      <small>{error}</small>
    </div>
  ) : null;
};