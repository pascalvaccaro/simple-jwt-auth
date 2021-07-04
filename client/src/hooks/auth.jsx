import React, { createContext, useState, useContext } from 'react';

const authContext = createContext({});
const checkForFetchError = async (res) => {
  const result = await (res.status >= 400 ? res.text() : res.json());
  if (typeof result === 'string') throw new Error(result);
  return result;
}

export const useProvideAuth = () => {
  const [token, setToken] = useState('');

  const signin = (body, cb) => fetch(new URL('/register', process.env.API_URL || 'http://localhost:5000').toString(), { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json'}})
    .then(checkForFetchError)
    .then(() => cb());
  const login = (body, cb) => fetch(new URL('/connect', process.env.API_URL || 'http://localhost:5000').toString(), { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json'}})
    .then(checkForFetchError)
    .then(res => setToken(res.token))
    .then(() => cb());

  const signout = cb => {
    setToken('');
    cb();
  };

  return {
    token,
    login,
    signin,
    signout
  };
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
