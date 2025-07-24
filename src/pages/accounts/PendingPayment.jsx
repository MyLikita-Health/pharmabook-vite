import React from 'react'
import { CustomButton, CustomForm, CustomTable } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'

function PendingPayment() {
  const amount = [
    {
      name: 'amount',
      col: 6,
    },
  ]
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
      title: 'total',
      value: 'total',
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
      custom: true,
      component: () => (
        <div>
          <CustomForm fields={amount} />
        </div>
      ),
    },
    {
      title: 'Action',
      custom: true,
      component: () => (
        <div>
          <CustomButton>Process</CustomButton>
        </div>
      ),
    },
  ]
  const data = [
    {
      date: '2/22/2021',
      name: 'halifan nagudu',
      total: '₦200',
      paid: '19,000',
      balance: '2,823',
    },
    {
      date: '2/22/2021',
      name: 'halifan nagudu',
      total: '₦200',
      paid: '19,000',
      balance: '2,823',
    },
    {
      date: '2/22/2021',
      name: 'halifan nagudu',
      total: '₦200',
      paid: '19,000',
      balance: '2,823',
    },
  ]
  return (
    <div>
      <CustomCard header="Pending Payment" back>
        <CustomTable data={data} fields={fields} />
      </CustomCard>
    </div>
  )
}

export default PendingPayment
