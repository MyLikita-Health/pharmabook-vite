import React from 'react'
import { CustomForm } from '../../../../components/UI'

export default function Self({self, handleSelf}) {
    const fields = [
        {
            label:"phone Number",
            placeholder:"Telephone Number",
            name:"phone",
            type:"number",
            col:6,
            value:self.phone
        },
        {
            label:"Email",
            placeholder:"example@gmail.com",
            name:"email",
            col:6,
            value:self.email
        }
    ]
  return (
    <div>
      <CustomForm fields={fields} handleChange={handleSelf} />
    </div>
  )
}
