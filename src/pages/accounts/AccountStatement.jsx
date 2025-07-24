import React, {useState} from 'react'
import { Alert, Button } from 'reactstrap'
import { CustomForm } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'

export default function AccountStatement() {
  let _form={
    startFrom: "",
    endAt: "",
    accountName: "",
    balance: "",
  }
  const [form, setForm]= useState(_form)

  const handleChange = ({ target: { name, value } }) =>
setForm((p) => ({ ...p, [name]: value }));

  const fields = [
    {
      label: " Start From",
      name: "startFrom",
      type: "date",
      value: form.startForm,
    },
    {
      label: "End At",
      name: "endAt",
      type: "date",
      offset: 4,
      value: form.endAt,
    },
    {
      label: " Account Name",
      name: "accountName",
      col: 4,
      value: form.accountName,
    },
    {
      label: " Balance",
      name: "balance",col: 4,
      value: form.balance,
    },
    {
      type: 'custom',
      component: () => (
        <Button outline color='primary' className='px-5 mt-3'>Report </Button>
      ),
      offset:1,col: 2
    }
  ]
  return (
    <div>
      <CustomCard header="Account Statement" back>
        <CustomForm fields={fields} handleChange={handleChange}/>
        <center><Alert>No Data To view </Alert></center>
      </CustomCard>
    </div>
  )
}
