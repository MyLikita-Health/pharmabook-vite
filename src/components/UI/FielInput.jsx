import React from "react";
import { Input, Label, FormGroup } from "reactstrap";
// import { secondaryColor } from "variables";

function FileInput(props) {
  const { label } = props;

  return (
    <FormGroup>
      <Label className="font-weight-bold">{label}</Label>
      <Input type="file" {...props} />
    </FormGroup>
  );
}

export default FileInput;
