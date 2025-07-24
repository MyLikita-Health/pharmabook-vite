import React from 'react'
import { CustomButton, CustomForm, CustomTable } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'

function DiscountSetupForm() {
  const field = [
    {
      title: 'Discount Name',
      value: 'discount_name',
    },
    {
      title: 'Discount Value',
      value: 'discount_value',
    },
  ]
  const fields = [
    {
      name: 'discount_name',
      label: 'Discount Name',

      offset: 0,
      col: 6,
    },
    {
      type: 'radio',
      label: 'Percentage:',
      offset: 0,
      col: 1,
    },
    {
      type: 'label',
      label: 'Fixed',
      offset: 1,
      col: 2,
    },
    {
      type: 'label',
      label: 'Percentage:',
      offset: 0,
      col: 1,
    },

    {
      name: 'discount_amount',
      label: 'Discount Amount',
      offset: 0,
      col: 6,
    },
  ]
  return (
    <CustomCard header="Discount Setup">
      <CustomForm fields={fields} />
      <center>
        <CustomButton>Submit</CustomButton>
      </center>

      <CustomTable fields={field} className="mt-3" size="sm" />
    </CustomCard>
  )
}

export default DiscountSetupForm
