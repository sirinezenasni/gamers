import React, {useContext, useState} from 'react';
import AppContext from './AppContext';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Settings = () => {
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

    const updateUser = () => {
        fetch('http://localhost:8080/users/update', 
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
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
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


    return (
        <div>
            <NavBar />
            <div className="row">
                <SideBar />
                <div className="col-9">
                    <h1>Settings</h1>
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
                                    onClick={updateUser}
                                    type="button"
                                    className="btn btn-primary">Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;