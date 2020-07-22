import React, {useState} from 'react';
//import { setState } from 'expect/build/jestMatchersObject';

const NewsletterForm = () => {
    const [state, setState] = useState (
        {
            registered: false
        }
    )

    // Step 1. Create a variable reserved for the input field
    let inputField;
    // Step 2. Assign the variable to the input component 
    // Step 3. Upon onClick event, alert the contents of the input field 
    const registerEmail = () => {
        fetch('http://localhost:8080/emails/register', 
            {
                method: 'POST',
                body: JSON.stringify({email: inputField.value}),
                headers: {"Content-Type": "application/json"}
            }
        )
        .then(
            (result) => result.json()
        )
        .then (
            (json) => {
                console.log('response from backend', json);
                setState(
                    {
                        registered: true
                    }
                ) 
            }
        )
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text"
                    ref={ (elem) => inputField = elem }
                    className="form-control" 
                    placeholder="Recipient's username" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2" 
                />
                <div className="input-group-append">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button" 
                        id="button-addon2"
                        onClick={registerEmail}
                    >Button</button>
                </div>
            </div>
            { 
                state.registered &&
                <div className="alert alert-success" role="alert">
                    You have successfully registered!
                </div> 
            }
        </div>
    )
};

export default NewsletterForm;