import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from "@material-ui/core";
import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { UserProvider } from "./context/UserContext";


ReactDOM.render(
  <UserProvider>
    <CssBaseline />
    <App />
  </UserProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
