import React from "react";
import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from "@material-ui/core/Checkbox";

const BlueCheckbox = withStyles({
    root: {
      color: "#176FA6",
      "&$checked": {
        color: "#176FA6",
      }
    },
    checked: {}
  })(props => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
        <FormLabel component="legend">Gender</FormLabel>
        <FormControlLabel
            control={
            <BlueCheckbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"/>
            }
            label="Female"/>

        <FormControlLabel
            control={
            < BlueCheckbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"/>
            }
            label="Male"
        />
    </FormGroup>

    
  );
}