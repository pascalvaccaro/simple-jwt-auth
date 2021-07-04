import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './auth';

export const useFetch = (uri, options = {}) => {
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const { token } = useAuth();

  const authOptions = useMemo(() => ({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}`} : null),
      ...options.headers,
    }
  }), [options, token]);

  useEffect(() => {
    if (result || error) return undefined;
    fetch(new URL(uri, process.env.API_URL || 'http://localhost:5000').toString(), authOptions)
      .then(res => {
        if (res.status < 400) return res.json();
        else return res.text();
      })
      .then(res => typeof res === 'string' ? setError(res) : setResult(res))
      .catch(err => setError(err.message));
  }, [authOptions, uri, result, error]);

  return { result, error };
};