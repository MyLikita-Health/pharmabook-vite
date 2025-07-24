import React from 'react'
import CustomTable from '../../components/UI/CustomTable'
import CustomCard from '../../components/UI/CustomCard'

import CustomAlert from '../../components/UI/CustomAlert'
function PendingDiscount() {
  const fields = [
    { title: 'Date', value: 'date' },
    { title: 'Patient Name', value: 'patient_no' },
    { title: 'Proposed Discount', value: 'proposed_discount' },
    { title: 'Total Amount', value: 'total_amount' },
    { title: 'Total Discount', value: 'total_discount' },
    { title: 'Action', value: 'Action   ' },
  ]
  return (
    <div>
      <CustomCard header="Pending Discount Request" back>
        <CustomTable fields={fields} className="mb-2 mt-5" />
        <CustomAlert
          color="primary"
          text="Nothing To Display at this Time,Please check back Later"
          className="text-center"
        />
      </CustomCard>
    </div>
  )
}

export default PendingDiscount
