import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

function SelectInput(props) {
  const {
    label,
    options,
    className,
    container,
    required,
    defaultValue,
    defaultClass = "",
  } = props;
  return (
    <FormGroup className={container}>
      {label && label !== "" ? (
        <>
          <Label className="font-weight-bold">{label}</Label>
          {required && <span className="text-danger">*</span>}
        </>
      ) : null}
      <Input
        type="select"
        className={` p-2 py-2 shadow-sm form-control  border-primary ${className}`}
        style={{
          fontSize: "15px",
          borderWidth: "2px",
        }}
        {...props}
      >
        <option className={defaultClass}>
          {defaultValue ? defaultValue : "--select--"}
        </option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}

export default SelectInput;
