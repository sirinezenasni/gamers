import React, { useState, useContext, useEffect } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AppContext from './AppContext.js';
import './App.css';
import LandingPage from './LandingPage.js';
import DashBoard from './DashBoard';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

  const [globalState, setGlobalState] = useContext(AppContext);

  if(globalState.loggedIn) {
    return(<Route component={Component} {...otherProps} />);
  } else {
    return(<Redirect to="/" />);
  }
}

const App = () => {
  const [globalState, setGlobalState] = useState({
    loggedIn: localStorage.getItem('jwt') ? true : false,
    user: null
  });

  useEffect(
    ()=>{
        // when (and if) globalState.loggedIn changes,
        // run the below code
        console.log("This the loggedIn state", globalState.loggedIn)
    }, 
    [globalState.loggedIn]
  )

  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={LandingPage}/>
          <Route path="/dashboard" exact={true} component={DashBoard}/>
        </ Switch>
      </ BrowserRouter>
    </ AppContext.Provider>
  );
}

export default App;
