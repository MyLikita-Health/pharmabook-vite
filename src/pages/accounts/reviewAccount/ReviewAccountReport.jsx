import React from 'react'
import { Alert } from 'reactstrap'
import { SearchBar } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'
import CustomTable from '../../../components/UI/CustomTable'
import DaterangeSelector from '../../../components/UI/DaterangeSelector'

function ReviewAccountReport() {
  const fields = [
    {
      title: 'S/N',
      value: 'sn',
    },
    {
      title: 'Date',
      value: 'date',
    },
    {
      title: 'Account',
      value: 'account',
    },
    {
      title: 'Patient Name',
      value: 'patient_name',
    },
    {
      title: 'Total Amount(₦)',
      value: 'total_amount',
    },
    {
      title: 'Amount Paid(₦)',
      value: 'amount_paid',
    },
    {
      title: 'Balance(₦)',
      value: 'balance',
    },
    {
      title: 'Action',
      value: 'action',
    },
  ]

  return (
    <div>
      <CustomCard header="Review Account Report">
        <DaterangeSelector />

        <SearchBar />

        <Alert color="primary" className="text-center">
          There is no responding at this time, Check back later
        </Alert>

        <CustomTable fields={fields} size="sm" />
      </CustomCard>
    </div>
  )
}

export default ReviewAccountReport
