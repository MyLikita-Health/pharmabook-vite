import React from "react";
import { Input } from "reactstrap";
// import { themeClass } from "variables";

function Checkbox(props) {
  const {
    container = "",
    label = "",
    key = "1",
    checked = false,
    onChange = (f) => f,
  } = props;

  return (
    <div className={`custom-control custom-checkbox mb-3 ${container}`}>
      <Input
        className="custom-control-input"
        id={`${props.label}${props.name}-${key}`}
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
      />
      <label
        className="custom-control-label"
        style={{marginLeft:'4px'}}
        htmlFor={`${props.label}${props.name}-${key}`}
      >
        <span>{label}</span>
      </label>
    </div>
  );
}

export default Checkbox;
