import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export const AuthButton = () => {
  const history = useHistory();
  const { token, signout } = useAuth();

  return (
    <p className="head-banner">
      {
        token ? (
          <>
            Welcome!{" "}
            <button
              onClick={() => {
                signout(() => history.push("/login"));
              }}
            >
              Sign out
            </button>
          </>) : <>You are not logged in.</>
      }
    </p>);
};