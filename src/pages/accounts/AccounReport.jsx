import React from 'react'
import { Alert } from 'reactstrap'
import { CustomForm, CustomTable, SearchBar } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'

export default function AccounReport() {
  const fields = [
    {
      label: "From",
      type: "date",
      name: "date",
    },
    {
      label: "TO",
      type: "date",
      name: "date",
      offset: 4,
    },

  ]
  const table = [
    { title: "S/N", value: "s/n" },
    { title: "Dade", value: "date" },
    { title: "Account", value: "account" },
    { title: "PateintName", value: "pateintName" },
    { title: "TotalAmount($)", value: "totalamount" },
    { title: "AmountPaid($)", value: "amountpaid" },
    { title: "Balance", value: "balance" },
    { title: "Actiom", value: "action" },
  ]
  return (
    <div>
      <CustomCard header="Account Report" >
        <CustomForm fields={fields} />
        <SearchBar />
        <Alert className='mt-3 p-4 text-center'>
          There is no pending transaction at this time, check back later.
        </Alert>
        <CustomTable fields={table}/>
      </CustomCard>
    </div>
  )
}
