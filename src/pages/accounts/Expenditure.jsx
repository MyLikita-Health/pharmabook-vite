import React, { useState } from 'react'
import { CustomForm, CustomTable } from '../../components/UI'
import CustomCard from '../../components/UI/CustomCard'
import { Button } from 'reactstrap'


export default function Expenditure() {
  let _form = {
    expenditure: "",
    data: "",
    selectSourceAccount: "",
    collectBy: "",
    totalAmount: "",
    modelPayment: "",
    narration: "",
  }
  const [form, setForm] = useState(_form)


  const handleDelete = (index) => {
    let item = data.filter((i, idx) => index !== idx)
    setData(item)
    console.log(index)
  }

  const [data, setData] = useState([])
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));

  }
  const handleAdd = () => {
    setData(p => ([
      ...p,
      form
    ]))
    setForm(_form)
  }

  const fields = [
    {
      label: "Expendinture Type",
      name: "expenditure",
      offset: 8,
      value: form.expenditure,

    },
    {
      label: "Date",
      name: "date",
      type: "date",
      value: form.date,
    },
    {
      label: "Select Source Account",
      name: "selectSourceAccount",
      type: "select",
      options: ["Fist Bank", "Zenith Bank", "Jaiz Bank", "UBA", "GT Bank"],
      value: form.selectSourceAccount,
    },
    {
      label: "Collect By",
      name: "collectBy",
      value: form.collectBy,
    },
    {
      label: "Total Amount",
      name: "totalAmount",
      Type: "number",
      value: form.totalAmount,
    },
    {
      label: "Model Pament",
      name: "modelPayment",
      value: form.modelPayment,
    },
    {
      label: "Narration",
      name: "narration",
      value: form.narration,
    },
  ]
  const table = [
    {
      title: 'Delete', custom: true, component: (item, idx) => (
        <Button color='danger' onClick={() => handleDelete(idx)}>Delete</Button>
      )
    },
    { title: 'Discription', value: 'narration' },
    { title: 'Account', value: 'selectSourceAccount' },
    { title: 'CollectBy', value: 'collectBy' },
    { title: 'Amount', value: 'totalAmount' },
  ]
  return (
    <div>
      <CustomCard header="Expenditure" back>
        <CustomForm fields={fields}  handleChange={handleChange}/>
        <center><Button className='m-3 ml-4' onClick={handleAdd}>Add Expendinture</Button></center>
        <CustomTable fields={table} data={data} />

        <center><Button color='primary'>Submit</Button></center>
      </CustomCard>
    </div>
  )
}
