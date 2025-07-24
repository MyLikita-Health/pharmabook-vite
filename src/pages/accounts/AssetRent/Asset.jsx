import React, { useState } from 'react'
import CustomForm from '../../../components/UI/CustomForm'
export default function Asset({asset, handleAsset}) {
  const fields = [
    {
      label:"Start Date",
      type:"date",
      name:"startDate",
      col:"6",
      value:asset.startDate

    },
    {
      label:"End Date",
      type:"date",
      name:"endDate",
      col:"6",
      value:asset.endDate

    },
    {
      label:"Account Head",
      name:"accHead",
      col:"6"
    },
    {
      label:"Name",
      name:"full",
      col:"6",
      value:asset.full

    },
    {
      label:"Cost",
      name:"cost",
      col:"6",
      placeholder:"0",
      type:"number",
      value:asset.cost

    },
    {
      label:"Percentage",
      type:"number",
      name:"percentage",
      col:"6",
      placeholder:"0",
      value:asset.percentage


    },
    {
      label:"Rate",
      name:"rate",
      col:"6",
      type:"number",
      placeholder:"0",
      value:asset.rate
    }
  ]

  return (
    <div>
     <CustomForm fields={fields} handleChange={handleAsset} />
    </div>
  )
}
