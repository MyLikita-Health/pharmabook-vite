import React from 'react'
import { Alert } from 'reactstrap'
import { CustomTable } from '../../../components/UI'
import CustomCard from '../../../components/UI/CustomCard'

function PendingPaymentTable() {
  const fields = [
    {
      title: 'Date',
      value: 'date',
    },
    {
      title: 'Name',
      value: 'name',
    },
    {
      title: 'Paid',
      value: 'paid',
    },
    {
      title: 'Balance',
      value: 'balance',
    },
    {
      title: 'Amount Paid',
      value: 'amount_paid',
    },
    {
      title: 'Action',
      value: 'action',
    },
  ]
  return (
    <div>
      <CustomCard header="Pending Payment">
        <CustomTable fields={fields} size="sm" />
        <Alert className="text-center">
          Nothing to display at this time, check back later
        </Alert>
      </CustomCard>
    </div>
  )
}

export default PendingPaymentTable
