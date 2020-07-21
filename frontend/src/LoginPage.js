import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';

const LoginPage = () => {
    let emailField;
    let passwordField;

    const [globalState, setGlobalState] = useContext(AppContext);

    const loginUser = () => {
        fetch("http://localhost:8080/users/login", 
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

    if(globalState.loggedIn === true) {
        return (
            <Redirect to="/dashboard"/>)
    } else {
        return (
            <div>
                <div className="jumbotron-header jumbotron-fluid row">
                    <div className="container col-6">
                        <h1 className="title display-4">GAMERS</h1>
                    </div>
    
                    <div className="col-6">
                        <form>
                            <div className="form-row align-items-center">
                                <div className="col-auto">
                                    <label for="inlineFormInput">Email</label>
                                    <input 
                                        ref={ (elem) => emailField = elem }
                                        type="email" 
                                        className="form-control mb-2" 
                                        id="inlineFormInput"/>
                                </div>
    
                                <div className="col-auto">
                                    <label for="inlineFormInputGroup">Password</label>
                                    <input 
                                        ref={ (elem) => passwordField = elem }
                                        type="password" 
                                        className="form-control mb-2" 
                                        id="inlineFormInputGroup"/>
                                </div>
    
                                <div className="col-auto">
                                    <button 
                                        onClick={loginUser}
                                        type="button" 
                                        className="btn btn-login mb-2">Login</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;