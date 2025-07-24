import React from 'react'
// import { themeClass } from "variables";
import { RadioBox } from '.'

function RadioGroup(props) {
  const {
    container = '',
    options = [],
    onChange = (f) => f,
    value = '',
    label = '',
    name = '',
    _container = 'mx-4',
  } = props

  return (
    <div className={container}>
      <div className="d-flex flex-row">
        <h6 className="font-weight-bold">{label}</h6>
        {options.map((_item, _i) => (
          <RadioBox
            container={_container}
            label={_item.label}
            name={name}
            checked={_item.name === value}
            onChange={() => onChange(name, _item.name)}
          />
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
