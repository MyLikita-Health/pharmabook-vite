import React from 'react'
import { Button } from 'reactstrap'
import { CustomForm, CustomTable, RadioGroup } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'

export default function DiscountSetUp() {
  const fieds =[
    {
      label: "Discount Name",
      name: "setUp",
      col: 4,
    },
    {
     type: "custom",
     component: ()=>(
      <RadioGroup
      label="Discount Type"
      name="regType"
      options={[
        { label: 'Percentage', name: 'percentage' },
        { label: 'Fixed', name: 'fixed' },
      ]}
    />
     ),
     col: 6,
     offset: 1,
    },
    {
      label: "Discount Amount",
      name: "setUp",
      col: 4,
    },
  ]
  const table = [
    { title: "Discount Name", value: "discountName" },
    { title: "Discount Type", value: "discountType" },
    { title: "Discount Amount", value: "discountAmount" },

  ]
  return (
    <div>
      <CustomCard header="SetUp Discount">
        <CustomForm fields={fieds} />
        <center><Button color='primary'>Submit</Button></center>
        <CustomTable fields={table} />
      </CustomCard>
    </div>
  )
}
