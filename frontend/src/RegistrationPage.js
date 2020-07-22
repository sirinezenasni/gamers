import React, { useContext, useState } from 'react';
import AppContext from './AppContext';
import { Redirect} from 'react-router-dom';
import NavBar from './NavBar.js';

const RegistrationPage = () => {
    let firstNameField;
    let lastNameField;
    let userNameField;
    let emailField;
    let passwordField;

    const [globalState, setGlobalState] = useContext(AppContext);

     // A local state
     const [state, setState] = useState(
        {
            registred: false
        }
    )
 
    const registerUser = () => {
        fetch('http://localhost:8080/users/register', 
            {
                method: 'POST',
                body: JSON.stringify({
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                    userName: userNameField.value,
                    email: emailField.value,
                    password: passwordField.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(
            (result) => result.json()
        )
        .then (
            (json) => {
                const { message, jsonwebtoken } = json;
                
                // save the jwt in the browser
                localStorage.setItem('jwt', jsonwebtoken);

                setState({...state, registred: true});

                setGlobalState(
                    {
                        ...globalState,
                        registred: true
                    }
                )
            }
        )
    }

    // If the user is Registred, redirect them
    if (globalState.registred === true) {
        return(<Redirect to="/login"/>)
    } else { 
        return(
        <div>
            <NavBar />
            <h1>Registration</h1>

            <div className="container">
                <div className="row">
                    <div className="col-sm" 
                    style={{maxWidth: '400px', margin: '0 auto'}}>
                        <div>
                            <div className="form-group">
                                <label>
                                    First Name
                                </label>

                                <input 
                                ref={(elem) => firstNameField = elem}
                                type="text" 
                                className="form-control" 
                                aria-describedby="firstName"/>
                            </div>

                            <div className="form-group">
                                <label>
                                    Last Name
                                </label>

                                <input 
                                ref={(elem) => lastNameField = elem}
                                type="text" 
                                className="form-control" 
                                aria-describedby="lastName"/>
                            </div>

                            <div className="form-group">
                                <label>
                                    Username
                                </label>

                                <input 
                                ref={(elem) => userNameField = elem}
                                type="text" 
                                className="form-control" 
                                aria-describedby="username"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Email address
                                </label>

                                <input 
                                ref={(elem) => emailField = elem}
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"/>

                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label>
                                    Password
                                </label>

                                <input 
                                ref={(elem) => passwordField = elem}
                                type="password" 
                                className="form-control" 
                                aria-describedby="password"/>
                            </div>

                            <button
                            onClick={registerUser}
                            type="button"
                            className="btn btn-primary">Register
                            </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
    }
}

export default RegistrationPage;