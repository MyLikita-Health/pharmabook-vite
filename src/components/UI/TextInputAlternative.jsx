import React from "react";
import { Input, Label, FormGroup } from "reactstrap";
// import { secondaryColor } from "variables";

function TextInput(props) {
  const { label } = props;

  return (
    <FormGroup>
      <Label className="font-weight-bold">{label}</Label>
      <Input
          className='form-control-alternative'
          
        // style={{ border: `1px solid ${secondaryColor}`, ...props.style }}
        {...props}
      />
    </FormGroup>
  );
}

export default TextInput;
