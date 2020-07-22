import React, {useContext} from 'react';
import AppContext from "./AppContext.js";
import {Link} from 'react-router-dom';

const NavBar = () => {
  const [globalState, setGlobalState] = useContext(AppContext);

  const logOut = () => {
    setGlobalState(
      {
        ...globalState,
        loggedIn: false
      }
  );

    localStorage.clear();
}

  return (
      <nav className="navbar navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        GAMERS
      </Link>

      <div style = {{display: 'felx'}}>
      {
        globalState.loggedIn === false && <Link
        to="/login"
        className="btn btn-primary">
            Log In
        </Link>
      }

      {
        globalState.loggedIn === true && 
        <button onClick={logOut}
        className="btn btn-primary">
            Log Out
        </button>
      }
      </div>
    </nav>
  );
}

export default NavBar;