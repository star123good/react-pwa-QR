import React from 'react';
import { Route, Switch, Redirect, 
  // BrowserRouter, 
  HashRouter, 
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-ui/styles";
import DamlLedger from "@daml/react";
import { wsBaseUrl, httpBaseUrl } from "../config";
import './App.css';
import { useUserState } from "../context/UserContext";
import BottomSidebar from '../components/BottomSidebar';
import AddToHomescreen from '../components/AddToHomescreen';
import Theme from "../themes/default";
import rootReducer from '../reducers';
import GenerateQR from './GenerateQR';
import ScanQR from './ScanQR';
import Error from './Error';
import Login from './Login';
import logo from './Login/logo.svg';


// Store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const handleAddToHomescreenClick = () => {
  console.log("handle to add home screen");
};


function App() {
  const userState = useUserState();

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <HashRouter>
          <DamlLedger party={userState.party} token={userState.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/scan" />}
              />
              <PrivateRoute exact path="/generate" component={GenerateQR} />
              <Route exact path="/scan" component={ScanQR} />
              <PublicRoute exact path="/login" component={Login} />
              <Route component={Error} />
            </Switch>
            <BottomSidebar />
          </DamlLedger>
        </HashRouter>
        <AddToHomescreen 
          onAddToHomescreenClick={handleAddToHomescreenClick} 
          title="Add Homescreen" 
          text="Do you want to add homescreen?"
          icon={logo}
        />
      </Provider>
    </ThemeProvider>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            React.createElement(component, props)
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
              React.createElement(component, props)
            )
        }
      />
    );
  }
}

export default App;
