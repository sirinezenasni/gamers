import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    let emailField;
    let passwordField;

    const [globalState, setGlobalState] = useContext(AppContext);

    const loginUser = () => {
        fetch('http://localhost:8080/users/login', 
            {
                method: 'POST',
                body: JSON.stringify({
                    email: emailField.value,
                    password: passwordField.value
                }),
                headers: {"Content-Type": "application/json"}
            }
        )
        .then(
            (result) => result.json()
        )
        .then (
            (json) => {
                const { message, jsonwebtoken } = json;
                if(jsonwebtoken) {
                    // update the globalState
                    setGlobalState(
                        {
                            ...globalState,
                            loggedIn: true
                        }
                    )

                    // save the jwt in the browser
                    localStorage.setItem('jwt', jsonwebtoken);
                } else {
                    // throw an error
                    alert(message);
                }    
            }
        )
    }

    // If the user is loggedIn, redirect them
    if(globalState.loggedIn === true) {
        return(<Redirect to="/"/>)
    }

    // Otherwise, show the login form
    else {
        return (
            <div> 
                <NavBar />
                <h1>Login</h1>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input 
                                        ref={ (elem) => emailField = elem }
                                        type="email" 
                                        className="form-control" 
                                        id="exampleInputEmail1" 
                                        aria-describedby="emailHelp"/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input 
                                        ref={ (elem) => passwordField = elem }
                                        type="password" 
                                        className="form-control" 
                                        id="exampleInputPassword1"/>
                                </div>
                                <button 
                                    onClick={loginUser}
                                    type="button" 
                                    className="btn btn-primary">Login</button>

                                    <p><br/>If you're not a registred user, please <Link to={"/register"}>register</Link> here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;