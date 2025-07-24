import React from 'react'
import { Input } from 'reactstrap'
// import { themeClass } from "variables";

function RadioBox(props) {
  const { container = '', label = '' } = props

  return (
    <div className={`custom-control custom-radio mb-3 ${container}`}>
      <Input
        {...props}
        className="custom-control-input custom-control-input-default"
        id={`${props.label}${props.name}-1`}
        type="radio"
      />
      <label
      style={{marginLeft:5}}
        className="custom-control-label  font-weight-bold"
        htmlFor={`${props.label}${props.name}-1`}
      >
        {label}
      </label>
    </div>
    // <Label
    //   className={`font-weight-bold ${container}`}
    //   style={{ cursor: "pointer" }}
    // >
    //   <Input type="radio" />
    //   {label}
    // </Label>
  )
}

export default RadioBox
