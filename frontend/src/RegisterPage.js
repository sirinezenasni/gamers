import React, { useContext, useState } from 'react';
import AppContext from './AppContext';
import { Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        //margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);
  
const RegisterPage = () => {
    const classes = useStyles();

    let firstNameField;
    let lastNameField;
    let userNameField;
    let emailField;
    let passwordField;

    const [globalState, setGlobalState] = useContext(AppContext);

    const [state, setState] = useState(
        {
            registred: false
        }
    )

    const registerUser = () => {
        console.log("register user called ....");
        fetch("http://localhost:8080/users/register", 
            {
                method: 'POST',
                body: JSON.stringify({
                    firstName: firstNameField,
                    lastName: lastNameField,
                    userName: userNameField,
                    email: emailField,
                    password: passwordField,
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
                
                localStorage.setItem('jwt', jsonwebtoken);

                setGlobalState(
                    {
                        ...globalState,
                        registred: true,
                        loggedIn: true,
                    }
                )
            }
        )
    }
  
    if (globalState.registred === true) {
        return(
            <Redirect to="/dashboard"/>
        );
    } else {
        return (
            <div className="register-form">
                <h1>Create a new account</h1>
                <form className={classes.root}noValidate autoComplete="off">
                    <div className="box"> 
                        <TextField 
                            onChange={(e) => firstNameField = e.target.value}
                            value={firstNameField}
                            required 
                            label="First name" />
                        <TextField 
                            onChange={(e) => lastNameField = e.target.value}
                            value={lastNameField}
                            required 
                            label="Last name" />
                        <TextField 
                            onChange={(e) => userNameField = e.target.value}
                            value={userNameField}
                            required 
                            label="Username" />
                        <TextField 
                            onChange={(e) => emailField = e.target.value}
                            value={emailField}
                            required 
                            label="Email" />
                        <TextField 
                            onChange={(e) => passwordField = e.target.value}
                            value={passwordField}
                            required 
                            id="standard-basic" 
                            label="Password" />
                    </div>
                    <button
                        onClick={registerUser}
                        type="button"
                        className="btn">Register
                    </button>
                </form>
            </div>
        );
    }
}

export default RegisterPage;