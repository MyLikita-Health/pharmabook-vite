import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormGroup, Label } from 'reactstrap'

function Autocomplete(props) {
  const { required, label, _ref, container } = props
  return (
    <FormGroup className={container}>
      {label && label !== '' ? (
        <Label className="font-weight-bold">
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
      ) : null}
      <Typeahead
        id={`${props.label}-12`}
        ref={_ref}
        className={`border border-primary rounded ${props.className}`}
        {...props}
      />
    </FormGroup>
  )
}

export default Autocomplete
