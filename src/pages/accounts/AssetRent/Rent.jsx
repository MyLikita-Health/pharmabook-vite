import React from 'react'
import { CustomForm } from '../../../components/UI'

export default function Rent({rent, handleRent}) {
  const fields = [
    {
      label:"Start Date",
      type:"date",
      name:"startDate",
      col:"6",
      value:rent.startDate

    },
    {
      label:"End Date",
      type:"date",
      name:"endDate",
      col:"6",
      value:rent.endDate

    },
    {
      label:"Name",
      name:"full",
      col:"6",
      value:rent.full

    },
    {
      label:"Cost",
      name:"cost",
      col:"6",
      placeholder:"0",
      type:"number",
      value:rent.cost

    },

  ]
  return (
    <div>
       <CustomForm fields={fields} handleChange={handleRent} />
    </div>
  )
}

