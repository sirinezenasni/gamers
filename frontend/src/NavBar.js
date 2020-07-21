import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

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
        <div className="jumbotron-header jumbotron-fluid row">
            <div className="container col-6">
                <h1 className="title display-4">GAMERS</h1>
            </div>

            <div style={{display: 'flex'}}>
                {
                    globalState.loggedIn === false && 
                    <Redirect to="/"/>
                }

                {
                    globalState.loggedIn === true && 
                    <button onClick={logOut}
                    className="btn btn-primary">
                        Log Out
                    </button>
                }
            </div>
        </div>
    )
}

export default NavBar;