import React, {  } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import { ProvideAuth } from './hooks/auth';
import { Home, Login, Register } from './pages';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <main className="App container">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </main>
      </Router>
    </ProvideAuth>
  );
}
