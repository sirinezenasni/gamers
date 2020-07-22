import React, {useState} from 'react';

const ColorButton = () => {
    const [state, setState] = useState(
        {
            label: 'red',
            className: 'btn-danger'
        }
    )

    const changeColor = () => {

        if(state.label === 'red') {
            setState(
                {
                    label: 'blue',
                    className: 'btn-primary',
                }
            )
        } else {
            setState(
                {
                    label: 'red',
                    className: 'btn-danger',
                }
            )
        }
        
    }

    return (
        <button 
        className={`btn ${state.className}`}
        onClick={changeColor}>
        {state.label}
        </button> 
    )
}

export default ColorButton;