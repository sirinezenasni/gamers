import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { flexbox, display } from '@material-ui/system';
import CheckBox from './CheckBox';
import BirthdayBox from './BirthdayBox';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        //margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
  export default function BasicTextFields() {
    const classes = useStyles();
  
    return (
        <div className="register-form">
            <h1>Create a new account</h1>
            <form className={classes.root}noValidate autoComplete="off">
                <div className="box"> 
                    <TextField id="standard-basic" label="First name" />
                    <TextField id="standard-basic" label="Last name" />
                    <TextField id="standard-basic" label="Email" />
                    <TextField id="standard-basic" label="Password" />
                </div>
                <div className="box">
                    <CheckBox />
                </div>
                <div className="box">
                    <BirthdayBox />
                </div>
                <button
                    type="button"
                    className="btn">Register
                </button>
            </form>
        </div>
    );
  }