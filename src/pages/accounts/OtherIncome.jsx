import React, { useState } from 'react'
import { Form } from 'reactstrap'
import { CustomForm, CustomTable  } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'
import { Button } from 'reactstrap'

export default function OtherIncome() {
  let _form={
    accountHead: "",
    accountNo: "",
    date: "",
    selectPatientAccount: "",
    modeOfPayment: "",
    service: "",
    quntityDays: "",
    amount: "",
  }
  const [form, setForm] = useState(_form)

  
const handleDelete = (index) =>{
  let item = data.filter((i, idx) => index !== idx)
  setData(item) 
  console.log(index)
 }

  const [data, setData] = useState([])
const handleChange = ({ target: { name, value } }) =>{
        setForm((p) => ({ ...p, [name]: value }));

}
  const handleAdd = () => {
    setData(p => ([
      ...p,
      form
    ]))
    setForm(_form)
  }

  const fields =[
    {
     label:"Account Head",
     name:"accountHead",
     value: form.accountHead,
    },
    {
      label:"Account No",
      name:"accountNo",
      value: form.accountNo,
     },
     {
      label:"Date",
      type: "date",
      name:"date",
      value: form.date,
     },
     {
      label:"Select Patient Account",
      name:"selectPatientAccount",
      col: "6",
      value: form.selectPatientAccount,
     },
     {
      label:"Model Of Payment",
      name:"modeOfPayment",
      type: "select",
      options: ["Cash", "Bank", "POS"],
      col: "2",
      offset: 4,
      value: form.modeOfPayment,
     },
     {
      label:"Service",
      name:"service",
      value: form.service,
     },
     {
      label:"Qunity",
      name:"quntityDays",
      value: form.quntityDays,
     },
     {
      label:"Amount",
      name:"amount",
      value: form.amount,
     },
  ] 
  const table = [
    { title: 'Delete', custom: true, component: (item, idx)=>(
      <Button color='danger' onClick={() =>handleDelete(idx)}>Delete</Button>
    ) },
    { title: 'Service', value: 'service' },
    { title: 'Price', value: 'price' },
    { title: 'Quntity', value: 'quntityDays' },
    { title: 'Amount', value: 'amount' },
  ]
  return (
    <div>
    <CustomCard header="Other Incomes" headerRight="Receipt No" back>
        <CustomForm fields={fields} handleChange={handleChange} />
        
        <center><Button className='m-3 ml-4' onClick={handleAdd}>Add Service</Button></center>
       <CustomTable fields={table} data={data} />
       <center>

                  <Button color='warning' className='mx-2'>PrePare bill</Button>
                  <Button color='success' className='mx-2'>Generate Invoce</Button>
                  <Button color='primary' className='mx-2'>Pay Now</Button>
                </center>
      </CustomCard>
      </div>
    
  )
}
