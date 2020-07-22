import React, {useState} from 'react';

const CounterButton = () => {
    const [state, setState] = useState(
        {
            label: 0
        }
    )

    const countUp = () => {
        let newLabel = state.label + 1;

        setState(
            {
                label : newLabel
            }
        )
    }

    return (
        <button className='btn btn-primary'
        onClick={countUp}>
            {state.label}
        </button>
    )
}

export default CounterButton;