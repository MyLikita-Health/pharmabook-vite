import React from "react";
import { Input, Label, FormGroup } from "reactstrap";
// import { checkStrEmpty } from 'utils'
// import { secondaryColor } from "variables";

function TextInput(props) {
  const {
    label,
    required = false,
    className = null,
    container = null,
    loading = false,
    good = false,
    message = "",
    autoFocus=false,
    _ref,
  } = props;

  return (
    <>
      <FormGroup className={container}>
        {label && label !== "" ? (
          <>
            <Label className="font-weight-bold">{label}</Label>
            {required && <span className="text-danger">*</span>}
          </>
        ) : null}
        <Input
          required={required}
          innerRef={_ref}
          autoFocus={autoFocus}
          className={` p-2 py-2 shadow-sm form-control  border-primary ${className}`}
          // style={{ border: `1px solid ${secondaryColor}`, ...props.style }}
          // className="p-2 py-2 shadow-sm form-control border-primary "
          style={{
            fontSize: "15px",
            borderWidth: "2px",
          }}
          {...props}
        />
        {loading && <span className="text-primary">please wait...</span>}
        {message !== "" && (
          <span className={good ? "text-primary" : "text-info"}>
            {message}
          </span>
        )}
      </FormGroup>
    </>
  );
}

export default TextInput;
