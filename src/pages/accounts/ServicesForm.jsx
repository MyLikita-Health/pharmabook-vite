import React from 'react'
import { CustomForm } from '../../components/UI'

export default function ServicesForm() {
    const fields = [
        {
            placeholder:"20005",
            label:"Account Head",
            name:"accHead",
            col:3


        },
        {
            type:"label",
            value:"Accno",
        
            label:"Account No:",
            col:2,
            offset:4,
            disabled:"disabled"
        },
        {
            type:"date",
            label:"Date",
            name:"date",
            col:3
        },
        {
            label:"Select Patient Account",
            name:"selectpatientAcc",
            col:5
        }, 
        {
          type : "radio",
          options:[
            {label: "Pay from Deposit" , name: "payfromDposit"  },
            {label: "Instant Payment" , name: "instantPayment"}
            ],

      }



    ]
  return (
    <div>
      <CustomForm fields={fields} />
    </div>
  )
}
