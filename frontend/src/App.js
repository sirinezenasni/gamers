import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContext from './AppContext.js';
import LandingPage from './LandingPage.js';
import LoginPage from "./LoginPage.js";
import RegistrationPage from './RegistrationPage.js';
import './App.css';

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
            <Route path="/login" exact={true} component={LoginPage}/>
            <Route path="/register" exact={true} component={RegistrationPage}/>
        </Switch>
      </BrowserRouter>
    </ AppContext.Provider>
  )
}

export default App;
