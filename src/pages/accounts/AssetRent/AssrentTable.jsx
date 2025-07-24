import React from 'react'
import { CustomTable } from '../../../components/UI'

export default function AssrentTable() {
  const fields = [
  {
    title:"Asset",
    value:"asset"
  },
  {
    title:"Year",
    value:"year"
  },
  {
    title:"Rate",
    value:"rate"
  },
  {
    title:"NBV",
    value:"nbv"
  },
  {
    title:"Action",
    value:"action"
  }
  ]
  return (
    <div className="border">
       <CustomTable fields={fields} />
    </div>
  )
}
