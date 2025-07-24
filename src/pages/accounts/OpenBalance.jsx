import React from 'react'
import { CustomButton, CustomForm } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'
import { Plus } from 'react-feather'
function OpenBalance() {
  const fields = [
    {
      name: 'date',
      offset: 6,
      label: 'Date',
      type: 'date',
      col: 6,
    },
    {
      name: 'Select',
      label: 'Select account',
      type: 'select',
      col: 6,
    },
    {
      name: 'Amount',
      label: 'Amount',
      type: 'number',
      col: 6,
    },
  ]
  return (
    <div>
      <CustomCard header="Opening Balance" back>
        <CustomForm fields={fields} />
        <center>
          {' '}
          <CustomButton size="lg" className="pr-5 pl-5">
            <Plus />
            Submit
          </CustomButton>
        </center>
      </CustomCard>
    </div>
  )
}

export default OpenBalance
