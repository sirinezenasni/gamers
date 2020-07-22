import React, { useState, useContext } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AppContext from './AppContext.js';
import LandingPage from './LandingPage.js';
import LoginPage from "./LoginPage.js";
import RegistrationPage from './RegistrationPage.js';
import DashBoard from './DashBoard.js';
import Settings from './Settings.js';
import Profile from './Profile.js';
import './App.css';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

  const [globalState, setGlobalState] = useContext(AppContext);

  if(globalState.loggedIn) {
    return(<Route component={Component} {...otherProps} />);
  } else {
    return(<Redirect to="/" />);
  }
}

function App() {
  const [globalState, setGlobalState] = useState({
    loggedIn: localStorage.getItem('jwt') ? true : false,
    user: null
  });

  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LandingPage}/>
            <PrivateRoute path="/dashboard" exact={true} component={DashBoard} />
            <PrivateRoute path="/settings" exact={true} component={Settings} />
            <PrivateRoute path="/profile" exact={true} component={Profile} />
            <Route path="/login" exact={true} component={LoginPage}/>
            <Route path="/register" exact={true} component={RegistrationPage}/>
        </Switch>
      </BrowserRouter>
    </ AppContext.Provider>
  )
}

export default App;
