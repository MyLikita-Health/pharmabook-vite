import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Col, FormGroup, Label } from "reactstrap";

export default function CustomTypeahead(props) {
  const {
    options,
    onInputChange,
    onChange,
    labelKey,
    label,
    placeholder,
    required = false,
    _ref,
  } = props;
  return (
    <>
      {label && (
        <Label className="font-weight-bold">
          {label}
          {required ? <span className="text-danger">*</span> : null}
        </Label>
      )}
      <Typeahead
        id="basic-typeahead-single"
        labelKey={labelKey}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder || ""}
        ref={_ref}
        className="border border-primary rounded m-0 p-0"
        inputProps={{
          className: "p-2 py-2 shadow-sm form-control border-primary ",
          style: {
            fontSize: "15px",
            borderWidth: "1px",
          },
        }}
        {...props}
      />
    </>
  );
}
